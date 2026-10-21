
const { loadData, saveData } = require('./core/storage');
const { createTimer } = require('./core/timer');
const { connectPresence } = require('./presence/rpc');

let data;
let timer;
let client;
let shuttingDown = false;

async function shutdown(signal) {
    if (shuttingDown) {
        return;
    };

    shuttingDown = true;

    console.log(`[Presence-js] Received ${signal}`);
    console.log('[Presence-js] Shutting down');

    try {
        if (timer && data) {
            timer.pauseTimer();

            data.timer = timer.getState();
            saveData(data);

            console.log('[Presence-js] Timer paused');
            console.log('[Presence-js] Data saved successfully');
            console.log('[Presence-js] Saved total:', data.timer.totalSeconds.toFixed(2), 'seconds');
        };
    } catch (error) {
        console.error('[Presence-js] Failed to save data:', error.message);
        process.exitCode = 1;
    };

    try {
        if (client?.user?.clearActivity) {
            await client.user.clearActivity();
            console.log('[Presence-js] Activity cleared');
        };
    } catch (error) {
        console.error('[Presence-js] Failed to clear activity:', error.message);
    };

    try {
        if (client) {
            await client.destroy();
            console.log('[Presence-js] RPC disconnected');
        };
    } catch (error) {
        console.error('[Presence-js] Failed to disconnect RPC:', error.message);

        process.exitCode = 1;
    };

    console.log('[Presence-js] Shutdown complete');
};

async function main() {
    try {
        data = loadData();
        timer = createTimer(data.timer);

        console.log('[Presence-js] Timer loaded.');
        console.log('[Presence-js] Previous total:', timer.getElapsedTime().toFixed(2), 'seconds');

        client = connectPresence(data, timer);

        timer.startTimer();

        console.log('[Presence-js] Timer started');
        console.log('[Presence-js] Running. Press Ctrl+C to stop');

        process.once('SIGINT', () => {
            shutdown('SIGINT');
        });

        process.once('SIGTERM', () => {
            shutdown('SIGTERM');
        });
    } catch (error) {
        console.error(`[Presence-js] ${error.message}`);
        process.exitCode = 1;

        if (client) {
            try {
                await client.destroy();
            } catch (destroyError) {
                console.error('[Presence-js] Failed to destroy RPC client:', destroyError.message);
            };
        };
    };
};

main();