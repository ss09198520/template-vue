
import MessageService from "@/assets/services/message.service";
import CommonService from "@/assets/services/common.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service.js';
import EventBus from '@/assets/services/eventBus';

export default {
    name: 'ViewFile',
    props: {
        restrictMode: String,
        formParam: Object,
        queryMemo: String,        
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            empNo: null,
            region: null,
            fileList: [],
            panel: [0],
            imgSrcPrefix: "data:image/jpeg;base64,",
            viewImageDialog: false,
            viewImageTitle: "",
            viewImageSrc: "",
            isBlocking: false,
            blockingMsg: null,
        }
    },
    methods: {
        async init(){         

            await this.getInitParam();
            this.viewFileInit();

            EventBus.subscriber("scan-data-list", this.getScanDataList);
        },
        async getInitParam(){
            // 從網址取得參數
            let formParam = CommonService.getURLParamObject();
            let page = CommonService.getURLPage();

            // 若無資料改從頁面參數取
            if(ValidateUtil.isEmpty(formParam)){
                formParam = this.formParam;
            }

            if(!ValidateUtil.isEmpty(formParam)){
                this.uploadNo = formParam.uploadNo;
            }
        },
        viewFileInit(){
            // 驗證是否有上傳編號，若無直接擋件
            if(ValidateUtil.isEmpty(this.uploadNo)){
                this.isBlocking = true;
                this.blockingMsg = "查無上傳編號";
                return;
            }
            
            let param = {
                uploadNo: this.uploadNo
            }

            AjaxService.post("/viewUploadFile/viewUploadFileByUploadNo", param, 
            (response) => {
                // 驗證是否成功
                if (response.restData.success) {        
                    var noChangeList = response.restData.fileList;      
                    for(var i = 0; i < noChangeList.length; i++){
                        noChangeList[i].base64 = "data:image/gif;base64," + noChangeList[i].base64;
                    }
                    this.fileList = noChangeList;
                } else {
                    MessageService.showError(response.restData.message,'載入圖片');
                    return;
                }
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
        },
        viewImage(image){
            this.viewImageTitle = image.fileName;
            if(image.base64.indexOf("data:image") > -1){
                this.viewImageSrc = image.base64;
            }
            else{
                this.viewImageSrc = this.imgSrcPrefix + image.base64;
            }
            this.viewImageDialog = true;
        },
    }
}