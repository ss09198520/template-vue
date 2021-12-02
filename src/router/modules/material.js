/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const materialRouter = {
  path: '/material',
  name: 'MaterialPages',
  component: Layout,
  redirect: '/material/upload',
  privilegeCode: ['P021','P022'],
  meta: { title: '素材管理', icon: 'mdi-tooltip-image-outline' },
  children: [
    {
      path: 'upload',
      name: 'material-upload',
      privilegeCode: ['P021'],
      component: () => import('@/views/material/upload'),
      meta: { title: '素材上傳', icon: 'mdi-cloud-upload', },
    },{
      path: 'list',
      name: 'material-list',
      privilegeCode: ['P022'],
      component: () => import('@/views/material/list'),
      meta: { title: '素材總覽', icon: 'mdi-magnify', },
    }
  ]
}
export default materialRouter
