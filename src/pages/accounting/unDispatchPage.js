export default {
    name: 'UnDispatch',
    props: {
    
    },
    beforeMount() {
        this.init();
      },
    data() {
        return {
            waitingCount: 5,
            unDispatchHeaders: [
                { text: '狀態操作', value: 'action', align: 'center' },
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'completeDate', align: 'center' },
                { text: '登記單種類', value: 'category', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' }
            ],
            unDispatchList: [
                {action: true, acceptNumber: 'A00028', acceptDate: '20210910 10:00', completeDate: '20210910 16:00', category: 'APR0370', acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00615', acceptDate: '20210909 11:21', completeDate: '20210909 15:21', category: 'APR0200', acceptItem: 'I0510  故障換表'},
                {action: true, acceptNumber: 'A00040', acceptDate: '20210907 15:36', completeDate: '20210908 15:06', category: 'APR0200', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605', acceptDate: '20210910 09:45', completeDate: '20210915 10:50', category: 'APR0160', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619', acceptDate: '20210910 13:44', completeDate: '20210910 15:26', category: 'APR0200', acceptItem: 'I0510  故障換表'}
            ],
            // 頁數
            unDispatchListPageCount:1,
            unDispatchListPage:1,

            takeAwayModel: false,
            dispatchModel: false,

            classType:null,
            classTypeOption:[
                { text: '班別1', value: '1'},
                { text: '班別2', value: '2'},
                { text: '班別3', value: '3'},
                { text: '班別4', value: '4'},
                { text: '班別5', value: '5'},
                { text: '班別6', value: '6'},
                { text: '班別7', value: '7'},
                { text: '班別8', value: '8'},
                { text: '班別9', value: '9'},
                { text: '班別10', value: '10'},


            ],
            selectEmp:null,
            empListOption:[
                { text: '吳小花', value: '1'},
                { text: '王霏霏', value: '2'},
                { text: '王小林', value: '3'},
                { text: '林小飛', value: '4'},
                { text: '林旺成', value: '5'},
                { text: '徐彥豔', value: '6'},
                { text: '羅徐生', value: '7'},
                { text: '連靜菲', value: '8'},
                { text: '潘麗麗', value: '9'},
                { text: '陳小慶', value: '10'},
            ],

        }
    },
    methods: {
        init(){

        },
        action(actionType){
            if(actionType == 'takeAway'){
                this.takeAwayModel = true;
            } else{
                this.classType = null;
                this.selectEmp = null;
                this.dispatchModel = true;
            }
        },
       
        submit(type){
            if(type=='dispatch'){
                this.dispatchModel = false;
            } else {
                this.takeAwayModel = false;
            }
        },

        change(type){
            if(type == 'classType'){
                this.selectEmp = null;
            } else {
                this.classType = null;
            }
        }
    }
}