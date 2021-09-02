<template>
    <v-app>
        <v-container>
            <v-row justify="center">
                <tui-image-editor ref="tuiImageEditor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
            </v-row>
            <hr style="margin-top: 30px;margin-bottom: 30px;">
            <v-row justify="center">
                <v-btn style="width:200px;" @click="downloadFile()" depressed color="primary">DOWNLOAD</v-btn>
            </v-row>
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
    props: {
    
    },
    components: {
        'tui-image-editor': ImageEditor
    },
    mounted() {
        document.getElementsByClassName("tui-image-editor-header-buttons")[0].display = 'none';
        AjaxService.post("/imageEditor/init", {}, (response) => {
            let binaryString = window.atob(response.restData.bytes);
          
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; ++i) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            let blob = new Blob([bytes], { type: 'image/jpeg' });
            this.$refs.tuiImageEditor.invoke('loadImageFromFile', blob, 'test.jpg').then((res) => {
                this.$refs.tuiImageEditor.editorInstance.ui.activeMenuEvent();

                let newSize = {
                    newWidth: (res.newWidth + 100) + "",
                    newHeight: (res.newHeight + 100) + ""
                }
                this.$refs.tuiImageEditor.editorInstance.ui.resize(newSize);
            });
        });
    },
    data() {
        return {
            useDefaultUI: true,
            options: {
                // for tui-image-editor component's "options" prop
                cssMaxWidth: 700,
                cssMaxHeight: 2000,
                includeUI: {
                    uiSize: {
                        width: "1000px",
                        height: "700px"
                    },
                    menu: ['draw', 'text', 'shape'],
                    theme: {
                        "header.display": "none"
                    }
                }
            }
        }
    },
    methods: {
        downloadFile() {
            let param = {
                image: this.$refs.tuiImageEditor.editorInstance.toDataURL()
            }

            AjaxService.post("/imageEditor/downloadImage", param, (response) => {
                console.log(response);
            });
        }
    }
}
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }
</style>