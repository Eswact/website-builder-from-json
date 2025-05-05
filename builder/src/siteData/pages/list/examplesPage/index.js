const doms = require('./doms/index.js');
const scripts = require('./scripts/index.js');

const examplesPage = {
    "file": "ExamplesPage.vue",
    "name": "examples",
    "path": "/examples",
    "icon": 'fa-solid fa-chart-simple',
    "seo": {
        "title": "examplesPage.seo.title",
        "description": "examplesPage.seo.description",
        "keywords": ["examplesPage.seo.keywords1", "examplesPage.seo.keywords2", "examplesPage.seo.keywords3"]
    },
    "pageCss": "w-full flex flex-col gap-4",
    "doms": doms,
    "customScripts": scripts.customScripts,
    "customReadyScripts": scripts.customReadyScripts,
    "help": {
        "page": "examplesPage.helper.page",
        "info": "examplesPage.helper.info",
        "shortcuts": [
            {
                "shortcut": [
                    {
                        "key": "/images/ctrl_key.png"
                    },
                    {
                        "key": "/images/letter_k.png"
                    }
                ],
                "shortcutDescription": "examplesPage.helper.shortcuts[0]"
            },
            {
                "shortcut": [
                    {
                        "key": "/images/esc_key.png"
                    }
                ],
                "shortcutDescription": "examplesPage.helper.shortcuts[1]"
            },
            {
                "shortcut": [
                    {
                        "key": "/images/right-click.png"
                    }
                ],
                "shortcutDescription": "examplesPage.helper.shortcuts[2]"
            }
        ],
        "link": "https://www.youtube.com/embed/pad_iFvqtYw?si=cWmRAfFFvFuJR8Hj"
    },
    "shortcuts": [
        {
            keys: ['ctrl', 'k'],
            action: function () {
                alert('Ctrl + K pressed!');
            }
        },
        {
            keys: ['alt', 's'],
            action: function () {
                console.log('Alt + S pressed!');
            }
        },
        {
            keys: ['p'],
            action: function () {
                console.log('P pressed!');
            }
        }
    ]
};

module.exports = examplesPage;