import FormPage from '@/pages/FormPage/FormPage.vue';
import MessageService from "@/assets/services/message.service";
import ValidateUtil from '@/assets/services/validateUtil';

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
                { text: '整理號碼', value: 'archieveNum', align: 'center',width:'10%' },
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
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ],
            reason: null,
            reasonOption:[
                {text:'原因由台電提供_1',value:'1'},
                {text:'原因由台電提供_2',value:'2'},
                {text:'原因由台電提供_3',value:'3'},
                {text:'原因由台電提供_4',value:'4'},
                {text:'原因由台電提供_5',value:'5'},
                {text:'原因由台電提供_6',value:'6'},
                {text:'原因由台電提供_7',value:'7'},
                {text:'原因由台電提供_8',value:'8'},
                {text:'原因由台電提供_9',value:'9'},
                {text:'原因由台電提供_10',value:'10'},
            ],
            computeDateOption:[
                {text:'01',value:'1'},
                {text:'02',value:'2'},
                {text:'03',value:'3'},
                {text:'04',value:'4'},
                {text:'05',value:'5'},
                {text:'06',value:'6'},
                {text:'07',value:'7'},
                {text:'08',value:'8'},
                {text:'09',value:'9'},
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
                archieveNum: null,        //整理號碼
                dispatchStartDate: null,  //派工日期開始
                dispatchEndDate: null,    //派工日期結束
                contractType: null,       //契約種類
                caseType: null            //代理件顯示
            },
            memo: null,
            errMsg:{
                dispatchDate: null,
            },
            requireArray:[],
            formatArray:[],
        }
    },
    methods: {
        init(){
            this.queryAccoutingInit();
        },

        // 點擊打開核算視窗
        accounting(item) {          
          this.selectIndex = this.accoutingList.indexOf(item);
          this.accountingDialog = true;
          item.hasView = true;

          // 判斷該筆案件是否已檢視過，若沒有則修改該筆案件註記紀錄
          if(ValidateUtil.isEmpty(item.status)){
              this.updateAccoutingStatus(item.seq);
          }

          // 查詢待核算案件資料
        },
        checking(item){
            this.selectIndex = this.accoutingList.indexOf(item);
            this.checkingDialog = true;
        },
        returnOrder(){
            this.returnReasonModel = true;
        },
        saveComments(){
            this.accountingDialog = false;
        },
        returnSubmit(){
           if (this.selectIndex > -1) {
                this.accoutingList.splice(this.selectIndex, 1);
              }
            this.returnReasonModel = false;
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
            MessageService.showSuccess("退件成功✓");
        },
        checkSubmit(){
           if (this.selectIndex > -1) {
                this.accoutingList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("核算成功✓");
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
        },
        openComments(item){
            this.memo = item.memo;
            if(ValidateUtil.isEmpty(this.memo)){
                MessageService.showInfo('該筆案件尚未填寫核算備註');
            } else {
                this.commentsModel = true;
            }

        },

        // 選擇派工日期區間
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

        search(){
            if(this.formatArray.length > 0) {
                MessageService.showCheckInfo(this.requireArray,this.formatArray);
            } else {
                this.queryAccoutingList();
            }
        },  

        /**
         *  Ajax start 
         * 
         **/

        // Action:依條件查詢待審核案件
        queryAccoutingInit(){
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
                {action: true, seq:2, formSeq:2, acceptNum: 'A00615',isAgent:true,status:null,archieveNum:'000701',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'陳和千',computeDate:'05',contractType:'包制',cumulativeDay:'1', acceptDate: '2021-09-09 11:21', closeDate: '2021-09-09 15:21',  acceptItem: 'I0510  故障換表',memo:''},
                {action: true, seq:3, formSeq:3, acceptNum: 'A00040',isAgent:false,status:null,archieveNum:'000702',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'黎維成',computeDate:'10',contractType:'表制',cumulativeDay:'4', acceptDate: '2021-09-07 15:36', closeDate: '2021-09-08 15:06', acceptItem: 'I0520  增加電表',memo:''},
                {action: true, seq:4, formSeq:4, acceptNum: 'A00605',isAgent:true,status:'READ',sortarchieveNumNo:'000703',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'區立言',computeDate:'16',contractType:'高壓',cumulativeDay:'3', acceptDate: '2021-09-10 09:45', closeDate: '2021-09-15 10:50',  acceptItem: 'F3030  表燈非時間電價停用廢止',memo:''},
                {action: true, seq:5, formSeq:5, acceptNum: 'A00619',isAgent:false,status:null,archieveNum:'000704',dispatchDate:'2021-09-10 10:00',electricNum:'91020122',custName:'馮文卿',computeDate:'01',contractType:'表制',cumulativeDay:'2', acceptDate: '2021-09-10 13:44', closeDate: '2021-09-10 15:26',  acceptItem: 'I0510  故障換表',memo:''}
            ];
            let numOfAccounting = '5';

            // 判斷該案件核算員是否檢視過了
            for(let i in accoutingList){
                if(ValidateUtil.isEmpty(accoutingList[i].status)){
                    accoutingList[i].hasView = false;
                } else {
                    accoutingList[i].hasView = true;
                }
            }

            // 取出後端參數
            this.accoutingList = accoutingList;
            this.numOfAccounting = numOfAccounting;
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
        },

        // Action:查詢待審核案件資料
        queryAccoutingData(){

        },

        // Action:更新待審核案件檢視狀態
        updateAccoutingStatus(){

        },

        // Action:更新待審核備註
        saveAccoutingMemo(){

        },

        // Action:更新案件審核狀態(成功/退件)
        updateAccouting(){

        },


        /**
         *  Ajax end 
         * 
         **/


         /**
         *  驗證 start 
         * 
         **/



         /**
         *  驗證 end 
         * 
         **/

    }
}