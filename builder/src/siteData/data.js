const general = require('./general/index.js');
const theme = require('./theme/index.js');
const languages = require('./languages/index.js');
const pages = require('./pages/index.js');
const scripts = require('./scripts/index.js');
const contents = require('./contents/index.js');

const siteData = {
  "general": general,
  "theme": theme,
  "languages": languages,
  "pages": pages,
  "contents": contents,
  "scripts": scripts
};

module.exports = siteData;