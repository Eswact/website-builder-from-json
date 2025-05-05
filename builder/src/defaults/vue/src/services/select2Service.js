import $ from 'jquery';
import "select2/dist/css/select2.css";
import '../scripts/cdn/select2';
import i18n from './languageService';
const t = i18n.global.t;

const select2Service = {
    defaultSelect2Options: {
        width: "100%",
        minimumInputLength: -1,
        placeholder: t("defaults.selectOption"),
        language: {
            noResults: function() { return "No matching results found." },
            inputTooShort: function() { return "Enter at least 1 character." },
            searching: function() { return "Searching..." }
        },
    },

    createSelect2: function(dom, options, selectedValue = null) {
        let thisHelper = this;
        if (options?.ajax) {
            options = thisHelper.setAjaxOption(options);
        }
        if (options?.language) {
            options = thisHelper.setLanguageOption(options);
        }
        if (options?.placeholder && !options._originalPlaceholder) {
            options._originalPlaceholder = options.placeholder;
        }
        if (options._originalPlaceholder) {
            options.placeholder = t(options._originalPlaceholder);
        }
        if (selectedValue) {
            thisHelper.setSelectedValue(dom, selectedValue);
        }
        const finalOptions = { ...thisHelper.defaultSelect2Options, ...options };
        $(dom).select2(finalOptions);
    },
    setLanguageOption: function (options) {
        if (!options.language) return;
        options.language = Object.fromEntries(
            Object.entries(options.language).map(([key, value]) => [key, typeof value === "string" ? () => value : value])
        );
        return options;
    },
    setAjaxOption: function (options) {
        if (!options.ajax) return;
        options.ajax.data = function (params) {
            console.log(params);
            console.log(params.term);
            return JSON.stringify(params.term);
        };
        options.ajax.processResults = function (data, params) {
            return {
                results: $.map(data.data || data, function (item) {
                    return {
                        id: item.id,
                        text: item.name
                    };
                })
            };
        }
        return options;
    },
    setSelectedValue: function(dom, selectedValue) {
        if (!selectedValue) return;
        let $select = $(dom);

        let optionExists = $select.find(`option[value="${selectedValue.id}"]`).length > 0;
        console.log(optionExists);
        if (!optionExists) {
            let newOption = new Option(selectedValue.text, selectedValue.id, true, true);
            $select.append(newOption).trigger('change');
        } else {
            $select.val(selectedValue.id).trigger('change');
        }
    }
}

export default select2Service;