const fs = require('node:fs');
const path = require('node:path');

const DATA_PATH = path.resolve(__dirname, '../../data/presence.json');

function saveConfig(config) {
    const directory = path.dirname(DATA_PATH);
    const temporaryPath = "${DATA_PATH}.tmp";
    const content = JSON.stringify(config, null, 2);

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(temporaryPath, content, 'utf8');
    fs.renameSync(temporaryPath, DATA_PATH);
};

module.exports = {
    saveConfig
};