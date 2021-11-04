import request from '@/utils/request'

export function initQuestionnaireAnswer(data) {
  return request({
    url: '/questionnaire/v1/init',
    method: 'post',
    data
  })
}

export function fetchActiveQuestionnaire() {
  return request({
    url: '/questionnaire/v1/active',
    method: 'get',
  })
}

export function fetchQuestionnaireList(data) {
  return request({
    url: '/questionnaire/v1/list',
    method: 'post',
    data
  })
}

export function fetchEditQuestionnaire(id) {
  return request({
    url: `/questionnaire/v1/fetch/${id}`,
    method: 'get',
  })
}

export function submitQuestionnaireAnswer(data) {
  return request({
    url: '/questionnaire/v1/submitAnswer',
    method: 'post',
    data
  })
}
