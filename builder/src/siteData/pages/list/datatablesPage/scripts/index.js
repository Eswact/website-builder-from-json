const customScripts = ` 
import { toast } from "vue3-toastify";
var createdAutomatTableCellUpdates = [];
function add2UpdatedCells(name, id, value, rowData) { 
    document.getElementById('changesModal').classList.add('show');
    $('#showChangedCells').attr('checked', false);
    let index = createdAutomatTableCellUpdates.findIndex(x => x.name == name && x.id == id);
    if (index == -1) {
        createdAutomatTableCellUpdates.push({ name: name, id: id, value: value, rowData: rowData });
    }
    else {
        createdAutomatTableCellUpdates[index].value = value;
    }
}
function remove2UpdatedCells(name, id) { 
    let index = createdAutomatTableCellUpdates.findIndex(x => x.name == name && x.id == id);
    if (index != -1) {
        createdAutomatTableCellUpdates.splice(index, 1);
    }

    if (createdAutomatTableCellUpdates.length == 0) {
        document.getElementById('changesModal').classList.remove('show');
    }
}
function saveCellChanges() { 
    console.log(createdAutomatTableCellUpdates[0].rowData);
    let data = {
        manufactId: createdAutomatTableCellUpdates[0].id,
        plaka: createdAutomatTableCellUpdates[0].rowData.plate,
        model: createdAutomatTableCellUpdates[0].rowData.model,
        androidMac: createdAutomatTableCellUpdates[0].rowData.macAndroid,
        androidImei: createdAutomatTableCellUpdates[0].rowData.imeiAndroid,
        modemImei: createdAutomatTableCellUpdates[0].rowData.imeimodem,
        modemMac: createdAutomatTableCellUpdates[0].rowData.macmodem,
        plcImei: createdAutomatTableCellUpdates[0].rowData.imeiplc,
        plcMac: createdAutomatTableCellUpdates[0].rowData.macplc,
        serialNumber: createdAutomatTableCellUpdates[0].rowData.snAndroid
    };
    data[createdAutomatTableCellUpdates[0].name] = createdAutomatTableCellUpdates[0].value;
    $.ajax({
        url: "http://localhost:44350/production/update-automat",
        method: "POST",
        data: data,
        success: function (response) {
            toast.success(response.description || "İşlem başarılı");
            createdAutomatTableCellUpdates = [];
            createdAutomatTable.ajax.reload(null, false);
            document.getElementById('changesModal').classList.remove('show');
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}
function cancelCellChanges() {
    createdAutomatTableCellUpdates = [];
    document.getElementById('changesModal').classList.remove('show');
    createdAutomatTable.ajax.reload(null, false);
}
function dateTrFormat(data) {
    let options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
    let formattedDate = new Date(data).toLocaleString('tr-TR', options);
    return formattedDate;
}
`;

const customReadyScripts = `
$('#showChangedCells').on('change', function () {
    createdAutomatTable.ajax.reload();
});
`;

module.exports = {
    "customScripts": customScripts,
    "customReadyScripts": customReadyScripts
};