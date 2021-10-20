export default {
    name: 'ReadReport',
    props: {
    
    },
    data() {
        return {
          openStartDate: false, //是否開啟查詢調閱日期的datePicker
          openEndDate: false, //是否開啟查詢調閱日期的datePicker
          monthPicker: false,
          headers: [
            { text: '調閱月份', value: 'readMonth', align: 'center' },
            { text: '調閱管理員簽核時間', value: 'readMgmtSignDate', align: 'center' },  
            { text: '核算課長簽核時間', value: 'leaderSignDate', align: 'center' },  
            { text: '電費經理簽核時間', value: 'managerSignDate', align: 'center' },          
            { text: '下載', value: 'download', align: 'center' },
            
          ],
          itemList: [
            {signOff: false, readMonth: '2021-08', readMgmtSignDate: '2021-09-01 13:00:26', leaderSignDate: '',managerSignDate: '', download: true, seq:'流水號一'},
            {signOff: true, readMonth: '2021-09', readMgmtSignDate: '', leaderSignDate: '',managerSignDate: '', download: true, seq:'流水號二'}
          ],
          dataListPage: 1,
          dataListPageCount: 1,
          searchText: '　查詢　',
          signOffText: '　簽核　',
          startDate:'',   //查詢調閱日期(起)
          endDate:'', //查詢調閱日期(迄)
        }
    },
    methods: {

    }
}