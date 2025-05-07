import $ from 'jquery';
import { toast } from "vue3-toastify";
import siteData from '../../siteData.json';
import commonFunctions from '../scripts/common';
import select2Service from './select2Service';
import i18n from './languageService';
const t = i18n.global.t;

const userService = {
    authControl: false,
    login: async function() {
        const thisHelper = this;
        const loginData = {};
        let missingFields = [];
    
        siteData.users.login.data.forEach(item => {
            if (item.visible) {
                const value = $(`#${item.id}`).val();
                if (value) {
                    loginData[item.name] = value;
                } else {
                    missingFields.push(item.name);
                }
            }
            else {
                registerData[item.name] = item.value;
            }
        });
    
        if (missingFields.length > 0) {
            console.warn('Eksik bilgiler:', missingFields.join(', '));
            toast.error('Bilgileri eksiksiz giriniz.');
            return false;
        }
    
        try {
            const response = await $.ajax({
                url: siteData.users.login.url,
                method: siteData.users.login.method,
                data: loginData,
                xhrFields: { withCredentials: true },
            });
    
            console.log('Giriş başarılı:', response);
            toast.success('Giriş başarılı.');
            localStorage.userToken = response.token;
            thisHelper.authControl = true;
            return true;
    
        } catch (err) {
            console.error('Giriş başarısız:', err);
            toast.error(`Giriş başarısız: ${err.responseJSON?.message}`);
            return false;
        }
    },    

    register: async function() {
        const registerData = {};
        let missingFields = [];
    
        siteData.users.register.data.forEach(item => {
            if (item.visible) {
                const value = $(`#${item.id}`).val();
                if (value) {
                    registerData[item.name] = value;
                } else {
                    missingFields.push(item.name);
                }
            }
            else {
                registerData[item.name] = item.value;
            }
        });
    
        if (missingFields.length > 0) {
            console.warn('Eksik bilgiler:', missingFields.join(', '));
            toast.error('Bilgileri eksiksiz giriniz.');
            return false;
        }
    
        try {
            const response = await $.ajax({
                url: siteData.users.register.url,
                method: siteData.users.register.method,
                data: registerData,
                xhrFields: { withCredentials: true },
            });
    
            console.log('Kayıt başarılı:', response);
            toast.success('Kayıt başarılı.');
            return true;
    
        } catch (err) {
            console.error('Kayıt başarısız:', err);
            toast.error(`Kayıt başarısız: ${err.responseJSON?.message}`);
            return false;
        }
    },

    logout: async function() {
        const thisHelper = this;
        try {
            const response = await $.ajax({
                url: siteData.users.logout.url,
                method: siteData.users.logout.method,
                xhrFields: { withCredentials: true },
            });
    
            localStorage.removeItem('userToken');
            console.log('Çıkış yapıldı:', response);
            toast.success('Çıkış yapıldı.');
            thisHelper.authControl = false;
            return true;
    
        } catch (err) {
            console.error('Çıkış yapılamadı:', err);
            toast.error('Çıkış yapılamadı.');
            return false;
        }
    },

    getToken: function() {
        return localStorage.userToken;
    },

    isLoggedIn: async function() {
        const thisHelper = this;        
        if (localStorage.userToken) {
            try {
                const response = await $.ajax({
                    url: siteData.users.cookieSessionControlUrl,
                    method: "POST",
                    xhrFields: { withCredentials: true },
                });
                console.log(response);
                thisHelper.authControl = true;
                return true;
        
            } catch (err) {
                thisHelper.authControl = false;
                return false;
            }
        }
        return false;
    },

    fillLoginModal: function() { 
        let formHtml = '';
        siteData.users.login.data.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "email" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.id}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} 
                                ${item.required ? `required`: ``}
                            />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                } 
                else if (item.type === "password") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <input 
                                type="password" 
                                id="${item.id}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''}  
                                ${item.required ? `required`: ``}
                            />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                }
                else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <select id="${item.id}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg" ${item.required ? `required`: ``}>
                                ${item.options.map(option => `
                                    <option value="${option.value}">${option.label}</option>
                                `).join('')}
                            </select>
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                }
            }
            $('#loginModalContent').html(formHtml);
        });
        this.inputControls(siteData.users.login);
    },

    fillRegisterModal: function() { 
        let formHtml = '';
        siteData.users.register.data.forEach(item => {
            if (item.visible) {
                if (item.type === "string" || item.type === "email" || item.type === "number") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <input 
                                type="${item.type}" 
                                id="${item.id}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''} 
                                ${item.required ? `required`: ``}
                            />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                } 
                else if (item.type === "password") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <input 
                                type="password" 
                                id="${item.id}" 
                                name="${item.name}" 
                                value="${item.value}" 
                                class="py-2 px-4 border border-darkBg text-darkBg rounded-lg" 
                                ${item.placeholder ? `placeholder=${item.placeholder}`: ''}  
                                ${item.required ? `required`: ``}
                            />
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                }
                else if (item.type === "select") {
                    formHtml += `
                        <div class="w-full flex flex-col">
                            <label for="${item.name}" class="font-semibold">${t(item.title)}</label>
                            <select id="${item.id}" name="${item.name}" class="p-2 border border-darkBg text-darkBg rounded-lg" ${item.required ? `required`: ``}>
                                ${item.options.map(option => `
                                    <option value="${option.value}">${option.label}</option>
                                `).join('')}
                            </select>
                            <span class="itemError hidden text-sm text-red-600 p-1"></span>
                        </div>`;
                }
            }
            $('#registerModalContent').html(formHtml);
        });
        this.inputControls(siteData.users.register);
    },

    inputControls: function (op) {
        op.data.forEach(item => {
            if (item.visible) {
                const input = document.getElementById(item.id);
                if (item.keydown) {
                    if (item.keydown.maxLength) {
                        let maxLength = item.keydown.maxLength;
                        $(input).on("keydown.maxLenght", function (e) {
                            let currentLength = e.target.value.length;
                            let allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                            if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        });
                        $(input).on("paste.maxLenght", function (e) {
                            let pastedText = e.originalEvent.clipboardData.getData("text");
                            if (e.target.value.length + pastedText.length > maxLength) {
                                e.preventDefault();
                            }
                        });
                    }
                    if (item.keydown.bannedKeys) {
                        let parsedBannedKeys = commonFunctions.parseBannedKeys(item.keydown.bannedKeys);
                        $(input).on("keydown.bannedKeys", function (e) {
                            if (parsedBannedKeys.includes(e.keyCode)) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        });
    },
};

export default userService;