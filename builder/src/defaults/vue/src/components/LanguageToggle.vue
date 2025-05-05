<script setup>
    import { useI18n } from 'vue-i18n';
    import { ref, watch, onMounted } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import pagesData from '../../siteData.json';
    // import { useHead } from '@unhead/vue';
    // import { useRouter } from 'vue-router';

    const { locale, t } = useI18n();
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const languages = pagesData.languages.options.map((lang) => ({
        code: lang.code,
        label: lang.label,
    }));

    // const router = useRouter();
    // website title & meta
    // watch(locale, (newLocale) => { 
    //     const route = router.currentRoute.value;
    //     const metaKey = route.meta.i18nKey;
    //     if (metaKey) {
    //         const title = t(`${metaKey}.title`);
    //         const description = t(`${metaKey}.description`);
    //         const keywords = t(`${metaKey}.keywords`);
    //         // update Meta
    //         useHead({
    //             title: title || 'Varsayılan Başlık',
    //             meta: [
    //                 { name: 'description', content: description || 'Varsayılan Açıklama' },
    //                 { name: 'keywords', content: keywords || 'Varsayılan Anahtar Kelimeler' },
    //             ],
    //         });
    //     }
    // });

    const switchLanguage = (lang) => {
        locale.value = lang;
        localStorage.setItem('selectedLanguage', lang);
        dropdownOpen.value = false;
    };

    // onMounted(() => {
    //     const savedLanguage = localStorage.getItem('selectedLanguage');
    //     if (savedLanguage) {
    //         locale.value = savedLanguage;
    //     }
    // });

    onClickOutside(dropdownRef, () => {
        dropdownOpen.value = false;
    });
</script>


<template>
    <div class="relative" ref="dropdownRef">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="flex justify-center items-center"
      >
        <i class="fa-solid fa-globe text-[2rem] md:text-[2.25rem] text-white"></i>
      </button>
  
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-32 bg-white text-darkBg border rounded shadow z-50"
      >
        <ul>
          <li
            v-for="lang in languages"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            class="px-4 py-2 hover:bg-main/20 cursor-pointer font-semibold text-lg"
            :class="{ 'text-main font-bold': locale === lang.code }"
          >
            {{ lang.label }}
          </li>
        </ul>
      </div>
    </div>
</template>
  