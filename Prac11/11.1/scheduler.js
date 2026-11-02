/**
 * scheduler.js - ES6 Module for Class Schedule Management
 * Exports ClassSchedule model and storage helper
 */

export class ClassSchedule {
    constructor({ id, subject, teacher, room, day, startTime, endTime }) {
        this.id = id || 'cls_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        this.subject = subject.trim();
        this.teacher = teacher.trim();
        this.room = room.trim() || 'N/A';
        this.day = day; // Monday - Sunday
        this.startTime = startTime; // HH:MM (24-hour)
        this.endTime = endTime; // HH:MM (24-hour)
    }

    /**
     * Calculates time differences and current status relative to now
     * Returns: { status: 'LIVE'|'UPCOMING'|'COMPLETED', diffMs, targetDate, progress }
     */
    getStatus(now = new Date()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayIndex = now.getDay();
        const targetDayIndex = days.indexOf(this.day);

        const [startH, startM] = this.startTime.split(':').map(Number);
        const [endH, endM] = this.endTime.split(':').map(Number);

        // Calculate startDate and endDate for this week
        let dayDiff = targetDayIndex - currentDayIndex;

        const startToday = new Date(now);
        startToday.setHours(startH, startM, 0, 0);

        const endToday = new Date(now);
        endToday.setHours(endH, endM, 0, 0);

        // Check if class is on today
        if (dayDiff === 0) {
            if (now >= startToday && now < endToday) {
                const totalDuration = endToday - startToday;
                const elapsed = now - startToday;
                return {
                    status: 'LIVE',
                    label: 'In Session',
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

        // If today's class ended or day is in past, schedule for next occurrence
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

// Storage helpers
const STORAGE_KEY = 'prac11_classes';

export function loadClasses() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const list = JSON.parse(data);
            return list.map(item => new ClassSchedule(item));
        }
    } catch (e) {
        console.error('Error loading classes:', e);
    }

    // Default sample classes if none saved
    const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
    
    // Create convenient sample times based on current hour
    const now = new Date();
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

    saveClasses(defaultSamples);
    return defaultSamples;
}

export function saveClasses(classes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
    } catch (e) {
        console.error('Error saving classes:', e);
    }
}
