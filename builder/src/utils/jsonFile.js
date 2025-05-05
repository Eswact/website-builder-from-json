const fs = require('fs');
const paths = require('./paths.js');
const siteData = require('../siteData/data.js');

function createJsonFile() {
    fs.writeFileSync(paths.jsonFilePath, JSON.stringify(siteData, null, 2));
    console.log(`JSON file created: ${paths.jsonFilePath}`);
}

module.exports = { createJsonFile };