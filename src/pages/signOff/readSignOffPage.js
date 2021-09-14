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
                { text: '狀態操作', value: 'mani', align: 'center' },
                { text: '調閱狀態', value: 'inquireStatus', align: 'center' },
                { text: '受理編號', value: 'orderId', align: 'center' },
                { text: '電號', value: 'electNum', align: 'center' },
                { text: '調閱單位', value: 'inquireUnit', align: 'center' },            
                { text: '申請調閱人員', value: 'inquireName', align: 'center' },
                { text: '調閱日期', value: 'inquireDate', align: 'center' },
                { text: '登記單種類', value: 'orderType', align: 'center' },
                { text: '受理項目', value: 'orderItems', align: 'center' },                
            ],
            signList:[
                { mani: true, inquireStatus: '申請人主管已簽核', orderId: 'A00024', electNum:'7140000123', inquireUnit:'南屯服務所', inquireName:'王大明', inquireDate:'20210915 10:00',orderType:'APR0370',orderItems:'QA210軍眷用電申請優待'},
                { mani: true, inquireStatus: '未簽核', orderId: 'A00615', electNum:'7140000456', inquireUnit:'烏日服務所', inquireName:'李小凡', inquireDate:'20210915 11:21',orderType:'APR0200',orderItems:'I0510故障換表'},
                { mani: true, inquireStatus: '未簽核', orderId: 'A00040', electNum:'7140000789', inquireUnit:'大里服務所', inquireName:'葉星辰', inquireDate:'20210915 15:36',orderType:'APR0200',orderItems:'I0520增加電表'},
                { mani: true, inquireStatus: '申請人主管已簽核', orderId: 'A00605', electNum:'7140000888', inquireUnit:'太平服務所', inquireName:'趙元智', inquireDate:'20210915 09:45',orderType:'APR0160',orderItems:'F3030表燈非時間電價停用廢止'},
                { mani: false, inquireStatus: '簽核完畢', orderId: 'A00619', electNum:'7140000999', inquireUnit:'服務中心', inquireName:'陳立元', inquireDate:'20210915 13:44',orderType:'APR0200',orderItems:'I0510故障換表'},
            ],
        }
    },
    methods:{
        sign(){
            this.popOut = true;
        },
    },
}
