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


// 簽核相關
export function queryMediaSignOff(data) {
  return request({
    url: '/mediaSign/v1/querySignOff',
    method: 'post',
    data
  })
}

export function mediaSignOff(data) {
  return request({
    url: '/mediaSign/v1/mediaSignOff',
    method: 'post',
    data
  })
}

export function downloadMediaSignOffFile(data) {
  return request({
    url: '/mediaSign/v1/downloadMediaSignOffFile',
    method: 'post',
    responseType: 'blob',
    data
  })
}

// 退件相關
export function queryMediaReturnList() {
  return request({
    url: '/mediaSign/v1/queryMediaReturnList',
    method: 'post',
  })
}


