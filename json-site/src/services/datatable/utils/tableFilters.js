import $ from 'jquery';
import reloadTable from './tableReload';
import commonFunctions from '../../../scripts/common';
import select2Service from '../../select2Service';
import i18n from '../../languageService';
const t = i18n.global.t;

const tableFilters = {
    openFiltersModal: function(table, tableFilters) {
        this.fillFiltersModal(table, tableFilters);
        commonFunctions.openFilter();
    },

    fillFiltersModal: function(table, tableFilters) {
        let filterHtml = '';
        tableFilters.data.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${t(filter.name)}</label>
                                            <input type="text" data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" placeholder="${t(filter.name)}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                        </div>`;
                        break;
                    case 'select':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${t(filter.name)}</label>
                                            <select data-filter="${filter.data}" value="${filter.value ? filter.value : ''}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                                <option value="">${t('defaults.selectOption')}</option>
                                                ${filter.options.map(option => `<option value="${option.value}" ${filter.value == option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                                            </select>
                                        </div>`;
                        break;
                    case 'select2':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${t(filter.name)}</label>
                                            <select data-filter="${filter.data}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl  px-4 py-3 md:py-2 md:px-3">
                                                <option value=""></option>
                                            </select>
                                        </div>`;
                        break;
                    case 'check':
                        filterHtml += `<div class="w-full flex flex-col">
                                            <label class="font-semibold text-second text-md pl-1">${t(filter.name)}</label>
                                            <input type="checkbox" data-filter="${filter.data}" class="filterInput text-lg w-full h-[50px] md:h-auto border border-darkBg text-darkBg rounded-xl" ${filter.value ? 'checked' : ''}>
                                        </div>`;
                        break;
                }
            }
        });
        $('#tableFilterList').html(filterHtml);

        $(tableFilters.data.filter(filter => filter.type == 'select2' && filter.visible)).each((i, f) => {
            (f.value && f.selectedText)
                ? select2Service.createSelect2(`.filterInput[data-filter="${f.data}"]`, f.options, {id: f.value, text: f.selectedText})
                : select2Service.createSelect2(`.filterInput[data-filter="${f.data}"]`, f.options);
        });

        $('#filterModalApply').off('click').on('click', () => this.applyFilters(table, tableFilters));
        $('#filterModalReset').off('click').on('click', () => this.resetFilters(table, tableFilters));
    },

    applyFilters: function(table, tableFilters) {
        if (tableFilters.beforeApply) {
            tableFilters.beforeApply();
        }

        tableFilters.data.map(function(filter, index){
            if(filter.visible) {
                switch(filter.type) {
                    case 'text':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'select':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        break;
                    case 'select2':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).val();
                        filter.selectedText = $(`.filterInput[data-filter="${filter.data}"]`).text();
                        break;
                    case 'check':
                        filter.value = $(`.filterInput[data-filter="${filter.data}"]`).prop('checked');
                        break;
                }
            }
        });

        reloadTable(table);
        commonFunctions.closeFilter();
    },

    resetFilters: function(table, tableFilters) {
        if (tableFilters.beforeReset) {
            tableFilters.beforeReset();
        }

        tableFilters.data.map(function(filter, index){
            filter.value = filter.default;
        });

        reloadTable(table);
        commonFunctions.closeFilter();
    },
};

export default tableFilters;