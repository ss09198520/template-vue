import MessageService from "@/assets/services/message.service";

export default{
    beforeMount() {
        this.init();
      },
    data(){
        return{
            empListHeaders: [
                { text: '姓名代號', value: 'empId', align: 'center' },
                { text: '員工姓名', value: 'empName', align: 'center' },
                { text: '休假期間', value: 'empLeave', align: 'center' },
                { text: '代理人姓名代號', value: 'agentId', align: 'center' },            
                { text: '代理人姓名', value: 'agentName', align: 'center' },
                { text: '資料來源', value: 'leaveDataFrom', align: 'center' },
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            empList: [
            
            ],
            // empMockList: [
                // //台中區處
                // { mani:'123', empId: '1050330-001', empName: '梁朝偉', empLeave:'2021/09/10 08:00-2021/09/11 17:00', agentId:'1050331-001', agentName:'蔡政揚', leaveStyle:'病假',leaveDataFrom:'HR帶入'},
                // { mani:'123', empId: '1050330-002', empName: '王曉花', empLeave:'2021/09/10 08:00-2021/09/11 17:00', agentId:'1050330-002', agentName:'王曉花', leaveStyle:'特休',leaveDataFrom:'系統輸入'},
                // { mani:'123', empId: '1050330-003', empName: '林美美', empLeave:'2021/09/09 08:00-2021/09/11 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveStyle:'特休',leaveDataFrom:'HR帶入'},
                // { mani:'123', empId: '1050331-001', empName: '蔡政揚', empLeave:'2021/09/09 08:00-2021/09/10 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveStyle:'事假',leaveDataFrom:'HR帶入'},
                // { mani:'123', empId: '1050331-002', empName: '張芊芊', empLeave:'2021/09/06 08:00-2021/09/08 17:00', agentId:'1050331-003', agentName:'江舒語', leaveStyle:'公假',leaveDataFrom:'系統輸入'},
                // { mani:'123', empId: '1050331-003', empName: '江舒語', empLeave:'2021/09/01 08:00-2021/09/04 17:00', agentId:'1050331-002', agentName:'張芊芊', leaveStyle:'喪假',leaveDataFrom:'系統輸入'},
            // ],
            empMockList:null,
            leaveWay:null,
            leaveWayOption:[
                { text: '差假管理系統', value: '1' },
                { text: '人工設定', value: '2' },
            ],
            menu1: false,
            date1: '',
            menu2: false,
            date2: '',
            empListPageCount:0,
            empListPage:1,
            deleteLeaveModel:false, // 控制刪除請假視窗的開關
            selectIndex:null,
            selectOne: null,
            alertModel: false,
            sysDate: new Date(),
        }
    },
    methods:{
        init(){
            
        },
        deleteLeave(item){
            this.selectIndex = this.empMockList.indexOf(item);
            this.deleteLeaveModel = true;
            this.selectOne = item;
            
        },
        submit(){
            if (this.selectIndex > -1) {
                this.empMockList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("刪除代理申請紀錄");
            this.deleteLeaveModel = false;
            if(this.selectOne.leaveDataFrom == '差假管理系統'){
                this.alertModel = true;
            }
        },
        search(){
            this.empMockList = [
                //台中區處
                { mani:'123', empId: '1050330-001', empName: '梁朝偉', startDate:'2021/09/10 08:00',endDate:'2021/09/11 17:00', agentId:'1050331-001', agentName:'蔡政揚',leaveDataFrom:'差假管理系統'},
                { mani:'123', empId: '1050330-002', empName: '王曉花', startDate:'2021/09/10 08:00',endDate:'2021/09/11 17:00', agentId:'1050330-002', agentName:'王曉花', leaveDataFrom:'差假管理系統'},
                { mani:'123', empId: '1050330-003', empName: '林美美', startDate:'2021/09/11 08:00',endDate:'2021/09/12 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveDataFrom:'人工設定'},
                { mani:'123', empId: '1050331-001', empName: '蔡政揚', startDate:'2021/09/14 08:00',endDate:'2021/09/14 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveDataFrom:'差假管理系統'},
                { mani:'123', empId: '1050331-002', empName: '張芊芊', startDate:'2021/09/12 08:00',endDate:'2021/09/12 17:00', agentId:'1050331-003', agentName:'江舒語', leaveDataFrom:'人工設定'},
                { mani:'123', empId: '1050331-003', empName: '江舒語', startDate:'2021/09/29 08:00',endDate:'2021/09/29 12:00', agentId:'1050331-002', agentName:'張芊芊', leaveDataFrom:'差假管理系統'},
                { mani:'123', empId: '1050331-003', empName: '江舒語', startDate:'2021/11/28 08:00',endDate:'2021/11/28 17:00', agentId:'1050331-002', agentName:'張芊芊', leaveDataFrom:'差假管理系統'},
            ];
        }
    }  
}