export default {
    name: 'ReturnReport',
    props: {
    
    },
    data: () => ({
        startDate: false,
        endDate: false,
        headers: [
          { text: '退件日期', value: 'returnDate', align: 'center' },
            { text: '區處', value: 'region', align: 'center' },
            { text: '主辦業務計劃員簽核時間', value: 'signOffDate1', align: 'center' },
            { text: '核算課長簽核時間', value: 'signOffDate2', align: 'center' },         
            { text: '下載', value: 'download', align: 'center' },
            { text: '簽核', value: 'signOff', align: 'center' }
        ],
        itemList: [
            {signOff: false, returnDate: '2021/09/06 ~ 2021/09/12', region: '台中', signOffDate1: '2021/09/17 13:00:26', signOffDate2: '2021/09/18 10:36:53', download: true},
            {signOff: true, returnDate: '2021/09/13 ~ 2021/09/19', region: '台中', signOffDate1: '', signOffDate2: '', download: true}
        ],
        dataListPage: 1,
        dataListPageCount: 1,
        searchText: '　查詢　',
        signOffText: '　簽核　'
    }),
    mounted() {

    },
    methods: {
        search(){

        }
    }
}