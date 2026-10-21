const { Client } = require('@xhayper/discord-rpc');
const { createActivity } = require('./activity');

function connectPresence(data, timer) {
    const clientId = process.env.DISCORD_CLIENT_ID || data.applicationId;

    if (!clientId || clientId === 'YOUR_APPLICATION_ID') {
        throw new Error('[Presence-js] Configure a valid Discord Application ID in presence.json or DISCORD_CLIENT_ID');
    };

    const client = new Client({
        clientId
    });

    client.on('ready', async () => {
        console.log('[Presence-js] Connected to Discord');

        try {
            const elapsedSeconds = timer.getElapsedTime();

            const activity = createActivity({
                ...data.presence,
                startTimestamp: Date.now() - elapsedSeconds * 1000
            });

            await client.user.setActivity({
                ...activity,
                startTimestamp: new Date(activity.startTimestamp)
            });

            console.log('[Presence-js] Rich Presence published');
        } catch (error) {
            console.error('[PresenceJS] Failed to publish activity:', error.message);
        };
    });

    client.on('error', (error) => {
        console.error('[Presence-js] RPC error:', error.message);
    });

    client.login();

    return client;
};

module.exports = {
    connectPresence
};