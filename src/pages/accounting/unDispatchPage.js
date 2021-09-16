import MessageService from "@/assets/services/message.service";


export default {
    name: 'UnDispatch',
    props: {
    
    },
    beforeMount() {
        this.init();
      },
    data() {
        return {
            waitingCount: 4,
            unDispatchHeaders: [
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '電號', value: 'electricNo', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'completeDate', align: 'center' },
                { text: '登記單種類', value: 'category', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            unDispatchList: [
                {action: true, acceptNumber: 'A00028',contractType:'包制',electricNo:'0120123223', acceptDate: '20210910 10:00', completeDate: '20210910 16:00', category: 'APR0370', acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00040', contractType:'高壓',electricNo:'012012321',acceptDate: '20210907 15:36', completeDate: '20210908 15:06', category: 'APR0200', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605', contractType:'表制',electricNo:'0120123222',acceptDate: '20210910 09:45', completeDate: '20210915 10:50', category: 'APR0160', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619', contractType:'包制',electricNo:'0120123225',acceptDate: '20210910 13:44', completeDate: '20210910 15:26', category: 'APR0200', acceptItem: 'I0510  故障換表'}
            ],
            // 頁數
            unDispatchListPageCount:1,
            unDispatchListPage:1,

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
            selectIndex: null,
            //操作者角色
            User: 'manager',

        }
    },
    methods: {
        init(){
            
        },
        // 判斷點擊哪個按鈕
        action(actionType,item){
            this.selectIndex = this.unDispatchList.indexOf(item);
            if(actionType == 'takeAway'){
                if (this.selectIndex > -1) {
                    this.unDispatchList.splice(this.selectIndex, 1);
                    this.waitingCount = this.waitingCount -1;
                  }
                MessageService.showSuccess("案件認領成功✓");
            } else{
                this.classType = null;
                this.selectEmp = null;
                this.dispatchModel = true;
            }
        },
       
        submit(){
            if (this.selectIndex > -1) {
                this.unDispatchList.splice(this.selectIndex, 1);
                this.waitingCount = this.waitingCount -1;
              }
            MessageService.showSuccess("案件分派成功✓");
            this.dispatchModel = false;
        },

        // 分派視窗-二則一選擇即可，若點選另一個則將原本的選擇的清掉
        change(type){
            if(type == 'classType'){
                this.selectEmp = null;
            } else {
                this.classType = null;
            }
        }
    }
}