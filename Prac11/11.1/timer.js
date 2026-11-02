/**
 * timer.js - ES6 Module for Timer, Interval Countdown & Notification logic
 * Demonstrates:
 * 1. setInterval() for live real-time clock and countdown tick
 * 2. setTimeout() for scheduling notifications/alerts before class starts
 */

// Format millisecond duration into { hours, minutes, seconds, text }
export function formatTimeLeft(ms) {
    if (ms <= 0) {
        return { hours: '00', minutes: '00', seconds: '00', text: '00:00:00' };
    }

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

/**
 * Starts a real-time interval timer executing on every 1000ms
 * Uses: setInterval()
 */
export function startClock(callback) {
    callback(); // immediate first run
    return setInterval(callback, 1000);
}

/**
 * Schedules a one-time reminder using setTimeout()
 * @param {number} delayMs Delay in milliseconds
 * @param {Function} callback Handler executed after delay
 * @returns {number} timeout id
 */
export function setClassReminder(delayMs, callback) {
    if (delayMs <= 0) {
        callback();
        return null;
    }
    return setTimeout(callback, delayMs);
}

/**
 * Clears an active timeout
 */
export function clearReminder(timeoutId) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
}
