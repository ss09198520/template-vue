import request from '@/utils/request'

export function fetchActiveQuestionnaire() {
  return request({
    url: '/questionnaire/v1/active',
    method: 'get',
  })
}

export function fetchQuestionnaire(id) {
  return request({
    url: '/questionnaire/v1/active',
    method: 'get',
    params: { id }
  })
}