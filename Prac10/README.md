# Experiment No. 10

## Experiment Title
**Demonstration of JSON, Fetch API and Asynchronous Data Handling in JavaScript**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)
5. CSS3
6. JSON (JavaScript Object Notation)

## Theory

Modern web applications rely heavily on asynchronous data communication to fetch and update information dynamically without reloading entire web pages. JSON and the Fetch API are the backbone of contemporary client-server interaction in JavaScript.

### 1. JSON (JavaScript Object Notation)
JSON is a lightweight, language-independent data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate:
- Structured in key-value pairs (`"key": value`) and ordered lists/arrays (`[...]`).
- Commonly used for transmitting data between a server and a web application.
- JavaScript provides built-in methods:
  - `JSON.parse()`: Converts a valid JSON string into a JavaScript object or array.
  - `JSON.stringify()`: Serializes a JavaScript object or array into a JSON string.

### 2. The Fetch API
The Fetch API provides a modern JavaScript interface for accessing and manipulating HTTP pipeline requests and responses:
- Uses JavaScript Promises (`.then()` / `.catch()` or `async/await`), avoiding callback hell.
- Handles asynchronous HTTP GET, POST, PUT, and DELETE operations.
- `fetch(url)` returns a `Promise` resolving to a `Response` object.
- The `response.json()` method asynchronously extracts and parses the JSON body from the response.
- Response status inspection is done via `response.ok` (returns true if HTTP status code is 200–299) or `response.status`.

### 3. Asynchronous Data Handling & Dynamic Rendering
- Client-side scripts can load remote or local resources asynchronously.
- The parsed data can be mapped directly into HTML tables, cards, or user interface components using DOM manipulation.
- Robust error handling using `.catch()` or try-catch blocks ensures that network failures, status errors, or fallback scenarios (such as opening via `file://` protocol) are gracefully handled.

---

## Experiment Program Code

