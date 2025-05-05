const fs = require('fs');
const path = require('path');
const siteData = require('../siteData/data.js');
const paths = require('./paths.js');
const { clearAndCreateDir } = require('./files.js');

function createCustomScripts() {
    clearAndCreateDir(paths.scriptsDir);
    siteData.scripts.forEach(script => {
        const scriptFilePath = path.join(paths.scriptsDir, `${script.name}.js`);
        fs.writeFileSync(scriptFilePath, script.script, 'utf-8');
        console.log(`Script file created: ${scriptFilePath}`);
    });
}

module.exports = {
    createCustomScripts
};