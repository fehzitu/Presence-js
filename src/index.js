const { loadData, saveData } = require('./core/storage');
const { createTimer } = require('./core/timer');

try {
    const data = loadData();
    const timer = createTimer(data.timer);

    console.log('[PresenceJS] Timer loaded');
    console.log('Previous total:', timer.getElapsedTime().toFixed(2), 'seconds');

    timer.startTimer();

    console.log('[PresenceJS] Timer started');

    setTimeout(() => {
        timer.pauseTimer();
        data.timer = timer.getState();

        saveData(data);

        console.log('[PresenceJS] Timer paused');
        console.log('[PresenceJS] Data saved successfully');
        console.log('[PresenceJS] Saved total:', data.timer.totalSeconds.toFixed(2), 'seconds');
    }, 3000);
} catch (error) {
    console.error(`[PresenceJS] ${error.message}`);
    process.exitCode = 1;
};