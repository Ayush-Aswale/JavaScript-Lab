# Experiment No. 12

## Experiment Title
**Implementation: Interactive Task and Live Updates Dashboard using HTML, CSS, JavaScript, jQuery, LocalStorage, AJAX, and Periodic Refresh**

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome / Web Browser
3. HTML5
4. CSS3
5. JavaScript (ES6)
6. jQuery Library (v3.7.1)
7. Local Storage API
8. JSON & AJAX (Remote API)

---

## Theory

The **Interactive Task and Live Updates Dashboard** brings together core web technologies to build an asynchronous, real-time client-side management application.

### 1. DOM Manipulation
Dynamic updates to the Document Object Model (DOM) allow the application to render tasks and incoming live notifications without refreshing the web page:
- jQuery selectors (`$('#taskList')`, `$('#updatesFeed')`) target display containers.
- Elements are created dynamically with backtick template literals and appended/prepended using `$list.append($card)` and `$feed.prepend($updateCard)`.
- Smooth transition animations such as `$card.slideUp(250)` and `$updateCard.slideDown(350)` provide seamless visual feedback.
- Real-time progress metrics (Total, Completed, Pending, and Percentage bar) update on every state transition.

### 2. Event Handling
User actions are captured and handled interactively:
- **Form Submission (`submit`)**: Intercepted with `$('#taskForm').on('submit')` and `e.preventDefault()` to validate input and add new tasks without page reload.
- **Event Delegation**: `$('#taskList').on('change', '.task-checkbox')` and `$('#taskList').on('click', '.btn-task-del')` bind handlers to the parent container, enabling management of dynamically generated child nodes.
- **Search & Filter Events**: `input`, `keyup`, and `click` events enable live filtering across categories and keywords.
- **Polling Controls**: Buttons to trigger manual AJAX refreshes, pause/resume polling, or change polling frequencies.

### 3. Local Storage (`localStorage`)
The Web Storage API maintains client-side persistence:
- **`localStorage.setItem(key, value)`**: Serializes task data into JSON strings (`JSON.stringify(tasks)`) on every addition, deletion, or completion toggle.
- **`localStorage.getItem(key)`**: Rehydrates tasks on page load (`JSON.parse(stored)`), preserving state across tab closures and browser refreshes.

### 4. AJAX (Asynchronous JavaScript & XML)
Data is fetched asynchronously in the background from a remote JSON REST endpoint (`https://jsonplaceholder.typicode.com/posts`) using jQuery's `$.ajax()`:
- Avoids blocking the main UI thread.
- Demonstrates handling of HTTP `GET` requests with `dataType: 'json'`.
- Features robust `success` and `error` callbacks with a local `updates.json` fallback to support offline and direct `file://` protocol execution.

### 5. Periodic Refresh (Live Polling)
- Utilizes JavaScript's `setInterval()` to schedule recurring server data requests at fixed intervals (e.g. 10s, 15s, 30s) without reloading the page.
- Employs a second-by-second countdown timer (`Next sync in: Xs`) with live indicator badges.
- Users can pause or resume polling dynamically, clearing the active interval with `clearInterval()`.

---

## Project Structure

```
Prac12/
├── 12.1/                           # Subdirectory structure matching lab manual
│   ├── index.html                  # Dashboard layout & markup
│   ├── style.css                   # Glassmorphic responsive stylesheet
│   ├── script.js                   # Application logic (DOM, Events, Storage, AJAX, Polling)
│   └── updates.json                # Local fallback dataset for live updates
├── index.html                      # Root mirrored dashboard
├── style.css                       # Root mirrored stylesheet
├── script.js                       # Root mirrored script
├── updates.json                    # Root mirrored dataset
└── README.md                       # Comprehensive experiment documentation
```

---

## Experiment Program Code

