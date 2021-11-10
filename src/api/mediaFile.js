import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/mediaFile/v1/upload',
    method: 'post',
    data
  })
}

export function listMediaFile(data) {
  return request({
    url: '/mediaFile/v1/list',
    method: 'post',
    data
  })
}

export function deleteFile(id) {
  return request({
    url: `/mediaFile/v1/delete/${id}`,
    method: 'post',
  })
}