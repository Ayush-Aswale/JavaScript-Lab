# Experiment No. 7

## Experiment Title
**Demonstration of DOM Manipulation and Form Validation**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)
5. CSS3

## Theory

The Document Object Model (DOM) connects web pages to scripts or programming languages by representing the structure of a document—such as the HTML representing a web page—in memory.

### DOM Manipulation
DOM Manipulation allows you to add, edit, or remove HTML elements interactively. Common methods include:
1. `document.getElementById()` / `querySelector()`: Select elements.
2. `document.createElement()`: Create new elements dynamically.
3. `element.appendChild()` / `element.remove()`: Add or remove child elements.
4. `element.addEventListener()`: Attach event listeners such as clicks, inputs, or submits.

### Form Validation
Form validation ensures that user input meets specific criteria before being processed or sent to a server. Client-side validation improves user experience by providing instant feedback.
Key concepts:
1. Catching the `submit` event and using `event.preventDefault()` to stop page reloads.
2. Checking field values (e.g., checking if required fields are empty, passwords match, emails follow a specific regex pattern).
3. Modifying DOM attributes dynamically to display validation errors visually.

---

## Experiment Program Code

### File: `7.1/index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>To Do List</title>

    <style>
        body {
            font-family: Arial;
            background: #f2f2f2;
            text-align: center;
        }

        .container {
            width: 400px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }

        input {
            padding: 10px;
            width: 220px;
        }

        button {
            padding: 10px;
            margin: 5px;
            border: none;
            cursor: pointer;
        }

        #addBtn {
            background: green;
            color: white;
        }

        .edit {
            background: orange;
        }

        .delete {
            background: red;
            color: white;
        }

        li {
            list-style: none;
            margin: 10px 0;
            padding: 10px;
            background: #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
</head>

<body>

    <div class="container">

        <h1>To Do List</h1>

        <input type="text" id="taskInput" placeholder="Enter task">
        <button id="addBtn">Add</button>

        <ul id="taskList"></ul>

    </div>

    <script>

        let input = document.getElementById("taskInput");
        let addBtn = document.getElementById("addBtn");
        let taskList = document.getElementById("taskList");

        addBtn.addEventListener("click", function() {

            let task = input.value;

            if (task == "") {
                alert("Enter a task");
                return;
            }


            let li = document.createElement("li");
            let span = document.createElement("span");
            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");

                      span.innerText = task;

            editBtn.innerText = "Edit";
            editBtn.className = "edit";

            deleteBtn.innerText = "Delete";
            deleteBtn.className = "delete";


            editBtn.addEventListener("click", function() {

                let newTask = prompt("Edit task:", span.innerText);

                if (newTask != null && newTask != "") {
                    span.innerText = newTask;
                }

            });


            deleteBtn.addEventListener("click", function() {
                li.remove();
            });


            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            // Add li to ul
            taskList.appendChild(li);

            // Clear input
            input.value = "";
        });

    </script>

</body>
</html>
```

---

## Output

<img width="1912" height="566" alt="Screenshot 2026-09-01 102832" src="https://github.com/user-attachments/assets/055488dd-7e0d-4737-ac7b-34ec595e9371" />


---

## Case Study Title
**Form Validation with DOM Manipulation**

## Case Study Program Code

### File: `7.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Case Study Form</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="page-shell">
      <main class="paper-form">
        <h1>Case Study:-</h1>

        <form id="userForm" novalidate>
          <div class="mandatory">*Mandatory to fill</div>

          <div class="field-row">
            <label for="firstName">Firstname:</label>
            <div class="input-wrap">
              <input id="firstName" name="firstName" type="text" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="field-row">
            <label for="lastName">Lastname:</label>
            <div class="input-wrap">
              <input id="lastName" name="lastName" type="text" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="field-row birthday-row">
            <label for="day">Birthday:</label>
            <div class="date-wrap">
              <div class="select-wrap">
                <select id="day" name="day" data-required>
                  <option value="">Day</option>
                </select>
              </div>

              <div class="select-wrap">
                <select id="month" name="month" data-required>
                  <option value="">Month</option>
                </select>
              </div>

              <div class="select-wrap">
                <select id="year" name="year" data-required>
                  <option value="">Year</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field-row">
            <label for="username">Username:</label>
            <div class="input-wrap">
              <input id="username" name="username" type="text" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="field-row">
            <label for="email">E-mail:</label>
            <div class="input-wrap">
              <input id="email" name="email" type="email" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="field-row">
            <label for="website">Website:</label>
            <div class="input-wrap">
              <input id="website" name="website" type="url" />
            </div>
          </div>

          <div class="field-row">
            <label for="password">Password:</label>
            <div class="input-wrap">
              <input id="password" name="password" type="password" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="field-row">
            <label for="confirmPassword">Re-password:</label>
            <div class="input-wrap">
              <input id="confirmPassword" name="confirmPassword" type="password" data-required />
              <span class="field-star">*</span>
            </div>
          </div>

          <div class="terms-row">
            <input id="terms" name="terms" type="checkbox" data-required />
            <label class="terms-label" for="terms">I agree to the terms &amp; conditions.</label>
          </div>

          <div class="submit-row">
            <button type="submit" form="userForm">Submit</button>
          </div>
        </form>

        <footer class="site-footer">
          <p>Name: Ayush Aswale</p>
          <p>PRN: 24070521009</p>
        </footer>
      </main>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### File: `7.2/script.js`

```javascript
const form = document.getElementById('userForm');
const requiredFields = Array.from(document.querySelectorAll('[data-required]'));
const emailField = document.getElementById('email');
const websiteField = document.getElementById('website');

function populateDateOptions() {
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  months.forEach((month) => {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = 2000; year <= 2024; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

function markValidity(field, isValid) {
  if (field.type === 'checkbox') {
    field.style.outline = isValid ? 'none' : '2px solid #ca3a3a';
    return;
  }

  field.classList.toggle('invalid', !isValid);
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isWebsiteValid(website) {
  if (website.trim() === '') {
    return true;
  }

  try {
    const url = new URL(website.trim());
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function isFieldValid(field) {
  if (field.type === 'checkbox') {
    return field.checked;
  }

  if (field.tagName === 'SELECT') {
    return field.value !== '' && field.value !== 'Day' && field.value !== 'Month' && field.value !== 'Year';
  }

  if (field.id === 'email') {
    return field.value.trim() !== '' && isEmailValid(field.value);
  }

  if (field.id === 'website') {
    return isWebsiteValid(field.value);
  }

  return field.value.trim() !== '';
}

function validateForm() {
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const valid = isFieldValid(field);
    markValidity(field, valid);

    if (!valid && !firstInvalid) {
      firstInvalid = field;
    }
  });

  if (emailField && !isEmailValid(emailField.value)) {
    markValidity(emailField, false);
    if (!firstInvalid) {
      firstInvalid = emailField;
    }
  }

  if (websiteField && !isWebsiteValid(websiteField.value)) {
    markValidity(websiteField, false);
    if (!firstInvalid) {
      firstInvalid = websiteField;
    }
  }

  if (firstInvalid) {
    if (firstInvalid === emailField) {
      alert('Please enter a valid email address.');
    } else if (firstInvalid === websiteField) {
      alert('Please enter a valid website URL.');
    } else {
      alert('Please fill in all required fields before submitting.');
    }
    firstInvalid.focus();
    return false;
  }

  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    confirmPassword.focus();
    markValidity(confirmPassword, false);
    return false;
  }

  return true;
}

populateDateOptions();

requiredFields.forEach((field) => {
  field.addEventListener('input', () => {
    markValidity(field, isFieldValid(field));
  });

  field.addEventListener('change', () => {
    markValidity(field, isFieldValid(field));
  });
});

if (emailField) {
  emailField.addEventListener('input', () => {
    markValidity(emailField, isEmailValid(emailField.value));
  });
}

if (websiteField) {
  websiteField.addEventListener('input', () => {
    markValidity(websiteField, isWebsiteValid(websiteField.value));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  alert('Form submitted successfully!');
  form.reset();
  requiredFields.forEach((field) => markValidity(field, true));
  if (emailField) markValidity(emailField, true);
  if (websiteField) markValidity(websiteField, true);
});
```

### File: `7.2/styles.css`

```css
:root {
  --paper-bg: #dfe7ee;
  --ink: #1e1f22;
  --line: #2d2d2d;
  --muted: #6e6e6e;
  --required: #ca3a3a;
  --input-bg: rgba(255,255,255,0.08);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  background: var(--paper-bg);
  color: var(--ink);
  font-family: "Georgia", "Times New Roman", serif;
}

body {
  min-height: 100vh;
}

.page-shell {
  width: 100%;
  min-height: 100vh;
  background: var(--paper-bg);
  padding: 8px 18px 30px;
}

.paper-form {
  width: min(1280px, 100%);
  margin: 0 auto;
  padding-top: 14px;
  position: relative;
}

h1 {
  margin: 0;
  font-size: clamp(2.1rem, 2.5vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
}

.intro {
  margin: 0;
  font-size: clamp(1.3rem, 1.9vw, 3rem);
  line-height: 1.5;
  max-width: 1200px;
  letter-spacing: 0.02em;
  font-weight: 400;
}

form {
  margin-top: 26px;
  margin-left: 48px;
  max-width: 940px;
}

.mandatory {
  color: var(--required);
  font-style: italic;
  font-size: clamp(1.5rem, 2vw, 2.4rem);
  margin: 0 0 18px 10px;
  letter-spacing: 0.01em;
}

.field-row {
  display: flex;
  align-items: center;
  margin: 0 0 18px;
}

label {
  font-size: clamp(1.2rem, 1.5vw, 2.3rem);
  width: 200px;
  text-align: right;
  padding-right: 18px;
  line-height: 1.3;
  font-weight: 500;
}

.input-wrap {
  position: relative;
  width: min(100%, 470px);
  flex: 1;
}

.input-wrap input,
.select-wrap select {
  width: 100%;
  height: 42px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 0;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
  font-size: 1.15rem;
  color: var(--ink);
  padding: 0 14px;
  appearance: none;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-wrap input:focus,
.select-wrap select:focus {
  border-color: rgba(0,0,0,0.85);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
}

.input-wrap input.invalid,
.select-wrap select.invalid {
  border-color: var(--required);
  box-shadow: 0 0 0 1px rgba(220, 62, 62, 0.35);
}

.field-star {
  position: absolute;
  right: -22px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--required);
  font-size: 1.6rem;
  font-weight: 700;
}

.birthday-row {
  align-items: center;
}

.date-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 10px;
  width: min(100%, 470px);
}

.select-wrap {
  position: relative;
}

.select-wrap::after {
  content: "\25BE";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: var(--ink);
  pointer-events: none;
}

.select-wrap select {
  padding-right: 32px;
  color: #2d2d2d;
}

.terms-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  margin-left: 205px;
  font-size: 1.1rem;
}

.terms-row input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #d9d9d9;
  border: 1px solid rgba(0,0,0,0.8);
}

.terms-label {
  width: auto;
  text-align: left;
  padding-right: 0;
  font-size: clamp(1.2rem, 1.6vw, 2rem);
  font-weight: 400;
}

.submit-row {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 30px;
}

button[type="submit"] {
  background: #d5dfe8;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  padding: 10px 28px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  color: #1d1d1d;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
}

button[type="submit"]:hover {
  background: #c9d7e1;
}

.site-footer {
  margin-top: 36px;
  padding-bottom: 20px;
  text-align: center;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  line-height: 1.4;
  font-weight: 500;
}

.site-footer p {
  margin: 0;
}

@media (max-width: 860px) {
  .paper-form {
    padding: 10px 8px 30px;
  }

  form {
    margin-left: 0;
  }

  .field-row {
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    width: auto;
    text-align: left;
    padding-right: 0;
    margin-bottom: 8px;
  }

  .input-wrap,
  .date-wrap {
    width: min(100%, 420px);
  }

  .mandatory {
    margin-left: 0;
  }

  .terms-row {
    margin-left: 0;
  }
}
```

---

## Output (Case Study)

<img width="1897" height="937" alt="Screenshot 2026-09-01 103815" src="https://github.com/user-attachments/assets/9f32a95a-6816-4ef2-9a50-aec6bccadb71" />


---

## Result / Conclusion

The practical was performed successfully. DOM manipulation techniques were used to create a functional To-Do list, and comprehensive client-side form validation was implemented for the user registration form, ensuring robust data entry.