### File: `12.1/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Task & Live Updates Dashboard | Practical 12</title>
    <link rel="stylesheet" href="style.css">
    <!-- jQuery Library -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>

    <div class="container">

        <!-- Top Header & Live Status Bar -->
        <header>
            <div class="title-area">
                <h1>Interactive Task & Live Updates Dashboard</h1>
                <p>HTML &bull; CSS &bull; JavaScript &bull; jQuery &bull; localStorage &bull; AJAX API &bull; Periodic Auto-Refresh</p>
            </div>
            <div class="status-area">
                <span class="polling-badge" id="pollingBadge">
                    <span class="pulse-indicator"></span>
                    <span id="pollingStatusText">Live Sync (15s)</span>
                </span>
                <div class="timer-box" id="nextSyncTimer">Next sync: 15s</div>
            </div>
        </header>

        <!-- Dynamic Overview Metrics Banner -->
        <section class="metrics-banner">
            <div class="metric-card">
                <span class="metric-number" id="metricTotalTasks">0</span>
                <span class="metric-label">Total Tasks</span>
            </div>
            <div class="metric-card m-pending">
                <span class="metric-number" id="metricPendingTasks" style="color: var(--warning);">0</span>
                <span class="metric-label">Pending</span>
            </div>
            <div class="metric-card m-completed">
                <span class="metric-number" id="metricCompletedTasks" style="color: var(--success);">0</span>
                <span class="metric-label">Completed</span>
            </div>
            <div class="metric-card m-updates">
                <span class="metric-number" id="metricUpdatesCount" style="color: var(--purple);">0</span>
                <span class="metric-label">Updates Received</span>
            </div>
        </section>

        <!-- Task Completion Rate Progress Bar -->
        <section class="progress-card">
            <div class="progress-header">
                <span>Task Completion Rate</span>
                <span id="progressPercentageText">0%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" id="taskProgressBar"></div>
            </div>
        </section>

        <!-- Two-Column Main Dashboard Grid -->
        <main class="dashboard-grid">

            <!-- ============================================== -->
            <!-- LEFT COLUMN: Interactive Task Management Panel -->
            <!-- ============================================== -->
            <section class="dashboard-panel">
                <div class="panel-header">
                    <h2 class="panel-title">
                        <span>📝</span> Task Management
                    </h2>
                    <div class="panel-actions">
                        <button type="button" id="btnClearCompleted" class="btn btn-secondary" title="Remove completed tasks">
                            🧹 Clear Completed
                        </button>
                    </div>
                </div>

                <!-- Add Task Form (jQuery .on('submit')) -->
                <div class="form-card">
                    <form id="taskForm">
                        <div class="form-grid">
                            <div class="form-group" style="grid-column: span 2;">
                                <label for="taskTitle">Task Description</label>
                                <input type="text" id="taskTitle" name="taskTitle" placeholder="e.g. Implement WebSocket live sync in node" required>
                            </div>

                            <div class="form-group">
                                <label for="taskCategory">Category</label>
                                <select id="taskCategory" name="taskCategory" required>
                                    <option value="Development">💻 Development</option>
                                    <option value="Research">🔬 Research</option>
                                    <option value="Design">🎨 UI/UX Design</option>
                                    <option value="Review">📋 Code Review</option>
                                    <option value="Deployment">🚀 Deployment</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="taskPriority">Priority</label>
                                <select id="taskPriority" name="taskPriority" required>
                                    <option value="High">🔴 High Priority</option>
                                    <option value="Medium" selected>🟡 Medium Priority</option>
                                    <option value="Low">🟢 Low Priority</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-actions-row">
                            <button type="submit" class="btn btn-primary">➕ Add Task</button>
                            <button type="button" id="btnResetTasks" class="btn btn-secondary">🔄 Reset Default Tasks</button>
                        </div>
                    </form>
                </div>

                <!-- Toolbar: Filter Chips & Search Input -->
                <div class="toolbar">
                    <div class="filter-group" id="taskFilters">
                        <button type="button" class="filter-chip active" data-filter="all">All</button>
                        <button type="button" class="filter-chip" data-filter="pending">Pending</button>
                        <button type="button" class="filter-chip" data-filter="completed">Completed</button>
                        <button type="button" class="filter-chip" data-filter="High">High</button>
                    </div>
                    <input type="text" id="taskSearchInput" class="search-field" placeholder="🔍 Search tasks...">
                </div>

                <!-- Task List Container (Manipulated via jQuery DOM methods) -->
                <div class="task-list" id="taskList">
                    <!-- Populated dynamically by script.js from localStorage -->
                </div>
            </section>

            <!-- ================================================= -->
            <!-- RIGHT COLUMN: Live Updates Feed (AJAX & Polling)  -->
            <!-- ================================================= -->
            <section class="dashboard-panel">
                <div class="panel-header">
                    <h2 class="panel-title">
                        <span>📡</span> Live Updates & Server Feed
                    </h2>
                    <div class="panel-actions">
                        <button type="button" id="btnManualRefresh" class="btn btn-purple">
                            <span>🔄</span> Refresh Now
                        </button>
                    </div>
                </div>

                <!-- Feed Controls Bar -->
                <div class="feed-controls">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button type="button" id="btnToggleAutoRefresh" class="btn btn-secondary">
                            ⏸️ Pause Auto-Refresh
                        </button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 11px; color: var(--text-muted);">Interval:</span>
                        <select id="selectInterval" class="interval-selector">
                            <option value="10">10 seconds</option>
                            <option value="15" selected>15 seconds</option>
                            <option value="30">30 seconds</option>
                            <option value="60">60 seconds</option>
                        </select>
                    </div>
                </div>

                <!-- Dynamic Updates Container (Populated by AJAX via jQuery) -->
                <div class="updates-list" id="updatesFeed">
                    <!-- Cards created dynamically by script.js from remote JSON API -->
                </div>
            </section>

        </main>

        <!-- Footer -->
        <footer>
            <p>Practical 12: Interactive Task and Live Updates Dashboard</p>
            <p>Submitted by: <strong>Ayush Aswale</strong> | PRN: <strong>24070521009</strong></p>
        </footer>

    </div>

    <!-- Toast Notifications Center -->
    <div class="toast-box" id="toastContainer"></div>

    <!-- Application Logic -->
    <script src="script.js"></script>

