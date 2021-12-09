/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const marqueeRouter = {
  path: '/marquee',
  redirect: '/marquee/marqueeCreate',
  component: Layout,
  name: 'MarqueePages',
  privilegeCode: ['P017','P18'],
  meta: { title: '跑馬燈管理', icon: 'mdi-clipboard-play-multiple' },
  children: [
    // {
    //   path: 'create',
    //   name: 'Marquee-Edit',
    //   component: () => import('@/views/marquee/create'),
    //   hidden: true,
    //   // hidden: true,
    //   privilegeCode: ['P017'],
    //   meta: { title: '跑馬燈製作', icon: 'mdi-pencil-box-multiple-outline' }
    // },
    // {
    //   path: 'list',
    //   name: 'Marquee-List',
    //   component: () => import('@/views/marquee/list'),
    //   // hidden: true,
    //   privilegeCode: ['P018'],
    //   meta: { title: '跑馬燈查詢', icon: 'mdi-magnify' }
    // },
    {
      path: 'marqueeCreate',
      name: 'MarqueeCreate',
      privilegeCode: ['P017'],
      component: () => import('@/views/marquee/createMarquee'),
      meta: { title: '跑馬燈製作', icon: 'mdi-pencil-box-multiple-outline' }
    },
    {
      path: 'queryList',
      name: 'Marquee-Query-List',
      privilegeCode: ['P018'],
      component: () => import('@/views/marquee/queryList'),
      meta: { title: '跑馬燈查詢', icon: 'mdi-magnify' }
    },
    {
      path: 'marqueeEdit',
      name: 'MarqueeEdit',
      privilegeCode: ['P017'],
      component: () => import('@/views/marquee/createMarquee'),
      // hidden: true,
      hidden: true,
      meta: { title: '跑馬燈編輯', icon: 'mdi-pencil-box-multiple-outline' }
    },
    {
      path: 'marqueeCalendar',
      name: 'Marquee-Calendar',
      component: () => import('@/views/marquee/calendarList'),
      // hidden: true,
      hidden: true,
      privilegeCode: ['P018'],
      meta: { title: '跑馬燈行事曆', icon: 'mdi-pencil-box-multiple-outline' },
    },
    {
      path: 'calendarList',
      name: 'Marquee-List-Calendar',
      component: () => import('@/views/marquee/calendar'),
      privilegeCode: ['P018'],
      // hidden: true,
      hidden: true,
      meta: { title: '跑馬燈行事曆', icon: 'mdi-pencil-box-multiple-outline' },
    },
    {
      path: 'redirect',
      name: 'Marquee-Redirect',
      hidden: true,
      privilegeCode: ['P018'],
      component: () => import('@/views/marquee/redirect')
    },
  ]
}



export default marqueeRouter
