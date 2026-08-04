# Experiment No. 3

## Experiment Title
**Implement Control Structures and Form Validation; Create a Grading System Based on User-Entered Marks**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

## Theory

JavaScript provides control structures that help in decision-making and repetition of tasks. Form validation ensures that user inputs are correct before submitting the data.

### a) Control Structures
1. Used to control the flow of program execution.
2. Includes `if`, `if-else`, `else-if`, `switch`, `for`, `while`, and `do-while`.

### b) Form Validation
1. Checks whether user input is valid.
2. Prevents incorrect or incomplete data from being submitted.

### c) Conditional Statements
1. Used to compare values and execute specific blocks of code.
2. Helpful in implementing grading systems and validations.

---

## Experiment Program Code

### File: `3.1/grading.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Grading System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>📊 Student Grading System</h2>

    <form id="gradingForm" onsubmit="return false;">
        <div class="form-group">
            <label for="name">Student Name:</label>
            <input type="text" id="name" placeholder="Enter student name">
            <div class="error-message" id="nameError"></div>
        </div>

        <div class="form-group">
            <label for="marks">Marks (0-100):</label>
            <input type="number" id="marks" placeholder="Enter marks" min="0" max="100">
            <div class="error-message" id="marksError"></div>
        </div>

        <button type="button" class="calculate-btn" onclick="gradeSystem()">Calculate Grade</button>
    </form>

    <div class="result-card" id="resultCard">
        <h3>📝 Result</h3>
        <div class="result-item">
            <span class="label">Student Name:</span>
            <span class="value" id="resultName"></span>
        </div>
        <div class="result-item">
            <span class="label">Marks Obtained:</span>
            <span class="value" id="resultMarks"></span>
        </div>
        <div class="result-item">
            <span class="label">Grade:</span>
            <span class="value" id="resultGrade"></span>
        </div>
        <div class="result-item">
            <span class="label">Remarks:</span>
            <span class="value" id="resultRemarks"></span>
        </div>
    </div>
</div>

<footer class="footer">
    <p>Name: Ayush Aswale | PRN: 24070521009</p>
</footer>

<script src="script.js"></script>

</body>
</html>
```

### File: `3.1/script.js`

```javascript
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
```

### File: `3.1/style.css`

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

footer.footer {
    margin-top: auto;
    text-align: center;
    color: #fff;
    padding: 20px 0 0 0;
    font-size: 15px;
    font-weight: 500;
}

.container {
    background: #ffffff;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: 500;
    color: #555;
    margin-bottom: 6px;
    font-size: 15px;
}

input[type="text"],
input[type="number"] {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s ease;
    outline: none;
}

input[type="text"]:focus,
input[type="number"]:focus {
    border-color: #667eea;
}

.calculate-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-top: 10px;
}

.calculate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.calculate-btn:active {
    transform: translateY(0);
}

.result-card {
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
    background: #f8f9ff;
    border: 2px solid #e8e8ff;
    display: none;
}

.result-card.show {
    display: block;
    animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}

.result-card h3 {
    text-align: center;
    color: #333;
    margin-bottom: 15px;
    font-size: 20px;
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
}

.result-item:last-child {
    border-bottom: none;
}

.result-item .label {
    font-weight: 500;
    color: #555;
}

.result-item .value {
    font-weight: 600;
    color: #333;
}

.result-item .value.grade-aplus {
    color: #2ecc71;
}

.result-item .value.grade-a {
    color: #27ae60;
}

.result-item .value.grade-b {
    color: #3498db;
}

.result-item .value.grade-c {
    color: #f39c12;
}

.result-item .value.grade-d {
    color: #e67e22;
}

.result-item .value.grade-f {
    color: #e74c3c;
}

.error-message {
    color: #e74c3c;
    font-size: 13px;
    margin-top: 5px;
    display: none;
}

.error-message.show {
    display: block;
}

input.error {
    border-color: #e74c3c;
}
```

---

<img width="1919" height="970" alt="Screenshot 2026-08-02 231436" src="https://github.com/user-attachments/assets/50e77599-6686-4acf-b87b-0bd2b1f60671" />
<img width="1919" height="972" alt="Screenshot 2026-08-02 231128" src="https://github.com/user-attachments/assets/25f3d6b1-0835-41b0-a332-6418f6743838" />


---

## Case Study Title
**Password Validation Webpage using JavaScript**

## Case Study Program Code

