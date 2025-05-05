const exampleCards = {
    "type": "cards",
    "containerClass": String, // [optional] container class like "w-full h-20 ..."
    "id": String, // [required] must be unique
    "name": String, // [required] must be unique
    "ajax": { // [required] ajax settings
        "url": String, // [required] url for ajax request
        "method": String, // [required] method for ajax request
        "dataType": String, // [optional] data type for ajax request
        "contentType": String, // [optional] content type for ajax request
        "stringifyData": true, // [optional] stringify data for ajax request
    },
    "paging": { // [required] paging settings
        "type": Number, // [required] type of paging
        "size": Number, // [required] size of paging
    },
    "ordering": { // [optional] ordering settings
        "name": String, // [required] name for ordering
        "options": [ // [required] options for ordering
            {
                "name": String, // [required] name for ordering
                "id": String, // [required] id for ordering
                "value": String || Number || Boolean, // [required] value for ordering
            },
        ]
    },
    "searchBar": { // [optional] search bar settings
        "name": String, // [required] name for search bar
        "placeholder": String, // [required] placeholder for search bar
        "delay": Number // [optional] delay for search bar
    },
    "filters": [ // [optional] filters for cards
        {
            "data": String, // [required] for data (path)
            "name": String, // [required] for filter name
            "type": "filterType", // [required] type of filter
            "typeRequiretments": "typeRequiretments", // [required] type of filter requirements
            "value": String || Number || Boolean, // [required] current value
            "default": String || Number || Boolean, // [required] default value
            "visible": Boolean // [required] visibility
        }
    ],
    "cardLayout": {
        "type": "cardType", // [required] type of card
        "card": { // [required] card settings
            "typeRequiretments": "typeRequiretments" // [required] type of card requirements
        },
        "viewMode": { // [optional] view mode for cards (default grid)
            "changeable": Boolean, 
            "default": "viewMode",
        }
    }
}