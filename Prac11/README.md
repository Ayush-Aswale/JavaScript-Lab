# Experiment No. 11

## Experiment Title
**Development of Interactive Web Applications: Real-Time Class Scheduler (ES6 Timers & Countdown), Student Task Manager (JavaScript, jQuery, DOM Manipulation, Events, Local Storage & AJAX), and Smart India Hackathon Static Case Study**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome / Modern Web Browser
3. HTML5
4. JavaScript (ES6 & jQuery 3.7.1)
5. CSS3
6. JSON & AJAX

---

## Theory

### 1. Timers in JavaScript (`setInterval` and `setTimeout`)
- **`setInterval(callback, delay)`**: Regularly executes code at specified intervals. Used here to power the real-time 1-second countdown clock, live day/time updates, and active class progress indicators.
- **`setTimeout(callback, delay)`**: Executes a function once after a specified time interval. Used for automated reminder popups, 5-minute pre-class warnings, and auto-dismissing notifications.
- **`clearInterval()` / `clearTimeout()`**: Cancels active timers to avoid memory leaks.

### 2. jQuery Library & DOM Manipulation
jQuery simplifies HTML document traversal, event handling, and animation:
- **Selectors**: `$('#taskForm')`, `$('#taskList')`, `$('.task-item')` provide concise DOM queries.
- **Dynamic DOM Creation**: `$list.append($card)`, `$list.empty()` to render tasks dynamically without full-page reloads.
- **Effects & Animations**: `$card.slideUp(250)`, `fadeIn()` deliver smooth visual feedback when completing or removing tasks.

### 3. Event Handling in JavaScript & jQuery
- **Form Submit (`submit`)**: Intercepted using `$('#taskForm').on('submit')` and `e.preventDefault()` to validate input and add tasks without page reload.
- **Event Delegation**: `$('#taskList').on('click', '.btn-task-delete')` and `$('#taskList').on('change', '.task-checkbox')` allow parent elements to manage events for dynamically created child elements.
- **Live Search (`input`, `keyup`)**: Instant filtering as the user types queries.

### 4. Browser Local Storage (`localStorage`)
- **`localStorage.setItem(key, value)`**: Persists task and schedule arrays across browser sessions as serialized JSON strings.
- **`localStorage.getItem(key)`**: Re-hydrates state on page reload, ensuring zero data loss.
- **`JSON.stringify()` and `JSON.parse()`**: Bridge complex JavaScript objects and localStorage strings.

### 5. Asynchronous JavaScript & XML (AJAX with `$.ajax`)
- **`$.ajax({ url, method, dataType, success, error })`**: Performs asynchronous HTTP GET requests to fetch remote task data (`tasks.json`) in the background.
- Dynamically integrates retrieved data into state with graceful fallbacks if accessed via the `file://` protocol.

### 6. Static Information Architecture (11.2 Case Study)
- Semantic page layout with sticky navigation (`<nav>`, `<a>`), headings (`<h1>`–`<h4>`), text styling (`<strong>`, `<em>`, `<u>`), divider rules (`<hr>`), and tables.

---

## Project Structure

```
Prac11/
├── 11.1/                           # Part 1: Interactive Portal (Class Scheduler & Task Manager)
│   ├── index.html                  # Integrated application with top tab navigation
│   ├── taskmanager.html            # Standalone dedicated Task Manager page
│   ├── style.css                   # Glassmorphic responsive styling for both practicals
│   ├── script.js                   # Unified controller (Timers + jQuery + Storage + AJAX)
│   ├── scheduler.js                # ES6 class model for Class Scheduler
│   ├── timer.js                    # ES6 module timer utilities
│   ├── tasks.json                  # Academic task dataset loaded via AJAX
│   └── Screenshot 2026-11-02.png   # Output screenshot showing live execution
├── 11.2/                           # Part 2: Smart India Hackathon Case Study
│   ├── index.html                  # Structured static web page
│   └── style.css                   # Header, navbar, and section styling
└── README.md                       # Comprehensive experiment documentation
```

---

## Experiment Program Code

---

### Part 1: Class Scheduler & Student Task Manager (11.1)

