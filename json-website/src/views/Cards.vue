<template>
        <div class="w-full flex flex-col justify-center items-center gap-8">
          <div id="shoppingCards" name="shoppingCards" class="w-full flex flex-col gap-4">
              <div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
        <div class="flex items-center md:w-full">
          <div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="shoppingCardsSearchBar" type="text" :placeholder='$t("cardsPage.card1.searchPlaceholder")' class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>
        </div>
        <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
          <button id="shoppingCardsFiltersButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.filters")}}</span>
            <i class="fa-solid fa-filter"></i>
          </button>
          <button id="shoppingCardsOrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.sort")}}</span>
            <i class="fa-solid fa-sort"></i>
          </button>
          <button @click="shoppingCardsChangeViewMode()" class="bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <i v-if="shoppingCardsViewMode === 'grid'" class="fa-solid fa-list-ul text-xl"></i>
            <i v-else class="fa-solid fa-table-cells text-xl"></i>  
          </button>
          <button v-show="basketStore.getBasket('shoppingCards').length > 0" @click="shoppingCardsToggleBasketVisibility()" id="shoppingCardsBasketButton" class="flex items-center gap-2 text-white bg-third text-lg font-semibold p-2 rounded-lg" >
            <i class="fa-solid fa-basket-shopping text-xl"></i>
            <span>({{ basketStore.getBasket('shoppingCards').length }})</span>
          </button>
        </div>
      </div>
              <div v-if="shoppingCards.length > 0" class="cardList w-full flex items-center gap-2 flex-wrap">
          <div v-if="shoppingCardsViewMode === 'grid'" class="w-full flex items-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards"
              :key="card.ID"
              class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
              :data-envanter=card.Envanter
              :data-barcode=card.Barkodlar[0].Barkodu
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
              <span class="text-lg sm:text-base font-bold text-main dark:text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
              <button v-if="basketStore.getBasket('shoppingCards').every(c => c.id !== card.ID)" @click="basketStore.addItem('shoppingCards', card, {id:'ID',envanter:'Envanter',price:'Tutar'})" class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg  disabled:opacity-50 disabled:bg-gray-600 disabled:border-gray-800" :disabled="card.Envanter <= 0">{{ card.Envanter <= 0 ? $t('defaults.soldOut') : $t('defaults.addToBasket')}}</button>
              <div v-else class="w-full flex items-center justify-between gap-4 md:gap-2">
                <button @click="basketStore.decreaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-minus"></i></button>
                <span class="text-lg font-bold text-fourth dark:text-third px-2">{{ basketStore.getBasket('shoppingCards').find(c => c.id === card.ID).quantity }}</span>
                <button @click="basketStore.increaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards"
              :key="card.ID"
              class="relative w-full h-[120px] py-2 px-4 bg-white dark:bg-black text-center flex items-center justify-between rounded-md shadow-lg"
              :data-envanter=card.Envanter
              :data-barcode=card.Barkodlar[0].Barkodu
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
                  <span class="text-lg sm:text-base">{{ card.Barkodlar[0].Barkodu }}</span>
                </div>
              </div>
              <div class="w-[240px] h-full md:w-[25%] flex flex-col gap-4 justify-center items-center">
                <span class="text-lg sm:text-base font-bold text-main dark:text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
                <button v-if="basketStore.getBasket('shoppingCards').every(c => c.id !== card.ID)" @click="basketStore.addItem('shoppingCards', card, {id:'ID',envanter:'Envanter',price:'Tutar'})" class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg">Add to basket</button>
                <div v-else class="w-full flex items-center justify-between gap-4 md:gap-2">
                  <button @click="basketStore.decreaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-minus"></i></button>
                  <span class="text-lg font-bold text-fourth dark:text-third px-2">{{ basketStore.getBasket('shoppingCards').find(c => c.id === card.ID).quantity }}</span>
                  <button @click="basketStore.increaseQuantity('shoppingCards', card.ID)" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-plus"></i></button>
                </div>
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
      </div><div v-show="basketStore.getBasket('shoppingCards').length > 0 && shoppingCardsBasketModalVisibility" id="shoppingCardsBasketModal" @click.self="shoppingCardsToggleBasketVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
        <div class="bg-bg text-dark px-6 py-4 max-h-full max-w-full w-[800px] overflow-y-auto md:w-full md:h-full md:justify-between md:pb-8 md:px-2 rounded-lg md:rounded-none flex flex-col gap-4">
          <div class="w-full flex items-center justify-between pb-2 border-b border-second">
            <h2 class="text-2xl font-bold dark:text-darkBg">{{$t('defaults.basket')}}</h2>
            <button @click="shoppingCardsToggleBasketVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="w-full max-h-[500px] overflow-y-auto md:max-h-full md:h-full flex flex-col gap-2">
            <div v-for="card in basketStore.getBasket('shoppingCards')" :key="card.id" class="w-full flex items-center justify-between p-1 gap-4 border-b last:border-b-0 border-second/40 dark:border-second/80">
              <div class="w-[calc(100%-32px)] flex items-center justify-between gap-4">
                 <div class="w-full max-w-[68%] md:max-w-[60%] sm:max-w-[150px] flex items-center gap-4">
                    <img :src="card.item.Resimler[0] || '/defaults/images/no-image.png'" class="w-[64px] h-[64px] sm:hidden object-contain object-center rounded-lg overflow-hidden" :alt="card.UrunAdi" onerror="this.src='/defaults/images/no-image.png'"/>
                    <div class="w-full flex flex-col justify-between items-start gap-2">
                      <h2 class="threeDots max-w-[calc(100%-64px)] sm:max-w-full text-lg font-bold dark:text-darkBg">{{ card.item.UrunAdi }}</h2>
                      <span class="font-semibold text-second">{{ card.quantity }} x {{ commonFunctions.convert2PriceWithUnit(card.item.Tutar) }}</span>
                    </div>
                  </div>
                  <span class="text-lg font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.item.Tutar * card.quantity) }}</span>
              </div>
              <button @click="shoppingCardsremoveFromCart('shoppingCards', card.id)" class="px-2 text-2xl w-[32px] h-[32px] text-red-600"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="w-full flex items-center justify-between pt-2 border-t border-second">
            <div class="flex items-center gap-4">
              <button @click="shoppingCardsclearBasket('shoppingCards')" class="px-4 py-2 bg-second text-white hover:bg-main duration-200 text-xl font-bold rounded-lg">{{$t('defaults.clear')}}</button>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold text-second dark:text-darkBg">{{$t('defaults.total')}}:</span>
              <span class="text-2xl font-bold text-main">{{ commonFunctions.convert2PriceWithUnit(basketStore.getTotalPrice('shoppingCards')) }}</span>
            </div>
          </div>
        </div>
      </div>
            </div><hr class="my-4 w-full border-second border dark:border-bg"/><div id="shoppingCards2" name="shoppingCards2" class="w-full flex flex-col gap-4">
              <div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
        <div class="flex items-center md:w-full">
          <div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="shoppingCards2SearchBar" type="text" :placeholder='$t("cardsPage.card2.searchPlaceholder")' class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>
        </div>
        <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
          <button id="shoppingCards2FiltersButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.filters")}}</span>
            <i class="fa-solid fa-filter"></i>
          </button>
          <button id="shoppingCards2OrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.sort")}}</span>
            <i class="fa-solid fa-sort"></i>
          </button>
          <button @click="shoppingCards2ChangeViewMode()" class="bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <i v-if="shoppingCards2ViewMode === 'grid'" class="fa-solid fa-list-ul text-xl"></i>
            <i v-else class="fa-solid fa-table-cells text-xl"></i>  
          </button>
          
        </div>
      </div>
              <div v-if="shoppingCards2.length > 0" class="cardList w-full flex items-center justify-center gap-2 flex-wrap">
          <div v-if="shoppingCards2ViewMode === 'grid'" class="w-full flex items-center justify-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards2"
              :key="card.ID"
              class="relative w-[calc(33%-0.3rem)] md:w-[calc(50%-0.4rem)] h-[300px] p-6 bg-white dark:bg-black text-center flex items-start justify-beetween rounded-md shadow-lg"
              :data-envanter=card.Envanter
              :data-barcode=card.Barkodlar[0].Barkodu
            >
              <div class="w-[40%] h-full flex justify-center items-center">
                <img
                  :src="card.Resimler[0] || '/defaults/images/no-image.png'"
                  class="w-full max-h-full object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.UrunAdi"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
              </div>
              <div class="w-[60%] h-full p-6 pr-0 flex flex-col justify-between items-start gap-4">
                <div class="w-full h-full flex flex-col justify-start items-start gap-2">
                  <h2 class="text-2xl sm:text-lg text-start font-semibold truncatedText2">{{ card.UrunAdi }}</h2>
                  <span class="text-lg text-third font-semibold">{{card.UreticiFirmaAdi}}</span>
                  <span>{{card.Kategori}}</span>
                  <span>{{card.Barkodlar[0].Barkodu}}</span>
                  <span>{{card.Envanter}}</span>
                </div>
                <span class="text-xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in shoppingCards2"
              :key="card.ID"
              class="relative w-full h-[160px] p-4 bg-white dark:bg-black text-center flex items-center justify-beetween rounded-md shadow-lg"
              :data-envanter=card.Envanter
              :data-barcode=card.Barkodlar[0].Barkodu
            >
              <div class="w-full h-full flex justify-start items-center gap-6">
                <img
                  :src="card.Resimler[0] || '/defaults/images/no-image.png'"
                  class="h-[80%] aspect-square object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.UrunAdi"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
                <div class="w-full h-full flex flex-col justify-start items-start gap-2">
                  <h2 class="text-2xl sm:text-lg text-start font-semibold truncatedText2">{{ card.UrunAdi }}</h2>
                  <span class="text-sm font-bold">{{card.Barkodlar[0].Barkodu}}</span>
                  <span class="text-third font-semibold">{{card.UreticiFirmaAdi}}</span>
                  <span>{{card.Kategori}}</span>
                </div>
              </div>
              <div class="w-full h-full p-6 pr-0 flex flex-col justify-center items-end gap-4">
                <span class="text-lg font-semibold">envanter: {{card.Envanter}}</span>
                <span class="text-2xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.Tutar) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center gap-2">
          <img src="/defaults/images/not-found.gif" :alt="$t('defaults.noDataFound')" />
          <h2 class="text-3xl font-bold text-second dark:text-white">{{ $t('defaults.noDataFound') }}</h2>
        </div>
              <div class="flex justify-between items-center">
                  <button @click="shoppingCards2CurrentPage--" :disabled="shoppingCards2CurrentPage <= 1" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.previous")}}</button>
                  <div class="flex items-center gap-4 px-3 py-1 rounded-lg text-second dark:text-white font-semibold"><span>{{$t("defaults.page")}}</span><span>{{ shoppingCards2CurrentPage }} / {{ shoppingCards2TotalPages }}</span></div>
                  <button @click="shoppingCards2CurrentPage++" :disabled="shoppingCards2CurrentPage >= shoppingCards2TotalPages" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.next")}}</button>
                </div>
              <div v-show="shoppingCards2OrderModalVisibility" id="shoppingCards2OrderModal" @click.self="shoppingCards2ToggleOrderVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
        <div class="bg-bg text-dark p-4 max-h-full max-w-full min-w-[400px] overflow-y-auto md:w-full md:min-w-[unset] md:pb-8 rounded-lg md:rounded-b-none md:rounded-t-2xl flex flex-col gap-4">
          <div class="w-full flex items-center justify-between mb-1">
            <h2 class="text-2xl font-bold dark:text-darkBg">{{$t("defaults.sort")}}</h2>
            <button @click="shoppingCards2ToggleOrderVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <label v-for="option in shoppingCards2OrderOptions" :key="option.id" :for="'shoppingCards2' + option.id" class="w-full px-6 py-3 border border-gray-400 flex items-center gap-4 text-lg font-semibold rounded-md">
            <input
              type="radio"
              :id="'shoppingCards2' + option.id"
              name="shoppingCards2Ordering"
              :checked="shoppingCards2Ordering === option.value"
              @change="shoppingCards2Ordering = option.value"
            />
            <span class="dark:text-darkBg">{{ $t(option.name) }}</span>
          </label>
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
import cardService from "../services/cardService";
import { useBasketStore } from "../store/basketStore";
const basketStore = useBasketStore();
      
        
        
      const shoppingCards = ref([]);
      const shoppingCardsOrdering = ref(1);
 const shoppingCardsOrderOptions = ref([{"name":"aToZ","id":"aToZ","value":1},{"name":"lowestPrice","id":"lowestPrice","value":2},{"name":"highestPrice","id":"highestPrice","value":3}]);
 const shoppingCardsOrderModalVisibility = ref(false);
      const shoppingCardsSearchBar = ref('');
      const shoppingCardsFilters = [{"data":"category","name":"cardsPage.card1.category","type":"select2","options":{"width":"100%","minimumInputLength":-1,"placeholder":"cardsPage.card1.categorySelection","allowClear":true,"language":{"noResults":"Eşleşen bir Kategori bulunamadı.","inputTooShort":"En az 1 Karakter giriniz.","searching":"Aranıyor..."},"ajax":{"url":"http://localhost:3000/api/categories","delay":250,"type":"GET","dataType":"json","contentType":"application/json; charset=utf-8"}},"value":null,"default":null,"visible":true},{"data":"brand","name":"cardsPage.card1.brand","type":"text","value":null,"default":null,"visible":true}];
      const shoppingCardsFiltersData = ref({category: null,brand: null}) 
      const shoppingCardsCurrentPage = ref(1);
