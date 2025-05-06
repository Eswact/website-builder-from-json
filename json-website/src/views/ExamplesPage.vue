<template>
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex justify-beetween items-center">
        <div class="w-full flex items-center gap-8">
        <h1 class="text-2xl font-bold text-second dark:text-white">{{$t("examplesPage.title1")}}</h1>
        </div>
    </div>
      <div class="w-full">
        <table id="messagesTable" class="display stripe hover" style="width:100%"></table>
      </div><div class="w-full flex justify-beetween items-center mt-4">
        <div class="w-full flex items-center gap-8">
        <h1 class="text-2xl font-bold text-second dark:text-white">{{$t("examplesPage.title2")}}</h1>
        </div>
    </div><div id="shoppingCards" name="shoppingCards" class="w-full flex flex-col gap-4">
              <div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
        <div class="flex items-center md:w-full">
          <div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="shoppingCardsSearchBar" type="text" :placeholder='$t("examplesPage.exampleCard.searchPlaceholder")' class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>
        </div>
        <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
          
          <button id="shoppingCardsOrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.sort")}}</span>
            <i class="fa-solid fa-sort"></i>
          </button>
          <button @click="shoppingCardsChangeViewMode()" class="bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <i v-if="shoppingCardsViewMode === 'grid'" class="fa-solid fa-list-ul text-xl"></i>
            <i v-else class="fa-solid fa-table-cells text-xl"></i>  
          </button>
          
        </div>
      </div>
              <div v-if="shoppingCards.length > 0" class="cardList w-full flex items-center gap-2 flex-wrap">
          <div v-if="shoppingCardsViewMode === 'grid'" class="w-full flex items-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards"
              :key="card.ID"
              class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
            >
              <img
                :src="card.Resimler[0] || '/defaults/images/no-image.png'"
                class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
                :alt="card.UrunAdi"
                onerror="this.src='/defaults/images/no-image.png'"
              />
              <div class="h-[3.5rem] flex justify-center items-center">
                <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.UrunAdi }}</h2>
              </div>
              <span class="text-lg sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards"
              :key="card.ID"
              class="relative w-full h-[120px] py-2 px-4 bg-white dark:bg-black text-center flex items-center justify-between rounded-md shadow-lg"
            >
              <div class="h-full w-full flex items-center gap-4">
                <img
                  :src="card.Resimler[0] || '/defaults/images/no-image.png'"
                  class="h-[80%] aspect-square object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.UrunAdi"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
                <div class="h-full flex flex-col justify-center items-start gap-2">
                  <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.UrunAdi }}</h2>
                </div>
              </div>
              <div class="w-full h-full p-6 pr-0 flex flex-col justify-center items-end gap-4">
                <span class="text-xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center gap-2">
          <img src="/defaults/images/not-found.gif" :alt="$t('defaults.noDataFound')" />
          <h2 class="text-3xl font-bold text-second dark:text-white">{{ $t('defaults.noDataFound') }}</h2>
        </div>
              <div class="flex justify-between items-center">
                  <button @click="shoppingCardsCurrentPage--" :disabled="shoppingCardsCurrentPage <= 1" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.previous")}}</button>
                  <div class="flex items-center gap-4 px-3 py-1 rounded-lg text-second dark:text-white font-semibold"><span>{{$t("defaults.page")}}</span><span>{{ shoppingCardsCurrentPage }} / {{ shoppingCardsTotalPages }}</span></div>
                  <button @click="shoppingCardsCurrentPage++" :disabled="shoppingCardsCurrentPage >= shoppingCardsTotalPages" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.next")}}</button>
                </div>
              <div v-show="shoppingCardsOrderModalVisibility" id="shoppingCardsOrderModal" @click.self="shoppingCardsToggleOrderVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
        <div class="bg-bg text-dark p-4 max-h-full max-w-full min-w-[400px] overflow-y-auto md:w-full md:min-w-[unset] md:pb-8 rounded-lg md:rounded-b-none md:rounded-t-2xl flex flex-col gap-4">
          <div class="w-full flex items-center justify-between mb-1">
            <h2 class="text-2xl font-bold dark:text-darkBg">{{$t("defaults.sort")}}</h2>
            <button @click="shoppingCardsToggleOrderVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <label v-for="option in shoppingCardsOrderOptions" :key="option.id" :for="'shoppingCards' + option.id" class="w-full px-6 py-3 border border-gray-400 flex items-center gap-4 text-lg font-semibold rounded-md">
            <input
              type="radio"
              :id="'shoppingCards' + option.id"
              name="shoppingCardsOrdering"
              :checked="shoppingCardsOrdering === option.value"
              @change="shoppingCardsOrdering = option.value"
            />
            <span class="dark:text-darkBg">{{ $t(option.name) }}</span>
          </label>
        </div>
      </div>
            </div><div class="w-full flex justify-center items-center mt-4">
        <div class="w-full py-0 gap-8 flex justify-between items-center">
        <div></div>
        <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">{{$t("thisPage")}}</button>
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
        import { sharedFunctions } from '../scripts/custom/shared.js';
