const fs = require('fs');
const path = require('path');
const siteData = require('../siteData/data.js');
const paths = require('./paths.js');

function createUserToggle() {
    const userToggleHtml = `<script setup>
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import { ref, watch, onMounted, computed } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import userService from '../services/userService.js';
    import LoginModal from './LoginModal.vue';
    ${siteData.users?.register ? "import RegisterModal from './RegisterModal.vue';" : ''}

    const router = useRouter();
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isLogin = computed(() => userService.authControl.value);
    const showLoginModal = ref(false);
    ${siteData.users?.register ? 'const showRegisterModal = ref(false);' : ''}

    onMounted(async () => {
       userService.isLoggedIn();
    });

    const beforeLogout = ${siteData.users?.logout?.beforeLogout ? `${siteData.users.logout.beforeLogout}` : '() => {return true}'};
    const afterLogout = ${siteData.users?.logout?.afterLogout ? `${siteData.users.logout.afterLogout}` : '() => {}'};
    async function logoutProcess() {
        dropdownOpen.value = false;
        if (beforeLogout()) {
            await userService.logout();
            afterLogout();
            router.push({ ${siteData.users?.logout?.afterLogoutPage ? `name: '${siteData.users.logout.afterLogoutPage}'` : `path: "/"`} });
        }
    }

    onClickOutside(dropdownRef, () => {
        dropdownOpen.value = false;
    });

    function openLoginModal() {
        dropdownOpen.value = false;
        userService.fillLoginModal();
        showLoginModal.value = true;
    }
    function closeLoginModal() {
        showLoginModal.value = false;
    }
    ${siteData.users?.register ? `
    function openRegisterModal() {
        dropdownOpen.value = false;
        userService.fillRegisterModal();
        showRegisterModal.value = true;
    }
    function closeRegisterModal() {
        showRegisterModal.value = false;
    }` : ''}
    
</script>

<template>
    <div>
    <div class="relative" ref="dropdownRef">
        <button
        @click="dropdownOpen = !dropdownOpen"
        class="flex justify-center items-center"
        >
        <i class="fa-solid fa-circle-user text-[2rem] md:text-[2.25rem] text-white"></i>
        </button>
    
        <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-32 bg-white text-darkBg border rounded shadow z-50"
        >
        <ul>
            <li
            v-show="!isLogin"
            @click="openLoginModal()"
            class="px-4 py-2 hover:bg-main/20 cursor-pointer font-semibold text-lg"
            >
            {{ $t("defaults.login") }}
            </li>
            ${siteData.users?.register ? `
            <li
                v-show="!isLogin"
                @click="openRegisterModal()"
                class="px-4 py-2 hover:bg-main/20 cursor-pointer font-semibold text-lg"
                >
                {{ $t("defaults.register") }}
            </li>` : ''}
            <li
            v-show="isLogin"
            @click="logoutProcess()"
            class="px-4 py-2 hover:bg-main/20 cursor-pointer font-semibold text-lg"
            >
            {{ $t("defaults.logout") }}
            </li>
        </ul>
        </div>
    </div>
    <LoginModal v-show="showLoginModal" @close="closeLoginModal" />
    ${siteData.users?.register ? `<RegisterModal v-show="showRegisterModal" @close="closeRegisterModal" />` : ''}
    </div>
</template>`;
    fs.writeFileSync(paths.userToggleDir, userToggleHtml);
}

function createLoginModal() {
    const userLoginHtml = `<script setup>
import userService from '../services/userService.js';

const emit = defineEmits(['close'])
function closeModal() {
    emit('close');
}

const beforeLogin = ${siteData.users?.login?.beforeLogin ? `${siteData.users.login.beforeLogin}` : '() => {return true}'};
const afterLogin = ${siteData.users?.login?.afterLogin ? `${siteData.users.login.afterLogin}` : '() => {}'};
async function loginProcess() {
    if (beforeLogin()) {
        const result = await userService.login();
        if (result) {
            afterLogin();
            closeModal();
        }
    }
}
</script>

<template>
    <div @click.self="closeModal" class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
        <form @submit.prevent="loginProcess" class="relative p-[2rem] w-[400px] min-h-[300px] sm:w-full sm:h-full sm:rounded-none bg-bg text-darkBg rounded-lg flex flex-col justify-between items-center gap-6">
            <div id="loginModalContent" class="w-full h-full flex flex-col gap-4"></div>
            <button type="submit" class="w-full p-2 text-xl font-bold rounded-md bg-main/80 text-white hover:bg-main">Login</button>
        </form>
    </div>
</template>`;
    fs.writeFileSync(paths.userLoginDir, userLoginHtml);
}

function createRegisterModal() {
    const userRegisterHtml = `<script setup>
import userService from '../services/userService.js';

const emit = defineEmits(['close'])
function closeModal() {
    emit('close');
}

const beforeRegister = ${siteData.users?.register?.beforeRegister ? `${siteData.users.register.beforeRegister}` : '() => {return true}'};
const afterRegister = ${siteData.users?.register?.afterRegister ? `${siteData.users.register.afterRegister}` : '() => {}'};
async function registerProcess() {
    if (beforeRegister()) {
        const result = await userService.register();
        if (result) {
            afterRegister();
            closeModal();
        }
    }
}
</script>

<template>
    <div @click.self="closeModal" class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
        <form @submit.prevent="registerProcess" class="relative p-[2rem] w-[400px] min-h-[300px] sm:w-full sm:h-full sm:rounded-none bg-bg text-darkBg rounded-lg flex flex-col justify-between items-center gap-6">
            <div id="registerModalContent" class="w-full h-full flex flex-col gap-4"></div>
            <button type="submit" class="w-full p-2 text-xl font-bold rounded-md bg-main/80 text-white hover:bg-main">Register</button>
        </form>
    </div>
</template>`;
    fs.writeFileSync(paths.userRegisterDir, userRegisterHtml);
}

function createUsers() {
    if (siteData.users?.active) {
        createUserToggle();
        createLoginModal();
        if (siteData.users?.register) {
            createRegisterModal();
        }
    }
}   

module.exports = { createUsers };