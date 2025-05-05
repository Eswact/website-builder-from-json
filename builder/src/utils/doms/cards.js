function generateCardsDom(item) {
    let cardsDom = '';
    let pagingDom = '';
    let topBar = '';
    let modals = '';
    let cardData = item.cardLayout.card;
    switch (item.cardLayout.type) {
        case 1:
            cardsDom = `<div v-if="${item.name}.length > 0" class="cardList w-full flex items-center gap-2 flex-wrap">
          <div v-if="${item.name}ViewMode === 'grid'" class="w-full flex items-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
            >
              <img
                :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
                :alt="card.${cardData.title}"
                onerror="this.src='/defaults/images/no-image.png'"
              />
              <div class="h-[3.5rem] flex justify-center items-center">
                <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
              </div>
              <span class="text-lg sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-full h-[120px] py-2 px-4 bg-white dark:bg-black text-center flex items-center justify-between rounded-md shadow-lg"
            >
              <div class="h-full w-full flex items-center gap-4">
                <img
                  :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                  class="h-[80%] aspect-square object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.${cardData.title}"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
                <div class="h-full flex flex-col justify-center items-start gap-2">
                  <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
                </div>
              </div>
              <div class="w-full h-full p-6 pr-0 flex flex-col justify-center items-end gap-4">
                <span class="text-xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center gap-2">
          <img src="/defaults/images/not-found.gif" :alt="$t('defaults.noDataFound')" />
          <h2 class="text-3xl font-bold text-second dark:text-white">{{ $t('defaults.noDataFound') }}</h2>
        </div>`;
            break;
        case 2:
            cardsDom = `<div v-if="${item.name}.length > 0" class="cardList w-full flex items-center gap-2 flex-wrap">
          <div v-if="${item.name}ViewMode === 'grid'" class="w-full flex items-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-[calc(20%-0.4rem)] xl:w-[calc(25%-0.4rem)] md:w-[calc(50%-0.4rem)] h-[340px] sm:h-[300px] py-2 px-4 bg-white dark:bg-black text-center flex flex-col items-center justify-around rounded-md shadow-lg"
              :data-envanter=card.${cardData.envanter}
              :data-barcode=card.${cardData.barcode}
            >
              <img
                :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                class="w-full h-[50%] sm:h-[45%] object-contain object-center rounded-lg overflow-hidden"
                :alt="card.${cardData.title}"
                onerror="this.src='/defaults/images/no-image.png'"
              />
              <div class="h-[3.5rem] flex justify-center items-center">
                <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
              </div>
              <span class="text-lg sm:text-base font-bold text-main dark:text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
              <button v-if="basketStore.getBasket('${item.name}').every(c => c.id !== card.${cardData.id})" @click="basketStore.addItem('${item.name}', card, {id:'${cardData.id}',envanter:'${cardData.envanter}',price:'${cardData.price}'})" class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg  disabled:opacity-50 disabled:bg-gray-600 disabled:border-gray-800" :disabled="card.${cardData.envanter} <= 0">{{ card.${cardData.envanter} <= 0 ? $t('defaults.soldOut') : $t('defaults.addToBasket')}}</button>
              <div v-else class="w-full flex items-center justify-between gap-4 md:gap-2">
                <button @click="basketStore.decreaseQuantity('${item.name}', card.${cardData.id})" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-minus"></i></button>
                <span class="text-lg font-bold text-fourth dark:text-third px-2">{{ basketStore.getBasket('${item.name}').find(c => c.id === card.${cardData.id}).quantity }}</span>
                <button @click="basketStore.increaseQuantity('${item.name}', card.${cardData.id})" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-full h-[120px] py-2 px-4 bg-white dark:bg-black text-center flex items-center justify-between rounded-md shadow-lg"
              :data-envanter=card.${cardData.envanter}
              :data-barcode=card.${cardData.barcode}
            >
              <div class="h-full w-full flex items-center gap-4">
                <img
                  :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                  class="h-[80%] aspect-square object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.${cardData.title}"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
                <div class="h-full flex flex-col justify-center items-start gap-2">
                  <h2 class="w-full text-xl sm:text-lg font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
                  <span class="text-lg sm:text-base">{{ card.${cardData.barcode} }}</span>
                </div>
              </div>
              <div class="w-[240px] h-full md:w-[25%] flex flex-col gap-4 justify-center items-center">
                <span class="text-lg sm:text-base font-bold text-main dark:text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
                <button v-if="basketStore.getBasket('${item.name}').every(c => c.id !== card.${cardData.id})" @click="basketStore.addItem('${item.name}', card, {id:'${cardData.id}',envanter:'${cardData.envanter}',price:'${cardData.price}'})" class="w-full bg-third border-2 border-third text-white p-1 text-lg font-semibold rounded-lg">Add to basket</button>
                <div v-else class="w-full flex items-center justify-between gap-4 md:gap-2">
                  <button @click="basketStore.decreaseQuantity('${item.name}', card.${cardData.id})" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-minus"></i></button>
                  <span class="text-lg font-bold text-fourth dark:text-third px-2">{{ basketStore.getBasket('${item.name}').find(c => c.id === card.${cardData.id}).quantity }}</span>
                  <button @click="basketStore.increaseQuantity('${item.name}', card.${cardData.id})" class="w-full bg-second text-white p-1 max-w-[100px] text-lg font-semibold rounded-lg border-2 border-second dark:border-white"><i class="fa-solid fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center gap-2">
          <img src="/defaults/images/not-found.gif" :alt="$t('defaults.noDataFound')" />
          <h2 class="text-3xl font-bold text-second dark:text-white">{{ $t('defaults.noDataFound') }}</h2>
        </div>`;
            break;
        case 3:
            cardsDom = `<div v-if="${item.name}.length > 0" class="cardList w-full flex items-center justify-center gap-2 flex-wrap">
          <div v-if="${item.name}ViewMode === 'grid'" class="w-full flex items-center justify-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-[calc(33%-0.3rem)] md:w-[calc(50%-0.4rem)] h-[300px] p-6 bg-white dark:bg-black text-center flex items-start justify-beetween rounded-md shadow-lg"
              :data-envanter=card.${cardData.envanter}
              :data-barcode=card.${cardData.barcode}
            >
              <div class="w-[40%] h-full flex justify-center items-center">
                <img
                  :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                  class="w-full max-h-full object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.${cardData.title}"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
              </div>
              <div class="w-[60%] h-full p-6 pr-0 flex flex-col justify-between items-start gap-4">
                <div class="w-full h-full flex flex-col justify-start items-start gap-2">
                  <h2 class="text-2xl sm:text-lg text-start font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
                  <span class="text-lg text-third font-semibold">{{card.${cardData.brand}}}</span>
                  <span>{{card.${cardData.category}}}</span>
                  <span>{{card.${cardData.barcode}}}</span>
                  <span>{{card.${cardData.envanter}}}</span>
                </div>
                <span class="text-xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-2 flex-wrap">
            <div
              v-for="card in ${item.name}"
              :key="card.${cardData.id}"
              class="relative w-full h-[160px] p-4 bg-white dark:bg-black text-center flex items-center justify-beetween rounded-md shadow-lg"
              :data-envanter=card.${cardData.envanter}
              :data-barcode=card.${cardData.barcode}
            >
              <div class="w-full h-full flex justify-start items-center gap-6">
                <img
                  :src="card.${cardData.img} || '/defaults/images/no-image.png'"
                  class="h-[80%] aspect-square object-contain object-center rounded-lg overflow-hidden"
                  :alt="card.${cardData.title}"
                  onerror="this.src='/defaults/images/no-image.png'"
                />
                <div class="w-full h-full flex flex-col justify-start items-start gap-2">
                  <h2 class="text-2xl sm:text-lg text-start font-semibold truncatedText2">{{ card.${cardData.title} }}</h2>
                  <span class="text-sm font-bold">{{card.${cardData.barcode}}}</span>
                  <span class="text-third font-semibold">{{card.${cardData.brand}}}</span>
                  <span>{{card.${cardData.category}}}</span>
                </div>
              </div>
              <div class="w-full h-full p-6 pr-0 flex flex-col justify-center items-end gap-4">
                <span class="text-lg font-semibold">envanter: {{card.${cardData.envanter}}}</span>
                <span class="text-2xl sm:text-base font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.${cardData.price}) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center gap-2">
          <img src="/defaults/images/not-found.gif" :alt="$t('defaults.noDataFound')" />
          <h2 class="text-3xl font-bold text-second dark:text-white">{{ $t('defaults.noDataFound') }}</h2>
        </div>`;
            break;
    }

    if (item.searchBar || item.ordering || item.filters || item.cardLayout.type === 2 || item.cardLayout.viewMode?.changeable) {
        topBar = `<div class="w-full flex justify-between items-center gap-4 md:flex-col md:justify-center">
        <div class="flex items-center md:w-full">
          ${item.searchBar ? `<div class="w-[300px] md:w-full relative max-w-full flex items-center justify-end"> <input v-model="${item.name}SearchBar" type="text" :placeholder='$t(${JSON.stringify(item.searchBar.placeholder) || "defaults.search"})' class="peer w-full pl-4 pr-8 py-2 bg-white dark:bg-opacity-10 border-2 border-second dark:border-white rounded-xl placeholder:text-second dark:placeholder:text-white font-bold md:font-semibold text-lg focus:placeholder:text-fourth focus:border-fourth dark:focus:placeholder:text-fourth dark:focus:border-fourth focus:outline-none"/><i class="fa-solid fa-magnifying-glass absolute right-4 text-lg text-second dark:text-white peer-focus:text-fourth"></i></div>` : ''}
        </div>
        <div class="w-[400px] max-w-full md:w-full flex items-center justify-end gap-4">
          ${item.filters ? `<button id="${item.name}FiltersButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.filters")}}</span>
            <i class="fa-solid fa-filter"></i>
          </button>` : ''}
          ${item.ordering ? `<button id="${item.name}OrderModalButton" class="w-[calc(50%-0.5rem)] bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <span class="font-bold md:font-semibold">{{$t("defaults.sort")}}</span>
            <i class="fa-solid fa-sort"></i>
          </button>` : ''}
          ${item.cardLayout.viewMode?.changeable ? `<button @click="${item.name}ChangeViewMode()" class="bg-white dark:bg-opacity-10 border-2 border-second text-second dark:border-white dark:text-white hover:border-fourth hover:text-fourth dark:hover:border-fourth dark:hover:text-fourth text-lg py-2 px-4 rounded-xl flex items-center justify-between duration-200">
            <i v-if="${item.name}ViewMode === 'grid'" class="fa-solid fa-list-ul text-xl"></i>
            <i v-else class="fa-solid fa-table-cells text-xl"></i>  
          </button>`: ''}
          ${item.cardLayout.type === 2 ? `<button v-show="basketStore.getBasket('${item.name}').length > 0" @click="${item.name}ToggleBasketVisibility()" id="${item.name}BasketButton" class="flex items-center gap-2 text-white bg-third text-lg font-semibold p-2 rounded-lg" >
            <i class="fa-solid fa-basket-shopping text-xl"></i>
            <span>({{ basketStore.getBasket('${item.name}').length }})</span>
          </button>` : ''}
        </div>
      </div>`;
    }

    if (item.ordering) {
        modals += `<div v-show="${item.name}OrderModalVisibility" id="${item.name}OrderModal" @click.self="${item.name}ToggleOrderVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
        <div class="bg-bg text-dark p-4 max-h-full max-w-full min-w-[400px] overflow-y-auto md:w-full md:min-w-[unset] md:pb-8 rounded-lg md:rounded-b-none md:rounded-t-2xl flex flex-col gap-4">
          <div class="w-full flex items-center justify-between mb-1">
            <h2 class="text-2xl font-bold dark:text-darkBg">{{$t("defaults.sort")}}</h2>
            <button @click="${item.name}ToggleOrderVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <label v-for="option in ${item.name}OrderOptions" :key="option.id" :for="'${item.name}' + option.id" class="w-full px-6 py-3 border border-gray-400 flex items-center gap-4 text-lg font-semibold rounded-md">
            <input
              type="radio"
              :id="'${item.name}' + option.id"
              name="${item.name}Ordering"
              :checked="${item.name}Ordering === option.value"
              @change="${item.name}Ordering = option.value"
            />
            <span class="dark:text-darkBg">{{ $t(option.name) }}</span>
          </label>
        </div>
      </div>`
    }

    if (item.cardLayout.type === 2) {
        modals += `<div v-show="basketStore.getBasket('${item.name}').length > 0 && ${item.name}BasketModalVisibility" id="${item.name}BasketModal" @click.self="${item.name}ToggleBasketVisibility()" class="z-30 fixed w-full h-full top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center md:items-end">
        <div class="bg-bg text-dark px-6 py-4 max-h-full max-w-full w-[800px] overflow-y-auto md:w-full md:h-full md:justify-between md:pb-8 md:px-2 rounded-lg md:rounded-none flex flex-col gap-4">
          <div class="w-full flex items-center justify-between pb-2 border-b border-second">
            <h2 class="text-2xl font-bold dark:text-darkBg">{{$t('defaults.basket')}}</h2>
            <button @click="${item.name}ToggleBasketVisibility()" class="px-2 text-3xl text-red-600"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="w-full max-h-[500px] overflow-y-auto md:max-h-full md:h-full flex flex-col gap-2">
            <div v-for="card in basketStore.getBasket('${item.name}')" :key="card.id" class="w-full flex items-center justify-between p-1 gap-4 border-b last:border-b-0 border-second/40 dark:border-second/80">
              <div class="w-[calc(100%-32px)] flex items-center justify-between gap-4">
                 <div class="w-full max-w-[68%] md:max-w-[60%] sm:max-w-[150px] flex items-center gap-4">
                    <img :src="card.item.${cardData.img} || '/defaults/images/no-image.png'" class="w-[64px] h-[64px] sm:hidden object-contain object-center rounded-lg overflow-hidden" :alt="card.${cardData.title}" onerror="this.src='/defaults/images/no-image.png'"/>
                    <div class="w-full flex flex-col justify-between items-start gap-2">
                      <h2 class="threeDots max-w-[calc(100%-64px)] sm:max-w-full text-lg font-bold dark:text-darkBg">{{ card.item.${cardData.title} }}</h2>
                      <span class="font-semibold text-second">{{ card.quantity }} x {{ commonFunctions.convert2PriceWithUnit(card.item.${cardData.price}) }}</span>
                    </div>
                  </div>
                  <span class="text-lg font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(card.item.${cardData.price} * card.quantity) }}</span>
              </div>
              <button @click="${item.name}removeFromCart('${item.name}', card.id)" class="px-2 text-2xl w-[32px] h-[32px] text-red-600"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="w-full flex items-center justify-between pt-2 border-t border-second">
            <div class="flex items-center gap-4">
              <button @click="${item.name}clearBasket('${item.name}')" class="px-4 py-2 bg-second text-white hover:bg-main duration-200 text-xl font-bold rounded-lg">{{$t('defaults.clear')}}</button>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold text-second dark:text-darkBg">{{$t('defaults.total')}}:</span>
              <span class="text-2xl font-bold text-main">{{ commonFunctions.convert2PriceWithUnit(basketStore.getTotalPrice('${item.name}')) }}</span>
            </div>
          </div>
        </div>
      </div>`;
    }

    if (item.paging) {
        pagingDom = `<div class="flex justify-between items-center">
                  <button @click="${item.name}CurrentPage--" :disabled="${item.name}CurrentPage <= 1" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.previous")}}</button>
                  <div class="flex items-center gap-4 px-3 py-1 rounded-lg text-second dark:text-white font-semibold"><span>{{$t("defaults.page")}}</span><span>{{ ${item.name}CurrentPage }} / {{ ${item.name}TotalPages }}</span></div>
                  <button @click="${item.name}CurrentPage++" :disabled="${item.name}CurrentPage >= ${item.name}TotalPages" class="bg-second text-white hover:bg-main duration-200 py-2 w-28 rounded-lg disabled:bg-second/50 dark:disabled:bg-second/20">{{$t("defaults.next")}}</button>
                </div>`;
    }

    return `<div id="${item.id}" name="${item.name}" class="w-full flex flex-col gap-4">
              ${topBar}
              ${cardsDom}
              ${pagingDom}
              ${modals}
            </div>`;
}

