const dom = {
    "type": "datatable",
    "containerClass": "w-full",
    "id": "transferedAutomatTable",
    "name": "transferedAutomatTable",
    "columns": [
        {
            order: 1,
            name: 'model',
            title: 'datatablesPage.table1.model',
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
            order: 0,
            name: 'plate',
            title: 'datatablesPage.table1.plate',
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
            order: 2,
            name: 'customerName',
            title: 'datatablesPage.table1.customer',
            checkable: true,
            orderable: false,
        },
        {
            order: 3,
            name: 'location',
            title: 'datatablesPage.table1.location',
            checkable: true,
            orderable: false,
        },
        {
            order: 4,
            name: 'transferedTime',
            title: 'datatablesPage.table1.date',
            checkable: true,
            orderable: true,
            render: function (data, type, row) {
                if (data != null) {
                    return dateTrFormat(data);
                }
                else { return ''; }
            },
        }
    ],
    "filters": {
        "data": [
            {
                "data": "IsField",
                "name": "IsField",
                "type": "check",
                "value": true,
                "default": true,
                "visible": false
            },
            {
                "data": "plate",
                "name": "datatablesPage.table1.plate",
                "type": "text",
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "model",
                "name": "datatablesPage.table1.model",
                "type": "select",
                "options": [
                    {
                        "value": "AA-91",
                        "label": "AA-91"
                    }
                ],
                "value": null,
                "default": null,
                "visible": true
            },
            {
                "data": "customerId",
                "name": "datatablesPage.table1.customer",
                "type": "select",
                "options": [
                    {
                        "value": "1",
                        "label": "Eren"
                    }
                ],
                "value": null,
                "default": null,
                "visible": true
            }
        ],
    },
    "ajax": {
        url: "http://localhost:44350/warehouse/get-automats",
        method: "POST",
        dataSrc: function (json) { return json.data; },
        data: [
            {
                "name": "forTest",
                "value": 4
            }
        ]
    },
    "serverSide": true,
    "tableOptions": {
        drawCallback: function (settings, data) { },
        fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
        fnInitComplete: function () { console.log('fnInitComplete') },
        order: [[4, 'desc']],
        keys: true,
    },
    "options": {
        "keyFocus": function (e, datatable, cell, originalEvent) {
            console.log('Key focus on: ', cell.index());
        },
        "key": function (e, datatable, key, cell, originalEvent) {
            console.log(cell.node());
            if (key === 13 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                alert("Enter pressed");
            }
        },
    }
};

module.exports = dom;