/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const hyStylePromoRouter = {
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
    // external file
    {
      path: '/externalFileView',
      name: 'externalFileView',
      component: () => import('@/pages/externalFile/viewExternalFile.vue'),
      meta: { title: 'viewFile', icon: 'mdi-file-document' }
    },
  ]
}

export default hyStylePromoRouter
