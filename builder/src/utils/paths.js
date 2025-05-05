const path = require('path');

const baseDir = __dirname.includes('src') ? path.resolve(__dirname, '..') : __dirname;

module.exports = {
  defaultVuePath: path.resolve(baseDir, './defaults/vue'),
  projectPath: path.resolve(baseDir, '../../json-site'),
  jsonFilePath: path.join(baseDir, '../../json-site/siteData.json'),
  languagesDir: path.join(baseDir, '../../json-site/src/locales'),
  languageServiceDir: path.join(baseDir, '../../json-site/src/services/languageService.js'),
  viewsDir: path.join(baseDir, '../../json-site/src/views'),
  scriptsDir: path.join(baseDir, '../../json-site/src/scripts/custom'),
  sourceImagesDir: path.join(baseDir, './custom/images'),
  targetImagesDir: path.join(baseDir, '../../json-site/public/images'),
  sourceFontsDir: path.join(baseDir, './custom/fonts'),
  targetFontsDir: path.join(baseDir, '../../json-site/public/fonts'),
  fontsCssOutputFile: path.resolve(baseDir, '../../json-site/src/styles/fonts.css'),
};
