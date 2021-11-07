import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/mediaFile/v1/upload',
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
    },
    method: 'post',
    data
  })
}
