import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

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
               { text: '受理號碼', value: 'acceptNum', align: 'center' },
               { text: '戶名', value: 'custName', align: 'center' },
               { text: '電號', value: 'electricNum', align: 'center' },
               { text: '調閱部門', value: 'readDept', align: 'center' },            
               { text: '申請調閱人員', value: 'applier', align: 'center' },
               { text: '申請調閱日期', value: 'readDateStr', align: 'center' },
               { text: '整理號碼', value: 'archiveNum', align: 'center' },
               { text: '受理項目', value: 'acceptItem', align: 'center' },                
               { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            signList:[],
            selectedSign: '', //選擇要操作的該筆調閱簽核
            returnReasonModel: false,
            rejectReason: '',
            rejectDesc: ''
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            this.querySignOffList();
        },
        querySignOffList(){
            AjaxService.post("/read/querySignOff", {}, (response) => {
                if(response.restData.success){
                    // MessageService.showSuccess("取得簽核清單");
                    this.signList = response.restData.applyList;
                }else{
                    MessageService.showError(response.restData.message, "取得簽核清單");
                }
            });
        },
        sign(item){
            this.selectedSign = item;
            this.popOut = true;
        },
        checkOrder(){                        
            let param = {
                pass: true,
                readNum: this.selectedSign.readNum
            };
            
            AjaxService.post("/read/readSignOff", param, (response) => {
                if(response.restData.success){
                    MessageService.showSuccess('簽核成功');
                    // 重整頁面
                    this.querySignOffList();
                }else{
                    MessageService.showError(response.restData.message, '簽核');
                }
                this.popOut = false;
            });
        },
        returnOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
            // 驗證
            if (ValidateUtil.isEmpty(this.rejectReason)) {
                MessageService.showCheckInfo(['退件原因'],'');
                return;
            }

            let param = {
                pass: false,
                readNum: this.selectedSign.readNum,
                rejectReason: this.rejectReason,
                rejectDesc: this.rejectDesc
            };
            
            AjaxService.post("/read/readSignOff", param, (response) => {
                if(response.restData.success){
                    MessageService.showSuccess('已退件成功');
                    // 重整頁面
                    this.querySignOffList();
                }else{
                    MessageService.showError(response.restData.message, '退件');
                }

                this.rejectReason = '';
                this.rejectDesc = '';
                this.popOut = false;
                this.returnReasonModel = false;
            });
        }
    }
}
