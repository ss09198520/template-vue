import MessageService from "@/assets/services/message.service";

export default{
    beforeMount() {
        this.init();
      },
    data(){
        return{
            leaveListHeaders: [
                { text: '姓名代號', value: 'empNo', align: 'center' },
                { text: '員工姓名', value: 'empName', align: 'center' },
                { text: '休假期間', value: 'leaveDate', align: 'center' },
                { text: '代理人姓名代號', value: 'agent', align: 'center' },            
                { text: '代理人姓名', value: 'agentName', align: 'center' },
                { text: '資料來源', value: 'dataSource', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            leaveList: null,
            leaveWay:null,
            leaveWayOption:[
                { text: '差假管理系統', value: '1' },
                { text: '人工設定', value: '2' },
            ],
            menu1: false,
            date1: '',
            menu2: false,
            date2: '',
            leaveListPageCount:0,
            leaveListPage:1,
            deleteLeaveModel:false, // 控制刪除請假視窗的開關
            editModel: false,       // 控制修改代理申請視窗開關
            selectIndex:null,
            selectOne: {},
            alertModel: false,
            sysDate: new Date(),
            selectAgent:{},
            agentOpt:[
                {empNo:'015212001', empName:'王大維',type:'mgmt',dept:'業務組'},
                {empNo:'015213001', empName:'林文琪',type:'mgmt',dept:'東山服務所'},
                {empNo:'015214001', empName:'張佑臻',type:'mgmt',dept:'大里服務中心'},
                {empNo:'1050331-002', empName:'張芊芊',type:'mgmt',dept:'大里服務中心'},
                
            ],
            isCancel: false, // 判斷是刪除or修改提醒
            alertMsg: null,  // 提醒訊息內容
            alertOverTwoTiers: false,
            

        }
    },
    methods:{
        init(){
            
        },
        deleteLeave(item){
            this.selectIndex = this.leaveList.indexOf(item);
            this.deleteLeaveModel = true;
            this.selectOne = item;
            
        },
        openEditModel(item){
            console.log(item);
            this.selectOne = item;
            this.selectAgent.empNo = item.agent;
            this.selectAgent.empName = item.agentName;
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
                if(this.selectOne.dataSource == '差假管理系統'){
                    this.alertModel = true;
                    this.isCancel = true;
                    this.alertMsg = '已成功刪除請假紀錄，請記得到差假管理系統辦理銷假，謝謝';
                }
            }
        },
        search(){
            // 查詢請假清單
            this.queryLeaveList();
        },

        /**
         *           
         * Ajax start
         * 
         **/

        // Action: 依條件查詢請代理請假清單
        queryLeaveList(){
         // 模擬資料
         let leaveList = [
                //台中區處
                { seq:1, empNo: '1050330-001', empName: '梁朝偉', startDate:'2021-09-10 08:00',endDate:'2021-09-11 17:00', agent:'1050331-001', agentName:'蔡政揚', dataSource:'差假管理系統'},
                { seq:2, empNo: '1050330-002', empName: '王曉花', startDate:'2021-09-10 08:00',endDate:'2021-09-11 17:00', agent:'1050330-002', agentName:'王曉花', dataSource:'差假管理系統'},
                { seq:3, empNo: '1050330-003', empName: '林美美', startDate:'2021-09-11 08:00',endDate:'2021-09-12 17:00', agent:'1050330-001', agentName:'梁朝偉', dataSource:'人工設定'},
                { seq:4, empNo: '1050331-001', empName: '蔡政揚', startDate:'2021-09-14 08:00',endDate:'2021-09-14 17:00', agent:'1050330-001', agentName:'梁朝偉', dataSource:'差假管理系統'},
                { seq:5, empNo: '1050331-002', empName: '張芊芊', startDate:'2021-09-12 08:00',endDate:'2021-09-12 17:00', agent:'1050331-003', agentName:'江舒語', dataSource:'人工設定'},
                { seq:6, empNo: '1050331-003', empName: '江舒語', startDate:'2021-09-29 08:00',endDate:'2021-09-29 12:00', agent:'1050331-002', agentName:'張芊芊', dataSource:'差假管理系統'},
                { seq:7, empNo: '1050331-003', empName: '江舒語', startDate:'2021-11-28 08:00',endDate:'2021-11-28 17:00', agent:'1050331-002', agentName:'張芊芊', dataSource:'差假管理系統'},
            ];
         this.leaveList = leaveList;
        },

        // Action: 修改代理申請
        updateAgent(){
        
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

        },


         /**
         *           
         * Ajax start
         * 
         **/


    }  
}