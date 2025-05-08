import { ref, computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import pagesData from '../../siteData.json';
import commonFunctions from '../scripts/common';
import userService from '../services/userService';
import i18n from '../services/languageService';
const modules = import.meta.glob('../views/*.vue');
const isLogin =  computed(() => userService.authControl.value);
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
      requiresAuth: page.authRequired,
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && pagesData.users.active) {
    if (isLogin.value) {
      next();
    }
    else {
      // page reload control
      const isValid = await userService.isLoggedIn();
      if (isValid) {
          next();
      } else {
          next({ name: 'notFound' });
      }
    }
  }
  else {
    next();
  }
});


export default router;