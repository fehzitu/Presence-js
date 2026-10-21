const { Client } = require('@xhayper/discord-rpc');
const { createActivity } = require('./activity');

function connectPresence() {
    const client = new Client({
        clientId: process.env.DISCORD_CLIENT_ID
    });

    client.on('ready', async () => {
        console.log('[Presence-jS] Connected to Discord');

        try {
            const activity = createActivity();

            await client.user.setActivity({
                ...activity,
                startTimestamp: new Date(activity.startTimestamp)
            });

            console.log('[Presence-jS] Rich Presence published');
        } catch (error) {
            console.error('[Presence-jS] Failed to publish activity:', error.message);
        };
    });

    client.on('error', (error) => {
        console.error('[Presence-jS] RPC error:', error.message);
    });

    client.login();
    return client;
};

module.exports = {
    connectPresence
};