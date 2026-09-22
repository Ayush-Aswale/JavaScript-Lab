# Experiment No. 9

## Experiment Title
**Demonstration of Web Storage (localStorage and sessionStorage)**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)
5. CSS3

## Theory

The Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using cookies.

### Storage Types
1. **`localStorage`:** Maintains a separate storage area for each given origin that persists even after the browser is closed and reopened. Data saved in localStorage does not expire.
2. **`sessionStorage`:** Maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores).

Both APIs provide similar methods:
- `setItem(key, value)`: Adds a key/value pair to the storage.
- `getItem(key)`: Retrieves a value by its key.
- `removeItem(key)`: Removes an item by its key.
- `clear()`: Empties all keys out of the storage.

---

## Experiment Program Code

### File: `9.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Admission | Apply Now</title>
    <style>
        :root {
            --page: #f4f0e8;
            --surface: #fffdf8;
            --text: #18221d;
            --muted: #68736b;
            --accent: #d45d3d;
            --accent-dark: #a73f2b;
            --line: #d9d8cc;
            --shadow: rgba(36, 45, 39, 0.12);
        }

        body.dark {
            --page: #17201c;
            --surface: #222d27;
            --text: #f1eee4;
            --muted: #b7c0b8;
            --accent: #f07855;
            --accent-dark: #ff9676;
            --line: #455249;
            --shadow: rgba(0, 0, 0, 0.28);
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: Georgia, 'Times New Roman', serif;
            background: var(--page);
            color: var(--text);
            transition: background 180ms ease, color 180ms ease;
        }

        .topbar {
            display: flex;
            justify-content: flex-end;
            max-width: 1080px;
            margin: auto;
            padding: 24px 28px 0;
        }

        .theme-toggle {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 9px 15px;
            background: var(--surface);
            color: var(--text);
            cursor: pointer;
            font: 600 13px Arial, sans-serif;
        }

        .theme-toggle span { font-size: 17px; }

        main {
            width: min(100% - 40px, 1080px);
            margin: 32px auto 0;
        }

        .intro { max-width: 650px; margin-bottom: 28px; }

        .eyebrow {
            margin: 0 0 12px;
            color: var(--accent);
            font: 700 12px Arial, sans-serif;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            font-size: clamp(42px, 7vw, 76px);
            line-height: 0.96;
            letter-spacing: -2px;
        }

        .intro p:last-child {
            max-width: 510px;
            margin: 19px 0 0;
            color: var(--muted);
            font: 17px/1.55 Arial, sans-serif;
        }

        .form-shell {
            display: grid;
            grid-template-columns: 0.72fr 1.28fr;
            gap: 44px;
            padding: 34px;
            border: 1px solid var(--line);
            border-radius: 8px;
            background: var(--surface);
            box-shadow: 0 18px 42px var(--shadow);
        }

        .side-note { border-right: 1px solid var(--line); padding: 10px 34px 10px 4px; }
        .side-note h2 { margin: 0 0 15px; font-size: 28px; line-height: 1.1; }
        .side-note p { margin: 0; color: var(--muted); font: 15px/1.6 Arial, sans-serif; }
        .side-note .mark { margin-top: 42px; color: var(--accent); font-size: 56px; line-height: 1; }

        form { display: grid; gap: 19px; }
        .field { display: grid; gap: 8px; }
        label { font: 700 13px Arial, sans-serif; }
        input, select {
            width: 100%;
            border: 1px solid var(--line);
            border-radius: 4px;
            padding: 14px 15px;
            outline: none;
            background: transparent;
            color: var(--text);
            font: 16px Arial, sans-serif;
        }
        input:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(212, 93, 61, 0.15); }
        select { cursor: pointer; }
        option { background: var(--surface); color: var(--text); }

        .submit-row { display: flex; align-items: center; gap: 16px; margin-top: 4px; }
        .submit-button {
            border: 0;
            border-radius: 4px;
            padding: 15px 24px;
            background: var(--accent);
            color: #fff;
            cursor: pointer;
            font: 700 14px Arial, sans-serif;
            transition: background 150ms ease, transform 150ms ease;
        }
        .submit-button:hover { background: var(--accent-dark); transform: translateY(-1px); }
        .status { margin: 0; color: var(--accent-dark); font: 14px Arial, sans-serif; }

        footer {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            max-width: 1080px;
            margin: 32px auto 0;
            padding: 0 28px 28px;
            color: var(--muted);
            font: 13px Arial, sans-serif;
        }
        footer strong { color: var(--text); }

        @media (max-width: 700px) {
            .topbar { padding: 18px 20px 0; }
            main { width: min(100% - 28px, 560px); margin-top: 28px; }
            .form-shell { grid-template-columns: 1fr; gap: 26px; padding: 24px; }
            .side-note { border-right: 0; border-bottom: 1px solid var(--line); padding: 0 0 23px; }
            .side-note .mark { display: none; }
            footer { padding: 0 20px 22px; flex-direction: column; gap: 7px; }
        }
    </style>