</body>

</html>

```

---

### File: `12.1/style.css`

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
        radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
    background-attachment: fixed;
    color: var(--text-body);
    padding: 30px 16px;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* ====================================================
   Header & Live Status Bar
   ==================================================== */
header {
    background: var(--bg-card);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
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

.status-area {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
}

.polling-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16, 185, 129, 0.15);
    color: var(--success);
    border: 1px solid rgba(16, 185, 129, 0.35);
    padding: 7px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.polling-badge.paused {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning);
    border-color: rgba(245, 158, 11, 0.35);
}

.pulse-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    animation: pulseAnim 1.5s infinite;
}

@keyframes pulseAnim {
    0% { transform: scale(0.95); opacity: 0.8; }
    50% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.8; }
}

.timer-box {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 6px 14px;
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--primary);
    font-weight: 600;
}

/* ====================================================
   Overview Metrics Banner & Progress Bar
   ==================================================== */
.metrics-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.metric-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px 22px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}

.metric-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--primary);
}

.metric-card.m-completed::after {
    background: var(--success);
}

.metric-card.m-pending::after {
    background: var(--warning);
}

.metric-card.m-updates::after {
    background: var(--purple);
}

.metric-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 28px;
    font-weight: 800;
    color: var(--text-title);
    display: block;
}

.metric-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
}

/* Progress bar */
.progress-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 24px;
    margin-bottom: 24px;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 10px;
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

/* ====================================================
   Two-Column Dashboard Grid Layout
   ==================================================== */
.dashboard-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 24px;
}

@media (max-width: 950px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}

/* Panels */
.dashboard-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px 28px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
}

.panel-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-title);
    display: flex;
    align-items: center;
    gap: 8px;
}

.panel-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* ====================================================
   Forms & Controls
   ==================================================== */
.form-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 20px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
}

.form-group input,
.form-group select {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-title);
    padding: 9px 12px;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    transition: 0.2s border-color, 0.2s box-shadow;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-actions-row {
    margin-top: 14px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn {
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: 0.2s transform, 0.2s opacity, 0.2s background;
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

.btn-purple {
    background: linear-gradient(135deg, #a855f7, #6366f1);
    color: #ffffff;
}

.btn-purple:hover {
    opacity: 0.92;
}

/* Toolbar (Filters & Search) */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
}

.filter-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.filter-chip {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
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

.search-field {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-title);
    padding: 7px 12px;
    border-radius: 8px;
    font-size: 12px;
    outline: none;
    min-width: 170px;
}

.search-field:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-glow);
}

/* ====================================================
   Task List Items (DOM Manipulation)
   ==================================================== */
.task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
}

.task-list::-webkit-scrollbar {
    width: 6px;
}

.task-list::-webkit-scrollbar-track {
    background: transparent;
}

.task-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.task-item {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--primary);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
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

.task-item.completed {
    opacity: 0.65;
    background: rgba(15, 23, 42, 0.4);
    border-left-color: #64748b;
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: var(--text-muted);
}

.task-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
}

.task-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--success);
}

.task-info h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 4px;
}

.task-tags {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    flex-wrap: wrap;
    color: var(--text-muted);
}

.badge {
    padding: 2px 7px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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

.badge-cat {
    background: rgba(168, 85, 247, 0.15);
    color: #c084fc;
    border: 1px solid rgba(168, 85, 247, 0.3);
}

.btn-task-del {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 16px;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    transition: 0.2s color, 0.2s background;
}

.btn-task-del:hover {
    color: var(--danger);
    background: rgba(239, 68, 68, 0.1);
}

/* ====================================================
   Live Updates Feed (AJAX & Periodic Polling)
   ==================================================== */
.feed-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 10px;
}

.interval-selector {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-body);
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 8px;
    outline: none;
}

.updates-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
}

.updates-list::-webkit-scrollbar {
    width: 6px;
}

.updates-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.update-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
    position: relative;
    overflow: hidden;
    transition: 0.2s all ease;
    animation: slideInUpdate 0.35s ease;
}

@keyframes slideInUpdate {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.update-card:hover {
    border-color: var(--border-hover);
}

.update-card.new-pulse {
    border-color: rgba(56, 189, 248, 0.6);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
}

.update-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.update-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
}

.update-time {
    font-family: 'JetBrains Mono', monospace;
    color: var(--text-muted);
}

.badge-new {
    background: rgba(56, 189, 248, 0.2);
    color: var(--primary);
    border: 1px solid rgba(56, 189, 248, 0.4);
    font-size: 9px;
    padding: 1px 5px;
    border-radius: 4px;
    font-weight: 800;
}

.update-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-title);
    margin-bottom: 6px;
    line-height: 1.4;
}

.update-body {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
}

/* Empty placeholder */
.empty-state {
    text-align: center;
    padding: 30px 10px;
    color: var(--text-muted);
    font-size: 13px;
}

/* Toast Notifications */
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
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

footer {
    text-align: center;
    margin-top: 35px;
    padding: 20px;
    font-size: 13px;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
}

footer strong {
    color: var(--text-title);
}

```

