const en = require('./options/en.json');
const tr = require('./options/tr.json');

const languages = {
    "default": "en",
    "options": [
        {
            "code": "en",
            "label": "English",
            "data": en,
        },
        {
            "code": "tr",
            "label": "Türkçe",
            "data": tr,
        }
    ]
}

module.exports = languages;