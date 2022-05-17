import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/TheLogin.vue';
import Register from '@/views/auth/TheRegister.vue';
import Layout from '@/views/layouts/AppLayout.vue';
import LayoutWithoutSidebar from '@/views/layouts/AppLayoutWithoutSidebar.vue';

import components from './modules/components';
import widgets from './modules/widgets';
import uiComponents from './modules/ui-components';
import tables from './modules/tables';
import charts from './modules/charts';
import excel from './modules/excel';

import musicComponents from './modules/music-components';
import playlistComponents from './modules/playlist-components'
import recommendComponets from './modules/recommendComponets';


Vue.use(Router);

/**
* TIPS:
* meta: {
*   hidden: false,    // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
*   auth: [],         // It will control the page roles (you can set multiple roles)
*   icon: 'home',     // Icon will appear in the navigation bar or sidebar
*   hasMulSub: false, // It has multiple children
* }
*/
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hidden:true,
      },
    },
    {
      path: '/',
      redirect: { name: 'Dashboard' },
      meta: {
        hidden: true,
      },
    },
    {
      path: '/index',
      name: 'Index',
      component: Layout,
      redirect: { name: 'Dashboard' },
      meta: {
        hidden: true,
        hasMulSub: false,
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          // component: () => import('@/views/dashboard/TheIndex.vue'),
          component: () => import('@/views/music/VHomePage.vue'),
          meta: {
            icon: 'dashboard',
          },
        },
        musicComponents,
        playlistComponents,
        recommendComponets,
        // components,
        // widgets,
        // uiComponents,
        // tables,
        // charts,
        // excel,
      ],
    },
    {
      path: '/admin',
      component: LayoutWithoutSidebar,
      redirect: { name: 'Admin' },
      children: [
        {
          path: '/admin',
          name: 'Admin',
          component: () => import('@/views/admin/VHomepage.vue'),
          meta: {
            hidden: true,
          },
        },
      ],
    },
    {
      path: '/403',
      // redirect: { name: 'Index' },
      component: Login,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/404',
      meta: {
        hidden: true,
      },
      component: () => import('@/views/error-pages/App404.vue'),
    },
    {
      path: '*',
      redirect: '/404',
      meta: {
        hidden: true,
      },
    },
  ],
});
