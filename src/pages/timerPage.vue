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

      <v-row>
        <h1>Test Wsdl - EmpWebService.getEmpInfoByEmp</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="getEmpInfoByEmpReq.empNo"
          label="empNo"
          placeholder="empNo"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getEmpInfoByEmpReq.user"
          label="user"
          placeholder="user"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getEmpInfoByEmpReq.password"
          label="password"
          placeholder="password"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="getEmpInfoByEmp()">submit</v-btn>
        <span class="ml-2">URL: http://s02402040.taipower.com.tw/PIWS_00717/EmpService.asmx?WSDL</span>
      </v-row>

      <v-row>
        <h1>Test Wsdl - EmpWebService.getDeptEmpList</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="getDeptEmpListReq.division"
          label="division"
          placeholder="division"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getDeptEmpListReq.department"
          label="department"
          placeholder="department"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getDeptEmpListReq.user"
          label="user"
          placeholder="user"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getDeptEmpListReq.password"
          label="password"
          placeholder="password"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="getDeptEmpList()">submit</v-btn>
        <span class="ml-2">URL: http://s02402040.taipower.com.tw/PIWS_00717/EmpService.asmx?WSDL</span>
      </v-row>

      <v-row>
        <h1>Test Wsdl - LTWebService1.getLEAInfo</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.queryDiv"
          label="queryDiv"
          placeholder="queryDiv"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.queryDep"
          label="queryDep"
          placeholder="queryDep"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.querySec"
          label="querySec"
          placeholder="querySec"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.queryBeginDate"
          label="queryBeginDate"
          placeholder="queryBeginDate (yyyyMMdd)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.queryEndDate"
          label="queryEndDate"
          placeholder="queryEndDate (yyyyMMdd)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.user"
          label="user"
          placeholder="user"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getLEAInfoReq.password"
          label="password"
          placeholder="password"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="getLEAInfo()">submit</v-btn>
        <span class="ml-2">URL: http://s02402040.taipower.com.tw/LTWS_007/LTWebService1.asmx?WSDL</span>
      </v-row>

      <v-row>
        <h1>Test Wsdl - SSOWebService.getResult</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="getResultReq.apUid"
          label="AP_UID"
          placeholder="AP_UID"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getResultReq.userId"
          label="USER_ID"
          placeholder="USER_ID"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getResultReq.timestamp"
          label="TIMESTAMP"
          placeholder="TIMESTAMP"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getResultReq.apX"
          label="AP_X"
          placeholder="AP_X"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="getResultReq.userX"
          label="USER_X"
          placeholder="USER_X"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="getResult()">submit</v-btn>
        <span class="ml-2">URL: http://10.16.9.126:8080/SSO_WEBSERVICE/services/SSOPWDCHECK_X2</span>
      </v-row>

      <v-row>
        <h1>Test NCPS API - TPES_01 (取得登記單檔案)</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes01Req.region"
          label="DITR_NO (區處代碼)"
          placeholder="DITR_NO (區處代碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes01Req.acceptNum"
          label="FM_NO (受理號碼)"
          placeholder="FM_NO (受理號碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes01Req.fmbhNo"
          label="FMBH_NO (受理分號)"
          placeholder="FMBH_NO (受理分號)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes01Req.apitCod"
          label="APIT_COD (申請項目編號)"
          placeholder="APIT_COD (申請項目編號)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="tpes01()">submit</v-btn>
        <span class="ml-2">URL: http://10.209.5.125/66/api/TRE0000/TPES_01/</span>
      </v-row>

      <v-row>
        <h1>Test NCPS API - TPES_02 (核算退件通知)</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes02Req.region"
          label="DITR_NO (區處代碼)"
          placeholder="DITR_NO (區處代碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes02Req.acceptNum"
          label="FM_NO (受理號碼)"
          placeholder="FM_NO (受理號碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes02Req.fmbhNo"
          label="FMBH_NO (受理分號)"
          placeholder="FMBH_NO (受理分號)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes02Req.backReason"
          label="BACK_REASON (核算退件原因)"
          placeholder="BACK_REASON (核算退件原因)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="tpes02()">submit</v-btn>
        <span class="ml-2">URL: http://10.209.5.125/66/api/TRE0000/TPES_02/</span>
      </v-row>

      <v-row>
        <h1>Test NCPS API - TPES_03 (核算確認歸檔通知)</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes03Req.region"
          label="DITR_NO (區處代碼)"
          placeholder="DITR_NO (區處代碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes03Req.acceptNum"
          label="FM_NO (受理號碼)"
          placeholder="FM_NO (受理號碼)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-text-field
          v-model="tpes03Req.fmbhNo"
          label="FMBH_NO (受理分號)"
          placeholder="FMBH_NO (受理分號)"
        />
      </v-row>
      <v-row class="marginLeft">
        <v-btn @click="tpes03()">submit</v-btn>
        <span class="ml-2">URL: http://10.209.5.125/66/api/TRE0000/TPES_03/</span>
      </v-row>

      <v-row>
        <h1>Test Batch</h1>
      </v-row>
      <v-row class="marginLeft" style="display: flex; align-items: center;">
        <span class="mr-2">sendWaitArchiveToNCPS (待歸檔送件至NCPS)</span>
        <v-btn @click="sendWaitArchiveToNCPS()">start</v-btn>
      </v-row>
      <v-row class="marginLeft mt-7" style="display: flex; align-items: center;">
        <span class="mr-2">updateTpesFromPis (PIS API員工資料查詢並更新TPES員工與角色)</span>
        <v-btn @click="updateTpesFromPis()">start</v-btn>
      </v-row>
      <v-row class="marginLeft mt-7" style="display: flex; align-items: center;">
        <span class="mr-2">updateAgentApplicationFromLts (LTS API 從差假管理系統取得人員差勤資料並更新到代理申請table中 Batch)</span>
        <v-btn @click="updateAgentApplicationFromLts()">start</v-btn>
      </v-row>
      <v-row class="marginLeft mt-7" style="display: flex; align-items: center;">
        <span class="mr-2">confirmArchive (取得 NBS 變動失敗清單)</span>
        <v-btn @click="confirmArchive()">start</v-btn>
      </v-row>
      <v-row class="marginLeft mt-7" style="display: flex; align-items: center;">
        <span class="mr-2">generateRejectReport (產出退件報表)</span>
        <v-btn @click="generateRejectReport()">start</v-btn>
      </v-row>

      <v-row>
        <h1>Test 問卷作答</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-btn class="mr-3" @click="openPortal()">開啟問卷作答 (舊樣式)</v-btn>
        <v-btn class="mr-3" @click="openNewPortal()">開啟問卷作答 (新樣式)</v-btn>
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
    <v-dialog id="showResponseModal" v-model="responseModalShow">
      <v-card>
        <v-card-title>Response</v-card-title>
        <v-row class="ml-1">
          <v-col>
            <span>{{ responseStr }}</span>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn color="normal" @click="responseModalShow=false;">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AjaxService from '@/assets/services/ajax.service.js';
