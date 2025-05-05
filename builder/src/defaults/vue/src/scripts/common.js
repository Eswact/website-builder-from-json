import { ref } from "vue";
import siteDataJson from "../../siteData.json";
import i18n from '../services/languageService';
const t = i18n.global.t;

const defaultUnit = '₺';
const defaultSplash = {
  visible: false,
  defaultHtml: siteDataJson.contents.splashDefaultContent || `<img class="defaultImg" src="/defaults/images/loading.gif" />`,
  title: null,
  description: null,
  buttons: [],
  timeout: null,
};
const splash = ref({ ...defaultSplash });
let splashTimeout = null;

const commonFunctions = {
  openModal: function(width, height, html) {
    let sharedModalBg = document.getElementById('sharedModalBg');
    if (window.innerWidth >= 640) { //sm fullscreen
      width ? sharedModalBg.style.width = `${width}px` : sharedModalBg.style.width = 'auto';
      height ? sharedModalBg.style.height = `${height}px` : sharedModalBg.style.height = 'auto';
    }
    document.getElementById('sharedModal').classList.add('show');
    document.getElementById('sharedModalBody').innerHTML = html;
  },
  closeModal: function() {
    document.getElementById('sharedModal').classList.remove('show');
  },
  showConfirmationMessage: function(message, onClick) {
    let thisFunctions = this;

    let html = `<div class="flex flex-col items-center justify-center gap-4 px-8 py-4 sm:h-full"><h1 class="text-3xl font-bold text-black">${t('defaults.areYouSure')}</h1><p class="text-second max-w-[320px] sm:max-w-full text-center">${t(message)}</p><div class="flex gap-8 items-center justify-center mt-4"><button class="w-32 py-2 text-lg font-bold rounded-xl shadow-md hover:bg-opacity-75 bg-green-700 text-white" id="confirmModalApply">${t('defaults.ok')}</button><button class="w-32 py-2 text-lg font-bold rounded-xl shadow-md hover:bg-opacity-75 bg-red-700 text-white" id="confirmModalCancel">${t('defaults.cancel')}</button></div></div>`;
    thisFunctions.openModal(null, null, html);

    let confirmFunction = function () { onClick(); thisFunctions.closeModal(); };
    document.getElementById('confirmModalApply').addEventListener('click', confirmFunction);
    document.getElementById('confirmModalCancel').addEventListener('click', thisFunctions.closeModal);
  },
  updateSEO: function({ title, description, keywords }) {
    if (title) {
      document.title = title;
    }
    if (description) {
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords.join(", ");
    }
  },
  openFilter: function() {
    document.getElementById('tableFilterModal').classList.add('show');
  },
  closeFilter: function() {
    document.getElementById('tableFilterModal').classList.remove('show');
  },
  useSplashScreen: function (options) {
    if (splashTimeout) {
      clearTimeout(splashTimeout);
      splashTimeout = null;
    }

    Object.assign(splash.value, { ...defaultSplash, ...options, visible: true });

    if (options && options.timeout) {
      splashTimeout = setTimeout(() => {
        splash.value.visible = false;
      }, options.timeout);
    }
  },
  hideSplashScreen: function() {
    if (splashTimeout) {
      clearTimeout(splashTimeout);
      splashTimeout = null;
    }
    splash.value.visible = false;
  },
  getSplashScreen: function() {
    return splash;
  },
  createRightClickMenu: function (event, menuItems) {
    const existingMenu = document.getElementById("rightClickMenu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("div");
    menu.id = "rightClickMenu";
    menu.style.top = `${event.pageY}px`;
    menu.style.left = `${event.pageX}px`;
    menu.classList.add("z-[1000]", "absolute", "min-w-40", "max-w-80", "bg-gray-300", "border", "border-gray-100", "text-lg", "shadow-md", "rounded-md", "dark:bg-black", "dark:border-gray-700", "dark:text-white", "overflow-hidden");

    // Menü elemanlarını oluştur
    menuItems.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.textContent = t(item.name);
        menuItem.classList.add("cursor-pointer", "truncatedText2", "font-semibold", "tracking-wider", "px-4", "py-2", "border-b", "border-dark", "last:border-0", "hover:bg-main", "hover:text-white", "transition", "duration-200");

        menuItem.addEventListener("click", () => {
            item.click(item.data);
            menu.remove();
        });

        menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    document.addEventListener("click", function handleClickOutside() {
        menu.remove();
        document.removeEventListener("click", handleClickOutside);
    });

  },
  parseBannedKeys: function (bannedKeys) {
    let parsedKeys = [];
    
    bannedKeys.forEach(key => {
      if (typeof key === "string" && key.includes("-")) {
        let [start, end] = key.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          parsedKeys.push(i);
        }
      } else {
        parsedKeys.push(Number(key));
      }
    });
  
    return parsedKeys;
  },
  convert2PriceWithUnit: function (value, unit) {
    let unitName = defaultUnit;
    if (unit != null) unitName = unit;
    if (value != null) {
      let str = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      str = str.replace(/\./, "x").replace(/,/g, ".").replace(/x/, ",");
      return `${str} ${unitName}`;
    }
    return `0,00 ${unitName}`;
  },
  reverseConvertFromPrice: function (value) {
    if (value != null && value != undefined) {
        let str = value.replace(/\./g, "");
        str = str.replace(/,/, ".");
        return parseFloat(str);
    } else {
        return 0;
    }
  },
  debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  },
}

export default commonFunctions;