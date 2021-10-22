import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";


export default {
    name: 'UnDispatch',
    props: {
    
    },
    beforeMount() {
        this.init();
    },
    data() {
        return {
            numOfUndispatch: 4,
            unDispatchHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '整理號碼', value: 'archieveNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'colseDate', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            unDispatchList: [],
            // 頁數
            unDispatchListPageCount:1,
            unDispatchListPage:1,

            dispatchModel: false,

            className:null,
            classList:[],
            selectEmp:null,
            accountingList:[],
            selectIndex: null,
            //操作者角色
            User: 'manager',
            formSeq: null,
            seq: null,
            requiredArray:[],
            errMsg: null,

        }
    },
    methods: {
        init(){
            this.queryUndispatchInit();
            this.queryUndispatchOption();
        },
        // 判斷點擊哪個按鈕
        action(actionType,item){
            this.selectIndex = this.unDispatchList.indexOf(item); // 取出第幾筆
            this.formSeq = item.formSeq;
            this.seq = item.seq;

            if(actionType === 'dispatch'){
                this.className = null;
                this.selectEmp = null;
                this.dispatchModel = true;
            } else {
                this.updateUndispatch(actionType);
            }
        },
       // 送出分派案件
        submit(){
            this.requiredArray = [];
            if(!this.validVal()){
                MessageService.showCheckInfo(this.requiredArray,null);
                return;
            } else {
                this.updateUndispatch('dispatch');
            } 
        },

        // 分派視窗-二則一選擇即可，若點選另一個則將原本的選擇的清掉
        change(type){
            if(type == 'className'){
                this.selectEmp = null;
            } else {
                this.className = null;
            }
        },

        /** 
         * 
         * Ajax Start
         * 
        */

        // Action:頁面初始化
        queryUndispatchInit(){
            // 取得未分派清單資料
           let unDispatchList = [
                {seq:1 ,formSeq: 1, action: true, acceptNum: 'A00028',archieveNum: '000201', custName: '許小花',contractType:'包制',electricNum:'0120123223', countDate: '01', computeDate: '2021-09-10 10:00', colseDate: '2021-09-10 16:00', acceptItem: 'QA210  軍眷用電申請優待'},
                {seq:2, formSeq: 2, action: true, acceptNum: 'A00040',archieveNum: '000202', custName: '陳文生',contractType:'高壓',electricNum:'012012321',countDate: '05', computeDate: '2021-09-07 15:36', colseDate: '2021-09-08 15:06', acceptItem: 'I0520  增加電表'},
                {seq:3, formSeq: 3, action: true, acceptNum: 'A00605',archieveNum: '000203', custName: '連瑜千',contractType:'表制',electricNum:'0120123222',countDate: '10', computeDate: '2021-09-10 09:45', colseDate: '2021-09-15 10:50', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {seq:4, formSeq: 4, action: true, acceptNum: 'A00619',archieveNum: '000204', custName: '辰文興',contractType:'包制',electricNum:'0120123225',countDate: '12', computeDate: '2021-09-10 13:44', colseDate: '2021-09-10 15:26', acceptItem: 'I0510  故障換表'}
            ];

            this.unDispatchList = unDispatchList;
        },

        // Action: 取得下拉選單 (操作人為核算課長)
        queryUndispatchOption(){
           // 取得班別資料
           let classList = ['班別1','班別2','班別3','班別4','班別5','班別6','班別7'];
           // 取得有設定班別的核算員清單
           let accountingList = [
            { empName: '吳小花', empNo: '1000111'},
            { empName: '王霏霏', empNo: '1000112'},
            { empName: '王小林', empNo: '1000114'},
            { empName: '林小飛', empNo: '1000135'},
            { empName: '林旺成', empNo: '1000113'},
            { empName: '徐彥豔', empNo: '1000116'},
            { empName: '羅徐生', empNo: '1000117'},
            { empName: '連靜菲', empNo: '1000118'},
            { empName: '潘麗麗', empNo: '1000119'},
            { empName: '陳小慶', empNo: '1000132'},
        ];
           this.accountingList = accountingList;
           this.classList = classList;
        },

        // Action: 分派(操作人為核算課長)/認領案件(核算課員)
        updateUndispatch(actionType){
            // Vin參數
            // seq: this.seq  // 待核算table的流水號
            // className: this.className,
            // accouting: this.selectEmp.empNo,

            // 如為分派案件
            if(actionType === 'dispatch'){
                if (this.selectIndex > -1) {
                    this.unDispatchList.splice(this.selectIndex, 1);
                    this.numOfUndispatch = this.numOfUndispatch -1;
                }
                this.dispatchModel = false;
                MessageService.showSuccess("案件分派");

            // 如為認領案件
            } else {
                if (this.selectIndex > -1) {
                    this.unDispatchList.splice(this.selectIndex, 1);
                    this.numOfUndispatch = this.numOfUndispatch -1;
                }
                MessageService.showSuccess("案件認領");
            }
            

        },
        

        /* 
         * 
         * Ajax End
         * 
        */


        /** 
         * 
         * 驗證 Start
         * 
        */
        validVal(){
            let isValid = true;

            if(ValidateUtil.isEmpty(this.className) && ValidateUtil.isEmpty(this.selectEmp)){
                this.errMsg = '請選擇班別或核算員';
                this.requiredArray.push('班別或核算員');
                isValid = false;
            } else {
                this.errMsg = null;
            }

            return isValid;
        }

        /* 
         * 
         * 驗證 End
         * 
        */
    }
}