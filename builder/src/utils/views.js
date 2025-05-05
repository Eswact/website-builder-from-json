const fs = require('fs');
const path = require('path');
const siteData = require('../siteData/data.js');
const paths = require('./paths.js');
const { clearAndCreateDir } = require('./files.js');
const { createDatatableDom, generateDatatableScript } = require('./doms/datatable.js');
const { generateCardsDom, generateCardsScript } = require('./doms/cards.js');

function createShortcutsScript(shortcuts) {
    let shortcutList = '';
    shortcuts.forEach((shortcut, index) => {
        const keysArray = shortcut.keys.map(k => `'${k.toLowerCase()}'`).join(', ');
        shortcutList += `// Shortcut ${index + 1}: [${shortcut.keys.join(' + ')}]
      if ([${keysArray}].every(k => pressedKeys.has(k)) && pressedKeys.size === ${shortcut.keys.length}) {
        e.preventDefault();
        (${shortcut.action.toString()})();
      }`;
    });

    let script = `document.addEventListener('keydown', function (e) {
      const pressedKeys = new Set();
  
      // Modifier tuşlar
      if (e.ctrlKey) pressedKeys.add('ctrl');
      if (e.shiftKey) pressedKeys.add('shift');
      if (e.altKey) pressedKeys.add('alt');
      if (e.metaKey) pressedKeys.add('meta');
  
      // Basılan tuş
      pressedKeys.add(e.key.toLowerCase());
  
      ${shortcutList}
    });`;

    return script;
}

function createViews() {
    clearAndCreateDir(paths.viewsDir);

    //Pages
    siteData.pages.forEach(page => {
        //Doms
        let doms = page.doms.map(item => {
            switch (item.type) {
                case 'datatable':
                    return createDatatableDom(item);
                case 'cards':
                    return generateCardsDom(item);
                case 'custom':
                    return item.content;
                default:
                    return '';
            }
        }).join('');

        //Script Imports
        let scriptsImports = (siteData.scripts || []).map(script => {
            let thisPageScript = script.pages.find(x => x.name === page.name);
            return thisPageScript ? `import ${thisPageScript.import} from '../scripts/custom/${script.name}.js';` : '';
        }).join('\n');
        scriptsImports += '\nimport $ from "jquery";';
        (!page.doms.every(x => x.type != 'datatable')) ? scriptsImports += '\nimport datatableService from "../services/datatable/index.js";' : '';
        (!page.doms.every(x => x.type != 'cards')) ? scriptsImports += '\nimport cardService from "../services/cardService";\nimport { useBasketStore } from "../store/basketStore";\nconst basketStore = useBasketStore();' : '';


        //Datatable scripts
        const datatableScripts = page.doms.filter(x => x.type === 'datatable').map(item => generateDatatableScript(item)).join('\n');
        const cardsScripts = page.doms.filter(x => x.type === 'cards').map(item => generateCardsScript(item)).join('\n');

        let content = `
      <template>
        <div class="${page.pageCss || 'w-full flex flex-col gap-1'}">
          ${doms}
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
        ${scriptsImports}
      
        ${datatableScripts}
        ${cardsScripts}
      
        onMounted(() => {
          ${page.doms.filter(x => x.type == 'datatable').map(function (item, index) {
            return `${item.name} = datatableService.initializeDataTable('${item.name}', '#${item.id}', ${item.id}Ajax, ${item.id}Columns, ${(item.filters && item.filters.data && item.filters.data.length > 0) ? `${item.id}Filters` : null}, ${item.id}TableOptions, ${item.id}Operations, ${item.id}Options);`;
        }).join('\n')}
          ${page.doms.filter(x => x.type == 'cards').map(function (item, index) {
            return `get${item.name}();
            ${item.ordering
                    ? `$('#${item.name}OrderModalButton').off('click').on('click', ${item.name}ToggleOrderVisibility)`
                    : ''
                }
            ${item.filters
                    ? `$('#${item.name}FiltersButton').off('click').on('click', ${item.name}OpenCardFilters);`
                    : ''
                }`;
        }).join('\n')}
      
          ${page.customReadyScripts || ''}
        });
  
        ${page.doms.filter(x => x.type == 'datatable').map(function (item, index) {
            return `watch(locale, () => {
          ${item.name}.destroy();
          ${item.name} = null;
          ${item.name} = datatableService.initializeDataTable('${item.name}', '#${item.id}', ${item.id}Ajax, ${item.id}Columns, ${(item.filters && item.filters.data && item.filters.data.length > 0) ? `${item.id}Filters` : null}, ${item.id}TableOptions, ${item.id}Operations, ${item.id}Options);
          });`;
        }).join('\n')}
  
        ${page.shortcuts ? createShortcutsScript(page.shortcuts) : ''}
      
        ${page.customScripts || ''}
      </script>
      
      <style scoped>
        ${page.scopedCss || ''}
      </style>`;

        let filePath = path.join(paths.viewsDir, page.file);
        fs.writeFileSync(filePath, content.trim());
        console.log(`Created: ${filePath}`);
    });
}

module.exports = { createViews };