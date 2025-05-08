<script setup>
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import { ref, watch, onMounted, computed } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import userService from '../services/userService.js';
    import LoginModal from './LoginModal.vue';
    import RegisterModal from './RegisterModal.vue';

    const router = useRouter();
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isLogin = computed(() => userService.authControl.value);
    const showLoginModal = ref(false);
    const showRegisterModal = ref(false);

    onMounted(async () => {
       userService.isLoggedIn();
    });

    const beforeLogout = () => {
          console.log('before logout');
          return true
        };
    const afterLogout = () => {
          console.log('after logout');
        };
    async function logoutProcess() {
        dropdownOpen.value = false;
        if (beforeLogout()) {
            await userService.logout();
            afterLogout();
            router.push({ name: 'introduction' });
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
    
    function openRegisterModal() {
        dropdownOpen.value = false;
        userService.fillRegisterModal();
        showRegisterModal.value = true;
    }
    function closeRegisterModal() {
        showRegisterModal.value = false;
    }
    
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
            
            <li
                v-show="!isLogin"
                @click="openRegisterModal()"
                class="px-4 py-2 hover:bg-main/20 cursor-pointer font-semibold text-lg"
                >
                {{ $t("defaults.register") }}
            </li>
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
    <RegisterModal v-show="showRegisterModal" @close="closeRegisterModal" />
    </div>
</template>