# Experiment No. 8

## Experiment Title
**Demonstration of Form Validation and Regular Expressions**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)
5. CSS3

## Theory

Form validation is an essential part of web development to ensure that users provide the correct type of data before submitting a form. JavaScript is widely used for client-side validation to provide real-time feedback and prevent unnecessary server requests.

### Client-Side Validation Methods
1. **Regular Expressions (Regex):** Used to check if the input matches a specific pattern (e.g., email format, mobile number format).
2. **Event Listeners:** Events like `input`, `blur`, `change`, and `submit` are captured to trigger validation functions when the user interacts with form fields.
3. **FormData API:** A convenient way to construct a set of key/value pairs representing form fields and their values, easily retrieving user input upon submission.

---

## Experiment Program Code

### File: `8.1/index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gym Admission Form</title>

    <style>
        body{
            font-family: Arial, sans-serif;
            background:#f2f2f2;
        }

        .container{
            width:400px;
            margin:40px auto;
            padding:20px;
            background:white;
            border-radius:10px;
            box-shadow:0 0 10px gray;
        }

        h2{
            text-align:center;
        }

        label{
            display:block;
            margin-top:10px;
        }

        input,
        select{
            width:100%;
            padding:8px;
            margin-top:5px;
        }

        .error{
            color:red;
            font-size:13px;
        }

        .success{
            color:green;
            font-size:14px;
            text-align:center;
        }

        button{
            width:100%;
            padding:10px;
            margin-top:15px;
            background:green;
            color:white;
            border:none;
            cursor:pointer;
        }

        footer{
            text-align:center;
            margin-top:25px;
            padding:12px 0;
            font-size:14px;
            color:#333;
            background:#eaeaea;
            border-top:1px solid #ccc;
        }
    </style>
</head>

<body>

<div class="container">

    <h2>Gym Admission Form</h2>

    <form id="gymForm">

        <label>Full Name</label>
        <input type="text" id="name">
        <span id="nameError" class="error"></span>

        <label>Age</label>
        <input type="number" id="age">
        <span id="ageError" class="error"></span>

        <label>Email</label>
        <input type="email" id="email">
        <span id="emailError" class="error"></span>

        <label>Mobile Number</label>
        <input type="text" id="mobile">
        <span id="mobileError" class="error"></span>

        <label>Membership Plan</label>
        <select id="plan">
            <option value="">Select Plan</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
        </select>
        <span id="planError" class="error"></span>

        <button type="submit">Submit</button>

        <p id="result" class="success"></p>

    </form>

</div>

<script>

// Name Validation (input event)
document.getElementById("name").addEventListener("input", function(){

    let name = this.value;

    if(/^[A-Za-z ]+$/.test(name)){
        document.getElementById("nameError").innerHTML="";
    }else{
        document.getElementById("nameError").innerHTML="Only letters allowed.";
    }

});


// Age Validation (blur event)
document.getElementById("age").addEventListener("blur", function(){

    let age = this.value;

    if(age>=16 && age<=60){
        document.getElementById("ageError").innerHTML="";
    }else{
        document.getElementById("ageError").innerHTML="Age must be between 16 and 60.";
    }

});


// Email Validation (input event)
document.getElementById("email").addEventListener("input", function(){

    let email = this.value;
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(pattern.test(email)){
        document.getElementById("emailError").innerHTML="";
    }else{
        document.getElementById("emailError").innerHTML="Invalid email.";
    }

});


// Mobile Validation (input event)
document.getElementById("mobile").addEventListener("input", function(){

    let mobile = this.value;

    if(/^\d{10}$/.test(mobile)){
        document.getElementById("mobileError").innerHTML="";
    }else{
        document.getElementById("mobileError").innerHTML="Enter 10-digit mobile number.";
    }

});


// Membership Validation (change event)
document.getElementById("plan").addEventListener("change", function(){

    if(this.value==""){
        document.getElementById("planError").innerHTML="Please select a plan.";
    }else{
        document.getElementById("planError").innerHTML="";
    }

});


// Form Submission (submit event)
document.getElementById("gymForm").addEventListener("submit", function(e){

    e.preventDefault();

    if(
        document.getElementById("nameError").innerHTML=="" &&
        document.getElementById("ageError").innerHTML=="" &&
        document.getElementById("emailError").innerHTML=="" &&
        document.getElementById("mobileError").innerHTML=="" &&
        document.getElementById("plan").value!=""
    ){

        document.getElementById("result").innerHTML="Gym Admission Successful!";

    }else{

        document.getElementById("result").innerHTML="";
        alert("Please correct the errors before submitting.");

    }

});

</script>

<footer>
    Ayush Aswale &nbsp;|&nbsp; PRN: 24070521009
</footer>

