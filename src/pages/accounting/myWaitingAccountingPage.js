import FormPage from '@/pages/FormPage/FormPage.vue';
import MessageService from "@/assets/services/message.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service';


export default {
    name: 'MyWaitingAccounting',
    components: {
      FormPage
    },
    props: {
    },
    beforeMount(){
        this.init();
    },
    data() {
        return {            
            User: '',
            numOfAccounting: 0,
            accoutingHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center',width:'10%' },
                { text: '受理日期', value: 'acceptDate', align: 'center',width:'10%'  },
                { text: '結案日期', value: 'closeDate', align: 'center',width:'10%'  },
                { text: '戶名', value: 'custName', align: 'center',sortable:false,width:'5%'  },
                { text: '受理項目', value: 'acceptItem', align: 'center',width:'10%'  },
                { text: '計算日', value: 'computeDate', align: 'center',width:'5%' },
                { text: '電號', value: 'electricNum', align: 'center',width:'5%'  },
                { text: '待核算累積日數', value: 'cumulativeDay', align: 'center',width:'5%'  },
                { text: '派工日期', value: 'dispatchDate', align: 'center',width:'10%'  },
                { text: '卡別', value: 'contractType', align: 'center',width:'10%' },
                { text: '整理號碼', value: 'archiveNum', align: 'center',width:'10%' },
                { text: '檢視註記', value: 'hasView', align: 'center',width:'5%'},
                { text: '代理件', value: 'isAgent', align: 'center',width:'5%' },
                { text: '備註', value: 'memo', align: 'center',sortable:false,width:'2%' },
                { text: '狀態操作', value: 'action', align: 'center',sortable:false,width:'2%' }
            ],
            accoutingList: [],
            accoutingListPage: 1,
            accoutingListPageCount: 1,
            accountingDialog: false,
            checkingDialog: false,
            returnReasonModel: false,
            selectIndex: null,
            hasShowList:false,
            deptList:[],
            oriDeptList:[],
            rejectReason: null,
            reasonList:[],
            oriReasonList:[],
            formParam:{},
            formKey: 0,
            accnting: '',
            hasAccountingAuth: false,
            auditor: false,
            checker: false,
            computeDateOption:[
                {text:'01',value:'01'},
                {text:'02',value:'02'},
                {text:'03',value:'03'},
                {text:'04',value:'04'},
                {text:'05',value:'05'},
                {text:'06',value:'06'},
                {text:'07',value:'07'},
                {text:'08',value:'08'},
                {text:'09',value:'09'},
                {text:'10',value:'10'},
                {text:'11',value:'11'},
                {text:'12',value:'12'},
                {text:'13',value:'13'},
                {text:'14',value:'14'},
                {text:'15',value:'15'},
                {text:'16',value:'16'},

            ],
            agentCaseOption:[
                {text:'顯示全部',value:'QUERYALL'},
                {text:'顯示代理件',value:'QUERYAGENT'},
                {text:'不顯示代理件',value:'QUERYNOTAGENT'},
            ],

            commentsModel:false,
            contractTypeOption:[
                {text:'純電號', value:'V'},
                {text:'表制', value:'C'},
                {text:'高壓', value:'E'},
                {text:'包制', value:'F'},
            ],
            contractType:null,
            
             //日曆起(受理日期)
             menu1: false,
             menu2:false,
             dispatchDate:{
                start: null,
                end:null,
             },

            // 依條件查詢的資料
            searchForm:{
                acceptNum: null,          //受理號碼
                electricNum: null,        //電號
                custName: null,           //戶名
                cumulativeDay: null,      //待核算累積日數
                computeDate: null,        //計算日
                archiveNum: null,        //整理號碼
                dispatchStartDate: null,  //派工日期開始
                dispatchEndDate: null,    //派工日期結束
                contractType: null,       //卡別
                caseType: null            //代理件顯示
            },
            memo: null,
            rejectDesc: null,
            errMsg:{
                dispatchDate: null,
                dept: null,
                rejectReason: null,
                rejectDesc: null,
            },
            requireArray:[],
            formatArray:[],
            selectItem:{},            
        }
    },
    methods: {
        init(){
            this.queryInitOption();
            this.queryAccoutingInit();
        },

        // 點擊打開核算視窗
        accounting(item) {   
            let seq = item.seq;
            let accounting = item.accnting;            
            if(item.status == "UNREAD"){
                AjaxService.post('/waitAccounting/updateAccntStatus',
                {
                    seq: seq,
                    accounting: accounting
                },
                (response) => {
                    if (response && response.restData && response.restData.success) {                                                                                                                                                                                       
                        this.queryAccoutingList();                                             
                    } else {
                    //接後端候要放errorMsg
                    MessageService.showError(response.restData.message);                  
                    }
                },
                    (error) => {
                        MessageService.showSystemError();
                        console.log(error);
                    }
                );
            }
            //視窗帶入備註
            this.memo = item.memo;
            // 帶入受理編號
            this.formParam = {
                FM_NO: item.acceptNum
            };
            this.formKey++;
            
            
          // 判斷該筆案件是否已檢視過，若沒有則修改該筆案件註記紀錄(Action)
        //   if(ValidateUtil.isEmpty(item.status)){
        //       this.updateAccoutingStatus(item.seq,this.selectIndex);
        //   }
          // 查詢待核算案件資料(Action)          
          this.selectItem.seq = item.seq;  
          this.selectItem.formSeq = item.formSeq;     
          this.selectItem.accnting = item.accnting;  
          this.selectItem.acceptNum = item.acceptNum; 
          this.selectItem.acceptDept = item.acceptDept;
          this.accountingDialog = true;

        },
        // 打開核算視窗
        checking(item){
            this.selectIndex = this.accoutingList.indexOf(item);
            
            //視窗帶入備註
            this.memo = item.memo;
            // 帶入受理編號
            this.formParam = {
                FM_NO: item.acceptNum
            };
            this.formKey++;

            this.checkingDialog = true;            
        },
        // 打開核算退件視窗
        returnOrder(memo){
            this.memo = memo;
            this.returnReasonModel = true;
        },
        // 核算成功
        accountingSubmit(memo){
            this.memo = memo;
            this.updateAccouting();             
        },
        saveComments(memo){
            this.memo = memo;            
            this.saveAccoutingMemo();

            this.accountingDialog = false;
        },
        // 案件退件
        async returnSubmit(){
          this.requireArray = [];
          this.formatArray = [];

          if(!this.checkRejectVal()){
              MessageService.showCheckInfo(this.requireArray,this.formatArray);
          }  else {
              await this.returnAccounting(); 
              this.returnReasonModel = false;
              this.accountingDialog = false;
              this.queryAccoutingList(); 
          }
        },
        // 開啟備註視窗
        openComments(item){
            this.memo = item.memo;
            if(ValidateUtil.isEmpty(this.memo)){
                MessageService.showInfo('該筆案件尚未填寫核算備註');
            } else {
                this.commentsModel = true;
            }

        },        

        // 查詢資料
        search(){
            
            if(this.formatArray.length > 0) {
                MessageService.showCheckInfo(this.requireArray,this.formatArray);
            } else {
                this.queryAccoutingList();
            }
        },  

         // 判斷清單資料檢視註記狀態
        setAccountInfo(accoutingList){
            for(let i in accoutingList){
                if(ValidateUtil.isEmpty(accoutingList[i].status)){
                    accoutingList[i].hasView = false;
                } else {
                    accoutingList[i].hasView = true;
                }
            }
            // 取出後端參數放回accoutingList
            this.accoutingList = accoutingList;
        },

        /**
         *  Ajax start 
         * 
         **/

        // Action:頁面初始化
        queryAccoutingInit(){
            let numAccounting = 0;
            AjaxService.post('/waitAccounting/init',
            {
                       
            },
            (response) => {
                if (response && response.restData && response.restData.success) {  
                    if(response.restData.initWaitAccountingListVo != null){
                        this.accoutingList = Object.assign(response.restData.initWaitAccountingListVo);                        
                        response.restData.initWaitAccountingListVo.forEach((element) => {
                            element.action = true;
                            if(element.canAccounting){
                                numAccounting++;
                            }
                        });
                        this.numOfAccounting = numAccounting;
                        
                        response.restData.initWaitAccountingListVo.forEach((element) => {                            
                            if(element.status == 'READ'){
                                element.hasView = true;
                            }          
                            if(element.agentForm){
                                element.isAgent = true;
                            }
                            
                                            
                        });                                                                                                                          
                        
                        if(!ValidateUtil.isEmpty(response.restData.authList)){
                            // 根據使用者角色決定頁面顯示
                            for(let i in response.restData.authList){
                                // 核算員
                                if(response.restData.authList[i] == 'AUTH15'){                                
                                    this.hasAccountingAuth = true;
                                }
                                // 檢算員
                                else if(response.restData.authList[i] == 'AUTH20'){                                
                                    this.hasAccountingAuth = true;
                                }
                                // 核算課長 or 核算部門主辦 可看到該課所有資料，但不能進行核算
                                else if(response.restData.authList[i] == 'AUTH01' || response.restData.authList[i] == 'AUTH07'){
                                    this.checker = true;
                                    this.hasAccountingAuth = true;
                                }
                            }
                        } 
                    }                                                                                                                                                   
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },

        // 取得退件視窗的下拉選單清單
        queryInitOption(){
            // 取得退件原因清單
            let reasonList = [
               
            ];                 
            AjaxService.post('/waitAccounting/returnSeletionList',
            {
                       
            },
            (response) => {
                if (response && response.restData && response.restData.success) {                                                                                                                                                                
                    reasonList = response.restData.returnReasonVoList;
                    this.reasonList = reasonList;                    
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }   
                
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },


        // Action:依條件查詢待審核案件清單
        queryAccoutingList(){
            let numAccounting = 0;
            let caseType = null;
            if(this.searchForm.caseType != null){
                caseType = this.searchForm.caseType.value;
            }
            
            let QueryWaitAccountingReq ={
                acceptNum: this.searchForm.acceptNum,
                electricNum: this.searchForm.electricNum,
                custName: this.searchForm.custName,
                cumulativeDay: this.searchForm.cumulativeDay,
                computeDate: (ValidateUtil.isEmpty(this.searchForm.computeDate)? null:this.searchForm.computeDate.value),
                archieveNum: this.searchForm.archieveNum,
                dispatchStartDate: this.searchForm.dispatchStartDate,
                dispatchEndDate: this.searchForm.dispatchEndDate,
                contractType:  (ValidateUtil.isEmpty(this.searchForm.contractType)? null:this.searchForm.contractType.value),
                caseType: caseType,
            };
            
            AjaxService.post('/waitAccounting/queryWaitAccounting',QueryWaitAccountingReq,
            (response) => {
                if (response && response.restData && response.restData.success) {                                                                                                                                 
                    this.accoutingList = Object.assign(response.restData.queryWaitAccountingListVo);                        
                    response.restData.queryWaitAccountingListVo.forEach((element) => {
                        element.action = true;
                        if(element.canAccounting){
                            numAccounting++;
                        }
                    });     
                    this.numOfAccounting = numAccounting;
                    response.restData.queryWaitAccountingListVo.forEach((element) => {
                        if(element.status == 'READ'){
                            element.hasView = true;
                        }          
                        if(element.agentForm){
                            element.isAgent = true;
                        }                  
                    });                        
                    this.numOfAccounting = response.restData.queryWaitAccountingListVo.length;      
                    
                    if(!ValidateUtil.isEmpty(response.restData.authList)){
                        // 根據使用者角色決定頁面顯示
                        for(let i in response.restData.authList){
                            // 核算員
                            if(response.restData.authList[i] == 'AUTH15'){                                
                                this.hasAccountingAuth = true;
                            }
                            // 檢算員
                            else if(response.restData.authList[i] == 'AUTH20'){                                
                                this.hasAccountingAuth = true;
                            }
                            // 核算課長 or 核算部門主辦 可看到該課所有資料，但不能進行核算
                            else if(response.restData.authList[i] == 'AUTH01' || response.restData.authList[i] == 'AUTH07'){
                                this.checker = true;
                                this.hasAccountingAuth = true;
                            }
                        }
                    }                                                          
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },

        

        // Action:更新待審核案件檢視狀態
        updateAccoutingStatus(seq,index){
            // vin參數
            // seq: seq
            // console.log(seq);
            // console.log(index);
            this.accoutingList[index].hasView = true;
        },

        // Action:更新待審核備註
        saveAccoutingMemo(){
            // vin參數
            // seq: this.selectItem.seq,
            // memo: this.memo,            
            const SaveMemoReq = {
                seq: this.selectItem.seq,
                memo: this.memo, 
                accounting: this.selectItem.accnting
            };
            
            AjaxService.post('/waitAccounting/saveMemo',SaveMemoReq,
            (response) => {
                if (response && response.restData && response.restData.success) {                                                           
                    MessageService.showInfo('儲存備註成功'); 
                    this.queryAccoutingList();                                                                          
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },

        // Action:更新案件審核狀態(成功)
        updateAccouting(){
            // vin參數
            // seq: this.selectItem.seq,
            // formSeq: this.selectItem.formSeq,
            // memo: this.memo,
            // accounting: this.accounting,           
            // rejectReason:this.rejectReason,
            // rejectDesc:this.rejectDesc,accounting    
            
            const AuditAccountingReq = {
                seq: this.selectItem.seq,
                formSeq: this.selectItem.formSeq,
                memo: this.memo,
                accnting: this.selectItem.accnting,
                acceptNum: this.selectItem.acceptNum,                
            };
            
            AjaxService.post('/waitAccounting/auditAccounting', AuditAccountingReq,
            (response) => {
                if (response && response.restData && response.restData.success) {                                                             
                    MessageService.showInfo('核算成功');
                    this.accoutingList = [];
                    this.queryAccoutingList();  
                    this.accountingDialog = false;                                                                 
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },

        //Action: 更新案件審核狀態(退件)
        async returnAccounting(){

            
            const AuditAccountingReq = {
                seq: this.selectItem.seq,
                formSeq: this.selectItem.formSeq,
                memo: this.memo,
                rejectToDept: this.selectItem.acceptDept,                
                accnting: this.selectItem.accnting,
                acceptNum: this.selectItem.acceptNum,
                rejectReason: (this.rejectReason) ? this.rejectReason.returnReasonName : null,
                rejectDesc: this.rejectDesc,
            };           
            await AjaxService.post('/waitAccounting/auditAccounting', AuditAccountingReq,
            (response) => {
                if (response && response.restData && response.restData.success) {                                                             
                    MessageService.showInfo('退件成功');
                    this.accoutingList = [];                                                                                                          
                } else {
                  //接後端候要放errorMsg
                  MessageService.showError(response.restData.message);                  
                }
            },
                (error) => {
                    MessageService.showSystemError();                    
                }
            );
            
        },

        /**
         *  Ajax end 
         * 
         **/


         /**
         *  驗證 start 
         * 
         **/

        // 驗證退件資料
        checkRejectVal(){
            let hasCheck = true;

            if(ValidateUtil.isEmpty(this.rejectReason)){
                this.errMsg.rejectReason = "請選擇退件原因";
                this.requireArray.push('退件原因');
                hasCheck = false;
            } else {
                this.errMsg.rejectReason = null
            }

            if(ValidateUtil.isEmpty(this.rejectDesc)){
                this.errMsg.rejectDesc = "請輸入退件說明";
                this.requireArray.push('退件說明');
                hasCheck = false;
            } else if(!ValidateUtil.isEmpty(this.rejectDesc) && this.rejectDesc.length > 50){
                this.formatArray.push('退件說明');
                this.errMsg.rejectDesc = "已超過字數限制";
                hasCheck = false;
            } else {
                this.errMsg.rejectDesc = null;
            }


            return hasCheck;

        },

        // 驗證派工日期區間
        checkDate(){
            this.formatArray = [];
            if(!ValidateUtil.isEmpty(this.dispatchDate.start) && !ValidateUtil.isEmpty(this.dispatchDate.end)){
                this.searchForm.dispatchStartDate = this.dispatchDate.start + ' 00:00:00';
                this.searchForm.dispatchEndDate = this.dispatchDate.end + ' 23:59:59';
                
                if(!ValidateUtil.validateDateRange(this.searchForm.dispatchStartDate,this.searchForm.dispatchEndDate)){
                    this.errMsg.dispatchDate = '日期範圍錯誤'
                    this.formatArray.push('派工日期');
                    
                } else {
                    this.errMsg.dispatchDate = null;
                }
            }
        },


         /**
         *  驗證 end 
         * 
         **/

    }
}