---

### File: `12.1/script.js`

```javascript
/**
 * script.js - Interactive Task and Live Updates Dashboard
 * Features implemented:
 * 1. DOM manipulation - dynamically creates and displays task and live update cards.
 * 2. Event handling - handles form submission, completion toggles, and deletion.
 * 3. localStorage - persists the task list across page refreshes.
 * 4. AJAX - retrieves sample update posts from a remote JSON API (with local fallback).
 * 5. Periodic refresh - requests updated server data at fixed intervals without reloading.
 */

$(document).ready(function() {

    // =========================================================================
    // SECTION 1: STATE & LOCAL STORAGE INITIALIZATION
    // =========================================================================
    const TASK_STORAGE_KEY = 'prac12_tasks_v1';
    let tasks = [];
    let currentFilter = 'all';
    let currentSearchQuery = '';

    // Default sample tasks
    const defaultTasks = [
        {
            id: 'task_101',
            title: 'Implement REST API endpoints for user authentication',
            category: 'Development',
            priority: 'High',
            completed: false,
            createdAt: new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 'task_102',
            title: 'Benchmark PostgreSQL database indexing performance',
            category: 'Research',
            priority: 'Medium',
            completed: true,
            createdAt: new Date(Date.now() - 3600000 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 'task_103',
            title: 'Design dark glassmorphism dashboard UI components',
            category: 'Design',
            priority: 'High',
            completed: true,
            createdAt: new Date(Date.now() - 3600000 * 6).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 'task_104',
            title: 'Configure GitHub Actions CI/CD test automation workflow',
            category: 'Deployment',
            priority: 'Low',
            completed: false,
            createdAt: new Date(Date.now() - 3600000 * 8).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ];

    // Load tasks from browser localStorage
    function loadTasks() {
        try {
            const stored = localStorage.getItem(TASK_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (err) {
            console.error('Error reading from localStorage:', err);
        }

        saveTasks(defaultTasks);
        return [...defaultTasks];
    }

    // Save tasks to browser localStorage
    function saveTasks(taskList) {
        try {
            localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskList));
        } catch (err) {
            console.error('Error writing to localStorage:', err);
        }
    }


    // =========================================================================
    // SECTION 2: METRICS & DOM PROGRESS CALCULATION
    // =========================================================================
    let totalUpdatesReceived = 0;

    function updateMetrics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        $('#metricTotalTasks').text(total);
        $('#metricPendingTasks').text(pending);
        $('#metricCompletedTasks').text(completed);
        $('#metricUpdatesCount').text(totalUpdatesReceived);

        $('#progressPercentageText').text(`${percent}%`);
        $('#taskProgressBar').css('width', `${percent}%`);
    }


    // =========================================================================
    // SECTION 3: TASK DOM MANIPULATION & RENDERING
    // =========================================================================
    function renderTasks() {
        updateMetrics();
        const $list = $('#taskList');
        $list.empty();

        // Apply active filter and live search query
        const filtered = tasks.filter(task => {
            let matchesFilter = true;
            if (currentFilter === 'pending') matchesFilter = !task.completed;
            else if (currentFilter === 'completed') matchesFilter = task.completed;
            else if (currentFilter === 'High') matchesFilter = task.priority === 'High';

            let matchesSearch = true;
            if (currentSearchQuery.trim() !== '') {
                const q = currentSearchQuery.toLowerCase();
                matchesSearch = task.title.toLowerCase().includes(q) ||
                                task.category.toLowerCase().includes(q);
            }

            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            $list.html(`
                <div class="empty-state">
                    <p>No tasks match the selected criteria.</p>
                    <span style="font-size: 11px;">Create a new task or adjust the filter above.</span>
                </div>
            `);
            return;
        }

        // Dynamically create and append task cards using jQuery DOM manipulation
        filtered.forEach(task => {
            const isCompletedClass = task.completed ? 'completed' : '';
            const isChecked = task.completed ? 'checked' : '';
            const priorityBadgeClass = `badge-${task.priority.toLowerCase()}`;

            const $card = $(`
                <div class="task-item priority-${task.priority} ${isCompletedClass}" data-id="${task.id}">
                    <div class="task-left">
                        <input type="checkbox" class="task-checkbox" ${isChecked} title="Toggle completion">
                        <div class="task-info">
                            <h4 class="task-text">${escapeHtml(task.title)}</h4>
                            <div class="task-tags">
                                <span class="badge badge-cat">${escapeHtml(task.category)}</span>
                                <span class="badge ${priorityBadgeClass}">${task.priority} Priority</span>
                                <span>🕒 ${task.createdAt}</span>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-task-del" title="Delete task">🗑️</button>
                </div>
            `);

            $list.append($card);
        });
    }


    // =========================================================================
    // SECTION 4: TASK EVENT HANDLING
    // =========================================================================

    // 1. Task Form Submission
    $('#taskForm').on('submit', function(e) {
        e.preventDefault();

        const title = $('#taskTitle').val().trim();
        const category = $('#taskCategory').val();
        const priority = $('#taskPriority').val();

        if (!title) {
            alert('Please provide a task description.');
            return;
        }

        const newTask = {
            id: 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            title,
            category,
            priority,
            completed: false,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        tasks.unshift(newTask);
        saveTasks(tasks);
        renderTasks();

        this.reset();
        showToast(`Task added: "${newTask.title}"`);
    });

    // 2. Toggle Task Completion (Event Delegation)
    $('#taskList').on('change', '.task-checkbox', function() {
        const $card = $(this).closest('.task-item');
        const id = $card.attr('data-id');
        const isChecked = $(this).is(':checked');

        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = isChecked;
            saveTasks(tasks);

            if (isChecked) {
                $card.addClass('completed');
                showToast(`Completed: "${task.title}"`);
            } else {
                $card.removeClass('completed');
            }

            updateMetrics();
        }
    });

    // 3. Delete Task with jQuery slideUp Animation
    $('#taskList').on('click', '.btn-task-del', function() {
        const $card = $(this).closest('.task-item');
        const id = $card.attr('data-id');
        const task = tasks.find(t => t.id === id);

        $card.slideUp(250, function() {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks(tasks);
            renderTasks();
            if (task) showToast(`Deleted: "${task.title}"`);
        });
    });

    // 4. Filter Chips Click Handling
    $('#taskFilters').on('click', '.filter-chip', function() {
        $('#taskFilters .filter-chip').removeClass('active');
        $(this).addClass('active');

        currentFilter = $(this).attr('data-filter');
        renderTasks();
    });

    // 5. Live Search Input
    $('#taskSearchInput').on('input keyup', function() {
        currentSearchQuery = $(this).val();
        renderTasks();
    });

    // 6. Clear Completed Tasks
    $('#btnClearCompleted').on('click', function() {
        const initialCount = tasks.length;
        tasks = tasks.filter(t => !t.completed);
        const removed = initialCount - tasks.length;

        if (removed === 0) {
            showToast('No completed tasks to clear.');
            return;
        }

        saveTasks(tasks);
        renderTasks();
        showToast(`Removed ${removed} completed task(s).`);
    });

    // 7. Reset Default Tasks
    $('#btnResetTasks').on('click', function() {
        if (confirm('Reset task list to default items?')) {
            tasks = [...defaultTasks];
            saveTasks(tasks);
            renderTasks();
            showToast('Reset default task list.');
        }
    });


    // =========================================================================
    // SECTION 5: AJAX LIVE UPDATES & PERIODIC POLLING REFRESH
    // =========================================================================

    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    let pollIntervalSeconds = 15;
    let secondsRemaining = pollIntervalSeconds;
    let isAutoRefreshActive = true;
    let pollIntervalTimer = null;
    let countdownTicker = null;
    let postFetchPage = 1;

    const categoriesPool = ['System Sync', 'Security Alert', 'API Update', 'Infrastructure', 'Database', 'Cloud Worker'];

    // Retrieve sample updates using jQuery $.ajax()
    function fetchLiveUpdates(isManual = false) {
        const $feed = $('#updatesFeed');
        const $badge = $('#pollingBadge');

        // Visual loading state
        $('#btnManualRefresh').prop('disabled', true).html('<span>⏳</span> Syncing...');

        // Randomize starting page index to simulate incoming live feed items
        const randomStart = Math.floor(Math.random() * 80) + 1;

        $.ajax({
            url: `${API_URL}?_start=${randomStart}&_limit=3`,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function(posts) {
                $('#btnManualRefresh').prop('disabled', false).html('<span>🔄</span> Refresh Now');

                if (Array.isArray(posts) && posts.length > 0) {
                    displayUpdates(posts, isManual);
                } else {
                    loadFallbackUpdates(isManual);
                }
            },
            error: function(xhr, status, error) {
                console.warn('Remote AJAX failed (using fallback updates.json):', error);
                $('#btnManualRefresh').prop('disabled', false).html('<span>🔄</span> Refresh Now');
                loadFallbackUpdates(isManual);
            }
        });
    }

    // Display retrieved update cards via jQuery DOM manipulation
    function displayUpdates(posts, isManual) {
        const $feed = $('#updatesFeed');
        
        // Remove empty state placeholder if present
        $feed.find('.empty-state').remove();

        posts.forEach(post => {
            totalUpdatesReceived++;
            const randomCategory = categoriesPool[Math.floor(Math.random() * categoriesPool.length)];
            const timeString = new Date().toLocaleTimeString();

            // Truncate title and body for clean layout
            const titleFormatted = capitalize(post.title).slice(0, 55) + (post.title.length > 55 ? '...' : '');
            const bodyFormatted = capitalize(post.body).slice(0, 110) + '...';

            const $updateCard = $(`
                <article class="update-card new-pulse">
                    <div class="update-header">
                        <div class="update-meta">
                            <span class="badge badge-cat">${escapeHtml(randomCategory)}</span>
                            <span class="update-time">🕒 ${timeString}</span>
                        </div>
                        <span class="badge-new">NEW UPDATE</span>
                    </div>
                    <h4 class="update-title">${escapeHtml(titleFormatted)}</h4>
                    <p class="update-body">${escapeHtml(bodyFormatted)}</p>
                </article>
            `);

            // Prepend new card with jQuery slideDown animation
            $updateCard.hide();
            $feed.prepend($updateCard);
            $updateCard.slideDown(350);

            // Remove pulse highlight after 4 seconds
            setTimeout(() => {
                $updateCard.removeClass('new-pulse');
            }, 4000);
        });

        // Cap updates feed at latest 15 cards to avoid DOM bloat
        $feed.children('.update-card').slice(15).remove();

        updateMetrics();

        if (isManual) {
            showToast(`✅ Manual Sync: Fetched ${posts.length} new update(s) via AJAX.`);
        } else {
            showToast(`📡 Live Auto-Refresh: ${posts.length} new updates retrieved.`);
        }
    }

    // Fallback updates from local updates.json or generated objects
    function loadFallbackUpdates(isManual) {
        $.ajax({
            url: 'updates.json',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(localData) {
                displayUpdates(localData.slice(0, 2), isManual);
            },
            error: function() {
                // In-memory simulated fallback if updates.json is blocked on file://
                const simPosts = [
                    {
                        title: 'Microservice Cluster Auto-Scaling Event',
                        body: 'Traffic spike detected in EU-West zone. Three additional container replicas automatically spawned to balance request loads.'
                    },
                    {
                        title: 'SSL/TLS Certificate Renewal Confirmed',
                        body: 'Wildcard certificates updated across all edge CDN routers. Zero downtime recorded during TLS handshake renegotiation.'
                    }
                ];
                displayUpdates(simPosts, isManual);
            }
        });
    }


    // =========================================================================
    // SECTION 6: PERIODIC REFRESH TIMER MANAGEMENT
    // =========================================================================

    function startPeriodicRefresh() {
        stopPeriodicRefresh();

        // 1-second countdown ticker
        countdownTicker = setInterval(() => {
            if (!isAutoRefreshActive) return;

            secondsRemaining--;
            if (secondsRemaining <= 0) {
                secondsRemaining = pollIntervalSeconds;
                fetchLiveUpdates(false);
            }

            $('#nextSyncTimer').text(`Next sync: ${secondsRemaining}s`);
        }, 1000);
    }

    function stopPeriodicRefresh() {
        if (countdownTicker) {
            clearInterval(countdownTicker);
            countdownTicker = null;
        }
    }

    // Manual Refresh Button
    $('#btnManualRefresh').on('click', function() {
        secondsRemaining = pollIntervalSeconds;
        $('#nextSyncTimer').text(`Next sync: ${secondsRemaining}s`);
        fetchLiveUpdates(true);
    });

    // Toggle Auto-Refresh (Pause / Resume)
    $('#btnToggleAutoRefresh').on('click', function() {
        isAutoRefreshActive = !isAutoRefreshActive;

        if (isAutoRefreshActive) {
            $(this).html('⏸️ Pause Auto-Refresh').removeClass('btn-primary').addClass('btn-secondary');
            $('#pollingBadge').removeClass('paused');
            $('#pollingStatusText').text(`Live Sync (${pollIntervalSeconds}s)`);
            secondsRemaining = pollIntervalSeconds;
            showToast('Auto-refresh resumed.');
        } else {
            $(this).html('▶️ Resume Auto-Refresh').removeClass('btn-secondary').addClass('btn-primary');
            $('#pollingBadge').addClass('paused');
            $('#pollingStatusText').text('Sync Paused');
            $('#nextSyncTimer').text('Paused');
            showToast('Auto-refresh paused.');
        }
    });

    // Polling Interval Dropdown Change
    $('#selectInterval').on('change', function() {
        pollIntervalSeconds = parseInt($(this).val(), 10) || 15;
        secondsRemaining = pollIntervalSeconds;

        if (isAutoRefreshActive) {
            $('#pollingStatusText').text(`Live Sync (${pollIntervalSeconds}s)`);
            $('#nextSyncTimer').text(`Next sync: ${secondsRemaining}s`);
        }

        showToast(`Auto-refresh interval set to ${pollIntervalSeconds} seconds.`);
    });


    // =========================================================================
    // SECTION 7: HELPERS & INITIALIZATION
    // =========================================================================

    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // App Startup
    tasks = loadTasks();
    renderTasks();

    // Initial AJAX fetch on page load
    fetchLiveUpdates(false);

    // Start recurring polling timer loop
    startPeriodicRefresh();

});

```

