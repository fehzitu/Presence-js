const fs = require('node:fs');
const path = require('node:path');

const DATA_PATH = path.resolve(__dirname, '../../data/presence.json');
const TEMP_PATH = `${DATA_PATH}.tmp`;

function loadData() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(content);
};

function saveData(data) {
    const directory = path.dirname(DATA_PATH);
    const content = JSON.stringify(data, null, 2);

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(TEMP_PATH, content, 'utf8');
    fs.renameSync(TEMP_PATH, DATA_PATH);
};

module.exports = {
    loadData,
    saveData
};