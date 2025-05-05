const doms = require('./doms/index.js');

const cardsPage = {
    "file": "Cards.vue",
    "name": "cards",
    "path": "/cards",
    "icon": 'fa-solid fa-cart-shopping',
    "seo": {
        "title": "cardsPage.seo.title",
        "description": "cardsPage.seo.description",
        "keywords": ["cardsPage.seo.keywords1", "cardsPage.seo.keywords2", "cardsPage.seo.keywords3", "cardsPage.seo.keywords4"]
    },
    "pageCss": "w-full flex flex-col justify-center items-center gap-8",
    "doms": doms,
    "help": {
        "page": "Cards Page",
        "info": "In this page, you can see example cards. There are two cards in this page and both have filtering & sorting. First card is in grid view and second card is in list view. You can change the view mode by clicking on the button on the top right corner of the card.",
        "shortcuts": null,
        "link": null
    }
};

module.exports = cardsPage;