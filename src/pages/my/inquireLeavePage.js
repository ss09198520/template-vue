import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

export default {
    name: 'LeaveDetail',
    props: {
    
    },
    beforeMount() {
        this.init();
    },
   
    data() {
        return {
            empOpt : [
                {empNo:'015212001', empName:'王大維',type:'mgmt',dept:'業務組'},
                {empNo:'015213001', empName:'林文琪',type:'mgmt',dept:'東山服務所'},
                {empNo:'015214001', empName:'張佑臻',type:'mgmt',dept:'大里服務中心'},
                {empNo:'015214020', empName:'許家騏',type:'emp',dept:'大里服務中心'},
                {empNo:'015214021', empName:'連映菲',type:'emp',dept:'大里服務中心'},                
            ],
            agentOpt:[],               
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
            finalStartDate:null,
            finalEndDate: null,
            sysDate: new Date().toISOString().slice(0, 10),
            // 員工請假資料先放假資料
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
            
        }
    },
    
    methods: {
        init(){
            this.defaultDate();
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
                this.finalStartDate = this.startDate +' '+ this.startHour +':'+ this.startMin+':00'; // 組合開始日期
            }
        },
        changeEndDate(){
            if(this.endDate != '' && this.endHour != '' && this.endMin != ''){
                this.finalEndDate = this.endDate +' '+ this.endHour +':'+ this.endMin+':00'; // 組合開始日期
            }
        },
        // 更改請假人時，將對應到的代理人帶入
        changeEmp(){
            this.agentOpt = [];
            for(let i in this.empOpt){
                if(this.selectEmp.type === this.empOpt[i].type && this.empOpt[i].empNo !== this.selectEmp.empNo){
                    this.agentOpt.push({
                        empNo:this.empOpt[i].empNo,
                        empName:this.empOpt[i].empName,
                        type:this.empOpt[i].type,
                        dept:this.empOpt[i].dept,
                    })
                }                
            }

            // 驗證員工
            this.checkEmp();
        },

        submit(){
            if(this.validInput()){
                MessageService.showSuccess('申請請假代理');
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
            let startDate = new Date(this.finalStartDate);
            let sysDate = new Date();

            // 代理日期起訖日是否有值
            if(ValidateUtil.isEmpty(this.finalStartDate) || ValidateUtil.isEmpty(this.finalEndDate)){
                hasCheck = false;
                this.requiredArray.push('請假起迄日期');
                this.errMsg.selectDate = "請選擇請假日期範圍";

            // 代理日期起訖日有值，是否符合日期範圍及日期格式驗證
            } else if(!ValidateUtil.validateDateRange(this.finalStartDate,this.finalEndDate)){
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
            this.requiredArray = [];
            this.formatArray = [];
            
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

            if(!hasCheck){
                MessageService.showCheckInfo(this.requiredArray,this.formatArray);                
            } 

            return hasCheck;
        },

        // 清空輸入資料
        resetVal(){
            this.selectEmp = null;
            this.selectAgent = null;
            this.finalStartDate = null;
            this.finalEndDate = null;
            this.startDate = null;
            this.startHour = null;
            this.startMin = null;
            this.endDate = null;
            this.endHour = null;
            this.endMin = null;
        }
    }
}