</body>
</html>
```

---

## Output

<img width="1917" height="970" alt="Screenshot 2026-09-15 110824" src="https://github.com/user-attachments/assets/9cafbc2e-2dc2-4c9c-a66b-6a3e0d782e5f" />


---

## Case Study Title
**Form Data Processing with FormData API**

## Case Study Program Code

### File: `8.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gym Admission Form</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <main class="page-shell">
    <section class="form-panel" aria-labelledby="form-heading">
      <div class="form-heading">
        <p class="section-label">New member</p>
        <h2 id="form-heading">Your information</h2>
      </div>

      <form id="admission-form">
        <div class="field-group full-width">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" autocomplete="name" placeholder="Enter your full name" required>
        </div>

        <fieldset class="field-group">
          <legend>Sex</legend>
          <div class="option-row">
            <label class="choice"><input type="radio" name="sex" value="Male" required><span>Male</span></label>
            <label class="choice"><input type="radio" name="sex" value="Female"><span>Female</span></label>
          </div>
        </fieldset>

        <div class="field-group">
          <label for="eye-color">Eye color</label>
          <select id="eye-color" name="eyeColor" required>
            <option value="" selected disabled>Select a color</option>
            <option>Brown</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Hazel</option>
            <option>Gray</option>
            <option>Other</option>
          </select>
        </div>

        <fieldset class="field-group">
          <legend>Height</legend>
          <p class="field-hint">Are you over 6 feet tall?</p>
          <div class="option-row">
            <label class="choice"><input type="radio" name="height" value="Yes" required><span>Yes</span></label>
            <label class="choice"><input type="radio" name="height" value="No"><span>No</span></label>
          </div>
        </fieldset>

        <fieldset class="field-group">
          <legend>Weight</legend>
          <p class="field-hint">Are you over 200 pounds?</p>
          <div class="option-row">
            <label class="choice"><input type="radio" name="weight" value="Yes" required><span>Yes</span></label>
            <label class="choice"><input type="radio" name="weight" value="No"><span>No</span></label>
          </div>
        </fieldset>

        <div class="field-group full-width">
          <label for="athletic-ability">Athletic ability</label>
          <select id="athletic-ability" name="athleticAbility" required>
            <option value="" selected disabled>Choose your level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Professional</option>
          </select>
        </div>

        <button type="submit">Enter my information <span aria-hidden="true">&#8594;</span></button>
        <p id="form-message" class="form-message" role="status" aria-live="polite"></p>
      </form>
    </section>

    <footer class="student-footer">
      <span>Ayush Aswale</span>
      <span aria-hidden="true">|</span>
      <span>PRN: 24070521009</span>
    </footer>
  </main>
</body>
</html>
```

### File: `8.2/script.js`

```javascript
const admissionForm = document.querySelector("#admission-form");
const formMessage = document.querySelector("#form-message");

admissionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(admissionForm);
  const memberName = formData.get("name").trim();

  formMessage.textContent = `Thanks, ${memberName}! Your gym admission information has been entered.`;
  admissionForm.reset();
});
```

### File: `8.2/style.css`

```css
:root {
  --ink: #17211d;
  --muted: #68736e;
  --paper: #f4f1e9;
  --panel: #fffdf8;
  --line: #d9ddd3;
  --accent: #d8fa55;
  --accent-dark: #a6c52d;
  --shadow: 0 24px 60px rgba(37, 47, 38, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--ink);
  background: var(--paper);
  font-family: "DM Sans", sans-serif;
}

body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: "";
  opacity: 0.5;
  background-image: radial-gradient(#c6cdbf 0.8px, transparent 0.8px);
  background-size: 18px 18px;
}

.page-shell {
  max-width: 760px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px 20px;
}

h2 {
  margin: 0;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.form-panel {
  width: 100%;
  align-self: center;
  padding: clamp(32px, 5vw, 64px);
  background: var(--panel);
  box-shadow: var(--shadow);
}

.student-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 18px 0 4px;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.section-label {
  margin: 0 0 8px;
  color: var(--accent-dark);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.form-heading {
  margin-bottom: 40px;
}

h2 {
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 0.95;
  text-transform: uppercase;
}

form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 26px 20px;
}

.field-group {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.full-width {
  grid-column: 1 / -1;
}

label,
legend {
  display: block;
  margin-bottom: 10px;
  color: var(--ink);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

input[type="text"],
select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 0;
  outline: 0;
  color: var(--ink);
  background: transparent;
  font: inherit;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

select {
  cursor: pointer;
}

input[type="text"]:focus,
select:focus {
  border-color: var(--accent-dark);
  box-shadow: 0 0 0 3px rgba(216, 250, 85, 0.35);
}

.field-hint {
  margin: -3px 0 13px;
  color: var(--muted);
  font-size: 0.78rem;
}

.option-row {
  display: flex;
  gap: 8px;
}

.choice {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 76px;
  margin: 0;
  padding: 10px 12px;
  border: 1px solid var(--line);
  color: var(--muted);
  cursor: pointer;
  font-size: 0.75rem;
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
}

.choice:has(input:checked) {
  border-color: var(--ink);
  color: var(--ink);
  background: var(--accent);
}

.choice input {
  accent-color: var(--ink);
}

button {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  margin-top: 8px;
  padding: 0 20px;
  border: 0;
  color: var(--ink);
  background: var(--accent);
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 160ms ease, transform 160ms ease;
}

button:hover {
  background: #c8ea45;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

button span {
  font-size: 1.5rem;
  font-weight: 400;
}

.form-message {
  grid-column: 1 / -1;
  min-height: 1.2em;
  margin: -10px 0 0;
  color: var(--accent-dark);
  font-size: 0.86rem;
  font-weight: 700;
}

@media (max-width: 780px) {
  .page-shell {
    padding: 20px;
  }

  .form-panel {
    padding: 36px 28px;
  }
}

@media (max-width: 520px) {
  .page-shell {
    padding: 0;
  }

  .form-panel {
    box-shadow: none;
  }

  form {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  button,
  .form-message {
    grid-column: auto;
  }
}
```

---

## Output (Case Study)

<img width="1901" height="962" alt="Screenshot 2026-09-15 110605" src="https://github.com/user-attachments/assets/247a5ee9-1210-4562-a17d-f86d330b5d27" />


---

## Result / Conclusion

The practical was performed successfully. Real-time form validation was implemented using regular expressions and DOM events, ensuring the accuracy of user input. Additionally, the `FormData` API was demonstrated for easy extraction and processing of form data upon submission.