### File: `3.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
        }

        .login-card {
            background: #fff;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 520px;
            text-align: center;
            margin-bottom: 20px;
        }

        h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }

        .form-group {
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            color: #555;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            outline: none;
        }

        .form-group input:focus {
            border-color: #4facfe;
        }

        .constraints {
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 10px 15px;
            margin-bottom: 15px;
            text-align: left;
        }

        .constraints p {
            font-size: 13px;
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
        }

        .constraints ul {
            margin-left: 18px;
        }

        .constraints li {
            font-size: 13px;
            color: #666;
            margin-bottom: 3px;
        }

        button {
            width: 100%;
            padding: 12px;
            background: #4facfe;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 5px;
        }

        button:hover {
            background: #3a8fd8;
        }

        #message {
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
        }

        .success {
            color: #28a745;
        }

        .error {
            color: #dc3545;
        }

        .footer {
            color: #fff;
            font-size: 14px;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <h2>Student Login</h2>
        <div class="form-grid">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Enter your full name">
            </div>
            <div class="form-group">
                <label for="rollNumber">Roll Number</label>
                <input type="text" id="rollNumber" placeholder="Enter roll number">
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" id="age" placeholder="Enter age">
            </div>
            <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <input type="text" id="mobile" placeholder="Enter 10-digit mobile number">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter password">
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Re-enter password">
            </div>
        </div>

        <div class="constraints">
            <p>Password must contain:</p>
            <ul>
                <li>At least 8 characters</li>
                <li>At least 1 uppercase letter (A-Z)</li>
                <li>At least 1 lowercase letter (a-z)</li>
                <li>At least 1 number (0-9)</li>
                <li>At least 1 special character (!@#$%^&*)</li>
            </ul>
        </div>

        <button onclick="validateLogin()">Login</button>
        <div id="message"></div>
    </div>

    <div class="footer">
        <p>Ayush Aswale | PRN: 24070521009</p>
    </div>

    <script>
        function validateLogin() {
            const name = document.getElementById('name').value.trim();
            const rollNumber = document.getElementById('rollNumber').value.trim();
            const age = document.getElementById('age').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const message = document.getElementById('message');

            if (name === '') {
                message.className = 'error';
                message.textContent = 'Please enter your name.';
                return;
            } else if (rollNumber === '') {
                message.className = 'error';
                message.textContent = 'Please enter your roll number.';
                return;
            } else if (age === '') {
                message.className = 'error';
                message.textContent = 'Please enter your age.';
                return;
            } else if (mobile === '') {
                message.className = 'error';
                message.textContent = 'Please enter your mobile number.';
                return;
            } else if (password === '') {
                message.className = 'error';
                message.textContent = 'Please enter your password.';
                return;
            } else if (confirmPassword === '') {
                message.className = 'error';
                message.textContent = 'Please confirm your password.';
                return;
            }

            if (isNaN(age) || age < 1 || age > 120) {
                message.className = 'error';
                message.textContent = 'Please enter a valid age (1-120).';
                return;
            }

            if (!/^[0-9]{10}$/.test(mobile)) {
                message.className = 'error';
                message.textContent = 'Mobile number must be exactly 10 digits.';
                return;
            }

            if (password.length < 8) {
                message.className = 'error';
                message.textContent = 'Password must be at least 8 characters long.';
                return;
            }

            if (!/[A-Z]/.test(password)) {
                message.className = 'error';
                message.textContent = 'Password must contain at least one uppercase letter.';
                return;
            } else if (!/[a-z]/.test(password)) {
                message.className = 'error';
                message.textContent = 'Password must contain at least one lowercase letter.';
                return;
            } else if (!/[0-9]/.test(password)) {
                message.className = 'error';
                message.textContent = 'Password must contain at least one number.';
                return;
            } else if (!/[!@#$%^&*]/.test(password)) {
                message.className = 'error';
                message.textContent = 'Password must contain at least one special character (!@#$%^&*).';
                return;
            }

            if (password !== confirmPassword) {
                message.className = 'error';
                message.textContent = 'Passwords do not match.';
                return;
            }

            message.className = 'success';
            message.textContent = 'Login successful! Welcome, ' + name + ' (Roll No: ' + rollNumber + ')!';
        }
    </script>
</body>
</html>
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

The practical was completed successfully. Control structures and form validation were implemented using JavaScript. A password validation system and a grading system were developed to validate user input and display the appropriate grade based on the entered marks. The grading system assigns grades (A+, A, B, C, D, F) with corresponding remarks based on the marks entered by the user.
