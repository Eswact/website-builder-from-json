<template>
        <div class="w-full flex flex-col justify-center items-center gap-4">
          <div class="w-full flex justify-beetween items-center mt-4">
        <div class="w-full flex items-center gap-8">
            <h1 class="text-2xl font-bold text-second dark:text-white">{{$t("datatablesPage.title1")}}</h1>
        </div>
    </div>
      <div class="w-full">
        <table id="transferedAutomatTable" class="display stripe hover" style="width:100%"></table>
      </div><div class="w-full flex justify-beetween items-center mt-4">
                    <div class="w-full flex items-center gap-8">
                    <h1 class="text-2xl font-bold text-second dark:text-white">{{$t("datatablesPage.title2")}}</h1>
                    </div>
                </div>
      <div class="w-full">
        <table id="createdAutomatTable" class="display stripe hover" style="width:100%"></table>
      </div><div class="w-full flex justify-beetween items-center mt-4">
                    <div class="w-full flex items-center gap-8">
                    <h1 class="text-2xl font-bold text-second dark:text-white">{{$t("datatablesPage.title3")}}</h1>
                    </div>
                </div>
      <div class="w-full">
        <table id="createdAutomatTable2" class="display stripe hover" style="width:100%"><tfoot><tr><td colspan="2"></td><td></td><td colspan="3"></td><td></td><td></td><td></td></tr></tfoot></table>
      </div><div id="changesModal" class="fixed bottom-0 flex-col justify-center items-center gap-2 w-[400px] px-8 py-4 max-w-full bg-bg text-darkBg rounded-t-lg">
                    <div class="w-full flex justify-center items-center gap-4 text-sm"><input id="showChangedCells" type="checkbox" /><span>Show changed cells</span></div>
                    <div class="flex flex-col justify-center items-center gap-8">
                    <h1 class="text-2xl font-bold">Some changes were noticed</h1>
                    <div class="flex gap-4 w-full">
                        <button @click="saveCellChanges" class="w-1/2 px-4 py-2 bg-green-600 text-white shadow-md text-xl font-bold rounded-lg">{{$t("datatablesPage.save")}}</button>
                        <button @click="cancelCellChanges" class="w-1/2 px-4 py-2 bg-red-600 text-white shadow-md text-xl font-bold rounded-lg">{{$t("datatablesPage.cancel")}}</button>
                    </div>
                    </div>
                </div>
        </div>
      </template>
    
      <script setup>
        import { ref, onMounted, computed, watch } from 'vue';
        import { useRoute, useRouter } from 'vue-router';
        import { useI18n } from 'vue-i18n';
        const route = useRoute();
        const router = useRouter();
        const { locale } = useI18n();
        import commonFunctions from '../scripts/common.js'
        
