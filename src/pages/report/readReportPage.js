export default {
    name: 'ReadReport',
    props: {
    
    },
    data() {
        return {
          startDate: false,
          endDate: false,
          monthPicker: false,
          headers: [
            { text: '調閱月份', value: 'readMonth', align: 'center' },
            { text: '區處', value: 'region', align: 'center' },
            { text: '核算課長簽核時間', value: 'signOffDate1', align: 'center' },  
            { text: '電費經理簽核時間', value: 'signOffDate2', align: 'center' },          
            { text: '下載', value: 'download', align: 'center' },
            { text: '簽核', value: 'signOff', align: 'center' }
          ],
          itemList: [
            {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/01 13:00:26', signOffDate2: '2021/09/02 10:36:53', download: true},
            {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/10/01 14:14:42', signOffDate2: '', download: true}
          ],
          dataListPage: 1,
          dataListPageCount: 1,
          searchText: '　查詢　',
          signOffText: '　簽核　'
        }
    },
    methods: {

    }
}