# Experiment No. 4

## Experiment Title
**Use Function Types, Scope and Closures; Apply Try-Catch; Build a Palindrome Checker**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

## Theory

JavaScript provides different types of functions and scope mechanisms that make programs modular and reusable. Exception handling helps in managing runtime errors effectively.

### a) Function Types
1. Functions perform specific tasks.
2. JavaScript supports function declarations, function expressions, and arrow functions.

### b) Scope
1. Scope determines the accessibility of variables.
2. Types include global scope, function scope, and block scope.

### c) Closures
1. A closure is a function that remembers variables from its outer scope.
2. It allows access to outer variables even after the outer function has finished execution.

### d) Try-Catch
1. Used for exception handling.
2. Prevents program termination by catching runtime errors.

### e) Palindrome Checker
1. A palindrome is a word or number that reads the same forward and backward.
2. JavaScript can compare the original and reversed string to determine whether it is a palindrome.

---

## Experiment Program Code

### File: `4.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Palindrome Checker | Ayush Aswale</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px 35px;
      width: 100%;
      max-width: 480px;
      text-align: center;
    }

    .student-info {
      background: linear-gradient(135deg, #ffd700, #ff8c00);
      border-radius: 12px;
      padding: 18px 14px;
      margin-bottom: 25px;
      box-shadow: 0 6px 18px rgba(255, 140, 0, 0.4);
    }

    .student-info h2 {
      font-size: 1.6rem;
      color: #1a1a2e;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .student-info p {
      font-size: 1.15rem;
      color: #1a1a2e;
      font-weight: 700;
      margin-top: 6px;
      letter-spacing: 0.5px;
    }

    h1 {
      font-size: 1.9rem;
      color: #333;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #777;
      font-size: 0.95rem;
      margin-bottom: 25px;
    }

    input[type="text"] {
      width: 100%;
      padding: 14px 16px;
      font-size: 1.1rem;
      border: 2px solid #ddd;
      border-radius: 10px;
      outline: none;
      transition: border-color 0.3s;
      margin-bottom: 15px;
    }

    input[type="text"]:focus {
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: #fff;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
      margin-bottom: 20px;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.45);
    }

    button:active {
      transform: translateY(0);
    }

    #error {
      color: #e74c3c;
      font-weight: 600;
      min-height: 20px;
      margin-bottom: 8px;
    }

    #result {
      font-size: 1.4rem;
      font-weight: 700;
      min-height: 40px;
      padding: 10px;
      border-radius: 10px;
      background: #f4f6fb;
      margin-bottom: 12px;
      word-break: break-word;
    }

    .counter-info {
      color: #999;
      font-size: 0.85rem;
    }

    footer {
      margin-top: 20px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      text-align: center;
    }

    footer strong {
      color: #ffd700;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="student-info">
      <h2>Made by: Ayush Aswale</h2>
      <p>PRN: 24070521009</p>
    </div>

    <h1>Palindrome Checker</h1>
    <p class="subtitle">Enter a word or phrase to test it</p>

    <input type="text" id="wordInput" placeholder="e.g. racecar, A man a plan a canal Panama" />

    <button onclick="checkPalindrome()">Check</button>

    <div id="error"></div>
    <div id="result"></div>
    <p class="counter-info">Checks performed: <span id="checkCount">0</span></p>
  </div>

  <footer>
    Developed by <strong>Ayush Aswale</strong> &nbsp;|&nbsp; PRN: <strong>24070521009</strong>
  </footer>

  <script>
    function isPalindrome(word) {
      var reversed = word.split("").reverse().join("");
      return word === reversed;
    }

    var cleanWord = function (word) {
      return word.toLowerCase().replace(/[^a-z0-9]/g, "");
    };

    var showResult = (message) => {
      document.getElementById("error").innerText = "";
      document.getElementById("result").innerText = message;
    };

    function makeCounter() {
      var count = 0;
      return function () {
        count++;
        return count;
      };
    }
    var counter = makeCounter();

    function checkPalindrome() {
      try {
        var input = document.getElementById("wordInput").value;

        if (input.trim() === "") {
          throw new Error("Please enter a word!");
        }

        var cleaned = cleanWord(input);
        var result = isPalindrome(cleaned);

        if (result) {
          showResult('"' + input + '" is a Palindrome! ');
        } else {
          showResult('"' + input + '" is NOT a Palindrome ');
        }

        document.getElementById("checkCount").innerText = counter();

      } catch (error) {
        alert(error.message);
      }
    }
  </script>
</body>
</html>
```

---

## Output

> **Attach the program output/screenshot.**
>
> The screenshot must clearly display:
> - **Student Name**
> - **PRN**
> - **File Path**

---

## Case Study Title
**Vehicle Registration Number Validation Webpage**

## Case Study Program Code

### File: `4.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Indian Vehicle Registration Number Checker — validate and verify Indian number plates.">
    <title>Indian Number Plate Checker</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="bg" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-overlay"></div>
    </div>

    <main class="app">

        <div class="tricolor" aria-hidden="true"><span></span><span></span><span></span></div>

        <header class="hero">
            <div class="logo-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2.5" y="5.5" width="19" height="13" rx="3"/>
                    <circle cx="6.2" cy="12" r="0.6" fill="currentColor" stroke="none"/>
                    <circle cx="17.8" cy="12" r="0.6" fill="currentColor" stroke="none"/>
                    <path d="M9.2 10h2.4M9.2 12.4h4.6M9.2 14.8h3.2"/>
                </svg>
            </div>
            <h1 class="title">Number Plate <span>Checker</span></h1>
            <p class="subtitle">Validate &amp; verify Indian vehicle registration numbers</p>
        </header>

        <section class="card">
            <label class="field-label" for="regInput">Registration number</label>

            <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <rect x="2.5" y="7" width="19" height="10" rx="2"/>
                    <path d="M6.5 11.5h2.6M11 11.5h4M16.8 11.5h0.8"/>
                </svg>
                <input id="regInput" type="text" placeholder="MH12AB1234" maxlength="10"
                       autocomplete="off" spellcheck="false" aria-label="Vehicle registration number">
                <span id="charCount" class="char-count">0/10</span>
            </div>

            <p class="format-hint">Format : State (2) + District (2) + Series (2) + Number (4) &nbsp;·&nbsp; e.g. MH 12 AB 1234</p>

            <button id="validateBtn" class="validate-btn" type="button">Validate</button>

            <ul class="rules">
                <li id="rule1" class="rule-item"><span>Registration number is not empty</span></li>
                <li id="rule2" class="rule-item"><span>Length is exactly 10 characters</span></li>
                <li id="rule3" class="rule-item"><span>State Code — first 2 characters are uppercase letters</span></li>
                <li id="rule4" class="rule-item"><span>District Code — characters 3 &amp; 4 are digits</span></li>
                <li id="rule5" class="rule-item"><span>Series — characters 5 &amp; 6 are uppercase letters</span></li>
                <li id="rule6" class="rule-item"><span>Vehicle Number — last 4 characters are digits</span></li>
            </ul>
        </section>

        <footer class="footer">
            <p class="made-by">Made with <span class="heart">&#10084;</span> by <strong>Ayush Aswale</strong></p>
            <p class="prn">PRN : 24070521009</p>
        </footer>

    </main>

    <script src="script.js"></script>
</body>
</html>
```

### File: `4.2/script.js`

```javascript

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
    void btn.offsetWidth;

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
```

### File: `4.2/styles.css`

```css

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg-deep: #070b1d;
    --card: rgba(255, 255, 255, 0.055);
    --card-border: rgba(255, 255, 255, 0.1);
    --text: #eef1ff;
    --muted: #9aa3c7;
    --saffron: #ff9933;
    --india-white: #ffffff;
    --india-green: #138808;
    --success: #34d399;
    --danger: #f87171;
    --warning: #fbbf24;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "Poppins", system-ui, -apple-system, sans-serif;
    color: var(--text);
    min-height: 100vh;
    background:
        radial-gradient(1200px 820px at 8% -12%, #1b1740 0%, transparent 52%),
        radial-gradient(1000px 720px at 112% 8%, #0d2b4e 0%, transparent 55%),
        radial-gradient(920px 900px at 50% 122%, #2a1245 0%, transparent 52%),
        linear-gradient(160deg, #070b1d 0%, #0a0f2c 45%, #120a2b 100%);
    background-attachment: fixed;
    overflow-x: hidden;
}

.bg {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: hidden;
    pointer-events: none;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.45;
    animation: float 20s ease-in-out infinite;
}

.orb-1 { width: 430px; height: 430px; background: var(--saffron); top: -130px; left: -90px; }
.orb-2 { width: 400px; height: 400px; background: #6366f1; top: 28%; right: -140px; animation-delay: -7s; }
.orb-3 { width: 320px; height: 320px; background: var(--india-green); bottom: -120px; left: 24%; animation-delay: -13s; }

@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(45px, 30px) scale(1.09); }
}

.grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 46px 46px;
    -webkit-mask-image: radial-gradient(circle at 50% 28%, #000 0%, transparent 72%);
            mask-image: radial-gradient(circle at 50% 28%, #000 0%, transparent 72%);
}

.app {
    max-width: 600px;
    margin: 0 auto;
    padding: 52px 20px 40px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tricolor {
    display: flex;
    width: 210px;
    height: 6px;
    border-radius: 999px;
    overflow: hidden;
    box-shadow: 0 0 24px rgba(255, 255, 255, 0.18);
    margin-bottom: 34px;
    animation: fadeDown 0.8s ease both;
}
.tricolor span { flex: 1; }
.tricolor span:nth-child(1) { background: var(--saffron); }
.tricolor span:nth-child(2) { background: var(--india-white); }
.tricolor span:nth-child(3) { background: var(--india-green); }

.hero {
    text-align: center;
    margin-bottom: 30px;
    animation: fadeDown 0.8s ease both;
}

.logo-badge {
    width: 74px;
    height: 74px;
    margin: 0 auto 18px;
    display: grid;
    place-items: center;
    border-radius: 22px;
    color: var(--saffron);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
    border: 1px solid var(--card-border);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}
.logo-badge svg {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 0 10px rgba(255, 153, 51, 0.5));
}

.title {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(1.9rem, 5vw, 2.7rem);
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.1;
}
.title span {
    background: linear-gradient(120deg, var(--saffron), #ff6b6b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.subtitle {
    color: var(--muted);
    font-weight: 300;
    font-size: 0.98rem;
    margin-top: 10px;
    letter-spacing: 0.3px;
}

.card {
    width: 100%;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 26px;
    padding: 30px 28px 28px;
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.09);
    animation: fadeUp 0.8s 0.15s ease both;
}

.field-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    color: var(--muted);
    margin-bottom: 12px;
}

.input-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 16px;
    width: 20px;
    height: 20px;
    color: var(--muted);
    pointer-events: none;
    transition: color 0.3s ease;
}

#regInput {
    width: 100%;
    padding: 16px 64px 16px 48px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 1.4px;
    color: var(--text);
    background: rgba(8, 11, 32, 0.7);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    caret-color: var(--saffron);
    text-transform: uppercase;
}
#regInput::placeholder {
    color: rgba(154, 163, 199, 0.5);
    font-weight: 400;
    letter-spacing: 0.5px;
}
#regInput:focus {
    border-color: rgba(255, 153, 51, 0.75);
    background: rgba(10, 13, 38, 0.85);
    box-shadow: 0 0 0 4px rgba(255, 153, 51, 0.16), 0 0 34px rgba(255, 153, 51, 0.18);
}
.input-wrap:focus-within .input-icon { color: var(--saffron); }

