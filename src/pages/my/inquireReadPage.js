import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

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
                { text: '整理號碼', value: 'archieveNum', align: 'center' },
                { text: '申請日期', value: 'acceptDate', align: 'center' },
                { text: '歸檔日期', value: 'achieveDate', align: 'center' },            
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
            archieveDate:{
                start: null,
                end: null,
            },
            archieveStartDate: null,
            archieveEndDate: null,
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
            formSeq: null,
            errMsg:{
                readAudience: null,
                readReason:null,
                memo:null,
                otherReason:null,
                acceptDate:null,
                archieveDate:null,
            },
            requiredArray : [],
            formatArray : [],
            acceptNum: null,
            electricNum: null,
            custName: null,
            archieveNum: null,

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
            }
            // 取出表單流水號
            this.formSeq = item.seq;
            // 打開視窗
            this.popOut = true;
        },

        // 送出申請調閱
        submit(){
            // 再次驗證資料
            if(this.validApplyVal()){
                // 將資料送至後端放這裡
                MessageService.showSuccess('調閱申請');
                this.popOut = false;
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


        /**
         * Ajax start 
         * 
         **/

        // Action: 頁面初始化-取得下拉選單(操作角色為核算課長/調閱管理員)
        queryInquireReadInit(){
            // 模擬假資料
            let readAudienceList = [                
                { empNo: '', empName: '自己',},
                { empNo: '1050330-001', empName: '梁朝偉'},
                { empNo: '1050330-002', empName: '王曉花'},
                { empNo: '1050330-003', empName: '林美美'},
                { empNo: '1050331-001', empName: '蔡政揚'},
                { empNo: '1050331-002', empName: '張芊芊'},
                { empNo: '1050331-003', empName: '江舒語'},                
                { empNo: '1050320-001', empName: '陳大天'},
                { empNo: '1050320-002', empName: '何欣惠'},
            
            ];

            let readReasonList = [
                {readReason:'確認換表指數及內容', reasonCode:'REASON01'},
                {readReason:'確認設備容量', reasonCode:'REASON02'},
                {readReason:'確認是否須拆除外線', reasonCode:'REASON03'},
                {readReason:'確認用電地址', reasonCode:'REASON04'},
                {readReason:'確認中抄指數', reasonCode:'REASON05'},
                {readReason:'前用戶異議單獨過戶', reasonCode:'REASON06'},
                {readReason:'電表報損確認賠償費用', reasonCode:'REASON07'},
                {readReason:'新增設案件抽查', reasonCode:'REASON08'},
                {readReason:'現場用電用途查核', reasonCode:'REASON09'},
                {readReason:'完工結算', reasonCode:'REASON10'},
            ]

            this.readReasonList = readReasonList;
            this.readAudienceList = readAudienceList;
            // 將資料存到另一個參數中，用於後續船到後端比對資料
            this.oriReadReasonList = JSON.parse(JSON.stringify(this.readReasonList));
            this.oriReadAudienceList = JSON.parse(JSON.stringify(this.readAudienceList));
        },

         // Action: 依條件查詢可調閱的案件清單
        queryInquireReadList(){
            // Vin參數
            // acceptNum:this.acceptNum,
            // electricNum: this.electricNum,
            // custName: this.custName,
            // archieveNum: this.archieveNum,
            // acceptStartDate: this.acceptStartDate,
            // acceptEndDate: this.acceptEndDate,
            // archieveStartDate: this.archieveStartDate,
            // archieveEndDate: this.archieveEndDate,

            let readFormList = [
                { mani: true, seq:1 ,acceptNum: 'A00024',custName:'吳小花',contractType:'高壓',archieveNum:'000300', electricNum: '7140000123', acceptDate:'2021-09-10 10:00', achieveDate:'2021-09-15 10:00',  acceptItem:'QA210軍眷用電申請優待'},
                { mani: true, seq:2 ,acceptNum: 'A00615',custName:'虞小寒',contractType:'包制',archieveNum:'000301', electricNum: '7140000456', acceptDate:'2021-09-09 11:21', achieveDate:'2021-09-15 11:21',  acceptItem:'I0510故障換表'},
                { mani: true, seq:3 ,acceptNum: 'A00040',custName:'孔維祥',contractType:'表制',archieveNum:'000302', electricNum: '7140000789', acceptDate:'2021-09-07 15:36', achieveDate:'2021-09-15 15:36',  acceptItem:'I0520增加電表'},
                { mani: true, seq:4 ,acceptNum: 'A00605',custName:'文易席',contractType:'高壓',archieveNum:'000303', electricNum: '7140000888', acceptDate:'2021-09-10 09:45', achieveDate:'2021-09-15 09:45',  acceptItem:'F3030表燈非時間電價停用廢止'},
                { mani: true, seq:5 ,acceptNum: 'A00619',custName:'許慧貞',contractType:'包制',archieveNum:'000304', electricNum: '7140000999', acceptDate:'2021-09-10 13:44', achieveDate:'2021-09-15 13:44',  acceptItem:'I0510故障換表'},
            ]

            this.readFormList = readFormList;
        },

        // Action:調閱申請(核算課長/調閱管理員)
        createReadApply(){
            // Vin參數
            // formSeq: this.formSeq,
            // readEmpNum: this.readEmpNum,
            // readEmpName: this.readEmpNum,
            // readReason: this.readReason,
            // otherReason: this.otherReason,
            // oriReadReasonList = this.oriReadReasonList,      // 傳到後端與選擇到的資料比對
            // oriReadAudienceList = this.oriReadAudienceList,  // 傳到後端與選擇到的資料比對

            MessageService.showSuccess('調閱申請');
            this.popOut = false;
            this.resetVal();
        },

        // Action:開啟調閱申請視窗取得調閱編號(TPES)
        queryReadNum(){
            // 模擬放假資料
            let readNum = '71023133';
            this.readNum = readNum;
        },

        // Action:調閱申請(其他TPES使用者)
        createOtherReadApply(){
            // Vin參數
            // formSeq: this.formSeq,
            // readDate: this.readDate,
            // readNum: this.readNum,
            // readReason: this.readNum,
            // memo: this.memo,

            MessageService.showSuccess('調閱申請');
            this.popOut = false;
            this.resetVal();
        },

        /**
         * Ajax end 
         * 
         **/


        
        /**
         * Validate start 
         * 
         * */

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
            if(!ValidateUtil.isEmpty(this.archieveDate.start) && !ValidateUtil.isEmpty(this.archieveDate.end)){
                this.archieveStartDate = this.archieveDate.start +' 00:00:00';
                this.archieveEndDate = this.archieveDate.end +' 23:59:59';

                //  驗證日期範圍格式是否正確
                if(!ValidateUtil.validateDateRange(this.archieveStartDate,this.archieveEndDate)){
                    this.errMsg.archieveDate = "歸檔日期選擇範圍錯誤";
                    this.formatArray.push('歸檔日期區間');
                    hasCheck = false;    
                } else {
                    this.errMsg.archieveDate = null;
                }
            
             // 2-2 判斷歸檔日期起迄日只有其中一欄有選擇
            } else if(!ValidateUtil.isEmpty(this.archieveDate.start) || !ValidateUtil.isEmpty(this.archieveDate.end)){
                this.errMsg.archieveDate = "歸檔日期未選擇完整範圍";
                this.formatArray.push('歸檔日期區間');   
                hasCheck = false;
            
            // 2-3 判斷歸檔日期起迄日欄位皆未選擇
            } else {
                this.errMsg.archieveDate = null;
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

        
        /**
         * Validate end 
         * 
         * */

        



        /**
         * UI start 
         * 
         * */

        // 轉換日期格式為字串
        formatDateTime(date) {
            var moment = require('moment');
            moment().format();
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        /**

        * UI end 
         * 
         * */
        
    }
    
}