function generateCardsScript(item) {
    if (item.ajax) {
        return `
      const ${item.name} = ref([]);
      ${item.ordering ? `const ${item.name}Ordering = ref(${item.ordering.options[0].value});\n const ${item.name}OrderOptions = ref(${JSON.stringify(item.ordering.options)});\n const ${item.name}OrderModalVisibility = ref(false);` : ''}
      ${item.searchBar ? `const ${item.name}SearchBar = ref('');` : ''}
      ${item.filters ? `const ${item.name}Filters = [${item.filters.map(filter => JSON.stringify(filter)).join(',')}];
      const ${item.name}FiltersData = ref({${item.filters.map(filter => `${filter.data}: ${filter.value}`).join(',')}}) ` : ''}
      ${item.paging ? `const ${item.name}CurrentPage = ref(1);\nconst ${item.name}TotalPages = ref(1);` : ''}
      const ${item.name}ViewMode = ref('${item.cardLayout.viewMode?.default || "grid"}');
      ${item.cardLayout.type === 2 ? `const ${item.name}BasketModalVisibility = ref(false);` : ''}
  
  
      const get${item.name} = function () {
        const params = {
          ${item.paging ? `currentPage: ${item.name}CurrentPage.value,\n itemsPerPage: ${item.paging.size},` : ''}
          ${item.ordering ? `${item.ordering.name}: ${item.name}Ordering.value,` : ''}
          ${item.searchBar ? `${item.searchBar.name}: ${item.name}SearchBar.value,` : ''}
          ${item.filters ? `filters: {...${item.name}FiltersData.value},` : ''}
        };
  
        $.ajax({
          url: "${item.ajax.url}",
          type: "${item.ajax.method}",
          ${item.ajax.dataType ? `dataType: "${item.ajax.dataType}",` : ""}
          ${item.ajax.contentType ? `contentType: "${item.ajax.contentType}",` : ""}
          data: ${item.ajax.stringifyData ? "JSON.stringify(params)" : "params"},
          success: function(res) {
            console.log(res);
            ${item.name}.value = res.data;
            ${item.name}TotalPages.value = res.totalPages;
          },
          error: function(err) {
            console.log(err);
          }
        })
      };
      
      watch(${item.name}CurrentPage, () => { get${item.name}(); }, { deep: true });
      ${item.ordering
                ? `function ${item.name}ToggleOrderVisibility() { ${item.name}OrderModalVisibility.value = !${item.name}OrderModalVisibility.value };
        watch(${item.name}Ordering, () => { get${item.name}(); }, { deep: true });`
                : ''
            }
      ${item.searchBar
                ? `watch(${item.name}SearchBar, commonFunctions.debounce((value) => { 
          ${item.name}SearchBar.value = value; 
          if (${item.name}CurrentPage.value > 1) { ${item.name}CurrentPage.value = 1; }
          else { get${item.name}(); } 
          }, ${item.searchBar.delay}), { deep: true });`
                : ''
            }
      ${item.filters
                ? `function ${item.name}OpenCardFilters() { cardService.openFiltersModal(${JSON.stringify(item.name)}, ${item.name}Filters, ${item.name}FiltersData.value) };
        watch(${item.name}FiltersData, () => { 
          if (${item.name}CurrentPage.value > 1) { ${item.name}CurrentPage.value = 1; }
          else { get${item.name}(); }
        }, { deep: true });`
                : ''
            }
      ${item.cardLayout.type === 2
                ? `function ${item.name}ToggleBasketVisibility() {
            ${item.name}BasketModalVisibility.value = !${item.name}BasketModalVisibility.value;
            console.log(basketStore.getBasket('${item.name}'));
          };
          function ${item.name}removeFromCart(name, id) {
            basketStore.removeItem(name, id);
            if (basketStore.getBasket(name).length === 0) {
              ${item.name}BasketModalVisibility.value = false;
            }
          };
          function ${item.name}clearBasket(name) {
            commonFunctions.showConfirmationMessage('defaults.cardClearBasketMessage', () => {
              basketStore.clearBasket(name);
              ${item.name}BasketModalVisibility.value = false;
            });
          };`
                : ''
            }
      ${item.cardLayout.viewMode?.changeable
                ? `function ${item.name}ChangeViewMode() {
              if (${item.name}ViewMode.value === 'grid') {
                ${item.name}ViewMode.value = 'list';
              }
              else {
                ${item.name}ViewMode.value = 'grid';
              }
            };`
                : ''
            }`;
    }
}

module.exports = { 
    generateCardsDom,
    generateCardsScript
};