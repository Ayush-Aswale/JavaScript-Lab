function gradeSystem() {
    var name = document.getElementById("name").value.trim();
    var marks = document.getElementById("marks").value;

    var nameError = document.getElementById("nameError");
    var marksError = document.getElementById("marksError");
    var nameInput = document.getElementById("name");
    var marksInput = document.getElementById("marks");

    nameError.classList.remove("show");
    marksError.classList.remove("show");
    nameInput.classList.remove("error");
    marksInput.classList.remove("error");

    if (name === "") {
        nameError.textContent = "Please enter Student Name";
        nameError.classList.add("show");
        nameInput.classList.add("error");
        nameInput.focus();
        return;
    }

    if (marks === "") {
        marksError.textContent = "Please enter Marks";
        marksError.classList.add("show");
        marksInput.classList.add("error");
        marksInput.focus();
        return;
    }

    marks = Number(marks);

    if (isNaN(marks) || marks < 0 || marks > 100) {
        marksError.textContent = "Marks must be a number between 0 and 100";
        marksError.classList.add("show");
        marksInput.classList.add("error");
        marksInput.focus();
        return;
    }

    var grade, remarks;

    if (marks >= 90) {
        grade = "A+";
        remarks = "Excellent";
    } else if (marks >= 80) {
        grade = "A";
        remarks = "Very Good";
    } else if (marks >= 70) {
        grade = "B";
        remarks = "Good";
    } else if (marks >= 60) {
        grade = "C";
        remarks = "Satisfactory";
    } else if (marks >= 50) {
        grade = "D";
        remarks = "Pass";
    } else {
        grade = "F";
        remarks = "Fail";
    }

    var resultCard = document.getElementById("resultCard");
    var resultName = document.getElementById("resultName");
    var resultMarks = document.getElementById("resultMarks");
    var resultGrade = document.getElementById("resultGrade");
    var resultRemarks = document.getElementById("resultRemarks");

    resultName.textContent = name;
    resultMarks.textContent = marks;
    resultGrade.textContent = grade;
    resultRemarks.textContent = remarks;

    resultGrade.className = "value";
    if (grade === "A+") resultGrade.classList.add("grade-aplus");
    else if (grade === "A") resultGrade.classList.add("grade-a");
    else if (grade === "B") resultGrade.classList.add("grade-b");
    else if (grade === "C") resultGrade.classList.add("grade-c");
    else if (grade === "D") resultGrade.classList.add("grade-d");
    else if (grade === "F") resultGrade.classList.add("grade-f");

    resultCard.classList.add("show");
}

