import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default {
    components:{
        formPage,
    },
    name: 'SealSignOff',
    props: {
    
    },
    mounted() {
        this.init();
    },
    data() {
        return {
             //預設簽核顯示範圍按鈕
             displayAll: true,
             sealSignListHeaders:[
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '卡別', value: 'contractType', align: 'center' },
                { text: '受理日期', value: 'acceptDateStr', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '案件狀態', value: 'sealStatus', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },                                                                            
                { text: '專用章檔案下載', value: 'download', align: 'center' },    
                { text: '狀態操作', value: 'mani', align: 'center' }
             ],
             sealSignList:[],
             allSignOffList:[],
             waitSignOffList:[],
             sealSignListPageCount:0,
             sealSignListPage:1,
             browserModel: false, // 瀏覽案件視窗開關  
             sealOffFinish: false, //控制簽核前後瀏覽表單附件內容
             formParam: {},
             formKey: 0,
        }
    },
    methods: {
        init() {
            this.querySignOff();
        },
        querySignOff() {
            AjaxService.post("/seal/querySealSignOff", {}, (response) => {
                if(response.restData.success) {
                    this.allSignOffList = response.restData.signOffList;
                    this.waitSignOffList = response.restData.waitSignOffList;
                    this.sealSignList = this.displayAll? this.allSignOffList : this.waitSignOffList;
                    // MessageService.showSuccess("取得專用章簽核列表");
                }else{
                    MessageService.showError(response.restData.message, "取得專用章簽核列表");
                }
            });
        },
        display(){
            this.displayAll = true;
            this.sealSignList = this.allSignOffList;
        },        

        displayWaitToSign(){
            this.displayAll = false;
            this.sealSignList = this.waitSignOffList;
        },
        action(type,item){
            // 抓出選的是第幾筆                       
            this.selectIndex = this.sealSignList.indexOf(item);

            // 帶入受理編號
            this.formParam = {
                FM_NO: item.acceptNum
            };
            this.formKey++;

            if(type=='delete'){
                this.deleteOrderModel = true;
            } else if(type == 'browse'){
                this.browserModel = true;
            } else if(type == 'supplement'){
                this.supplementModel = true;
            }     
            if(item.inquireStatus == '套印完成'){
                this.sealOffFinish = true;                                
            }else{
                this.sealOffFinish = false;                
            }               
        },
        checkSubmit(){
            this.browserModel = false;
        },
        signOff(acceptNum){
            let param = {
                acceptNum: acceptNum
            };

            AjaxService.post("/seal/sealSignOff", param, (response) => {
                if(response.restData.success){
                    MessageService.showSuccess("簽核");
                    this.querySignOff();
                }else{
                    MessageService.showError(response.restData.message, "簽核");
                }
            });
        },
        download(acceptNum){
            let param = {
                acceptNum: acceptNum
            };

            AjaxService.postFile("/seal/downloadSealedFile", param, 
                (response) => {
                    if(response.restData.success){
                        MessageService.showSuccess("下載");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}