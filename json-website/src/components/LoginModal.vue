<script setup>
import userService from '../services/userService.js';

const emit = defineEmits(['close'])
function closeModal() {
    emit('close');
}

const beforeLogin = () => {
          console.log('before login');
          return true
        };
const afterLogin = () => {
          console.log('after login');
        };
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
</template>