const fs = require('fs');
const paths = require('./paths.js');
const { clearAndCreateDir, copyFiles } = require('./files.js');

function copyImages() {
    if (fs.existsSync(paths.sourceImagesDir)) {
        clearAndCreateDir(paths.targetImagesDir);
        copyFiles(paths.sourceImagesDir, paths.targetImagesDir);
    } else {
        console.log(`Source images directory does not exist: ${paths.sourceImagesDir}`);
    }
}

module.exports = {
    copyImages,
};