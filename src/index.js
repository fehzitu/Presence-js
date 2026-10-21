const { loadConfig } = require('./core/config');
const { saveConfig } = require('./core/storage');

try {
    const config = loadConfig();

    config.presence.details = 'Storage system working!';
    saveConfig(config);

    console.log('[PresenceJS] Configuration loaded successfully.');
    console.log('[PresenceJS] Configuration saved successfully.');
    console.log(config.presence.details);
} catch (error) {
    console.error("[PresenceJS] ${error.message}");

    process.exitCode = 1;
};