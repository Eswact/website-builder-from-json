const path = require('path');

const baseDir = __dirname.includes('src') ? path.resolve(__dirname, '..') : __dirname;

module.exports = {
  defaultVuePath: path.resolve(baseDir, './defaults/vue'),
  projectPath: path.resolve(baseDir, '../../json-website'),
  jsonFilePath: path.join(baseDir, '../../json-website/siteData.json'),
  languagesDir: path.join(baseDir, '../../json-website/src/locales'),
  languageServiceDir: path.join(baseDir, '../../json-website/src/services/languageService.js'),
  viewsDir: path.join(baseDir, '../../json-website/src/views'),
  scriptsDir: path.join(baseDir, '../../json-website/src/scripts/custom'),
  sourceImagesDir: path.join(baseDir, './custom/images'),
  targetImagesDir: path.join(baseDir, '../../json-website/public/images'),
  sourceFontsDir: path.join(baseDir, './custom/fonts'),
  targetFontsDir: path.join(baseDir, '../../json-website/public/fonts'),
  fontsCssOutputFile: path.resolve(baseDir, '../../json-website/src/styles/fonts.css'),
};
