import MessageService from "@/assets/services/message.service";
export default {
    data(){
        return{
            //預設當前頁數
            inquireListPage: 1,
            //預設總頁數
            inquireListPageCount: 0,
            //彈出簽核視窗與否
            popOut: false,
            //預設簽核顯示範圍按鈕
            displayAll: true,
            //
           signListHeaders: [
            // { text: '簽核狀態', value: 'inquireStatus', align: 'center' },
               { text: '受理號碼', value: 'orderId', align: 'center' },
               { text: '戶名', value: 'accntName', align: 'center' },
               { text: '電號', value: 'electNum', align: 'center' },
               { text: '調閱部門', value: 'inquireUnit', align: 'center' },            
               { text: '申請調閱人員', value: 'inquireName', align: 'center' },
               { text: '申請調閱日期', value: 'inquireDate', align: 'center' },
               { text: '整理號碼', value: 'orderType', align: 'center' },
               { text: '受理項目', value: 'orderItems', align: 'center' },                
               { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            signList:[
                { mani: true, inquireStatus: '未簽核', orderId: 'A00024', accntName: '虞仁彥',electNum:'7140000123', inquireUnit:'南屯服務所', inquireName:'王大明', inquireDate:'2021-09-15 10:00',orderType:'APR0370',orderItems:'QA210軍眷用電申請優待'},
                { mani: true, inquireStatus: '未簽核', orderId: 'A00615', electNum:'7140000456',accntName: '陳新宇', inquireUnit:'烏日服務所', inquireName:'李小凡', inquireDate:'2021-09-15 11:21',orderType:'APR0200',orderItems:'I0510故障換表'},
                { mani: true, inquireStatus: '未簽核', orderId: 'A00040', electNum:'7140000789', accntName: '劉芳維',inquireUnit:'大里服務所', inquireName:'葉星辰', inquireDate:'2021-09-15 15:36',orderType:'APR0200',orderItems:'I0520增加電表'},
                { mani: true, inquireStatus: '未簽核', orderId: 'A00605', electNum:'7140000888',accntName: '辰馨馨', inquireUnit:'太平服務所', inquireName:'趙元智', inquireDate:'2021-09-15 09:45',orderType:'APR0160',orderItems:'F3030表燈非時間電價停用廢止'},
                { mani: false, inquireStatus: '未簽核', orderId: 'A00619', electNum:'7140000999', accntName: '賀文仲',inquireUnit:'服務中心', inquireName:'陳立元', inquireDate:'2021-09-15 13:44',orderType:'APR0200',orderItems:'I0510故障換表'},
            ],
            returnReasonModel: false,
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ],
        }
    },
    methods:{
        sign(){
            this.popOut = true;
        },
        checkOrder(){
            MessageService.showSuccess("簽核成功✓")
            this.popOut = false;
        },
        returnOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
            this.popOut = false;
            this.returnReasonModel = false;
            MessageService.showSuccess("已退件成功✓")
        }
    },
}
