import $ from 'jquery';
// import 'datatables.net';

function reloadTable (name, stayOnPage = false) {
    const table = $(`#${name}`).DataTable();
    const currentPage = table.page();

    if (stayOnPage) {
        table.ajax.reload(() => {
            // If the last page has been reached, go back to the previous page
            if (table.page.info().recordsDisplay <= currentPage * table.page.info().length) {
                table.page(Math.max(currentPage - 1, 0)).draw(false);
            }
        }, false);
    } else {
        table.ajax.reload();
    }
};

export default reloadTable;