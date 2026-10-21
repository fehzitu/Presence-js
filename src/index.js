const { loadData, saveData } = require('./core/storage');
const { createTimer } = require('./core/timer');

try {
    const data = loadData();
    const timer = createTimer(data.timer);

    console.log('[Presence-js] Timer loaded');
    console.log('[Presence-js] Previous total:', timer.getElapsedTime().toFixed(2), 'seconds');

    timer.startTimer();

    console.log('[Presence-js] Timer started');

    setTimeout(() => {
        try {
            timer.pauseTimer();
            data.timer = timer.getState();

            saveData(data);

            console.log('[Presence-js] Timer paused.');
            console.log('[Presence-js] Data saved successfully.');
            console.log('[Presence-js] Saved total:', data.timer.totalSeconds.toFixed(2), 'seconds');
        } catch (error) {
            console.error(`[Presence-js] ${error.message}`);
            process.exitCode = 1;
        };
    }, 3000);
} catch (error) {
    console.error(`[Presence-js] ${error.message}`);
    process.exitCode = 1;
};