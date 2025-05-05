const { execSync } = require('child_process');
const { clearAndCreateDir, advancedCopyFiles } = require('./files.js');
const paths = require('./paths.js');

function createVueProject() {
    const targetDir = paths.projectPath;

    console.log('Cleaning and rebuilding project directory...');
    clearAndCreateDir(targetDir);

    console.log('Copying default files...');
    advancedCopyFiles(paths.defaultVuePath, targetDir);

    console.log('Running pnpm install...');
    execSync(`cd ${targetDir} && pnpm install --prefer-offline`, { stdio: 'inherit' });

    console.log('Vue project created successfully, custom files copied and dependencies installed!');
}

module.exports = { 
    createVueProject 
};