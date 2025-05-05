const dom =  {
    "type": "datatable",
    "containerClass": "w-full",
    "id": "createdAutomatTable2",
    "name": "createdAutomatTable2",
    "columns": [
        {
            order: 0,
            name: 'plate',
            title: 'Plate',
            checkable: false,
            orderable: false,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="p-2 flex items-center font-bold text-lg">
                    ${data}
                </div>`;
                }
                else { return '<div class="p-2 flex items-center font-bold text-xl">-</div>'; }
            },
        },
        {
            order: 1,
            name: 'model',
            title: 'Model',
            checkable: true,
            orderable: false,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">
                    ${data}
                </div>`;
                }
                else { return '<div class="py-2 px-4 flex items-center font-semibold text-second dark:text-fourth">-</div>'; }
            },
        },
        {
            order: 2,
            name: 'imeiAndroid',
            title: 'Android Imei',
            checkable: true,
            orderable: false,
        },
        {
            order: 3,
            name: 'macAndroid',
            title: 'Android Mac',
            checkable: true,
            orderable: false,
        },
        {
            order: 4,
            name: 'imeimodem',
            title: 'Modem Imei',
            checkable: true,
            orderable: false,
        },
        {
            order: 5,
            name: 'macmodem',
            title: 'Modem Mac',
            checkable: true,
            orderable: false,
        },
        {
            order: 6,
            name: 'imeiplc',
            title: 'PLC Imei',
            checkable: true,
            orderable: false,
        },
        {
            order: 7,
            name: 'macplc',
            title: 'PLC Mac',
            checkable: true,
            orderable: false,
        },
        {
            order: 8,
            name: null,
            title: 'Test',
            checkable: true,
            orderable: false,
            render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
            },
        }
    ],
    "filters": {
        "data": [
            {
                "data": "plate",
                "name": "datatablesPage.table3.plate",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "model",
                "name": "Model",
                "type": "select2",
                "options": {
                    "width": '100%',
                    "minimumInputLength": -1,
                    "placeholder": "Model Selection",
                    "allowClear": true,
                    "language": {
                        "noResults": "Eşleşen bir Model bulunamadı.",
                        "inputTooShort": "En az 1 Karakter giriniz.",
                        "searching": "Aranıyor..."
                    },
                    "ajax": {
                        "url": `http://localhost:44350/production/get-models`,
                        "delay": 250,
                        "type": 'POST',
                        "dataType": 'json',
                        "contentType": "application/json; charset=utf-8",
                    }
                },
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "androidImei",
                "name": "Android Imei",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "androidMac",
                "name": "Android Mac",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "modemImei",
                "name": "Modem Imei",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "modemMac",
                "name": "Modem Mac",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "plcImei",
                "name": "PLC Imei",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "plcMac",
                "name": "PLC Mac",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            }
        ],
        "beforeApply": function () {
            console.log('test apply');
            console.log('test apply');
        },
        "beforeReset": function () {
            console.log('test reset');
            console.log('test reset');
        },
    },
    "ajax": {
        url: "http://localhost:44350/production/get-manufacts",
        method: "POST",
        dataSrc: function (json) { return json.responseData; },
        data: [
            {
                "name": "changedCells",
                "value": "$('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null"
            },
            {
                "name": "forTest",
                "value": 4
            }
        ]
    },
    "serverSide": true,
    "tableOptions": {
        drawCallback: function (settings, data) {
            $('.alertManufactIdButton').off('click').on('click', function () {
                alert($(this).data('manufactid'));
            });
        },
        fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
        fnInitComplete: function () { },
        footerCallback: function (row, data, start, end, display) {
            let api = this.api();
            if (api) {
                let total = api
                    .column(2, { page: 'current' })
                    .data()
                    .reduce((a, b) => a + b.length, 0);

                $(api.column(0).footer()).html('<span class="font-bold text-sm inline-block">Total number of characters in the third column:</span>');
                $(api.column(2).footer()).html(`<span class="font-bold text-lg px-4 text-main dark:text-third">${total.toFixed(0)}</span>`);
            }
        },
        order: false,
    },
    "options": {
        "customButtons": [
            {
                "html": "<i class='fa-solid fa-arrows-rotate text-xl'></i>",
                "id": "refreshTableButton",
                "title": "Yenile",
                "onclick": function () {
                    createdAutomatTable2.ajax.reload();
                }
            }
        ],
        "rowSelect": false,
        "multiRowSelect": true,
        "showSelectedRows": {
            "dataName": "selectedRows",
            "targetData": "manufactId",
        },
        "rightClick": [
            {
                "name": "datatablesPage.table3.contextMenu.edit",
                "click": function (rowData) {
                    alert(`Edit: ${rowData.manufactId}`);
                }
            },
            {
                "name": "datatablesPage.table3.contextMenu.delete",
                "click": function (rowData) {
                    alert(`Delete: ${rowData.manufactId}`);
                }
            },
            {
                "name": "datatablesPage.table3.contextMenu.test",
                "click": function (rowData) {
                    commonFunctions.openModal(500, 600, rowData.manufactId);
                }
            }
        ],
        "footerColumns": [
            {
                column: 0,
                colspan: 2
            },
            {
                column: 3,
                colspan: 3
            }
        ]
    },
    "operations": {
        "add": {
            "title": "datatablesPage.table3.add",
            "url": "http://localhost:44350/production/set-automat",
            "method": "POST",
            "data": [
                {
                    "name": "plaka",
                    "title": "datatablesPage.table3.plate",
                    "type": "string",
                    "required": true,
                    "value": "",
                    "placeholder": "xxx-xx-xxx",
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Plate must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 14,
                    },
                    "visible": true
                },
                {
                    "name": "model",
                    "title": "datatablesPage.table3.model",
                    "type": "select",
                    "required": true,
                    "options": [
                        {
                            "value": "",
                            "label": "Seçim yapınız"
                        },
                        {
                            "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                            "label": "AA-91"
                        },
                        {
                            "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                            "label": "AA-92"
                        },
                    ],
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != ''",
                            errMessage: "Model cannot be null."
                        },
                    ],
                    "visible": true
                },
                {
                    "name": "serialNumber",
                    "title": "Serial number",
                    "type": "number",
                    "required": true,
                    "value": "",
                    "placeholder": "xxxxxxxxxxx",
                    "showAllErrors": true,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 7",
                            errMessage: "Serial number must be longer than 7 characters."
                        },
                        {
                            control: "return !value.startsWith('000')",
                            errMessage: "Serial number cannot start with 000."
                        },
                    ],
                    "keydown": {
                        "maxLength": 14,
                        "bannedKeys": ["68-90", 32]
                    },
                    "visible": true
                },
                {
                    "name": "androidImei",
                    "title": "Android imei",
                    "type": "string",
                    "required": true,
                    "value": "",
                    "placeholder": "xx-xx-xx-xx",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Android imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "androidMac",
                    "title": "Android mac",
                    "type": "string",
                    "required": true,
                    "value": "",
                    "placeholder": "xx-xx-xx-xx",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Android mac must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "modemImei",
                    "title": "Modem imei",
                    "type": "string",
                    "required": true,
                    "value": "",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Modem imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "modemMac",
                    "title": "Modem mac",
                    "type": "string",
                    "required": true,
                    "value": "",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Modem mac must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "plcImei",
                    "title": "Plc imei",
                    "type": "string",
                    "required": false,
                    "value": "",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value == '' || value.length > 4;",
                            errMessage: "Plc imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "plcMac",
                    "title": "Plc mac",
                    "type": "string",
                    "required": false,
                    "value": "",
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return !value.startsWith('000')",
                            errMessage: "Serial number cannot start with 000."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "defaultData",
                    "value": true,
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": false
                },
            ]
        },
        "edit": {
            "title": "datatablesPage.table3.edit",
            "url": "http://localhost:44350/production/update-automat",
            "method": "POST",
            "data": [
                {
                    "name": "manufactId",
                    "value": "selectedRow.manufactId",
                    "visible": false
                },
                {
                    "name": "plaka",
                    "value": "selectedRow.plate",
                    "visible": false
                },
                {
                    "name": "serialNumber",
                    "value": "selectedRow.snAndroid",
                    "visible": false
                },
                {
                    "name": "model",
                    "title": "datatablesPage.table3.model",
                    "type": "select",
                    "value": "selectedRow.modelID",
                    "options": [
                        {
                            "value": "",
                            "label": "Seçim yapınız"
                        },
                        {
                            "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                            "label": "AA-91"
                        },
                        {
                            "value": "CD636047-CE35-43D4-A82D-AF0943BB63BE",
                            "label": "AA-92"
                        },
                    ],
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != ''",
                            errMessage: "Model cannot be null."
                        },
                    ],
                    "visible": true
                },
                {
                    "name": "androidImei",
                    "title": "Android imei",
                    "type": "string",
                    "value": "selectedRow.imeiAndroid",
                    "placeholder": "xx-xx-xx-xx",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Android imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "androidMac",
                    "title": "Android mac",
                    "type": "string",
                    "value": "selectedRow.macAndroid",
                    "placeholder": "xx-xx-xx-xx",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Android mac must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "modemImei",
                    "title": "Modem imei",
                    "type": "string",
                    "value": "selectedRow.imeimodem",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Modem imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "modemMac",
                    "title": "Modem mac",
                    "type": "string",
                    "value": "selectedRow.macmodem",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Modem mac must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "plcImei",
                    "title": "Plc imei",
                    "type": "string",
                    "value": "selectedRow.imeiplc",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Plc imei must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                },
                {
                    "name": "plcMac",
                    "title": "Plc mac",
                    "type": "string",
                    "value": "selectedRow.macplc",
                    "required": true,
                    "showAllErrors": false,
                    "errorChecks": [
                        {
                            control: "return value != null && value != '' && value.length > 4;",
                            errMessage: "Plc mac must be longer than 4 characters."
                        },
                    ],
                    "keydown": {
                        "maxLength": 10,
                    },
                    "visible": true
                }
            ]
        },
        "delete": {
            "url": "http://localhost:44350/production/delete-automat",
            "method": "POST",
            "data": {
                "manufactIds": "selectedRow.manufactId"
            }
        }
    }
};

module.exports = dom;