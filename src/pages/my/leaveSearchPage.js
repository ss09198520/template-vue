import MessageService from "@/assets/services/message.service";

export default{
    beforeMount() {
        this.init();
      },
    data(){
        return{
            empListHeaders: [
                { text: '狀態操作', value: 'mani', align: 'center' },
                { text: '員工編號', value: 'empId', align: 'center' },
                { text: '員工姓名', value: 'empName', align: 'center' },
                { text: '休假期間', value: 'empLeave', align: 'center' },
                { text: '代理人編號', value: 'agentId', align: 'center' },            
                { text: '代理人姓名', value: 'agentName', align: 'center' },
                { text: '假別', value: 'leaveStyle', align: 'center' },
                { text: 'HR帶入/系統輸入', value: 'leaveDataFrom', align: 'center' },
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
                { text: 'HR帶入', value: '1' },
                { text: '系統輸入', value: '2' },
            ],
            menu1: false,
            date1: '',
            menu2: false,
            date2: '',
            empListPageCount:0,
            empListPage:1,
            deleteLeaveModel:false, // 控制刪除請假視窗的開關
            selectIndex:null,
           
        }
    },
    methods:{
        init(){
            
        },
        deleteLeave(item){
            this.selectIndex = this.empMockList.indexOf(item);
            this.deleteLeaveModel = true;
            
        },
        submit(){
            if (this.selectIndex > -1) {
                this.empMockList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("刪除請假成功✓");
            this.deleteLeaveModel = false;
        },
        search(){
            this.empMockList = [
                //台中區處
                { mani:'123', empId: '1050330-001', empName: '梁朝偉', empLeave:'2021/09/10 08:00-2021/09/11 17:00', agentId:'1050331-001', agentName:'蔡政揚', leaveStyle:'病假',leaveDataFrom:'HR帶入'},
                { mani:'123', empId: '1050330-002', empName: '王曉花', empLeave:'2021/09/10 08:00-2021/09/11 17:00', agentId:'1050330-002', agentName:'王曉花', leaveStyle:'特休',leaveDataFrom:'系統輸入'},
                { mani:'123', empId: '1050330-003', empName: '林美美', empLeave:'2021/09/09 08:00-2021/09/11 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveStyle:'特休',leaveDataFrom:'HR帶入'},
                { mani:'123', empId: '1050331-001', empName: '蔡政揚', empLeave:'2021/09/09 08:00-2021/09/10 17:00', agentId:'1050330-001', agentName:'梁朝偉', leaveStyle:'事假',leaveDataFrom:'HR帶入'},
                { mani:'123', empId: '1050331-002', empName: '張芊芊', empLeave:'2021/09/06 08:00-2021/09/08 17:00', agentId:'1050331-003', agentName:'江舒語', leaveStyle:'公假',leaveDataFrom:'系統輸入'},
                { mani:'123', empId: '1050331-003', empName: '江舒語', empLeave:'2021/09/01 08:00-2021/09/04 17:00', agentId:'1050331-002', agentName:'張芊芊', leaveStyle:'喪假',leaveDataFrom:'系統輸入'},
            ];
        }
    }  
}