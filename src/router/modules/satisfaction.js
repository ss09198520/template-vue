/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const satisfactionRouter = {
  path: '/satisfaction',
  component: Layout,
  name: 'SatisfactionPages',
  privilegeCode: ['P019','P020'],
  meta: { title: '滿意度調查', icon: 'mdi-clipboard-text-multiple' },
  children: [
    {
      path: 'create',
      name: 'Satisfaction-create',
      privilegeCode: ['P019'],
      component: () => import('@/views/satisfaction/create'),
      meta: { title: '問卷製作', icon: 'mdi-clipboard-text-multiple' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'Satisfaction-Edit',
      component: () => import('@/views/satisfaction/edit'),
      privilegeCode: ['P019'],
      hidden: true,
      meta: { title: '問卷編輯', icon: 'mdi-clipboard-text-multiple' }
    },
    {
      path: 'list',
      name: 'Satisfaction-list',
      privilegeCode: ['P020'],
      component: () => import('@/views/satisfaction/list'),
      meta: { title: '問卷查詢', icon: 'mdi-clipboard-text-search' }
    },
  ]
}

export default satisfactionRouter
