
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default{
    components: {
        formPage,
    },
    data(){
        return{
            //是否顯示下方清單
            displayList: false,
            //預設受理類型按鈕
            displayAll: false,
            //預設當前頁數
            orderListPage: 1,
            //預設總頁數
            orderListPageCount: 0,
            empListHeaders: [
                { text: '受理編號', value: 'orderId', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '歸檔日期', value: 'fileInDate', align: 'center' },
                { text: '調閱狀態', value: 'inquireStatus', align: 'center' },            
                { text: '登記單種類', value: 'orderType', align: 'center' },
                { text: '受理項目', value: 'orderItems', align: 'center' },                
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            empMockList: [                
                { mani: true, orderId: 'A00024', orderDate: '20210910 10:00', fileInDate:'20210915 10:00', inquireStatus:'有效日至 20211030', orderType:'APR0370', orderItems:'QA210軍眷用電申請優待'},
                { mani: true, orderId: 'A00615', orderDate: '20210909 11:21', fileInDate:'20210915 10:00', inquireStatus:'有效日至 20211030', orderType:'APR0200', orderItems:'I0510故障換表'},
                { mani: true, orderId: 'A00040', orderDate: '20210907 15:36', fileInDate:'20210915 11:21', inquireStatus:'有效日至 20211030', orderType:'APR0200', orderItems:'I0520增加電表'},
                { mani: true, orderId: 'A00605', orderDate: '20210910 09:45', fileInDate:'20210919 11:05', inquireStatus:'有效日至 20211030', orderType:'APR0160', orderItems:'F3030表燈非時間電價停用廢止'},
                { mani: false, orderId: 'A00619', orderDate: '20210910 13:44', fileInDate:'20210919 11:05', inquireStatus:'申請中', orderType:'APR0200', orderItems:'I0510故障換表'},
            ],

            browserModel: false,
            returnReason: null,
            returnReasonModel: false,
        }
    },
    methods: {
        browerOrder(item){
            console.log(item);
            this.browserModel = true;
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
        },
        retrunOrder(){
            this.returnReasonModel = true;
        },
    },
}