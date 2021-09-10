<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <tui-image-editor ref="tuiImageEditor" :include-ui="true" :options="options" />
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="center">
        <v-btn style="width:200px; margin: 5px;" depressed color="primary" @click="downloadFile()">DOWNLOAD</v-btn>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <!-- 以下 button 可觸發 imageEditor menu 各功能，可支援自定義 button 樣式，目前不會用到 -->
      <!-- <v-row justify="center">
        <v-btn style="width:200px; margin: 5px;" @click="deleteSelectObject()" depressed color="primary">DELETE</v-btn>
          <v-btn style="width:200px; margin: 5px;" @click="clearAllObject()" depressed color="primary">DELETE ALL</v-btn>
        </v-row>
        <hr style="margin-top: 30px;margin-bottom: 30px;">
        <v-row justify="center">
          <v-btn style="width:200px; margin: 5px;" @click="undo()" depressed color="primary">UNDO</v-btn>
          <v-btn style="width:200px; margin: 5px;" @click="redo()" depressed color="primary">REDO</v-btn>
        </v-row>
        <hr style="margin-top: 30px;margin-bottom: 30px;">
        <v-row justify="center">
          <v-btn style="width:200px; margin: 5px;" v-if="!draggable" @click="changeDragStatus()" depressed color="primary">DRAG</v-btn>
          <v-btn style="width:200px; margin: 5px;" v-if="draggable" @click="changeDragStatus()" depressed color="primary">UNDRAG</v-btn>
          <v-btn style="width:200px; margin: 5px;" @click="zoomIn()" depressed color="primary">ZOOM IN</v-btn>
          <v-btn style="width:200px; margin: 5px;" @click="zoomOut()" depressed color="primary">ZOOM OUT</v-btn>
          <v-btn style="width:200px; margin: 5px;" @click="resetZoom()" depressed color="primary">RESET</v-btn>
        </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;"> -->
    </v-container>
  </v-app>
</template>

<script>
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/vue-image-editor/src/ImageEditor.vue';
import AjaxService from '@/assets/services/ajax.service.js';

export default {
    name: 'ImageEditor',
    components: {
        'tui-image-editor': ImageEditor
    },
    data() {
        return {
            options: {
                cssMaxWidth: 2000,
                cssMaxHeight: 2000,
                includeUI: {
                    uiSize: {
                        width: "1500px",
                        height: "800px"
                    },
                    menu: ['draw', 'text', 'shape'],
                    theme: {
                        "header.display": "none"
                    }
                },
                usageStatistics: false,
                selectionStyle: {
                    cornerColor: '#8E8E8E',
                    borderColor: '#8E8E8E',
                    rotatingPointOffset: 20
                }
            },
            // 用來配合觸發 ImageEditor menu botton 功能，目前用不到
            zoom: 1.0,
            draggable: false
        }
    },
    mounted() {
        // 套件自帶的 click function 在讀取後端傳的 outputStream 的情況下會出錯，這邊自己綁一個 function 實現 reset 功能
        document.getElementsByClassName("tie-btn-reset")[0].addEventListener('click', () => {
            this.resetZoom();
        });
        AjaxService.post("/imageEditor/init", {}, (response) => {
            let binaryString = window.atob(response.restData.bytes);
          
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
            });
        });
    },
    methods: {
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
        // 以下 method 可觸發 imageEditor menu button 功能 (目前不會用到)
        // undo() {
        //     this.$refs.tuiImageEditor.editorInstance.undo();
        // },
        // redo() {
        //     this.$refs.tuiImageEditor.editorInstance.redo();
        // },
        // zoomIn() {
        //     if(this.zoom < 5.0) {
        //         this.zoom += 0.5;
        //         this.$refs.tuiImageEditor.editorInstance.zoom({
        //             x: 100,
        //             y: 100,
        //             zoomLevel: this.zoom
        //         })
        //     }
        // },
        // zoomOut() {
        //     if(this.zoom > 1.0) {
        //         this.zoom -= 0.5;
        //         this.$refs.tuiImageEditor.editorInstance.zoom({
        //             x: 100,
        //             y: 100,
        //             zoomLevel: this.zoom
        //         })
        //     }
        // }, 
        // changeDragStatus() {
        //     if(!this.draggable) {
        //         // 先清除原本的 mode
        //         this.$refs.tuiImageEditor.editorInstance.stopDrawingMode();
        //         this.$refs.tuiImageEditor.editorInstance._graphics.startHandMode();
        //         this.$refs.tuiImageEditor.editorInstance._graphics._drawingMode = "ZOOM";
        //         this.draggable = true;
        //     } else {
        //         this.$refs.tuiImageEditor.editorInstance._graphics.endHandMode();
        //         this.$refs.tuiImageEditor.editorInstance.stopDrawingMode();
        //         this.draggable = false;
        //     }
        // },
        // deleteSelectObject() {
        //     this.$refs.tuiImageEditor.editorInstance.removeActiveObject();
        // },
        // clearAllObject() {
        //     this.$refs.tuiImageEditor.editorInstance.clearObjects();
        // }
    }
}
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }

    .tui-image-editor-help-menu {
        display: none !important;
    }
</style>