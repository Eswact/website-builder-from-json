import $ from 'jquery';
import { toast } from "vue3-toastify";
import reloadTable from './tableReload';
import commonFunctions from '../../../scripts/common';
import select2Service from '../../select2Service';
import i18n from '../../languageService';
const t = i18n.global.t;

const tableAddOperation = {
    openAddRowModal: function (table, addOperation) {
        let thisHelper = this;
        //Open Modal
        commonFunctions.openModal(500, 640, thisHelper.fillAddRowModal(addOperation));
        //Input Controls for Modal
        thisHelper.inputControls(addOperation);
        //Add Row Button
        thisHelper.addRowButtonClick(table, addOperation);
    },

    fillAddRowModal: function (addOperation) {
        let modalHtml = ``;
        let formHtml = '';
        addOperation.data.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${t(item.title)}`: `${t(item.title)}`}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.name}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                } else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${item.required ? `* ${t(item.title)}`: `${t(item.title)}`}</label>
                            <select id="${item.name}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg">
                                ${item.options.map(option => `
                                    <option value="${option.value}">${option.label}</option>
                                `).join('')}
                            </select>
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                }
            }
        });
        modalHtml = `<form class="w-full h-full flex flex-col justify-between items-center gap-4">
                            <h1 class="w-full text-2xl font-bold">${t(addOperation.title)}</h1>
                            <div class="w-full h-full overflow-y-auto flex flex-col gap-4">${formHtml}</div>
                            <button type="button" id="addRowButton" class="w-full text-xl font-bold py-2 rounded-md bg-main text-white tracking-widest">${t('defaults.add')}</button>
                        </form>`;
        return modalHtml;
    },

    inputControls: function (addOperation) {
        addOperation.data.forEach(item => {
            if (item.visible) {
                const input = document.getElementById(item.name);
                if (item.keydown) {
                    if (item.keydown.maxLength) {
                        let maxLength = item.keydown.maxLength;
                        $(input).on("keydown.maxLenght", function (e) {
                            let currentLength = e.target.value.length;
                            let allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                            if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        });
                        $(input).on("paste.maxLenght", function (e) {
                            let pastedText = e.originalEvent.clipboardData.getData("text");
                            if (e.target.value.length + pastedText.length > maxLength) {
                                e.preventDefault();
                            }
                        });
                    }
                    if (item.keydown.bannedKeys) {
                        let parsedBannedKeys = commonFunctions.parseBannedKeys(item.keydown.bannedKeys);
                        $(input).on("keydown.bannedKeys", function (e) {
                            if (parsedBannedKeys.includes(e.keyCode)) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        });
    },

    addRowButtonClick: function (table, addOperation) {
        $("#addRowButton").off('click').on("click", function () {
            let formData = {};
            let incorrectEntries = [];
            
            addOperation.data.forEach(item => {
                if (incorrectEntries.length > 0) { return; }

                if (item.visible) {
                    const input = document.getElementById(item.name);
                    input.classList.remove("border-red-500");
                    $(input).siblings(".itemError").addClass('hidden').text('');
            
                    // add to formData
                    formData[item.name] = input ? input.value : null;
            
                    // input controls
                    if (item.required && (input.value == null || input.value == "")) {
                        input.classList.add("border-red-500");
                        incorrectEntries.push('Zorunlu alanlar boş bırakılamaz');
                        if (!item.showAllErrors) {
                            return;
                        }
                    }
                    if (item.errorChecks && item.errorChecks.length > 0) {
                        item.errorChecks.forEach(errorCheck => {
                            if (!errorCheck.control) { return; }
                            const controlFunction = new Function("value", `${errorCheck.control};`);
                            if (!controlFunction(input.value)) {
                                input.classList.add("border-red-500");
                                $(input).siblings(".itemError").removeClass('hidden').text(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                incorrectEntries.push(errorCheck.errMessage || 'Hatalı giriş yapıldı');
                                if (!item.showAllErrors) {
                                    return;
                                }
                            }
                        });
                    }
                }
                else {
                    formData[item.name] = item.value;
                }
            });
        
            if (incorrectEntries.length > 0) {
                incorrectEntries.forEach(message => {
                    toast.error(message);
                });
                return;
            }
        
            $.ajax({
                url: addOperation.url,
                type: addOperation.method,
                data: formData,
                success: function (data) {
                    if (data.status == undefined || !data.status) {
                        toast.error(data.description || "İşlem başarısız");
                        return;
                    }
                    else {
                        toast.success(data.description || "İşlem başarılı");
                        reloadTable(table, true);
                        commonFunctions.closeModal();
                    }
                },
                error: function (err) {
                    toast.error(err.description || "İşlem başarısız");
                }
            });
        });
    }
};

export default tableAddOperation;