#### File: `11.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Academic Portal | Class Scheduler & Student Task Manager</title>
    <link rel="stylesheet" href="style.css">
    <!-- jQuery Library (Used for Task Manager DOM manipulation, events, animations, & AJAX) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>

    <div class="container">

        <!-- Top Navigation Tab Switcher -->
        <nav class="tab-navigation">
            <button type="button" class="tab-btn active" id="tabSchedulerBtn" data-target="viewScheduler">
                <span>⏰</span> Class Scheduler (Timers & Countdown)
            </button>
            <button type="button" class="tab-btn" id="tabTaskManagerBtn" data-target="viewTaskManager">
                <span>📋</span> Student Task Manager (jQuery & AJAX)
            </button>
        </nav>

        <!-- ========================================================= -->
        <!-- VIEW 1: Class Scheduler (setInterval, setTimeout, Timers) -->
        <!-- ========================================================= -->
        <main class="practical-view active-view" id="viewScheduler">

            <!-- Top Header & Real-time Live Clock -->
            <header>
                <div class="title-area">
                    <h1>Class Scheduler</h1>
                    <p>Real-Time Countdown &bull; setInterval() Loop &bull; setTimeout() Reminders</p>
                </div>
                <div class="clock-area">
                    <div class="live-clock" id="currentClock">00:00:00</div>
                    <div class="live-date" id="currentDate">Loading date...</div>
                </div>
            </header>

            <!-- Dynamic Real-time Countdown Banner -->
            <section class="countdown-hero" id="heroCountdown">
                <div class="hero-status-row">
                    <span class="status-badge badge-upcoming" id="heroBadge">
                        <span class="pulse-dot"></span>
                        <span id="heroStatusText">NEXT UPCOMING CLASS</span>
                    </span>
                    <span class="hero-timing-tag" id="heroTiming">Today</span>
                </div>

                <div class="hero-main-content">
                    <div class="hero-details">
                        <h2 id="heroTitle">Loading schedule...</h2>
                        <div class="hero-meta">
                            <span id="heroTeacher">👤 Instructor</span>
                            <span id="heroRoom">📍 Room</span>
                        </div>
                    </div>

                    <div class="countdown-digits">
                        <div class="digit-unit">
                            <span class="digit-value" id="hoursVal">00</span>
                            <span class="digit-label">Hours</span>
                        </div>
                        <span class="digit-separator">:</span>
                        <div class="digit-unit">
                            <span class="digit-value" id="minutesVal">00</span>
                            <span class="digit-label">Minutes</span>
                        </div>
                        <span class="digit-separator">:</span>
                        <div class="digit-unit">
                            <span class="digit-value" id="secondsVal">00</span>
                            <span class="digit-label">Seconds</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Add Class Schedule Form -->
            <section class="card-panel">
                <h3 class="section-title">Schedule New Class</h3>
                <form id="classForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="subject">Subject / Course Name</label>
                            <input type="text" id="subject" name="subject" placeholder="e.g. Operating Systems" required>
                        </div>

                        <div class="form-group">
                            <label for="teacher">Instructor Name</label>
                            <input type="text" id="teacher" name="teacher" placeholder="e.g. Dr. A. Sharma" required>
                        </div>

                        <div class="form-group">
                            <label for="room">Classroom / Lab</label>
                            <input type="text" id="room" name="room" placeholder="e.g. Room 402" required>
                        </div>

                        <div class="form-group">
                            <label for="day">Day of Week</label>
                            <select id="day" name="day" required>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="startTime">Start Time</label>
                            <input type="time" id="startTime" name="startTime" required>
                        </div>

                        <div class="form-group">
                            <label for="endTime">End Time</label>
                            <input type="time" id="endTime" name="endTime" required>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">➕ Add to Schedule</button>
                        <button type="button" id="resetBtn" class="btn btn-secondary">🔄 Reset Default Timetable</button>
                        <button type="button" id="testReminderBtn" class="btn btn-secondary">⏰ Test setTimeout() Reminder (5s)</button>
                    </div>
                </form>
            </section>

            <!-- Scheduled Classes Timetable List -->
            <section class="card-panel">
                <div class="section-title">
                    <span>Timetable Schedule</span>
                    <span id="classCount" style="font-size: 13px; color: var(--primary);">0 Classes</span>
                </div>
                <div class="schedule-list" id="classList">
                    <!-- Populated dynamically by script.js -->
                </div>
            </section>

        </main>

        <!-- ====================================================================== -->
        <!-- VIEW 2: Student Task Manager (jQuery, DOM, Events, Local Storage, AJAX) -->
        <!-- ====================================================================== -->
        <main class="practical-view" id="viewTaskManager">

            <!-- Task Manager Header -->
            <header>
                <div class="title-area">
                    <h1>Student Task Manager</h1>
                    <p>jQuery &bull; DOM Manipulation &bull; Event Handling &bull; localStorage &bull; AJAX ($.ajax)</p>
                </div>
                <div class="clock-area">
                    <button type="button" id="btnLoadAjax" class="btn btn-ajax">
                        <span>📥</span> Load Tasks via AJAX
                    </button>
                </div>
            </header>

            <!-- Real-Time Metrics & Progress -->
            <div class="stats-banner">
                <div class="stat-box">
                    <span class="stat-num" id="totalTasksCount">0</span>
                    <span class="stat-lbl">Total Tasks</span>
                </div>
                <div class="stat-box box-pending">
                    <span class="stat-num" id="pendingTasksCount" style="color: var(--warning);">0</span>
                    <span class="stat-lbl">Pending</span>
                </div>
                <div class="stat-box box-completed">
                    <span class="stat-num" id="completedTasksCount" style="color: var(--success);">0</span>
                    <span class="stat-lbl">Completed</span>
                </div>
            </div>

            <!-- Task Completion Progress Bar -->
            <div class="task-progress-wrap">
                <div class="progress-header">
                    <span>Overall Completion Rate</span>
                    <span id="taskProgressPercent">0%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" id="taskProgressBar"></div>
                </div>
            </div>

            <!-- Add Task Form (jQuery .on('submit')) -->
            <section class="card-panel">
                <h3 class="section-title">Create New Task / Assignment</h3>
                <form id="taskForm">
                    <div class="form-grid">
                        <div class="form-group" style="grid-column: span 2;">
                            <label for="taskTitle">Task / Assignment Title</label>
                            <input type="text" id="taskTitle" name="taskTitle" placeholder="e.g. Implement Dijkstra Algorithm in C++" required>
                        </div>

                        <div class="form-group">
                            <label for="taskCourse">Subject / Course</label>
                            <input type="text" id="taskCourse" name="taskCourse" placeholder="e.g. Design & Analysis of Algorithms" required>
                        </div>

                        <div class="form-group">
                            <label for="taskDueDate">Due Date</label>
                            <input type="date" id="taskDueDate" name="taskDueDate" required>
                        </div>

                        <div class="form-group">
                            <label for="taskPriority">Priority Level</label>
                            <select id="taskPriority" name="taskPriority" required>
                                <option value="High">🔴 High Priority</option>
                                <option value="Medium" selected>🟡 Medium Priority</option>
                                <option value="Low">🟢 Low Priority</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">➕ Add Task</button>
                        <button type="button" id="btnClearCompleted" class="btn btn-secondary">🧹 Clear Completed</button>
                        <button type="button" id="btnResetTasks" class="btn btn-secondary">🔄 Reset Default Tasks</button>
                    </div>
                </form>
            </section>

            <!-- Task List & Search/Filter Toolbar -->
            <section class="card-panel">
                <div class="toolbar-wrap">
                    <!-- Event Filters (jQuery .click()) -->
                    <div class="filter-group" id="taskFilters">
                        <button type="button" class="filter-chip active" data-filter="all">All Tasks</button>
                        <button type="button" class="filter-chip" data-filter="pending">Pending</button>
                        <button type="button" class="filter-chip" data-filter="completed">Completed</button>
                        <button type="button" class="filter-chip" data-filter="High">High Priority</button>
                    </div>

                    <!-- Search Input (jQuery .on('input')) -->
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="taskSearchInput" placeholder="Search tasks or courses...">
                    </div>
                </div>

                <!-- Dynamic Task Cards Container (Manipulated via jQuery) -->
                <div id="taskList">
                    <!-- Rendered dynamically by script.js -->
                </div>
            </section>

        </main>

        <!-- Footer -->
        <footer>
            <p>Practical 11 | Class Scheduler & Student Task Manager</p>
            <p>Submitted by: <strong>Ayush Aswale</strong> | PRN: <strong>24070521009</strong></p>
        </footer>

    </div>

    <!-- Toast Notifications Center -->
    <div class="toast-box" id="toastContainer"></div>

    <!-- Application Script -->
    <script src="script.js"></script>

</body>

</html>
```

#### File: `11.1/style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

:root {
    --bg-main: #0b0f19;
    --bg-card: rgba(18, 24, 38, 0.85);
    --bg-surface: #151d30;
    --bg-input: #1b253b;
    --border: rgba(148, 163, 184, 0.15);
    --border-hover: rgba(56, 189, 248, 0.4);
    
    --primary: #38bdf8;
    --primary-glow: rgba(56, 189, 248, 0.25);
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --purple: #a855f7;
    
    --text-title: #f8fafc;
    --text-body: #cbd5e1;
    --text-muted: #94a3b8;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

body {
    background-color: var(--bg-main);
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 40%);
    background-attachment: fixed;
    color: var(--text-body);
    padding: 30px 16px;
    min-height: 100vh;
}

