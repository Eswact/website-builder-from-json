const doms = require('./doms/index.js');
const scripts = require('./scripts/index.js');
const styles = require('./styles/index.js');

const datatablesPage = {
    "file": "Datatables.vue",
    "name": "datatables",
    "path": "/datatables",
    "icon": 'fa-solid fa-table',
    "seo": {
        "title": "datatablesPage.seo.title",
        "description": "datatablesPage.seo.description",
        "keywords": ["datatablesPage.seo.keywords1", "datatablesPage.seo.keywords2", "datatablesPage.seo.keywords3"]
    },
    "authRequired": true,
    "pageCss": "w-full flex flex-col justify-center items-center gap-4",
    "doms": doms,
    "scopedCss": styles,
    "customScripts": scripts.customScripts,
    "customReadyScripts": scripts.customReadyScripts,
    "help": {
        "page": "Datatables Page",
        "info": "In this page, you can see example datatables. There are two datatables in this page and both have filtering. Second datatable has operations (add, edit, delete) and right-click context menu. If you want delete or edit a row, first you click on the row to select it, then click on the edit or delete button above the datatable",
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
                "shortcutDescription": "Example shortcut description."
            },
            {
                "shortcut": [
                    {
                        "key": "/images/esc_key.png"
                    }
                ],
                "shortcutDescription": "For the cancel."
            },
            {
                "shortcut": [
                    {
                        "key": "/images/right-click.png"
                    }
                ],
                "shortcutDescription": "In the second datatable, right click on the row to see the context menu."
            }
        ],
        "link": null
    },
    "shortcuts": [
        {
            keys: ['ctrl', 'k'],
            action: function () {
                alert('Ctrl + K pressed!');
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

module.exports = datatablesPage;