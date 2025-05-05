<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pagesData from '../../siteData.json';
import { useHelpStore } from '../store/pageHelper';
import DarkModeToggle from './DarkModeToggle.vue';
import LanguageToggle from './LanguageToggle.vue';

const helpStore = useHelpStore();

const route = useRoute();
const router = useRouter();

const isActive = (path) => route.path === path;

const showNavbar = () => {
  document.getElementById('asideBar').classList.add('show');
};
const closeNavbar = () => {
  document.getElementById('asideBar').classList.remove('show');
};

const darkModeEnabled = (pagesData.theme.darkModeEnabled == true || pagesData.theme.darkModeEnabled == 'true');
const languagesEnabled = (pagesData.languages.options.length > 1);
</script>

<template>
  <div>
    <!-- Navbar -->
    <aside
      id="asideBar"
      class="z-20 font-Montserrat fixed flex flex-col gap-[28px] overflow-hidden left-0 top-0 h-full py-[34px] w-[80px] md:w-0 hover:w-[280px] md:hover:w-0 transition-all bg-second shadow-[0_1px_2px_2px] md:shadow-none dark:shadow-md rounded-r-2xl md:rounded-r-none"
    >
      <!-- Mobile Close Button -->
      <button @click="closeNavbar" class="hidden sm:flex text-cancel rounded-full bg-white text-[2.5rem] p-0 m-0 absolute right-4 top-4"><i class="fa-solid fa-circle-xmark"></i></button>
      <!-- Logo -->
      <div class="flex items-center gap-[12px] p-[12px]">
        <img class="rounded-lg bg-white h-[56px] w-[56px] min-w-[56px] px-[3px] pt-[4px] pb-[2px]" :src="pagesData.general.logo || '/images/default-logo.png'" onerror="this.src='/images/default-logo.png'" alt="logo" />
        <h1 class="text-[28px] font-bold block p-[6px] text-white whitespace-nowrap">{{ pagesData.general.siteName }}</h1>
      </div>
      <!-- Navigation Links -->
      <ul class="flex flex-col items-start justify-start gap-[2px] py-[20px] font-semibold">
        <li
          v-for="page in pagesData.pages"
          :key="page.name"
          class="flex justify-start items-center w-full"
        >
          <router-link
            :title="$t(page.name)"
            class="w-full h-full flex items-center gap-[20px] px-[18px] py-[12px] cursor-pointer text-white transition-all hover:bg-main"
            :to="page.path"
            @click="closeNavbar"
          >
            <span :class="['p-[8px] w-[44px] border-box flex justify-center items-center', { 'bg-main rounded-lg': isActive(page.path) }]">
              <i :class=page.icon class="min-w-[30px] flex justify-center items-center text-[26px]"></i>
            </span>
            <span class="text-[1.45rem] font-semibold threeDots">{{ $t(page.name) }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Header -->
    <header
      class="z-10 w-[calc(100%-80px)] bg-bg dark:bg-darkBg md:w-full fixed top-0 left-[80px] md:left-0 h-[90px] justify-center items-center px-[50px] pt-[25px] md:px-0 md:pt-0 md:h-[65px]"
    >
      <nav
        class="w-full h-full px-[40px] md:px-[20px] py-[4px] flex items-center justify-between border-[1px] border-second bg-second rounded-md md:rounded-none"
      >
        <div class="flex items-center gap-8">
          <button @click="showNavbar" class="hidden md:block text-white text-4xl px-[4px]"><i class="fa-solid fa-bars"></i></button>
          <button v-if="helpStore.$state.helpData" @click="helpStore.toggleHelpModal()" class="text-white text-3xl px-[4px]"><i class="fa-solid fa-question"></i></button>
        </div>
        <div class="flex gap-[34px] md:gap-[20px] items-center justify-end">
          <LanguageToggle v-if="languagesEnabled" />
          <DarkModeToggle v-if="darkModeEnabled" />
          <!-- Settings Button -->
          <!-- Logout Button -->
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
#asideBar.show {
  display: flex;
  width: 100%;
}
</style>