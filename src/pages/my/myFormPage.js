
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";
import AjaxService from "@/assets/services/ajax.service";
import ValidateUtil from "@/assets/services/validateUtil";

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
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '案件狀態', value: 'status', align: 'center' },     
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '代理案件', value: 'isAgent', align: 'center' },
                { text: '代理件所有人', value: 'agentAcceptUser', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            numberOfAccept: 0,
            numberOfAgent:0, 
            oriFormList:[], // 原始資料
            formList: [],
            selectIndex: null,
            selectItem:{},
            browserModel: false, // 瀏覽案件視窗開關
            supplementModel: false, // 補件操作視窗開關
            formHistoryModel: false, // 表單歷程視窗開關
            formHistoryList:[],
            formParam: {},
            formKey: 0,
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

            // 帶入受理編號
            this.formParam = {
                fmNo: item.acceptNum
            };
            this.formKey++;

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
                    if(this.oriFormList[i].isAgent === 'Y'){
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
            AjaxService.post('/tpesForm/queryMyFormInit',{},
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.resultMessage.returnMessage,'查詢我的表單初始資料');
                    return;
                }
                // 驗證formList是否有資料
                if(ValidateUtil.isEmpty(response.restData.formList) || response.restData.formList.length < 1 ){
                    MessageService.showInfo('查無相關資料');
                    return;
                }

                // 將取得的資料放進前端參數中
                this.formList = response.restData.formList;
                this.numberOfAccept = response.restData.numberOfAccept;
                this.numberOfAgent = response.restData.numberOfAgent;
                // 從後端取得案件清單，先複製一份，先暫時放init，之後會移到ajax打後端後取得資料直接複製
                this.oriFormList = JSON.parse(JSON.stringify(response.restData.formList));

            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
          
        },

        /**
         * 
         * Ajax end 
         * 
         * */
    },
}