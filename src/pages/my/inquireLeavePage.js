export default {
    name: 'LeaveDetail',
    props: {
    
    },
    data() {
        return {
            employeeList: ['王大明', '葉星辰', '辛吉德', '羅斯柴'],
            leaveTypeList: ['特休', '病假', '事假', '特定假別'],
            startDateMenu: false,
            startDate: '',
            endDateMenu: false,
            endDate: '',
            status: '請假中',
            agent: '代理人  1050334015 王大明',
            nextLeave: '2021/10/12 08:00 - 18:00',
            nextLeaveAgent: '1050334018	 趙元智'
        }
    },
    methods: {
        
    }
}