.container {
    max-width: 960px;
    margin: 0 auto;
}

/* ====================================================
   Top Practical Navigation Tabs (Scheduler vs Task Manager)
   ==================================================== */
.tab-navigation {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    background: var(--bg-surface);
    padding: 8px;
    border-radius: 16px;
    border: 1px solid var(--border);
}

.tab-btn {
    flex: 1;
    padding: 12px 18px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-weight: 700;
    font-size: 14px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s all ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.tab-btn:hover {
    color: var(--text-title);
    background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
    background: var(--primary);
    color: #0b0f19;
    box-shadow: 0 4px 14px var(--primary-glow);
}

/* Header */
header {
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.title-area h1 {
    font-size: 24px;
    font-weight: 800;
    color: var(--text-title);
    letter-spacing: -0.5px;
}

.title-area p {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 4px;
}

.clock-area {
    text-align: right;
    background: var(--bg-surface);
    padding: 10px 18px;
    border-radius: 14px;
    border: 1px solid var(--border);
}

.live-clock {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 1px;
}

.live-date {
    font-size: 12px;
    color: var(--text-muted);
}

/* Practical View Panels */
.practical-view {
    display: none;
}

.practical-view.active-view {
    display: block;
    animation: fadeInView 0.3s ease;
}

@keyframes fadeInView {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Hero Countdown Box */
.countdown-hero {
    background: linear-gradient(135deg, #131d33 0%, #1e293b 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.45);
    position: relative;
    overflow: hidden;
}

.countdown-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), #818cf8, #34d399);
}

.hero-status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 6px 14px;
    border-radius: 20px;
}

.badge-live {
    background: rgba(239, 68, 68, 0.18);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.35);
}

.badge-upcoming {
    background: rgba(56, 189, 248, 0.15);
    color: var(--primary);
    border: 1px solid rgba(56, 189, 248, 0.3);
}

.pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { transform: scale(0.95); opacity: 0.8; }
    50% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.8; }
}

.hero-timing-tag {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
}

.hero-main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
}

.hero-details h2 {
    font-size: 26px;
    font-weight: 800;
    color: var(--text-title);
    margin-bottom: 8px;
}

.hero-meta {
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: var(--text-muted);
}

.countdown-digits {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(11, 15, 25, 0.7);
    padding: 14px 22px;
    border-radius: 16px;
    border: 1px solid var(--border);
}

.digit-unit {
    text-align: center;
}

.digit-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    display: block;
    line-height: 1;
}

.digit-label {
    font-size: 10px;
    color: var(--text-muted);
    font-weight: 700;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.digit-separator {
    font-size: 26px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 12px;
}

/* Card Panels */
.card-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px 28px;
    margin-bottom: 24px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.section-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
}

.form-group input,
.form-group select {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-title);
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    transition: 0.2s border-color, 0.2s box-shadow;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-actions {
    margin-top: 18px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s transform, 0.2s opacity;
}

.btn:active {
    transform: scale(0.98);
}

.btn-primary {
    background: var(--primary);
    color: #0b0f19;
}

.btn-primary:hover {
    opacity: 0.92;
}

.btn-secondary {
    background: var(--bg-surface);
    color: var(--text-body);
    border: 1px solid var(--border);
}

.btn-secondary:hover {
    background: var(--bg-input);
    color: var(--text-title);
}

.btn-ajax {
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    color: #ffffff;
}

.btn-ajax:hover {
    opacity: 0.92;
}

/* Schedule List */
.schedule-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.class-item {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--primary);
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    transition: 0.2s transform, 0.2s border-color;
}

.class-item:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
}

.class-item.item-live {
    border-left-color: var(--danger);
    background: rgba(239, 68, 68, 0.05);
}

.item-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.item-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: var(--primary);
    background: rgba(56, 189, 248, 0.1);
    padding: 6px 12px;
    border-radius: 8px;
    text-align: center;
}

.item-info h4 {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 4px;
}

.item-info p {
    font-size: 13px;
    color: var(--text-muted);
}

.item-right {
    display: flex;
    align-items: center;
    gap: 14px;
}

.item-countdown {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
}

.btn-delete {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 16px;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: 0.2s color, 0.2s background;
}

.btn-delete:hover {
    color: var(--danger);
    background: rgba(239, 68, 68, 0.1);
}

/* ====================================================
   Student Task Manager Specific Styles
   ==================================================== */
.stats-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.stat-box {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.stat-box::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--primary);
}

.stat-box.box-pending::after {
    background: var(--warning);
}

.stat-box.box-completed::after {
    background: var(--success);
}

.stat-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 28px;
    font-weight: 800;
    color: var(--text-title);
    display: block;
}

.stat-lbl {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
}

/* Task Progress Bar */
.task-progress-wrap {
    margin: 16px 0 24px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    padding: 14px 20px;
    border-radius: 14px;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
}

.progress-track {
    width: 100%;
    height: 8px;
    background: var(--bg-input);
    border-radius: 8px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--primary), var(--success));
    transition: width 0.4s ease;
}

/* Filter & Search Toolbar */
.toolbar-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 20px;
}

.filter-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.filter-chip {
    padding: 7px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-muted);
    cursor: pointer;
    transition: 0.2s all;
}

.filter-chip:hover {
    color: var(--text-title);
    border-color: var(--border-hover);
}

.filter-chip.active {
    background: rgba(56, 189, 248, 0.15);
    color: var(--primary);
    border-color: var(--primary);
}

.search-box {
    position: relative;
    min-width: 240px;
    flex: 1;
    max-width: 320px;
}

.search-box input {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-title);
    padding: 8px 14px 8px 34px;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
}

.search-box input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: var(--text-muted);
}

/* Task Item Card */
.task-item {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--primary);
    border-radius: 14px;
    padding: 16px 20px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    transition: 0.2s all ease;
}

.task-item:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
}

.task-item.priority-High {
    border-left-color: var(--danger);
}

.task-item.priority-Medium {
    border-left-color: var(--warning);
}

.task-item.priority-Low {
    border-left-color: var(--success);
}

.task-item.task-done {
    opacity: 0.65;
    background: rgba(15, 23, 42, 0.4);
    border-left-color: #64748b;
}

.task-item.task-done .task-title {
    text-decoration: line-through;
    color: var(--text-muted);
}

.task-check-area {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
    min-width: 250px;
}

.task-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: var(--success);
}

.task-content h4 {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 4px;
}

.task-meta-tags {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: var(--text-muted);
    flex-wrap: wrap;
}

.badge-tag {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
}

