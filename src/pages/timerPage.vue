<template>
  <v-app>
    <v-container>
      <v-row>
        <h1>Word to Pdf</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn @click="importWordModalShow=true;wordConvertType='pdf';">CHOOSE FILE</v-btn>
      </v-row>
      <span class="marginLeft"><h4>used time: {{ wordToPdfTime }} s.</h4></span>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Excel to Pdf</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn @click="importExcelModalShow=true;excelConvertType='pdf';">CHOOSE FILE</v-btn>
      </v-row>
      <span class="marginLeft"><h4>used time: {{ excelToPdfTime }} s.</h4></span>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Word to Image</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn @click="importWordModalShow=true;wordConvertType='img';">CHOOSE FILE</v-btn>
      </v-row>
      <span class="marginLeft"><h4>used time: {{ wordToImgTime }} s.</h4></span>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Excel to Image</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn @click="importExcelModalShow=true;excelConvertType='img';">CHOOSE FILE</v-btn>
      </v-row>
      <span class="marginLeft"><h4>used time: {{ excelToImgTime }} s.</h4></span>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Test PMC</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn class="mr-3" @click="openNewWindow()">OPEN CHROME</v-btn>
        <v-btn class="mr-3" @click="dualScreenExtend()">EXTEND</v-btn>
        <v-btn @click="dualScreenClone()">CLONE</v-btn>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
    </v-container>
    <v-dialog id="importWordModal" v-model="importWordModalShow" width="370">
      <v-card>
        <v-row class="mb-1">
          <v-col>
            <v-file-input 
              ref="wordInput"
              v-model="uploadWord" 
              accept=".doc,.docx" 
              :required="true"
              :state="Boolean(uploadWord)"
              placeholder="請選擇檔案..."
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="normal" @click="importWordModalShow=false;">CANCEL</v-btn>
          <v-btn v-if="wordConvertType === 'pdf'" color="primary" @click="convertWordToPdf()">CONVERT</v-btn>
          <v-btn v-if="wordConvertType === 'img'" color="primary" @click="convertWordToImg()">CONVERT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog id="importExcelModal" v-model="importExcelModalShow" width="370">
      <v-card>
        <v-row class="mb-1">
          <v-col>
            <v-file-input 
              ref="excelInput"
              v-model="uploadExcel" 
              accept=".xls" 
              :required="true"
              :state="Boolean(uploadExcel)"
              placeholder="請選擇檔案..."
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="normal" @click="importExcelModalShow=false;">CANCEL</v-btn>
          <v-btn v-if="excelConvertType === 'pdf'" color="primary" @click="convertExcelToPdf()">CONVERT</v-btn>
          <v-btn v-if="excelConvertType === 'img'" color="primary" @click="convertExcelToImg()">CONVERT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AjaxService from '@/assets/services/ajax.service.js';
import PMCService from '@/assets/services/pmc.service.js';

export default {
    name: 'StylePromo',
    props: {
    
    },
    data() {
        return {
            wordConvertType: 'pdf',
            excelConvertType: 'pdf',
            wordToPdfTime: '',
            excelToPdfTime: '',
            wordToImgTime: '',
            excelToImgTime: '',
            importWordModalShow: false,
            importExcelModalShow: false,
            uploadWord: null,
            uploadExcel: null,
        }
    },
    methods: {
        convertWordToPdf() {
            // 檢查有選擇檔案
            if (!this.$refs.wordInput.valid) {
                console.log('請選擇檔案');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.uploadWord);

            AjaxService.post('/timer/convertWordToPdf', formData, (response) => {
                this.wordToPdfTime = response.restData;
            });
            
            this.importWordModalShow = false;
        },
        convertExcelToPdf() {
            // 檢查有選擇檔案
            if (!this.$refs.excelInput.valid) {
                console.log('請選擇檔案');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.uploadExcel);

            AjaxService.post('/timer/convertExcelToPdf', formData, (response) => {
                this.excelToPdfTime = response.restData;
            });
            
            this.importExcelModalShow = false;
        },
        convertWordToImg() {
            // 檢查有選擇檔案
            if (!this.$refs.wordInput.valid) {
                console.log('請選擇檔案');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.uploadWord);

            AjaxService.post('/timer/convertWordToImg', formData, (response) => {
                this.wordToImgTime = response.restData;
            });
            
            this.importWordModalShow = false;
        },
        convertExcelToImg() {
            // 檢查有選擇檔案
            if (!this.$refs.excelInput.valid) {
                console.log('請選擇檔案');
                return;
            }

            let formData = new FormData();
            formData.append('file', this.uploadExcel);

            AjaxService.post('/timer/convertExcelToImg', formData, (response) => {
                this.excelToImgTime = response.restData;
            });
            
            this.importExcelModalShow = false;
        },
        openNewWindow() {
          PMCService.callBrowserAdapter('https://www.google.com');
        },
        dualScreenExtend() {
          PMCService.callDualScreenAdapterExtend();
        },
        dualScreenClone() {
          PMCService.callDualScreenAdapterClone();
        }
    }
}
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }
</style>