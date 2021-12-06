import request from '@/utils/request'

export function fetchQuestionnaireReportList(data) {
  return request({
    url: '/report/querySatisfactionReport',
    method: 'post',
    data
  })
}

//報表
export function downloadSatisfactionReportFile(data) {
  return request({
    url: '/report/downloadSatisfactionReportFile',
    method: 'post',
    responseType: 'blob',
    data
  })
}
export function listSatisfactionRawData(data) {
  return request({
    url: '/report/listSatisfactionRawData',
    method: 'post',
    responseType: 'blob',
    data
  })
}
export function geneDynaSatisfactionReport(data) {
  return request({
    url: '/report/geneDynaSatisfactionReport',
    method: 'post',
    responseType: 'blob',
    data
  })
}
export function geneDynaRegionSatisfactionReport(data) {
  return request({
    url: '/report/geneDynaRegionSatisfactionReport',
    method: 'post',
    responseType: 'blob',
    data
  })
}