.badge-course {
    background: rgba(168, 85, 247, 0.15);
    color: #c084fc;
    border: 1px solid rgba(168, 85, 247, 0.3);
}

.badge-high {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge-med {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-low {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-overdue {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    font-weight: 700;
}

.task-actions-area {
    display: flex;
    align-items: center;
    gap: 12px;
}

.task-due-date {
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--text-muted);
}

/* Toast Alerts */
.toast-box {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 360px;
}

.toast {
    background: #182235;
    border: 1px solid var(--primary);
    color: var(--text-title);
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

footer {
    text-align: center;
    margin-top: 30px;
    padding: 16px;
    font-size: 13px;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
}

```

#### File: `11.1/script.js`

```javascript
/**
 * script.js - Academic Portal Controller
 * Part 1: Class Scheduler (ES6 Class, setInterval real-time countdown, setTimeout alerts)
 * Part 2: Student Task Manager (JavaScript, jQuery, DOM Manipulation, Events, localStorage, AJAX)
 */

// ==========================================================================
// PART 1: CLASS SCHEDULER (setInterval & setTimeout Timers)
// ==========================================================================

class ClassSchedule {
    constructor({ id, subject, teacher, room, day, startTime, endTime }) {
        this.id = id || 'cls_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        this.subject = subject.trim();
        this.teacher = teacher.trim();
        this.room = room.trim() || 'N/A';
        this.day = day; // Monday - Sunday
        this.startTime = startTime; // HH:MM (24-hour)
        this.endTime = endTime; // HH:MM (24-hour)
    }

    getStatus(now = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayIndex = now.getDay();
        const targetDayIndex = days.indexOf(this.day);

        const [startH, startM] = this.startTime.split(':').map(Number);
        const [endH, endM] = this.endTime.split(':').map(Number);

        let dayDiff = targetDayIndex - currentDayIndex;

        const startToday = new Date(now);
        startToday.setHours(startH, startM, 0, 0);

        const endToday = new Date(now);
        endToday.setHours(endH, endM, 0, 0);

        if (dayDiff === 0) {
            if (now >= startToday && now < endToday) {
                const totalDuration = endToday - startToday;
                const elapsed = now - startToday;
                return {
                    status: 'LIVE',
                    label: 'Class In Session',
                    targetDate: endToday,
                    diffMs: endToday - now,
                    progress: Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
                };
            }
            if (now < startToday) {
                return {
                    status: 'UPCOMING',
                    label: 'Starts Today',
                    targetDate: startToday,
                    diffMs: startToday - now,
                    progress: 0
                };
            }
        }

        if (dayDiff < 0 || (dayDiff === 0 && now >= endToday)) {
            dayDiff += 7;
        }

        const nextStart = new Date(now);
        nextStart.setDate(now.getDate() + dayDiff);
        nextStart.setHours(startH, startM, 0, 0);

        return {
            status: 'UPCOMING',
            label: `Upcoming (${this.day})`,
            targetDate: nextStart,
            diffMs: nextStart - now,
            progress: 0
        };
    }
}

const SCHEDULER_STORAGE_KEY = 'prac11_classes';
let classes = [];
let activeReminders = [];

// DOM References for Scheduler
const clockEl = document.getElementById('currentClock');
const dateEl = document.getElementById('currentDate');
const heroBadge = document.getElementById('heroBadge');
const heroStatusText = document.getElementById('heroStatusText');
const heroTiming = document.getElementById('heroTiming');
const heroTitle = document.getElementById('heroTitle');
const heroTeacher = document.getElementById('heroTeacher');
const heroRoom = document.getElementById('heroRoom');
const hoursVal = document.getElementById('hoursVal');
const minutesVal = document.getElementById('minutesVal');
const secondsVal = document.getElementById('secondsVal');
const classListEl = document.getElementById('classList');
const classCountEl = document.getElementById('classCount');
const classForm = document.getElementById('classForm');
const resetBtn = document.getElementById('resetBtn');
const testReminderBtn = document.getElementById('testReminderBtn');
const toastContainer = document.getElementById('toastContainer');

function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function updateLiveClock(now = new Date()) {
    if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

function formatTimeLeft(ms) {
    if (ms <= 0) return { hours: '00', minutes: '00', seconds: '00', text: '00:00:00' };
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return {
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        text: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    };
}

function loadScheduleClasses() {
    try {
        const data = localStorage.getItem(SCHEDULER_STORAGE_KEY);
        if (data) {
            const list = JSON.parse(data);
            if (Array.isArray(list) && list.length > 0) {
                return list.map(item => new ClassSchedule(item));
            }
        }
    } catch (e) {
        console.error('Error loading schedule:', e);
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const todayName = days[now.getDay()];
    const currentH = now.getHours();
    const pad = (n) => String(n).padStart(2, '0');

    const defaultSamples = [
        new ClassSchedule({
            subject: 'Full Stack Web Development',
            teacher: 'Prof. Sharma',
            room: 'Lab 301',
            day: todayName,
            startTime: `${pad(currentH)}:00`,
            endTime: `${pad((currentH + 1) % 24)}:30`
        }),
        new ClassSchedule({
            subject: 'Data Structures & Algorithms',
            teacher: 'Dr. Mukherjee',
            room: 'LH-2',
            day: todayName,
            startTime: `${pad((currentH + 2) % 24)}:00`,
            endTime: `${pad((currentH + 3) % 24)}:00`
        })
    ];

    saveScheduleClasses(defaultSamples);
    return defaultSamples;
}

function saveScheduleClasses(list) {
    try {
        localStorage.setItem(SCHEDULER_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('Error saving schedule:', e);
    }
}

function refreshReminders(now = new Date()) {
    activeReminders.forEach(t => clearTimeout(t));
    activeReminders = [];

    classes.forEach(c => {
        const info = c.getStatus(now);
        if (info.status === 'UPCOMING' && info.diffMs > 0 && info.diffMs < 86400000) {
            const reminderId = setTimeout(() => {
                showToast(`🔔 Class Started: "${c.subject}" in ${c.room}!`);
            }, info.diffMs);
            activeReminders.push(reminderId);

            const fiveMinMs = info.diffMs - 300000;
            if (fiveMinMs > 0) {
                const warnId = setTimeout(() => {
                    showToast(`⏰ 5-Minute Warning: "${c.subject}" begins soon!`);
                });
                activeReminders.push(warnId);
            }
        }
    });
}

/**
 * Executes every 1000ms using setInterval()
 */
function updateScheduler() {
    const now = new Date();
    updateLiveClock(now);

    if (classes.length === 0) {
        if (heroTitle) heroTitle.textContent = 'No Classes Scheduled';
        if (heroTeacher) heroTeacher.textContent = '👤 Add a class below';
        if (heroRoom) heroRoom.textContent = '📍 Timetable empty';
        if (heroTiming) heroTiming.textContent = '--';
        if (heroStatusText) heroStatusText.textContent = 'IDLE';
        if (heroBadge) heroBadge.className = 'status-badge badge-upcoming';
        if (hoursVal) hoursVal.textContent = '00';
        if (minutesVal) minutesVal.textContent = '00';
        if (secondsVal) secondsVal.textContent = '00';
        renderScheduleList(new Map());
        return;
    }

    let liveClass = null;
    let nextUpcoming = null;
    let minUpcomingDiff = Infinity;
    const statusMap = new Map();

    classes.forEach(c => {
        const status = c.getStatus(now);
        statusMap.set(c.id, status);

        if (status.status === 'LIVE') {
            liveClass = { item: c, status };
        } else if (status.diffMs > 0 && status.diffMs < minUpcomingDiff) {
            minUpcomingDiff = status.diffMs;
            nextUpcoming = { item: c, status };
        }
    });

    const activeTarget = liveClass || nextUpcoming;

    if (activeTarget) {
        const { item, status } = activeTarget;
        const formatted = formatTimeLeft(status.diffMs);

        if (heroTitle) heroTitle.textContent = item.subject;
        if (heroTeacher) heroTeacher.textContent = `👤 ${item.teacher}`;
        if (heroRoom) heroRoom.textContent = `📍 ${item.room}`;
        if (heroTiming) heroTiming.textContent = `${item.day} • ${item.startTime} - ${item.endTime}`;

        if (heroBadge && heroStatusText) {
            if (status.status === 'LIVE') {
                heroBadge.className = 'status-badge badge-live';
                heroStatusText.textContent = 'CLASS IN SESSION (ENDING IN)';
            } else {
                heroBadge.className = 'status-badge badge-upcoming';
                heroStatusText.textContent = 'NEXT UPCOMING CLASS';
            }
        }

        if (hoursVal) hoursVal.textContent = formatted.hours;
        if (minutesVal) minutesVal.textContent = formatted.minutes;
        if (secondsVal) secondsVal.textContent = formatted.seconds;
    }

    renderScheduleList(statusMap);
}

function renderScheduleList(statusMap) {
    if (classCountEl) classCountEl.textContent = `${classes.length} Classes`;
    if (!classListEl) return;

    if (classes.length === 0) {
        classListEl.innerHTML = `<p style="color: var(--text-muted); padding: 10px;">No classes scheduled yet.</p>`;
        return;
    }

    classListEl.innerHTML = classes.map(c => {
        const info = statusMap.get(c.id);
        const isLive = info && info.status === 'LIVE';
        const formatted = info ? formatTimeLeft(info.diffMs).text : '--:--:--';
        const statusText = isLive ? 'Ends in: ' : 'Starts in: ';

        return `
            <div class="class-item ${isLive ? 'item-live' : ''}">
                <div class="item-left">
                    <div class="item-time">
                        ${c.startTime}<br>to<br>${c.endTime}
                    </div>
                    <div class="item-info">
                        <h4>${escapeHtml(c.subject)}</h4>
                        <p>👤 ${escapeHtml(c.teacher)} | 📍 ${escapeHtml(c.room)} | 📅 ${c.day}</p>
                    </div>
                </div>
                <div class="item-right">
                    <span class="item-countdown">${statusText}<strong>${formatted}</strong></span>
                    <button class="btn-delete" data-id="${c.id}" title="Delete class">🗑️</button>
                </div>
            </div>
        `;
    }).join('');

    classListEl.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            classes = classes.filter(c => c.id !== id);
            saveScheduleClasses(classes);
            refreshReminders();
            updateScheduler();
            showToast('Class removed from schedule.');
        });
    });
}

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Scheduler Event Listeners
if (classForm) {
    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = classForm.subject.value;
        const teacher = classForm.teacher.value;
        const room = classForm.room.value;
        const day = classForm.day.value;
        const startTime = classForm.startTime.value;
        const endTime = classForm.endTime.value;

        if (startTime >= endTime) {
            alert('End time must be later than start time.');
            return;
        }

        const newClass = new ClassSchedule({ subject, teacher, room, day, startTime, endTime });
        classes.push(newClass);
        saveScheduleClasses(classes);
        classForm.reset();
        refreshReminders();
        updateScheduler();
        showToast(`Added "${newClass.subject}" to schedule!`);
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem(SCHEDULER_STORAGE_KEY);
        classes = loadScheduleClasses();
        refreshReminders();
        updateScheduler();
        showToast('Reset default timetable.');
    });
}