.char-count {
    position: absolute;
    right: 16px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--muted);
    pointer-events: none;
    background: rgba(8, 11, 32, 0.7);
    padding: 2px 7px;
    border-radius: 8px;
    transition: color 0.3s ease;
}

.format-hint {
    margin: 10px 2px 0;
    font-size: 0.8rem;
    font-weight: 300;
    color: var(--muted);
    letter-spacing: 0.3px;
}

.validate-btn {
    width: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 16px 24px;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1a0d00;
    background: linear-gradient(135deg, #ffb45e, var(--saffron) 55%, #ff7a3d);
    border: none;
    border-radius: 16px;
    cursor: pointer;
    box-shadow: 0 12px 30px rgba(255, 153, 51, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease, color 0.3s ease;
    white-space: normal;
    line-height: 1.35;
}
.validate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(255, 153, 51, 0.45);
    filter: brightness(1.05);
}
.validate-btn:active {
    transform: translateY(0) scale(0.97);
}
.validate-btn.result-valid {
    color: #052e1b;
    background: linear-gradient(135deg, #6ee7b7, #34d399 55%, #10b981);
    box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45);
}
.validate-btn.result-invalid {
    color: #2b0707;
    background: linear-gradient(135deg, #fca5a5, #f87171 55%, #ef4444);
    box-shadow: 0 12px 32px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.rules {
    list-style: none;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.rule-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.87rem;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.4;
    transition: all 0.3s ease;
}
.rule-item::before {
    content: "○";
    font-family: system-ui;
    font-size: 1rem;
    font-weight: 700;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: var(--muted);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.rule-item.pass {
    color: var(--text);
    border-color: rgba(52, 211, 153, 0.45);
    background: rgba(16, 185, 129, 0.1);
}
.rule-item.pass::before {
    content: "✓";
    color: #a7f3d0;
    border-color: rgba(52, 211, 153, 0.55);
    background: rgba(16, 185, 129, 0.2);
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.35);
}

.rule-item.fail {
    color: var(--text);
    border-color: rgba(248, 113, 113, 0.45);
    background: rgba(239, 68, 68, 0.1);
}
.rule-item.fail::before {
    content: "✕";
    color: #fecaca;
    border-color: rgba(248, 113, 113, 0.55);
    background: rgba(239, 68, 68, 0.2);
    box-shadow: 0 0 12px rgba(248, 113, 113, 0.35);
}

.footer {
    margin-top: auto;
    padding-top: 42px;
    text-align: center;
    animation: fadeUp 0.8s 0.3s ease both;
}
.made-by {
    font-size: 0.98rem;
    font-weight: 400;
    color: var(--muted);
}
.made-by .heart {
    color: var(--saffron);
    display: inline-block;
    animation: heartbeat 1.4s ease-in-out infinite;
}
.made-by strong {
    font-weight: 600;
    background: linear-gradient(120deg, #fff, var(--saffron));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.prn {
    margin-top: 6px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.86rem;
    font-weight: 600;
    letter-spacing: 1.6px;
    color: rgba(255, 153, 51, 0.9);
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    40% { transform: scale(1); }
    60% { transform: scale(1.15); }
}

@media (max-width: 560px) {
    .app { padding: 36px 16px 32px; }
    .card { padding: 24px 18px 22px; }
    .tricolor { margin-bottom: 26px; }
}

button:focus-visible,
input:focus-visible {
    outline: 2px solid var(--saffron);
    outline-offset: 3px;
}
```

---

## Output (Case Study)

> **Attach the program output/screenshot.**
>
> The screenshot must clearly display:
> - **Student Name**
> - **PRN**
> - **File Path**

---

## Result / Conclusion

The practical was completed successfully. Function types (function declaration, function expression, and arrow function), scope, closures, and try-catch exception handling were implemented successfully. A palindrome checker was developed using JavaScript to verify whether the entered text is a palindrome, utilizing closures for a counter and try-catch for error handling. A vehicle registration number validator was also developed as a case study to validate Indian number plates using character-by-character validation with try-catch exception handling.
