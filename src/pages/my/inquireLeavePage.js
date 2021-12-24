import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from "@/assets/services/ajax.service";


export default {
    name: 'LeaveDetail',
    props: {
    
    },
    mounted() {
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

            empApplicationInfo: {}, //要傳到後端的代理申請資料,
            alert:{
                overTwoTiers: false,
                overTwoTiersMsg: null,
                isAgentLeave: false,
                isAgentLeaveMsg: null,
                agentOverTwice: false,
                agentOverTwiceMsg: null,
            }
            
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
        // 變更請假代理起日
        changeStartDate(){
            if(this.startDate != '' && this.startHour != '' && this.startMin != ''){
                this.leaveStartDate = this.startDate +' '+ this.startHour +':'+ this.startMin+':00'; // 組合開始日期
            }
        },
        // 變更請假代理迄日
        changeEndDate(){
            if(this.endDate != '' && this.endHour != '' && this.endMin != ''){
                this.leaveEndDate = this.endDate +' '+ this.endHour +':'+ this.endMin+':00'; // 組合開始日期
            }
        },
        // 更改請假人時，將對應到的代理人帶入
        changeEmp(){
            this.agentList = [];
            for(let i in this.empList){
                // 如果選到的請假員工為主管
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
                // 若選到的請假員工為一般員工，需先排除同一筆資料，再去比對部門是否相同，因員工請假代理人也可選擇部門主管，故此處僅比對部門是否相同
                } else {
                    if(this.empList[i].empNo !== this.selectEmp.empNo
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

        // 點擊代理申請按鈕
        submit(){
            this.requiredArray = [];
            this.formatArray = [];

            if(!this.validInput()){
                MessageService.showCheckInfo(this.requiredArray,this.formatArray);
            } else {
                // 整理代理申請資料
                this.empApplicationInfo.applicant = this.selectEmp.empNo;
                this.empApplicationInfo.applicantName = this.selectEmp.empName;
                this.empApplicationInfo.agent = this.selectAgent.empNo;
                this.empApplicationInfo.agentName = this.selectAgent.empName;
                this.empApplicationInfo.startDate = this.leaveStartDate;
                this.empApplicationInfo.endDate = this.leaveEndDate;

                // 將資料送進後端
                this.createAgentLeave();
                
            }
        },

        // 驗證請假人
        checkEmp(){
            let hasCheck = true;
            
            // 將可請假名單整理成map
            let oriEmpMap = new Map();
            for(let i in this.oriEmpList){
                oriEmpMap.set(this.oriEmpList[i].empNo,this.oriEmpList[i]);
            }

            // 判斷是否沒有選擇請假人
            if(ValidateUtil.isEmpty(this.selectEmp)){
                hasCheck = false;
                this.requiredArray.push('請假人');
                this.errMsg.selectEmp = '請選擇請假人';
            } else {
                this.errMsg.selectEmp = null;
            }

            // 判斷選擇的請假人是否有在後端來的資料當中
            if(ValidateUtil.isEmpty(oriEmpMap.get(this.selectEmp.empNo))){
                hasCheck = false;
                this.formatArray.push('請假人');
                this.errMsg.selectEmp = '請假人不在可設定清單中';
            } else {
                this.errMsg.selectEmp = null;
            }

            return hasCheck;
        },
        // 驗證代理人
        checkAgent(){
            let hasCheck = true;             
            // 將可請假名單整理成map
            let oriEmpMap = new Map();
            for(let i in this.oriEmpList){
                oriEmpMap.set(this.oriEmpList[i].empNo,this.oriEmpList[i]);
            }

            if(ValidateUtil.isEmpty(this.selectAgent)){
                hasCheck = false;
                this.requiredArray.push('代理人');
                this.errMsg.selectAgent = '請選擇代理人';
            } else {
                this.errMsg.selectAgent = null;
            }

            // 判斷選擇的代理人是否有在後端來的資料當中
            if(ValidateUtil.isEmpty(oriEmpMap.get(this.selectAgent.empNo))){
                hasCheck = false;
                this.formatArray.push('代理人');
                this.errMsg.selectAgent = '代理人不在可設定清單中';
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

        openAlertNotice(type){
            if(type == 'overTwoTiersAgent'){
                this.alert.overTwoTiersMsg = "該員工在該請假範圍已代理超過兩層員工的請假申請";
                this.alert.overTwoTiers = true;
            } else if(type == 'isAgentLeave'){
                this.alert.isAgentLeaveMsg = "目前所選擇的代理人在該請假範圍有請假紀錄，建議改選其他代理人";
                this.alert.isAgentLeave = true;
            } else {
                this.alert.agentOverTwiceMsg = "目前所選擇的代理人在該請假範圍中已代理超過兩位員工，建議改選其他代理人";
                this.alert.agentOverTwice = true;
            }
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
                console.log('============response.restData start============');
                console.log(response.restData);
                console.log('============response.restData end============')
                console.log('============empList start============');
                console.log(this.empList);
                console.log('============empList end============')
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
        createAgentLeave(){
            AjaxService.post('/inquireLeave/createAgentLeave',
            {
                empApplicationInfo: this.empApplicationInfo,
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'申請請假代理');
                    return;
                }

                // 判斷請假人在該請假範圍已有代理申請紀錄
                if(response.restData.hasLeaveRecord){
                    MessageService.showNoticeInfo('請假人在該請假區間已有代理請假紀錄，請重新選擇');
                    return;
                }

                // 判斷該代理員工平行代理超過兩位員工
                if(response.restData.hasAgentOverTwice){
                    this.openAlertNotice('agentOverTwice');
                }
                
                // 判斷該員工是否超過兩層代理
                if(response.restData.hasOverTwoTiersAgent){
                    this.openAlertNotice('overTwoTiersAgent');
                }

                // 判斷該代理員工是否在請假範圍也有請假紀錄
                if(response.restData.isAgentLeave){
                    this.openAlertNotice('isAgentLeave');
                }
    
                // 將取得的資料放進前端參數中    
                MessageService.showSuccess('申請請假代理');
                this.queryLeaveInit();
                this.resetVal();
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });

        },


        /** 
         * 
         * Ajax end
         * 
        */
    }
}