// import EventBus from "@/assets/services/eventBus";
import MessageService from "@/assets/services/message.service";
import CommonService from "@/assets/services/common.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service.js';

export default {
    name: 'Form',
    props: {
        restrictMode: String,
        formInf: Object,
        // signPreviewImgSrc:String,
        // certificateList: Array,
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            modeList: [
                {name: "新增/修改", value: "edit"},
                {name: "核算", value: "accounting"},
                {name: "檢視", value: "view"},
                {name: "檢視我的表單", value: "viewMyForm"},
                {name: "檢視我的調閱區", value: "viewMyRead"},
                {name: "檢視專用章簽核(審核前)", value: "viewSealSignOffBefore"},
                {name: "檢視專用章簽核(審核後)", value: "viewSealSignOffAfter"},
            ],
            mode: "edit",
            panel: [0, 1, 2, 3],
            imgSrcPrefix: "data:image/jpeg;base64,",
            formSeq: null,          // 表單流水號
            empNo: null,            // 登入者身分
            region: null,           // 區處
            acceptNum: null,        // 受理編號
            formType: null,         // 登記單代碼
            apitCod: null,          // 申請項目編號
            applyType: null,        // 案件進件類型
            uniformNum: null,       // 統編
            isAgent: null,          // 申請人
            custName: null,         // 戶名
            contractType: null,     // 契約別
            electricNum: null,      // 電號
            computeDate: null,      // 計算日
            acceptDept: null,       // 受理部門
            isUpdate: null,         // 修正件
            isAddAttachment: null,  // 補附件操作
            isAffidavit: null,      // 切結註記
            uploadNo: null,     // 證件編號
            signPreviewImgSrc: "",
            certificateList: [],
            certificateNo: 1,
            attachmentList: [],
            //Mock的prototype
            attachmentListMockBefore: [{id: '1',name:'證明函(未套印)'}],
            attachmentListMockAfter: [{id: '1',name:'證明函(未套印)'},{id: '2',name:'證明函(套印完成)'}],
            attachmentNo: 1,
            selectedAttachment: null,
            viewImageDialog: false,
            viewImageTitle: "",
            viewImageSrc: "",
            showModeSelect: true,
            accountingMemo: "",
            newCertificateType: -1,
            certificateOptions: ['本人身分證正面', '本人身分證背面', '現役軍人眷屬身分證正面', '現役軍人眷屬身分證背面', '其他證件'],
            newAttachmentType: -1,
            attachmentOptions: ['農業動力用電主管機關證明文件', '電氣技術人員執照', '門牌整編證明', '扣繳代繳帳號資料或中獎證明', '戶口名簿', '抄表事故聯絡單', '切結書', '其他佐證文件'],
            newCertificateModal: false,
            newAttachmentModal: false,
            otherCertificate: '',
            otherAttachment: ''
        }
    },
    methods: {
        init(){            
            if(this.restrictMode){
                this.mode = this.restrictMode;
                this.showModeSelect = false;
            }
            this.getInitParam();
            this.formInit();
        },
        getInitParam(){
            // 從網址取得參數
            let formInf = CommonService.getURLParamObject();
            // 若無資料改從頁面參數取
            if(ValidateUtil.isEmpty(formInf)){
                formInf = this.formInf;
            }

            if(!ValidateUtil.isEmpty(formInf)){
                this.empNo = formInf.empNo;
                this.region = formInf.region;
                this.acceptNum = formInf.acceptNum;
                this.formType = formInf.formType;
                this.apitCod = formInf.apitCod;
                this.applyType = formInf.applyType;
                this.uniformNum = formInf.uniformNum;
                this.isAgent = formInf.isAgent;
                this.custName = formInf.custName;
                this.contractType = formInf.contractType;
                this.electricNum = formInf.electricNum;
                this.computeDate = formInf.computeDate;
                this.acceptDept = formInf.acceptDept;
                this.isUpdate = formInf.isUpdate;
                this.isAddAttachment = formInf.isAddAttachment;
                this.isAffidavit = formInf.isAffidavit;
                this.uploadNo = formInf.uploadNo;
            }
        },
        formInit(){
            let param = {
                empNo: this.empNo,
                region: this.region,
                acceptNum: this.acceptNum,
                formType: this.formType,
                apitCod: this.apitCod,
                applyType: this.applyType,
                uniformNum: this.uniformNum,
                isAgent: this.isAgent,
                custName: this.custName,
                contractType: this.contractType,
                electricNum: this.electricNum,
                computeDate: this.computeDate,
                acceptDept: this.acceptDept,
                isUpdate: this.isUpdate,
                isAddAttachment: this.isAddAttachment,
                isAffidavit: this.isAffidavit,
                uploadNo: this.uploadNo,
            }

            AjaxService.post("/tpesForm/init", param, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.resultMessage.success) {              
                    MessageService.showError(response.restData.resultMessage.message,'表單初始化');
                    return;
                }

                // 整理證件及附件
                this.setCertificateList(response.restData.certificateList);
                this.setAttachmentList(response.restData.attachmentList);
                
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
        },
        setCertificateList(certificateList){
            if(!ValidateUtil.isEmpty(certificateList)){
                for (let certificate of certificateList) {
                    this.certificateList.push({
                        id: this.certificateNo,
                        fileName: certificate.fileName,
                        fileNo: certificate.fileNo,
                        imgSrc: certificate.imgSrc,
                        isAdditional: false,
                    });
                    this.certificateNo++;
                }
            }
        },
        setAttachmentList(attachmentList){
            if(!ValidateUtil.isEmpty(attachmentList)){
                for (let attachment of attachmentList) {
                    this.attachmentList.push({
                        id: this.attachmentNo,
                        fileName: attachment.fileName,
                        fileNo: attachment.fileNo,
                        imgSrc: attachment.imgSrc
                    });
                    this.attachmentNo++;
                }
            }
        },
        cleanCertificateImg(certificate) {
            certificate.imgSrc = null;
        },
        deleteCertificate(index){
            this.certificateList.splice(index, 1);
        },
        deleteAttachment(index){
            this.attachmentList.splice(index, 1);
        },
        openNewCertificateModal(){
            this.newCertificateModal = true;
            this.otherCertificate = '';
            this.newCertificateType = -1;
        },
        selectCertificate(index){
            this.newCertificateType = index;
        },
        addCertificate(){
            this.certificateList.push({
                id: this.certificateNo,
                // 4: 其他證件，須由使用者輸入證件類別
                name: this.newCertificateType === 4 ? this.otherCertificate : this.certificateOptions[this.newCertificateType],
                fileNo: "",
                imgSrc: "",
                isAdditional: false,
            });
            this.certificateNo ++;
            this.newCertificateModal = false;
        },
        openNewAttachmentModal(){
            this.newAttachmentModal = true;
            this.otherAttachment = '';
            this.newAttachmentType = -1;
        },
        selectAttachment(index){
            this.newAttachmentType = index;
        },
        addAttachment(){
            this.attachmentList.push({
                id: this.attachmentNo,
                // 7: 其他佐證文件，須由使用者輸入附件類別
                name: this.newAttachmentType === 7 ? this.otherAttachment : this.attachmentOptions[this.newAttachmentType],
                fileNo: "",
                imgSrc: "",
                file: null,
                useStamp: false,
                isSelecting: false
            });
            this.attachmentNo++;
            this.newAttachmentModal = false;
        },
        uploadFile(attachment, index) {
            this.selectedAttachment = attachment;
            this.selectedAttachment.isSelecting = true
            window.addEventListener('focus', () => {
                this.selectedAttachment.isSelecting = false
            }, { once: true })
      
            this.$refs.uploaders[index].click()
        },
        onFileChanged(e) {
            this.selectedAttachment.file = e.target.files[0];
            
            if(this.selectedAttachment.file.type.indexOf("image") > -1){
                let reader = new FileReader();
                reader.onload = (e) =>{
                    this.selectedAttachment.imgSrc = e.target.result;
                };
                reader.readAsDataURL(this.selectedAttachment.file);
            }
        },
        viewImage(image){
            this.viewImageTitle = image.name;
            if(image.imgSrc.indexOf("data:image") > -1){
                this.viewImageSrc = image.imgSrc;
            }
            else{
                this.viewImageSrc = this.imgSrcPrefix + image.imgSrc;
            }
            this.viewImageDialog = true;
        },
        hideFiveSec(){
            this.showModeSelect = false;
            setTimeout(() => this.showModeSelect = true, 5000);
        },
        // save(){
        //     if(this.restrictMode){
        //         //當點擊儲存按鈕，則使用EventBus通知可關閉
        //         EventBus.publish('saveFile');
        //     }
        // },
        retrunOrder(){
            this.$emit("returnOrder",this.accountingMemo);
        },
        accountingSubmit(){
            this.$emit("accountingSubmit",this.accountingMemo);
        },
        saveComments(){
            // 將待審核備註一併傳回給父層
            this.$emit("saveComments",this.accountingMemo);
        },
        saveFile(){
            this.$emit("saveFile");
        }
    }
}