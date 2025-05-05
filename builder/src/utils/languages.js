const fs = require('fs');
const path = require('path');
const siteData = require('../siteData/data.js');
const paths = require('./paths.js');
const { clearAndCreateDir } = require('./files.js');

function createLanguageService() {
    const languageServiceContent = `
  import { createI18n } from 'vue-i18n';
  ${siteData.languages.options.map(lang => `import ${lang.code} from '../locales/${lang.code}.json';`).join('\n')}
  
  export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('selectedLanguage') || '${siteData.languages.default}',
    fallbackLocale: '${siteData.languages.default}',
    messages: { ${siteData.languages.options.map(lang => `${lang.code},`).join(' ')} }
  });
  
  export default i18n;`
    fs.writeFileSync(paths.languageServiceDir, languageServiceContent);
}

function createLanguages() {
    clearAndCreateDir(paths.languagesDir);
    siteData.languages.options.forEach(lang => {
        const langFilePath = path.join(paths.languagesDir, `${lang.code}.json`);
        fs.writeFileSync(langFilePath, JSON.stringify(lang.data, null, 2));
        console.log(`Language file created: ${langFilePath}`);
    });
    createLanguageService();
}

module.exports = { createLanguages };