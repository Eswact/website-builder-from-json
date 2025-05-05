<template>
        <div class="w-full flex flex-col gap-1">
          <div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
                    <div class="p-6 w-full max-w-[1000px]">
                        <h1 class="text-3xl font-bold text-center mb-6">{{$t("configurationPage.title1")}}</h1>
                        <ol class="list-decimal list-inside space-y-4">
                            <li>
                                <strong>{{$t("configurationPage.subtitle1")}}</strong>
                                <p>{{$t("configurationPage.desc1")}}</p>
                                <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm install</code></pre>
                            </li>
                            <li>
                                <strong>{{$t("configurationPage.subtitle2")}}</strong>
                                <p>{{$t("configurationPage.desc2")}}</p>
                            </li>
                            <li>
                                <strong>{{$t("configurationPage.subtitle3")}}</strong>
                                <p>{{$t("configurationPage.desc3")}}</p>
                                <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm run generate</code></pre>
                            </li>
                        </ol>
                    </div>
                </div><div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
<div class="p-6 w-full max-w-[1000px]">
<h1 class="text-3xl font-bold text-center mb-6">{{$t("configurationPage.title2")}}</h1>
<ol class="list-decimal list-inside space-y-4">
<li>
  <strong>{{$t("configurationPage.subtitle4")}} </strong>
  <p>{{$t("configurationPage.desc4")}}</p>
  <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
{
"logo": "/images/logo.png",   
"siteName": "My CRM",         
"icon": "/images/icon.png",   
"title": "My CRM"      
}
  </code></pre>
</li>
<li>
  <strong>{{$t("configurationPage.subtitle5")}}</strong>
  <p>{{$t("configurationPage.desc5")}}</p>
  <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
"theme": {
"darkModeEnabled": true,
"colors": {
"bg": "#F7F7F7",
"text": "#333",
"darkBg": "#091625",
"darkText": "#FFF",
"accept": "#4CAF50",
"cancel": "#DC3545",
"main": "#87567A",
"second": "#2F323A",
"third": "#E3D26F",
"fourth": "#347FC4",
"customColors": {
"test": "00FF00"
...
}
},
"font": {
"family": "Montserrat",
"size": "14px",
"custom": [
{
"name": "Montserrat",
"file": "Montserrat.woff2"
}
...
]
},
},
  </code></pre>
</li>
<li>
  <strong>{{$t("configurationPage.subtitle6")}}</strong>
  <p>{{$t("configurationPage.desc6")}}</p>
  <p class="p-3"><span class="font-semibold">{{$t("configurationPage.desc7-1")}}</span> {{$t("configurationPage.desc7-2")}}</p>
  <p class="p-3 pt-0"><span class="font-semibold">{{$t("configurationPage.desc8-1")}}</span> {{$t("configurationPage.desc8-2")}}</p>
  <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
{
"file": "Configuration.vue",
"name": "Configuration",
"path": "/configuration",
"icon": 'fa-solid fa-layer-group',
"seo": {
"title": "Configuration - My CRM",
"description": "Configuration",
"keywords": ["Configuration", "options", "settings"]
},
"doms": [
{
"type": "custom",
"content": 'Content here'
},
{
"type": "datatable",
"id": "productsTable",
"columns": ["title", "url", "albumId", "thumbnailUrl"],
"ajax": { "url": "https://jsonplaceholder.typicode.com/photos", "method": "GET", "dataSrc": '' },
"filters": [],
"toolbar": []
},
{
"type": "custom",
"content": 'Content here'
}
],
"customScripts": 'custom scripts',
"customReadyScripts": 'dom ready custom scripts',
}
  </code></pre>
</li>
<li>
  <strong>{{$t("configurationPage.subtitle7")}}</strong>
  <p>{{$t("configurationPage.desc9")}}</p>
  <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>
"scripts": [
{
"name": "shared",
"pages": [],
"script": "import siteData from '../../siteData.json'
import commonFunctions from './common';
const sharedFunctions = {
getPageByPath: function(path) {
  const currentPageJson = siteData.pages.find(x => x.path == path);
  const formatted = JSON.stringify(currentPageJson);
  commonFunctions.openModal(500, 600, formatted);
}
}
export { sharedFunctions }"
}
]
  </code></pre>
</li>
</ol>
</div>
</div><div class="w-full flex justify-center items-center">
                    <div class="w-full py-0 px-6 max-w-[1000px] gap-8 flex justify-between items-center">
                        <button @click=examples class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">{{$t("configurationPage.button")}}</button>
                        <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">{{$t("thisPage")}}</button>
                    </div>
                </div>
        </div>
      </template>
    
      <script setup>
        import { ref, onMounted, computed, watch } from 'vue';
        import { useRoute, useRouter } from 'vue-router';
        import { useI18n } from 'vue-i18n';
        const route = useRoute();
        const router = useRouter();
        const { locale } = useI18n();
        import commonFunctions from '../scripts/common.js'
        import { sharedFunctions } from '../scripts/custom/shared.js';
import $ from "jquery";
      
        
        
      
        onMounted(() => {
          
          
      
          
        });
  
        
  
        
      
        
function examples() {
    router.push({ path: '/examples' });
}

      </script>
      
      <style scoped>
        
      </style>