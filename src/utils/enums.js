//多媒體檔案類型
const materialFileTypeOption = [
  { text: '圖片', value: 'image'},
  { text: '影音', value: 'video'},
]

//多媒體類型下拉選單
const mediaTypeOption = [
  { text: '一般', value: 'ACTIGENERALVE'},
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
  { text: '審核中', value: 'WAIT'},
  { text: '審核中', value: 'PROGRESS'},
  { text: '審核完成', value: 'PASS'},
]


export default {
  mediaTypeOption : mediaTypeOption,
  mediaStatusOption : mediaStatusOption,
  mediaSignStatusOption : mediaSignStatusOption,
  materialFileTypeOption : materialFileTypeOption,
}