if (testReminderBtn) {
    testReminderBtn.addEventListener('click', () => {
        showToast('⏳ Timer set! setTimeout() scheduled for 5 seconds...');
        setTimeout(() => {
            showToast('⏰ [setTimeout Fired] 5 seconds have elapsed!');
        }, 5000);
    });
}

// Initialize Scheduler
classes = loadScheduleClasses();
refreshReminders();
setInterval(updateScheduler, 1000);
updateScheduler();


// ==========================================================================
// PART 2: TOP NAVIGATION TAB SWITCHER (Scheduler <-> Task Manager)
// ==========================================================================

const tabBtns = document.querySelectorAll('.tab-btn');
const views = document.querySelectorAll('.practical-view');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        views.forEach(v => {
            if (v.id === targetId) {
                v.classList.add('active-view');
            } else {
                v.classList.remove('active-view');
            }
        });

        // Store active tab preference
        try {
            sessionStorage.setItem('active_practical_tab', targetId);
        } catch (e) {}
    });
});

// Restore saved tab if set
try {
    const savedTab = sessionStorage.getItem('active_practical_tab');
    if (savedTab) {
        const targetBtn = document.querySelector(`.tab-btn[data-target="${savedTab}"]`);
        if (targetBtn) targetBtn.click();
    }
} catch (e) {}


// ==========================================================================
// PART 3: STUDENT TASK MANAGER (jQuery, DOM, Events, localStorage, AJAX)
// ==========================================================================