### File: `10.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Workshop Ticket Booking Portal | Ayush Aswale (24070521009)</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary: #0ea5e9;
            --primary-glow: rgba(14, 165, 233, 0.4);
            --primary-dark: #0284c7;
            --secondary: #6366f1;
            --emerald: #10b981;
            --amber: #f59e0b;
            --rose: #f43f5e;
            
            --bg-base: #090d16;
            --bg-card: rgba(15, 23, 42, 0.85);
            --bg-surface: #131d31;
            --bg-input: #1a2744;
            
            --border-subtle: rgba(148, 163, 184, 0.15);
            --border-hover: rgba(14, 165, 233, 0.5);
            --text-heading: #f8fafc;
            --text-body: #cbd5e1;
            --text-muted: #94a3b8;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-base);
            background-image: 
                radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.15) 0%, transparent 45%),
                radial-gradient(circle at 85% 80%, rgba(99, 102, 241, 0.18) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%);
            background-attachment: fixed;
            color: var(--text-body);
            padding: 40px 16px;
            min-height: 100vh;
        }

        .container {
            max-width: 940px;
            margin: 0 auto;
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 
                0 0 0 1px var(--border-subtle),
                0 25px 60px -15px rgba(0, 0, 0, 0.7),
                0 0 50px -10px rgba(14, 165, 233, 0.15);
            overflow: hidden;
        }

        /* Hero Header */
        .form-header {
            background: linear-gradient(135deg, #0b1528 0%, #112240 50%, #0d1b33 100%);
            border-bottom: 1px solid var(--border-subtle);
            padding: 45px 35px 38px;
            text-align: center;
            position: relative;
        }

        .form-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent);
        }

        .student-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(14, 165, 233, 0.12);
            border: 1px solid rgba(14, 165, 233, 0.35);
            color: #38bdf8;
            padding: 7px 18px;
            border-radius: 9999px;
            font-size: 13.5px;
            font-weight: 600;
            letter-spacing: 0.3px;
            margin-bottom: 16px;
            box-shadow: 0 0 15px rgba(14, 165, 233, 0.2);
        }

        .student-badge .pulse-dot {
            width: 8px;
            height: 8px;
            background: #38bdf8;
            border-radius: 50%;
            box-shadow: 0 0 8px #38bdf8;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
        }

        .form-header h1 {
            font-size: 32px;
            font-weight: 800;
            color: var(--text-heading);
            letter-spacing: -0.8px;
            margin-bottom: 10px;
            background: linear-gradient(120deg, #ffffff 30%, #7dd3fc 70%, #a5b4fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .form-header p {
            font-size: 15px;
            color: var(--text-muted);
            max-width: 650px;
            margin: 0 auto 18px;
            line-height: 1.6;
        }

        .event-tags {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }

        .tag {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 12.5px;
            font-weight: 500;
            padding: 5px 14px;
            border-radius: 20px;
            color: #e2e8f0;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        /* Form Body */
        form {
            padding: 40px;
        }

        fieldset {
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 26px 28px;
            margin-bottom: 30px;
            background: rgba(19, 29, 49, 0.6);
            transition: all 0.25s ease;
        }

        fieldset:hover {
            border-color: var(--border-hover);
            box-shadow: 0 8px 24px -6px rgba(14, 165, 233, 0.12);
        }

        legend {
            font-size: 16.5px;
            font-weight: 700;
            color: #38bdf8;
            padding: 4px 14px;
            background: #0f1c34;
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
            margin-top: 10px;
        }

        .full-width {
            grid-column: span 2;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        label {
            font-size: 13.5px;
            font-weight: 600;
            color: #e2e8f0;
            margin-bottom: 7px;
        }

        .req {
            color: var(--rose);
            font-weight: bold;
        }

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="number"],
        input[type="date"],
        input[type="file"],
        select,
        textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1.5px solid var(--border-subtle);
            border-radius: 10px;
            font-size: 14px;
            color: #f8fafc;
            background-color: var(--bg-input);
            transition: all 0.2s ease-in-out;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: var(--primary);
            background-color: #1f3054;
            box-shadow: 0 0 0 3px var(--primary-glow);
        }

        input::placeholder,
        textarea::placeholder {
            color: #64748b;
            font-size: 13.5px;
        }

        select option,
        select optgroup {
            background-color: #131d31;
            color: #f1f5f9;
        }

        .helper-text {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 5px;
        }

        /* Radio & Checkbox Groups */
        .radio-group,
        .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 8px;
        }

        .radio-item,
        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #cbd5e1;
            cursor: pointer;
            padding: 7px 12px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            transition: all 0.2s;
        }

        .radio-item:hover,
        .checkbox-item:hover {
            background: rgba(14, 165, 233, 0.08);
            border-color: rgba(14, 165, 233, 0.3);
        }

        .radio-item input,
        .checkbox-item input {
            cursor: pointer;
            accent-color: var(--primary);
            width: 16px;
            height: 16px;
        }

        /* Range Slider Styling */
        .range-container {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-top: 8px;
        }

        input[type="range"] {
            flex: 1;
            accent-color: var(--primary);
            cursor: pointer;
            height: 6px;
            background: #24355a;
            border-radius: 8px;
        }

        .range-value {
            min-width: 65px;
            text-align: center;
            background: rgba(14, 165, 233, 0.15);
            border: 1px solid rgba(14, 165, 233, 0.4);
            color: #38bdf8;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 13px;
        }

        /* Price Calculation Card */
        .price-summary-card {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%);
            border: 1.5px dashed rgba(56, 189, 248, 0.4);
            border-radius: 14px;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }

        .price-details {
            font-size: 14.5px;
            color: #e0f2fe;
            line-height: 1.5;
        }

        .total-amount-box {
            text-align: right;
        }

        .total-label {
            font-size: 12px;
            color: #38bdf8;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.6px;
        }

        .total-price {
            font-size: 30px;
            font-weight: 800;
            color: #34d399;
            font-family: 'JetBrains Mono', monospace;
            text-shadow: 0 0 12px rgba(52, 211, 153, 0.3);
        }

        /* Coupon Section */
        .coupon-box {
            display: flex;
            gap: 12px;
            margin-top: 8px;
        }

        .coupon-btn {
            background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
            color: #f8fafc;
            border: 1px solid var(--border-subtle);
            padding: 0 20px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 700;
            font-size: 13.5px;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .coupon-btn:hover {
            background: #475569;
            border-color: rgba(255, 255, 255, 0.2);
        }

        .coupon-feedback {
            font-size: 12.5px;
            margin-top: 6px;
            font-weight: 600;
        }

        /* Action Buttons */
        .form-actions {
            display: flex;
            gap: 18px;
            margin-top: 20px;
        }

        .btn-submit {
            flex: 2;
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #2563eb 100%);
            color: white;
            padding: 15px 26px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.45);
            transition: all 0.25s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.6);
        }

        .btn-reset {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            color: #94a3b8;
            padding: 15px 22px;
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-reset:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #f8fafc;
        }

        /* Confirmation Ticket Modal */
        #ticketModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(4, 7, 15, 0.82);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1000;
            overflow-y: auto;
            padding: 40px 16px;
        }

        .ticket-card {
            max-width: 640px;
            margin: 0 auto;
            background: #0f172a;
            border: 1px solid rgba(14, 165, 233, 0.3);
            border-radius: 22px;
            overflow: hidden;
            box-shadow: 
                0 30px 60px -12px rgba(0, 0, 0, 0.8),
                0 0 40px rgba(14, 165, 233, 0.2);
            animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-25px) scale(0.97);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .ticket-header {
            background: linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%);
            color: white;
            padding: 26px 24px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .ticket-header h2 {
            font-size: 23px;
            font-weight: 800;
            letter-spacing: -0.3px;
        }

        .ticket-body {
            padding: 28px;
            background: #0f172a;
        }

        .ticket-row {
            display: flex;
            justify-content: space-between;
            padding: 11px 0;
            border-bottom: 1px dashed rgba(148, 163, 184, 0.15);
            font-size: 14px;
        }

        .ticket-row:last-child {
            border-bottom: none;
        }

        .t-label {
            color: var(--text-muted);
            font-weight: 600;
        }

        .t-value {
            color: #f1f5f9;
            font-weight: 700;
            text-align: right;
            max-width: 60%;
        }

        .ticket-stub {
            background: #090e1a;
            border-top: 2px dashed rgba(148, 163, 184, 0.3);
            padding: 22px 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .barcode-mock {
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: 5px;
            font-size: 18px;
            color: #94a3b8;
            font-weight: bold;
        }

        .ticket-actions {
            display: flex;
            gap: 14px;
            padding: 20px 28px;
            background: #0f172a;
            border-top: 1px solid var(--border-subtle);
        }

        .btn-print {
            flex: 1;
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
            color: white;
            border: none;
            padding: 13px;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .btn-print:hover {
            opacity: 0.9;
        }

        .btn-close {
            flex: 1;
            background: rgba(255, 255, 255, 0.06);
            color: #e2e8f0;
            border: 1px solid var(--border-subtle);
            padding: 13px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-close:hover {
            background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
            form {
                padding: 26px 18px;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .full-width {
                grid-column: span 1;
            }

            .form-actions {
                flex-direction: column;
            }

            .price-summary-card {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }

            .total-amount-box {
                text-align: left;
            }
        }
    </style>
</head>

<body>

    <div class="container">

        <!-- Header Section -->
        <div class="form-header">
            <div class="student-badge">
                <span class="pulse-dot"></span>
                <span>Student Project &bull; Ayush Aswale (PRN: 24070521009)</span>
            </div>
            <h1>Technical Workshop Ticket Booking Portal</h1>
            <p>Annual Student TechFest 2026 &bull; Advanced Skill Development Hands-on Bootcamp Series</p>
            <div class="event-tags">
                <span class="tag">&#x1F4CD; Campus Auditorium &amp; Virtual Labs</span>
                <span class="tag">&#x1F393; Verified Certificates Provided</span>
                <span class="tag">&#x1F4BB; Hands-on Coding Sessions</span>
                <span class="tag">&#x26A1; Limited Seats Available</span>
            </div>
        </div>

        <!-- Ticket Booking Form -->
        <form id="workshopForm" onsubmit="return handleBooking(event)" onreset="handleReset()">

            <!-- FIELDSET 1: Student Personal Details -->
            <fieldset>
                <legend><span>&#x1F464;</span> 1. Student Personal Information</legend>
                <div class="form-grid">

                    <div class="form-group">
                        <label for="fullName">Full Name <span class="req">*</span></label>
                        <input type="text" id="fullName" name="fullName" placeholder="e.g., Ayush Aswale" required
                            pattern="^[a-zA-Z\s]{3,50}$" title="Name should only contain letters and be at least 3 characters">
                        <span class="helper-text">As it will appear on your workshop certificate</span>
                    </div>

                    <div class="form-group">
                        <label for="studentPrn">PRN / Roll Number <span class="req">*</span></label>
                        <input type="text" id="studentPrn" name="studentPrn" placeholder="e.g., 24070521009" required
                            pattern="^[0-9A-Za-z]{6,15}$" title="Enter a valid PRN/Roll Number (6-15 alphanumeric characters)">
                        <span class="helper-text">University or College Roll Number</span>
                    </div>

                    <div class="form-group">
                        <label for="email">Student Email ID <span class="req">*</span></label>
                        <input type="email" id="email" name="email" placeholder="e.g., ayush@university.edu" required>
                        <span class="helper-text">Ticket confirmation and lab links will be emailed here</span>
                    </div>

                    <div class="form-group">
                        <label for="phone">Mobile Number (WhatsApp) <span class="req">*</span></label>
                        <input type="tel" id="phone" name="phone" placeholder="e.g., 9876543210" required
                            pattern="[6-9][0-9]{9}" title="Please enter a valid 10-digit Indian mobile number">
                        <span class="helper-text">For SMS notifications &amp; workshop updates</span>
                    </div>

                    <div class="form-group">
                        <label for="dob">Date of Birth <span class="req">*</span></label>
                        <input type="date" id="dob" name="dob" required max="2010-01-01" min="1990-01-01">
                    </div>

                    <div class="form-group">
                        <label>Gender <span class="req">*</span></label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="gender" value="Male" required checked> Male
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="gender" value="Female" required> Female
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="gender" value="Other" required> Other
                            </label>
                        </div>
                    </div>

                </div>
            </fieldset>

            <!-- FIELDSET 2: Academic Affiliation -->
            <fieldset>
                <legend><span>&#x1F393;</span> 2. Academic Affiliation</legend>
                <div class="form-grid">

                    <div class="form-group">
                        <label for="college">College / University Name <span class="req">*</span></label>
                        <input type="text" id="college" name="college" list="collegeList"
                            placeholder="Type or select college name" required>
                        <datalist id="collegeList">
                            <option value="Symbiosis Institute of Technology (SIT)">
                            <option value="MIT World Peace University">
                            <option value="College of Engineering Pune (COEP)">
                            <option value="Pune Institute of Computer Technology (PICT)">
                            <option value="Vishwakarma Institute of Technology (VIT)">
                            <option value="Other University / Institute">
                        </datalist>
                    </div>

                    <div class="form-group">
                        <label for="department">Department / Branch <span class="req">*</span></label>
                        <select id="department" name="department" required>
                            <option value="" disabled selected>-- Select Your Branch --</option>
                            <optgroup label="Computer &amp; IT Sciences">
                                <option value="Computer Science and Engineering (CSE)">Computer Science &amp; Engineering</option>
                                <option value="Information Technology (IT)">Information Technology</option>
                                <option value="Artificial Intelligence &amp; Data Science">AI &amp; Data Science</option>
                                <option value="Robotics &amp; Automation">Robotics &amp; Automation</option>
                            </optgroup>
                            <optgroup label="Electronics &amp; Other">
                                <option value="Electronics &amp; Telecommunication (ENTC)">Electronics &amp; Telecommunication</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Other Branch">Other Branch</option>
                            </optgroup>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="year">Year of Study <span class="req">*</span></label>
                        <select id="year" name="year" required>
                            <option value="" disabled selected>-- Select Academic Year --</option>
                            <option value="First Year (FE)">First Year (FE)</option>
                            <option value="Second Year (SE)">Second Year (SE)</option>
                            <option value="Third Year (TE) - Sem 5/6" selected>Third Year (TE) - Sem 5/6</option>
                            <option value="Final Year (BE)">Final Year (BE)</option>
                            <option value="Postgraduate (M.Tech / MCA)">Postgraduate (M.Tech / MCA)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="studentIdFile">Upload Student ID Proof (Optional)</label>
                        <input type="file" id="studentIdFile" name="studentIdFile" accept=".jpg, .jpeg, .png, .pdf">
                        <span class="helper-text">Accepts JPG, PNG, or PDF (Max 2MB) for student discount eligibility</span>
                    </div>

                </div>
            </fieldset>

            <!-- FIELDSET 3: Workshop Selection & Ticket Booking -->
            <fieldset>
                <legend><span>&#x1F3AB;</span> 3. Workshop Selection &amp; Ticket Options</legend>
                <div class="form-grid">

                    <div class="form-group full-width">
                        <label for="workshopTrack">Select Workshop Track <span class="req">*</span></label>
                        <select id="workshopTrack" name="workshopTrack" required onchange="calculatePrice()">
                            <option value="" disabled selected>-- Choose Technical Track --</option>
                            <option value="Full Stack Modern Web Development (React & Node.js)">
                                Track A: Full Stack Modern Web Development (HTML5, Tailwind, React &amp; Node.js)
                            </option>
                            <option value="Applied Generative AI & Prompt Engineering">
                                Track B: Applied Generative AI, LLMs &amp; LangChain Hands-on
                            </option>
                            <option value="Cloud Native Architecture with Docker & Kubernetes">
                                Track C: Cloud Computing, Docker Containers &amp; Kubernetes DevOps
                            </option>
                            <option value="Cybersecurity & Ethical Hacking Practical Defense">
                                Track D: Cybersecurity, Network Penetration &amp; Web Defense
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="batchSession">Workshop Date &amp; Batch <span class="req">*</span></label>
                        <select id="batchSession" name="batchSession" required>
                            <option value="Saturday Morning (Oct 10, 2026 - 09:00 AM to 01:00 PM)">
                                Oct 10, 2026 - Morning Slot (09:00 AM - 01:00 PM)
                            </option>
                            <option value="Saturday Afternoon (Oct 10, 2026 - 02:00 PM to 06:00 PM)">
                                Oct 10, 2026 - Afternoon Slot (02:00 PM - 06:00 PM)
                            </option>
                            <option value="Sunday Intensive (Oct 11, 2026 - 10:00 AM to 05:00 PM)">
                                Oct 11, 2026 - Full Day Intensive (10:00 AM - 05:00 PM)
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Mode of Attendance <span class="req">*</span></label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="attendanceMode" value="In-Person (Campus Lab)" checked>
                                &#x1F3DB; In-Person (On-Campus Lab)
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="attendanceMode" value="Virtual (Live Zoom Stream)">
                                &#x1F4BB; Virtual (Live Interactive Zoom)
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="ticketType">Ticket Tier <span class="req">*</span></label>
                        <select id="ticketType" name="ticketType" required onchange="calculatePrice()">
                            <option value="199" data-name="Early Bird Student Pass">Early Bird Student Pass - &#8377;199</option>
                            <option value="299" data-name="Standard Student Pass" selected>Standard Student Pass - &#8377;299</option>
                            <option value="499" data-name="VIP Hands-on Bootcamp + Hardware Kit">VIP Pass + Swag &amp; Hardware Kit - &#8377;499</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="ticketQuantity">Number of Tickets <span class="req">*</span></label>
                        <input type="number" id="ticketQuantity" name="ticketQuantity" min="1" max="5" value="1" required
                            oninput="calculatePrice()">
                        <span class="helper-text">Max 5 tickets per student PRN</span>
                    </div>

                    <!-- Dynamic Live Price Calculation Summary -->
                    <div class="full-width">
                        <div class="price-summary-card">
                            <div class="price-details">
                                <strong id="summaryTier" style="color: #38bdf8;">Standard Student Pass</strong> &times;
                                <span id="summaryQty">1</span> ticket(s)<br>
                                <span style="font-size: 12.5px; color: #94a3b8;">Includes digital certificate, course source code &amp; lab environment access</span>
                            </div>
                            <div class="total-amount-box">
                                <div class="total-label">Payable Amount</div>
                                <div class="total-price" id="totalDisplay">&#8377;299</div>
                            </div>
                        </div>
                    </div>

                </div>
            </fieldset>

            <!-- FIELDSET 4: Technical Background & Preferences -->
            <fieldset>
                <legend><span>&#x2699;</span> 4. Technical Profile &amp; Preferences</legend>
                <div class="form-grid">

                    <div class="form-group full-width">
                        <label for="experienceLevel">Self-Rated Programming Proficiency (1 = Beginner, 10 = Expert)</label>
                        <div class="range-container">
                            <span style="font-size: 13px; color: #94a3b8;">1 (Beginner)</span>
                            <input type="range" id="experienceLevel" name="experienceLevel" min="1" max="10" value="6"
                                oninput="updateRangeValue(this.value)">
                            <span style="font-size: 13px; color: #94a3b8;">10 (Expert)</span>
                            <span class="range-value" id="rangeDisplay">6 / 10</span>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label>Technical Topics You Want Covered (Select all that interest you):</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="topics" value="Frontend & UI/UX" checked> Frontend &amp; Modern UI/UX
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="topics" value="REST & GraphQL APIs" checked> REST &amp; GraphQL APIs
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="topics" value="Database Optimization"> Database Optimization
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="topics" value="DevOps & Deployment"> Cloud &amp; DevOps
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="topics" value="AI Agent Integration" checked> AI Agent Integration
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Bringing Personal Laptop? <span class="req">*</span></label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="laptop" value="Yes" checked> Yes (Recommended)
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="laptop" value="No"> No (Campus Lab Workstation)
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="osPreference">Laptop Operating System</label>
                        <select id="osPreference" name="osPreference">
                            <option value="Windows 11 / 10" selected>Windows 11 / 10</option>
                            <option value="macOS (Apple Silicon / Intel)">macOS</option>
                            <option value="Linux (Ubuntu / Fedora / Arch)">Linux</option>
                            <option value="Other / Not Bringing">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="tshirtSize">Workshop T-shirt / Kit Size</label>
                        <select id="tshirtSize" name="tshirtSize">
                            <option value="S">Small (S)</option>
                            <option value="M">Medium (M)</option>
                            <option value="L" selected>Large (L)</option>
                            <option value="XL">Extra Large (XL)</option>
                            <option value="XXL">Double Extra Large (XXL)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="diet">Refreshment Preference (For Campus Attendees)</label>
                        <select id="diet" name="diet">
                            <option value="Vegetarian" selected>Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Jain">Jain</option>
                        </select>
                    </div>

                    <div class="form-group full-width">
                        <label for="specialQuestions">Questions or Specific Expectations for the Speakers</label>
                        <textarea id="specialQuestions" name="specialQuestions" rows="3"
                            placeholder="Mention any specific libraries, problem statements, or career guidance questions you would like addressed..."></textarea>
                    </div>

                </div>
            </fieldset>

            <!-- FIELDSET 5: Payment & Promo Code -->
            <fieldset>
                <legend><span>&#x1F4B3;</span> 5. Payment Details &amp; Discount</legend>
                <div class="form-grid">

                    <div class="form-group">
                        <label for="paymentMethod">Payment Method <span class="req">*</span></label>
                        <select id="paymentMethod" name="paymentMethod" required>
                            <option value="UPI / QR Code (GooglePay, PhonePe, Paytm)" selected>UPI / QR Code (GPay, PhonePe, Paytm)</option>
                            <option value="Debit Card / Credit Card">Debit Card / Credit Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="College Sponsored Waiver">College Sponsored Free Pass</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="transactionId">Transaction / Reference ID <span class="req">*</span></label>
                        <input type="text" id="transactionId" name="transactionId" placeholder="e.g., UPI-893420194821" required
                            pattern="^[a-zA-Z0-9\-_]{6,25}$" title="Enter valid reference/transaction number">
                        <span class="helper-text">Enter transaction ID after completing the transfer</span>
                    </div>

                    <div class="form-group full-width">
                        <label for="promoCode">Student Promo / Discount Code</label>
                        <div class="coupon-box">
                            <input type="text" id="promoCode" placeholder="Enter coupon code (e.g., STUDENT50 or CAMPUS100)">
                            <button type="button" class="coupon-btn" onclick="applyCoupon()">Apply Coupon</button>
                        </div>
                        <div id="couponFeedback" class="coupon-feedback"></div>
                    </div>

                </div>
            </fieldset>

            <!-- FIELDSET 6: Declaration & Terms -->
            <fieldset>
                <legend><span>&#x1F4DC;</span> 6. Declaration &amp; Submission</legend>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 6px;">
                    <label class="checkbox-item">
                        <input type="checkbox" id="terms" required>
                        <span>I confirm that the above details are accurate and I agree to abide by the <strong style="color: #38bdf8;">Workshop Code of Conduct</strong> and lab regulations. <span class="req">*</span></span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" id="newsletter" checked>
                        <span>Subscribe to notifications about upcoming hackathons, tech talks, and internship opportunities.</span>
                    </label>
                </div>
            </fieldset>

            <!-- Buttons -->
            <div class="form-actions">
                <button type="submit" class="btn-submit">
                    <span>&#x1F3AB;</span> Confirm &amp; Generate Ticket
                </button>
                <button type="reset" class="btn-reset">
                    <span>&#x1F504;</span> Reset Form
                </button>
            </div>

        </form>

    </div>

    <!-- TICKET CONFIRMATION MODAL -->
    <div id="ticketModal">
        <div class="ticket-card">
            <div class="ticket-header">
                <h2>&#x2705; Ticket Booking Confirmed!</h2>
                <p style="font-size: 13.5px; margin-top: 5px; opacity: 0.95;">Annual Student Technical Workshop 2026</p>
            </div>

            <div class="ticket-body">
                <div class="ticket-row">
                    <span class="t-label">Booking Reference</span>
                    <span class="t-value" id="ticketNumber" style="color: #38bdf8; font-family: 'JetBrains Mono', monospace;"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Attendee Name</span>
                    <span class="t-value" id="tName"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Student PRN</span>
                    <span class="t-value" id="tPrn"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">College / Branch</span>
                    <span class="t-value" id="tCollege"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Selected Track</span>
                    <span class="t-value" id="tTrack"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Session / Date</span>
                    <span class="t-value" id="tBatch"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Attendance Mode</span>
                    <span class="t-value" id="tMode"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Quantity &amp; Tier</span>
                    <span class="t-value" id="tQtyTier"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Total Amount Paid</span>
                    <span class="t-value" id="tTotal" style="color: #34d399; font-size: 17px; font-family: 'JetBrains Mono', monospace;"></span>
                </div>
                <div class="ticket-row">
                    <span class="t-label">Transaction ID</span>
                    <span class="t-value" id="tTxn"></span>
                </div>
            </div>

            <div class="ticket-stub">
                <div>
                    <span style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Scan at Workshop Entrance</span>
                    <div class="barcode-mock">&#124;&#124;&#124;&#124; &#124;&#124;&#124;&#124; &#124;&#124;&#124; &#124;&#124;&#124;&#124;&#124; &#124;&#124;</div>
                </div>
                <div style="font-size: 32px;">&#x1F4F1;</div>
            </div>

            <div class="ticket-actions">
                <button type="button" class="btn-print" onclick="window.print()">&#x1F5A8; Print / Download Ticket</button>
                <button type="button" class="btn-close" onclick="closeTicketModal()">Close</button>
            </div>
        </div>
    </div>

    <!-- JavaScript for Calculations, Promo Code & Confirmation Ticket -->
    <script>
        let discount = 0;

        function updateRangeValue(val) {
            document.getElementById('rangeDisplay').textContent = val + ' / 10';
        }

        function calculatePrice() {
            const ticketSelect = document.getElementById('ticketType');
            const unitPrice = parseInt(ticketSelect.value) || 0;
            const selectedOption = ticketSelect.options[ticketSelect.selectedIndex];
            const tierName = selectedOption.getAttribute('data-name') || 'Standard Pass';

            const qty = Math.max(1, parseInt(document.getElementById('ticketQuantity').value) || 1);

            let subtotal = unitPrice * qty;
            let finalAmount = Math.max(0, subtotal - discount);

            document.getElementById('summaryTier').textContent = tierName;
            document.getElementById('summaryQty').textContent = qty;
            document.getElementById('totalDisplay').innerHTML = '&#8377;' + finalAmount;

            return finalAmount;
        }

        function applyCoupon() {
            const codeInput = document.getElementById('promoCode');
            const feedback = document.getElementById('couponFeedback');
            const code = codeInput.value.trim().toUpperCase();

            if (code === 'STUDENT50') {
                discount = 50;
                feedback.style.color = '#34d399';
                feedback.textContent = 'Awesome! Flat Rs.50 student discount applied successfully!';
            } else if (code === 'CAMPUS100') {
                discount = 100;
                feedback.style.color = '#34d399';
                feedback.textContent = 'Special Campus Partner coupon: Rs.100 discount applied!';
            } else if (code === '') {
                discount = 0;
                feedback.textContent = '';
            } else {
                discount = 0;
                feedback.style.color = '#f43f5e';
                feedback.textContent = 'Invalid promo code. Try "STUDENT50" for Rs.50 off.';
            }

            calculatePrice();
        }

        function handleBooking(event) {
            event.preventDefault();

            // Gather values
            const name = document.getElementById('fullName').value.trim();
            const prn = document.getElementById('studentPrn').value.trim();
            const college = document.getElementById('college').value.trim();
            const dept = document.getElementById('department').value;
            const track = document.getElementById('workshopTrack').value;
            const batch = document.getElementById('batchSession').value;
            const mode = document.querySelector('input[name="attendanceMode"]:checked').value;
            const tierSelect = document.getElementById('ticketType');
            const tierName = tierSelect.options[tierSelect.selectedIndex].getAttribute('data-name');
            const qty = document.getElementById('ticketQuantity').value;
            const finalAmount = calculatePrice();
            const txn = document.getElementById('transactionId').value.trim();

            // Generate realistic random ticket reference number
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            const ticketId = 'WKSP-2026-' + randomCode;

            // Populate Ticket Modal
            document.getElementById('ticketNumber').textContent = ticketId;
            document.getElementById('tName').textContent = name;
            document.getElementById('tPrn').textContent = prn;
            document.getElementById('tCollege').textContent = college + ' (' + dept + ')';
            document.getElementById('tTrack').textContent = track;
            document.getElementById('tBatch').textContent = batch;
            document.getElementById('tMode').textContent = mode;
            document.getElementById('tQtyTier').textContent = qty + ' \u00D7 ' + tierName;
            document.getElementById('tTotal').textContent = '\u20B9' + finalAmount;
            document.getElementById('tTxn').textContent = txn;

            // Show modal
            document.getElementById('ticketModal').style.display = 'block';
            return false;
        }

        function closeTicketModal() {
            document.getElementById('ticketModal').style.display = 'none';
        }

        function handleReset() {
            discount = 0;
            document.getElementById('couponFeedback').textContent = '';
            setTimeout(() => {
                updateRangeValue(6);
                calculatePrice();
            }, 50);
        }

        // Initialize on load
        window.onload = function() {
            calculatePrice();
            updateRangeValue(6);
        };
    </script>

</body>

</html>

```

---

### File: `10.2/students.json`

```json
[
    {
        "id": 1,
        "name": "Rahul",
        "department": "CSE",
        "marks": 85
    },
    {
        "id": 2,
        "name": "Priya",
        "department": "AIML",
        "marks": 92
    },
    {
        "id": 3,
        "name": "Amit",
        "department": "Data Science",
        "marks": 88
    }
]
```

### File: `10.2/index.html`

```html
<!DOCTYPE html>
<html>

<head>

    <title>Load JSON using Fetch</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
        }

        button {
            padding: 10px 15px;
            cursor: pointer;
        }

        table {
            width: 70%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #ccc;
            font-size: 14px;
            color: #555;
            font-weight: 600;
        }
    </style>

</head>

<body>

    <h2>Student Details using fetch()</h2>

    <button type="button" onclick="loadStudents()">See Students</button>

    <table id="studentTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Marks</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
    </table>

    <footer>
        <p>Submitted by: <strong>Ayush Aswale</strong> | PRN: <strong>24070521009</strong></p>
    </footer>

    <script>
        let students = [];

        function renderStudents(data) {
            let tableBody = document.querySelector("#studentTable tbody");
            tableBody.innerHTML = "";

            data.forEach(student => {
                let row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.department}</td>
                        <td>${student.marks}</td>
                    </tr>
                `;

                tableBody.innerHTML += row;
            });
        }

        // Fallback data in case the file is opened directly via file:// where browser blocks fetch()
        const fallbackStudents = [
            { id: 1, name: "Rahul", department: "CSE", marks: 85 },
            { id: 2, name: "Priya", department: "AIML", marks: 92 },
            { id: 3, name: "Amit", department: "Data Science", marks: 88 }
        ];

        function loadStudents() {
            fetch("students.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    students = data;
                    renderStudents(students);
                })
                .catch(error => {
                    console.warn("Fetch failed (often due to opening file directly via file:// instead of a local server):", error);
                    // Try XMLHttpRequest as secondary attempt, or load fallback data
                    try {
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", "students.json", true);
                        xhr.onload = function () {
                            if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                                students = JSON.parse(xhr.responseText);
                                renderStudents(students);
                            } else {
                                students = fallbackStudents;
                                renderStudents(students);
                            }
                        };
                        xhr.onerror = function () {
                            students = fallbackStudents;
                            renderStudents(students);
                        };
                        xhr.send();
                    } catch (e) {
                        students = fallbackStudents;
                        renderStudents(students);
                    }
                });
        }
    </script>

</body>

</html>

```

---

### File: `10.3/index.html`

```html
<!DOCTYPE html>
<html>

<head>

    <title>Load JSON using Fetch</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
        }

        form {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: end;
        }

        label {
            display: flex;
            flex-direction: column;
            font-weight: bold;
        }

        input {
            padding: 8px;
            margin-top: 5px;
            min-width: 140px;
        }

        button {
            padding: 10px 15px;
            cursor: pointer;
        }

        table {
            width: 70%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #ccc;
            font-size: 14px;
            color: #555;
            font-weight: 600;
        }
    </style>

</head>

<body>

    <h2>Student Details using fetch()</h2>

    <form id="studentForm">
        <label>
            ID:
            <input type="number" id="studentId" required>
        </label>
        <label>
            Name:
            <input type="text" id="studentName" required>
        </label>
        <label>
            Department:
            <input type="text" id="studentDepartment" required>
        </label>
        <label>
            Marks:
            <input type="number" id="studentMarks" required min="0" max="100">
        </label>
        <button type="submit">Add Student</button>
    </form>

    <button type="button" onclick="loadStudents()">Clear Students</button>

    <table id="studentTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Marks</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
    </table>

    <footer>
        <p>Submitted by: <strong>Ayush Aswale</strong> | PRN: <strong>24070521009</strong></p>
    </footer>

    <script>
        let students = [];

        function renderStudents(data) {
            let tableBody = document.querySelector("#studentTable tbody");
            tableBody.innerHTML = "";

            data.forEach(student => {
                let row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.department}</td>
                        <td>${student.marks}</td>
                    </tr>
                `;

                tableBody.innerHTML += row;
            });
        }

        function loadStudents() {
            students = [];
            renderStudents(students);
        }

        document.getElementById("studentForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const student = {
                id: Number(document.getElementById("studentId").value),
                name: document.getElementById("studentName").value.trim(),
                department: document.getElementById("studentDepartment").value.trim(),
                marks: Number(document.getElementById("studentMarks").value)
            };

            if (!student.name || !student.department || Number.isNaN(student.id) || Number.isNaN(student.marks)) {
                alert("Please enter valid student details.");
                return;
            }

            students.push(student);
            renderStudents(students);
            event.target.reset();
        });
    </script>

</body>

</html>
```

---

## Output (Case Study)

### 10.1: Technical Workshop Ticket Booking Portal
![Practical 10.1 Output](10.1/Screenshot%202026-10-25%20232055.png)

### 10.2: Loading JSON Data using Fetch API
![Practical 10.2 Output](10.2/Screenshot%202026-10-25%20232259.png)

### 10.3: Dynamic Student Management & Table Rendering
![Practical 10.3 Output](10.3/Screenshot%202026-10-25%20232430.png)

---

## Result / Conclusion

The practical was performed successfully. Asynchronous data handling was demonstrated using the Fetch API and JSON. Data from JSON files and dynamic client inputs were processed and rendered onto the DOM dynamically in tabular format, demonstrating how modern web applications manage data exchange, responsive forms, and state updates.
