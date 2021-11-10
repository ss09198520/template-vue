import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from "@/assets/services/ajax.service";

export default{
    beforeMount(){
        this.init();
    },
    data(){
        return{
            //點選查詢才顯示下方清單
            display: false,
            //預設當前頁數
            readFormListPage: 1,
            //預設總頁數
            readFormListPageCount: 0,
            //操作者角色
            User: 'guest',
            //視窗彈出與否
            popOut: false,
            //選擇的調閱對象
            readAudience: null,
            //調閱對象清單
            readAudienceList:[],
            oriReadAudienceList:[],
            //調閱原因清單
            readReasonList:[],
            oriReadReasonList:[],
            readFormHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'archiveNum', align: 'center' },
                { text: '申請日期', value: 'acceptDateStr', align: 'center' },
                { text: '歸檔日期', value: 'archiveDateStr', align: 'center' },            
                { text: '受理項目', value: 'acceptItem', align: 'center' },                
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            readFormList: [],
            //日曆起(受理日期)
            menu1: false,
            // date1: '',
            acceptDate:{
                start:null,
                end: null,
            },
            acceptStartDate:null,            
            //日曆迄(受理日期)
            menu2: false,
            // date2: '',
            acceptEndDate:null,
            //日曆起(歸檔日期)
            menu3: false,            
            //日曆迄(歸檔日期)
            menu4: false,
            archiveDate:{
                start: null,
                end: null,
            },
            archiveStartDate: null,
            archiveEndDate: null,
            contractType:null,
            contractTypeList:[
                {text:'表制', value:'1'},
                {text:'高壓', value:'2'},
                {text:'包制', value:'3'},
            ],
            otherReason: null, //其他原因
            selectForm:{}, // 選擇要調閱的案件資料
            readNum: null, //調閱編號
            readDate:this.formatDateTime(new Date()),
            readReason: null,
            memo:null,
            errMsg:{
                readAudience: null,
                readReason:null,
                memo:null,
                otherReason:null,
                acceptDate:null,
                archiveDate:null,
            },
            requiredArray : [],
            formatArray : [],
            acceptNum: null,
            electricNum: null,
            custName: null,
            archiveNum: null
        }
    },
    methods:{
        init(){
            this.queryInquireReadInit();
        },
        // 依條件查詢
        search(){
            // 先驗證條件參數
            if(!this.validSearch()){
                return;
            } else {
                this.display = true;
                this.queryInquireReadList();
                // 打後端取資料
            }

        },
        // 點擊申請調閱按鈕
        applyRead(item){
            // 將輸入框資料清空
            this.resetVal();

            // 判斷是否為TPESUser
            if(this.User === 'TPESUser'){
                this.selectForm = item;
                // 沒有調閱編號的話就從後端取一個
                if(!this.readNum){
                    this.queryReadNum();
                }
            }
            // 取出表單受理編號
            this.selectAcceptNum = item.acceptNum;
            // 打開視窗
            this.popOut = true;
            // 重取一個調閱日期
            this.readDate = this.formatDateTime(new Date());
        },
        // 送出申請調閱
        submit(){
            // 再次驗證資料
            if(this.validApplyVal()){
                let param = {};
                if(this.User == 'TPESUser'){
                    param = {
                        applyReason: this.readReason,
                        applyDesc: this.memo,
                        acceptNum: this.selectAcceptNum,
                        reader: '',
                        readerName: '',
                        user: this.User,
                        readNum: this.readNum
                    };
                }
                else{
                    param = {
                        applyReason: this.readReason.readReason,
                        applyDesc: this.otherReason,
                        acceptNum: this.selectAcceptNum,
                        reader: this.readAudience.empNo,
                        readerName: this.readAudience.empName,
                        user: this.User
                    };
                }

                console.log(param);

                AjaxService.post("/read/readApply", param, (response) => {
                    if(response.restData.success){
                        MessageService.showSuccess('調閱申請');
                    }else{
                        MessageService.showError(response.restData.message, '調閱申請');
                    }
                });
                this.popOut = false;
                // 使用完後把前端調閱編號清空，下次申請時才會再取一個
                this.readNum = '';
                this.resetVal();
            }
        },
        // 清空資料
        resetVal(){
            this.otherReason = null; 
            this.readReason = null;
            this.memo = null;
            this.setMember = null;
            this.setReason = null;
            this.errMsg.readAudience =  null;
            this.errMsg.readReason =  null;
            this.errMsg.memo =  null;
            this.errMsg.otherReason =  null;
        },
        // 清空日期欄位 obj為哪種日期類別,name為開始日期or結束日期
        resetDate(obj,name){
            this[obj][name] = null;
            this.checkDate();
        },
        // Action: 頁面初始化-取得下拉選單(操作角色為核算課長/調閱管理員)
        queryInquireReadInit(){
            AjaxService.post("/read/init", {}, (response) => {
                if(response.restData.success){
                    MessageService.showSuccess("初始化");
                    let reasonList = response.restData.reasonList;
                    if(reasonList){
                        for(let i in reasonList){
                            let reason = reasonList[i];
                            this.readReasonList.push({reasonCode: reason.code, readReason: reason.codeValue});
                        }
                    }
                    let readerList = response.restData.readerList;
                    if(readerList){
                        for(let i in readerList){
                            let reader = readerList[i];
                            this.readAudienceList.push({empNo: reader.empNo, empName: reader.name});
                        }
                    }
                }else{
                    MessageService.showError(response.restData.message, "初始化");
                }
            });

            // 將資料存到另一個參數中，用於後續傳到後端比對資料
            this.oriReadReasonList = JSON.parse(JSON.stringify(this.readReasonList));
            this.oriReadAudienceList = JSON.parse(JSON.stringify(this.readAudienceList));
        },

         // Action: 依條件查詢可調閱的案件清單
        queryInquireReadList(){
            let param = {
                acceptNum:this.acceptNum,
                electricNum: this.electricNum,
                custName: this.custName,
                archiveNum: this.archiveNum,
                acceptStartDate: this.acceptStartDate,
                acceptEndDate: this.acceptEndDate,
                archiveStartDate: this.archiveStartDate,
                archiveEndDate: this.archiveEndDate
            };

            AjaxService.post("/tpesForm/queryForm", param, (response) => {
                if(response.restData.success) {
                    MessageService.showSuccess('查詢案件清單');
                    this.readFormList = response.restData.formList;
                }else{
                    MessageService.showError(response.restData.message, '查詢案件清單');
                }
            });
        },
        // Action:開啟調閱申請視窗取得調閱編號(TPES)
        queryReadNum(){
            AjaxService.post("/read/queryReadNum", {}, (response) => {
                if(response.restData.success){
                    this.readNum = response.restData.readNum;
                }
            });
        },
        // 驗證日期格式
        // 依條件查詢清單送出前再次驗證
        validSearch(){
            let hasCheck = true;
            this.requiredArray = [];
            this.formatArray = [];

            if(!this.checkDate()){
                hasCheck = false;                
            }

            if(!hasCheck){
                MessageService.showCheckInfo(this.requiredArray,this.formatArray);
            }

            return hasCheck;
        },
        // 送出調閱申請前再次驗證
        validApplyVal(){
            let hasCheck = true;
            this.requiredArray = [];
            this.formatArray = [];

            // 若為核算課長/調閱管理員申請調閱
            if(this.User !== 'TPESUser'){
                if(!this.checkReadAudience()){                   
                    hasCheck = false;                   
                }
                if(!this.checkReadReason('mgmn')){                   
                    hasCheck = false;                   
                }
                if(!this.checkOtherReason()){                   
                    hasCheck = false;
                }
            // 若為TPES使用者申請調閱
            } else {
                if(!this.checkReadReason()){                   
                    hasCheck = false;
                } 
                if(!this.checkMemo()){                    
                    hasCheck = false;                    
                }
            }
            if(!hasCheck){
                MessageService.showCheckInfo(this.requiredArray,this.formatArray);
            }
            return hasCheck;
        },
        checkDate(){
            let hasCheck = true;
            
            // 1-1 判斷受理日期起迄日都有選擇 
            if(!ValidateUtil.isEmpty(this.acceptDate.start) && !ValidateUtil.isEmpty(this.acceptDate.end)){
                this.acceptStartDate = this.acceptDate.start +' 00:00:00';
                this.acceptEndDate = this.acceptDate.end +' 23:59:59';

                //  驗證日期範圍格式是否正確
                if(!ValidateUtil.validateDateRange(this.acceptStartDate,this.acceptEndDate)){
                    this.errMsg.acceptDate = "受理日期選擇範圍錯誤";
                    this.formatArray.push('受理日期區間');
                    hasCheck = false;         
                } else {
                    this.errMsg.acceptDate = null;      
                }

            // 1-2 判斷受理日期起迄日只有其中一欄有選擇日期 
            } else if(!ValidateUtil.isEmpty(this.acceptDate.start) || !ValidateUtil.isEmpty(this.acceptDate.end)){
                this.errMsg.acceptDate = "受理日期未選擇完整範圍";
                this.formatArray.push('受理日期區間'); 
                hasCheck = false;

            // 1-3 判斷受理日期起訖日欄位皆未選擇
            } else {
                this.errMsg.acceptDate = null;
            }

            // 2-1 判斷歸檔日期起迄日都有選擇 
            if(!ValidateUtil.isEmpty(this.archiveDate.start) && !ValidateUtil.isEmpty(this.archiveDate.end)){
                this.archiveStartDate = this.archiveDate.start +' 00:00:00';
                this.archiveEndDate = this.archiveDate.end +' 23:59:59';

                //  驗證日期範圍格式是否正確
                if(!ValidateUtil.validateDateRange(this.archiveStartDate,this.archiveEndDate)){
                    this.errMsg.archiveDate = "歸檔日期選擇範圍錯誤";
                    this.formatArray.push('歸檔日期區間');
                    hasCheck = false;    
                } else {
                    this.errMsg.archiveDate = null;
                }
            
             // 2-2 判斷歸檔日期起迄日只有其中一欄有選擇
            } else if(!ValidateUtil.isEmpty(this.archiveDate.start) || !ValidateUtil.isEmpty(this.archiveDate.end)){
                this.errMsg.archiveDate = "歸檔日期未選擇完整範圍";
                this.formatArray.push('歸檔日期區間');   
                hasCheck = false;
            
            // 2-3 判斷歸檔日期起迄日欄位皆未選擇
            } else {
                this.errMsg.archiveDate = null;
            }

            return hasCheck;
        },
        // 驗證調閱對象
        checkReadAudience(){
            let hasCheck = true;

            if(ValidateUtil.isEmpty(this.readAudience)){
                this.requiredArray.push('調閱對象');
                hasCheck = false;
                this.errMsg.readAudience = "請選擇調閱對象";
            } else {
                this.errMsg.readAudience = null;
            }

            return hasCheck;
        },
        // 驗證調閱事由
        checkReadReason(type){
            let hasCheck = true;

            if(type === 'mgmn'){
                if(ValidateUtil.isEmpty(this.readReason)){
                    this.requiredArray.push('調閱事由');
                    hasCheck = false;
                    this.errMsg.readReason = "請選擇調閱事由";
                } else {
                    this.errMsg.readReason = null;
                }
            } else {
                if(ValidateUtil.isEmpty(this.readReason)){
                    this.requiredArray.push('調閱事由');
                    this.errMsg.readReason = "請輸入調閱事由";
                    hasCheck = false;
                } else if(this.readReason.length > 50){
                    this.formatArray.push('調閱事由');
                    this.errMsg.readReason = "已超過字數限制";
                    hasCheck = false;
                } else {
                    this.errMsg.readReason = null;
                }
            }

            return hasCheck;
        },
        // 驗證其他事由
        checkOtherReason(){
            let hasCheck = true;

            if(!ValidateUtil.isEmpty(this.otherReason) && this.otherReason.length > 50){
                this.formatArray.push('其他事由');
                this.errMsg.otherReason = "已超過字數限制";
                hasCheck = false;
            } else {
                this.errMsg.otherReason = null;
            }
            return hasCheck;
        },
        // 驗證備註
        checkMemo(){
            let hasCheck = true;

            if(!ValidateUtil.isEmpty(this.memo) && this.memo.length > 50)
            {
                this.formatArray.push('備註');
                hasCheck = false;
                this.errMsg.memo = "超過50字";                
            }

            return hasCheck;
        },
        // 轉換日期格式為字串
        formatDateTime(date) {
            var moment = require('moment');
            moment().format();
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}