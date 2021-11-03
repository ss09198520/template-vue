// import EventBus from "@/assets/services/eventBus";
import MessageService from "@/assets/services/message.service";
import CommonService from "@/assets/services/common.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service.js';

export default {
    name: 'Form',
    props: {
        restrictMode: String,
        formParam: Object,
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
                {name: "檢視 (可下載)", value: "viewDownload"},
            ],
            formPageMode: "edit",
            panel: [0, 1, 2, 3],
            imgSrcPrefix: "data:image/jpeg;base64,",
            formSeq: null,          // 表單流水號
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
            acceptDeptName: null,   // 受理部門名稱
            acceptUser: null,       // 受理人員
            acceptUserName: null,   // 受理人員姓名
            acceptDate: null,       // 受理日期
            acceptItem: null,       // 受理項目
            isUpdate: null,         // 修正件
            isAddAttachment: null,  // 補附件操作
            isAffidavit: null,      // 切結註記
            uploadNo: null,     // 證件編號
            signPreviewImgSrc: "",
            certificateList: [],
            oriCertificateList: [],
            certificateNo: 1,
            attachmentList: [],
            oriAttachmentList: [],
            //Mock的prototype
            attachmentListMockBefore: [{id: '1',fileName:'證明函(未套印)'}],
            attachmentListMockAfter: [{id: '1',fileName:'證明函(未套印)'},{id: '2',fileName:'證明函(套印完成)'}],
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
            otherAttachment: '',
            isBlocking: false,
            blockingMsg: null,
        }
    },
    methods: {
        init(){            
            if(this.restrictMode){
                this.formPageMode = this.restrictMode;
                this.showModeSelect = false;
            }
            this.getInitParam();
            this.formInit();
        },
        getInitParam(){
            // 從網址取得參數
            let formParam = CommonService.getURLParamObject();
            // 若無資料改從頁面參數取
            if(ValidateUtil.isEmpty(formParam)){
                formParam = this.formParam;
            }

            if(!ValidateUtil.isEmpty(formParam)){
                this.acceptNum = formParam.acceptNum;
                this.formType = formParam.formType;
                this.apitCod = formParam.apitCod;
                this.applyType = formParam.applyType;
                this.uniformNum = formParam.uniformNum;
                this.isAgent = formParam.isAgent;
                this.custName = formParam.custName;
                this.contractType = formParam.contractType;
                this.electricNum = formParam.electricNum;
                this.computeDate = formParam.computeDate;
                this.acceptDept = formParam.acceptDept;
                this.acceptDeptName = formParam.acceptDeptName;
                this.acceptUser = formParam.acceptUser;
                this.acceptUserName = formParam.acceptUserName;
                this.acceptDate = formParam.acceptDate;
                this.acceptItem = formParam.acceptItem;
                this.isUpdate = formParam.isUpdate;
                this.isAddAttachment = formParam.isAddAttachment;
                this.isAffidavit = formParam.isAffidavit;
                this.uploadNo = formParam.uploadNo;
                
                this.formPageMode = ValidateUtil.isEmpty(formParam.formPageMode) ? this.formPageMode : formParam.formPageMode;
            }
        },
        formInit(){
            // 驗證是否有受理編號，若無直接擋件
            if(ValidateUtil.isEmpty(this.acceptNum)){
                this.isBlocking = true;
                this.blockingMsg = "查無受理編號";
                return;
            }
            
            let param = {
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
                acceptDeptName: this.acceptDeptName,
                acceptUser: this.acceptUser,
                acceptUserName: this.acceptUserName,
                acceptDate: this.acceptDate,
                acceptItem: this.acceptItem,
                isUpdate: this.isUpdate,
                isAddAttachment: this.isAddAttachment,
                isAffidavit: this.isAffidavit,
                uploadNo: this.uploadNo,
                formPageMode: this.formPageMode,
            }

            AjaxService.post("/tpesForm/init", param, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'表單初始化');
                    return;
                }

                this.formSeq = response.restData.formSeq;
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
            this.certificateList = [];
            this.oriCertificateList = [];

            if(!ValidateUtil.isEmpty(certificateList)){
                for (let certificate of certificateList) {
                    this.certificateList.push({
                        id: this.certificateNo,
                        fileName: certificate.fileName,
                        originalFileName: certificate.originalFileName,
                        fileNo: certificate.fileNo,
                        filePath: certificate.filePath,
                        imgSrc: certificate.imgSrc,
                        isAdditional: false,
                        hasEdit: false,
                    });
                    this.certificateNo++;
                }

                this.oriCertificateList = Array.from(this.certificateList);
            }
        },
        setAttachmentList(attachmentList){
            this.attachmentList = [];
            this.oriAttachmentList = [];

            if(!ValidateUtil.isEmpty(attachmentList)){
                for (let attachment of attachmentList) {
                    this.attachmentList.push({
                        id: this.attachmentNo,
                        fileName: attachment.fileName,
                        originalFileName: attachment.originalFileName,
                        fileNo: attachment.fileNo,
                        filePath: attachment.filePath,
                        imgSrc: attachment.imgSrc,
                        base64: attachment.base64,
                        hasEdit: false,
                        needSeal: false,
                    });
                    this.attachmentNo++;
                }

                this.oriAttachmentList = Array.from(this.attachmentList);
            }
        },
        openFormSignPage(){
            let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
            window.open("/#/imageEditor", '表單及簽名', config);
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
            let fileName = this.newCertificateType === 4 ? this.otherCertificate : this.certificateOptions[this.newCertificateType];
            
            if(!ValidateUtil.isEmpty(this.certificateList)){
                for(let certificate of this.certificateList){
                    if(fileName == certificate.fileName){
                        MessageService.showInfo("不可加入已有相同名稱的證件");
                        return;
                    }
                }
            }

            this.certificateList.push({
                id: this.certificateNo,
                // 4: 其他證件，須由使用者輸入證件類別
                fileName: fileName,
                fileNo: null,
                imgSrc: null,
                isAdditional: true,
            });
            this.certificateNo ++;
            this.newCertificateModal = false;
        },
        scanCertificate(certificate){
            certificate.hasEdit = true;
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
            let fileName = this.newAttachmentType === 7 ? this.otherAttachment : this.attachmentOptions[this.newAttachmentType];
            
            if(!ValidateUtil.isEmpty(this.attachmentList)){
                for(let attachment of this.attachmentList){
                    if(fileName == attachment.fileName){
                        MessageService.showInfo("不可加入已有相同名稱的附件");
                        return;
                    }
                }
            }

            this.attachmentList.push({
                id: this.attachmentNo,
                // 7: 其他佐證文件，須由使用者輸入附件類別
                fileName: fileName,
                fileNo: null,
                imgSrc: null,
                file: null,
                needSeal: false,
                isSelecting: false
            });
            this.attachmentNo++;
            this.newAttachmentModal = false;
        },
        uploadFile(attachment, index) {
            this.selectedAttachment = attachment;
            this.selectedAttachment.isSelecting = true
            this.selectedAttachment.hasEdit = true;
            window.addEventListener('focus', () => {
                this.selectedAttachment.isSelecting = false
            }, { once: true });
      
            this.$refs.uploaders[index].click();
        },
        onFileChanged(e) {
            this.selectedAttachment.file = e.target.files[0];
            // 取出檔案名稱
            this.selectedAttachment.originalFileName = this.selectedAttachment.file.name;
            
            let reader = new FileReader();
            reader.onload = (e) =>{
                this.selectedAttachment.base64 = e.target.result;
                if(this.selectedAttachment.file.type.indexOf("image") > -1){
                    this.selectedAttachment.imgSrc = e.target.result;
                }
            };
            reader.readAsDataURL(this.selectedAttachment.file);
        },
        viewImage(image){
            this.viewImageTitle = image.fileName;
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
        save(){
            let vin = this.setSaveFormVin();

            AjaxService.post("/tpesForm/save", vin, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'儲存表單');
                    return;
                }

                MessageService.showSuccess("儲存成功");
                // 重新查詢一次
                this.formInit();
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });

            if(this.restrictMode){
                //當點擊儲存按鈕，則通知父層可關閉
                this.$emit("saveFile");
            }
        },
        setSaveFormVin(){
            let addFileList = [];
            let modifyFileList = [];
            let deleteFileList = [];

            // 整理有變更的證件及附件
            // 新增/修改 證件
            if(!ValidateUtil.isEmpty(this.certificateList)){
                for(let certificate of this.certificateList){
                    // 新增
                    if(ValidateUtil.isEmpty(certificate.fileNo) && !ValidateUtil.isEmpty(certificate.base64)){
                        addFileList.push({
                            category: "CERTIFICATE",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: certificate.fileName,
                            originalFileName: certificate.fileName,
                            fileExt: this.getFileExt(certificate.fileName),
                            base64: certificate.base64.split(",")[1],
                            formSeq: this.formSeq
                        });
                    }
                    // 修改
                    else if(certificate.hasEdit && !ValidateUtil.isEmpty(certificate.base64)){
                        modifyFileList.push({
                            fileNo: certificate.fileNo,
                            category: "CERTIFICATE",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: certificate.fileName,
                            originalFileName: certificate.fileName,
                            fileExt: this.getFileExt(certificate.fileName),
                            base64: certificate.base64.split(",")[1],
                            formSeq: this.formSeq
                        });
                    }
                }
            }
            // 刪除證件 (相同的 fileNo 還存在就不刪，其餘皆刪)
            if(!ValidateUtil.isEmpty(this.oriCertificateList)){
                for(let oriCertificate of this.oriCertificateList){
                    let isDelete = true;
                    if(!ValidateUtil.isEmpty(this.certificateList)){
                        for(let certificate of this.certificateList){
                            if(!ValidateUtil.isEmpty(oriCertificate.fileNo) && oriCertificate.fileNo == certificate.fileNo){
                                isDelete = false;
                                break;
                            }
                        }
                    }

                    if(isDelete){
                        deleteFileList.push({
                            fileNo: oriCertificate.fileNo,
                            fileName: oriCertificate.fileName,
                            filePath: oriCertificate.filePath
                        });
                    }
                }
            }

            // 新增/修改 附件
            if(!ValidateUtil.isEmpty(this.attachmentList)){
                for(let attachment of this.attachmentList){
                    // 新增
                    if(ValidateUtil.isEmpty(attachment.fileNo) && !ValidateUtil.isEmpty(attachment.base64)){
                        addFileList.push({
                            category: "ATTACHMENT",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: attachment.fileName,
                            originalFileName: attachment.originalFileName,
                            fileExt: this.getFileExt(attachment.originalFileName),
                            base64: attachment.base64.split(",")[1],
                            formSeq: this.formSeq,
                            needSeal: attachment.needSeal
                        });
                    }
                    // 修改
                    else if(attachment.hasEdit && !ValidateUtil.isEmpty(attachment.base64)){
                        modifyFileList.push({
                            fileNo: attachment.fileNo,
                            category: "ATTACHMENT",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: attachment.fileName,
                            originalFileName: attachment.originalFileName,
                            fileExt: this.getFileExt(attachment.originalFileName),
                            base64: attachment.base64.split(",")[1],
                            formSeq: this.formSeq
                        });
                    }
                }
            }
            // 刪除附件 (相同的 fileNo 還存在就不刪，其餘皆刪)
            if(!ValidateUtil.isEmpty(this.oriAttachmentList)){
                for(let oriAttachment of this.oriAttachmentList){
                    let isDelete = true;
                    if(!ValidateUtil.isEmpty(this.attachmentList)){
                        for(let attachment of this.attachmentList){
                            if(!ValidateUtil.isEmpty(oriAttachment.fileNo) && oriAttachment.fileNo == attachment.fileNo){
                                isDelete = false;
                                break;
                            }
                        }
                    }

                    if(isDelete){
                        deleteFileList.push({
                            fileNo: oriAttachment.fileNo,
                            fileName: oriAttachment.fileName,
                            filePath: oriAttachment.filePath
                        });
                    }
                }
            }

            let vin = {
                acceptNum: this.acceptNum,
                formSeq: this.formSeq,
                addFileList: addFileList,
                modifyFileList: modifyFileList,
                deleteFileList: deleteFileList,
            };

            return vin;
        },
        getFileExt(fileName){
            let fileExt = null;
            if(!ValidateUtil.isEmpty(fileName)){
                let fileNameArr = fileName.split('.');
                fileExt = "." + fileNameArr[fileNameArr.length - 1];
            }
            return fileExt;
        },
        retrunOrder(){
            this.$emit("returnOrder",this.accountingMemo);
        },
        accountingSubmit(){
            this.$emit("accountingSubmit",this.accountingMemo);
        },
        saveComments(){
            // 將待審核備註一併傳回給父層
            this.$emit("saveComments",this.accountingMemo);
        }
    }
}