(function initStudentTaskManager() {
    // If jQuery is available, use jQuery; otherwise gracefully wait or fallback
    const hasJQuery = typeof window.jQuery !== 'undefined';
    if (!hasJQuery) {
        console.warn('jQuery not loaded yet, waiting for document ready...');
    }

    const $ = window.jQuery || function(sel) {
        const el = document.querySelector(sel);
        return {
            on: (ev, fn) => el && el.addEventListener(ev, fn),
            val: (v) => v !== undefined ? (el && (el.value = v)) : (el ? el.value : ''),
            html: (h) => el && (el.innerHTML = h),
            text: (t) => el && (el.textContent = t)
        };
    };

    const TASK_STORAGE_KEY = 'student_tasks_v1';
    let tasks = [];
    let currentFilter = 'all';
    let currentSearchQuery = '';

    // Fallback seed tasks if file:// protocol blocks local AJAX
    const defaultAcademicTasks = [
        {
            id: 'task_seed_1',
            title: 'Complete Machine Learning Lab Assignment 4',
            course: 'Artificial Intelligence & ML',
            dueDate: getOffsetDateString(4),
            priority: 'High',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 'task_seed_2',
            title: 'Submit Computer Networks Term Paper',
            course: 'Computer Networks',
            dueDate: getOffsetDateString(6),
            priority: 'Medium',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 'task_seed_3',
            title: 'Prepare Presentation Slides for CA3 Review',
            course: 'Full Stack Web Development',
            dueDate: getOffsetDateString(2),
            priority: 'High',
            completed: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 'task_seed_4',
            title: 'Review Operating Systems Chapter 5: CPU Scheduling',
            course: 'Operating Systems',
            dueDate: getOffsetDateString(8),
            priority: 'Low',
            completed: false,
            createdAt: new Date().toISOString()
        }
    ];

    function getOffsetDateString(daysAhead = 0) {
        const d = new Date();
        d.setDate(d.getDate() + daysAhead);
        return d.toISOString().split('T')[0];
    }

    // Load from localStorage
    function loadTasksFromStorage() {
        try {
            const raw = localStorage.getItem(TASK_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error reading tasks from localStorage:', e);
        }
        saveTasksToStorage(defaultAcademicTasks);
        return defaultAcademicTasks;
    }

    // Save to localStorage
    function saveTasksToStorage(taskList) {
        try {
            localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskList));
        } catch (e) {
            console.error('Error writing tasks to localStorage:', e);
        }
    }

    // Update Metrics & Progress Bar using jQuery
    function updateMetrics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        $('#totalTasksCount').text(total);
        $('#pendingTasksCount').text(pending);
        $('#completedTasksCount').text(completed);
        $('#taskProgressPercent').text(`${percent}%`);
        $('#taskProgressBar').css('width', `${percent}%`);
    }

    // Render Task List (jQuery DOM Manipulation)
    function renderTasks() {
        updateMetrics();
        const $list = $('#taskList');
        $list.empty();

        // Apply active filter and live search
        const filtered = tasks.filter(task => {
            let matchesFilter = true;
            if (currentFilter === 'pending') matchesFilter = !task.completed;
            else if (currentFilter === 'completed') matchesFilter = task.completed;
            else if (currentFilter === 'High' || currentFilter === 'Medium' || currentFilter === 'Low') {
                matchesFilter = task.priority === currentFilter;
            }

            let matchesSearch = true;
            if (currentSearchQuery.trim() !== '') {
                const q = currentSearchQuery.toLowerCase();
                matchesSearch = task.title.toLowerCase().includes(q) ||
                                task.course.toLowerCase().includes(q);
            }

            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            $list.html(`
                <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 15px;">No tasks match your current criteria.</p>
                    <span style="font-size: 12px;">Try selecting another filter or adding a new task above.</span>
                </div>
            `);
            return;
        }

        // Build DOM cards dynamically with jQuery
        filtered.forEach(task => {
            const isDone = task.completed ? 'task-done' : '';
            const checkedAttr = task.completed ? 'checked' : '';
            const priorityClass = `badge-${task.priority.toLowerCase()}`;

            const $card = $(`
                <div class="task-item priority-${task.priority} ${isDone}" data-id="${task.id}">
                    <div class="task-check-area">
                        <input type="checkbox" class="task-checkbox" ${checkedAttr} title="Mark task status">
                        <div class="task-content">
                            <h4 class="task-title">${escapeHtml(task.title)}</h4>
                            <div class="task-meta-tags">
                                <span class="badge-tag badge-course">📚 ${escapeHtml(task.course)}</span>
                                <span class="badge-tag ${priorityClass}">${task.priority} Priority</span>
                                <span class="task-due-date">📅 Due: ${task.dueDate}</span>
                            </div>
                        </div>
                    </div>
                    <div class="task-actions-area">
                        <button type="button" class="btn-delete btn-task-delete" title="Delete task">🗑️</button>
                    </div>
                </div>
            `);

            $list.append($card);
        });
    }

    // jQuery Event Binding on $(document).ready
    $(function() {
        tasks = loadTasksFromStorage();
        renderTasks();

        // 1. Form Submission (jQuery .on('submit'))
        $('#taskForm').on('submit', function(e) {
            e.preventDefault();

            const title = $('#taskTitle').val().trim();
            const course = $('#taskCourse').val().trim();
            const dueDate = $('#taskDueDate').val();
            const priority = $('#taskPriority').val();

            if (!title || !course || !dueDate) {
                alert('Please fill out all task details.');
                return;
            }

            const newTask = {
                id: 'task_' + Date.now(),
                title,
                course,
                dueDate,
                priority,
                completed: false,
                createdAt: new Date().toISOString()
            };

            tasks.unshift(newTask);
            saveTasksToStorage(tasks);
            renderTasks();
            this.reset();
            showToast(`Task added: "${newTask.title}"`);
        });

        // 2. Task Checkbox Completion Toggle (jQuery Event Delegation)
        $('#taskList').on('change', '.task-checkbox', function() {
            const $card = $(this).closest('.task-item');
            const id = $card.attr('data-id');
            const isChecked = $(this).is(':checked');

            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = isChecked;
                saveTasksToStorage(tasks);

                if (isChecked) {
                    $card.addClass('task-done');
                    showToast(`Completed: "${task.title}"`);
                } else {
                    $card.removeClass('task-done');
                }
                updateMetrics();
            }
        });

        // 3. Delete Task with jQuery slideUp Animation
        $('#taskList').on('click', '.btn-task-delete', function() {
            const $card = $(this).closest('.task-item');
            const id = $card.attr('data-id');
            const task = tasks.find(t => t.id === id);

            $card.slideUp(250, function() {
                tasks = tasks.filter(t => t.id !== id);
                saveTasksToStorage(tasks);
                renderTasks();
                if (task) showToast(`Deleted: "${task.title}"`);
            });
        });

        // 4. Filter Chips (jQuery click event)
        $('#taskFilters').on('click', '.filter-chip', function() {
            $('#taskFilters .filter-chip').removeClass('active');
            $(this).addClass('active');

            currentFilter = $(this).attr('data-filter');
            renderTasks();
        });

        // 5. Live Search Filter (jQuery input event)
        $('#taskSearchInput').on('input keyup', function() {
            currentSearchQuery = $(this).val();
            renderTasks();
        });

        // 6. Clear Completed Tasks
        $('#btnClearCompleted').on('click', function() {
            const beforeCount = tasks.length;
            tasks = tasks.filter(t => !t.completed);
            const removed = beforeCount - tasks.length;

            if (removed === 0) {
                showToast('No completed tasks to clear.');
                return;
            }

            saveTasksToStorage(tasks);
            renderTasks();
            showToast(`Cleared ${removed} completed task(s).`);
        });

        // 7. Reset Default Tasks
        $('#btnResetTasks').on('click', function() {
            if (confirm('Reset task list to default academic assignments?')) {
                tasks = [...defaultAcademicTasks];
                saveTasksToStorage(tasks);
                renderTasks();
                showToast('Reset default academic tasks.');
            }
        });

        // 8. AJAX Request Demonstration using jQuery $.ajax()
        $('#btnLoadAjax').on('click', function() {
            const $btn = $(this);
            $btn.prop('disabled', true).html('<span>⏳</span> Loading AJAX...');

            // jQuery AJAX call to load tasks.json
            $.ajax({
                url: 'tasks.json',
                type: 'GET',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    $btn.prop('disabled', false).html('<span>📥</span> Load Tasks via AJAX');

                    if (Array.isArray(data) && data.length > 0) {
                        // Merge without duplicates by ID
                        const existingIds = new Set(tasks.map(t => t.id));
                        let addedCount = 0;

                        data.forEach(item => {
                            if (!existingIds.has(item.id)) {
                                tasks.push(item);
                                addedCount++;
                            }
                        });

                        saveTasksToStorage(tasks);
                        renderTasks();
                        showToast(`✅ AJAX Success: Imported ${addedCount} task(s) from tasks.json!`);
                    } else {
                        showToast('AJAX responded with empty task array.');
                    }
                },
                error: function(xhr, status, error) {
                    console.warn('AJAX request failed (often on file:// protocol). Loading fallback data.', error);
                    $btn.prop('disabled', false).html('<span>📥</span> Load Tasks via AJAX');

                    // Graceful fallback for file:// protocol
                    const existingIds = new Set(tasks.map(t => t.id));
                    let addedCount = 0;

                    defaultAcademicTasks.forEach(item => {
                        const newId = 'ajax_fallback_' + Math.random().toString(36).substr(2, 5);
                        if (!existingIds.has(item.id)) {
                            tasks.push({ ...item, id: newId });
                            addedCount++;
                        }
                    });

                    saveTasksToStorage(tasks);
                    renderTasks();
                    showToast(`✅ AJAX Fallback: Loaded ${addedCount} academic task(s) successfully!`);
                }
            });
        });
    });
})();

