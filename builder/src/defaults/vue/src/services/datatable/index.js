import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-colreorder';
import 'datatables.net-keytable';
import '../../styles/dataTables.dataTables.css';

import tablePrefsUtils from './utils/tablePrefs';
import tableFiltersUtils from './utils/tableFilters';
import tableAddOperation from './utils/tableAddOperation';
import tableEditOperation from './utils/tableEditOperation';
import tableDeleteOperation from './utils/tableDeleteRow';
import tableSelectedRow from './utils/tableSelectedRow';
import reloadTable from './utils/tableReload';

import commonFunctions from '../../scripts/common';
import { toast } from "vue3-toastify";
import i18n from '../languageService';
const t = i18n.global.t;

const datatableService = {
    // initialize datatable
    initializeDataTable: function (name, selector, ajaxReq, tableColumns, tableFilters, originTableOptions = {}, operations = {}, options = {}) {
        let thisHelper = this;
        
        // selectedRow reset
        tableSelectedRow.selectedRow[name] = {};

        // table columns order
        tableColumns = tableColumns.sort((a, b) => a.order - b.order);

        // table prefs
        let tablePrefs = thisHelper.initTablePrefs(tableColumns, name);

        // table default options
        const defaultTableOptions = thisHelper.initDefaultTableOptions(tableColumns, tablePrefs, name);
    
        // table ajax
        if (ajaxReq) {
            // ajaxReq.xhrFields = { withCredentials: true };
            defaultTableOptions.ajax = ajaxReq
            if (!defaultTableOptions.ajax.error) {
                defaultTableOptions.ajax.error = function(xhr, error, thrown) {
                    console.error("API Hatası:", error, thrown);
                    toast.error("Veriler yüklenirken bir hata oluştu! Tablo oluşturulamadı! Tekrar denemek için sayfayı yenileyebilirsiniz.");
                    $(`#${name}`).DataTable().destroy();
                    $(`#${name}`).addClass('hidden');
                }
            }
        }

        // table options
        let tableOptions = { ...originTableOptions };
    
        // fnInitComplete
        thisHelper.setFnInitComplete(tableOptions, name, tableColumns, tableFilters, operations, options);

        // drawCallback
        thisHelper.setDrawCallback(tableOptions, name, tableColumns, options);

        // fnRowCallBack
        thisHelper.setFnRowCallback(tableOptions, name, tableColumns, options);

        // footerCallback
        thisHelper.setFooterCallback(tableOptions, name, tableColumns, options);
    
        // final options
        const finalTableOptions = { ...defaultTableOptions, ...tableOptions };
        
        // initialize datatable
        return $(selector).DataTable(finalTableOptions);
    },
    // initialize datatable parts
    initTablePrefs: function(tableColumns, name) {
        let tablePrefs;
        if (tablePrefsUtils.getTablePrefs(name) && tablePrefsUtils.getTablePrefs(name).length == tableColumns.length) {
            tablePrefs = JSON.parse(localStorage.getItem(`${name}Prefs`));
        }
        else {
            tablePrefs = tableColumns.map((column, index) => { return {name:column.name, order:column.order, visible:column.visible != false} });
            tablePrefsUtils.setTablePrefs(name, tablePrefs);
        }
        return tablePrefs;
    },
    initDefaultTableOptions: function (tableColumns, tablePrefs, name) {
        const columnDefinitions = tableColumns.map(column => ({
            data: column.data,
            name: column.name,
            title: t(column.title),
            visible: tablePrefs.find(pref => pref.name == column.name).visible,
            orderable: column.orderable != false,
            render: column.render || ((data, type, row) => data || ''),
            className: column.className || '',
        }));

        const defaultTableOptions = {
            columns: columnDefinitions,
            scrollX: true,
            dom: `<"w-full flex justify-between items-center md:flex-col md:gap-2 md:justify-center py-2"<"${name}Toolbar"><l>>rt<"w-full flex justify-between items-center md:flex-col-reverse gap-2 md:justify-center py-2 px-4 rounded-b-lg bg-second text-white"<i><p>>`,
            colReorder: {
                order: tablePrefs.map((column, index) => { return tableColumns.find(pref => pref.name == column.name).order; }),
            },
            paging: true,
            pagingType: 'numbers',
            stripeClasses: ['stripe1','stripe2'],
            language: {
                info: t("defaults.datatable.info"),
                infoEmpty: t("defaults.datatable.infoEmpty"),
                loadingRecords: t("defaults.datatable.loadingRecords"),
                lengthMenu: t("defaults.datatable.lengthMenu"),
                zeroRecords: `<div class="w-full flex flex-col justify-center items-center gap-2">
                                    <img src="/defaults/images/not-found.gif" :alt="${t('defaults.datatable.zeroRecords')}" />
                                    <h2 class="text-3xl font-bold text-second dark:text-white pb-4">${t('defaults.datatable.zeroRecords')}</h2>
                                </div>`,
                infoFiltered: t("defaults.datatable.infoFiltered"),
                paginate: {
                    first: "<<",
                    previous: "<",
                    next: ">",
                    last: ">>",
                },
                processing: `<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"><img src="/images/loading.gif" /></div>`
            },
        };

        return defaultTableOptions;
    },
    setFnInitComplete: function(tableOptions, name, tableColumns, tableFilters, operations, options) {
        let thisHelper = this;
        let userFnInitComplete = false;
        if (tableOptions.fnInitComplete) {
            userFnInitComplete = tableOptions.fnInitComplete;
        }
        tableOptions.fnInitComplete = function () {
            $(`.${name}Toolbar`).html(`<div class="flex flex-col items-start gap-2">
                ${options.multiRowSelect == true
                    ? `<div data-name=${name} class="selectedRowsLabel hidden items-center gap-6 text-lg px-2">
                        <div class="flex items-end gap-2"><span data-name=${name} class="selectedRowsCounter font-bold text-2xl text-third"></span><span class="font-semibold">Rows selected</span></div>
                        <button data-table=${name} class="removeSelectedRows px-2 py-1 font-semibold bg-third hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md rounded-lg">Remove selected</button>
                        ${options.showSelectedRows ? `<label for="${name}ShowSelected" class="flex items-center gap-2 px-2 py-1 bg-second/75 hover:bg-second text-bg rounded-lg"><input id="${name}ShowSelected" name="${name}ShowSelected" class="showSelectedRow" type="checkbox"></input><span class="font-semibold select-none">Show selected rows</span></label>` : ''}
                    </div>`
                    : ''
                }    
                <div class="flex items-center gap-2">
                    <button id="open${name}CT" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                        <i class="fa-solid fa-eye text-xl"></i>
                        <span class="font-semibold md:hidden">${t("defaults.visibility")}</span>
                    </button>
                    ${tableFilters
                        ? `<button id="open${name}Filters" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                                <i class="fa-solid fa-magnifying-glass text-xl"></i>
                                <span class="font-semibold md:hidden">${t("defaults.filters")}</span>
                                <span class="filterCounter font-semibold hidden"></span>
                            </button>`
                        :''
                    }
                    ${operations.add || operations.edit || operations.delete
                        ? '<div class="w-[2px] h-10 bg-main/75 mx-2"></div>'
                        : ''
                    }
                    ${operations.add
                        ? `<button id="add${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg">
                                <i class="fa-solid fa-plus text-xl"></i>
                            </button>`
                        :''
                    }
                    ${operations.edit
                        ? `<button id="edit${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                                <i class="fa-solid fa-pencil text-xl"></i>
                            </button>`
                        :''
                    }
                    ${operations.delete
                        ? `<button id="delete${name}Row" class="p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50" disabled>
                                <i class="fa-solid fa-trash-can text-xl"></i>
                            </button>`
                        :''
                    }
                    ${options && options.customButtons && options.customButtons.length > 0
                        ? `<div class="w-[2px] h-10 bg-main/75 mx-2"></div>
                            ${options.customButtons.map((button, index) => {
                                return `<button id="${button.id}" data-index="${index}" data-table="${name}" title=${button.title} class="customButton p-2 px-4 flex items-center gap-2 bg-main hover:bg-opacity-80 duration-200 dark:bg-opacity-70 dark:hover:bg-opacity-100 text-white shadow-md text-xl rounded-lg disabled:opacity-50">${button.html}</button>`
                            }).join('')}`
                        : ''
                    }
                </div>
            </div>`);
            $(`#open${name}CT`).off('click').on('click', () => tablePrefsUtils.openCTModal(name, tableColumns));
            $(`#open${name}Filters`).off('click').on('click', () => tableFiltersUtils.openFiltersModal(name, tableFilters));
            $(`#add${name}Row`).off('click').on('click', () => tableAddOperation.openAddRowModal(name, operations.add));
            $(`#edit${name}Row`).off('click').on('click', () => tableEditOperation.openEditRowModal(name, operations.edit));
            $(`#delete${name}Row`).off('click').on('click', () => tableDeleteOperation.deleteRow(name, operations.delete));

            if (options && options.customButtons && options.customButtons.length > 0) {
                options.customButtons.forEach((button, index) => {
                    $(`.customButton[data-index=${index}][data-table=${name}]`).off('click').on('click', button.onclick);
                });
            }

            if (options && options.rowSelect && !options.multiRowSelect) {
                $(`#${name}`).DataTable().off('click', 'tbody tr').on('click', 'tbody tr', (e) => {
                    if (e.target.classList.contains('notSelectRow')) {
                        return;
                    }
                    const row = $(`#${name}`).DataTable().row(e.currentTarget).data();
                    const isSelected = e.currentTarget.classList.contains('selected');

                    if (!isSelected) {
                        tableSelectedRow.selectedRow[name] = row;
                        $(`#${name}`).DataTable().rows('.selected').nodes().each((row) => row.classList.remove('selected'));
                        $(`#edit${name}Row, #delete${name}Row`).prop('disabled', false);
                    } else {
                        tableSelectedRow.selectedRow[name] = {};
                        $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true);
                    }

                    e.currentTarget.classList.toggle('selected');
                });
            }

            if (options && options.multiRowSelect) {
                $(`#${name}`).DataTable().off('click', 'tbody tr').on('click', 'tbody tr', (e) => {
                    if (e.target.classList.contains('notSelectRow')) {
                        return;
                    }
                    const row = $(`#${name}`).DataTable().row(e.currentTarget).data();
                    const isSelected = e.currentTarget.classList.contains('selected');

                    if (!isSelected) {
                        tableSelectedRow.selectedRow[name].length ? tableSelectedRow.selectedRow[name].push(row) : tableSelectedRow.selectedRow[name] = [row];
                        $(`#delete${name}Row`).prop('disabled', false);
                        (tableSelectedRow.selectedRow[name].length > 1)
                            ? $(`#edit${name}Row`).prop('disabled', true)
                            : $(`#edit${name}Row`).prop('disabled', false);
                    } else {
                        tableSelectedRow.selectedRow[name] = tableSelectedRow.selectedRow[name].filter(item => JSON.stringify(item) !== JSON.stringify(row));
                        if (tableSelectedRow.selectedRow[name].length) {
                            (tableSelectedRow.selectedRow[name].length > 1)
                                ? $(`#edit${name}Row`).prop('disabled', true)
                                : $(`#edit${name}Row`).prop('disabled', false);
                        }
                        else {
                            $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true);
                        }
                    }

                    e.currentTarget.classList.toggle('selected');
                    tableSelectedRow.multiRowSelectLabelUpdate(name);
                });

                $(`.removeSelectedRows[data-table=${name}]`).off('click').on('click', () => {
                    tableSelectedRow.selectedRow[name] = [];
                    $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true);
                    tableSelectedRow.multiRowSelectLabelUpdate(name);
                    $(`#${name}`).DataTable().rows('.selected').nodes().each((row) => row.classList.remove('selected'));
                });
            }

            if (options && options.showSelectedRows) {
                $(`#${name}ShowSelected`).off('change').on('change', () => {
                   reloadTable(name); 
                });
            }

            if (options && options.keyFocus) {
                $(`#${name}`).DataTable().off('key-focus').on('key-focus', function (e, datatable, cell, originalEvent) {
                    options.keyFocus(e, datatable, cell, originalEvent);
                });
                
            }
            if (options && options.key) {
                $(`#${name}`).DataTable().off('keydown').on('keydown', function (e, datatable, key, cell, originalEvent) {
                    options.key(e, datatable, key, cell, originalEvent);
                });
            }
            if (userFnInitComplete) {
                userFnInitComplete.apply(this, arguments);
            }
        };
    },
    setDrawCallback: function(tableOptions, name, tableColumns, options) { 
        let thisHelper = this;
        let userDrawCallback = false;
        if (tableOptions.drawCallback) {
            userDrawCallback = tableOptions.drawCallback;
        }
        tableOptions.drawCallback = function () {
            if (options && options.rowSelect && !options.multiRowSelect) {
                const table = $(`#${name}`).DataTable();
                const selected = tableSelectedRow.selectedRow[name];
                (JSON.stringify(selected) === JSON.stringify({})) ? $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true) : null;

                table.rows().every(function () {
                    const row = this.data();
                    if (JSON.stringify(selected) == JSON.stringify(row)) {
                        $(this.node()).addClass('selected');
                    }
                });
            }

            if (options && options.multiRowSelect) {
                const table = $(`#${name}`).DataTable();
                const selectedRows = tableSelectedRow.selectedRow[name];
                if (selectedRows.length) {
                    $(`#delete${name}Row`).prop('disabled', false)
                    selectedRows.length > 1
                        ? $(`#edit${name}Row`).prop('disabled', true)
                        : $(`#edit${name}Row`).prop('disabled', false);
                }
                else {
                    $(`#edit${name}Row, #delete${name}Row`).prop('disabled', true);
                }

                table.rows().every(function () {
                    const row = this.data();
                    if (selectedRows.length) {
                        selectedRows.forEach(selected => {
                            if (JSON.stringify(selected) == JSON.stringify(row)) {
                                $(this.node()).addClass('selected');
                            }
                        });
                    }
                });
            }

            if (options && options.rightClick) {
                const table = $(`#${name}`).DataTable();
                $(`#${name} tbody`).off("contextmenu").on("contextmenu", "tr", function (e) {
                    e.preventDefault();

                    const row = table.row(this);
                    const rowData = row.data();

                    const rightClickMenu = options.rightClick.map(option => {
                        return {
                            name: option.name,
                            click: option.click,
                            data: rowData
                        };
                    });
                    // console.log(rightClickMenu);

                    commonFunctions.createRightClickMenu(e, rightClickMenu);
                });
            }

            if (userDrawCallback) {
                userDrawCallback.apply(this, arguments);
            }
        };
    },
    setFnRowCallback: function(tableOptions, name, tableColumns, options) { 
        let thisHelper = this;
        let userFnRowCallBack = false;
        if (tableOptions.fnRowCallBack) {
            userFnRowCallBack = tableOptions.fnRowCallBack;
        }
        tableOptions.fnRowCallBack = function () {

            if (userFnRowCallBack) {
                userFnRowCallBack.apply(this, arguments);
            }
        };
    },
    setFooterCallback: function(tableOptions, name, tableColumns, options) { 
        let thisHelper = this;
        let userFooterCallback = false;
        if (tableOptions.footerCallback) {
            userFooterCallback = tableOptions.footerCallback;
        }
        tableOptions.footerCallback = function () {
            if (userFooterCallback) {
                userFooterCallback.apply(this, arguments);
            }
        };
    },


    // for sending data in datatable ajax request
    updateTableAjaxData: function(name, d, filters) {
        filters.map(function(filter, index) {
            d[filter.data] = filter.value
        }).join(';');

        let filterCounter = filters.filter(filter => filter.visible && filter.value != '' && filter.value != null).reduce((i, e) => (e.value != e.default) ? i + 1 : 0, 0);
        if (filterCounter > 0) {
            $(`#open${name}Filters .filterCounter`).html(`(${filterCounter})`);
            $(`#open${name}Filters .filterCounter`).removeClass('hidden');
        } else {
            $(`#open${name}Filters .filterCounter`).html(``);
            $(`#open${name}Filters .filterCounter`).addClass('hidden');
        }
    },
    showSelectedRowsAjaxData: function(name, d, showSelectedRows) {
        let thisHelper = this;
        let returnData = [];
        if ($(`#${name}ShowSelected`).is(':checked') && (Array.isArray(tableSelectedRow.selectedRow[name]) && tableSelectedRow.selectedRow[name]?.length > 0)) {
            console.log(tableSelectedRow.selectedRow[name][0][showSelectedRows.targetData]);  
            tableSelectedRow.selectedRow[name].map((row, index) => returnData.push(row[showSelectedRows.targetData]));
        }
        d[showSelectedRows.dataName] = returnData;
    },
};

export default datatableService;