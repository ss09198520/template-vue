import request from '@/utils/request'

export const authUser = param => request.post('/api/authenticate', param)

  
  export function login(data) {
    return request({
      url: `/login?username=${data.username}&password=${data.password}`,
      method: 'post',
    })
  }

  export function logout() {
    return request({
      url: '/logout',
      method: 'post'
    })
  }
  export function getAuthMenu() {
    return request({
      url: `/menuAuth/queryAuthMenu`,
      method: 'post',
    })
  }
  