import $ from "jquery";
import datatableService from "../services/datatable/index.js";
import cardService from "../services/cardService";
import { useBasketStore } from "../store/basketStore";
const basketStore = useBasketStore();
      
        
  var messagesTable;
  
  let messagesTableColumns = [
    {
      order: 0,
      title: "examplesPage.exampleTable.group",
      data: "postId",
      name: "postId",
      checkable: true,
      orderable: undefined,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex justify-center items-center font-bold text-2xl">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
      className: ""
    },{
      order: 1,
      title: "examplesPage.exampleTable.name",
      data: "name",
      name: "name",
      checkable: false,
      orderable: undefined,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
      className: ""
    },{
      order: 2,
      title: "examplesPage.exampleTable.mail",
      data: "email",
      name: "email",
      checkable: true,
      orderable: undefined,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
      className: ""
    },{
      order: 3,
      title: "examplesPage.exampleTable.message",
      data: "body",
      name: "body",
      checkable: false,
      orderable: undefined,
      render: function (data, type, row) {
                if (data != null) {
                    return `<div class="flex">
                    ${data}
                </div>`;
                }
                else { return ''; }
            },
      className: ""
    }
  ];
  
  
  
  
  
  
  let messagesTableAjax = {
    url: "https://jsonplaceholder.typicode.com/comments",
    type: "GET",
    dataSrc: '',
    data: function(d) {
      
      
      
    }
  };
  
  let messagesTableTableOptions = {
    drawCallback: function (settings, data) { },
fnRowCallBack: function (nRow, data, iDisplayIndex, iDisplayIndexFull) { },
fnInitComplete: function () { }
  };
  messagesTableTableOptions.serverSide = false;
  messagesTableTableOptions.processing = false;
  
  let messagesTableRightClick = false
  let messagesTableKeyFocusFunction = false
  let messagesTableKeyFunction = false
  let messagesTableOptions = {}
  
  messagesTableOptions["rightClick"] = messagesTableRightClick;
  messagesTableOptions['keyFocus'] = messagesTableKeyFocusFunction;
  messagesTableOptions['key'] = messagesTableKeyFunction;
  
  
  
  let messagesTableOperations = {}
  
        
      const shoppingCards = ref([]);
      const shoppingCardsOrdering = ref(1);
 const shoppingCardsOrderOptions = ref([{"name":"aToZ","id":"aToZ","value":1},{"name":"lowestPrice","id":"lowestPrice","value":2},{"name":"highestPrice","id":"highestPrice","value":3}]);
 const shoppingCardsOrderModalVisibility = ref(false);
      const shoppingCardsSearchBar = ref('');
      
      const shoppingCardsCurrentPage = ref(1);
const shoppingCardsTotalPages = ref(1);
      const shoppingCardsViewMode = ref('grid');
      
  
  
      const getshoppingCards = function () {
        const params = {
          currentPage: shoppingCardsCurrentPage.value,
 itemsPerPage: 10,
          orderType: shoppingCardsOrdering.value,
          searchValue: shoppingCardsSearchBar.value,
          
        };
  
        $.ajax({
          url: "http://localhost:3000/api/products",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(params),
          success: function(res) {
            console.log(res);
            shoppingCards.value = res.data;
            shoppingCardsTotalPages.value = res.totalPages;
          },
          error: function(err) {
            console.log(err);
          }
        })
      };
      
      watch(shoppingCardsCurrentPage, () => { getshoppingCards(); }, { deep: true });
      function shoppingCardsToggleOrderVisibility() { shoppingCardsOrderModalVisibility.value = !shoppingCardsOrderModalVisibility.value };
        watch(shoppingCardsOrdering, () => { getshoppingCards(); }, { deep: true });
      watch(shoppingCardsSearchBar, commonFunctions.debounce((value) => { 
          shoppingCardsSearchBar.value = value; 
          if (shoppingCardsCurrentPage.value > 1) { shoppingCardsCurrentPage.value = 1; }
          else { getshoppingCards(); } 
          }, 300), { deep: true });
      
      
      function shoppingCardsChangeViewMode() {
              if (shoppingCardsViewMode.value === 'grid') {
                shoppingCardsViewMode.value = 'list';
              }
              else {
                shoppingCardsViewMode.value = 'grid';
              }
            };
      
        onMounted(() => {
          messagesTable = datatableService.initializeDataTable('messagesTable', '#messagesTable', messagesTableAjax, messagesTableColumns, null, messagesTableTableOptions, messagesTableOperations, messagesTableOptions);
          getshoppingCards();
            $('#shoppingCardsOrderModalButton').off('click').on('click', shoppingCardsToggleOrderVisibility)
            
      
          
toast.success("Toast Test!");
commonFunctions.useSplashScreen({"title": "examplesPage.exampleSplash.title", "description": "examplesPage.exampleSplash.description", "buttons": [{"text": "examplesPage.exampleSplash.button", "action": commonFunctions.hideSplashScreen}], "timeout": 3000});

        });
  
        watch(locale, () => {
          messagesTable.destroy();
          messagesTable = null;
          messagesTable = datatableService.initializeDataTable('messagesTable', '#messagesTable', messagesTableAjax, messagesTableColumns, null, messagesTableTableOptions, messagesTableOperations, messagesTableOptions);
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
      }// Shortcut 2: [alt + s]
      if (['alt', 's'].every(k => pressedKeys.has(k)) && pressedKeys.size === 2) {
        e.preventDefault();
        (function () {
                console.log('Alt + S pressed!');
            })();
      }// Shortcut 3: [p]
      if (['p'].every(k => pressedKeys.has(k)) && pressedKeys.size === 1) {
        e.preventDefault();
        (function () {
                console.log('P pressed!');
            })();
      }
    });
      
        
import { toast } from "vue3-toastify";
function gettingStarted() {
    router.push({ path: '/configuration' });
}

      </script>
      
      <style scoped>
        
      </style>