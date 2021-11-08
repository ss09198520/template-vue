import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/mediaFile/v1/upload',
    method: 'post',
    data
  })
}
