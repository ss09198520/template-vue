import request from '@/utils/request'

export const authUser = param => request.post('/api/authenticate', param)

export function fetchList(query) {
    return request({
      url: '/api/article/list',
      method: 'get',
      params: query
    })
  }
  
  export function fetchArticle(id) {
    return request({
      url: '/vue-element-admin/article/detail',
      method: 'get',
      params: { id }
    })
  }