import $ from "jquery";
import datatableService from "../services/datatable/index.js";
      
        
  var transferedAutomatTable;
  
  let transferedAutomatTableColumns = [
    {
      order: 1,
      title: "datatablesPage.table1.model",
      data: "model",
      name: "model",
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
      className: ""
    },{
      order: 0,
      title: "datatablesPage.table1.plate",
      data: "plate",
      name: "plate",
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
      className: ""
    },{
      order: 2,
      title: "datatablesPage.table1.customer",
      data: "customerName",
      name: "customerName",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 3,
      title: "datatablesPage.table1.location",
      data: "location",
      name: "location",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 4,
      title: "datatablesPage.table1.date",
      data: "transferedTime",
      name: "transferedTime",
      checkable: true,
      orderable: true,
      render: function (data, type, row) {
                if (data != null) {
                    return dateTrFormat(data);
                }
                else { return ''; }
            },
      className: ""
    }
  ];
  
  let transferedAutomatTableFilters = { data: [{"data":"IsField","name":"IsField","type":"check","value":true,"default":true,"visible":false},{"data":"plate","name":"datatablesPage.table1.plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"datatablesPage.table1.model","type":"select","options":[{"value":"AA-91","label":"AA-91"}],"value":null,"default":null,"visible":true},{"data":"customerId","name":"datatablesPage.table1.customer","type":"select","options":[{"value":"1","label":"Eren"}],"value":null,"default":null,"visible":true}] }
  
  
  
  
  let transferedAutomatTableAjax = {
    url: "http://localhost:44350/warehouse/get-automats",
    type: "POST",
    dataSrc: function (json) { return json.data; },
    data: function(d) {
      d.forTest = 4
      datatableService.updateTableAjaxData("transferedAutomatTable", d, transferedAutomatTableFilters.data);
      
    }
  };
  
  let transferedAutomatTableTableOptions = {
    drawCallback: function (settings, data) { },
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
fnInitComplete: function () { console.log('fnInitComplete') },
order: [[4,"desc"]],
keys: true
  };
  transferedAutomatTableTableOptions.serverSide = true;
  transferedAutomatTableTableOptions.processing = true;
  
  let transferedAutomatTableRightClick = false
  let transferedAutomatTableKeyFocusFunction = function (e, datatable, cell, originalEvent) {
            console.log('Key focus on: ', cell.index());
        };
  let transferedAutomatTableKeyFunction = function (e, datatable, key, cell, originalEvent) {
            console.log(cell.node());
            if (key === 13 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                alert("Enter pressed");
            }
        };
  let transferedAutomatTableOptions = {}
  
  transferedAutomatTableOptions["rightClick"] = transferedAutomatTableRightClick;
  transferedAutomatTableOptions['keyFocus'] = transferedAutomatTableKeyFocusFunction;
  transferedAutomatTableOptions['key'] = transferedAutomatTableKeyFunction;
  
  
  
  let transferedAutomatTableOperations = {}
  

  var createdAutomatTable;
  
  let createdAutomatTableColumns = [
    {
      order: 0,
      title: "datatablesPage.table2.plate",
      data: "plate",
      name: "plate",
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
      className: ""
    },{
      order: 1,
      title: "datatablesPage.table2.model",
      data: "model",
      name: "model",
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
      className: ""
    },{
      order: 2,
      title: "datatablesPage.table2.androidImei",
      data: "imeiAndroid",
      name: "imeiAndroid",
      checkable: true,
      orderable: false,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="notSelectRow py-2 px-4 flex items-center">
                  <input type="text" class="editableTdInput hidden notSelectRow w-full h-full border-none bg-transparent p-2" value="${data}" data-temp=${data} data-first=${data} data-name="androidImei" />
                  <span class="editableText notSelectRow p-2" data-name="imeiAndroid">${data}</span>
                </div>`;
                }
                else { return '-'; }
            },
      className: "notSelectRow"
    },{
      order: 3,
      title: "datatablesPage.table2.androidMac",
      data: "macAndroid",
      name: "macAndroid",
      checkable: true,
      orderable: false,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="notSelectRow py-2 px-4 flex items-center">
                  <input type="text" class="editableTdInput hidden notSelectRow w-full h-full border-none bg-transparent p-2" value="${data}" data-first=${data} data-temp=${data} data-name="androidMac" />
                  <span class="editableText  notSelectRow p-2" data-name="macAndroid">${data}</span>
                </div>`;
                }
                else { return '-'; }
            },
      className: "notSelectRow"
    },{
      order: 4,
      title: "datatablesPage.table2.modemImei",
      data: "imeimodem",
      name: "imeimodem",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 5,
      title: "datatablesPage.table2.modemMac",
      data: "macmodem",
      name: "macmodem",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 6,
      title: "datatablesPage.table2.plcImei",
      data: "imeiplc",
      name: "imeiplc",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 7,
      title: "datatablesPage.table2.plcMac",
      data: "macplc",
      name: "macplc",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 8,
      title: "datatablesPage.table2.test",
      data: "null",
      name: "null",
      checkable: true,
      orderable: false,
      render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
            },
      className: ""
    }
  ];
  
  let createdAutomatTableFilters = { data: [{"data":"plate","name":"datatablesPage.table2.plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"Model","type":"select","options":[{"value":"AA-91","label":"AA-91"}],"value":null,"default":null,"visible":true},{"data":"androidImei","name":"Android Imei","type":"text","value":null,"default":null,"visible":true},{"data":"androidMac","name":"Android Mac","type":"text","value":null,"default":null,"visible":true},{"data":"modemImei","name":"Modem Imei","type":"text","value":null,"default":null,"visible":true},{"data":"modemMac","name":"Modem Mac","type":"text","value":null,"default":null,"visible":true},{"data":"plcImei","name":"PLC Imei","type":"text","value":null,"default":null,"visible":true},{"data":"plcMac","name":"PLC Mac","type":"text","value":null,"default":null,"visible":true}] }
  createdAutomatTableFilters.beforeApply = function () {
            console.log('test apply');
            console.log('test apply');
        };
  createdAutomatTableFilters.beforeReset = function () {
            console.log('test reset');
            console.log('test reset');
        };
  
  
  let createdAutomatTableAjax = {
    url: "http://localhost:44350/production/get-manufacts",
    type: "POST",
    dataSrc: function (json) { return json.responseData; },
    data: function(d) {
      d.changedCells = $('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null;
d.forTest = 4
      datatableService.updateTableAjaxData("createdAutomatTable", d, createdAutomatTableFilters.data);
      
    }
  };
  
  let createdAutomatTableTableOptions = {
    drawCallback: function (settings, data) {
            if (createdAutomatTableCellUpdates != '') {
                createdAutomatTable.rows((idx, data, row) => {
                    $(createdAutomatTableCellUpdates).each(function () {
                        if (data.manufactId == this.id) {
                            let rowElement = $(row).get(0);
                            //input
                            let cellInput = $(rowElement).find(`.editableTdInput[data-name="${this.name}"]`);
                            cellInput.val(this.value);
                            cellInput.data("temp", this.value);
                            // text
                            $(cellInput).siblings(`.editableText`).text(this.value);
                            // cell
                            cellInput.closest('td').addClass('border-2 border-green-500 bg-green-500 bg-opacity-10');
                        }
                    });
                });
            }

            $('.alertManufactIdButton').off('click').on('click', function () {
                alert($(this).data('manufactid'));
            });
        },
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
fnInitComplete: function () { },
order: false,
keys: true
  };
  createdAutomatTableTableOptions.serverSide = true;
  createdAutomatTableTableOptions.processing = true;
  
  let createdAutomatTableRightClick = [{'name': "datatablesPage.table2.contextMenu.edit", 'click': function (rowData) {
                    alert(`Edit: ${rowData.manufactId}`);
                }},{'name': "datatablesPage.table2.contextMenu.delete", 'click': function (rowData) {
                    alert(`Delete: ${rowData.manufactId}`);
                }},{'name': "datatablesPage.table2.contextMenu.test", 'click': function (rowData) {
                    commonFunctions.openModal(500, 600, rowData.manufactId);
                }}];
  let createdAutomatTableKeyFocusFunction = function (e, datatable, cell, originalEvent) {
            $(".editableTdInput").blur();

            let input = (cell.node != undefined) ? $(cell.node()).find(".editableTdInput") : '';
            if (input.length) {
                input.removeClass("hidden");
                input.siblings(".editableText").addClass("hidden");
                input.focus().select();

                let firstVal = input.data("first");
                let tempVal = input.data("temp");
                let updateName = input.data("name");
                let rowData = datatable.row(cell.index().row).data();

                input.off("keydown.tdInputKeydown").on("keydown.tdInputKeydown", function (e) {
                    if (e.keyCode === 13 || e.keyCode === 9) {
                        e.preventDefault();
                        input.blur();
                    } else if (e.keyCode === 27) {
                        e.preventDefault();
                        input.val(tempVal);
                        input.blur();
                    } else if (
                        (e.keyCode >= 48 && e.keyCode <= 57) || // Numbers
                        (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad
                        e.keyCode === 8 || // Backspace
                        e.keyCode === 46 || // Delete
                        e.keyCode === 37 || // Left Arrow
                        e.keyCode === 38 || // Up Arrow
                        e.keyCode === 39 || // Right Arrow
                        e.keyCode === 40 // Down Arrow
                    ) {
                        return true;
                    } else {
                        e.preventDefault();
                        return false;
                    }
                });

                input.off("blur.tdInputBlur").on("blur.tdInputBlur", function () {
                    input.addClass("hidden");
                    input.siblings(".editableText").removeClass("hidden");
                    let inputVal = input.val();
                    if (inputVal === null || inputVal === "") {
                        input.val(firstVal);
                    }
                    if (String(inputVal) != String(firstVal)) {
                        add2UpdatedCells(updateName, rowData.manufactId, inputVal, rowData);
                        input.data("temp", inputVal);
                        input.siblings(".editableText").text(inputVal);
                        $(cell.node()).addClass("border-2 border-green-500 bg-green-500 bg-opacity-10");
                    } else {
                        remove2UpdatedCells(updateName, rowData.manufactId);
                        $(cell.node()).removeClass("border-2 border-green-500 bg-green-500 bg-opacity-10");
                    }
                });
            }
        };
  let createdAutomatTableKeyFunction = function (e, datatable, key, cell, originalEvent) {
            let input = (cell != undefined) ? $(cell.node()).find(".editableTdInput") : '';
            if (input.length) {
                if (key === 13) {
                    if (!input.is(":focus")) {
                        input.focus().select();
                    }
                }
            }
        };
  let createdAutomatTableOptions = {"rowSelect":true,"rightClick":[{"name":"datatablesPage.table2.contextMenu.edit"},{"name":"datatablesPage.table2.contextMenu.delete"},{"name":"datatablesPage.table2.contextMenu.test"}]}
  
  createdAutomatTableOptions["rightClick"] = createdAutomatTableRightClick;
  createdAutomatTableOptions['keyFocus'] = createdAutomatTableKeyFocusFunction;
  createdAutomatTableOptions['key'] = createdAutomatTableKeyFunction;
  
  
  
  let createdAutomatTableOperations = {"add":{"title":"datatablesPage.table2.add","url":"http://localhost:44350/production/set-automat","method":"POST","data":[{"name":"plaka","title":"datatablesPage.table2.plate","type":"string","required":true,"value":"","placeholder":"xxx-xx-xxx","errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plate must be longer than 4 characters."}],"keydown":{"maxLength":14},"visible":true},{"name":"model","title":"datatablesPage.table2.model","type":"select","required":true,"options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"serialNumber","title":"Serial number","type":"number","required":true,"value":"","placeholder":"xxxxxxxxxxx","showAllErrors":true,"errorChecks":[{"control":"return value != null && value != '' && value.length > 7","errMessage":"Serial number must be longer than 7 characters."},{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":14,"bannedKeys":["68-90",32]},"visible":true},{"name":"androidImei","title":"Android imei","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value == '' || value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":10},"visible":true},{"name":"defaultData","value":true,"keydown":{"maxLength":10},"visible":false}]},"edit":{"title":"datatablesPage.table2.edit","url":"http://localhost:44350/production/update-automat","method":"POST","data":[{"name":"manufactId","value":"selectedRow.manufactId","visible":false},{"name":"plaka","value":"selectedRow.plate","visible":false},{"name":"serialNumber","value":"selectedRow.snAndroid","visible":false},{"name":"model","title":"datatablesPage.table2.model","type":"select","value":"selectedRow.modelID","options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"androidImei","title":"Android imei","type":"string","value":"selectedRow.imeiAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","value":"selectedRow.macAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","value":"selectedRow.imeimodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","value":"selectedRow.macmodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","value":"selectedRow.imeiplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","value":"selectedRow.macplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true}]},"delete":{"url":"http://localhost:44350/production/delete-automat","method":"POST","data":{"manufactIds":["selectedRow.manufactId"]}}}
  

  var createdAutomatTable2;
  
  let createdAutomatTable2Columns = [
    {
      order: 0,
      title: "Plate",
      data: "plate",
      name: "plate",
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
      className: ""
    },{
      order: 1,
      title: "Model",
      data: "model",
      name: "model",
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
      className: ""
    },{
      order: 2,
      title: "Android Imei",
      data: "imeiAndroid",
      name: "imeiAndroid",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 3,
      title: "Android Mac",
      data: "macAndroid",
      name: "macAndroid",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 4,
      title: "Modem Imei",
      data: "imeimodem",
      name: "imeimodem",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 5,
      title: "Modem Mac",
      data: "macmodem",
      name: "macmodem",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 6,
      title: "PLC Imei",
      data: "imeiplc",
      name: "imeiplc",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 7,
      title: "PLC Mac",
      data: "macplc",
      name: "macplc",
      checkable: true,
      orderable: false,
      render: null,
      className: ""
    },{
      order: 8,
      title: "Test",
      data: "null",
      name: "null",
      checkable: true,
      orderable: false,
      render: function (data, type, row) {
                return `<div class="w-full h-full flex px-2 items-center"><button data-manufactid='${row.manufactId}' class="alertManufactIdButton notSelectRow px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">Test</button></div>`;
            },
      className: ""
    }
  ];
  
  let createdAutomatTable2Filters = { data: [{"data":"plate","name":"datatablesPage.table3.plate","type":"text","value":null,"default":null,"visible":true},{"data":"model","name":"Model","type":"select2","options":{"width":"100%","minimumInputLength":-1,"placeholder":"Model Selection","allowClear":true,"language":{"noResults":"Eşleşen bir Model bulunamadı.","inputTooShort":"En az 1 Karakter giriniz.","searching":"Aranıyor..."},"ajax":{"url":"http://localhost:44350/production/get-models","delay":250,"type":"POST","dataType":"json","contentType":"application/json; charset=utf-8"}},"value":null,"default":null,"visible":true},{"data":"androidImei","name":"Android Imei","type":"text","value":null,"default":null,"visible":true},{"data":"androidMac","name":"Android Mac","type":"text","value":null,"default":null,"visible":true},{"data":"modemImei","name":"Modem Imei","type":"text","value":null,"default":null,"visible":true},{"data":"modemMac","name":"Modem Mac","type":"text","value":null,"default":null,"visible":true},{"data":"plcImei","name":"PLC Imei","type":"text","value":null,"default":null,"visible":true},{"data":"plcMac","name":"PLC Mac","type":"text","value":null,"default":null,"visible":true}] }
  createdAutomatTable2Filters.beforeApply = function () {
            console.log('test apply');
            console.log('test apply');
        };
  createdAutomatTable2Filters.beforeReset = function () {
            console.log('test reset');
            console.log('test reset');
        };
  
  
  let createdAutomatTable2Ajax = {
    url: "http://localhost:44350/production/get-manufacts",
    type: "POST",
    dataSrc: function (json) { return json.responseData; },
    data: function(d) {
      d.changedCells = $('#showChangedCells').is(':checked') && $('#showChangedCells').is(':visible')  ?  createdAutomatTableCellUpdates.map(item => (item.id)) : null;
d.forTest = 4
      datatableService.updateTableAjaxData("createdAutomatTable2", d, createdAutomatTable2Filters.data);
      datatableService.showSelectedRowsAjaxData("createdAutomatTable2", d, {"dataName":"selectedRows","targetData":"manufactId"});
    }
  };
  
  let createdAutomatTable2TableOptions = {
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
order: false
  };
  createdAutomatTable2TableOptions.serverSide = true;
  createdAutomatTable2TableOptions.processing = true;
  
  let createdAutomatTable2RightClick = [{'name': "datatablesPage.table3.contextMenu.edit", 'click': function (rowData) {
                    alert(`Edit: ${rowData.manufactId}`);
                }},{'name': "datatablesPage.table3.contextMenu.delete", 'click': function (rowData) {
                    alert(`Delete: ${rowData.manufactId}`);
                }},{'name': "datatablesPage.table3.contextMenu.test", 'click': function (rowData) {
                    commonFunctions.openModal(500, 600, rowData.manufactId);
                }}];
  let createdAutomatTable2KeyFocusFunction = false
  let createdAutomatTable2KeyFunction = false
  let createdAutomatTable2Options = {"customButtons":[{"html":"<i class='fa-solid fa-arrows-rotate text-xl'></i>","id":"refreshTableButton","title":"Yenile"}],"rowSelect":false,"multiRowSelect":true,"showSelectedRows":{"dataName":"selectedRows","targetData":"manufactId"},"rightClick":[{"name":"datatablesPage.table3.contextMenu.edit"},{"name":"datatablesPage.table3.contextMenu.delete"},{"name":"datatablesPage.table3.contextMenu.test"}],"footerColumns":[{"column":0,"colspan":2},{"column":3,"colspan":3}]}
  
  createdAutomatTable2Options["rightClick"] = createdAutomatTable2RightClick;
  createdAutomatTable2Options['keyFocus'] = createdAutomatTable2KeyFocusFunction;
  createdAutomatTable2Options['key'] = createdAutomatTable2KeyFunction;
  
  createdAutomatTable2Options.customButtons[0].onclick = function () {
                    createdAutomatTable2.ajax.reload();
                };
  
  let createdAutomatTable2Operations = {"add":{"title":"datatablesPage.table3.add","url":"http://localhost:44350/production/set-automat","method":"POST","data":[{"name":"plaka","title":"datatablesPage.table3.plate","type":"string","required":true,"value":"","placeholder":"xxx-xx-xxx","errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plate must be longer than 4 characters."}],"keydown":{"maxLength":14},"visible":true},{"name":"model","title":"datatablesPage.table3.model","type":"select","required":true,"options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"serialNumber","title":"Serial number","type":"number","required":true,"value":"","placeholder":"xxxxxxxxxxx","showAllErrors":true,"errorChecks":[{"control":"return value != null && value != '' && value.length > 7","errMessage":"Serial number must be longer than 7 characters."},{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":14,"bannedKeys":["68-90",32]},"visible":true},{"name":"androidImei","title":"Android imei","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","required":true,"value":"","placeholder":"xx-xx-xx-xx","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","required":true,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return value == '' || value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","required":false,"value":"","showAllErrors":false,"errorChecks":[{"control":"return !value.startsWith('000')","errMessage":"Serial number cannot start with 000."}],"keydown":{"maxLength":10},"visible":true},{"name":"defaultData","value":true,"keydown":{"maxLength":10},"visible":false}]},"edit":{"title":"datatablesPage.table3.edit","url":"http://localhost:44350/production/update-automat","method":"POST","data":[{"name":"manufactId","value":"selectedRow.manufactId","visible":false},{"name":"plaka","value":"selectedRow.plate","visible":false},{"name":"serialNumber","value":"selectedRow.snAndroid","visible":false},{"name":"model","title":"datatablesPage.table3.model","type":"select","value":"selectedRow.modelID","options":[{"value":"","label":"Seçim yapınız"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-91"},{"value":"CD636047-CE35-43D4-A82D-AF0943BB63BE","label":"AA-92"}],"required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != ''","errMessage":"Model cannot be null."}],"visible":true},{"name":"androidImei","title":"Android imei","type":"string","value":"selectedRow.imeiAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"androidMac","title":"Android mac","type":"string","value":"selectedRow.macAndroid","placeholder":"xx-xx-xx-xx","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Android mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemImei","title":"Modem imei","type":"string","value":"selectedRow.imeimodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"modemMac","title":"Modem mac","type":"string","value":"selectedRow.macmodem","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Modem mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcImei","title":"Plc imei","type":"string","value":"selectedRow.imeiplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc imei must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true},{"name":"plcMac","title":"Plc mac","type":"string","value":"selectedRow.macplc","required":true,"showAllErrors":false,"errorChecks":[{"control":"return value != null && value != '' && value.length > 4;","errMessage":"Plc mac must be longer than 4 characters."}],"keydown":{"maxLength":10},"visible":true}]},"delete":{"url":"http://localhost:44350/production/delete-automat","method":"POST","data":{"manufactIds":"selectedRow.manufactId"}}}
  
        
      
        onMounted(() => {
          transferedAutomatTable = datatableService.initializeDataTable('transferedAutomatTable', '#transferedAutomatTable', transferedAutomatTableAjax, transferedAutomatTableColumns, transferedAutomatTableFilters, transferedAutomatTableTableOptions, transferedAutomatTableOperations, transferedAutomatTableOptions);
createdAutomatTable = datatableService.initializeDataTable('createdAutomatTable', '#createdAutomatTable', createdAutomatTableAjax, createdAutomatTableColumns, createdAutomatTableFilters, createdAutomatTableTableOptions, createdAutomatTableOperations, createdAutomatTableOptions);
createdAutomatTable2 = datatableService.initializeDataTable('createdAutomatTable2', '#createdAutomatTable2', createdAutomatTable2Ajax, createdAutomatTable2Columns, createdAutomatTable2Filters, createdAutomatTable2TableOptions, createdAutomatTable2Operations, createdAutomatTable2Options);
          
      
          
$('#showChangedCells').on('change', function () {
    createdAutomatTable.ajax.reload();
});

        });
  
        watch(locale, () => {
          transferedAutomatTable.destroy();
          transferedAutomatTable = null;
          transferedAutomatTable = datatableService.initializeDataTable('transferedAutomatTable', '#transferedAutomatTable', transferedAutomatTableAjax, transferedAutomatTableColumns, transferedAutomatTableFilters, transferedAutomatTableTableOptions, transferedAutomatTableOperations, transferedAutomatTableOptions);
          });
watch(locale, () => {
          createdAutomatTable.destroy();
          createdAutomatTable = null;
          createdAutomatTable = datatableService.initializeDataTable('createdAutomatTable', '#createdAutomatTable', createdAutomatTableAjax, createdAutomatTableColumns, createdAutomatTableFilters, createdAutomatTableTableOptions, createdAutomatTableOperations, createdAutomatTableOptions);
          });
watch(locale, () => {
          createdAutomatTable2.destroy();
          createdAutomatTable2 = null;
          createdAutomatTable2 = datatableService.initializeDataTable('createdAutomatTable2', '#createdAutomatTable2', createdAutomatTable2Ajax, createdAutomatTable2Columns, createdAutomatTable2Filters, createdAutomatTable2TableOptions, createdAutomatTable2Operations, createdAutomatTable2Options);
          });
  
        document.addEventListener('keydown', function (e) {
      const pressedKeys = new Set();
  
      // Modifier tuşlar
      if (e.ctrlKey) pressedKeys.add('ctrl');
      if (e.shiftKey) pressedKeys.add('shift');
      if (e.altKey) pressedKeys.add('alt');
      if (e.metaKey) pressedKeys.add('meta');
  
      // Basılan tuş
      pressedKeys.add(e.key.toLowerCase());
  
      // Shortcut 1: [ctrl + k]
      if (['ctrl', 'k'].every(k => pressedKeys.has(k)) && pressedKeys.size === 2) {
        e.preventDefault();
        (function () {
                alert('Ctrl + K pressed!');
            })();
      }// Shortcut 2: [p]
      if (['p'].every(k => pressedKeys.has(k)) && pressedKeys.size === 1) {
        e.preventDefault();
        (function () {
                console.log('P pressed!');
            })();
      }
    });
      
         
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

      </script>
      
      <style scoped>
        
    #changesModal { 
        display:none;     
    }
    #changesModal.show { 
        display:flex;     
    }

      </style>