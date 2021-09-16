import MessageService from "@/assets/services/message.service";

export default {
    name: 'SealSignOff',
    props: {
    
    },
    data() {
        return {
             //預設簽核顯示範圍按鈕
             displayAll: true,
             sealSignListHeaders:[
                { text: '狀態', value: 'inquireStatus', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '受理編號', value: 'orderId', align: 'center' },
                { text: '電號', value: 'electNum', align: 'center' },
                { text: '登記單種類', value: 'orderType', align: 'center' },
                { text: '受理項目', value: 'orderItems', align: 'center' },
                { text: '專用章檔案下載', value: 'download', align: 'center' },    
                { text: '狀態操作', value: 'mani', align: 'center' }
             ],
             sealSignList:[
                 {status:false,inquireStatus:'待簽核',orderId:'A00349',orderDate: '20210910 10:00',electNum:'7140000123',orderType:'APR0370',orderItems:'QA210軍眷用電申請優待'},
                 {status:false,inquireStatus:'待簽核',orderId:'A00389',orderDate: '20210908 10:00',electNum:'7140000128',orderType:'APR0200',orderItems:'I0510故障換表'},
                 {status:true,inquireStatus:'套印完成',orderId:'A00389',orderDate: '20210908 10:00',electNum:'7140000128',orderType:'APR0200',orderItems:'I0510故障換表'},
                ],
             sealSignListPageCount:0,
             sealSignListPage:1,
        }
    },
    methods: {
        sign(item){
            console.log(item);
            let index = this.sealSignList.indexOf(item);
            this.sealSignList[index].inquireStatus = '套印完成';
            this.sealSignList[index].status = true;
            MessageService.showSuccess("簽核成功✓");
        }
    }
}