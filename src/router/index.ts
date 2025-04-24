import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/risk-assessment',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        // path: 'index',
        // name: 'index',
        // component: () => import('@/views/index/index.vue'), // 原始 index 页面
        // children: [
        //   {
            path: 'risk-assessment',
            name: 'risk-assessment',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/RiskLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/RiskRightPanel.vue'), // 右侧框组件
            },
          },
          {
            path: 'disaster-monitoring',
            name: 'disaster-monitoring',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/MonitorLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/MonitorRightPanel.vue'), // 右侧框组件
            },
          },
          {
            path: 'spread-prediction',
            name: 'spread-prediction',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/SpreadLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/SpreadRightPanel.vue'), // 右侧框组件
            },
          },
          {
            path: 'fire-rescue',
            name: 'fire-rescue',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/RescueLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/RescueRightPanel.vue'), // 右侧框组件
            },
          },
          {
            path: 'disaster-recovery',
            name: 'disaster-recovery',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/RecoveryLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/RecoveryRightPanel.vue'), // 右侧框组件
            },
          },
          {
            path: 'emission-estimation',
            name: 'emission-estimation',
            // component: () => import('@/views/HomeView.vue'), // 复用 index 的结构
            meta: {
              leftComponent: () => import('@/views/index/EmissionLeftPanel.vue'), // 左侧框组件
              rightComponent: () => import('@/views/index/EmissionRightPanel.vue'), // 右侧框组件
            },
          },
    //     ],
    //   },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
