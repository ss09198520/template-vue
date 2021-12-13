import MessageService from "@/assets/services/message.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service';

export default {
    name: 'MyWaitingAccounting',
    props: {
    
    },
    beforeMount(){
        this.init();
    },
    data() {
        return {
            returnModel: false,
            headers: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '整理號碼', value: 'archiveNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },               
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' },
            ],
            archieveList: [],
            showMyArchieve: false,
            showAllArchieve: true,
            dataListPage: 1,
            dataListPageCount: 1,
            hasShowList:false,
            acceptNum: null,
            electricNum: null,
            archieveNum: null,
            seq: null,
            formSeq: null,
            accnting: null,
            numOfArchieve: 0,
        }
    },
    methods: {
        init(){
            this.queryArchieveInit();
        },
        returnToAccounting(item){
            console.log("每日跑批次給NCPS前退回核算");
            this.formSeq = item.formSeq;
            this.seq = item.seq;
            this.accnting = item.accnting;
            this.returnModel = true;
        },

        /** 
         *  Ajax Start
         * 
         * 
        */

        // Action:查詢初始化
        queryArchieveInit(){
            // 取得所有待歸檔資料
                        
            AjaxService.post('/waitArchive/init',
            {
                       
            },
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {
                    if (ValidateUtil.isEmpty(response.restData.initWaitArchiveListVo)) {                        
                        MessageService.showInfo('查無資料');
                    } else {
                        console.log(response);
                        this.archieveList = Object.assign(response.restData.initWaitArchiveListVo);                        
                        this.numOfArchieve = this.archieveList.length;        
                        response.restData.initWaitArchiveListVo.forEach((element) => {                             
                            let createHours = parseInt(new Date().getTime() - Date.parse(element.createDate)) / 1000 / 60 / 60; 
                            console.log(createHours);                                                      
                            if(createHours <= 4){
                                element.action = true;
                            }                            
                        });    
                    }
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
        },

        // Action:依條件查詢待歸檔清單
        queryArchieveList(){
            const QueryWaitArchiveReq = {
                acceptNum: this.acceptNum,
                electricNum: this.electricNum,
                archiveNum: this.archieveNum
            };
            AjaxService.post('/waitArchive/queryWaitArchive',QueryWaitArchiveReq,
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {
                    if (ValidateUtil.isEmpty(response.restData.queryWaitArchiveListVo)) {                        
                        MessageService.showInfo('查無資料');
                    } else {           
                        console.log(response);                                                             
                        this.archieveList = Object.assign(response.restData.queryWaitArchiveListVo);                        
                        response.restData.queryWaitArchiveListVo.forEach((element) => {
                            element.action = true;
                        });                                                                                       
                    }
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error                    
                    MessageService.showSystemError(response.restData.code);
                }
            );

        },

        // Action:將案件返回核算
        returnForm(){
            // Vin參數
            // formSeq: this.formSeq,
            
            const ReturnToWaitAccountingReq ={
                seq: this.seq,
                formSeq: this.formSeq,
                accounting: this.accnting,
            };
            AjaxService.post('/waitArchive/returnToWaitAccounting',ReturnToWaitAccountingReq,
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {
                    
                        MessageService.showSuccess('返回核算成功');
                        this.queryArchieveList();
                } else {
                  //接後端候要放errorMsg
                  //MessageService.showError('查詢審核帳號申請清單 失敗');                  
                }
            },
                (response) => { // server 出錯才會進入
                    // server error
                    MessageService.showSystemError(response.restData.code);
                }
            );

            
            this.returnModel = false;

        },       



        /** 
         *  Ajax End
         * 
         * 
        */

    }
}