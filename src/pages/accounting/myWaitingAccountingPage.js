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
            User: 'auditer',
            numOfAccounting: null,
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
                { text: '契約種類', value: 'contractType', align: 'center',width:'10%' },
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
            department:null,
            deptList:[],
            oriDeptList:[],
            rejectReason: null,
            reasonList:[],
            oriReasonList:[],
            formParam:{},
            formKey: 0,
            accnting: '',
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
                {text:'顯示全部',value:'1'},
                {text:'顯示代理件',value:'2'},
                {text:'不顯示代理件',value:'3'},
            ],

            commentsModel:false,
            contractTypeOption:[
                {text:'表制', value:'1'},
                {text:'高壓', value:'2'},
                {text:'包制', value:'3'},
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
                contractType: null,       //契約種類
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
            AjaxService.post('/waitAccounting/updateAccntStatus',
            {
                seq: seq,
            },
            (response) => {
                if (response != null &&
                    response != undefined &&                                
                    response.success
                    ) {    
                        console.log(response);                                                             
                         // 判斷該筆案件是否已檢視過，若沒有則修改該筆案件註記紀錄(Action)
                        //  this.selectIndex = this.accoutingList.indexOf(item); // 取出被選擇資料的index
                        //  this.selectItem = item; // 將選到的資料放進selectItem中
                        // if(ValidateUtil.isEmpty(item.status)){
                        //     this.updateAccoutingStatus(item.seq,this.selectIndex);
                        // }                                                                                       
                        this.queryAccoutingInit();

                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );
            
          
          // 帶入受理編號
          this.formParam = {
            fmNo: item.acceptNum
        };
        this.formKey++;
          // 判斷該筆案件是否已檢視過，若沒有則修改該筆案件註記紀錄(Action)
        //   if(ValidateUtil.isEmpty(item.status)){
        //       this.updateAccoutingStatus(item.seq,this.selectIndex);
        //   }
          // 查詢待核算案件資料(Action)
          this.queryAccoutingData();
          this.selectItem.seq = item.seq;  
          this.selectItem.formSeq = item.formSeq;     
          this.selectItem.accnting = item.accnting;   
          this.accountingDialog = true;

        },
        // 打開核算視窗
        checking(item){
            this.selectIndex = this.accoutingList.indexOf(item);
            this.checkingDialog = true;            
        },
        // 打開核算退件視窗
        returnOrder(){
            this.returnReasonModel = true;
        },
        // 核算成功
        accountingSubmit(memo){
            this.memo = memo;
            this.updateAccouting(); 
            this.accountingDialog = false;
        },
        saveComments(memo){
            this.memo = memo;            
            this.saveAccoutingMemo();

            this.accountingDialog = false;
        },
        // 案件退件
        returnSubmit(memo){
          this.requireArray = [];
          this.formatArray = [];
          this.memo = memo;

          if(!this.checkRejectVal()){
              MessageService.showCheckInfo(this.requireArray,this.formatArray);
          }  else {
              this.updateAccouting('reject'); 
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
            // 模擬從後端取到的假資料            
            AjaxService.post('/waitAccounting/init',
            {
                       
            },
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.message != null &&
                    response.message != undefined &&
                    response.success
                    ) {
                    if (ValidateUtil.isEmpty(response.initWaitAccountingListVo)) {                        
                        MessageService.showInfo('查無資料');
                    } else {           
                        console.log(response);                                                             
                        this.accoutingList = Object.assign(response.initWaitAccountingListVo);                        
                        response.initWaitAccountingListVo.forEach((element) => {
                            element.action = true;
                        });       
                        response.initWaitAccountingListVo.forEach((element) => {
                            if(element.status == 'READ'){
                                element.hasView = true;
                            }                            
                        });                                                         
                    }
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );

            let accoutingList = [
                { action: true,
                  seq:1,
                  formSeq:1, 
                  acceptNum: 'A00028',
                  isAgent:false,
                  status:null,
                  archieveNum:'000700',
                  dispatchDate:'2021-09-10 10:00',
                  electricNum:'91020122',
                  custName:'利小凡',
                  computeDate:'02',
                  contractType:'表制',
                  cumulativeDay:'3', 
                  acceptDate: '2021-09-10 10:00',
                  closeDate: '2021-09-10 16:00',  
                  acceptItem: '軍眷用電申請優待',
                  memo:'測試待核算備註'
                },
                {action: true, seq:2, formSeq:2, acceptNum: 'A00615',isAgent:true,status:null,archieveNum:'000701',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'陳和千',computeDate:'05',contractType:'包制',cumulativeDay:'1', acceptDate: '2021-09-09 11:21', closeDate: '2021-09-09 15:21',  acceptItem: '故障換表',memo:''},
                {action: true, seq:3, formSeq:3, acceptNum: 'A00040',isAgent:false,status:null,archieveNum:'000702',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'黎維成',computeDate:'10',contractType:'表制',cumulativeDay:'4', acceptDate: '2021-09-07 15:36', closeDate: '2021-09-08 15:06', acceptItem: '增加電表',memo:''},
                {action: true, seq:4, formSeq:4, acceptNum: 'A00605',isAgent:true,status:'READ',sortarchieveNumNo:'000703',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'區立言',computeDate:'16',contractType:'高壓',cumulativeDay:'3', acceptDate: '2021-09-10 09:45', closeDate: '2021-09-15 10:50',  acceptItem: '表燈非時間電價停用廢止',memo:''},
                {action: true, seq:5, formSeq:5, acceptNum: 'A00619',isAgent:false,status:null,archieveNum:'000704',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'馮文卿',computeDate:'01',contractType:'表制',cumulativeDay:'2', acceptDate: '2021-09-10 13:44', closeDate: '2021-09-10 15:26',  acceptItem: '故障換表',memo:''}
            ];
            let numOfAccounting = '5';

            // 整理案件資料
            this.setAccountInfo(accoutingList);
            // 取出後端參數
            this.numOfAccounting = numOfAccounting;
        },

        // 取得退件視窗的下拉選單清單
        queryInitOption(){
            // 取得退件原因清單
            let reasonList = [
                {codeName:'原因由台電提供_1',code:'1'},
                {codeName:'原因由台電提供_2',code:'2'},
                {codeName:'原因由台電提供_3',code:'3'},
                {codeName:'原因由台電提供_4',code:'4'},
                {codeName:'原因由台電提供_5',code:'5'},
                {codeName:'原因由台電提供_6',code:'6'},
                {codeName:'原因由台電提供_7',code:'7'},
                {codeName:'原因由台電提供_8',code:'8'},
                {codeName:'原因由台電提供_9',code:'9'},
                {codeName:'原因由台電提供_10',code:'10'},
            ];

            // 取得部門清單
            let deptList = [
                {deptName:'核算課',deptNum:'1'},
                {deptName:'大里服務中心',deptNum:'2'},
                {deptName:'東山服務所',deptNum:'3'},
            ];

            this.reasonList = reasonList;
            this.deptList = deptList;
        },


        // Action:依條件查詢待審核案件清單
        queryAccoutingList(){
            // vin參數
            // acceptNum: this.searchForm.acceptNum,
            // electricNum: this.searchForm.electricNum,
            // custName: this.searchForm.custName,
            // cumulativeDay: this.searchForm.cumulativeDay,
            // computeDate: this.searchForm.computeDate,
            // archieveNum: this.searchForm.archieveNum,
            // dispatchStartDate: this.searchForm.dispatchStartDate,
            // dispatchEndDate: this.searchForm.dispatchEndDate,
            // contractType: this.searchForm.contractType,
            // caseType: this.searchForm.caseType,

             // 模擬從後端取到的假資料
            let accoutingList = [
                { action: true,
                  seq:1,
                  formSeq:1, 
                  acceptNum: 'A00028',
                  isAgent:false,
                  status:null,
                  archieveNum:'000700',
                  dispatchDate:'2021-09-10 10:00',
                  electricNum:'91020122',
                  custName:'利小凡',
                  computeDate:'02',
                  contractType:'表制',
                  cumulativeDay:'3', 
                  acceptDate: '2021-09-10 10:00',
                  closeDate: '2021-09-10 16:00',  
                  acceptItem: 'QA210  軍眷用電申請優待',
                  memo:'測試待核算備註'
                },
                {action: true, seq:2, formSeq:2, acceptNum: 'A00615',isAgent:true,status:null,archieveNum:'000701',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'陳和千',computeDate:'05',contractType:'包制',cumulativeDay:'1', acceptDate: '2021-09-09 11:21', closeDate: '2021-09-09 15:21',  acceptItem: ' 故障換表',memo:''},
                {action: true, seq:3, formSeq:3, acceptNum: 'A00040',isAgent:false,status:null,archieveNum:'000702',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'黎維成',computeDate:'10',contractType:'表制',cumulativeDay:'4', acceptDate: '2021-09-07 15:36', closeDate: '2021-09-08 15:06', acceptItem: ' 增加電表',memo:''},
                {action: true, seq:4, formSeq:4, acceptNum: 'A00605',isAgent:true,status:'READ',sortarchieveNumNo:'000703',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'區立言',computeDate:'16',contractType:'高壓',cumulativeDay:'3', acceptDate: '2021-09-10 09:45', closeDate: '2021-09-15 10:50',  acceptItem: '  表燈非時間電價停用廢止',memo:''},
                {action: true, seq:5, formSeq:5, acceptNum: 'A00619',isAgent:false,status:null,archieveNum:'000704',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'馮文卿',computeDate:'01',contractType:'表制',cumulativeDay:'2', acceptDate: '2021-09-10 13:44', closeDate: '2021-09-10 15:26',  acceptItem: ' 故障換表',memo:''}
            ];
            let numOfAccounting = '5';

            // 整理案件資料
            this.setAccountInfo(accoutingList);
            // 取出後端參數
            this.numOfAccounting = numOfAccounting;

            MessageService.showSuccess('依條件查詢待核算資料');


        },

        // Action:查詢待審核案件資料
        queryAccoutingData(){
            // vin參數
            // formSeq: this.selectItem.formSeq,
            
        },

        // Action:更新待審核案件檢視狀態
        updateAccoutingStatus(seq,index){
            // vin參數
            // seq: seq
            console.log(seq);
            console.log(index);
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
            };
            
            AjaxService.post('/waitAccounting/saveMemo',SaveMemoReq,
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {                             
                        // console.log(response);                                                             
                        // this.accoutingList = Object.assign(response.queryWaitAccountingListVo);                        
                        // response.queryWaitAccountingListVo.forEach((element) => {
                        //     element.action = true;
                        // });       
                        // response.queryWaitAccountingListVo.forEach((element) => {
                        //     if(element.status == 'READ'){
                        //         element.hasView = true;
                        //     }                            
                        // });          
                        MessageService.showInfo('儲存備註成功');                                                                   
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );
        },

        // Action:更新案件審核狀態(成功/退件)
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
                rejectReason: this.rejectReason,
                rejectDesc: this.rejectDesc,
            };
            
            AjaxService.post('/waitAccounting/auditAccounting',AuditAccountingReq,
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {                                                             
                        MessageService.showInfo('核算成功');                                                                   
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );


            // if(type === 'reject') {
            //     if (this.selectIndex > -1) {
            //         this.accoutingList.splice(this.selectIndex, 1);
            //     }
            //     this.returnReasonModel = false;
            //     this.accountingDialog = false;
            //     this.waitingCount = this.waitingCount -1;
            //     MessageService.showSuccess("案件退件");
            // } else {
            //     if (this.selectIndex > -1) {
            //         this.accoutingList.splice(this.selectIndex, 1);
            //     }
            //     MessageService.showSuccess("案件核算");
            //     this.accountingDialog = false;
            //     this.waitingCount = this.waitingCount -1;
            // }
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

            if(ValidateUtil.isEmpty(this.department)){
                this.errMsg.dept = "請選擇退件到的部門";
                this.requireArray.push('退件部門');
                hasCheck = false;
            } else {
                this.errMsg.dept = null
            }

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