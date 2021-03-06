
import formPage from "../FormPage/FormPage.vue";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";
import AjaxService from "@/assets/services/ajax.service";

export default{
    components: {
        formPage,
    },
    beforeMount(){
        this.init();
    },
    data(){
        return{
            //代理人查詢清單選項
            agentCaseOption:[
                {text:'顯示全部',value:'QUERYALL'},
                {text:'顯示代理件',value:'QUERYAGENT'},
                {text:'不顯示代理件',value:'QUERYNOTAGENT'},
            ],
            caseType: null,
            //是否顯示下方清單
            displayList: false,
            //預設當前頁數
            formListPage: 1,
            //預設總頁數
            formListPageCount: 0,
            formListHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '受理日期', value: 'acceptDateStr', align: 'center' },
                { text: '歸檔日期', value: 'archiveDateStr', align: 'center' },
                { text: '調閱狀態', value: 'status', align: 'center' },            
                { text: '調閱原因', value: 'readReason', align: 'center' },
                { text: '退件原因', value: 'rejectReason', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '卡別', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'archiveNum', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '代理件', value: 'isAgent', align: 'center', width:'5%' },              
                { text: '備註', value: 'memoIcon', align: 'center'},                
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
            numOfRead:0,
            numOfReadApply: 0,
            // 依條件查詢我的調閱區資料
            acceptNum: null,
            electricNum: null,
            archieveNum: null,
            applyStartDate: null,
            applyEndDate: null,
            selectItem:{},
            errMsg: null,
            formatArray:[], // 格式驗證
            formParam: {},
            formKey: 0,
            archiveNum: null,
            memo: '',
            showMemo: false
        }
    },
    methods: {
        init(){
            this.queryReadList();
        },
        // 依條件查詢資料
        search(){
            if(!this.checkDate()){
                MessageService.showCheckInfo(null,this.formatArray);
            } else {
                this.queryReadList();
            }
        },
        browserOrder(item){
            this.selectItem = item;
            this.formParam = {
                FM_NO: item.acceptNum
            };
            this.browserModel = true;
            this.formKey ++;
        },
        // 清空日期欄位 obj為哪種日期類別,name為開始日期or結束日期
        resetDate(obj,name){
            this[obj][name] = null;
            this.checkDate();
        },
        // Action:依條件查詢調閱資料
        queryReadList(){

            let param = {
                acceptNum: (ValidateUtil.isEmpty(this.acceptNum)? null : this.acceptNum),
                electricNum: (ValidateUtil.isEmpty(this.electricNum)? null : this.electricNum),
                archiveNum: (ValidateUtil.isEmpty(this.archiveNum)? null : this.archiveNum),
                applyStartDate: (ValidateUtil.isEmpty(this.applyStartDate)? null : this.applyStartDate),
                applyEndDate: (ValidateUtil.isEmpty(this.applyEndDate)? null : this.applyEndDate),
                caseType: (ValidateUtil.isEmpty(this.caseType)? null : this.caseType.value),
            };            
            AjaxService.post("/read/queryReadApply", param, (response) => {
                if(response.restData.success) {
                    this.formList = Object.assign(response.restData.applyList);                    
                    response.restData.applyList.forEach((element) => {
                        if(element.agentForm){
                            element.isAgent = true;
                        }
                    })
                    this.numOfReadApply = response.restData.applyNum;
                    this.numOfRead = response.restData.readNum;

                }else{
                    MessageService.showError(response.restData.message, '查詢調閱申請紀錄');
                }
            },
            (error) => {
                MessageService.showSystemError();                
            });
        },
        // 驗證請調閱日期區間
        checkDate(){
            this.formatArray = [];
            let hasCheck = true;
            this.applyStartDate = null;
            this.applyEndDate = null;

            // 1-1判斷日期起迄日是否都有
            if(!ValidateUtil.isEmpty(this.readDate.start) && !ValidateUtil.isEmpty(this.readDate.end)){
                this.applyStartDate = this.readDate.start + ' 00:00:00';
                this.applyEndDate = this.readDate.end + ' 23:59:59';
                
                if(!ValidateUtil.validateDateRange(this.applyStartDate,this.applyEndDate)){
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
        openMemoDialog(item){
            this.memo = item.memo;
            this.showMemo = true;
        }
    }
}