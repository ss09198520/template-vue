import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from '@/assets/services/ajax.service';


export default {
    name: 'UnDispatch',
    props: {
    
    },
    beforeMount() {
        this.init();
    },
    data() {
        return {
            numOfUndispatch: 0,
            unDispatchHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '整理號碼', value: 'archiveNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '卡別', value: 'contractType', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'closeDate', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            unDispatchList: [],
            // 頁數
            unDispatchListPageCount:1,
            unDispatchListPage:1,

            dispatchModel: false,

            className:null,
            classList:[],
            selectEmp:null,
            accountingList:[],
            selectIndex: null,
            //操作者角色
            User: 'employee',
            formSeq: null,
            seq: null,
            requiredArray:[],
            errMsg: null,

        }
    },
    methods: {
        init(){
            this.queryUndispatchInit();
            this.queryUndispatchOption();
        },
        // 判斷點擊哪個按鈕
        action(actionType,item){
            this.selectIndex = this.unDispatchList.indexOf(item); // 取出第幾筆
            this.formSeq = item.formSeq;
            this.seq = item.seq;

            if(actionType === 'dispatch'){
                this.className = null;
                this.selectEmp = null;
                this.dispatchModel = true;
            } else {
                this.claimUndispatch();
            }
        },
       // 送出分派案件
        submit(){
            this.requiredArray = [];
            if(!this.validVal()){
                MessageService.showCheckInfo(this.requiredArray,null);
                return;
            } else {
                this.updateUndispatch('dispatch');
            } 
        },

        // 分派視窗-二則一選擇即可，若點選另一個則將原本的選擇的清掉
        change(type){
            if(type == 'className'){
                this.selectEmp = null;
            } else {
                this.className = null;
            }
        },

        /** 
         * 
         * Ajax Start
         * 
        */

        // Action:頁面初始化
        queryUndispatchInit(){
            // 取得未分派清單資料
            AjaxService.post('/undispatch/init',
            {
                       
            },
            (response) => {
                if (response && response.restData && response.restData.success) {                             
                    this.unDispatchList = Object.assign(response.restData.initUndispatchListVo);                        
                    response.restData.initUndispatchListVo.forEach((element) => {
                        element.action = true;
                    });
                    this.User = response.restData.userType;
                    this.numOfUndispatch = response.restData.initUndispatchListVo.length;                                                                                                
                } else {
                    MessageService.showError(response.restData.message);             
                }
            },
                (error) => {                 
                    MessageService.showSystemError();
                    console.log(error);
                }
            );

           let unDispatchList = [
               
            ];

            this.unDispatchList = unDispatchList;
        },

        // Action: 取得下拉選單 (操作人為核算課長)
        queryUndispatchOption(){

            let classList = [];
            let accountingList = [
               
            ];

           AjaxService.post('/undispatch/queryUndispatchOptions',
           {
                      
           },
           (response) => {
               if (response && response.restData && response.restData.success) {                             
                    // 取得班別資料
                    classList = response.restData.classNameList;  
                    this.classList = classList;                         
                    // 取得有設定班別的核算員清單
                    accountingList = response.restData.accountingDispatchVoList;                                       
                    this.accountingList = accountingList;                                       
               } else {
                MessageService.showError(response.restData.message);           
               }
           },
               (error) => {                 
                   MessageService.showSystemError();
                   console.log(error);
               }
           );
    
           
        },

        // Action: 分派(操作人為核算課長)
        updateUndispatch(actionType){
            // Vin參數
            // seq: this.seq  // 待核算table的流水號
            // className: this.className,
            // accouting: this.selectEmp.empNo,                              
            let accounting = null;
            if(this.selectEmp != null){
                accounting = this.selectEmp.accounting;
            }
            let DispatchFormsReq = {
                seq: this.seq,
                accounting: accounting,
                className: this.className
            };            
            AjaxService.post('/undispatch/submitDispatchForm',DispatchFormsReq,
           (response) => {
               if (response && response.restData && response.restData.success) {                    
                    MessageService.showSuccess('案件分派成功'); 
                    // 重新查詢一次未分派案件
                    this.queryUndispatchInit();                 
               } else {
                MessageService.showError(response.restData.message);        
               }
           },
               (error) => {                  
                   MessageService.showSystemError();
                   console.log(error);
               }
           );

           this.dispatchModel = false;

            // 如為分派案件
            // if(actionType === 'dispatch'){
            //     if (this.selectIndex > -1) {
            //         this.unDispatchList.splice(this.selectIndex, 1);
            //         this.numOfUndispatch = this.numOfUndispatch -1;
            //     }
            //     this.dispatchModel = false;
            //     MessageService.showSuccess("案件分派");

            // // 如為認領案件
            // } else {
            //     if (this.selectIndex > -1) {
            //         this.unDispatchList.splice(this.selectIndex, 1);
            //         this.numOfUndispatch = this.numOfUndispatch -1;
            //     }
            //     MessageService.showSuccess("案件認領");
            // }
            

        },


        //Action:認領案件(核算課員)
        claimUndispatch(){            
            let ClaimUnDispatchReq = {
                seq: this.seq,                               
            };            
            AjaxService.post('/undispatch/claimUnDispatch',ClaimUnDispatchReq,
           (response) => {
               if (response && response.restData && response.restData.success)
                    {                    
                    if(response.restData.canClaimForm){
                        MessageService.showSuccess('案件認領成功');
                        // 重新查詢一次未分派案件
                        this.queryUndispatchInit();                  
                    }
                    else{
                        MessageService.showInfo('無核算班別排班資料，不可認領案件');
                    }                 
               } else {
                MessageService.showError(response.restData.message);       
               }
           },
               (error) => { // server 出錯才會進入
                   // server error                   
                   MessageService.showSystemError();
                   console.log(error);
               }
           );
        },
        

        /* 
         * 
         * Ajax End
         * 
        */


        /** 
         * 
         * 驗證 Start
         * 
        */
        validVal(){
            let isValid = true;

            if(ValidateUtil.isEmpty(this.className) && ValidateUtil.isEmpty(this.selectEmp)){
                this.errMsg = '請選擇班別或核算員';
                this.requiredArray.push('班別或核算員');
                isValid = false;
            } else {
                this.errMsg = null;
            }

            return isValid;
        }

        /* 
         * 
         * 驗證 End
         * 
        */
    }
}