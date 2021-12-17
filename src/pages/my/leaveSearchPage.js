import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from "@/assets/services/ajax.service";

export default{
    beforeMount() {
        this.init();
      },
    data(){
        return{
            leaveListHeaders: [
                { text: '姓名代號', value: 'applicant', align: 'center' },
                { text: '員工姓名', value: 'applicantName', align: 'center' },
                { text: '休假期間', value: 'leaveDate', align: 'center' },
                { text: '代理人姓名代號', value: 'agent', align: 'center' },            
                { text: '代理人姓名', value: 'agentName', align: 'center' },
                { text: '資料來源', value: 'dataSource', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            leaveList: [],
            dataSource:null,
            dataSourceList:[
                { text: '差假管理系統', value: 'A' },
                { text: '人工設定', value: 'M' },
            ],
            menu1: false,
            menu2: false,
            leaveDate:{
                start: null,
                end: null,
            },
            leaveListPageCount:0,
            leaveListPage:1,
            deleteLeaveModel:false, // 控制刪除請假視窗的開關
            editModel: false,       // 控制修改代理申請視窗開關
            selectIndex:null,
            selectItem: {},
            alertModel: false,
            sysDate: new Date(),
            selectAgent:{},
            oriAgentList:[],
            agentList:[],
            isCancel: false, // 判斷是刪除or修改提醒
            alertMsg: null,  // 提醒訊息內容
            alertOverTwoTiers: false,
            formatArray:[],
            errMsg:null,
            empNo: null,
            empName: null,
            agent: null,
            agentName: null,
            leaveStartDate: null,
            leaveEndDate:null,

        }
    },
    methods:{
        init(){
            this.queryLeaveList();
        },
        deleteLeave(item){
            this.selectIndex = this.leaveList.indexOf(item);
            this.deleteLeaveModel = true;
            this.selectItem = item;
            
        },
        openEditModel(item){
            this.agentList = [];
            this.selectItem = item;
            this.queryAgentOptionList();
            this.selectAgent.empNo = item.agent;
            this.selectAgent.empName = item.agentName;
            // for(let i in this.oriAgentList) {
            //     if(item.isMgmn){
            //         if(this.oriAgentList[i].isMgmn){
            //             this.agentList.push(this.oriAgentList[i]);
            //         } 
            //     } else {
            //         if(!this.oriAgentList[i].isMgmn){
            //             this.agentList.push(this.oriAgentList[i]);
            //         } 
            //     }
               
            // }
            this.editModel = true;
        },
        submit(type){
            if(type === 'edit') {
                // 比對是否有修改代理人，若有則更新資料打後端
                this.updateAgent();             

            } else {
                if (this.selectIndex > -1) {
                    this.leaveList.splice(this.selectIndex, 1);
                  }
                MessageService.showSuccess("刪除代理申請紀錄");
                this.deleteLeaveModel = false;
                if(this.selectItem.dataSource == '差假管理系統'){
                    this.alertModel = true;
                    this.isCancel = true;
                    this.alertMsg = '已成功刪除請假紀錄，請記得到差假管理系統辦理銷假，謝謝';
                }
            }
        },
        search(){
            this.formatArray = [];
            // 先過驗證再將篩選條件打後端取資料
            if(!this.checkDate()){
                MessageService.showCheckInfo(null,this.formatArray);
            } else {
                // 查詢請假清單
                this.queryLeaveList();
            }
        },

        // 清空日期欄位 obj為哪種日期類別,name為開始日期or結束日期
        resetDate(obj,name){
            this[obj][name] = null;
            this.checkDate();
        },

        /**
         *           
         * Ajax start
         * 
         **/

         queryAgentOptionList(){
            AjaxService.post('/leaveListController/queryAgentOptionList', {}, 
            (response) => {
                if(response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                ){
                    this.oriAgentList = response.restData.empInfoVoList;
                }
            },
            (error) => {

            });
        },

        // Action: 依條件查詢請代理請假清單
        queryLeaveList(){
            let dataSource = (this.dataSource != null && this.dataSource != undefined)? this.dataSource.value : null;

            AjaxService.post('/leaveListController/queryLeaveAgentInfoList',
            {
                applicant: this.empNo,
                applicantName: this.empName,
                agent: this.agent,
                agentName: this.agentName,
                dataSource: dataSource,
                startDate: this.leaveDate.start,
                endDate: this.leaveDate.end
            },
            (response) => {
                if (response != null &&
                    response != undefined &&                    
                    response.restData.message != null &&
                    response.restData.message != undefined &&
                    response.restData.success
                    ) {
                    if (ValidateUtil.isEmpty(response.restData.agentApplicationVoList)) {                        
                        MessageService.showInfo('查無資料');
                    } else {                                                                                                                                            
                        this.leaveList = response.restData.agentApplicationVoList;
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

            MessageService.showSuccess('查詢請假清單');
        },

        // Action: 修改代理申請
        updateAgent(){
            // Vin 參數
            // seq: this.selectItem.seq,
            // agent: this.selectAgent.empNo,
            // agentName: this.selectAgent.empName,
            // oriAgentList:this.oriAgentList,        
            // 另需把原本的agentList回傳到後端比對
        
            MessageService.showSuccess('修改代理申請');   // ajax成功 
            this.editModel = false; // 關閉修改視窗
            
            // 後端回傳值判斷該員工是否在同一個時間代理超過兩位員工的請假申請? 若為true 則跳提醒視窗
            // 模擬後端資料
            let isDuplicate = true;        // 是否代理超過兩位員工
            let isOverTwoTiers = true;     // 該員工是否代理超過兩層
         
            
            // 若同一個時間超過兩個人都給同一人代理
            if(isDuplicate){
                this.alertModel = true;
                this.isCancel = false;
                this.alertMsg = '該員工已代理超過兩位員工的請假申請';
            }
            // 若同一個時間員工代理超過兩層
            if(isOverTwoTiers){
                this.alertOverTwoTiers = true;
            }         

        },


        // Action: 刪除代理申請
        deleteAgentApply(){
            // vin參數
            // seq: 
        },


         /**
         *           
         * Ajax end
         * 
         **/


        /**
         *           
         * 驗證 start
         * 
         **/


         // 驗證日期區間
        checkDate(){
            this.formatArray = [];
            let hasCheck = true;
            
            // 1-1判斷日期起迄日是否都有
            if(!ValidateUtil.isEmpty(this.leaveDate.start) && !ValidateUtil.isEmpty(this.leaveDate.end)){
                this.leaveStartDate = this.leaveDate.start + ' 00:00:00';
                this.leaveEndDate = this.leaveDate.end + ' 23:59:59';
                
                if(!ValidateUtil.validateDateRange(this.leaveStartDate,this.leaveEndDate)){
                    this.errMsg = '日期區間範圍錯誤'
                    this.formatArray.push('日期區間');
                    hasCheck = false;
                } else {
                    this.errMsg = null;
                }
            // 1-2 判斷受理日期起迄日只有其中一欄有選擇日期 
            } else if(!ValidateUtil.isEmpty(this.leaveDate.start) || !ValidateUtil.isEmpty(this.leaveDate.end)){
                this.errMsg = "日期區間未選擇完整範圍";
                this.formatArray.push('日期區間'); 
                hasCheck = false;

            // 1-3 判斷受理日期起訖日欄位皆未選擇
            } else {
                this.errMsg = null;
            }

            return hasCheck;
        },

        /**
         *           
         * 驗證 end
         * 
         **/


    }  
}