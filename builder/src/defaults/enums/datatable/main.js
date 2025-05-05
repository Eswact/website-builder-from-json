const exampleDatatable = {
    "type": "datatable",
    "containerClass": String, // [optional] container class like "w-full h-20 ..."
    "id": String, // [required] must be unique
    "name": String, // [required] must be unique
    "ajax": { // [required] ajax settings
        "url": String, // [required] url for ajax request
        "method": String, // [required] method for ajax request
        "dataSrc": function (json) { return json.responseData; }, // [optional/required] returned data must be array
        "data": [ // [optional] data to be sent to server
            {
                "name": String, // [required] name for data path
                "value": String || Number || Boolean, // [required] value
            }
        ]
    },
    "serverSide": true, // [optional] server side processing
    "columns": [ // [required] columns
        {
            "order": Number, // [required] default sorting order
            "name": String, // [required] for data
            "title": String, // [required] for header
            "checkable": Boolean, // [required] for visibility
            "orderable": Boolean, // [required] for sorting
            "render": function (data, type, row) { // [optional] datatable render for cell visibility
                if (data != null) {
                    return `<div class="p-2 flex items-center font-bold text-lg">${data}</div>`;
                }
                else { 
                    return `<div class="p-2 flex items-center font-bold text-xl">-</div>`; 
                }
            },
        }
    ],
    "filters": { // [optional] filters for serverside processing
        "data": [
            {
                "data": String, // [required] for data
                "name": String, // [required] for filter name
                "type": "filterType", // [required] type of filter
                "typeRequiretments": "typeRequiretments", // [required] type of filter requirements
                "value": String || Number || Boolean, // [required] current value
                "default": String || Number || Boolean, // [required] default value
                "visible": Boolean // [required] visibility
            }
        ],
        "beforeApply": Function, // [optional] before apply filter function
        "beforeReset": Function // [optional] before reset filter function
    },
    "tableOptions": { // [optional] datatable options
        "drawCallback": function (settings, data) { },
        "fnRowCallBack": function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
        "fnInitComplete": function (settings, data) { },
        "footerCallback": function (row, data, start, end, display) { },
        "order": Boolean,
        "keys": Boolean
    },
    "options": { // [optional] other options
        "customButtons": [ // [optional] custom buttons for datatable
            {
                "html": String, // [required] html for button
                "id": String, // [required] id for button
                "title": String, // [required] title for button
                "onclick": Function // [required] onclick function for button
            }
        ],
        "rowSelect": Boolean, // for single row select
        "multiRowSelect": Boolean, // if multiRowselect is true, rowSelect will be ignored
        "showSelectedRows": { // show selected rows in datatable (filter selected rows)
            "dataName": String, // [required] data name for selected rows (sending data to server)
            "targetData": String, // [required] target data for selected rows
        },
        "rightClick": [ // [optional] right click menu
            {
                "name": String, // [required] name for right click menu
                "click": Function // [required] onclick function for right click menu
            }
        ],
        "keyFocus": function (e, datatable, cell, originalEvent) { }, // [optional] key focus function
        "key": function (e, datatable, key, cell, originalEvent) { }, // [optional] key function
        "footerColumns": [ // [optional] footer columns design
            {
                "column": Number, // [required] column number for footer (start index)
                "colspan": Number, // [required] colspan for footer (width of footer)
            }
        ]
    },
    "operations": { // [optional] operations for datatable !!(you can reach selected row data with "selectedRow" variable)!!
        "add": { // [optional] add operation
            "title": String, // [required] title for add operation (modal title)
            "url": String, // [required] url for ajax request
            "method": String, // [required] method for ajax request
            "data": [
                {
                    "name": String, // [required] name for data path
                    "title": String, // [required] title for data
                    "type": "operationTypes", // [required] type of data (string, number, select, etc.)
                    "required": Boolean, // [required] if true, field is required
                    "value": String || Number || Boolean, // [required] current value
                    "placeholder": String, // [optional] placeholder
                    "showAllErrors": Boolean, // [optional] show all errors
                    "errorChecks": [ // [optional] error checks for data
                        {
                            "control": "return value != null && value != '' && value.length > 4;", // [required] control for error check
                            "errMessage": "value must be longer than 4 characters." // [required] error message
                        },
                    ],
                    "keydown": { // [optional] keydown settings
                        "maxLength": Number, // [optional] max length for keydown
                        "bannedKeys": ["68-90", 32] // [optional] banned keys for keydown
                    },
                    "visible": true, // [required] visibility
                    "typeRequiretments": "typeRequiretments" // [required] operation type requirements
                },
            ]
        },
        "edit": {
            "title": String, // [required] title for edit operation (modal title)
            "url": String, // [required] url for ajax request
            "method": String, // [required] method for ajax request
            "data": [
                { // default values like id
                    "name": String, // [required] name for data path
                    "value": String || Number || Boolean, // [required] current value
                    "visible": false // [required] visibility
                },
                {
                    "name": String, 
                    "value": String || Number || Boolean,
                    "visible": Boolean,
                    "title": String, // [optional] title for data
                    "type": "operationTypes", // [optional] type of data (string, number, select, etc.)
                    "required": Boolean, // [optional] if true, field is required
                    "placeholder": String, // [optional] placeholder
                    "showAllErrors": Boolean, // [optional] show all errors
                    "errorChecks": [ // [optional] error checks for data
                        {
                            "control": "return value != null && value != '' && value.length > 4;", // [required] control for error check
                            "errMessage": "value must be longer than 4 characters." // [required] error message
                        },
                    ],
                    "keydown": { // [optional] keydown settings
                        "maxLength": Number, // [optional] max length for keydown
                        "bannedKeys": ["68-90", 32] // [optional] banned keys for keydown
                    },
                    "typeRequiretments": "typeRequiretments" // [required] operation type requirements
                },
            ]
        },
        "delete": {
            "url": String, // [required] url for ajax request
            "method": "POST", // [required] method for ajax request
            "data": { // [required] data to be sent to server
                "id": "selectedRow.id" // you can reach selected row data with "selectedRow" variable
            }
        }
    }
}