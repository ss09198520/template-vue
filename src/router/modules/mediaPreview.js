/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mediaPreviewRouter = {
  path: '/media/preview',
  component: Layout,
  name: 'PreviewPages',
  privilegeCode: ['P020'],
  hidden: true,
  //hidden: true,
  meta: { title: '多媒體預覽頁面', icon: 'mdi-clipboard-text-multiple' },
  children: [
    {
      path: 'questionnaire/:id(\\d+)',
      component: () => import('@/views/satisfaction/preview'),
      name: 'Satisfaction-preview',
      privilegeCode: ['P020'],
      // hidden: true,
      hidden: true,
      meta: { title: '問卷預覽', icon: 'mdi-pencil-box-multiple-outline' },
    },
  ]
}

export default mediaPreviewRouter
