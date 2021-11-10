import request from '@/utils/request'

export function fetchInitMarquee(data) {
  return request({
    url: '/marquee/v1/init',
    method: 'post',
    data,
    headers: {
      "Content-Type": undefined
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