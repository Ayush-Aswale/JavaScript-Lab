# Experiment No. 1

## Experiment Title
**Demonstration of Inline, Internal and External JavaScript, Console Methods and Uses Information Webpage**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

## Theory

JavaScript is a client-side scripting language used to make web pages interactive. It can be included in an HTML document in three different ways:

### a) Inline JavaScript
JavaScript code is written directly inside HTML elements using event attributes like `onclick`.

### b) Internal JavaScript
JavaScript code is written inside the `<script>` tag within the HTML file.

### c) External JavaScript
JavaScript code is written in a separate `.js` file and linked using the `<script src=""></script>` tag.

### Console Methods
JavaScript provides several console methods for debugging:
1. `console.log()`
2. `console.error()`
3. `console.warn()`
4. `console.info()`
5. `console.table()`
6. `console.time()`

---

## Experiment Program Code

### File: `normal/normal.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>Student Registration</title>

    <script>
        function showwelcome() {

            let fullName = document.getElementById("fullname").value;
            let userAge = document.getElementById("userage").value;

            let outputText =
                "<h2>Hello, " + fullName + " 👋</h2>" +
                "<p><strong>Age:</strong> " + userAge + " years</p>" +
                "<p>Welcome to the JavaScript Practical.</p>";

            document.getElementById("display").innerHTML = outputText;

            console.log("Student:", fullName);
            console.info("Age:", userAge);
            console.warn("This is a warning example.");
            console.error("This is an error example.");
        }
    </script>
</head>

<body style="font-family: Arial; background:#eef2f7;">

    <div style="width:350px; margin:50px auto; padding:20px; background:white; border-radius:10px; box-shadow:0 0 10px lightgray;">

        <h1 style="text-align:center;">Student Form</h1>

        <label><b>Full Name</b></label><br>
        <input type="text" id="fullname" placeholder="Enter your full name"
            style="width:95%; padding:8px;"><br><br>

        <label><b>Age</b></label><br>
        <input type="number" id="userage" placeholder="Enter your age"
            style="width:95%; padding:8px;"><br><br>

        <button onclick="showwelcome(); greet();"
            style="width:100%; padding:10px; background:#2d89ef; color:white; border:none; border-radius:5px;">
            Submit Details
        </button>

        <hr>

        <div id="display"></div>

    </div>

    <script src="greet.js"></script>

</body>

</html>
```

### File: `normal/greet.js`

```javascript
function greet() {

    alert("Your information has been submitted successfully!");

    console.table([
        {
            Student_Name: "Demo Student",
            Practical: "JavaScript"
        }
    ]);

    console.time("Program Execution");

    for (let i = 1; i <= 50000; i++) {
    }

    console.timeEnd("Program Execution");
}
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
**Making of a Webpage of Student Information Connected to the SIT Nagpur Department Webpage**

## Case Study Program Code

### File: `casestudy/student.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>Student Registration</title>

    <style>
        body {
            background: #e8f4ff;
            font-family: Verdana, sans-serif;
            margin: 0;
            padding: 30px;
        }

        .container {
            width: 420px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 0 12px lightgray;
        }

        h1 {
            color: #004080;
            text-align: center;
        }

        label {
            font-weight: bold;
        }

        input,
        select {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            margin-bottom: 15px;
        }

        button {
            width: 100%;
            padding: 10px;
            background: #0066cc;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        a {
            text-decoration: none;
            color: #004080;
            font-weight: bold;
        }
    </style>
</head>

<body>

<div class="container">

<h1>Student Registration</h1>

<form onsubmit="alert('Registration Successful!'); return false;">

<label>Student Name</label>
<input type="text" placeholder="Enter your name" required>

<label>Phone Number</label>
<input type="tel" placeholder="Enter phone number" required>

<label>Email</label>
<input type="email" placeholder="Enter email">

<label>Date of Birth</label>
<input type="date">

<label>Department</label>
<select>
    <option>Computer Science</option>
    <option>Information Technology</option>
    <option>Electronics</option>
    <option>Mechanical</option>
    <option>Civil</option>
</select>

<label>Semester</label>
<select>
    <option>I</option>
    <option>II</option>
    <option>III</option>
    <option>IV</option>
    <option>V</option>
    <option>VI</option>
</select>

<button type="submit">Register</button>

</form>

<br>

<a href="department.html">View Departments →</a>

</div>

</body>

</html>
```

### File: `casestudy/department.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>SIT Nagpur - Department Page</title>

    <style>
        body {
            background-color: #e8f5e9;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 30px;
        }

        .container {
            width: 600px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
        }

        h1 {
            color: #1b5e20;
            text-align: center;
        }

        h2 {
            color: #2e7d32;
        }

        p {
            color: #444;
        }

        select {
            width: 100%;
            padding: 8px;
            font-size: 16px;
        }

        button {
            background-color: #2e7d32;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        button:hover {
            background-color: #1b5e20;
        }

        a {
            text-decoration: none;
            color: #1b5e20;
            font-weight: bold;
        }

        #info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f1f8e9;
            border-radius: 8px;
        }
    </style>

    <script>
        function showWelcome() {
            alert("Welcome to SIT Nagpur!");
        }

        function showDepartment() {

            let dept = document.getElementById("department").value;
            let message = "";

            if (dept == "Computer Science") {
                message = "Computer Science focuses on programming, software development, AI and data science.";
            }
            else if (dept == "Information Technology") {
                message = "Information Technology focuses on networking, databases and web technologies.";
            }
            else if (dept == "Electronics") {
                message = "Electronics deals with circuits, embedded systems and communication.";
            }
            else if (dept == "Mechanical") {
                message = "Mechanical Engineering focuses on machines, manufacturing and design.";
            }
            else if (dept == "Civil") {
                message = "Civil Engineering deals with buildings, roads and infrastructure.";
            }
            else {
                message = "Please select a department.";
            }

            document.getElementById("info").innerHTML =
                "<h3>" + dept + "</h3><p>" + message + "</p>";
        }
    </script>

</head>

<body>

    <div class="container">

        <h1>Symbiosis Institute of Technology</h1>

        <button onclick="showWelcome()">
            Welcome to SIT Nagpur
        </button>

        <h2>Select Department</h2>

        <select id="department" onchange="showDepartment()">
            <option>Select Department</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Electronics</option>
            <option>Mechanical</option>
            <option>Civil</option>
        </select>

        <div id="info"></div>

        <hr>

        <h2>Campus Facilities</h2>

        <ul>
            <li>Smart Classrooms</li>
            <li>Computer Laboratories</li>
            <li>Central Library</li>
            <li>Sports Complex</li>
            <li>Training & Placement Cell</li>
        </ul>

        <hr>

        <a href="student.html">← Back to Student Registration</a>

    </div>

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

The practical was performed successfully. Different methods of JavaScript, including internal, inline, and external, were demonstrated. A webpage of student information connected to the SIT Nagpur department webpage was created, and JavaScript was used to display a "Welcome" alert successfully. Console methods such as `console.log()`, `console.error()`, `console.warn()`, `console.info()`, `console.table()`, and `console.time()` were also demonstrated.
