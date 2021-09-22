
export default {
    name: 'MyWaitingAccounting',
    props: {
    
    },
    data() {
        return {
            waitingCount: 5,
            headers: [
                { text: '受理號碼', value: 'acceptNumber', align: 'center' },
                { text: '電號', value: 'electricNo', align: 'center' },
                { text: '整理號碼', value: 'sortNumber', align: 'center' },
                { text: '戶名', value: 'accntName', align: 'center' },               
                { text: '受理項目', value: 'acceptItem', align: 'center' }
            ],
            itemList: [
                {acceptNumber: 'A00024', electricNo: '70121212',sortNumber: '000300',accntName: '余文文', acceptItem: 'QA210  軍眷用電申請優待'},
                {acceptNumber: 'A00615', electricNo: '70121234',sortNumber: '000301',accntName: '陳詩宇',acceptItem: 'I0510  故障換表'},
                {acceptNumber: 'A00040', electricNo: '70121223',sortNumber: '000302',accntName: '林文向',acceptItem: 'I0520  增加電表'},
                {acceptNumber: 'A00605',  electricNo: '70121223',sortNumber: '000303',accntName: '許霏霏',acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {acceptNumber: 'A00619',  electricNo: '701212124',sortNumber: '000304',accntName: '成庭宇',acceptItem: 'I0510  故障換表'}
            ],
            showMyArchieve: false,
            showAllArchieve: true,
            dataListPage: 1,
            dataListPageCount: 1,
            hasShowList:false,
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