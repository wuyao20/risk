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
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/homepage'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  // 部门主页
  {
    path: '/department',
    component: Layout,
    redirect: '/department/index',
    name: 'department',
    meta: { title: '部门', roles: [1, 4, 6] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/department/index'),
        meta: { title: '部门主页', icon: 'table', roles: [1, 4, 6] }
      },
      {
        hidden: true,
        path: 'summary/:workId',
        name: 'summary',
        component: () => import('@/views/department/summary/index'),
        meta: { title: '风险点明细', icon: 'table', roles: [6] }
      },
      {
        hidden: true,
        path: 'statistics/:riskname',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/task/index'),
        name: 'Statistics',
        meta: { title: '考核统计表', roles: [1, 4, 6] }
      },
      {
        hidden: true,
        path: 'monthReport/:workId',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/monthReport/index'),
        name: 'monthReport',
        meta: { title: '工作进展月报表', roles: [1, 4, 6] }
      }
    ]
  },

  // 区县主页
  {
    path: '/district',
    component: Layout,
    redirect: '/district/index',
    name: 'district',
    meta: { title: '区县', roles: [2, 5] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/district/index'),
        meta: { title: '区县主页', icon: 'form', roles: [2, 5] }
      },
      {
        hidden: true,
        path: 'report/:workId',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/district/monthReport/index'),
        name: 'report',
        meta: { title: '区县月报', roles: [2, 5] }
      },
      {
        hidden: true,
        path: 'salted',
        // ES2020语法 类似于require，动态导入组件
        component: () => import('@/views/department/task/index'),
        name: 'salted',
        meta: { title: 'salted', roles: [2, 5] }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    name: 'admin',
    meta: { title: '主管理员', icon: 'user', roles: [3] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/admin/index'),
        meta: { title: '人员管理', icon: 'user', roles: [3] }
      },
      {
        path: 'summary',
        name: 'summary',
        component: () => import('@/views/admin/summary/index'),
        meta: { title: '风险点列名管理', icon: 'example', roles: [3] }
      },
      {
        path: 'authority',
        name: 'authority',
        component: () => import('@/views/admin/authority/index'),
        meta: { title: '权限管理', icon: 'password', roles: [3] }
      },
      {
        path: 'depauthority',
        name: 'depauthority',
        component: () => import('@/views/admin/depAuthority/index'),
        meta: { title: '部门权限管理', icon: 'password', roles: [3] }
      },
      {
        path: 'risk',
        name: 'risk',
        component: () => import('@/views/admin/risk/risk'),
        meta: { title: '风险点管理', icon: 'password', roles: [3] }
      }
    ]
  },
  {
    path: '/secadmin',
    component: Layout,
    redirect: '/secadmin/index',
    name: 'secadmin',
    meta: { title: '二级管理员', icon: 'user', roles: [4, 5] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/secAdmin/index'),
        meta: { title: '人员管理', icon: 'user', roles: [4, 5] }
      },
      // {
      //   path: 'authmanage',
      //   name: 'authmanage',
      //   component: () => import('@/views/secAdmin/authManage/index'),
      //   meta: { title: '权限管理', icon: 'example', roles: [4, 5] }
      // },
      {
        path: 'risk',
        name: 'risk',
        component: () => import('@/views/secAdmin/risk/risk'),
        meta: { title: '风险点管理', icon: 'example', roles: [4] }
      }
    ]
  },
  {
    path: '/result',
    component: Layout,
    redirect: '/result/record',
    name: 'admin',
    meta: { title: '结果汇总', icon: 'table', roles: [3] },
    children: [
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/result/record/index'),
        meta: { title: '风险点记录', icon: 'jilu', roles: [3] }
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/result/month/index'),
        meta: { title: '部门月报', icon: 'nested', roles: [3] }
      },
      {
        path: 'district',
        name: 'district',
        component: () => import('@/views/result/month/district'),
        meta: { title: '区县月报', icon: 'nested', roles: [3] }
      }
      // {
      //   path: 'departmenthalfyear',
      //   name: 'departmenthalfyear',
      //   component: () => import('@/views/result/halfyear/department'),
      //   meta: { title: '部门半年检查表', icon: 'nested', roles: [3] }
      // },
      // {
      //   path: 'districthalfyear',
      //   name: 'districthalfyear',
      //   component: () => import('@/views/result/halfyear/district'),
      //   meta: { title: '区县半年检查表', icon: 'nested', roles: [3] }
      // }
    ]
  },
  {
    path: '/secresult',
    component: Layout,
    redirect: '/secresult/index',
    name: 'admin',
    meta: { title: '下载', icon: 'table', roles: [4, 5] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/secResult/index'),
        meta: { title: '1、各风险点填写记录', roles: [4, 5] }
      },
      {
        path: 'month',
        name: 'month',
        component: () => import('@/views/secResult/month/index'),
        meta: { title: '2、部门月报记录', roles: [4] }
      },
      {
        path: 'month',
        name: 'month',
        component: () => import('@/views/secResult/month/district'),
        meta: { title: '2、区县月报记录', roles: [5] }
      }
    ]
  },
  // {
  //   path: '/halfyear',
  //   component: Layout,
  //   redirect: '/halfyear/department',
  //   name: 'halfyear',
  //   meta: { title: '半年检查表', icon: 'table', roles: [4, 5] },
  //   children: [
  //     {
  //       path: 'department',
  //       name: 'department',
  //       component: () => import('@/views/halfyear/department'),
  //       meta: { title: '部门半年检查表', icon: 'table', roles: [4] }
  //     },
  //     {
  //       path: 'district',
  //       name: 'district',
  //       component: () => import('@/views/halfyear/district'),
  //       meta: { title: '区县半年检查表', icon: 'table', roles: [5] }
  //     }
  //   ]
  // },
  {
    path: '/myrecord',
    component: Layout,
    redirect: '/myrecord/index',
    name: 'myrecord',
    meta: { title: '记录', icon: 'table', roles: [1, 2, 6] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/dashboard/myrecord'),
        meta: { title: '风险点填写记录', icon: 'dashboard', roles: [1, 6] }
      },
      {
        hidden: true,
        path: 'result',
        name: 'result',
        component: () => import('@/views/dashboard/result'),
        meta: { title: '风险点填写记录', icon: 'dashboard', roles: [1, 6] }
      }
      // {
      //   path: 'result',
      //   name: 'result',
      //   component: () => import('@/views/dashboard/month/index'),
      //   meta: { title: '月报填写记录', icon: 'nested', roles: [1, 2, 6] }
      // }
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