```

#### File: `11.1/tasks.json`

```json
[
    {
        "id": "ajax_task_1",
        "title": "Complete Machine Learning Lab Assignment 4",
        "course": "Artificial Intelligence & ML",
        "dueDate": "2026-11-06",
        "priority": "High",
        "completed": false,
        "createdAt": "2026-11-02T09:00:00.000Z"
    },
    {
        "id": "ajax_task_2",
        "title": "Submit Computer Networks Term Paper",
        "course": "Computer Networks",
        "dueDate": "2026-11-08",
        "priority": "Medium",
        "completed": false,
        "createdAt": "2026-11-02T09:15:00.000Z"
    },
    {
        "id": "ajax_task_3",
        "title": "Prepare Presentation Slides for CA3 Review",
        "course": "Full Stack Web Development",
        "dueDate": "2026-11-05",
        "priority": "High",
        "completed": true,
        "createdAt": "2026-11-01T14:30:00.000Z"
    },
    {
        "id": "ajax_task_4",
        "title": "Review Operating Systems Chapter 5: CPU Scheduling",
        "course": "Operating Systems",
        "dueDate": "2026-11-10",
        "priority": "Low",
        "completed": false,
        "createdAt": "2026-11-02T10:00:00.000Z"
    }
]

```

---

### Part 2: Smart India Hackathon (SIH) Case Study (11.2)

#### File: `11.2/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart India Hackathon (SIH) | Official Information Portal</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Main Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo">🇮🇳 Smart India Hackathon</a>
            <ul class="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#achievements">Achievements</a></li>
                <li><a href="#placements">Placements & Opportunities</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Header Section -->
    <header class="hero-banner">
        <div class="banner-content">
            <h1>SMART INDIA HACKATHON (SIH)</h1>
            <p class="tagline">World's Largest Open Innovation Model &bull; Ministry of Education, Govt. of India</p>
            <br>
            <p>Empowering the youth to build <strong>digital solutions</strong> for pressing challenges of modern India.</p>
        </div>
    </header>

    <div class="page-container">

        <!-- About Section -->
        <section id="about" class="content-section">
            <h2 class="section-heading">About Smart India Hackathon</h2>
            <hr class="divider">

            <p>
                <strong>Smart India Hackathon (SIH)</strong> is a nationwide initiative organized by the
                <em>Ministry of Education's Innovation Cell (MIC)</em> and <em>AICTE (All India Council for Technical Education)</em>.
                It provides students with a national platform to solve pressing challenges faced by our daily lives, thereby inculcating a culture of <u>product innovation</u> and a mindset of <u>problem-solving</u>.
            </p>
            <br>
            <p>
                SIH is conducted across two flagship editions:
            </p>
            <ul class="styled-list">
                <li><b style="color: #0284c7;">Software Edition:</b> A 36-hour non-stop digital product development competition.</li>
                <li><b style="color: #ea580c;">Hardware Edition:</b> A 5-day continuous product prototyping and fabrication challenge.</li>
            </ul>
            <br>
            <p>
                Students collaborate in diverse multidisciplinary teams to design scalable, cost-effective, and deployable tech solutions for various Ministries, Departments, and Premier Industry Partners.
            </p>
        </section>

        <!-- Achievements Section -->
        <section id="achievements" class="content-section">
            <h2 class="section-heading">Key Achievements & Impact</h2>
            <hr class="divider">

            <p>Over the years, the Smart India Hackathon has witnessed unprecedented participation and breakthrough innovations across the nation:</p>
            <br>

            <!-- Stats Highlight Cards -->
            <div class="stats-row">
                <div class="stat-card">
                    <span class="stat-number">10,00,000+</span>
                    <span class="stat-label">Student Innovators</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">50,000+</span>
                    <span class="stat-label">Ideas Submitted</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">75+</span>
                    <span class="stat-label">Nodal Centers Pan-India</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">₹2+ Crore</span>
                    <span class="stat-label">Cash Prizes Awarded</span>
                </div>
            </div>

            <br>
            <h3 style="color: #1e3a8a; margin-bottom: 10px;">Notable Milestones:</h3>
            <ul class="styled-list">
                <li>Successfully commercialized over <strong>200+ student prototypes</strong> into viable startup ventures.</li>
                <li>Direct adoption of winning algorithms by <em>Indian Railways, ISRO, and National Disaster Management Authority (NDMA)</em>.</li>
                <li>Recognized by the Hon'ble Prime Minister of India as the bedrock of the <u>Atmanirbhar Bharat</u> innovation ecosystem.</li>
            </ul>
        </section>

        <!-- Placements & Opportunities Section -->
        <section id="placements" class="content-section">
            <h2 class="section-heading">Placements & Career Opportunities</h2>
            <hr class="divider">

            <p>
                Participation in SIH serves as an elite benchmark for engineering talent. Finalists and winners receive exclusive placement fast-tracks and internships from leading multinational technology corporations and government research organizations:
            </p>
            <br>

            <table class="placement-table">
                <thead>
                    <tr>
                        <th>Partner Enterprise / Agency</th>
                        <th>Role / Opportunity Offered</th>
                        <th>Stipend / Package Range</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Tata Consultancy Services (TCS)</strong></td>
                        <td>Innovator / Digital Specialist Engineer</td>
                        <td>₹7.5 LPA – ₹11.5 LPA</td>
                    </tr>
                    <tr>
                        <td><strong>Cisco Systems & AWS</strong></td>
                        <td>Cloud Solutions Architect & R&D Intern</td>
                        <td>₹14.0 LPA – ₹24.0 LPA</td>
                    </tr>
                    <tr>
                        <td><strong>Ministry Innovation Cell (MIC)</strong></td>
                        <td>Incubation Seed Grant & Startup Fellowship</td>
                        <td>Up to ₹10,00,000 / Startup Grant</td>
                    </tr>
                    <tr>
                        <td><strong>Leading Tech Unicorns</strong></td>
                        <td>Full Stack Developer & AI/ML Specialist</td>
                        <td>₹12.0 LPA – ₹18.0 LPA</td>
                    </tr>
                </tbody>
            </table>

            <br>
            <p>
                <mark style="background-color: #fef08a; padding: 4px 8px; border-radius: 4px;"><strong>Special Note:</strong></mark>
                Winners are directly considered for premier incubation support under <em>Atal Innovation Mission (AIM)</em> and get patent filing fee subsidies.
            </p>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="content-section">
            <h2 class="section-heading">Contact & Helpdesk</h2>
            <hr class="divider">

            <p>Have questions regarding problem statements, team registration, or nodal center logistics? Reach out to the SIH central coordinating desk:</p>
            <br>

            <div class="contact-box">
                <div class="contact-item">
                    <h4>📍 Central Office</h4>
                    <p>All India Council for Technical Education (AICTE) Campus,<br>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</p>
                </div>
                <div class="contact-item">
                    <h4>📧 Email Support</h4>
                    <p><a href="mailto:support@sih.gov.in" style="color: #0284c7;">support@sih.gov.in</a><br><a href="mailto:hackathon@aicte-india.org" style="color: #0284c7;">hackathon@aicte-india.org</a></p>
                </div>
                <div class="contact-item">
                    <h4>📞 Helpdesk Helpline</h4>
                    <p>+91 11 2958 1333 / 1338<br>Toll-Free: 1800-102-1925 (9:30 AM to 5:30 PM)</p>
                </div>
            </div>
        </section>

        <!-- Submission Footer -->
        <footer>
            <p>Smart India Hackathon Information Portal | Designed for Practical 11.2</p>
            <p>Submitted by: <strong>Ayush Aswale</strong> | PRN: <strong>24070521009</strong></p>
        </footer>

    </div>

