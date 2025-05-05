const customScripts = `
import { toast } from "vue3-toastify";
function gettingStarted() {
    router.push({ path: '/configuration' });
}
`;

const customReadyScripts = `
toast.success("Toast Test!");
commonFunctions.useSplashScreen({"title": "examplesPage.exampleSplash.title", "description": "examplesPage.exampleSplash.description", "buttons": [{"text": "examplesPage.exampleSplash.button", "action": commonFunctions.hideSplashScreen}], "timeout": 3000});
`;

module.exports = {
    "customScripts": customScripts,
    "customReadyScripts": customReadyScripts
};