export default {
    name: 'RejectReport',
    props: {
    
    },
    data: () => ({        
        openStartDate: false, //是否開啟查詢退件日期的datePicker
        openEndDate: false, //是否開啟查詢退件日期的datePicker
        headers: [
          { text: '退件日期', value: 'rejectDate', align: 'center' },
            { text: '核算部門主辦簽核時間', value: 'salesPlannerSignDate', align: 'center' },
            { text: '核算課長簽核時間', value: 'leaderSignDate', align: 'center' },         
            { text: '下載', value: 'download', align: 'center' },            
        ],
        returnList: [
            {signOff: false, rejectDate: '2021-09-06 ~ 2021-09-12',  salesPlannerSignDate: '2021-09-17 13:00:26', leaderSignDate: '', download: true, seq:'流水號一'},
            {signOff: true, rejectDate: '2021-09-13 ~ 2021-09-19',  salesPlannerSignDate: '', leaderSignDate: '', download: true, seq:'流水號二'}
        ],
        dataListPage: 1,
        dataListPageCount: 1,
        searchText: '　查詢　',
        signOffText: '　簽核　',
        startDate:'',   //查詢退件日期(起)
        endDate:'', //查詢退件日期(迄)
    }),
    mounted() {

    },
    methods: {
        search(){
            
        }
    }
}