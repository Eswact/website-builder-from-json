// Imports
const { createVueProject } = require('./src/utils/vueProject.js');
const { copyImages } = require('./src/utils/images.js');
const { setFonts } = require('./src/utils/fonts.js');
const { createLanguages } = require('./src/utils/languages.js');
const { createUsers } = require('./src/utils/users.js');
const { createJsonFile } = require('./src/utils/jsonFile.js');
const { createCustomScripts } = require('./src/utils/scripts.js');
const { createViews } = require('./src/utils/views.js');

async function generateSite() {
  await createVueProject();

  await Promise.all([
    copyImages(),
    setFonts(),
    createLanguages(),
    createUsers(),
    createJsonFile(),
    createCustomScripts(),
    createViews(),
  ]);

  require('child_process').execSync(`cd ../json-website && pnpm run dev`, { stdio: 'inherit' });
}

generateSite();