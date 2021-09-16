
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";
import EventBus from "@/assets/services/eventBus";

export default{
    components: {
        formPage,
    },
    beforeMount() { // 在這裡做初始化, 勿刪
        this.init();
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
                { text: '受理編號', value: 'orderId', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '訂單狀態', value: 'orderStatus', align: 'center' },
                { text: '登記單種類', value: 'orderType', align: 'center' },            
                { text: '受理項目', value: 'orderItems', align: 'center' },
                { text: '代理案件', value: 'proxyEvent', align: 'center' },
                { text: '代理件所有人', value: 'eventAgent', align: 'center' },
                { text: '狀態操作', value: 'mani', align: 'center' }
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
            browserModel: false, // 瀏覽案件視窗開關
            supplementModel: false, // 補件操作視窗開關
            formRecordModel: false, // 表單歷程視窗開關
            formRecordList:[
                {record:'2021/09/14 14:20:14 待歸檔 (0151230020 吳靜)'},
                {record:'2021/09/14 14:20:14 審核通過 (0151230020 吳靜)'},
                {record:'2021/09/14 13:50:14 核算分派 (0151230001 陳婷婷)'},
                {record:'2021/09/14 13:20:14 案件成立 (0151230011 鍾書文)'},

            ],
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ]

        }
    },
    methods: {
        init(){
            // 控制補件存檔後將補件跳出視窗關閉
            EventBus.subscriber('saveFile',this.closeSupplementModel);
        },
        action(type,item){
            // 抓出選的是第幾筆
            this.selectIndex = this.empMockList.indexOf(item);            
            if(type=='delete'){
                this.deleteOrderModel = true;
            } else if(type == 'browse'){
                this.browserModel = true;
            } else if(type == 'supplement'){
                this.supplementModel = true;
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
        checkSubmit(){
            this.browserModel = false;
        },
        orderRecord(item){
            console.log(item);
        },
        closeSupplementModel(){
            this.supplementModel = false;
        },
        openFormRecord(){
            this.formRecordModel = true;
        }
    },
}