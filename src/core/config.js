const fs = require('node:fs');
const path = require('node:path');

const CONFIG_PATH = path.resolve(__dirname, '../../data/presence.json');

let config;

function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error("Configuration file not found: ${CONFIG_PATH}");
    };

    try {
        const fileContent = fs.readFileSync(CONFIG_PATH, 'utf8');
        config = JSON.parse(fileContent);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('The configuration file contains invalid JSON.');
        };
        throw error;
    };

    validateConfig(config);
    return config;
};

function validateConfig(config) {
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('Configuration must be a JSON object.');
    };

    if (typeof config.applicationId !== 'string') {
        throw new Error('applicationId must be a string.');
    };

    if (!config.presence || typeof config.presence !== 'object' || Array.isArray(config.presence)) {
        throw new Error('presence must be an object.');
    };

    if (!config.timer || typeof config.timer !== 'object' || Array.isArray(config.timer)) {
        throw new Error('timer must be an object.');
    };

    if (!Number.isFinite(config.timer.totalSeconds) || config.timer.totalSeconds < 0) {
        throw new Error('timer.totalSeconds must be a non-negative number.');
    };

    if (!config.settings || typeof config.settings !== 'object' || Array.isArray(config.settings)) {
        throw new Error('settings must be an object.');
    };

    if (!Number.isInteger(config.settings.reconnectInterval) || config.settings.reconnectInterval < 0) {
        throw new Error('settings.reconnectInterval must be a non-negative integer.');
    };

    if (!Number.isInteger(config.settings.saveInterval) || config.settings.saveInterval < 1) {
        throw new Error('settings.saveInterval must be a positive integer.');
    };
};

module.exports = {
    loadConfig,
    validateConfig
};