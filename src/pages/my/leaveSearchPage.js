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
            this.selectIndex = this.leaveList.indexOf(item);
            this.deleteLeaveModel = true;
            this.selectOne = item;
            
        },
        submit(){
            if (this.selectIndex > -1) {
                this.leaveList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("刪除代理申請紀錄");
            this.deleteLeaveModel = false;
            if(this.selectOne.dataSource == '差假管理系統'){
                this.alertModel = true;
            }
        },
        search(){
            this.leaveList = [
                //台中區處
                { seq:1, empNo: '1050330-001', empName: '梁朝偉', startDate:'2021-09-10 08:00',endDate:'2021-09-11 17:00', agent:'1050331-001', agentName:'蔡政揚', dataSource:'差假管理系統'},
                { seq:2, empNo: '1050330-002', empName: '王曉花', startDate:'2021-09-10 08:00',endDate:'2021-09-11 17:00', agent:'1050330-002', agentName:'王曉花', dataSource:'差假管理系統'},
                { seq:3, empNo: '1050330-003', empName: '林美美', startDate:'2021-09-11 08:00',endDate:'2021-09-12 17:00', agent:'1050330-001', agentName:'梁朝偉', dataSource:'人工設定'},
                { seq:4, empNo: '1050331-001', empName: '蔡政揚', startDate:'2021-09-14 08:00',endDate:'2021-09-14 17:00', agent:'1050330-001', agentName:'梁朝偉', dataSource:'差假管理系統'},
                { seq:5, empNo: '1050331-002', empName: '張芊芊', startDate:'2021-09-12 08:00',endDate:'2021-09-12 17:00', agent:'1050331-003', agentName:'江舒語', dataSource:'人工設定'},
                { seq:6, empNo: '1050331-003', empName: '江舒語', startDate:'2021-09-29 08:00',endDate:'2021-09-29 12:00', agent:'1050331-002', agentName:'張芊芊', dataSource:'差假管理系統'},
                { seq:7, empNo: '1050331-003', empName: '江舒語', startDate:'2021-11-28 08:00',endDate:'2021-11-28 17:00', agent:'1050331-002', agentName:'張芊芊', dataSource:'差假管理系統'},
            ];
        }
    }  
}