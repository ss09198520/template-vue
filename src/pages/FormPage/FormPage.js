// import EventBus from "@/assets/services/eventBus";
import moment from 'moment';
import MessageService from "@/assets/services/message.service";
import CommonService from "@/assets/services/common.service";
import ValidateUtil from '@/assets/services/validateUtil';
import AjaxService from '@/assets/services/ajax.service.js';
import PMCService from '@/assets/services/pmc.service.js';
import EventBus from '@/assets/services/eventBus';

export default {
    name: 'Form',
    props: {
        restrictMode: String,
        formParam: Object,
        queryMemo: String,        
    },
    mounted() {
        this.init();
    },
    created(){
        // 關閉前確認
        // window.addEventListener('beforeunload', function (e) {
        //     e.preventDefault(); 
        //     e.returnValue = '';
        // });
    },
    data() {
        return {
            empNo: null,
            region: null,
            modeList: [
                {name: "新增/修改", value: "edit"},
                {name: "核算", value: "accounting"},
                {name: "檢視", value: "view"},
                {name: "檢視 (可下載)", value: "viewDownload"},
                {name: "取消", value: "cancel"},
            ],
            formPageMode: "edit",
            panel: [0, 1, 2, 3],
            imgSrcPrefix: "data:image/jpeg;base64,",
            formSeq: null,          // 表單流水號
            formImgFileNo: null,       // 表單檔案編號
            editedFormFileNo: null, // 已編輯的表單檔案編號
            acceptNum: null,        // 受理編號
            fmbhNo: null,           // 受理分號
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
            formSignPage: null,
            isFormSignPageOpened: false,
            customerSign: {},
            cancelSign: {},
            certificateList: [],
            oriCertificateList: [],
            certificateNo: 1,
            attachmentList: [],
            oriAttachmentList: [],
            attachmentNo: 1,
            selectedAttachment: null,
            viewImageDialog: false,
            viewImageTitle: "",
            viewImageSrc: "",
            showModeSelect: true,
            accountingMemo: "",
            setCertificateType: -1,
            selectedCertificate: {},
            certificateOptions: [
                {
                    fileName: '本人身分證正面',
                    fileCode: 'ID_CARD_FRONT'
                },
                {
                    fileName: '本人身分證背面',
                    fileCode: 'ID_CARD_BACK'
                },
                {
                    fileName: '現役軍人眷屬身分證正面',
                    fileCode: 'MILITARY_FAMILY_ID_CARD_FRONT'
                },
                {
                    fileName: '現役軍人眷屬身分證背面',
                    fileCode: 'MILITARY_FAMILY_ID_CARD_BACK'
                },
                {
                    fileName: '戶口名簿',
                    fileCode: 'HOUSEHOLD_REGISTRY'
                },
            ],
            newAttachmentType: -1,
            attachmentOptions: ['農業動力用電主管機關證明文件', '電氣技術人員執照', '門牌整編證明', '扣繳代繳帳號資料或中獎證明', '抄表事故聯絡單', '切結書'],
            setCertificateModal: false,
            newAttachmentModal: false,
            otherCertificate: '',
            otherAttachment: '',
            isBlocking: false,
            blockingMsg: null,
            cancelReason: null,
            scanDataList: [],
            needScanFileCodeList: [],
            needScanFileHint: null,
            isAgentNeedScanAttach: false,
            maxSignVersion: 0,
            isLoading: false,
            encryptedParam: null,
            empName: null,
        }
    },
    methods: {
        async init(){
            if(this.restrictMode){
                this.formPageMode = this.restrictMode;
                this.showModeSelect = false;       
            }        
            if(this.queryMemo){
                this.accountingMemo = this.queryMemo;
            }
           
            await this.getInitParam();
            this.formInit(false);

            EventBus.subscriber("scan-data-list", this.getScanDataList);
            EventBus.subscriber("scan-error", this.showScanErrorMsg);
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
                this.empNo = formParam.EMP_NO;
                this.region = formParam.REGION;
                this.acceptNum = formParam.FM_NO;
                this.fmbhNo = formParam.FMBH_NO;
                this.formType = formParam.FORM_TYPE;
                this.apitCod = formParam.APIT_COD;
                this.applyType = formParam.APPLY_TYPE;
                this.uniformNum = formParam.UNIFORM_NUM;
                this.isAgent = formParam.IS_AGENT;
                this.custName = formParam.CUST_NAME;
                this.contractType = formParam.CONTRACT_TYPE;
                this.electricNum = formParam.ELECTRIC_NUM;
                this.computeDate = formParam.COMPUTE_DATE;
                this.acceptDept = formParam.ACCEPT_DEPT;
                this.acceptDeptName = formParam.ACCEPT_DEPT_NAME;
                this.acceptUser = formParam.ACCEPT_USER;
                this.acceptUserName = formParam.ACCEPT_USER_NAME;
                this.acceptDate = formParam.ACCEPT_DATE;
                this.acceptItem = formParam.ACCEPT_ITEM;
                this.isUpdate = formParam.IS_UPDATE;
                this.isAddAttachment = formParam.IS_ADD_ATTACHMENT;
                this.isAffidavit = formParam.IS_AFFIDAVIT;
                this.uploadNo = formParam.UPLOAD_NO;
                this.cancelReason = formParam.CANCEL_REASON;
                this.encryptedParam = formParam.encryptedParam;
                
                this.formPageMode = ValidateUtil.isEmpty(formParam.formPageMode) ? this.formPageMode : formParam.formPageMode;
            }

            // 依頁面改變顯示模式
            if(page == "createForm"){
                this.formPageMode = "edit";
                this.showModeSelect = false;
                this.$emit("showOnlyContent");
            }
            else if(page == "cancelForm_cust"){
                this.formPageMode = "cancel";
                this.showModeSelect = false;
                this.$emit("showOnlyContent");
            }
            else if(page == "viewForm"){
                this.formPageMode = "view";
                this.showModeSelect = false;
                this.$emit("showOnlyContent");
            }
        },
        formInit(canSkipValidateTime){
            // 驗證是否有受理編號，若無直接擋件
            if(ValidateUtil.isEmpty(this.acceptNum) && ValidateUtil.isEmpty(this.encryptedParam)){
                this.isBlocking = true;
                this.blockingMsg = "查無受理編號";
                return;
            }
            
            let param = {
                acceptNum: this.acceptNum,
                fmbhNo: this.fmbhNo,
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
                empNo: this.empNo,
                region: this.region,
                encryptedParam: this.encryptedParam,
                canSkipValidateTime: canSkipValidateTime
            }

            AjaxService.post("/tpesForm/init", param, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {
                    this.isBlocking = true;
                    this.blockingMsg = response.restData.message;
                    MessageService.showError(response.restData.message,'表單初始化');
                    return;
                }

                this.formSeq = response.restData.formSeq;
                this.formImgFileNo = response.restData.formImgFileNo;
                this.editedFormFileNo = response.restData.editedFormFileNo;
                this.accountingMemo = response.restData.accountingMemo;
                this.needScanFileCodeList = response.restData.needScanFileCodeList;
                this.isAgentNeedScanAttach = response.restData.agentNeedScanAttach;
                this.maxSignVersion = response.restData.maxSignVersion;
                this.empName = response.restData.empName;

                // 若為加密參數進件，放入解密後才有的參數
                this.setDescryptedParam(response.restData);

                // 檢查證件是否已依規範掃描
                this.checkNeedScanFile();

                // 簽名
                if(!ValidateUtil.isEmpty(response.restData.customerSign)){
                    this.customerSign = response.restData.customerSign;
                }

                // 取消簽名
                if(!ValidateUtil.isEmpty(response.restData.cancelSign)){
                    this.cancelSign = response.restData.cancelSign;
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
        setDescryptedParam(data){
            if(!ValidateUtil.isEmpty(data.empNo)){
                this.empNo = data.empNo;
            }
            if(!ValidateUtil.isEmpty(data.region)){
                this.region = data.region;
            }
            if(!ValidateUtil.isEmpty(data.acceptNum)){
                this.acceptNum = data.acceptNum;
            }
            if(!ValidateUtil.isEmpty(data.cancelReason)){
                this.cancelReason = data.cancelReason;
            }
            if(!ValidateUtil.isEmpty(data.isAddAttachment)){
                this.isAddAttachment = data.isAddAttachment;
            }
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
                        fileCode: certificate.fileCode,
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
                        needSeal: attachment.needSeal,
                        canOnlyView: attachment.canOnlyView,
                    });
                    this.attachmentNo++;
                }

                this.oriAttachmentList = Array.from(this.attachmentList);
            }
        },
        openFormSignPage(){
            let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
            this.formSignPage = window.open("/tpes/#/imageEditor", '表單及簽名', config);

            // 若為取消需將模式傳給簽名頁做取消簽名
            if(this.formPageMode == "cancel"){
                this.formSignPage.mode = "cancel";
                this.formSignPage.signFileNo = this.cancelSign.fileNo;
            }
            // 若為檢視表單則不需簽名
            else if(this.formPageMode == "accounting" || this.formPageMode == "view"){
                this.formSignPage.mode = "view";
            }
            else{
                this.formSignPage.signFileNo = this.customerSign.fileNo;
            }

            this.formSignPage.formImgFileNo = this.formImgFileNo;
            this.formSignPage.editedFormFileNo = this.editedFormFileNo;
            this.formSignPage.acceptNum = this.acceptNum;
            this.formSignPage.formSeq = this.formSeq;
            this.formSignPage.maxSignVersion = this.maxSignVersion;
            this.formSignPage.empNo = this.empNo;
            this.formSignPage.region = this.region;
            this.formSignPage.onbeforeunload = this.formSignPageClosed;

            try {
                // 將畫面顯示改為同步
                PMCService.callDualScreenAdapterClone();
            } catch (error) {
                MessageService.showError("PMC 未開啟或異常", "PMC ");
            }
            
            this.isFormSignPageOpened = true;
        },
        formSignPageClosed(){
            try {
                // 將畫面顯示改為延伸
                PMCService.callDualScreenAdapterExtend();
            } catch (error) {
                MessageService.showError("PMC 未開啟或異常", "PMC ");
            }

            this.isFormSignPageOpened = false;
            this.formInit(true);
        },
        closeFormSignPage(){
            if(!this.formSignPage) {
                return;
            }
            this.formSignPage.close();
            this.isFormSignPageOpened = false;
        },
        deleteCertificate(index){
            this.certificateList.splice(index, 1);
        },
        deleteAttachment(index){
            this.attachmentList.splice(index, 1);
        },
        openSetCertificateModal(certificate){
            this.setCertificateModal = true;
            this.otherCertificate = '';
            this.setCertificateType = -1;
            this.selectedCertificate = certificate;
        },
        selectCertificate(index){
            this.setCertificateType = index;
        },
        setCertificate(){
            let fileName = this.setCertificateType == this.certificateOptions.length ? this.otherCertificate : this.certificateOptions[this.setCertificateType].fileName;
            let fileCode = this.setCertificateType == this.certificateOptions.length ? "OTHER" : this.certificateOptions[this.setCertificateType].fileCode;

            this.selectedCertificate.fileName = fileName;
            this.selectedCertificate.fileCode = fileCode;
            this.setCertificateModal = false;
        },
        addCertificate(base64){
            let fileExt = null;

            if(base64.charAt(0) == "/"){
                fileExt = "jpg";
            }
            else if(base64.charAt(0) == "i"){
                fileExt = "png";
            }

            if(ValidateUtil.isEmpty(fileExt)) return;

            let imgSrc = "data:image/" + fileExt + ";base64," + base64;

            // 套浮水印
            this.addWaterMark(imgSrc).then(({data}) => {

                this.certificateList.push({
                    id: this.certificateNo,
                    // 其他證件，須由使用者輸入證件類別
                    fileName: null,
                    originalFileName: "certificate_" + this.certificateNo + " (" + moment(new Date).format('YYYY-MM-DD') + ")." + fileExt,
                    fileCode: null,
                    fileNo: null,
                    filePath: null,
                    imgSrc: data,
                    isAdditional: true,
                    hasEdit: false,
                });

                this.certificateNo++;
                this.setCertificateModal = false;
            });
        },
        scanCertificate(){
            try {
                this.isLoading = true;
                PMCService.callWebScanAdapter();
            } catch (error) {
                this.isLoading = false;
                MessageService.showError("PMC 未開啟或異常", "PMC ");
            }
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
            let fileName = this.newAttachmentType === this.attachmentOptions.length ? this.otherAttachment : this.attachmentOptions[this.newAttachmentType];
            
            if(!ValidateUtil.isEmpty(this.attachmentList)){
                for(let attachment of this.attachmentList){
                    if(fileName == attachment.fileName){
                        MessageService.showInfo("不可加入已有相同名稱的附件");
                        return;
                    }
                }
            }

            if(ValidateUtil.isEmpty(fileName)){
                MessageService.showInfo("需輸入附件名稱");
                return;
            }

            this.attachmentList.push({
                id: this.attachmentNo,
                // 其他佐證文件，須由使用者輸入附件類別
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
            this.$forceUpdate(); // 強制頁面刷新

            let reader = new FileReader();
            reader.onload = (e) =>{
                this.selectedAttachment.base64 = e.target.result;
                this.selectedAttachment.imgSrc = null;

                // 圖片
                if(this.selectedAttachment.file.type.indexOf("image") > -1){
                    // 不套浮水印
                    this.selectedAttachment.imgSrc = e.target.result;
                }
            };
            reader.readAsDataURL(this.selectedAttachment.file);
        },
        downloadFile(attachment){
            AjaxService.postFile('/tpesForm/downloadFile',
                {
                    fileNo: attachment.fileNo
                },
                (response) => {
                    // 驗證是否成功
                    if (!response.success) {              
                        MessageService.showError(response.message,'下載檔案');
                        return;
                    }
                },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                }
            );
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
        validateCertifate(){
            if(!ValidateUtil.isEmpty(this.certificateList)){
                for(let indexA in this.certificateList){
                    if(ValidateUtil.isEmpty(this.certificateList[indexA].fileName)){
                        MessageService.showInfo("尚有證件未輸入名稱");
                        return false;
                    }

                    for(let indexB in this.certificateList){
                        if(indexA != indexB && this.certificateList[indexA].fileName == this.certificateList[indexB].fileName){
                            MessageService.showInfo("證件不可有相同的名稱");
                            return false;
                        }
                    }
                }
            }

            return true;
        },
        save(){
            if(!this.validateCertifate()){
                return;
            }

            let vin = this.setSaveFormVin();

            AjaxService.post("/tpesForm/save", vin, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'儲存表單');
                    return;
                }

                MessageService.showSuccess("儲存成功");

                if(this.restrictMode){
                    // 開啟滿意度調查頁
                    let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
                    window.open("/tpes/#/satisfaction/answer?acceptNum=" + this.acceptNum, '滿意度調查', config);
                    
                    // 當點擊儲存按鈕，則通知父層可關閉
                    this.$emit("saveFile");
                }
                else{
                    // 重新查詢一次
                    this.formInit(true);
                }
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
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
                    if(ValidateUtil.isEmpty(certificate.fileNo) && !ValidateUtil.isEmpty(certificate.imgSrc)){
                        addFileList.push({
                            category: "CERTIFICATE",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: certificate.fileName,
                            originalFileName: certificate.originalFileName,
                            fileExt: this.getFileExt(certificate.originalFileName),
                            base64: certificate.imgSrc.split(",")[1],
                            formSeq: this.formSeq
                        });
                    }
                    // 修改
                    else if(certificate.hasEdit){
                        modifyFileList.push({
                            fileNo: certificate.fileNo,
                            category: "CERTIFICATE",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: certificate.fileName,
                            originalFileName: certificate.originalFileName,
                            fileExt: this.getFileExt(certificate.originalFileName),
                            base64: ValidateUtil.isEmpty(certificate.imgSrc) ? null : certificate.imgSrc.split(",")[1],
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
                            needSeal: attachment.needSeal,
                        });
                    }
                    // 修改
                    else if(attachment.hasEdit){
                        modifyFileList.push({
                            fileNo: attachment.fileNo,
                            category: "ATTACHMENT",
                            fileCode: "fileCode", // 等定義好各檔案 fileCode 再調整
                            fileName: attachment.fileName,
                            originalFileName: attachment.originalFileName,
                            fileExt: this.getFileExt(attachment.originalFileName),
                            base64: ValidateUtil.isEmpty(attachment.base64) ? null : attachment.base64.split(",")[1],
                            formSeq: this.formSeq,
                            needSeal: attachment.needSeal,
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
                isAddAttachment: this.isAddAttachment,
                empNo: this.empNo,
                region: this.region,
                empName: this.empName,
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
        checkIsWord(attachment){
            let isWord = false;

            if(attachment){
                let fileExt = this.getFileExt(attachment.originalFileName);
                isWord = (fileExt == ".doc" || fileExt == ".docx");
            }

            return isWord;
        },
        checkNeedSeal(needSealIndex, needSeal){
            // 各案件只能有一個附件套印專用章
            // 若勾選套印則取消勾選其餘附件
            if(needSeal){
                for(let index in this.attachmentList){
                    if(index != needSealIndex && this.attachmentList[index].needSeal){
                        this.attachmentList[index].needSeal = false;
                        this.attachmentList[index].hasEdit = true;
                    }
                }
            }

            this.attachmentList[needSealIndex].hasEdit = true;
        },
        retrunOrder(){
            this.$emit("returnOrder", this.accountingMemo);
        },
        accountingSubmit(){
            this.$emit("accountingSubmit", this.accountingMemo);
        },
        saveComments(){
            // 將待審核備註一併傳回給父層
            this.$emit("saveComments", this.accountingMemo);
        },
        cancel(){
            // 驗證是否已簽名
            if(ValidateUtil.isEmpty(this.cancelSign.imgSrc)){
                MessageService.showInfo("尚未簽名", "提示");
                return;
            }

            let vin = {
                formSeq: this.formSeq,
                acceptNum: this.acceptNum,
                cancelSignBase64: this.cancelSign.imgSrc.split(",")[1],
                cancelReason: this.cancelReason,
                empNo: this.empNo,
                region: this.region,
            };

            AjaxService.post("/tpesForm/custCancelForm", vin, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'取消表單');
                    return;
                }

                MessageService.showSuccess("取消成功");
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
        },
        addWaterMark(originImageSrc){
            let originImage = new Image();

            return new Promise((resolve, reject) => {
                if(!originImageSrc) {
                    reject({
                      status: 'fail',
                      message: '取得影像失敗'
                    })
                  }

                originImage.onload = function() {
                    let canvas = document.createElement('canvas');
    
                    canvas.width = originImage.width;
                    canvas.height = originImage.height;
    
                    // 浮水印日期
                    let dateString = moment(new Date).format('YYYY/MM/DD HH:mm:ss');
                    let context = canvas.getContext("2d");
                    context.drawImage(originImage, 0, 0);
                    let imgData = context.getImageData(0,0,canvas.width,canvas.height);
                    let waterMarkCanvas = document.createElement("canvas");
                    //設定浮水印畫布的高跟寬
                    waterMarkCanvas.width = canvas.width;
                    waterMarkCanvas.height = canvas.height;
                    let waterMarkContext = waterMarkCanvas.getContext("2d");
                    waterMarkContext.putImageData(imgData, 0, 0);
                    waterMarkContext.font = "30px Arial ";
                    waterMarkContext.fillStyle = "#ff0000";
                    waterMarkContext.fillText(dateString, waterMarkCanvas.width - 290, 30);
                    waterMarkContext.fillText("台電申請專用", waterMarkCanvas.width - 200, 60);
                    let waterMarkImage = waterMarkCanvas.toDataURL("image/jpeg");

                    if(!waterMarkImage) {
                        reject({
                          status: 'fail',
                          message: '取得影像失敗'
                        })
                    }
                    resolve({
                        status: 'success',
                        data: waterMarkImage
                    });
                };
    
                originImage.src = originImageSrc;
            });
        },
        getScanDataList(data){
            this.scanDataList = data;
            
            if(!ValidateUtil.isEmpty(this.scanDataList)){
                for(let scanData of this.scanDataList){
                    this.addCertificate(scanData.BASE64STR);
                }
            }

            this.isLoading = false;
        },
        showScanErrorMsg(msg){
            this.isLoading = false;
            MessageService.showError("PMC 回傳: " + msg);
        },
        checkNeedScanFile(){
            this.needScanFileHint = "";

            if(!ValidateUtil.isEmpty(this.needScanFileCodeList)){
                for (let index in this.needScanFileCodeList) {
                    let needScanFileCode = this.needScanFileCodeList[index];
                    if(!ValidateUtil.isEmpty(this.certificateList)){
                        for (let certificate of this.certificateList) {
                            // 若已有掃描的證件，將 fileCode 從 List 移除，最後剩下來的就是還沒掃描的
                            if(!ValidateUtil.isEmpty(needScanFileCode) 
                                && certificate.fileCode == needScanFileCode 
                                && ValidateUtil.isEmpty(certificate.fileNo)){

                                this.needScanFileCodeList.splice(index, 1);
                                index--;
                                break;
                            }
                        }
                    }
                }

                if(!ValidateUtil.isEmpty(this.needScanFileCodeList)){
                    for (let needScanFileCode of this.needScanFileCodeList) {
                        for(let certificateOption of this.certificateOptions){
                            if(certificateOption.fileCode == needScanFileCode){
                                this.needScanFileHint = this.needScanFileHint ? this.needScanFileHint + "、" + certificateOption.fileName : certificateOption.fileName;
                            }
                        }
                    }
                }
            }
        },
        chooseCertificateType(certificate){
            if(!ValidateUtil.isEmpty(certificate.fileName)){
                for(let certificateOption of this.certificateOptions){
                    if(certificateOption.fileName == certificate.fileName){
                        certificate.fileCode = certificateOption.fileCode;
                        break;
                    }
                }
            }
        },
        querySign(){
            this.customerSign = {};
            this.cancelSign = {};

            let param = {
                formSeq: this.formSeq,
            }

            AjaxService.post("/tpesForm/querySign", param, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'取得簽名圖片');
                    return;
                }

                // 簽名
                if(!ValidateUtil.isEmpty(response.restData.customerSign)){
                    this.customerSign = response.restData.customerSign;
                }

                // 取消簽名
                if(!ValidateUtil.isEmpty(response.restData.cancelSign)){
                    this.cancelSign = response.restData.cancelSign;
                }

            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
        },
    }
}