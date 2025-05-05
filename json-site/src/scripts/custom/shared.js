
      import siteData from '../../../siteData.json'
      import commonFunctions from '../common';
      const sharedFunctions = {
          getPageByPath: function(path) {
              const currentPageJson = siteData.pages.find(x => x.path == path);
              const formatted = JSON.stringify(currentPageJson, null, 2).replace(/</g, "&lt;").replace(/>/g, "&gt;");
              let modalHtml = '<pre class="bg-darkBg text-bg p-4 rounded-sm font-mono text-sm whitespace-pre-wrap">' + formatted + '</pre>'
              commonFunctions.openModal(500, 600, modalHtml);
          }
      }
      export { sharedFunctions }
    