</head>

<body>
    <div class="topbar">
        <button class="theme-toggle" type="button" id="themeToggle" aria-pressed="false">
            <span aria-hidden="true">◐</span> Switch theme
        </button>
    </div>

    <main>
        <header class="intro">
            <p class="eyebrow">Admissions 2026</p>
            <h1>Start your next chapter.</h1>
            <p>Complete the form below to take the first step toward a course built around your ambitions.</p>
        </header>

        <section class="form-shell" aria-labelledby="form-title">
            <div class="side-note">
                <h2 id="form-title">Student admission form</h2>
                <p>Tell us a little about yourself and the course you would like to pursue. Our admissions team will get in touch with you soon.</p>
                <div class="mark" aria-hidden="true">✦</div>
            </div>

            <form id="admissionForm">
                <div class="field">
                    <label for="fullName">Full name</label>
                    <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" autocomplete="name" required />
                </div>
                <div class="field">
                    <label for="email">Email address</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required />
                </div>
                <div class="field">
                    <label for="phone">Phone number</label>
                    <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" autocomplete="tel" required />
                </div>
                <div class="field">
                    <label for="course">Desired course</label>
                    <select id="course" name="course" required>
                        <option value="" selected disabled>Select a course</option>
                        <option value="computer-science">Computer Science</option>
                        <option value="information-technology">Information Technology</option>
                        <option value="business-management">Business Management</option>
                        <option value="design">Design</option>
                        <option value="data-science">Data Science</option>
                    </select>
                </div>
                <div class="submit-row">
                    <button class="submit-button" type="submit">Submit application</button>
                    <p class="status" id="formStatus" role="status" aria-live="polite"></p>
                </div>
            </form>
        </section>
    </main>

    <footer>
        <span><strong>Ayush Aswale</strong></span>
        <span>PRN: <strong>24070521009</strong></span>
    </footer>

    <script>
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const admissionForm = document.getElementById('admissionForm');
        const formStatus = document.getElementById('formStatus');

        function setTheme(theme) {
            const isDark = theme === 'dark';
            body.classList.toggle('dark', isDark);
            themeToggle.setAttribute('aria-pressed', String(isDark));
            localStorage.setItem('theme', theme);
            sessionStorage.setItem('sessionTheme', theme);
        }

        themeToggle.addEventListener('click', function () {
            setTheme(body.classList.contains('dark') ? 'light' : 'dark');
        });

        admissionForm.addEventListener('submit', function (event) {
            event.preventDefault();
            formStatus.textContent = 'Thank you. Your application has been received.';
            admissionForm.reset();
        });

        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    </script>
</body>