import PMCService from '@/assets/services/pmc.service.js';
import MessageService from '@/assets/services/message.service';

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
            responseModalShow: false,
            responseStr: "",
            getEmpInfoByEmpReq: {
              empNo: null,
              user: null,
              password: null
            },
            getDeptEmpListReq: {
              division: null,
              department: null,
              user: null,
              password: null
            },
            getLEAInfoReq: {
              queryDiv: null,
              queryDep: null,
              querySec: null,
              queryBeginDate: null,
              queryEndDate: null,
              user: null,
              password: null
            },
            getResultReq: {
              apUid: null,
              userId: null,
              timestamp: null,
              apX: null,
              userX: null
            },
            tpes01Req: {
              region: null,
              acceptNum: null,
              fmbhNo: null,
              apitCod: null,
            },
            tpes02Req: {
              region: null,
              acceptNum: null,
              fmbhNo: null,
              backReason: null,
            },
            tpes03Req: {
              region: null,
              acceptNum: null,
              fmbhNo: null,
            }
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
        },
        getEmpInfoByEmp(){
          this.responseStr = "";

          AjaxService.post("/test/getEmpInfoByEmp", this.getEmpInfoByEmpReq, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        getDeptEmpList(){
          this.responseStr = "";

          AjaxService.post("/test/getDeptEmpList", this.getDeptEmpListReq, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        getLEAInfo(){
          this.responseStr = "";

          AjaxService.post("/test/getLEAInfo", this.getLEAInfoReq, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        getResult(){
          this.responseStr = "";

          AjaxService.post("/test/getResult", this.getResultReq, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        tpes01(){
          this.responseStr = "";

          AjaxService.post("/test/TPES_01", this.tpes01Req, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        tpes02(){
          this.responseStr = "";

          AjaxService.post("/test/TPES_02", this.tpes02Req, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        tpes03(){
          this.responseStr = "";

          AjaxService.post("/test/TPES_03", this.tpes03Req, 
            (response) => {
                this.responseStr = response.restData;
                this.responseModalShow = true;
            },
            (error) => {
                this.responseStr = error;
                this.responseModalShow = true;
            });
        },
        sendWaitArchiveToNCPS(){
          AjaxService.post("/batch/sendWaitArchiveToNCPS", {}, 
            (response) => {
                MessageService.showSuccess("成功");
            },
            (error) => {
                MessageService.showError("失敗");
            });
        },
        updateTpesFromPis(){
          AjaxService.post("/batch/updateTpesFromPis", {}, 
            (response) => {
                MessageService.showSuccess("成功");
            },
            (error) => {
                MessageService.showError("失敗");
            });
        },
        updateAgentApplicationFromLts(){
          AjaxService.post("/batch/updateAgentApplicationFromLts", {}, 
            (response) => {
                MessageService.showSuccess("成功");
            },
            (error) => {
                MessageService.showError("失敗");
            });
        },
        confirmArchive(){
          AjaxService.post("/batch/confirmArchive", {}, 
            (response) => {
                MessageService.showSuccess("成功");
            },
            (error) => {
                MessageService.showError("失敗");
            });
        },
        generateRejectReport(){
          AjaxService.post("/batch/generateRejectReport", {}, 
            (response) => {
                MessageService.showSuccess("成功");
            },
            (error) => {
                MessageService.showError("失敗");
            });
        },
        openPortal() {
          let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
          this.windowRef = window.open("/tpes/#/satisfaction/answer?acceptNum=" + '12345678', '滿意度調查', config);
          this.windowRef.addEventListener("beforeunload", this.closePortal);
        },
        closePortal() {
          if (this.windowRef) {
            this.windowRef.close();
            this.windowRef = null;
            MessageService.showSuccess('客戶已完成問卷填寫' + "✓")
          }
        },
        openNewPortal() {
          let config = 'statusbar=no,scrollbars=yes,status=no,location=no';
          this.windowNewRef = window.open("/tpes/#/satisfaction/answerTemp?acceptNum=" + '12345678', '滿意度調查', config);
          this.windowNewRef.addEventListener("beforeunload", this.closeNewPortal);
        },
        closeNewPortal() {
          if (this.windowNewRef) {
            this.windowNewRef.close();
            this.windowNewRef = null;
            MessageService.showSuccess('客戶已完成問卷填寫' + "✓")
          }
        },
    }
}
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }
</style>