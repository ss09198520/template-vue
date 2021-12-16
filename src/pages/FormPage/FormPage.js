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
            attachmentOptions: [
                {
                    fileName: '農業動力用電主管機關證明文件', 
                    fileCode: 'AGRI_COMP_AUTH_DOC'
                },
                {
                    fileName: '電氣技術人員執照', 
                    fileCode: 'ELECTRIC_TECH_LIC'
                },
                {
                    fileName: '門牌整編證明',
                    fileCode: 'HOUSE_NUM_CERTIFICATE'
                },
                {
                    fileName: '扣繳代繳帳號資料或中獎證明',
                    fileCode: 'PAYMENT_OR_WINNING'
                },
                {
                    fileName: '抄表事故聯絡單',
                    fileCode: 'ACCIDENT_CONTACT'
                },
                {
                    fileName: '切結書', 
                    fileCode: 'AFFIDAVIT_LETTER'
                },
                {
                    fileName: '用電資料表', 
                    fileCode: 'ELECTRIC_INFO'
                },
                {
                    fileName: '證明函', 
                    fileCode: 'CERTIFICATE_LETTER'
                },
            ],
            setCertificateModal: false,
            newAttachmentModal: false,
            otherCertificate: '',
            otherAttachment: '',
            isBlocking: false,
            blockingMsg: null,
            cancelReason: null,
            scanDataList: [],
            needScanFileList: [],
            needScanFileHint: null,
            needScanAttachHint: null,
            oriNeedScanFileList: [],
            isNeedScanAttach: false,
            maxSignVersion: 0,
            isLoading: false,
            encryptedParam: null,
            empName: null,
            windowRef: null,//開啟問卷存放回傳物件
            usePmc: false,
            onlySealFileCode: null,
            acctUploadFileCode: null,
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
                this.usePmc = true;
                this.$emit("showOnlyContent");
            }
            else if(page == "cancelForm_cust"){
                this.formPageMode = "cancel";
                this.showModeSelect = false;
                this.usePmc = true;
                this.$emit("showOnlyContent");
            }
            else if(page == "viewForm"){
                this.formPageMode = "view";
                this.showModeSelect = false;
                this.$emit("showOnlyContent");
            }
        },
        async formInit(canSkipValidateTime){
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

            await AjaxService.post("/tpesForm/init", param, 
            async (response) => {
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
                this.needScanFileList = response.restData.needScanFileList;
                this.oriNeedScanFileList = response.restData.needScanFileList;
                this.isNeedScanAttach = response.restData.needScanAttach;
                this.maxSignVersion = response.restData.maxSignVersion;
                this.empName = response.restData.empName;

                // 初始化一次後就將修正件 flag 壓為 N 避免每次都是修正件
                this.isUpdate = "N";

                // 若為加密參數進件，放入解密後才有的參數
                this.setDescryptedParam(response.restData);

                // 簽名
                if(!ValidateUtil.isEmpty(response.restData.customerSign)){
                    this.customerSign = response.restData.customerSign;
                }

                // 取消簽名
                if(!ValidateUtil.isEmpty(response.restData.cancelSign)){
                    this.cancelSign = response.restData.cancelSign;
                }

                // 整理證件及附件
                await this.setCertificateList(response.restData.certificateList);
                await this.setAttachmentList(response.restData.attachmentList);

                // 檢查證件及附件是否已依規範掃描及上傳，同時檢查有無特殊附件
                this.checkNeedScanFile(false);
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
        async setCertificateList(certificateList){
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
        async setAttachmentList(attachmentList){
            this.attachmentList = [];
            this.oriAttachmentList = [];

            if(!ValidateUtil.isEmpty(attachmentList)){
                for (let attachment of attachmentList) {
                    this.attachmentList.push({
                        id: this.attachmentNo,
                        fileName: attachment.fileName,
                        fileCode: attachment.fileCode,
                        originalFileName: attachment.originalFileName,
                        fileNo: attachment.fileNo,
                        filePath: attachment.filePath,
                        imgSrc: attachment.imgSrc,
                        base64: attachment.base64,
                        hasEdit: false,
                        needSeal: attachment.needSeal,
                        canOnlyView: attachment.canOnlyView,
                        isSelecting: false,
                        canAcctUpload: false,
                    });
                    this.attachmentNo++;
                }

                this.oriAttachmentList = Array.from(this.attachmentList);
            }
        },
        openFormSignPage(){
            let config = "width=" + screen.availWidth + ",height=" + screen.availHeight + 'top=0,left=0,statusbar=no,scrollbars=yes,status=no,location=no';
            this.formSignPage = window.open("/tpes/#/imageEditor", "_blank", config);

            // 若為取消需將模式傳給簽名頁做取消簽名
            if(this.formPageMode == "cancel"){
                this.formSignPage.mode = "cancel";
                this.formSignPage.signFileNo = this.cancelSign.fileNo;
            }
            // 若為檢視表單則不需簽名
            else if(this.formPageMode == "accounting" || this.formPageMode == "view" || this.formPageMode == "viewDownload"){
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

            if(this.usePmc){
                try {
                    // 將畫面顯示改為同步
                    PMCService.callDualScreenAdapterClone();
                } catch (error) {
                    MessageService.showError("PMC 未開啟或異常", "PMC ");
                }
            }
            
            this.isFormSignPageOpened = true;
        },
        formSignPageClosed(){
            if(this.usePmc){
                try {
                    // 將畫面顯示改為延伸
                    PMCService.callDualScreenAdapterExtend();
                } catch (error) {
                    MessageService.showError("PMC 未開啟或異常", "PMC ");
                }
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
            let fileName = this.newAttachmentType == this.attachmentOptions.length ? this.otherAttachment : this.attachmentOptions[this.newAttachmentType].fileName;
            let fileCode = this.newAttachmentType == this.attachmentOptions.length ? "OTHER_ATTACHMENT" : this.attachmentOptions[this.newAttachmentType].fileCode;

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
                fileCode: fileCode,
                fileNo: null,
                imgSrc: null,
                file: null,
                needSeal: (this.onlySealFileCode && this.onlySealFileCode == fileCode),
                isSelecting: false,
                canAcctUpload: false,
            });
            this.attachmentNo++;
            this.newAttachmentModal = false;
        },
        uploadFile(attachment, index) {
            this.selectedAttachment = attachment;
            this.selectedAttachment.isSelecting = true;
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
                // 若為強制須掃專用章的附件，需檢查是否為 word，不是的話要擋
                if(this.selectedAttachment.fileCode == this.onlySealFileCode && !this.checkIsWord(this.selectedAttachment)){
                    // 清空附件
                    for(let attachment of this.attachmentList){
                        if(attachment.id == this.selectedAttachment.id){
                            this.clearAttachment(attachment);
                            break;
                        }
                    }
                    
                    MessageService.showInfo("欲套用專用章檔案只可上傳 Word 檔");
                }
                else{
                    this.selectedAttachment.base64 = e.target.result;
                    this.selectedAttachment.imgSrc = null;
    
                    // 圖片
                    if(this.selectedAttachment.file.type.indexOf("image") > -1){
                        // 不套浮水印
                        this.selectedAttachment.imgSrc = e.target.result;
                    }

                    // 若為核算時補件則直接上傳
                    if(this.formPageMode == "accounting" && this.selectedAttachment.canAcctUpload){
                        let vin = {
                            acceptNum: this.acceptNum,
                            formSeq: this.formSeq,
                            fileNo: this.selectedAttachment.fileNo,
                            fileCode: this.selectedAttachment.fileCode,
                            fileName: this.selectedAttachment.fileName,
                            originalFileName: this.selectedAttachment.originalFileName,
                            fileExt: this.getFileExt(this.selectedAttachment.originalFileName),
                            category: "ATTACHMENT",
                            file: this.selectedAttachment.base64,
                            needSeal: this.selectedAttachment.needSeal,
                            empNo: this.empNo,
                            region: this.region,
                        };
            
                        AjaxService.post("/tpesForm/uploadFile", vin, 
                        (response) => {
                            // 驗證是否成功
                            if (!response.restData.success) {              
                                MessageService.showError(response.restData.message,'上傳檔案');
                                return;
                            }
                            
                            // 重新查詢
                            this.formInit(true);
                        },
                        (error) => {
                            MessageService.showSystemError();
                            console.log(error);
                        });
                    }
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
        async save(){
            if(!this.validateCertifate()){
                return;
            }

            // 驗證若為 NCPS 且為本人進件，需簽名才可儲存
            if(this.isAgent != "Y" && this.applyType == "NCPS" && (!this.customerSign || !this.customerSign.imgSrc)){
                MessageService.showInfo("需簽名後才可儲存");
                return;
            }

            let vin = this.setSaveFormVin();

            AjaxService.post("/tpesForm/save", vin, 
            async (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'儲存表單');
                    return;
                }

                MessageService.showSuccess("儲存成功");

                if(this.restrictMode){
                    // 當點擊儲存按鈕，則通知父層可關閉
                    this.$emit("saveFile");
                }
                else{
                    // 開啟滿意度調查頁
                    await this.openPortal();
                    
                    // 重新查詢一次
                    this.formInit(true);

                    // 擋頁
                    this.isBlocking = true;
                    this.blockingMsg = "已儲存成功";
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
                            fileCode: certificate.fileCode,
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
                            fileCode: certificate.fileCode,
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
                            fileCode: attachment.fileCode,
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
                            fileCode: attachment.fileCode,
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
            if(this.checkNeedScanFile(true)){
                this.$emit("accountingSubmit", this.accountingMemo);
            }
            else{
                let msg = "尚需掃描並上傳 ";

                if(this.needScanFileHint){
                    msg += this.needScanFileHint
                }

                if(this.needScanAttachHint){
                    if(this.needScanFileHint){
                        msg += "、"
                    }

                    msg += this.needScanAttachHint
                }

                MessageService.showInfo(msg);
            }
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

                // 擋頁
                this.isBlocking = true;
                this.blockingMsg = "已取消成功";
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
        checkNeedScanFile(onlyForCheck){
            this.needScanFileHint = "";

            this.needScanFileList = Array.from(this.oriNeedScanFileList);

            // 證件
            if(!ValidateUtil.isEmpty(this.needScanFileList)){
                for (let index = 0 ; index < this.needScanFileList.length ; index++) {

                    let needScanFile = this.needScanFileList[index];

                    if(!ValidateUtil.isEmpty(this.certificateList) && needScanFile != null){
                        for (let certificate of this.certificateList) {
                            // 若已有掃描的證件，將 file 從 List 移除，最後剩下來的就是還沒掃描的
                            if(!ValidateUtil.isEmpty(needScanFile.fileCode) 
                                && certificate.fileCode == needScanFile .fileCode
                                && needScanFile.category == "CERTIFICATE"
                                && !ValidateUtil.isEmpty(certificate.fileNo)){

                                this.needScanFileList.splice(index, 1);
                                index--;
                                break;
                            }
                        }
                    }
                }
            }

            // 證件整理
            if(!ValidateUtil.isEmpty(this.needScanFileList)){
                for (let needScanFile of this.needScanFileList) {
                    for(let certificateOption of this.certificateOptions){
                        // 放入缺少的證件
                        if(certificateOption.fileCode == needScanFile.fileCode 
                            && needScanFile.category == "CERTIFICATE"){
                            this.needScanFileHint = this.needScanFileHint ? this.needScanFileHint + "、" + certificateOption.fileName : certificateOption.fileName;
                        }
                    }
                }
            }

            // 附件
            this.onlySealFileCode = null;
            this.acctUploadFileCode = null;
            if(!ValidateUtil.isEmpty(this.needScanFileList)){

                let isUploadedSpecificFile = false;
                let acctUploadFileOption = {};
                let acctUploadFileSealFlag = null;

                for (let index = 0 ; index < this.needScanFileList.length ; index++) {

                    let needScanFile = this.needScanFileList[index];

                    if(needScanFile != null && needScanFile.category == "ATTACHMENT"){
                        // 若為指定套印專用章的附件則取出限制的 fileCode
                        if(needScanFile.sealFlag == "Y"){
                            this.onlySealFileCode = needScanFile.fileCode;
                        }

                        // 若為可於核算時補件之附件則檢查是否已上傳，若無則新增欄位並開啟上傳按鈕
                        if(needScanFile.acctUploadFlag == "Y"){
                            this.acctUploadFileCode = needScanFile.fileCode;
                            acctUploadFileSealFlag = needScanFile.sealFlag;

                            for(let attachmentOption of this.attachmentOptions){
                                if(attachmentOption.fileCode == this.acctUploadFileCode){
                                    acctUploadFileOption = attachmentOption;
                                    break;
                                }
                            }
                        }
                    }

                    if(!ValidateUtil.isEmpty(this.attachmentList) && needScanFile != null){
                        for (let attachment of this.attachmentList) {
                            if(!onlyForCheck && !ValidateUtil.isEmpty(this.acctUploadFileCode) && this.acctUploadFileCode == attachment.fileCode && !ValidateUtil.isEmpty(attachment.fileNo)){
                                isUploadedSpecificFile = true;
                                attachment.canAcctUpload = true;
                                attachment.needSeal = (acctUploadFileSealFlag == "Y");
                            }

                            // 若已有掃描的附件，將 file 從 List 移除，最後剩下來的就是還沒掃描的
                            if(!ValidateUtil.isEmpty(needScanFile.fileCode) 
                                && attachment.fileCode == needScanFile.fileCode
                                && needScanFile.category == "ATTACHMENT"
                                && !ValidateUtil.isEmpty(attachment.fileNo)){
        
                                this.needScanFileList.splice(index, 1);
                                index--;
                                break;
                            }
                        }
                    }
                }
                
                // 若於核算時，規則有核算時可補件之附件則檢查是否已上傳，若無則新增欄位並開啟上傳按鈕
                if(!onlyForCheck && this.formPageMode == "accounting" && !ValidateUtil.isEmpty(this.acctUploadFileCode) && !isUploadedSpecificFile){
                    this.attachmentList.push({
                        id: this.attachmentNo,
                        fileName: acctUploadFileOption.fileName,
                        fileCode: acctUploadFileOption.fileCode,
                        originalFileName: null,
                        fileNo: null,
                        filePath: null,
                        imgSrc: null,
                        base64: null,
                        hasEdit: false,
                        needSeal: acctUploadFileSealFlag == "Y",
                        canOnlyView: false,
                        isSelecting: false,
                        canAcctUpload: true,
                    });
                    this.attachmentNo++;
                }

            }

            // 附件整理
            this.needScanAttachHint = "";
            if(!ValidateUtil.isEmpty(this.needScanFileList)){
                for (let needScanFile of this.needScanFileList) {
                    for(let attachmentOption of this.attachmentOptions){
                        // 放入缺少的附件
                        if(attachmentOption.fileCode == needScanFile.fileCode 
                            && needScanFile.category == "ATTACHMENT"){
                            this.needScanAttachHint = this.needScanAttachHint ? this.needScanAttachHint + "、" + attachmentOption.fileName : attachmentOption.fileName;
                        }
                    }
                }
            }

            return ValidateUtil.isEmpty(this.needScanFileList);
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
        async openPortal() {
            // 開啟滿意度調查頁
            let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
            this.windowRef = window.open("/tpes/#/satisfaction/answer?acceptNum=" + this.acceptNum, '_blank', config);
            this.windowRef.document.title = 'TPES-問卷';
            this.windowRef.addEventListener("beforeunload", this.closePortal);
        },
        closePortal() {
          if (this.windowRef) {
            let answered = this.windowRef.document.getElementById('answered')
            this.windowRef.close();
            this.windowRef = null;
            if (answered.value == 'true'){
              MessageService.showSuccess('客戶問卷填寫')
            } else {
              MessageService.showInfo('客戶放棄問卷填寫','問卷調查')
            }
          }
        },
        clearAttachment(attachment){
            attachment.originalFileName = null;
            attachment.imgSrc = null;
            attachment.file = null;
            attachment.base64 = null;
            attachment.needSeal = this.selectedAttachment.needSeal;
            attachment.hasEdit = true;
            attachment.canAcctUpload = (this.acctUploadFileCode == attachment.fileCode);
        }
    }
}