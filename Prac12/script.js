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
