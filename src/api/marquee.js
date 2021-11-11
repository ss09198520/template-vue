import request from '@/utils/request'

export function fetchInitMarquee(data) {
  return request({
    url: '/marquee/v1/init',
    method: 'post',
    data,
    headers: {
      'content-type': 'multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd'
    },
  })
}

export function fetchListMarquee(data) {
  return request({
    url: '/marquee/v1/list',
    method: 'post',
    data
  })
}