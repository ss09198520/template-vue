//多媒體檔案類型
const materialFileTypeOption = [
  { text: '圖片', value: 'image'},
  { text: '影音', value: 'video'},
]
//多媒體類型 ( Sign off page)
const mediaSignTypeOption = [
  { text: '節目單', value: 'MEDIA_PROGRAM'},
  { text: '跑馬燈', value: 'MEDIA_MARQUEE'},
  { text: '問卷調查', value: 'MEDIA_QUESTIONNAIRE'},
]

//多媒體類型下拉選單
const mediaTypeOption = [
  { text: '一般', value: 'GENERAL'},
  { text: '預設', value: 'DEFAULT'},
]
//多媒體上架下拉選單
const mediaStatusOption = [
  { text: '上架中', value: 'ACTIVE' , icon: 'mdi-checkbox-marked-circle'},
  { text: '未上架', value: 'WAIT' , icon : 'mdi-minus-circle'},
  { text: '已下架', value: 'CLOSE', icon: 'mdi-minus-circle'},
]
//多媒體簽核狀態下拉選單
const mediaSignStatusOption = [
  { text: '暫存', value: 'DRAFT'},
  { text: '退件', value: 'REJECT'},
  { text: '審核中Level-1', value: 'WAIT'},
  { text: '審核中Level-2', value: 'PROGRESS'},
  { text: '審核完成', value: 'PASS'},
]

const salesTeamAuthCode = [
  'AUTH11', //行銷組組長
  'AUTH10', //行銷主管銷售作業主管
  'AUTH16', //業務處行銷組-銷售作業課人員
  'AUTH12', //多媒體設定-業務處
]

export default {
  mediaTypeOption : mediaTypeOption,
  mediaStatusOption : mediaStatusOption,
  mediaSignStatusOption : mediaSignStatusOption,
  materialFileTypeOption : materialFileTypeOption,
  mediaSignTypeOption : mediaSignTypeOption,
  salesTeamAuthCode : salesTeamAuthCode,
}