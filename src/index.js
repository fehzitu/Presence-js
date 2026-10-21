const { loadData, saveData } = require('./core/storage');
const { createTimer } = require('./core/timer');
const { connectPresence } = require('./presence/rpc');

async function main() {
    let client;

    try {
        const data = loadData();
        const timer = createTimer(data.timer);

        console.log('[Presence-js] Timer loaded');
        console.log('Previous total:', timer.getElapsedTime().toFixed(2), 'seconds');

        client = connectPresence();

        timer.startTimer();

        console.log('[Presence-js] Timer started');

        setTimeout(() => {
            try {
                timer.pauseTimer();

                data.timer = timer.getState();
                saveData(data);

                console.log('[Presence-js] Timer paused');
                console.log('[Presence-js] Data saved successfully');
                console.log('[Presence-js] Saved total:', data.timer.totalSeconds.toFixed(2), 'seconds');
            } catch (error) {
                console.error(`[PresenceJS] ${error.message}`);
                process.exitCode = 1;
            };
        }, 3000);
    } catch (error) {
        console.error(`[PresenceJS] ${error.message}`);
        process.exitCode = 1;

        if (client) {
            client.destroy();
        };
    };
};

main();