---

### File: `12.1/updates.json`

```json
[
    {
        "id": 101,
        "title": "Database Optimization & Indexing Completed",
        "body": "Periodic vacuuming and automated indexing have completed successfully across all distributed cluster nodes. Query response latency reduced by 28%.",
        "category": "Database",
        "author": "DevOps Automated Bot",
        "timestamp": "2026-11-02T06:30:00.000Z"
    },
    {
        "id": 102,
        "title": "Security Patch v2.4.1 Deployed to Production",
        "body": "Security hotfix addressing cross-origin resource sharing headers and session invalidation tokens has been applied. All services operating normally.",
        "category": "Security",
        "author": "SecOps Lead",
        "timestamp": "2026-11-02T06:40:00.000Z"
    },
    {
        "id": 103,
        "title": "Continuous Integration Pipeline Build Succeeded",
        "body": "Pipeline #4812 passed all unit and integration test suites. Docker image generated and tagged for release candidate staging.",
        "category": "CI/CD",
        "author": "Build Engineer",
        "timestamp": "2026-11-02T06:45:00.000Z"
    },
    {
        "id": 104,
        "title": "API Gateway Rate Limiting Threshold Adjusted",
        "body": "Upstream rate limit raised to 2,500 requests per minute per IP to accommodate peak traffic during semester exams and assignment submissions.",
        "category": "Infrastructure",
        "author": "Site Reliability Eng",
        "timestamp": "2026-11-02T06:48:00.000Z"
    }
]

```

---

## Conclusion

The **Interactive Task and Live Updates Dashboard** successfully demonstrates:
1. **DOM Manipulation**: Dynamic rendering and animated transitions of task and update cards using jQuery.
2. **Event Handling**: Robust handling of form submission, checkbox toggles, deletion, filter selection, and manual sync triggers.
3. **Local Storage**: Reliable client-side persistence of task records across page refreshes.
4. **AJAX**: Asynchronous data retrieval from a remote JSON REST API with graceful local fallback.
5. **Periodic Refresh**: Automated background polling at configurable intervals using `setInterval()` with countdown timer synchronization.
