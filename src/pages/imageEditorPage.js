import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import moment from 'moment';
import ImageEditor from '@toast-ui/vue-image-editor/src/ImageEditor.vue';
import AjaxService from '@/assets/services/ajax.service.js';
import MessageService from "@/assets/services/message.service";

export default {
    name: 'ImageEditor',
    components: {
        'tui-image-editor': ImageEditor
    },
    data() {
        return {
            mode: "edit",
            formFileNo: null,
            editedFormFileNo: null,
            signFileNo: null,
            acceptNum: null,
            formSeq: null,
            options: {
                cssMaxWidth: 2000,
                cssMaxHeight: 2000,
                includeUI: {
                    uiSize: {
                        width: "100%",
                        height: "800px"
                    },
                    menu: ['draw', 'text', 'shape'],
                    theme: {
                        "header.display": "none"
                    },
                },
                usageStatistics: false,
                selectionStyle: {
                    cornerColor: '#8E8E8E',
                    borderColor: '#8E8E8E',
                    rotatingPointOffset: 20
                }
            },
            signaturePadStyle: {
                'background-color': 'white',
                'border': '1px solid #D9D9D9'
            },
            signatureOptions: {
                backgroundColor: 'rgba(255,0,0,0)', 
                // 原套件會根據在同一點停留的時間決定寫出來的粗細，這邊把最大最小寬度調整相同，就可以保證粗細一致
                minWidth: 5, 
                maxWidth: 5
            },
            isSign: false,
            maxSignVersion: 1,
        }
    },
    created() {
        this.$nextTick(() => {
            this.formFileNo = window.formFileNo;
            this.editedFormFileNo = window.editedFormFileNo;
            this.signFileNo = window.signFileNo;
            this.acceptNum = window.acceptNum;
            this.formSeq = window.formSeq;
            this.mode = window.mode;
            this.maxSignVersion = window.maxSignVersion;

            this.queryFormImage();
        });
    },
    mounted() {
        // 套件自帶的 click function 在讀取後端傳的 outputStream 的情況下會出錯，這邊自己綁一個 function 實現 reset 功能
        document.getElementsByClassName("tie-btn-reset")[0].addEventListener('click', () => {
            this.resetZoom();
        });

        this.$emit("showOnlyContent");
    },
    methods: {
        queryFormImage(){
            let param = {
                fileNo: this.formFileNo,
                signFileNo: this.signFileNo,
                formSeq: this.formSeq
            }

            AjaxService.post("/tpesForm/queryFormImage", param, 
                (response) => {
                    // 驗證是否成功
                    if (!response.restData.success) {
                        MessageService.showError(response.restData.message,'查詢表單圖片');
                        return;
                    }

                    let binaryString = window.atob(response.restData.formImageBytes);
            
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; ++i) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }

                    let blob = new Blob([bytes], { type: 'image/jpeg' });
                    this.$refs.tuiImageEditor.invoke('loadImageFromFile', blob, 'test.jpg').then(() => {
                        // 啟動 menu 功能，如果不呼叫此 function ，會無法做編輯
                        this.$refs.tuiImageEditor.editorInstance.ui.activeMenuEvent();
                        // 套件把"讀取圖片"也算是一個動作，把 undo stack 清掉避免 user 誤觸 undo 導致圖片消失
                        this.$refs.tuiImageEditor.editorInstance.clearUndoStack();
                },
                (error) => {
                    MessageService.showSystemError();
                    console.log(error);
                });
            });
        },
        downloadFile() {
            let param = {
                image: this.$refs.tuiImageEditor.editorInstance.toDataURL()
            }

            AjaxService.post("/imageEditor/downloadImage", param, (response) => {
                console.log(response);
            });
        },
        resetZoom() {
            console.log("reset");
            this.$refs.tuiImageEditor.editorInstance.resetZoom();
            this.zoom = 1.0;
        },
        clearSign(){
            this.$refs.signaturePad.clearSignature();
        },
        async save(){
            let isSucess = true;

            // 狀態不為取消才儲存編輯後的表單圖片
            if(this.mode != "cancel"){
                isSucess = await this.saveEditedFormImage();
            }

            if(isSucess){
                this.saveSign();
            }
        },
        async saveEditedFormImage(){
            let isSucess = false;
            let formImage = this.$refs.tuiImageEditor.editorInstance.toDataURL();

            if(!formImage){
                return isSucess;
            }

            let fileExt = "." + formImage.split(";")[0].split("/")[1];

            let vin = {
                acceptNum: this.acceptNum,
                formSeq: this.formSeq,
                fileNo: this.editedFormFileNo,
                fileName: "重點說明表單圖片 (" + moment(new Date).format('YYYY-MM-DD') +")",
                originalFileName: "editedForm (" + moment(new Date).format('YYYY-MM-DD') +")" + fileExt,
                fileExt: fileExt,
                category: "EDITED_FORM",
                file: formImage,
                needSeal: false,
            };

            await AjaxService.post("/tpesForm/uploadFile", vin, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'上傳檔案');
                    return;
                }

                this.editedFormFileNo = response.restData.fileNo;

                isSucess = true;
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
            
            return isSucess;
        },
        saveSign(){
            let { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            
            if(isEmpty){
                MessageService.showInfo("尚未簽名");
                return;
            }

            let vin = {
                acceptNum: this.acceptNum,
                formSeq: this.formSeq,
                fileNo: this.signFileNo,
                fileName: (this.mode == "cancel") ? "客戶簽名(取消表單)" : "客戶簽名",
                originalFileName: (this.mode == "cancel") ? "cancelSign.png" : "customerSign.png",
                fileExt: ".png",
                category: (this.mode == "cancel") ? "CANCEL_SIGN" : "SIGN",
                file: data,
                needSeal: false,
                version: this.maxSignVersion + 1,
            };

            AjaxService.post("/tpesForm/uploadFile", vin, 
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'上傳檔案');
                    return;
                }

                MessageService.showSuccess("儲存成功");

                this.signFileNo = response.restData.fileNo;

                window.close();
            },
            (error) => {
                MessageService.showSystemError();
                console.log(error);
            });
        }
    }
}