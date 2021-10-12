
import formPage from "../FormPage/FormPage.vue";

export default{
    components: {
        formPage,
    },
    data(){
        return{
            //是否顯示下方清單
            displayList: false,
            //預設當前頁數
            formListPage: 1,
            //預設總頁數
            formListPageCount: 0,
            formListHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '歸檔日期', value: 'archieveDate', align: 'center' },
                { text: '調閱狀態', value: 'status', align: 'center' },            
                { text: '退件原因', value: 'rejectReason', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'archieveNum', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },                
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            formList: [                
                { acceptNum: 'A00024', acceptDate: '2021-09-10 10:00', archieveDate:'2021-09-15 10:00', status:'通過', validDate: '2021-10-30', rejectReason:'', custName:'戶名一', contractType:'契約種類一', archieveNum:'04-41234567', acceptItem:'QA210軍眷用電申請優待'},
                { acceptNum: 'A00615', acceptDate: '2021-09-09 11:21', archieveDate:'2021-09-15 10:00', status:'通過',validDate: '2021-10-01', rejectReason:'', custName:'戶名二', contractType:'契約種類二', archieveNum:'04-41234568', acceptItem:'I0510故障換表'},
                { acceptNum: 'A00040', acceptDate: '2021-09-07 15:36', archieveDate:'2021-09-15 11:21', status:'退件',validDate: '', rejectReason:'無法增加', custName:'戶名三', contractType:'契約種類三', archieveNum:'04-41234569', acceptItem:'I0520增加電表'},
                { acceptNum: 'A00605', acceptDate: '2021-09-10 09:45', archieveDate:'2021-09-19 11:05', status:'通過',validDate: '2021-10-20', rejectReason:'', custName:'戶名四', contractType:'契約種類四', archieveNum:'04-41234570', acceptItem:'F3030表燈非時間電價停用廢止'},
                { acceptNum: 'A00619', acceptDate: '2021-09-10 13:44', archieveDate:'2021-09-19 11:05', status:'申請中',validDate: '', rejectReason:'', custName:'戶名五', contractType:'契約種類五', archieveNum:'04-41234571', acceptItem:'I0510故障換表'},
            ],

            browserModel: false,
            //日曆起
            menu1: false,
            date1: '',
            //日曆迄
            menu2: false,
            date2: '',
            sysDate: new Date(),
            numOfRead:2,
            numOfReadApply: 1,
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