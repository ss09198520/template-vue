import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
// import AjaxService from "@/assets/services/ajax.service";

export default {
    data(){
        return{
            //預設當前頁數
            inquireListPage: 1,
            //預設總頁數
            inquireListPageCount: 0,
            //彈出簽核視窗與否
            popOut: false,
            //預設簽核顯示範圍按鈕
            displayAll: true,
            //
           signListHeaders: [            
               { text: '受理號碼', value: 'acceptNum', align: 'center' },
               { text: '戶名', value: 'custName', align: 'center' },
               { text: '電號', value: 'electricNum', align: 'center' },
               { text: '調閱部門', value: 'readDept', align: 'center' },            
               { text: '申請調閱人員', value: 'applierName', align: 'center' },
               { text: '申請調閱日期', value: 'applyDate', align: 'center' },
               { text: '整理號碼', value: 'archieveNum', align: 'center' },
               { text: '受理項目', value: 'acceptItem', align: 'center' },                
               { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            signList:[
                { mani: true, acceptNum: 'A00024', custName: '虞仁彥', electricNum:'7140000123', readDept:'南屯服務所', applier:'申請人的姓名代號', applierName:'王大明', applyDate:'2021-09-15 10:00',archieveNum:'APR0370',acceptItem:'QA210軍眷用電申請優待', readReason:'客戶來要求查詢當時申請項目', readNum:'07110001', level:'1', signer:'簽核人一號'},
                { mani: true, acceptNum: 'A00615', custName: '陳新宇', electricNum:'7140000456', readDept:'烏日服務所', applier:'申請人的姓名代號', applierName:'李小凡', applyDate:'2021-09-15 11:21',archieveNum:'APR0200',acceptItem:'I0510故障換表', readReason:'調閱原因一', readNum:'18110032', level:'1', signer:'簽核人二號'},
                { mani: true, acceptNum: 'A00040', custName: '劉芳維', electricNum:'7140000789', readDept:'大里服務所', applier:'申請人的姓名代號', applierName:'葉星辰', applyDate:'2021-09-15 15:36',archieveNum:'APR0200',acceptItem:'I0520增加電表', readReason:'調閱原因二', readNum:'62114301', level:'1', signer:'簽核人三號'},
                { mani: true, acceptNum: 'A00605', custName: '辰馨馨', electricNum:'7140000888', readDept:'太平服務所', applier:'申請人的姓名代號', applierName:'趙元智', applyDate:'2021-09-15 09:45',archieveNum:'APR0160',acceptItem:'F3030表燈非時間電價停用廢止', readReason:'調閱原因三', readNum:'45360001', level:'1', signer:'簽核人四號'},
                { mani: true, acceptNum: 'A00619', custName: '賀文仲', electricNum:'7140000999', readDept:'服務中心', applier:'申請人的姓名代號', applierName:'陳立元', applyDate:'2021-09-15 13:44',archieveNum:'APR0200',acceptItem:'I0510故障換表', readReason:'調閱原因四', readNum:'33185731', level:'1', signer:'簽核人五號'},
            ],
            selectedSign: '', //選擇要操作的該筆調閱簽核
            returnReasonModel: false,
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ],
        }
    },
    methods:{
        init(){
            //initialSignList();
        },

        initialSignList(){
            //callAPI
            // AjaxService.post('/ECPAP/SYSAPI/CustApproveController/queryCustApply.action',
            // {
            //            
            // },
            // (response) => {
            //     if (response != null &&
            //         response != undefined &&
            //         response.resultMessage != null &&
            //         response.resultMessage != undefined &&
            //         response.resultMessage.message == 's') {
            //         if (ValidateUtil.isEmpty(response.custAccountBeanList)) {
            //             MessageService.showInfo('查無資料');
            //             
            //         } else {                    
            //             this.signList = Object.assign(response.signList);
            //             response.signList.forEach((e, idx) => {
            //                 this.signList[idx].mani = true;
            //             });                                                
            //         }
            //     } else {
            //       //接後端候要放errorMsg
            //       //MessageService.showError('查詢審核帳號申請清單 失敗');
            //     }
            // },
            //     (response) => { // server 出錯才會進入
            //         // server error
            //         //MessageService.showSystemError();
            //     }
            // );
        },
        
        sign(item){
            this.selectedSign = item;
            this.popOut = true;
        },

        checkOrder(){                        
            //callAPI
            // AjaxService.post('/ECPAP/SYSAPI/CustApproveController/queryCustApply.action',
            // {
            //     readNum: this.selectedSign.readNum,
            //     signer: this.selectedSign.signer,
            //     signerName: this.selectedSign.signerName,
            //     level: this.selectedSign.level,
            // },
            // (response) => {
            //     if (response != null &&
            //         response != undefined &&
            //         response.resultMessage != null &&
            //         response.resultMessage != undefined &&
            //         response.resultMessage.message == 's') {
            //         if (ValidateUtil.isEmpty(response.custAccountBeanList)) {
            //             MessageService.showInfo('查無資料');
            //             this.resultForm = true;
            //         } else {                    
            //                                               
            //         }
            //     } else {
            //       //接後端候要放errorMsg
            //       //MessageService.showError('查詢審核帳號申請清單 失敗');
            //     }
            // },
            //     (response) => { // server 出錯才會進入
            //         // server error
            //         //MessageService.showSystemError();
            //     }
            // );            
            MessageService.showSuccess("簽核成功✓")
            this.popOut = false;
        },

        returnOrder(){
            this.returnReasonModel = true;
        },

        returnSubmit(){
            // 驗證
            if (ValidateUtil.isEmpty(this.selectedSign.rejectReason)) {
                MessageService.showCheckInfo(['退件原因'],'');
                return;
            }
            // //callAPI
            // AjaxService.post('/ECPAP/SYSAPI/CustApproveController/queryCustApply.action',
            // {
            //     readNum: this.selectedSign.readNum,
            //     signer: this.selectedSign.signer,
            //     signerName: this.selectedSign.signerName,
            //     rejectReason: this.selectedSign.rejectReason,
            //     rejectDesc: this.selectedSign.rejectDesc,
            // },
            // (response) => {
            //     if (response != null &&
            //         response != undefined &&
            //         response.resultMessage != null &&
            //         response.resultMessage != undefined &&
            //         response.resultMessage.message == 's') {                                      
            //             console.log('退件成功'+response);                                     
            //     } else {
            //       //接後端候要放errorMsg
            //       //MessageService.showError('查詢審核帳號申請清單 失敗');
            //     }
            // },
            //     (response) => { // server 出錯才會進入
            //         // server error
            //         console.log(response);//到時候要刪掉
            //         MessageService.showSystemError();
            //     }
            // );

            this.popOut = false;
            this.returnReasonModel = false;
            MessageService.showSuccess("已退件成功✓")
        }
    },
}
