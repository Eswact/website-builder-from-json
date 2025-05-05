const dom = {
    "type": "datatable",
    "containerClass": "w-full",
    "id": "messagesTable",
    "name": "messagesTable",
    "columns": [
        {
            order: 0,
            name: 'postId',
            title: 'examplesPage.exampleTable.group',
            checkable: true,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex justify-center items-center font-bold text-2xl">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
        },
        {
            order: 1,
            name: 'name',
            title: 'examplesPage.exampleTable.name',
            checkable: false,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
        },
        {
            order: 2,
            name: 'email',
            title: 'examplesPage.exampleTable.mail',
            checkable: true,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
        },
        {
            order: 3,
            name: 'body',
            title: 'examplesPage.exampleTable.message',
            checkable: false,
            render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
        }
    ],
    // "filters": [],
    "ajax": {
        url: "https://jsonplaceholder.typicode.com/comments",
        method: "GET",
        dataSrc: '',
        // data: function (d) {}
    },
    "serverSide": false,
    "tableOptions": {
        drawCallback: function (settings, data) { },
        fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
        fnInitComplete: function () { },
    }
};

module.exports = dom;