import Vue from 'vue'
import Router from 'vue-router'
import VueSignaturePad from 'vue-signature-pad';

Vue.use(Router)
Vue.use(VueSignaturePad);

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import materialRouter from './modules/material'
import programRouter from './modules/program'
import marqueeRouter from './modules/marquee'
import satisfactionRouter from './modules/satisfaction'
import mediaPreviewRouter from './modules/mediaPreview'

import hyStylePromoRouter from './modules/hyStylePromo'

/*empty page for children router*/
// import tmp from '@/components/core/tmp'


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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    meta: { title: '首頁', icon: 'mdi-cloud-upload' },    
    children: [
      {
      path: '',
      component: () => import('@/pages/homePage.vue'),
      meta: { title: '首頁', icon: 'mdi-cloud-upload', },
      }
    ]
  },
  {
    path: '/satisfaction/answer',
    name: 'Satisfaction-Answer',
    component: () => import('@/views/satisfaction/answer'),
    hidden: true,
    meta: { title: 'TPES-問卷', icon: 'mdi-pencil-box-multiple-outline' },
  },
  //TPES Form
  {
    path: '/tpesForm',
    name: 'TpesForm',
    component: () => import('@/pages/FormPage/FormPage.vue'),
    hidden: true,
    meta: { title: 'TPES Form', icon: 'mdi-file-document' }
  },
  {
    path: '/tpesForm/createForm',
    name: 'CreateForm',
    component: () => import('@/pages/FormPage/FormPage.vue'),
    hidden: true,
    meta: { title: 'TPES Form', icon: 'mdi-file-document' }
  },
  {
    path: '/tpesForm/cancelForm_cust',
    name: 'CancelForm',
    component: () => import('@/pages/FormPage/FormPage.vue'),
    hidden: true,
    meta: { title: 'TPES Form', icon: 'mdi-file-document' }
  },
  {
    path: '/tpesForm/viewForm',
    name: 'ViewForm',
    component: () => import('@/pages/FormPage/FormPage.vue'),
    hidden: true,
    meta: { title: 'TPES Form', icon: 'mdi-file-document' }
  },
  {
    path: '/imageEditor',
    name: 'ImageEditor',
    component: () => import('@/pages/imageEditorPage.vue'),
    hidden: true,
    meta: { title: 'imageEditor', icon: 'mdi-image' }
  },
  // external file
  {
    path: '/externalFileView',
    name: 'externalFileView',
    component: () => import('@/pages/externalFile/viewExternalFile.vue'),
    hidden: true,
    meta: { title: 'viewFile', icon: 'mdi-file-document' }
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // nestedRouter,

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  {
    path: "/myWorkSpace",
    redirect: "/myWorkSpace/myForm",
    component: Layout,
    name: "My WorkSpace",
    privilegeCode: ['P000','P001','P002','P003','P004','P005','P006','P007','P033'],
    meta: { title: '我的工作區', icon: 'mdi-account' },
    children: [
      {
        path: '/homePage',
        redirect: "/",
        privilegeCode: ['P000'],
        component: () => import('@/pages/homePage.vue'),
        meta: { title: '首頁', icon: 'mdi-account' }
      },
      {
        path: 'myFormPage',
        name: 'MyFormPage',
        privilegeCode: ['P001'],
        component: () => import('@/pages/my/myFormPage.vue'),
        meta: { title: '我的表單', icon: 'mdi-file-document-outline' }
      },
      {
        path: 'myReturn',
        name: 'MyReturn',
        privilegeCode: ['P002','P003','AUTH12','AUTH13'],
        component: () => import('@/pages/my/myReturnPage.vue'),
        meta: { title: '我的退件區', icon: 'mdi-alert' }
      },
      {
        path: 'myCancelPage',
        name: 'MyCancelPage',
        privilegeCode: ['P033'],
        component: () => import('@/pages/my/myCancelPage.vue'),
        meta: { title: '我的取消區', icon: 'mdi-file-document-outline' }
      },
      {
        path: 'inquireReadPage',
        name: 'InquireReadPage',
        privilegeCode: ['P004'],
        component: () => import('@/pages/my/inquireReadPage.vue'),
        meta: { title: '調閱申請', icon: 'mdi-book-arrow-left' }
      },
      {
        path: 'myRead',
        name: 'MyRead',
        privilegeCode: ['P005'],
        component: () => import('@/pages/my/myReadPage.vue'),
        meta: { title: '我的調閱區', icon: 'mdi-book-arrow-down' }
      },
      {
        path: 'leaveSearch',
        name: 'LeaveSearch',
        privilegeCode: ['P006'],
        component: () => import('@/pages/my/leaveSearchPage.vue'),
        meta: { title: '請假清單', icon: 'mdi-account-arrow-right-outline' }
      },
      {
        path: 'inquireLeave',
        name: 'InquireLeave',
        privilegeCode: ['P007'],
        component: () => import('@/pages/my/inquireLeavePage.vue'),
        meta: { title: '代理申請', icon: 'mdi-account-box-outline' }
      },
    ]
  },

  {
    path: "/signOff",
    component: Layout,
    name: "Sign off",
    privilegeCode: ['P008','P009','P010','P011','P012'],
    meta: { title: '簽核區', icon: 'mdi-pencil' },
    children: [
      {
        path: 'readSignOff',
        name: 'ReadSignOff',
        privilegeCode: ['P008'],
        component: () => import('@/pages/signOff/readSignOffPage.vue'),
        meta: { title: '調閱簽核', icon: 'mdi-pencil' }
      },      
      {
        path: 'sealSignOff',
        name: 'SealSignOff',
        privilegeCode: ['P009'],
        component: () => import('@/pages/signOff/sealSignOffPage.vue'),
        meta: { title: '專用章簽核', icon: 'mdi-pencil' }
      },{
        path: 'mediaOffPage',
        name: 'MediaSignOff',
        privilegeCode: ['P010','P011','P012'],
        component: () => import('@/pages/signOff/mediaOffPage'),
        meta: { title: '多媒體簽核', icon: 'mdi-pencil' }
      },
    ]
  },
  {
    path: "/accounting",
    component: Layout,
    name: "Accounting",
    privilegeCode: ['P013','P014','P015','P016'],
    meta: { title: '核算區', icon: 'mdi-account-multiple' },
    children: [
      {
        path: 'accountingDispatchPage',
        name: 'AccountingDispatchPage',
        privilegeCode: ['P013'],
        component: () => import('@/pages/accounting/accountingDispatchPage.vue'),
        meta: { title: '核算派工設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'myWaitingAccounting',
        name: 'MyWaitingAccounting',
        privilegeCode: ['P014'],
        component: () => import('@/pages/accounting/myWaitingAccountingPage.vue'),
        meta: { title: '待核算', icon: 'mdi-checkbox-blank-outline' }
      },
      {
        path: 'myWaitingArchieve',
        name: 'MyWaitingArchieve',
        privilegeCode: ['P015'],
        component: () => import('@/pages/accounting/myWaitingArchievePage.vue'),
        meta: { title: '待歸檔', icon: 'mdi-checkbox-blank-outline' }
      },
      {
        path: 'unDispatch',
        name: 'UnDispatch',
        privilegeCode: ['P016'],
        component: () => import('@/pages/accounting/unDispatchPage.vue'),
        meta: { title: '未分派區', icon: 'mdi-checkbox-blank-outline' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: "報表區",
    privilegeCode: ['P025','P026','P027','P028'],
    meta: { title: '報表區', icon: 'mdi-text-box' },
    children: [
      {
        path: 'rejectReport',
        name: 'RejectReport',
        privilegeCode: ['P025'],
        component: () => import('@/pages/report/rejectReportPage.vue'),
        meta: { title: '退件報表', icon: 'mdi-alert' }
      },
      {
        path: 'readReport',
        name: 'ReadReport',
        privilegeCode: ['P026'],
        component: () => import('@/pages/report/readReportPage.vue'),
        meta: { title: '調閱清單', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/search',
        name: 'Satisfaction-Report',
        privilegeCode: ['P027'],
        component: () => import('@/views/satisfaction/report'),
        meta: { title: '滿意度報表', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/month',
        name: 'Satisfaction-Report-Monthly',
        privilegeCode: ['P028'],
        component: () => import('@/views/satisfaction/reportMonth'),
        meta: { title: '滿意度各區處報表(月)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/week',
        name: 'Satisfaction-Report-Weekly',
        privilegeCode: ['P029'],
        component: () => import('@/views/satisfaction/reportWeek'),
        meta: { title: '滿意度個人摘要(週)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/reportDynamicRegion',
        name: 'Satisfaction-Report-Dynamic-RegionMonthly',
        privilegeCode: ['P028'],
        component: () => import('@/views/satisfaction/reportDynamicRegion'),
        meta: { title: '滿意度區處報表(自訂查詢區間)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 't-satisfyReport/reportDynamicPersonal',
        name: 'Satisfaction-Report-Dynamic-PersonalWeekly',
        privilegeCode: ['P028'],
        component: () => import('@/views/satisfaction/reportDynamicPersonal'),
        meta: { title: '滿意度個人動態查詢(自訂區間與%數)', icon: 'mdi-clipboard-search' }
      }
    ]
  },
  
  //跑馬燈
  marqueeRouter,
  //素材
  materialRouter,
  //節目單
  programRouter,
  //問卷
  satisfactionRouter,
  //預覽
  mediaPreviewRouter,
  
  {
    path: '/backStage',
    component: Layout,
    name: '後台管理',
    privilegeCode: ['P030','P031'],
    meta : { title: '後台管理', icon: 'mdi-cog-outline' },
    children: [
      {
        path: 'privilegeSetting',
        name: 'PrivilegeSetting',
        privilegeCode: ['P030'],
        component: () => import('@/pages/backStage/privilegeSettingPage.vue'),
        meta: { title: '權限設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'characterPrivilege',
        name: 'CharacterPrivilege',
        privilegeCode: ['P031'],
        component: () => import('@/pages/backStage/characterPrivilegePage.vue'),
        meta: { title: '角色設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'setting',
        name: 'Setting',
        privilegeCode: ['P032'],
        component: () => import('@/pages/backStage/backStageSettingPage.vue'),
        meta: { title: '後台參數檢視區', icon: 'mdi-cog-outline' }
      },
      {
        path: 'pmcVersionUpload',
        name: 'pmcVersionUpload',
        component: () => import('@/pages/backStage/pmcVersionUpload.vue'),
        meta: { title: 'PMC 版本上傳', icon: 'mdi-cog-outline' }
      },
      {
        path: 'pmcComputerList',
        name: 'pmcComputerList',
        component: () => import('@/pages/backStage/pmcComputerList.vue'),
        meta: { title: 'PMC 版本查詢', icon: 'mdi-cog-outline' }
      }
    ]
  },

  //HY Demo
  hyStylePromoRouter,
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // base: process.env.BASE_URL,
  routes: constantRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) { return savedPosition }
    if (to.hash) { return { selector: to.hash } }
    return { x: 0, y: 0 }
  }
  // scrollBehavior: () => ({ y: 0 }),
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router