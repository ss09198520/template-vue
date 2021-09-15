
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default{
    components: {
        formPage,
    },
    data(){
        return{
            //預設受理類型按鈕
            displayAll: true,
            //預設當前頁數
            orderListPage: 1,
            //預設總頁數
            orderListPageCount: 0,
            empListHeaders: [
                { text: '狀態操作', value: 'mani', align: 'center' },
                { text: '受理編號', value: 'orderId', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '訂單狀態', value: 'orderStatus', align: 'center' },
                { text: '登記單種類', value: 'orderType', align: 'center' },            
                { text: '受理項目', value: 'orderItems', align: 'center' },
                { text: '代理案件', value: 'proxyEvent', align: 'center' },
                { text: '代理件所有人', value: 'eventAgent', align: 'center' },
            ],
            empMockList: [                
                { mani: true, orderId: 'A00024', orderDate: '20210910 10:00', orderStatus:'受理中', orderType:'APR0370', orderItems:'QA210軍眷用電申請優待', proxyEvent:true,eventAgent:'王大明'},
                { mani: false, orderId: 'A00615', orderDate: '20210909 11:21', orderStatus:'核算中', orderType:'APR0200', orderItems:'I0510故障換表', proxyEvent:'',eventAgent:''},
                { mani: false, orderId: 'A00040', orderDate: '20210907 15:36', orderStatus:'核算中', orderType:'APR0200', orderItems:'I0520增加電表', proxyEvent:'',eventAgent:''},
                { mani: true, orderId: 'A00605', orderDate: '20210910 09:45', orderStatus:'受理中', orderType:'APR0160', orderItems:'F3030表燈非時間電價停用廢止', proxyEvent:'',eventAgent:''},
                { mani: false, orderId: 'A00619', orderDate: '20210910 13:44', orderStatus:'核算中', orderType:'APR0200', orderItems:'I0510故障換表', proxyEvent:'',eventAgent:''},
            ],
            deleteOrderModel:false,
            selectIndex: null,
            browserModel: false,
            returnReason: null,
            returnReasonModel: false,

        }
    },
    methods: {
        action(type,item){
            // 抓出選的是第幾筆
            this.selectIndex = this.empMockList.indexOf(item);            
            if(type=='delete'){
                this.deleteOrderModel = true;
            } else if(type == 'browse'){
                this.browserModel = true;
            }
            
        },
        submit(){
            MessageService.showSuccess("取消案件成功✓");
            //刪除該筆資料
            if (this.selectIndex > -1) {
                this.empMockList.splice(this.selectIndex, 1);
              }
            this.deleteOrderModel = false;
        },

        retrunOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
            //刪除該筆資料
            if (this.selectIndex > -1) {
                this.empMockList.splice(this.selectIndex, 1);
              }
            this.returnReasonModel = false;
            this.browserModel = false;
            MessageService.showSuccess("退件成功✓");
        },
        checkSubmit(){
            //刪除該筆資料
            if (this.selectIndex > -1) {
                this.empMockList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("核算成功✓");
            this.browserModel = false;
        }
    },
}