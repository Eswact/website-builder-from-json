const dom =  {
    "type": "custom",
    "content": `<div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
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
</div>`
};

module.exports = dom;