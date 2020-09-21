import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/department',
    component: Layout,
    redirect: '/department/index',
    name: 'department',
    meta: { title: '部门', roles: [1] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/department/index'),
        meta: { title: '部门主页', icon: 'table', roles: [1] }
      },
      {
        hidden: true,
        path: 'statistics/:workId',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/task/index'),
        name: 'Statistics',
        meta: { title: '考核统计表', roles: [1] }
      },
      {
        hidden: true,
        path: 'monthReport/:workId',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/monthReport/index'),
        name: 'monthReport',
        meta: { title: '工作进展月报表', roles: [1] }
      }
    ]
  },

  {
    path: '/district',
    component: Layout,
    redirect: '/district/index',
    name: 'district',
    meta: { title: '区县', roles: [2] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/district/index'),
        meta: { title: '区县主页', icon: 'form', roles: [2] }
      },
      {
        hidden: true,
        path: 'report/:workId',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/district/monthReport/index'),
        name: 'report',
        meta: { title: '区县月报', roles: [2] }
      },
      {
        hidden: true,
        path: 'salted',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/task/index'),
        name: 'salted',
        meta: { title: 'salted', roles: [2] }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    name: 'admin',
    meta: { title: '管理', roles: [3] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/admin/index'),
        meta: { title: '人员管理', icon: 'user', roles: [3] }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
