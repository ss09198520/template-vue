import request from '@/utils/request'

export function fetchActiveQuestionnaire() {
  return request({
    url: '/questionnaire/v1/active',
    method: 'get',
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
