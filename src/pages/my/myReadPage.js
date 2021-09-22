
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
                { text: '受理號碼', value: 'orderId', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '歸檔日期', value: 'fileInDate', align: 'center' },
                { text: '調閱狀態', value: 'inquireStatus', align: 'center' },            
                { text: '戶名', value: 'accountName', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'arrangeNum', align: 'center' },
                { text: '受理項目', value: 'orderItems', align: 'center' },                
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            empMockList: [                
                { mani: true, orderId: 'A00024', orderDate: '20210910 10:00', fileInDate:'20210915 10:00', inquireStatus:'有效日至 20211030', accountName:'戶名一', contractType:'契約種類一', arrangeNum:'04-41234567', orderItems:'QA210軍眷用電申請優待'},
                { mani: true, orderId: 'A00615', orderDate: '20210909 11:21', fileInDate:'20210915 10:00', inquireStatus:'有效日至 20211030', accountName:'戶名二', contractType:'契約種類二', arrangeNum:'04-41234568', orderItems:'I0510故障換表'},
                { mani: true, orderId: 'A00040', orderDate: '20210907 15:36', fileInDate:'20210915 11:21', inquireStatus:'有效日至 20211030', accountName:'戶名三', contractType:'契約種類三', arrangeNum:'04-41234569', orderItems:'I0520增加電表'},
                { mani: true, orderId: 'A00605', orderDate: '20210910 09:45', fileInDate:'20210919 11:05', inquireStatus:'有效日至 20211030', accountName:'戶名四', contractType:'契約種類四', arrangeNum:'04-41234570', orderItems:'F3030表燈非時間電價停用廢止'},
                { mani: false, orderId: 'A00619', orderDate: '20210910 13:44', fileInDate:'20210919 11:05', inquireStatus:'申請中', accountName:'戶名五', contractType:'契約種類五', arrangeNum:'04-41234571', orderItems:'I0510故障換表'},
            ],

            browserModel: false,
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ],
            //日曆起
            menu1: false,
            date1: '',
            //日曆迄
            menu2: false,
            date2: '',
        }
    },
    methods: {
        browerOrder(item){
            console.log(item);
            this.browserModel = true;
        },
        checkSubmit(){
            this.browserModel = false;
        },
    },
}