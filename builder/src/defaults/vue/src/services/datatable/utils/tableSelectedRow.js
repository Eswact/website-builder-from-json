import $ from 'jquery';
import reloadTable from './tableReload';

const tableSelectedRow = {
    selectedRow: {},

    multiRowSelectLabelUpdate: function (name) {
        let thisHelper = this;

        if (Array.isArray(thisHelper.selectedRow[name]) && thisHelper.selectedRow[name]?.length > 0) {
            $(`.selectedRowsLabel[data-name=${name}]`).addClass('flex').removeClass('hidden');
            $(`.selectedRowsCounter[data-name=${name}]`).text(thisHelper.selectedRow[name].length);
        }
        else {
            $(`.selectedRowsLabel[data-name=${name}]`).removeClass('flex').addClass('hidden');
            if ($(`#${name}ShowSelected`).length && $(`#${name}ShowSelected`).prop('checked')) {
                $(`#${name}ShowSelected`).prop('checked', false);
                reloadTable(name);
            }
        }
    },
}

export default tableSelectedRow;