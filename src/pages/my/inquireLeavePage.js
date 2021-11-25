import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from "@/assets/services/ajax.service";

export default {
    name: 'LeaveDetail',
    props: {
    
    },
    beforeMount() {
        this.init();
    },
   
    data() {
        return {
            empList: [],
            oriEmpList:[], // 備份的員工清單
            agentList:[],               
            startDateMenu: false,
            startDate: '',
            endDateMenu: false,
            endDate: '',
            startHour: null,            
            startMin:null,
            endHour: null,            
            endMin:null,
            hourOption:[],
            minOption:[],
            leaveStartDate:null,
            leaveEndDate: null,
            sysDate: new Date().toISOString().slice(0, 10),
            // 員工請假資料
            empInfo:{
                status:'請假中',
                agent:'1050334015',
                agentName:'王大明',
                nextLeaveStartDate:'2021-10-12 08:00',
                nextLeaveEndDate:'2021-10-12 18:00',
                nextAgent:'1050334018',
                nextAgentName:'趙元智',
            },
            selectEmp:null,
            selectAgent: null,
            errMsg:{
                selectEmp:null,
                selectAgent: null,
                selectDate: null,
            },
            requiredArray:[],
            formatArray:[],
            hasMgmtAuth: false,
            
        }
    },
    
    methods: {
        init(){
            this.defaultDate();
            this.queryLeaveInit();
        },

        // 預設日期
        defaultDate(){
            let index = 7;
            for(index; index < 21; index++ ){
                if(index.toString().length == 1){
                    this.hourOption.push('0'+index.toString());
                } else {
                    this.hourOption.push(index.toString());
                }
            }
            let i = 0;
            for(i;i < 60; i++){
                if(i.toString().length == 1){
                    this.minOption.push('0'+i.toString());
                } else {
                    this.minOption.push(i.toString());
                }
                i=i+4;
            }
        },
        changeStartDate(){
            if(this.startDate != '' && this.startHour != '' && this.startMin != ''){
                this.leaveStartDate = this.startDate +' '+ this.startHour +':'+ this.startMin+':00'; // 組合開始日期
            }
        },
        changeEndDate(){
            if(this.endDate != '' && this.endHour != '' && this.endMin != ''){
                this.leaveEndDate = this.endDate +' '+ this.endHour +':'+ this.endMin+':00'; // 組合開始日期
            }
        },
        // 更改請假人時，將對應到的代理人帶入
        changeEmp(){
            this.agentList = [];
            for(let i in this.empList){
                if(this.selectEmp.isMgmt === this.empList[i].isMgmt 
                    && this.empList[i].empNo !== this.selectEmp.empNo){

                    this.agentList.push({                            
                        empNo:this.empList[i].empNo,                        
                        empName:this.empList[i].empName,
                        isMgmt:this.empList[i].isMgmt,
                        dept:this.empList[i].dept,
                        deptName: this.empList[i].deptName,
                    })            
                } 

                if(this.selectEmp.isMgmt){
                    if(this.selectEmp.isMgmt === this.empList[i].isMgmt 
                        && this.empList[i].empNo !== this.selectEmp.empNo){
    
                        this.agentList.push({                            
                            empNo:this.empList[i].empNo,                        
                            empName:this.empList[i].empName,
                            isMgmt:this.empList[i].isMgmt,
                            dept:this.empList[i].dept,
                            deptName: this.empList[i].deptName,
                        })            
                    } 

                } else {
                    if(this.selectEmp.isMgmt === this.empList[i].isMgmt 
                        && this.empList[i].empNo !== this.selectEmp.empNo
                        && this.empList[i].dept === this.selectEmp.dept){    
                        this.agentList.push({                            
                            empNo:this.empList[i].empNo,                        
                            empName:this.empList[i].empName,
                            isMgmt:this.empList[i].isMgmt,
                            dept:this.empList[i].dept,
                            deptName: this.empList[i].deptName,
                        })            
                    } 
                }
            }

            // 驗證員工
            this.checkEmp();
        },

        submit(){
            this.requiredArray = [];
            this.formatArray = [];

            if(!this.validInput()){
                MessageService.showCheckInfo(this.requiredArray,this.formatArray);
            } else {
                this.createLeave();
                this.resetVal();
            }
        },

        // 驗證請假人
        checkEmp(){
            let hasCheck = true;

            if(ValidateUtil.isEmpty(this.selectEmp)){
                hasCheck = false;
                this.requiredArray.push('請假人');
                this.errMsg.selectEmp = '請選擇請假人';
            } else {
                this.errMsg.selectEmp = null;
            }

            return hasCheck;
        },
        // 驗證代理人
        checkAgent(){
            let hasCheck = true;

            if(ValidateUtil.isEmpty(this.selectAgent)){
                hasCheck = false;
                this.requiredArray.push('代理人');
                this.errMsg.selectAgent = '請選擇代理人';
            } else {
                this.errMsg.selectAgent = null;
            }

            return hasCheck;
        },
        // 驗證日期範圍
        checkDate(){
            let hasCheck = true;
            let startDate = new Date(this.leaveStartDate);
            let sysDate = new Date();

            // 代理日期起訖日是否有值
            if(ValidateUtil.isEmpty(this.leaveStartDate) || ValidateUtil.isEmpty(this.leaveEndDate)){
                hasCheck = false;
                this.requiredArray.push('請假起迄日期');
                this.errMsg.selectDate = "請選擇請假日期範圍";

            // 代理日期起訖日有值，是否符合日期範圍及日期格式驗證
            } else if(!ValidateUtil.validateDateRange(this.leaveStartDate,this.leaveEndDate)){
                hasCheck = false;
                this.formatArray.push('請假起迄日期範圍');
                this.errMsg.selectDate = "請重新確認請假日期範圍";
            // 代理日期起日是否大於系統日期
            } else if(startDate < sysDate){
                hasCheck = false;
                this.formatArray.push('請假起迄日期範圍');
                this.errMsg.selectDate = "請假起日時間已過，請重新選擇";
            } else {
                this.errMsg.selectDate = null;
            }
            return hasCheck;
        },

        // 最後驗證
        validInput(){            
            let hasCheck = true;
            
            // 驗證請假人
            if(!this.checkEmp()){
                hasCheck = false;
            } 
            // 驗證代理人
            if(!this.checkAgent()){
                hasCheck = false;
            }
            // 驗證日期範圍格式
            if(!this.checkDate()){
                hasCheck = false;
            }

            return hasCheck;
        },

        // 清空輸入資料
        resetVal(){
            this.selectEmp = null;
            this.selectAgent = null;
            this.leaveStartDate = null;
            this.leaveEndDate = null;
            this.startDate = null;
            this.startHour = null;
            this.startMin = null;
            this.endDate = null;
            this.endHour = null;
            this.endMin = null;
        },

        /** 
         * 
         * Ajax start
         * 
        */

        // Action: 代理申請初始化資料
        queryLeaveInit(){
            AjaxService.post('/inquireLeave/queryInquireLeaveInit',{},
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.resultMessage.returnMessage,'代理申請初始化資料');
                    return;
                }
    
                // 將取得的資料放進前端參數中
                this.empList = response.restData.empList;
                this.empInfo = response.restData.empInfo;
                this.hasMgmtAuth = response.restData.hasMgmtAuth;
                this.oriEmpList = JSON.parse(JSON.stringify(this.empList));
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });


        },

        // Action: 申請請假代理
        createLeave(){
            // vin
            // empNo: this.selectEmp.empNo,
            // empName: this.selectEmp.empNo,
            // agent: this.selectAgent.agent,
            // agentName: this.selectAgent.agentName,
            // startDate: this.leaveStartDate,
            // endDate: this.leaveEndDate,
            // oriEmpList: this.oriEmpList,

            MessageService.showSuccess('申請請假代理');


        },


        /** 
         * 
         * Ajax end
         * 
        */
    }
}