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
             sealSignListHeaders:[
                { text: '受理號碼', value: 'orderId', align: 'center' },
                { text: '戶名', value: 'accntName', align: 'center' },
                { text: '電號', value: 'electNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '受理日期', value: 'orderDate', align: 'center' },
                { text: '計算日', value: 'calDate', align: 'center' },
                { text: '案件狀態', value: 'inquireStatus', align: 'center' },
                { text: '受理項目', value: 'orderItems', align: 'center' },                                                                            
                { text: '專用章檔案下載', value: 'download', align: 'center' },    
                { text: '狀態操作', value: 'mani', align: 'center' }
             ],
             sealSignList:[
                 {status:false,inquireStatus:'待簽核',orderId:'A00349',orderDate: '20210910 10:00',electNum:'7140000123',orderType:'APR0370',orderItems:'QA210軍眷用電申請優待', accntName:'劉艷艷', contractType:'包制', calDate:'20210909 11:21'},
                 {status:false,inquireStatus:'待簽核',orderId:'A00389',orderDate: '20210908 10:00',electNum:'7140000128',orderType:'APR0200',orderItems:'I0510故障換表', accntName:'陳艷均', contractType:'包制', calDate:'20210909 11:21'},
                 {status:true,inquireStatus:'套印完成',orderId:'A00389',orderDate: '20210908 10:00',electNum:'7140000128',orderType:'APR0200',orderItems:'I0510故障換表', accntName:'連文彥', contractType:'包制', calDate:'20210909 11:21'},
                ],
             sealSignListPageCount:0,
             sealSignListPage:1,
             browserModel: false, // 瀏覽案件視窗開關  
             sealOffFinish: false, //控制簽核前後瀏覽表單附件內容                   
        }
    },
    methods: {
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