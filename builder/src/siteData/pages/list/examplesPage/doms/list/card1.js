const dom = {
    "type": "cards",
    "containerClass": "w-full",
    "id": "shoppingCards",
    "name": "shoppingCards",
    "ajax": {
        "url": "http://localhost:3000/api/products",
        "method": "POST",
        "dataType": 'json',
        "contentType": 'application/json',
        "stringifyData": true
    },
    "paging": {
        "type": 0, //number buttons / scroll ??
        "size": 10,
    },
    "ordering": {
        "name": "orderType",
        "options": [
            {
                "name": "aToZ",
                "id": "aToZ",
                "value": 1,
            },
            {
                "name": "lowestPrice",
                "id": "lowestPrice",
                "value": 2,
            },
            {
                "name": "highestPrice",
                "id": "highestPrice",
                "value": 3,
            }
        ]
    },
    "searchBar": {
        "name": "searchValue",
        "placeholder": "examplesPage.exampleCard.searchPlaceholder",
        "delay": 300
    },
    "cardLayout": {
        "type": 1,
        "card": {
            "id": "ID",
            "title": "UrunAdi",
            "img": "Resimler[0]",
            "envanter": "Envanter",
            "barcode": "Barkodlar[0].Barkodu",
            "price": "Tutar",
            "brand": "UreticiFirmaAdi",
            "category": "Kategori",
        },
        "viewMode": {
            "changeable": true,
            "default": "grid",
        },
    }
};

module.exports = dom;