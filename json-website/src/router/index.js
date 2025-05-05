import { createRouter, createWebHistory } from 'vue-router';
import pagesData from '../../siteData.json';
import commonFunctions from '../scripts/common';
import i18n from '../services/languageService';
const modules = import.meta.glob('../views/*.vue');
const t = i18n.global.t;

const routes = pagesData.pages.map((page) => {
  return {
    path: page.path,
    name: page.name,
    component: modules[`../views/${page.file}`],
    meta: {
      title: page.seo.title || pagesData.general.title || pagesData.general.siteName,
      description: page.seo.description || '',
      keywords: page.seo.keywords || [],
    }
  };
});
routes.push({
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('../components/NotFound.vue')
});

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { return savedPosition; } 
    else {  return { top: 0 }; }
  },
});

router.afterEach((to) => {
  const seo = to.meta;
  if (seo) {
    const translatedKeywords = (seo.keywords || []).map(k => t(k));
    commonFunctions.updateSEO({
      title: t(seo.title),
      description: t(seo.description),
      keywords: translatedKeywords,
    });
  }
});

export default router;