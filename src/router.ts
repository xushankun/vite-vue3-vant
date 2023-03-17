import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/',
    redirect: {
      name: 'goods'
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/user/index.vue'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/view/cart/index.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    path: '/goods',
    component: () => import('@/view/goods/index.vue'),
    meta: {
      title: '商品详情'
    }
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/login/login.vue'),
    meta: { title: '登录', noLogin: true }
  },
  // 列表
  {
    name: 'demoList',
    path: '/demoList',
    component: () => import(/* webpackChunkName: "demoList" */ '@/components/demo/list.vue'),
    meta: { title: '列表' }
  },
  {
    name: 'demoForm',
    path: '/demoForm',
    component: () => import(/* webpackChunkName: "demoForm" */ '@/components/demo/editForm.vue'),
    meta: { title: '表单' }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
