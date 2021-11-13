import request from '@/utils/request'

export function initProgram(data) {
  return request({
    url: '/program/v1/init',
    method: 'post',
    data
  })
}

export function fetchActiveProgram() {
  return request({
    url: '/program/v1/active',
    method: 'get',
  })
}

export function fetchProgramList(data) {
  return request({
    url: '/program/v1/list',
    method: 'post',
    data
  })
}

export function fetchProgram(id) {
  return request({
    url: `/program/v1/fetch/${id}`,
    method: 'post',
  })
}

export function submitProgramAnswer(data) {
  return request({
    url: '/program/v1/submitAnswer',
    method: 'post',
    data
  })
}
