<script setup>
    import { useHelpStore } from '../store/pageHelper';
    const helpStore = useHelpStore();

    function closeHelp() {
        helpStore.$state.isHelpVisible = false;
    }
</script>

<template>
    <div @click.self="closeHelp" class="z-40 fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-end items-center">
        <div class="relative w-full h-[300px] md:h-full md:rounded-t-none md:overflow-y-auto md:items-start md:justify-start px-[5%] 2xl:px-4 py-6 md:py-4 flex justify-center items-center bg-bg dark:bg-darkBg text-darkBg dark:text-bg rounded-t-xl shadow-md border border-second">
            <button @click="closeHelp" class="absolute right-4 top-4 px-3 text-xl aspect-square flex justify-center items-center bg-cancel text-white rounded-full"><i class="fa-solid fa-x"></i></button>
            <div class="w-full h-full flex md:flex-col justify-center items-center md:justify-start md:items-start">
                <div class="helpSection w-full h-full flex flex-col gap-2 items-center border-r-2 md:border-r-0 md:border-b-2 border-main/50 dark:border-third/50 md:pt-4">
                    <div class="text-main dark:text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-regular fa-lightbulb absolute left-6"></i>
                        <h5>{{ $t(helpStore.$state.helpData.page) || "Sayfa" }}</h5>
                    </div>
                    <div class="w-full h-full py-8 px-16 xl:px-6 text-justify">
                        <span class="w-full text-lg">{{ $t(helpStore.$state.helpData.info) || "" }}</span>
                    </div>
                </div>
                <div v-if="helpStore.$state.helpData.shortcuts && helpStore.$state.helpData.shortcuts.length" class="helpSection sm:hidden w-full h-full max-h-full md:max-h-[33%] overflow-hidden flex flex-col gap-2 items-center border-r-2 md:border-r-0 md:border-b-2 border-main/50 dark:border-third/50 md:pt-4">
                    <div class="text-main dark:text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-solid fa-keyboard absolute left-6"></i>
                        <h5>Shortcuts</h5>
                    </div>
                    <div class="w-full h-full py-8 md:py-4 px-16 xl:px-6">
                        <ul class="w-full flex flex-col justify-start items-start gap-4 xl:max-h-[calc(100%-2rem)] md:max-h-[calc(100%-2.5rem)] overflow-y-auto">
                            <li v-for="thisShortcut in helpStore.$state.helpData.shortcuts" :key="thisShortcut" class="w-full flex xl:flex-col justify-between md:items-start items-center gap-8 xl:gap-2">
                                <div class="w-1/2 xl:w-full flex justify-end xl:justify-start md:justify-center items-center gap-4">
                                    <div v-for="(shortcutKey, index) in thisShortcut.shortcut" :key="shortcutKey" class="flex justify-start items-center gap-4">
                                        <img :src=shortcutKey.key  class="max-h-12 2xl:max-h-10">
                                        <i v-if="index !== thisShortcut.shortcut.length - 1" class="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                                <span class="w-1/2 xl:w-full md:text-center">{{ $t(thisShortcut.shortcutDescription) || "" }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="helpStore.$state.helpData.link" class="helpSection w-full h-full flex flex-col gap-2 items-center border-r-2 md:border-r-0 md:border-b-2 border-main/50 dark:border-third/50 md:pt-4">
                    <div class="text-main dark:text-third w-full relative flex justify-center gap-4 items-center text-2xl font-semibold">
                        <i class="fa-brands fa-youtube absolute left-6"></i>
                        <h5>Video</h5>
                    </div>
                    <div class="w-full h-full py-4 px-16 xl:px-6 flex justify-center items-center">
                        <iframe :src=helpStore.$state.helpData.link class="w-full h-full rounded-md" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .helpSection:last-child {
        border-right: none;
        border-bottom: none;
    }
</style>