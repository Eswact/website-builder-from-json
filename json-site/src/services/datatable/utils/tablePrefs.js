import $ from 'jquery';
import Sortable from 'sortablejs';
import commonFunctions from '../../../scripts/common';
import i18n from '../../languageService';
const t = i18n.global.t;

const tablePrefs = {
    getTablePrefs: function (name) {
        return JSON.parse(localStorage.getItem(`${name}Prefs`));
    },
    setTablePrefs: function (name, prefs) {
        prefs = prefs.sort((a, b) => a.order - b.order);
        localStorage.setItem(`${name}Prefs`, JSON.stringify(prefs));
    },
    openCTModal: function (table, tableColumns) {
        let thisHelper = this;

        let tablePrefs = thisHelper.getTablePrefs(table);
        tablePrefs = tablePrefs.sort((a, b) => a.order - b.order);
        let modalHtml = `<div class="w-full h-full max-h-full overflow-hidden flex flex-col gap-4">
                            <div class="w-full h-[15%] flex flex-col gap-2">
                                <h2 class="text-2xl font-bold">${t("defaults.visibilityHeader")}</h2>
                                <p>${t("defaults.visibilityDesc")}</p>
                            </div>
                            <div id="columnList" class="h-[calc(70%-2rem)]">
                                <ul class="w-full h-full overflow-y-auto flex flex-col gap-2">
                                    ${tablePrefs.map(function (column, index) {
            let thisColumn = tableColumns.find(item => item.name === column.name);
            return `<li data-order="${column.order}" data-realorder="${thisColumn.order}" class="select-none w-full flex items-center justify-between gap-2 p-4 border-2 border-dashed border-gray-300 rounded-md">
                                                    <label for="${column.name}Check" class="flex items-center gap-[0.75rem] w-[calc(100%-2.5rem)]">
                                                        ${thisColumn.checkable ? `<input id="${column.name}Check" class="w-6 h-6 accent-second rounded-lg" type="checkbox" ${column.visible ? 'checked' : ''} />` : ''}
                                                        <span class="text-[1.25rem] font-semibold">${t(thisColumn.title)}</span>
                                                    </label>
                                                    <i class="fa-solid fa-grip-vertical cursor-pointer text-[1.75rem] px-2 text-second"></i>
                                                </li>`}).join('')}
                                </ul>
                            </div>
                            <div class="w-full h-[15%] flex flex-col justify-between">
                                <button  id="save${name}CT" class="w-full bg-second text-white hover:bg-opacity-90 duration-200 font-semibold text-xl text-center py-2 rounded-lg">Save</button>
                                <button id="reset${name}CT" class="w-full border border-second text-second hover:bg-second hover:bg-opacity-10 duration-200 font-semibold text-xl text-center py-2 rounded-lg">Reset to default</button>
                            </div>
                        </div>`;
        commonFunctions.openModal(500, 640, modalHtml);
        let drag = document.querySelector('#columnList ul');
        new Sortable(drag, {
            animation: 150,
            handle: '#columnList ul li i',
            forceFallback: true
        });

        $(`#save${name}CT`).off('click').on('click', () => thisHelper.saveTablePrefs(table, tableColumns));
        $(`#reset${name}CT`).off('click').on('click', () => thisHelper.resetTablePrefs(table, tableColumns));
    },
    saveTablePrefs: function (table, tableColumns) {
        let newPrefs = [];
        let newOrder = [];
        $('#columnList ul li').each(function (i, column) {
            let thisColumn = tableColumns.find(item => item.order == $(column).data('realorder'));
            let thisColumnVisibility = ($(column).find('input').length) ? $(column).find('input').is(':checked') : true;
            newPrefs.push({ name: thisColumn.name, order: i, visible: thisColumnVisibility });
            newOrder.push($(column).data('realorder'));
        });
        //Order
        $(`#${table}`).DataTable().colReorder.order(newOrder, true);
        //Visibility
        $(tableColumns).each((i, column) => { $(`#${table}`).DataTable().column(column.name + ':name').visible(newPrefs.find(pref => pref.name == column.name).visible); });
        //Save
        localStorage.setItem(`${table}Prefs`, JSON.stringify(newPrefs));
        //Close
        commonFunctions.closeModal();
    },
    resetTablePrefs: function (table, tableColumns) {
        //Order
        $(`#${table}`).DataTable().colReorder.order(tableColumns.map((column, index) => index), true);
        //Visibility
        $(tableColumns).each((i, column) => { $(`#${table}`).DataTable().column(column.name + ':name').visible(column.visible != false); });
        //Save
        let defaultPrefs = tableColumns.map((column, index) => { return { name: column.name, order: column.order, visible: true } });
        this.setTablePrefs(table, defaultPrefs);
        //Close
        commonFunctions.closeModal();
    },
};

export default tablePrefs;