const doms = require('./doms/index.js');
const scripts = require('./scripts/index.js');

const configurationPage = {
    "file": "ConfigurationPage.vue",
    "name": "configuration",
    "path": "/configuration",
    "icon": 'fa-solid fa-hammer',
    "seo": {
        "title": "configurationPage.seo.title",
        "description": "configurationPage.seo.description",
        "keywords": ["configurationPage.seo.keyword1", "configurationPage.seo.keyword2", "configurationPage.seo.keyword3"]
    },
    "doms": doms,
    "customScripts": scripts.customScripts,
    "customReadyScripts": scripts.customReadyScripts,
};

module.exports = configurationPage;