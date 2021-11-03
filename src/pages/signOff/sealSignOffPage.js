import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default {
    components:{
        formPage,
    },
    name: 'SealSignOff',
    props: {
    
    },
    data() {
        return {
             //預設簽核顯示範圍按鈕
             displayAll: true,
             //控制清單示全部or待簽核
             waitToSign: '待簽核',
             sealSignListHeaders:[
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '案件狀態', value: 'sealStatus', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },                                                                            
                { text: '專用章檔案下載', value: 'download', align: 'center' },    
                { text: '狀態操作', value: 'mani', align: 'center' }
             ],
             sealSignList:[
                 {status:false, sealStatus:'待簽核', acceptNum:'A00349', acceptDate: '2021-09-10 10:00', electricNum:'7140000123', acceptItem:'QA210軍眷用電申請優待', custName:'劉艷艷', contractType:'包制', computeDate:'01', seq:'流水號', formSeq:'主表流水號'},
                 {status:false, sealStatus:'待簽核', acceptNum:'A00389', acceptDate: '2021-09-08 10:00', electricNum:'7140000128', acceptItem:'I0510故障換表', custName:'陳艷均', contractType:'包制', computeDate:'12', seq:'流水號', formSeq:'主表流水號'},
                 {status:true, sealStatus:'套印完成', acceptNum:'A00389', acceptDate: '2021-09-08 10:00', electricNum:'7140000128', acceptItem:'I0510故障換表', custName:'連文彥', contractType:'包制', computeDate:'10', seq:'流水號', formSeq:'主表流水號'},
                ],
             sealSignListPageCount:0,
             sealSignListPage:1,
             browserModel: false, // 瀏覽案件視窗開關  
             sealOffFinish: false, //控制簽核前後瀏覽表單附件內容
             formParam: {},
        }
    },
    methods: {
        display(){
            this.displayAll = true;
            this.waitToSign = '';
        },        

        displayWaitToSign(){
            this.displayAll = false;
            this.waitToSign = '待簽核';
        },
        
        sign(item){
            console.log(item);
            let index = this.sealSignList.indexOf(item);
            this.sealSignList[index].inquireStatus = '套印完成';
            this.sealSignList[index].status = true;            
            MessageService.showSuccess("簽核成功✓");
        },
        action(type,item){
            // 抓出選的是第幾筆                       
            this.selectIndex = this.sealSignList.indexOf(item);

            // 帶入受理編號
            this.formParam = {
                acceptNum: item.acceptNum
            };

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
    }
}