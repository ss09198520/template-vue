/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const programRouter = {
  path: '/program',
  redirect: '/program/create',
  component: Layout,
  name: 'ProgramPages',
  privilegeCode: ['P023','P024'],
  meta: { title: '節目管理', icon: 'mdi-video-box' },
  children: [
    {
      path: 'create',
      name: 'Program-Create',
      privilegeCode: ['P023'],
      component: () => import('@/views/program/create'),
      meta: { title: '節目單製作', icon: 'mdi-movie-edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'Program-Edit',
      component: () => import('@/views/program/edit'),
      // hidden: true,
      hidden: true,
      privilegeCode: ['P023'],
      meta: { title: '節目單編輯', icon: 'mdi-movie-edit' }
    },
    {
      path: 'list',
      name: 'Program-List',
      privilegeCode: ['P024'],
      component: () => import('@/views/program/list'),
      meta: { title: '節目單查詢', icon: 'mdi-magnify' }
    },
    {
      path: 'calendarList',
      name: 'Program-List-Calendar',
      component: () => import('@/views/program/calendar'),
      privilegeCode: ['P024'],
      // hidden: true,
      hidden: true,
      meta: { title: '節目單行事曆', icon: 'mdi-pencil-box-multiple-outline' },
    }
  ]
}

export default programRouter
