
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default{
    components: {
        formPage,
    },
    beforeMount() { // 在這裡做初始化, 勿刪
        this.init();
    },
    data(){
        return{
            //預設受理類型按鈕
            displayAll: true,
            //預設當前頁數
            formListPage: 1,
            //預設總頁數
            formListPageCount: 0,
            formListHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '電號', value: 'eletricNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '計算日', value: 'computedDate', align: 'center' },
                { text: '案件狀態', value: 'status', align: 'center' },     
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '代理案件', value: 'isAgent', align: 'center' },
                { text: '代理件所有人', value: 'acceptUser', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            // 先放假資料
            numberOfAccept: 4,
            numberOfAgent:1, 
            oriFormList:[], // 原始資料
            formList: [],
            selectIndex: null,
            selectItem:{},
            browserModel: false, // 瀏覽案件視窗開關
            supplementModel: false, // 補件操作視窗開關
            formHistoryModel: false, // 表單歷程視窗開關
            formHistoryList:[],

        }
    },
    methods: {
        init(){            
            this.queryFormInit();
        },
        action(type,item){
            this.selectItem = item;
            // 抓出選的是第幾筆
            this.selectIndex = this.formList.indexOf(item);            
            this.queryFormInfo();
            if(type == 'browse'){
                this.browserModel = true;
            } else if(type == 'supplement'){
                this.supplementModel = true;
            }
            
        },
        checkSubmit(){
            this.browserModel = false;
        },
        orderRecord(item){
            console.log(item);
        },
        saveFile(){
            this.supplementModel = false;
        },
        // 開啟
        openFormHistory(item){
            this.formHistoryList = item.formHistoryList;
            this.formHistoryModel = true;
        },

        // 顯示全部/只顯示受理件
        display(item){
            this.formList = [];
            if(item === 'all'){
                this.displayAll = true;
                this.formList = JSON.parse(JSON.stringify(this.oriFormList));
            } else {
                this.displayAll = false;
                for(let i in this.oriFormList){
                    if(this.oriFormList[i].isAgent){
                        this.formList.push(this.oriFormList[i]);
                    }
                }
            }
        },

        /**
         * 
         * Ajax start 
         * 
         * */

        // Action:頁面初始化
        queryFormInit(){
            let formList = [                
                { 
                    seq:1,
                    acceptNum: 'A00024',
                    custName: '劉艷艷',
                    eletricNum:'000123',
                    contractType:'包制',
                    computedDate:'10', 
                    acceptDate: '2021-09-10 10:00', 
                    status:'受理中',
                    acceptItem:'QA210軍眷用電申請優待',
                    isAgent:true,acceptUser:'王大明',
                    formHistoryList:[
                        '2021-09-14 14:20:14 待歸檔 (0151230020 吳靜)',
                        '2021-09-14 14:20:14 審核通過 (0151230020 吳靜)',
                        '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
                        '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',
                    ],
                },
                { 
                    seq:12,
                    acceptNum: 'A00615',
                    custName: '劉齊民',
                    eletricNum:'000123',
                    contractType:'包制',
                    computedDate:'12',
                    acceptDate: '2021-09-09 11:21',
                    status:'受理中',  
                    acceptItem:'I0510故障換表', 
                    isAgent:'',
                    acceptUser:'',
                    formHistoryList:[
                        '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
                        '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',
                    ],
                },
                {               
                    seq:27,      
                    acceptNum: 'A00605',
                    custName: '王筱涵',
                    eletricNum:'000123',
                    contractType:'包制',
                    computedDate:'10',
                    acceptDate: '2021-09-10 09:45',
                    status:'受理中',
                    acceptItem:'F3030表燈非時間電價停用廢止', 
                    isAgent:'',
                    acceptUser:'',
                    formHistoryList:[
                        '2021-09-14 14:20:14 待歸檔 (0151230020 吳靜)',
                        '2021-09-14 14:20:14 審核通過 (0151230020 吳靜)',
                        '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
                        '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',
                    ],
                },
                { 
                    seq:34,
                    acceptNum: 'A00619',
                    custName: '連文彥',
                    eletricNum:'000123',
                    contractType:'包制',
                    computedDate:'16',
                    acceptDate: '2021-09-10 13:44',
                    status:'受理中', 
                    acceptItem:'I0510故障換表', 
                    isAgent:'',
                    acceptUser:'',
                    formHistoryList:[
                        '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',
                    ],
                },
            ];

            let numberOfAccept = 4;
            let numberOfAgent = 1;

            this.formList = formList;
            this.numberOfAccept = numberOfAccept;
            this.numberOfAgent = numberOfAgent;
            // 從後端取得案件清單，先複製一份，先暫時放init，之後會移到ajax打後端後取得資料直接複製
            this.oriFormList = JSON.parse(JSON.stringify(this.formList));
        },


        // Action:取得表單資料
        queryFormInfo(){
            // Vin 參數
            // seq: this.selectItem.seq,  // 表單流水號

        },

        // Action:儲存表單資料
        updateFormInfo(){
            // Vin 參數
            // seq: this.selectItem.seq,  // 表單流水號
            
            MessageService.showSuccess('資料補件');
        },




        /**
         * 
         * Ajax end 
         * 
         * */
    },
}