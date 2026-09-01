# Experiment No. 6

## Experiment Title
**Demonstration of JavaScript String Operations and Text Processing Tools**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)
5. CSS3

## Theory

JavaScript provides a rich set of built-in methods to manipulate strings and perform text processing. Along with regular expressions (Regex), these string operations allow for powerful data extraction, validation, and transformation. 

### Common String Methods
1. `match()`: Retrieves the result of matching a string against a regular expression.
2. `replace()`: Returns a new string with some or all matches of a pattern replaced by a replacement.
3. `split()`: Divides a String into an ordered list of substrings.
4. `reverse()`: Used along with `split()` and `join()` to reverse a string.
5. `toLowerCase()` / `toUpperCase()`: Converts a string to lowercase or uppercase.

### Regular Expressions (Regex)
Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the `exec()` and `test()` methods of `RegExp`, and with the `match()`, `matchAll()`, `replace()`, `replaceAll()`, `search()`, and `split()` methods of `String`.

---

## Experiment Program Code

### File: `6.1/index.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>String Operations</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #f4f7ff, #eef2ff);
            padding: 24px;
            margin: 0;
            color: #1f2937;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .panel {
            margin-bottom: 20px;
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #f9fafb;
            min-height: 220px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 18px;
            margin-top: 20px;
        }

        label {
            display: block;
            margin: 8px 0 6px;
            font-weight: bold;
        }

        input,
        textarea,
        button {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            margin: 5px 0 10px;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            font-size: 14px;
        }

        textarea {
            min-height: 120px;
            resize: vertical;
        }

        .button-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        button {
            width: auto;
            min-width: 150px;
            cursor: pointer;
            background-color: #2563eb;
            color: white;
            border: none;
            transition: background 0.2s ease;
        }

        button:hover {
            background-color: #1d4ed8;
        }

        #output {
            margin-top: 18px;
            padding: 15px;
            background-color: #eff6ff;
            border-left: 4px solid #2563eb;
            min-height: 24px;
            border-radius: 6px;
            white-space: pre-wrap;
            line-height: 1.5;
        }

        .footer {
            margin-top: 24px;
            text-align: center;
            font-size: 14px;
            color: #374151;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>JavaScript String Operations</h2>

        <div class="panel">
            <label for="strInput">Enter a paragraph or text:</label>
            <textarea id="strInput" placeholder="Enter text here..."></textarea>
        </div>

        <div class="features-grid">
            <div class="panel">
                <h3>Find all vowels</h3>
                <button onclick="findVowels()">Find Vowels</button>
            </div>

            <div class="panel">
                <h3>Replace a word</h3>
                <label for="wordToFind">Word to replace</label>
                <input id="wordToFind" type="text" placeholder="e.g. earth">
                <label for="wordToReplace">Replacement word</label>
                <input id="wordToReplace" type="text" placeholder="e.g. world">
                <button onclick="replaceWord()">Replace Word</button>
            </div>

            <div class="panel">
                <h3>Find position of a word</h3>
                <label for="wordToSearch">Search word</label>
                <input id="wordToSearch" type="text" placeholder="e.g. JavaScript">
                <button onclick="findWordPosition()">Find Position</button>
            </div>

            <div class="panel">
                <h3>Validate email</h3>
                <label for="emailInput">Email address</label>
                <input id="emailInput" type="text" placeholder="e.g. name@example.com">
                <button onclick="validateEmail()">Validate Email</button>
            </div>

            <div class="panel">
                <h3>Extract email addresses</h3>
                <button onclick="extractEmails()">Extract Emails</button>
            </div>

            <div class="panel">
                <h3>Reverse paragraph</h3>
                <button onclick="reverseParagraph()">Reverse Paragraph</button>
            </div>
        </div>

        <div id="output">Output will appear here...</div>

        <div class="footer">
            Ayush Aswale<br>
            PRN: 24070521009
        </div>
    </div>

    <script>
        function getText() {
            return document.getElementById("strInput").value;
        }

        function showResult(label, value) {
            document.getElementById("output").innerHTML = "<b>" + label + ":</b> " + value;
        }

        function findVowels() {
            const str = getText();
            const vowels = str.match(/[aeiou]/gi) || [];
            const uniqueVowels = [...new Set(vowels.map(v => v.toLowerCase()))];

            showResult(
                "Vowels Found",
                vowels.length > 0
                    ? "" + vowels.join(", ") + "<br>Total: " + vowels.length + "<br>Unique: " + uniqueVowels.join(", ")
                    : "No vowels found"
            );
        }

        function replaceWord() {
            const text = getText();
            const wordToFind = document.getElementById("wordToFind").value.trim();
            const wordToReplace = document.getElementById("wordToReplace").value;

            if (!wordToFind) {
                showResult("Replace Word", "Please enter a word to replace.");
                return;
            }

            const regex = new RegExp(wordToFind.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
            const updatedText = text.replace(regex, wordToReplace);
            showResult("Updated Text", updatedText || "No text to replace");
        }

        function findWordPosition() {
            const text = getText();
            const searchWord = document.getElementById("wordToSearch").value.trim();

            if (!searchWord) {
                showResult("Word Position", "Please enter a word to search.");
                return;
            }

            const regex = new RegExp("\\b" + searchWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
            const positions = [];
            let match;

            while ((match = regex.exec(text)) !== null) {
                positions.push(match.index);
            }

            showResult(
                "Word Position",
                positions.length > 0 ? "Found at index/position: " + positions.join(", ") : "Word not found"
            );
        }

        function validateEmail() {
            const email = document.getElementById("emailInput").value.trim();
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isValid = emailPattern.test(email);

            showResult("Email Validation", isValid ? "Valid email address" : "Invalid email address");
        }

        function extractEmails() {
            const text = getText();
            const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
            const emails = text.match(emailPattern) || [];

            showResult("Extracted Emails", emails.length > 0 ? emails.join(", ") : "No email addresses found");
        }

        function reverseParagraph() {
            const text = getText();
            const reversedText = text.split(/\s+/).reverse().join(" ");

            showResult("Reversed Paragraph", reversedText || "No text to reverse");
        }
    </script>
</body>

</html>
```

---

## Output

<img width="1919" height="953" alt="Screenshot 2026-08-25 110831" src="https://github.com/user-attachments/assets/3b969e1e-e48c-4637-b932-7c0cec0e9fb0" />


---

## Case Study Title
**JavaScript Text Processing Tools Case Study**

## Case Study Program Code

### File: `6.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practical 6 - Text Tools</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="main-container">
    <header>
      <h1>Text Processing Tools</h1>
      <p class="subtitle">Practical 6 - JavaScript String & Pattern Operations</p>
    </header>

    <div class="card input-card">
      <label for="paraInput"><strong>Enter Paragraph / Text:</strong></label>
      <textarea id="paraInput" rows="5" placeholder="Type or paste text here..."></textarea>
    </div>

    <div class="row-grid-2">
      <div class="card">
        <h3>1. Count Vowels</h3>
        <button id="btnFindVowels">Count Vowels</button>
        <div class="result-box" id="resVowels">Result will appear here...</div>
      </div>

      <div class="card">
        <h3>2. Reverse String</h3>
        <button id="btnReversePara">Reverse String</button>
        <div class="result-box" id="resReverse">Result will appear here...</div>
      </div>
    </div>

    <footer class="site-footer">
      <p>Name: Ayush Aswale | PRN: 24070521009</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### File: `6.2/script.js`

```javascript
const paraInput = document.getElementById('paraInput');

function getInputValue() {
  return paraInput.value.trim();
}

document.getElementById('btnFindVowels').addEventListener('click', function () {
  const text = getInputValue();
  const output = document.getElementById('resVowels');
  
  if (!text) {
    output.textContent = 'Please enter a paragraph first.';
    return;
  }

  const vowelMatches = text.match(/[aeiou]/gi);
  if (!vowelMatches) {
    output.textContent = 'No vowels found in the paragraph.';
    return;
  }

  const totalVowels = vowelMatches.length;
  output.textContent = `Total Vowels Count: ${totalVowels}`;
});

document.getElementById('btnReversePara').addEventListener('click', function () {
  const text = getInputValue();
  const output = document.getElementById('resReverse');

  if (!text) {
    output.textContent = 'Please enter a paragraph first.';
    return;
  }

  const reversed = text.split('').reverse().join('');
  output.textContent = reversed;
});
```

### File: `6.2/style.css`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9;
  color: #333333;
  line-height: 1.5;
  padding: 20px;
}

.main-container {
  max-width: 860px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 24px;
}

header h1 {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.95rem;
  color: #64748b;
}

.input-card {
  margin-bottom: 20px;
}

.row-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card h3 {
  font-size: 1.02rem;
  color: #334155;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
}

textarea {
  width: 100%;
  padding: 9px 11px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.92rem;
  color: #1e293b;
  outline: none;
  background: #fafafa;
}

textarea:focus {
  border-color: #2563eb;
  background: #ffffff;
}

button {
  width: 100%;
  padding: 10px 12px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1d4ed8;
}

.result-box {
  margin-top: 10px;
  padding: 10px 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  min-height: 55px;
  font-size: 0.88rem;
  color: #1e293b;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 720px) {
  .row-grid-2 {
    grid-template-columns: 1fr;
  }
}

.site-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.9rem;
}
```

---

## Output (Case Study)

<img width="1887" height="962" alt="Screenshot 2026-08-25 110900" src="https://github.com/user-attachments/assets/99421fa1-1f8e-4dcf-bc37-503ad0ff9a2a" />


---

## Result / Conclusion

The practical was performed successfully. The use of JavaScript string methods and regular expressions was demonstrated for text processing, pattern matching, data extraction, and form validation tasks.
