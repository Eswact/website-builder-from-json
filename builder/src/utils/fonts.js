const fs = require('fs');
const path = require('path');
const siteData = require('../siteData/data.js');
const paths = require('./paths.js');
const { clearAndCreateDir, copyFiles } = require('./files.js');

function createFontsCss() {
    if(siteData.theme.fonts.custom) {
        const cssContent = siteData.theme.fonts.custom.map(font => {
        const fileExtension = path.extname(font.file).toLowerCase();
        const formatMap = { '.woff2': 'woff2', '.woff': 'woff', '.ttf': 'truetype', '.otf': 'opentype' };
        const fontFormat = formatMap[fileExtension];

        if (!fontFormat) {
            console.warn(`Unsupported font format for file: ${font.file}`);
            return '';
        }

        return `@font-face { font-family: '${font.name}'; src: url('/fonts/${font.file}') format('${fontFormat}'); }`;
        }).join('\n');

        fs.writeFileSync(paths.fontsCssOutputFile, cssContent);
    }
}

function setFonts() {
    if (fs.existsSync(paths.sourceFontsDir)) {
        clearAndCreateDir(paths.targetFontsDir);
        copyFiles(paths.sourceFontsDir, paths.targetFontsDir);
        createFontsCss();
    } else {
        console.log(`Source fonts directory does not exist: ${paths.sourceFontsDir}`);
    }
}

module.exports = {
    setFonts,
};