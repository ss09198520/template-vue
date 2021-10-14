export default {
    name: 'ReturnReport',
    props: {
    
    },
    data: () => ({
        openStartDate: false,
        openEndDate: false,
        headers: [
          { text: '退件日期', value: 'rejectDate', align: 'center' },
            { text: '主辦業務計劃員簽核時間', value: 'salesPlannerSignDate', align: 'center' },
            { text: '核算課長簽核時間', value: 'leaderSignDate', align: 'center' },         
            { text: '下載', value: 'download', align: 'center' },            
        ],
        itemList: [
            {signOff: false, rejectDate: '2021-09-06 ~ 2021-09-12',  salesPlannerSignDate: '2021-09-17 13:00:26', leaderSignDate: '', download: true},
            {signOff: true, rejectDate: '2021-09-13 ~ 2021-09-19',  salesPlannerSignDate: '', leaderSignDate: '', download: true}
        ],
        dataListPage: 1,
        dataListPageCount: 1,
        searchText: '　查詢　',
        signOffText: '　簽核　',
        startDate:'',
        endDate:'',
    }),
    mounted() {

    },
    methods: {
        search(){
            
        }
    }
}