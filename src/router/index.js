import Vue from 'vue'
import Router from 'vue-router'
import VueSignaturePad from 'vue-signature-pad';

Vue.use(Router)
Vue.use(VueSignaturePad);

/* Layout */
import Layout from '@/layout'

/*empty page for children router*/
// import tmp from '@/components/core/tmp'


/* Router Modules */
// import nestedRouter from './modules/nested'

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
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
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
    meta: { title: '客戶填答問卷頁面', icon: 'mdi-pencil-box-multiple-outline' },
  },
  {
    path: "/myWorkSpace",
    redirect: "/myWorkSpace/myForm",
    component: Layout,
    name: "My WorkSpace",
    meta: { title: '我的工作區', icon: 'mdi-account' },
    children: [
      {
        path: '/homePage',
        redirect: "/",                
        component: () => import('@/pages/homePage.vue'),
        meta: { title: '首頁', icon: 'mdi-account' }
      },
      {
        path: 'myFormPage',
        name: 'MyFormPage',
        component: () => import('@/pages/my/myFormPage.vue'),
        meta: { title: '我的表單', icon: 'mdi-file-document-outline' }
      },
      {
        path: 'myReturn',
        name: 'MyReturn',
        component: () => import('@/pages/my/myReturnPage.vue'),
        meta: { title: '我的退件區', icon: 'mdi-alert' }
      },
      {
        path: 'inquireReadPage',
        name: 'InquireReadPage',
        component: () => import('@/pages/my/inquireReadPage.vue'),
        meta: { title: '調閱申請', icon: 'mdi-book-arrow-left' }
      },
      {
        path: 'myRead',
        name: 'MyRead',
        component: () => import('@/pages/my/myReadPage.vue'),
        meta: { title: '我的調閱區', icon: 'mdi-book-arrow-down' }
      },
      {
        path: 'leaveSearch',
        name: 'LeaveSearch',
        component: () => import('@/pages/my/leaveSearchPage.vue'),
        meta: { title: '請假清單', icon: 'mdi-account-arrow-right-outline' }
      },
      {
        path: 'inquireLeave',
        name: 'InquireLeave',
        component: () => import('@/pages/my/inquireLeavePage.vue'),
        meta: { title: '代理申請', icon: 'mdi-account-box-outline' }
      },
    ]
  },
  {
    path: "/signOff",
    component: Layout,
    name: "Sign off",
    meta: { title: '簽核區', icon: 'mdi-pencil' },
    children: [
      {
        path: 'readSignOff',
        name: 'ReadSignOff',
        component: () => import('@/pages/signOff/readSignOffPage.vue'),
        meta: { title: '調閱簽核', icon: 'mdi-pencil' }
      },      
      {
        path: 'sealSignOff',
        name: 'SealSignOff',
        component: () => import('@/pages/signOff/sealSignOffPage.vue'),
        meta: { title: '專用章簽核', icon: 'mdi-pencil' }
      },{
        path: 'mediaOffPage',
        name: 'MediaSignOff',
        component: () => import('@/pages/signOff/mediaOffPage'),
        meta: { title: '多媒體簽核', icon: 'mdi-pencil' }
      },
    ]
  },
  {
    path: "/accounting",
    component: Layout,
    name: "Accounting",
    meta: { title: '核算區', icon: 'mdi-account-multiple' },
    children: [
      {
        path: 'accountingDispatchPage',
        name: 'AccountingDispatchPage',
        component: () => import('@/pages/accounting/accountingDispatchPage.vue'),
        meta: { title: '核算派工設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'myWaitingAccounting',
        name: 'MyWaitingAccounting',
        component: () => import('@/pages/accounting/myWaitingAccountingPage.vue'),
        meta: { title: '待核算', icon: 'mdi-checkbox-blank-outline' }
      },
      {
        path: 'myWaitingArchieve',
        name: 'MyWaitingArchieve',
        component: () => import('@/pages/accounting/myWaitingArchievePage.vue'),
        meta: { title: '待歸檔', icon: 'mdi-checkbox-blank-outline' }
      },
      {
        path: 'unDispatch',
        name: 'UnDispatch',
        component: () => import('@/pages/accounting/unDispatchPage.vue'),
        meta: { title: '未分派區', icon: 'mdi-checkbox-blank-outline' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: "報表區",
    meta: { title: '報表區', icon: 'mdi-text-box' },
    children: [
      {
        path: 'returnReport',
        name: 'ReturnReport',
        component: () => import('@/pages/report/returnReportPage.vue'),
        meta: { title: '退件報表', icon: 'mdi-alert' }
      },
      {
        path: 'readReport',
        name: 'ReadReport',
        component: () => import('@/pages/report/readReportPage.vue'),
        meta: { title: '調閱清單', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/search',
        name: 'Satisfaction-Report',
        component: () => import('@/views/satisfaction/report'),
        meta: { title: '滿意度報表', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/month',
        name: 'Satisfaction-Report-Monthly',
        component: () => import('@/views/satisfaction/reportMonth'),
        meta: { title: '滿意度各區處報表(月)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/week',
        name: 'Satisfaction-Report-Weekly',
        component: () => import('@/views/satisfaction/reportWeek'),
        meta: { title: '滿意度個人摘要(週)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 'satisfyReport/reportDynamicRegion',
        name: 'Satisfaction-Report-Dynamic-RegionMonthly',
        component: () => import('@/views/satisfaction/reportDynamicRegion'),
        meta: { title: '滿意度區處報表(自訂查詢區間)', icon: 'mdi-clipboard-search' }
      },
      {
        path: 't-satisfyReport/reportDynamicPersonal',
        name: 'Satisfaction-Report-Dynamic-PersonalWeekly',
        component: () => import('@/views/satisfaction/reportDynamicPersonal'),
        meta: { title: '不滿意度個人動態查詢(自訂區間與%數)', icon: 'mdi-clipboard-search' }
      }
    ]
  },
  {
    path: '/material',
    name: 'MaterialPages',
    component: Layout,
    redirect: '/material/upload',
    meta: { title: '素材管理', icon: 'mdi-tooltip-image-outline' },
    children: [
      {
        path: 'upload',
        name: 'material-upload',
        component: () => import('@/views/material/upload'),
        meta: { title: '素材上傳', icon: 'mdi-cloud-upload', },
      },{
        path: 'list',
        name: 'material-list',
        component: () => import('@/views/material/list'),
        meta: { title: '素材總覽', icon: 'mdi-magnify', },
      }
    ]
  },
  {
    path: '/satisfaction',
    component: Layout,
    name: 'SatisfactionPages',
    meta: { title: '滿意度調查', icon: 'mdi-clipboard-text-multiple' },
    children: [
      {
        path: 'create',
        name: 'Satisfaction-create',
        component: () => import('@/views/satisfaction/create'),
        meta: { title: '問卷製作', icon: 'mdi-clipboard-text-multiple' }
      },
      {
        path: 'list',
        name: 'Satisfaction-list',
        component: () => import('@/views/satisfaction/list'),
        meta: { title: '問卷查詢', icon: 'mdi-clipboard-text-search' }
      },
    ]
  },
  {
    path: '/media/preview',
    component: Layout,
    name: 'PreviewPages',
    hidden: true,
    meta: { title: '多媒體預覽頁面', icon: 'mdi-clipboard-text-multiple' },
    children: [
      {
        path: 'questionnaire/:id(\\d+)',
        component: () => import('@/views/satisfaction/preview'),
        name: 'Satisfaction-preview',
        hidden: true,
        meta: { title: '問卷預覽', icon: 'mdi-pencil-box-multiple-outline' },
      },
    ]
  },
  {
    path: '/marquee',
    redirect: '/marquee/create',
    component: Layout,
    name: 'MarqueePages',
    meta: { title: '跑馬燈管理', icon: 'mdi-clipboard-play-multiple' },
    children: [
      {
        path: 'create',
        name: 'Marquee-Edit',
        component: () => import('@/views/marquee/create'),
        meta: { title: '跑馬燈製作', icon: 'mdi-pencil-box-multiple-outline' }
      },
      {
        path: 'list',
        name: 'Marquee-List',
        component: () => import('@/views/marquee/list'),
        meta: { title: '跑馬燈查詢', icon: 'mdi-magnify' }
      },
      {
        path: 't-create',
        name: 't-Marquee-Edit',
        component: () => import('@/views/marquee/t-create'),
        meta: { title: 't-跑馬燈製作', icon: 'mdi-pencil-box-multiple-outline' }
      },
      {
        path: 't-calendarList',
        name: 't-Marquee-List-Calendar',
        component: () => import('@/views/marquee/t-calendar'),
        hidden: true,
        meta: { title: 't-跑馬燈行事曆', icon: 'mdi-pencil-box-multiple-outline' },
      },
      {
        path: 'calendarList',
        name: 'Marquee-List-Calendar',
        component: () => import('@/views/marquee/calendar'),
        hidden: true,
        meta: { title: '跑馬燈行事曆', icon: 'mdi-pencil-box-multiple-outline' },
      }
    ]
  },
  {
    path: '/program',
    redirect: '/program/create',
    component: Layout,
    name: 'ProgramPages',
    meta: { title: '節目管理', icon: 'mdi-video-box' },
    children: [
      {
        path: 'create',
        name: 'Program-Create',
        component: () => import('@/views/program/create'),
        meta: { title: '節目單製作', icon: 'mdi-movie-edit' }
      },
      {
        path: 'list',
        name: 'Program-List',
        component: () => import('@/views/program/list'),
        meta: { title: '節目單查詢', icon: 'mdi-magnify' }
      },
      {
        path: 'calendarList',
        name: 'Program-List-Calendar',
        component: () => import('@/views/program/calendar'),
        hidden: true,
        meta: { title: '節目單行事曆', icon: 'mdi-pencil-box-multiple-outline' },
      }
    ]
  },
  {
    path: '/backStage',
    component: Layout,
    name: '後台管理',
    meta : { title: '後台管理', icon: 'mdi-cog-outline' },
    children: [
      {
        path: 'privilegeSetting',
        name: 'PrivilegeSetting',
        component: () => import('@/pages/backStage/privilegeSettingPage.vue'),
        meta: { title: '權限設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'characterPrivilege',
        name: 'CharacterPrivilege',
        component: () => import('@/pages/backStage/characterPrivilegePage.vue'),
        meta: { title: '角色設定', icon: 'mdi-account-multiple' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/pages/backStage/backStageSettingPage.vue'),
        meta: { title: '後台資訊設定區', icon: 'mdi-cog-outline' }
      }
    ]
  },
  {
    path: "/hy",
    redirect: "/hy/stylePromo",
    component: Layout,  
    name: "HY Pages",
    meta: { title: 'HY Prototype', icon: 'mdi-account-multiple' },
    children: [
      {
        path: 'stylePromo',
        name: 'StylePromo',
        component: () => import('@/pages/stylePromoPage'),
        meta: { title: 'style demo', icon: 'mdi-draw' }
      },
      {
        path: '/timer',
        name: 'Timer',
        component: () => import('@/pages/timerPage'),
        meta: { title: 'timer', icon: 'mdi-clock-outline' }
      },
      {
        path: '/imageEditor',
        name: 'ImageEditor',
        component: () => import('@/pages/imageEditorPage.vue'),
        meta: { title: 'imageEditor', icon: 'mdi-image' }
      },
      {
        path: '/tpesForm',
        name: 'TpesForm',
        component: () => import('@/pages/FormPage/FormPage.vue'),
        meta: { title: 'TPES Form', icon: 'mdi-file-document' }
      }
    ]
  }
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