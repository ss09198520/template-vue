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
  { text: '已下架', value: 'CLOSE', icon: 'mdi-arrow-down-bold-outline'},
]
//多媒體簽核狀態下拉選單
const mediaSignStatusOption = [
  { text: '暫存', value: 'DRAFT'},
  { text: '退件', value: 'REJECT'},
  { text: '審核中Level-1', value: 'WAIT'},
  { text: '審核中Level-2', value: 'PROGRESS'},
  { text: '審核完成', value: 'PASS'},
]

//PMC 設備IP設定下拉選單 (參照後端程式 TpesFormConstant.RegionMapping)
const regionAndComputerIpOption = [
  { regionName: '台電大樓業務處', empRegion: '007', businessRegion: '99'},
  { regionName: '基隆區營業處', empRegion: '101', businessRegion: '02'},
  { regionName: '台北市區營業處', empRegion: '102', businessRegion: '00'},
  { regionName: '桃園區營業處', empRegion: '103', businessRegion: '04'},
  { regionName: '新竹區營業處', empRegion: '104', businessRegion: '06'},
  { regionName: '台中區營業處', empRegion: '105', businessRegion: '07'},
  { regionName: '彰化區營業處', empRegion: '106', businessRegion: '08'},
  { regionName: '嘉義區營業處', empRegion: '107', businessRegion: '09'},
  { regionName: '台南區營業處', empRegion: '108', businessRegion: '10'},
  { regionName: '高雄區營業處', empRegion: '109', businessRegion: '11'},
  { regionName: '屏東區營業處', empRegion: '110', businessRegion: '12'},
  { regionName: '台東區營業處', empRegion: '111', businessRegion: '14'},
  { regionName: '花蓮區營業處', empRegion: '112', businessRegion: '13'},
  { regionName: '宜蘭區營業處', empRegion: '113', businessRegion: '03'},
  { regionName: '澎湖區營業處', empRegion: '114', businessRegion: '15'},
  { regionName: '台北南區營業處', empRegion: '115', businessRegion: '01'},
  { regionName: '台北北區營業處', empRegion: '116', businessRegion: '16'},
  { regionName: '台北西區營業處', empRegion: '117', businessRegion: '05'},
  { regionName: '南投區營業處', empRegion: '118', businessRegion: '17'},
  { regionName: '鳳山區營業處', empRegion: '119', businessRegion: '18'},
  { regionName: '雲林區營業處', empRegion: '120', businessRegion: '19'},
  { regionName: '新營區營業處', empRegion: '121', businessRegion: '20'},
  { regionName: '苗栗區營業處', empRegion: '122', businessRegion: '21'},
  { regionName: '金門區營業處', empRegion: '123', businessRegion: '22'},
  { regionName: '馬祖區營業處', empRegion: '124', businessRegion: '23'},
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
  regionAndComputerIpOption : regionAndComputerIpOption,
}