</html>
```

---

## Output

<img width="1916" height="960" alt="Screenshot 2026-09-21 093130" src="https://github.com/user-attachments/assets/dedad1ba-26dd-45cc-aedd-43b0458f0413" />


---

## Case Study Title
**Seminar Schedule Planner with State Persistence**

## Case Study Program Code

### File: `9.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seminar Schedule Planner</title>
  <style>
    :root {
      --ink: #20303b;
      --line: #324650;
      --paper: #fffdf7;
      --header: #dce9ee;
      --begin: #e8f4cc;
      --end: #dfe4ff;
      --topic: #fff8df;
      --accent: #bd4b39;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      padding: 40px 20px;
      color: var(--ink);
      background: linear-gradient(135deg, #eef3f0, #f8eee1);
      font-family: Georgia, "Times New Roman", serif;
    }

    main {
      width: min(920px, 100%);
      margin: 0 auto;
      padding: 30px clamp(18px, 4vw, 48px) 42px;
      background: var(--paper);
      border: 1px solid #c7d0cc;
      box-shadow: 0 12px 30px rgba(32, 48, 59, 0.12);
    }

    .eyebrow {
      margin: 0 0 8px;
      color: var(--accent);
      font: 700 0.78rem/1.2 Arial, sans-serif;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 24px;
      font-size: clamp(1.8rem, 4vw, 2.7rem);
      line-height: 1.05;
      font-weight: 700;
    }

    .table-wrap { overflow-x: auto; }

    table {
      width: 100%;
      min-width: 650px;
      border-collapse: collapse;
      border: 3px solid var(--line);
      table-layout: fixed;
      font-size: clamp(0.9rem, 1.6vw, 1.08rem);
    }

    caption {
      margin-bottom: 12px;
      color: #51636b;
      font: 0.85rem Arial, sans-serif;
      text-align: left;
    }

    th, td {
      border: 2px solid var(--line);
      padding: 13px 10px;
      text-align: center;
      vertical-align: middle;
    }

    thead th {
      background: var(--header);
      font-weight: 700;
    }

    thead tr:first-child th {
      padding: 11px 10px;
      font-size: 1.18em;
    }

    .day { width: 18%; }
    .time { width: 15%; }
    .topic { width: 37%; }

    tbody th {
      background: #f2f5ed;
      font-weight: 700;
    }

    .begin { background: var(--begin); }
    .end { background: var(--end); }
    .topic-cell {
      background: var(--topic);
      cursor: pointer;
      transition: background-color 160ms ease, color 160ms ease;
    }

    .topic-cell:hover, .topic-cell:focus {
      background: #ffe8b6;
      color: #812e22;
      outline: none;
    }

    .topic-cell:focus-visible {
      box-shadow: inset 0 0 0 3px var(--accent);
    }

    .hint {
      margin: 15px 0 0;
      color: #65747a;
      font: 0.78rem Arial, sans-serif;
    }

    .storage-panel {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin-top: 26px;
      padding-top: 22px;
      border-top: 2px solid #c7d0cc;
      font-family: Arial, sans-serif;
    }

    .storage-card {
      padding: 16px;
      border: 1px solid #c7d0cc;
      background: #f5f8f4;
    }

    .storage-card h2 {
      margin: 0 0 12px;
      font-size: 1rem;
    }

    label, select, button { font: inherit; }

    select, .clear-session {
      min-height: 36px;
      border: 1px solid var(--line);
      padding: 7px 10px;
      background: white;
      color: var(--ink);
    }

    select { width: 100%; }

    .session-info {
      margin: 0;
      color: #51636b;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .session-info strong { color: var(--accent); }

    .saved-topic {
      margin: 14px 0 0;
      color: #51636b;
      font-size: 0.88rem;
      line-height: 1.5;
    }

    .saved-topic strong { color: var(--ink); }

    .clear-session {
      margin-top: 8px;
      cursor: pointer;
    }

    .clear-session:hover { background: #ffe8b6; }

    .student-details {
      margin: 28px 0 0;
      padding-top: 16px;
      border-top: 1px solid #c7d0cc;
      color: #51636b;
      font: 0.86rem/1.5 Arial, sans-serif;
      text-align: center;
    }

    @media (max-width: 600px) {
      body { padding: 16px 10px; }
      main { padding: 22px 12px 28px; }
      th, td { padding: 11px 7px; }
      .storage-panel { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">Schedule planner</p>
    <h1>Seminar timetable</h1>

    <div class="table-wrap">
      <table>
        <caption>Click any topic to view its seminar details.</caption>
        <colgroup>
          <col class="day">
          <col class="time">
          <col class="time">
          <col class="topic">
        </colgroup>
        <thead>
          <tr>
            <th rowspan="3" scope="col">Day</th>
            <th colspan="3" scope="colgroup">Seminar</th>
          </tr>
          <tr>
            <th colspan="2" scope="colgroup">Schedule</th>
            <th rowspan="2" scope="col">Topic</th>
          </tr>
          <tr>
            <th scope="col">Begin</th>
            <th scope="col">End</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="2" scope="rowgroup">Monday</th>
            <td class="begin">8:00 a.m.</td>
            <td class="end">5:00 p.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="Introduction to XML" data-day="Monday" data-begin="8:00 a.m." data-end="5:00 p.m." data-description="Learn the fundamentals of XML syntax, structure, and document organization.">Introduction to XML</td>
          </tr>
          <tr>
            <td class="begin">8:00 a.m.</td>
            <td class="end">5:00 p.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="Validity: DTD and Relax NG" data-day="Monday" data-begin="8:00 a.m." data-end="5:00 p.m." data-description="Explore XML validation using Document Type Definitions and Relax NG schemas.">Validity: DTD and Relax NG</td>
          </tr>
          <tr>
            <th rowspan="3" scope="rowgroup">Tuesday</th>
            <td class="begin">8:00 a.m.</td>
            <td class="end">11:00 a.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="XPath" data-day="Tuesday" data-begin="8:00 a.m." data-end="11:00 a.m." data-description="Use XPath expressions to find and navigate through XML document nodes.">XPath</td>
          </tr>
          <tr>
            <td class="begin">11:00 a.m.</td>
            <td class="end">2:00 p.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="XSL Transformations" data-day="Tuesday" data-begin="11:00 a.m." data-end="2:00 p.m." data-description="Transform XML data into other formats with XSLT templates and rules.">XSL Transformations</td>
          </tr>
          <tr>
            <td class="begin">2:00 p.m.</td>
            <td class="end">5:00 p.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="XSL Formatting Objects" data-day="Tuesday" data-begin="2:00 p.m." data-end="5:00 p.m." data-description="Create presentation-ready documents using XSL Formatting Objects.">XSL Formatting Objects</td>
          </tr>
          <tr>
            <th scope="row">Wednesday</th>
            <td class="begin">8:00 a.m.</td>
            <td class="end">12:00 p.m.</td>
            <td class="topic-cell" tabindex="0" role="button" data-topic="XSL Formatting Objects" data-day="Wednesday" data-begin="8:00 a.m." data-end="12:00 p.m." data-description="Create presentation-ready documents using XSL Formatting Objects.">XSL Formatting Objects</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="hint">Topics are interactive and can also be opened with the keyboard.</p>

    <section class="storage-panel" aria-label="Browser storage demo">
      <div class="storage-card">
        <h2>Saved preference</h2>
        <label for="preferred-day">Preferred seminar day</label>
        <select id="preferred-day">
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
        </select>
        <p class="saved-topic" id="saved-topic">Last clicked topic: None</p>
      </div>
      <div class="storage-card">
        <h2>This browser session</h2>
        <p class="session-info">
          Topics viewed: <strong id="view-count">0</strong><br>
          Last topic: <strong id="last-topic">None yet</strong>
        </p>
        <button class="clear-session" id="clear-session" type="button">Clear session data</button>
      </div>
    </section>

    <footer class="student-details">
      Ayush Aswale | PRN: 24070521009
    </footer>
  </main>

  <script>
    var preferredDaySelect = document.getElementById("preferred-day");
    var viewCount = document.getElementById("view-count");
    var lastTopic = document.getElementById("last-topic");
    var savedTopicDisplay = document.getElementById("saved-topic");
    var savedPreferredDay = localStorage.getItem("seminarPreferredDay");
    var savedTopic = JSON.parse(localStorage.getItem("seminarLastClickedTopic") || "null");
    var sessionViewCount = Number(sessionStorage.getItem("seminarViewCount") || 0);
    var sessionLastTopic = sessionStorage.getItem("seminarLastTopic");

    if (savedPreferredDay) {
      preferredDaySelect.value = savedPreferredDay;
    }

    function updateSessionDisplay() {
      viewCount.textContent = sessionViewCount;
      lastTopic.textContent = sessionLastTopic || "None yet";
    }

    function updateSavedTopicDisplay() {
      if (savedTopic) {
        savedTopicDisplay.innerHTML = "Last clicked topic: <strong>" + savedTopic.topic + "</strong><br>" + savedTopic.day + " | " + savedTopic.begin + " - " + savedTopic.end;
      }
    }

    preferredDaySelect.addEventListener("change", function () {
      localStorage.setItem("seminarPreferredDay", preferredDaySelect.value);
    });

    function showTopicAlert(topicCell) {
      savedTopic = {
        day: topicCell.dataset.day,
        begin: topicCell.dataset.begin,
        end: topicCell.dataset.end,
        topic: topicCell.dataset.topic,
        description: topicCell.dataset.description
      };
      localStorage.setItem("seminarLastClickedTopic", JSON.stringify(savedTopic));
      updateSavedTopicDisplay();
      sessionViewCount += 1;
      sessionLastTopic = topicCell.dataset.topic;
      sessionStorage.setItem("seminarViewCount", sessionViewCount);
      sessionStorage.setItem("seminarLastTopic", sessionLastTopic);
      updateSessionDisplay();
      alert(
        "Seminar Details\n\n" +
        "Day: " + savedTopic.day + "\n" +
        "Schedule: " + savedTopic.begin + " - " + savedTopic.end + "\n" +
        "Topic: " + savedTopic.topic + "\n\n" +
        "Description: " + savedTopic.description
      );
    }

    document.querySelectorAll(".topic-cell").forEach(function (topicCell) {
      topicCell.addEventListener("click", function () {
        showTopicAlert(topicCell);
      });

      topicCell.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showTopicAlert(topicCell);
        }
      });
    });

    document.getElementById("clear-session").addEventListener("click", function () {
      sessionStorage.removeItem("seminarViewCount");
      sessionStorage.removeItem("seminarLastTopic");
      sessionViewCount = 0;
      sessionLastTopic = null;
      updateSessionDisplay();
    });

    updateSessionDisplay();
    updateSavedTopicDisplay();
  </script>
</body>
</html>
```

---

## Output (Case Study)

<img width="1901" height="968" alt="Screenshot 2026-09-21 093333" src="https://github.com/user-attachments/assets/200973d5-ba5b-4ecb-a9e2-abf8139ab06e" />


---

## Result / Conclusion

The practical was performed successfully. Web storage mechanisms `localStorage` and `sessionStorage` were explored and utilized to persist themes, preferences, and session statistics. This demonstrated the difference between temporary session state and long-term local state.
