
export default {
    name: 'MyWaitingAccounting',
    props: {
    
    },
    data() {
        return {
            waitingCount: 5,
            headers: [
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '待歸檔日期', value: 'archieveDate', align: 'center' },
                { text: '登記單種類', value: 'category', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' }
            ],
            itemList: [
                {acceptNumber: 'A00024', archieveDate: '20210910 10:00', category: 'APR0370', acceptItem: 'QA210  軍眷用電申請優待'},
                {acceptNumber: 'A00615', archieveDate: '20210909 11:21', category: 'APR0200', acceptItem: 'I0510  故障換表'},
                {acceptNumber: 'A00040', archieveDate: '20210907 15:36', category: 'APR0200', acceptItem: 'I0520  增加電表'},
                {acceptNumber: 'A00605', archieveDate: '20210910 09:45', category: 'APR0160', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {acceptNumber: 'A00619', archieveDate: '20210910 13:44', category: 'APR0200', acceptItem: 'I0510  故障換表'}
            ],
            showMyArchieve: false,
            showAllArchieve: true,
            dataListPage: 1,
            dataListPageCount: 1
        }
    },
    methods: {
        showArchieve(mode){
            if(mode === 'my'){
                this.showMyArchieve = true;
                this.showAllArchieve = false;
            }else{
                this.showMyArchieve = false;
                this.showAllArchieve = true;
            }
        }
    }
}