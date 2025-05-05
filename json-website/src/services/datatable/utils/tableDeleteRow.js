import $ from 'jquery';
import { toast } from "vue3-toastify";
import reloadTable from './tableReload';
import tableSelectedRow from './tableSelectedRow';
import tableResolveDeep from './tableResolveDeep';
import commonFunctions from '../../../scripts/common';

const tableDeleteOperation = {
    deleteRow: function (table, deleteOperation) {
        let formData = JSON.parse(JSON.stringify(deleteOperation.data));
        formData = tableResolveDeep(formData, table, `selectedRow`);
        
        let onClick = function () {
            $.ajax({
                url: deleteOperation.url,
                type: deleteOperation.method,
                data: formData,
                success: function (data) {
                    if (data.status == undefined || !data.status) {
                        toast.error(data.description || "İşlem başarısız");
                        return;
                    } else {
                        toast.success(data.description || "İşlem başarılı");
                        tableSelectedRow.selectedRow[table] = {};
                        tableSelectedRow.multiRowSelectLabelUpdate(table);
                        reloadTable(table, true);
                    }
                },
                error: function (err) {
                    toast.error(err.description || "İşlem başarısız");
                }
            });
        }
        commonFunctions.showConfirmationMessage('defaults.datatableRemoveRowMessage', onClick);
    },
};

export default tableDeleteOperation;