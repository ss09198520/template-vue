
import formPage from "../FormPage/FormPage.vue";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";

export default{
    components: {
        formPage,
    },
    beforeMount(){
        this.init();
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
            formList: [],
            browserModel: false,
            //日曆起
            menu1: false,
            //日曆迄
            menu2: false,
            readDate:{
                start:null,
                end: null,
            },
            sysDate: new Date(),
            numOfRead:2,
            numOfReadApply: 1,
            // 依條件查詢我的調閱區資料
            acceptNum: null,
            electricNum: null,
            archieveNum: null,
            readStartDate: null,
            readEndDate: null,
            selectItem:{},
            errMsg: null,
            formatArray:[], // 格式驗證
            formParam: {},
            formKey: 0,
        }
    },
    methods: {
        init(){
            this.queryReadInit();
        },

        // 依條件查詢資料
        search(){
            if(!this.checkDate()){
                MessageService.showCheckInfo(null,this.formatArray);
            } else {
                this.queryReadList();
            }
        },

        browerOrder(item){
            this.selectItem = item;

            // 帶入受理編號
            this.formParam = {
                acceptNum: item.acceptNum
            };
            this.formKey++;

            this.queryReadInfo();
            this.browserModel = true;
        },

        
        // 清空日期欄位 obj為哪種日期類別,name為開始日期or結束日期
        resetDate(obj,name){
            this[obj][name] = null;
            this.checkDate();
        },


        /** 
         * 
         * Ajax Start
         * 
         * 
        */

        // Action:頁面初始化
        queryReadInit(){
            // 模擬取得資料
            let  formList = [                
                { seq:1, acceptNum: 'A00024', acceptDate: '2021-09-10 10:00', archieveDate:'2021-09-15 10:00', status:'通過', validDate: '2021-10-30', rejectReason:'', custName:'戶名一', contractType:'契約種類一', archieveNum:'04-41234567', acceptItem:'QA210軍眷用電申請優待'},
                { seq:2, acceptNum: 'A00615', acceptDate: '2021-09-09 11:21', archieveDate:'2021-09-15 10:00', status:'通過',validDate: '2021-10-01', rejectReason:'', custName:'戶名二', contractType:'契約種類二', archieveNum:'04-41234568', acceptItem:'I0510故障換表'},
                { seq:3, acceptNum: 'A00040', acceptDate: '2021-09-07 15:36', archieveDate:'2021-09-15 11:21', status:'退件',validDate: '', rejectReason:'無法增加', custName:'戶名三', contractType:'契約種類三', archieveNum:'04-41234569', acceptItem:'I0520增加電表'},
                { seq:4, acceptNum: 'A00605', acceptDate: '2021-09-10 09:45', archieveDate:'2021-09-19 11:05', status:'通過',validDate: '2021-10-20', rejectReason:'', custName:'戶名四', contractType:'契約種類四', archieveNum:'04-41234570', acceptItem:'F3030表燈非時間電價停用廢止'},
                { seq:5, acceptNum: 'A00619', acceptDate: '2021-09-10 13:44', archieveDate:'2021-09-19 11:05', status:'申請中',validDate: '', rejectReason:'', custName:'戶名五', contractType:'契約種類五', archieveNum:'04-41234571', acceptItem:'I0510故障換表'},
            ];

            let numOfRead = 2;
            let numOfReadApply = 1;

            this.formList = formList;
            this.numOfRead = numOfRead;
            this.numOfReadApply = numOfReadApply;
        },


        // Action:依條件查詢調閱資料
        queryReadList(){
            // vin 參數
            // acceptNum: this.acceptNum,
            // electricNum: this.electricNum,
            // archieveNum: this.archieveNum,
            // readStartDate: this.readStartDate,
            // readEndDate: this.readEndDate,

             // 模擬取得資料
             let  formList = [                
                { seq:1, acceptNum: 'A00024', acceptDate: '2021-09-10 10:00', archieveDate:'2021-09-15 10:00', status:'通過', validDate: '2021-10-30', rejectReason:'', custName:'戶名一', contractType:'契約種類一', archieveNum:'04-41234567', acceptItem:'QA210軍眷用電申請優待'},
                { seq:2, acceptNum: 'A00615', acceptDate: '2021-09-09 11:21', archieveDate:'2021-09-15 10:00', status:'通過',validDate: '2021-10-01', rejectReason:'', custName:'戶名二', contractType:'契約種類二', archieveNum:'04-41234568', acceptItem:'I0510故障換表'},
                { seq:3, acceptNum: 'A00040', acceptDate: '2021-09-07 15:36', archieveDate:'2021-09-15 11:21', status:'退件',validDate: '', rejectReason:'無法增加', custName:'戶名三', contractType:'契約種類三', archieveNum:'04-41234569', acceptItem:'I0520增加電表'},
                { seq:4, acceptNum: 'A00605', acceptDate: '2021-09-10 09:45', archieveDate:'2021-09-19 11:05', status:'通過',validDate: '2021-10-20', rejectReason:'', custName:'戶名四', contractType:'契約種類四', archieveNum:'04-41234570', acceptItem:'F3030表燈非時間電價停用廢止'},
                { seq:5, acceptNum: 'A00619', acceptDate: '2021-09-10 13:44', archieveDate:'2021-09-19 11:05', status:'申請中',validDate: '', rejectReason:'', custName:'戶名五', contractType:'契約種類五', archieveNum:'04-41234571', acceptItem:'I0510故障換表'},
            ];

            let numOfRead = 2;
            let numOfReadApply = 1;

            this.formList = formList;
            this.numOfRead = numOfRead;
            this.numOfReadApply = numOfReadApply;

        MessageService.showSuccess('查詢調閱清單');


        },

        // Action:取得案件資料
        queryReadInfo(){
            // vin 參數
            // seq: this.selectItem.seq,
        },


        /** 
         * 
         * Ajax End
         * 
         * 
        */


        /** 
         * 
         * 驗證 Start
         * 
         * 
        */
        

        // 驗證請調閱日期區間
        checkDate(){
            this.formatArray = [];
            let hasCheck = true;

            // 1-1判斷日期起迄日是否都有
            if(!ValidateUtil.isEmpty(this.readDate.start) && !ValidateUtil.isEmpty(this.readDate.end)){
                this.readStartDate = this.readDate.start + ' 00:00:00';
                this.readEndDate = this.readDate.end + ' 23:59:59';
                
                if(!ValidateUtil.validateDateRange(this.readStartDate,this.readEndDate)){
                    this.errMsg = '日期範圍錯誤'
                    this.formatArray.push('申請調閱日期');
                    hasCheck = false;
                } else {
                    this.errMsg = null;
                }
            // 1-2 判斷受理日期起迄日只有其中一欄有選擇日期 
            } else if(!ValidateUtil.isEmpty(this.readDate.start) || !ValidateUtil.isEmpty(this.readDate.end)){
                this.errMsg = "申請調閱日期未選擇完整範圍";
                this.formatArray.push('申請調閱日期區間'); 
                hasCheck = false;

            // 1-3 判斷受理日期起訖日欄位皆未選擇
            } else {
                this.errMsg = null;
            }

            return hasCheck;
        },

        /** 
         * 
         * 驗證 End
         * 
         * 
        */
    },
}