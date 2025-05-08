const doms = require('./doms/index.js');
const scripts = require('./scripts/index.js');

const introductionPage = {
    "file": "Introduction.vue",
    "name": "introduction",
    "path": "/",
    "icon": 'fa-solid fa-home',
    "seo": {
      "description": "introductionPage.seo.description",
      "keywords": ["introductionPage.seo.keyword1", "introductionPage.seo.keyword2", "introductionPage.seo.keyword3"]
    },
    "authRequired": false,
    "doms": doms,
    "scopedCss": ``,
    "customScripts": scripts.customScripts,
    "customReadyScripts": scripts.customReadyScripts,
};

module.exports = introductionPage;