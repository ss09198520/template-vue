export default {
    name: 'LeaveDetail',
    props: {
    
    },
    beforeMount() {
        this.init();
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
            nextLeave: '2021-10-12 08:00 ~ 2021-10-12 18:00',
            nextLeaveAgent: '1050334018	 趙元智',
            startHour: null,            
            startMin:null,
            endHour: null,            
            endMin:null,
            hourOption:[],
            minOption:[],
            finalStartDate:null,
            finalEndDate: null,
            sysDate: new Date().toISOString().slice(0, 10),
        }
    },
    
    methods: {
        init(){
            this.defaultDate();
        },

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
    }
}