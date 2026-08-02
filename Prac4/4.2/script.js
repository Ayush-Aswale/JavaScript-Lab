/* ============================================================
   Indian Number Plate Checker — Logic
   Simple character-by-character validation of Indian plates.
   Format: MH12AB1234  →  State(2) + District(2) + Series(2) + Number(4)
   ============================================================ */

"use strict";

function isUpperLetter(ch) {
    return ch >= "A" && ch <= "Z";
}

function isDigit(ch) {
    return ch >= "0" && ch <= "9";
}

function setRule(ruleNum, passed) {
    document.getElementById("rule" + ruleNum).classList.add(passed ? "pass" : "fail");
}

function showResult(type, title) {
    const btn = document.getElementById("validateBtn");
    btn.classList.remove("result-valid", "result-invalid");
    void btn.offsetWidth; // restart CSS animation

    if (type === "valid") {
        btn.textContent = "\u2713  Valid Registration!";
        btn.classList.add("result-valid");
    } else {
        btn.textContent = "\u2717  " + title;
        btn.classList.add("result-invalid");
    }
}

function validateRegistration() {
    const input = document.getElementById("regInput");
    const registrationNumber = input.value.trim();

    for (let i = 1; i <= 6; i++) {
        document.getElementById("rule" + i).classList.remove("pass", "fail");
    }

    try {
        if (registrationNumber.length === 0) {
            setRule(1, false);
            throw new Error("Registration number cannot be empty.");
        }
        setRule(1, true);

        if (registrationNumber.length !== 10) {
            setRule(2, false);
            throw new Error("Length must be exactly 10 characters. You entered " + registrationNumber.length + ".");
        }
        setRule(2, true);

        if (!isUpperLetter(registrationNumber[0]) || !isUpperLetter(registrationNumber[1])) {
            setRule(3, false);
            throw new Error("First 2 characters (State Code) must be uppercase letters. Got: " + registrationNumber[0] + registrationNumber[1]);
        }
        setRule(3, true);

        if (!isDigit(registrationNumber[2]) || !isDigit(registrationNumber[3])) {
            setRule(4, false);
            throw new Error("Characters 3-4 (District Code) must be digits. Got: " + registrationNumber[2] + registrationNumber[3]);
        }
        setRule(4, true);

        if (!isUpperLetter(registrationNumber[4]) || !isUpperLetter(registrationNumber[5])) {
            setRule(5, false);
            throw new Error("Characters 5-6 (Series) must be uppercase letters. Got: " + registrationNumber[4] + registrationNumber[5]);
        }
        setRule(5, true);

        if (!isDigit(registrationNumber[6]) || !isDigit(registrationNumber[7]) || !isDigit(registrationNumber[8]) || !isDigit(registrationNumber[9])) {
            setRule(6, false);
            throw new Error("Last 4 characters (Vehicle Number) must be digits. Got: " + registrationNumber[6] + registrationNumber[7] + registrationNumber[8] + registrationNumber[9]);
        }
        setRule(6, true);

        showResult("valid", "Valid Registration!");

    } catch (err) {
        showResult("invalid", err.message);
    }
}

document.getElementById("regInput").addEventListener("input", function () {
    // Keep only letters & digits, uppercase — so "MH 12 AB 1234" becomes "MH12AB1234"
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    document.getElementById("charCount").textContent = this.value.length + "/10";

    const btn = document.getElementById("validateBtn");
    btn.textContent = "Validate";
    btn.classList.remove("result-valid", "result-invalid");

    for (let i = 1; i <= 6; i++) {
        document.getElementById("rule" + i).classList.remove("pass", "fail");
    }
});

document.getElementById("regInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") validateRegistration();
});

document.getElementById("validateBtn").addEventListener("click", validateRegistration);

