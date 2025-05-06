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
        "placeholder": "cardsPage.card1.searchPlaceholder",
        "delay": 300
    },
    "filters": [
        {
            "data": "category",
            "name": "cardsPage.card1.category",
            "type": "select2",
            "options": {
                "width": '100%',
                "minimumInputLength": -1,
                "placeholder": "cardsPage.card1.categorySelection",
                "allowClear": true,
                "language": {
                    "noResults": "Eşleşen bir Kategori bulunamadı.",
                    "inputTooShort": "En az 1 Karakter giriniz.",
                    "searching": "Aranıyor..."
                },
                "ajax": {
                    "url": `http://localhost:3000/api/categories`,
                    "delay": 250,
                    "type": 'GET',
                    "dataType": 'json',
                    "contentType": "application/json; charset=utf-8",
                }
            },
            "value": null,
            "default": null,
            "visible": true
        },
        {
            "data": "brand",
            "name": "cardsPage.card1.brand",
            "type": "text",
            "value": null,
            "default": null,
            "visible": true
        }
    ],
    "cardLayout": {
        "type": 2,
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