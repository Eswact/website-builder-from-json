<script setup>
  import { computed, onMounted, onUnmounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import siteData from '../siteData.json'
  import commonFunctions from './scripts/common';
  import { useHelpStore } from './store/pageHelper';
  import i18n from './services/languageService';
  import router from './router';

  import Navbar from './components/Navbar.vue';
  import SplashScreen from './components/SplashScreen.vue';
  import HelpModal from './components/HelpModal.vue';

  const route = useRoute();
  const showNavbar = computed(() => {
    return route.name !== 'notFound';
  });

  const helpStore = useHelpStore();

  function setWebsiteIcon() {
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = siteData.general.icon || '/default-icon.png';
    document.head.appendChild(link);
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      commonFunctions.closeModal();
      commonFunctions.closeFilter();
      helpStore.$state.isHelpVisible = false;
    }
  }

  function handleF1Key(evt) {
    if (evt.keyCode == 112) {
      evt.preventDefault();
      helpStore.toggleHelpModal();
    }
  }

  function setHelperModal() {
    const helpData = siteData.pages.find(page => page.path === route.path)?.help || null;
    if (helpData) {
      helpStore.$state.helpData = helpData;
      window.addEventListener('keydown', handleF1Key);
    } else {
      helpStore.$state.helpData = null;
      helpStore.$state.isHelpVisible = false;
      window.removeEventListener('keydown', handleF1Key);
    }
  }

  onMounted(() => {
    setWebsiteIcon();
    setHelperModal();
    window.addEventListener('keydown', handleEscKey);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscKey);
  });

  watch(() => route.path, () => {
    setHelperModal();
  });

  watch( () => i18n.global.locale.value, () => {
    const route = router.currentRoute.value;
    const meta = route.meta;
    if (meta) {
      const t = i18n.global.t;
      const translatedKeywords = (meta.keywords || []).map(k => t(k));
      commonFunctions.updateSEO({
        title: t(meta.title),
        description: t(meta.description),
        keywords: translatedKeywords,
      });
    }
  });
</script>

<template>
  <div class="w-full flex items-center">
    <SplashScreen />
    <Navbar v-if="showNavbar" />
    <main :class="[ showNavbar
            ? 'w-[calc(100%-80px)] md:w-full px-[54px] md:px-[24px] pb-[40px] mt-[120px] ml-[80px] md:ml-0 md:mt-[100px]'
            : 'w-full'
          ]">
      <RouterView />
    </main>

    <div id="sharedModal" class="fixed top-0 left-0 z-30 w-full h-full bg-[rgba(0,0,0,0.7)] justify-center items-center">
      <div id="sharedModalBg" class="relative p-[1.25rem] bg-bg text-darkBg rounded-lg sm:w-full sm:h-full">
        <button @click="commonFunctions.closeModal" class="text-cancel rounded-full bg-white flex text-[2rem] p-0 m-0 absolute right-[-0.8rem] top-[-0.8rem] sm:right-2 sm:top-2"><i class="fa-solid fa-circle-xmark"></i></button>
        <div id="sharedModalBody" class="overflow-y-auto h-full pr-[0.25rem]">

        </div>
      </div>
    </div>

    <div id="tableFilterModal" class="fixed top-0 left-0 z-30 w-full h-full bg-[rgba(0,0,0,0.7)] justify-end items-center">
      <div id="filterModalContent" class="w-[400px] overflow-hidden duration-200 max-w-full h-full p-8 rounded-l-2xl bg-bg flex flex-col justify-between items-center gap-4">
        <div class="w-full flex justify-between text-4xl">
          <h1 class="font-bold text-second">{{ $t("defaults.filters") }}</h1>
          <button @click="commonFunctions.closeFilter" class="text-cancel"><i class="fa-solid fa-circle-xmark"></i></button>
        </div>
        <div id="tableFilterList" class="w-full h-full py-8 md:py-4 overflow-y-auto flex flex-col gap-4 md:gap-2"></div>
        <div class="w-full flex flex-col gap-3">
          <button id="filterModalApply" class="w-full border rounded-lg p-2 text-xl font-semibold tracking-wider bg-second text-white border-second">{{$t("defaults.apply")}}</button>
          <button id="filterModalReset" class="w-full border rounded-lg p-2 text-xl font-semibold tracking-wider text-second border-second">{{$t("defaults.reset")}}</button>
        </div>
      </div>
    </div>

    <HelpModal v-if="helpStore.$state.isHelpVisible" :helpData="helpStore.$state.helpData" />
  </div>
</template>

<style scoped>
  #sharedModal, #tableFilterModal {
    display: none;
  }
  #sharedModal.show, #tableFilterModal.show {
    display: flex;
  }
  @keyframes expandWidth {
    0% { width: 0; }
    100% { width: 400px; }
  }
  #tableFilterModal.show #filterModalContent {
    animation: expandWidth 0.25s ease forwards;
  }
</style>