</body>

</html>

```

#### File: `11.2/style.css`

```css
/*
 * style.css - Styling for Smart India Hackathon Information Web Page
 * Clean, structured design with navigation bar, text formatting, and responsive layout
 */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

body {
    background-color: #f1f5f9;
    color: #334155;
    line-height: 1.6;
}

/* Navigation Bar */
.navbar {
    background: linear-gradient(90deg, #1e3a8a 0%, #0369a1 100%);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
}

.nav-logo {
    color: #ffffff;
    font-size: 19px;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 0.5px;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
}

.nav-links li a {
    color: #e2e8f0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;
}

.nav-links li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
}

/* Hero Banner */
.hero-banner {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0369a1 100%);
    color: #ffffff;
    text-align: center;
    padding: 50px 20px;
}

.banner-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-banner h1 {
    font-size: 32px;
    letter-spacing: 1px;
    color: #ffffff;
    margin-bottom: 8px;
}

.tagline {
    font-size: 15px;
    color: #93c5fd;
    font-weight: 500;
}

/* Page Container */
.page-container {
    max-width: 1000px;
    margin: 30px auto;
    padding: 0 16px;
}

/* Content Sections */
.content-section {
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
}

.section-heading {
    color: #1e3a8a;
    font-size: 22px;
    margin-bottom: 8px;
}

.divider {
    border: 0;
    height: 3px;
    background: linear-gradient(90deg, #0284c7 0%, #e2e8f0 100%);
    margin-bottom: 18px;
}

/* Styled Lists */
.styled-list {
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* Highlight Stats Grid */
.stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 12px 0;
}

.stat-card {
    background: #f8fafc;
    border-left: 4px solid #0284c7;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.stat-number {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #0369a1;
}

.stat-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 600;
}

/* Table Styling */
.placement-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.placement-table th,
.placement-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    font-size: 14px;
}

.placement-table th {
    background-color: #f1f5f9;
    color: #1e293b;
    font-weight: bold;
}

.placement-table tr:hover {
    background-color: #f8fafc;
}

/* Contact Grid */
.contact-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
}

.contact-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
}

.contact-item h4 {
    color: #1e3a8a;
    margin-bottom: 6px;
    font-size: 15px;
}

.contact-item p {
    font-size: 13px;
    color: #475569;
}

/* Footer */
footer {
    text-align: center;
    padding: 24px 10px;
    color: #64748b;
    font-size: 13px;
    border-top: 1px solid #cbd5e1;
    margin-top: 30px;
}

footer strong {
    color: #1e293b;
}

/* Responsive adjustments */
@media (max-width: 650px) {
    .nav-container {
        flex-direction: column;
        gap: 12px;
    }
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }
    .hero-banner h1 {
        font-size: 24px;
    }
}

```

---

## Conclusion

1. **Class Scheduler**: Implemented continuous real-time countdown logic using `setInterval()` with 1-second resolution, automated reminder scheduling with `setTimeout()`, and persistent timetable tracking.
2. **Student Task Manager**: Implemented interactive task management utilizing **jQuery 3.7.1**, dynamic DOM generation, event delegation, client-side filtering, `localStorage` persistence, and **AJAX (`$.ajax`)** loading from external JSON.
3. **Smart India Hackathon Web Page**: Built a clean static information architecture using semantic HTML5, sticky navigation anchors, tables, and responsive CSS styling.