const shoppingCardsTotalPages = ref(1);
      const shoppingCardsViewMode = ref('grid');
      const shoppingCardsBasketModalVisibility = ref(false);
  
  
      const getshoppingCards = function () {
        const params = {
          currentPage: shoppingCardsCurrentPage.value,
 itemsPerPage: 10,
          orderType: shoppingCardsOrdering.value,
          searchValue: shoppingCardsSearchBar.value,
          filters: {...shoppingCardsFiltersData.value},
        };
  
        $.ajax({
          url: "http://localhost:3000/api/products",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(params),
          xhrFields: {
            withCredentials: true
          },
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
      function shoppingCardsOpenCardFilters() { cardService.openFiltersModal("shoppingCards", shoppingCardsFilters, shoppingCardsFiltersData.value) };
        watch(shoppingCardsFiltersData, () => { 
          if (shoppingCardsCurrentPage.value > 1) { shoppingCardsCurrentPage.value = 1; }
          else { getshoppingCards(); }
        }, { deep: true });
      function shoppingCardsToggleBasketVisibility() {
            shoppingCardsBasketModalVisibility.value = !shoppingCardsBasketModalVisibility.value;
            console.log(basketStore.getBasket('shoppingCards'));
          };
          function shoppingCardsremoveFromCart(name, id) {
            basketStore.removeItem(name, id);
            if (basketStore.getBasket(name).length === 0) {
              shoppingCardsBasketModalVisibility.value = false;
            }
          };
          function shoppingCardsclearBasket(name) {
            commonFunctions.showConfirmationMessage('defaults.cardClearBasketMessage', () => {
              basketStore.clearBasket(name);
              shoppingCardsBasketModalVisibility.value = false;
            });
          };
      function shoppingCardsChangeViewMode() {
              if (shoppingCardsViewMode.value === 'grid') {
                shoppingCardsViewMode.value = 'list';
              }
              else {
                shoppingCardsViewMode.value = 'grid';
              }
            };

      const shoppingCards2 = ref([]);
      const shoppingCards2Ordering = ref(1);
 const shoppingCards2OrderOptions = ref([{"name":"aToZ","id":"aToZ","value":1},{"name":"lowestPrice","id":"lowestPrice","value":2},{"name":"highestPrice","id":"highestPrice","value":3}]);
 const shoppingCards2OrderModalVisibility = ref(false);
      const shoppingCards2SearchBar = ref('');
      const shoppingCards2Filters = [{"data":"category","name":"cardsPage.card2.category","type":"select2","options":{"width":"100%","minimumInputLength":-1,"placeholder":"cardsPage.card2.categorySelection","allowClear":true,"language":{"noResults":"Eşleşen bir Kategori bulunamadı.","inputTooShort":"En az 1 Karakter giriniz.","searching":"Aranıyor..."},"ajax":{"url":"http://localhost:3000/api/categories","delay":250,"type":"GET","dataType":"json","contentType":"application/json; charset=utf-8"}},"value":null,"default":null,"visible":true},{"data":"brand","name":"cardsPage.card2.brand","type":"text","value":null,"default":null,"visible":true}];
      const shoppingCards2FiltersData = ref({category: null,brand: null}) 
      const shoppingCards2CurrentPage = ref(1);
const shoppingCards2TotalPages = ref(1);
      const shoppingCards2ViewMode = ref('list');
      
  
  
      const getshoppingCards2 = function () {
        const params = {
          currentPage: shoppingCards2CurrentPage.value,
 itemsPerPage: 12,
          orderType: shoppingCards2Ordering.value,
          searchValue: shoppingCards2SearchBar.value,
          filters: {...shoppingCards2FiltersData.value},
        };
  
        $.ajax({
          url: "http://localhost:3000/api/products",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(params),
          xhrFields: {
            withCredentials: true
          },
          success: function(res) {
            console.log(res);
            shoppingCards2.value = res.data;
            shoppingCards2TotalPages.value = res.totalPages;
          },
          error: function(err) {
            console.log(err);
          }
        })
      };
      
      watch(shoppingCards2CurrentPage, () => { getshoppingCards2(); }, { deep: true });
      function shoppingCards2ToggleOrderVisibility() { shoppingCards2OrderModalVisibility.value = !shoppingCards2OrderModalVisibility.value };
        watch(shoppingCards2Ordering, () => { getshoppingCards2(); }, { deep: true });
      watch(shoppingCards2SearchBar, commonFunctions.debounce((value) => { 
          shoppingCards2SearchBar.value = value; 
          if (shoppingCards2CurrentPage.value > 1) { shoppingCards2CurrentPage.value = 1; }
          else { getshoppingCards2(); } 
          }, 300), { deep: true });
      function shoppingCards2OpenCardFilters() { cardService.openFiltersModal("shoppingCards2", shoppingCards2Filters, shoppingCards2FiltersData.value) };
        watch(shoppingCards2FiltersData, () => { 
          if (shoppingCards2CurrentPage.value > 1) { shoppingCards2CurrentPage.value = 1; }
          else { getshoppingCards2(); }
        }, { deep: true });
      
      function shoppingCards2ChangeViewMode() {
              if (shoppingCards2ViewMode.value === 'grid') {
                shoppingCards2ViewMode.value = 'list';
              }
              else {
                shoppingCards2ViewMode.value = 'grid';
              }
            };
      
        onMounted(() => {
          
          getshoppingCards();
            $('#shoppingCardsOrderModalButton').off('click').on('click', shoppingCardsToggleOrderVisibility)
            $('#shoppingCardsFiltersButton').off('click').on('click', shoppingCardsOpenCardFilters);
getshoppingCards2();
            $('#shoppingCards2OrderModalButton').off('click').on('click', shoppingCards2ToggleOrderVisibility)
            $('#shoppingCards2FiltersButton').off('click').on('click', shoppingCards2OpenCardFilters);
      
          
        });
  
        
  
        
      
        
      </script>
      
      <style scoped>
        
      </style>