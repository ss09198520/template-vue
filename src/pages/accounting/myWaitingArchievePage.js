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
                        response.restData.initWaitArchiveListVo.forEach((element) => {
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
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );

            let archieveList = [
                { formSeq:1, acceptNum: 'A00024', electricNum: '70121212',archieveNum: '000300',custName: '余文文', acceptItem: '軍眷用電申請優待', action: true},
                { formSeq:2, acceptNum: 'A00615', electricNum: '70121234',archieveNum: '000301',custName: '陳詩宇',acceptItem: '故障換表'},
                { formSeq:3, acceptNum: 'A00040', electricNum: '70121223',archieveNum: '000302',custName: '林文向',acceptItem: '增加電表', action: true},
                { formSeq:4, acceptNum: 'A00605', electricNum: '70121223',archieveNum: '000303',custName: '許霏霏',acceptItem: '表燈非時間電價停用廢止', action: true},
                { formSeq:5, acceptNum: 'A00619', electricNum: '701212124',archieveNum: '000304',custName: '成庭宇',acceptItem: '故障換表'}
            ];


            // 取得待歸檔件數
            let numOfArchieve = 5;

            this.numOfArchieve = numOfArchieve;

            this.archieveList = archieveList;
        },

        // Action:依條件查詢待歸檔清單
        queryArchieveList(){
            // Vin
            // acceptNum: this.acceptNum,
            // electricNum: this.electricNum,
            // archieveNum: this.archieveNum,
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
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
                }
            );


            // 依條件取得待歸檔資料
            let archieveList = [
                { formSeq:1, acceptNum: 'A00024', electricNum: '70121212',archieveNum: '000300',custName: '余文文', acceptItem: '軍眷用電申請優待', action: true},
                { formSeq:2, acceptNum: 'A00615', electricNum: '70121234',archieveNum: '000301',custName: '陳詩宇',acceptItem: '故障換表'},
                { formSeq:3, acceptNum: 'A00040', electricNum: '70121223',archieveNum: '000302',custName: '林文向',acceptItem: '增加電表', action: true},
                { formSeq:4, acceptNum: 'A00605', electricNum: '70121223',archieveNum: '000303',custName: '許霏霏',acceptItem: '表燈非時間電價停用廢止', action: true},
                { formSeq:5, acceptNum: 'A00619', electricNum: '701212124',archieveNum: '000304',custName: '成庭宇',acceptItem: '故障換表'}
            ];
            // 取得待歸檔件數
            let numOfArchieve = 5;

            this.numOfArchieve = numOfArchieve;
            this.archieveList = archieveList;
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
                    console.log(response.rtnCode);
                    MessageService.showSystemError(response.rtnCode);
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