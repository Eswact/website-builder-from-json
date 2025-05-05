import { createApp } from 'vue';
import './styles/main.css';
import "vue3-toastify/dist/index.css";

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import { i18n } from './services/languageService';

import Vue3Toastify, { toast } from "vue3-toastify";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right",
    theme: localStorage.theme,
});
app.mount('#app');