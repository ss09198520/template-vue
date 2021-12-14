<template>
  <v-app>
    <!-- 擋件區 -->
    <div v-if="isBlocking" class="blocking-area">
      <span class="blocking-text" v-html="blockingMsg" />
    </div>
    <!-- loading -->
    <v-overlay :value="isLoading" z-index="5000">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-container>
      <v-row>
        <v-col v-show="showModeSelect" cols="3">
          <v-select
            v-model="formPageMode"
            :items="modeList"
            item-text="name"
            item-value="value"
            label="模式 (prototype only)"
          />
        </v-col>
        <v-col v-show="showModeSelect" cols="2">
          <v-btn depressed color="primary" @click="hideFiveSec()">
            隱藏5秒
          </v-btn>
        </v-col>
        <v-expansion-panels v-model="panel" flat accordion value="0" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2>表單及簽名</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6" class="d-center">
                  <v-btn v-if="isFormSignPageOpened" depressed color="primary" class="big-btn" @click="closeFormSignPage()">
                    <span class="pt-3">
                      <v-icon dark size="7vh">
                        mdi-close
                      </v-icon>
                      <br>
                      <div class="big-btn-text mt-2">關閉視窗</div>
                    </span>
                  </v-btn>
                  <v-btn v-else depressed color="primary" class="big-btn" @click="openFormSignPage()">
                    <span class="pt-3">
                      <v-icon dark size="7vh">
                        mdi-file-document-outline
                      </v-icon>
                      <br>
                      <div v-if="formPageMode==='accounting' || formPageMode=='view'" class="big-btn-text mt-2">檢視表單</div>
                      <div v-else-if="formPageMode==='cancel'" class="big-btn-text mt-2">取消表單簽名</div>
                      <div v-else class="big-btn-text mt-2">開啟表單及簽名</div>
                    </span>
                  </v-btn>
                </v-col>
                <v-col v-if="formPageMode!=='accounting' || formPageMode=='view'" cols="6">
                  <div class="sign-preview-area ma-auto">
                    <div class="h-10">簽名預覽</div>
                    <div class="h-90 d-center">
                      <img v-if="formPageMode==='cancel' && cancelSign.imgSrc" style="width: 100%; max-height: 100%" :src="cancelSign.imgSrc">
                      <img v-else-if="formPageMode != 'cancel' && customerSign.imgSrc" style="width: 100%; max-height: 100%" :src="customerSign.imgSrc">
                      <div v-else class="not-scan-area">
                        <span>尚未簽名</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-60 t-center ma-auto">
                    <v-btn color="info" text @click="querySign()">
                      重新整理
                      <v-icon
                        right
                        dark
                      >
                        mdi-refresh
                      </v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2 v-if="formPageMode == 'edit'">新增/刪除 證件</h2>
                <h2 v-else-if="certificateList == null || certificateList.length == 0">
                  證件 (無資料)
                </h2>
                <h2 v-else-if="formPageMode == 'cancel'">
                  證件 <span class="cancel-text">(若確定取消將在兩年後刪除)</span>
                </h2>
                <h2 v-else>
                  證件
                </h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row v-if="needScanFileHint && (formPageMode == 'edit' || formPageMode == 'accounting')" class="mb-2">
                  <v-col cols="12">
                    <span class="hint-text">提示：尚須掃描並上傳 {{ needScanFileHint }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-for="(certificate, index) in certificateList" :key="certificate.id" cols="3" class="mb-2">
                    <v-row>
                      <v-col cols="12" style="text-align: center;">
                        <v-btn
                          v-if="certificate.isAdditional && !certificate.fileName"
                          depressed
                          color="primary"
                          @click="openSetCertificateModal(certificate)"
                        >
                          設定類型
                          <v-icon
                            right
                            dark
                          >
                            mdi-lead-pencil
                          </v-icon>
                        </v-btn>
                        <div v-else-if="certificate.isAdditional" class="d-center">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <h3>
                                <a 
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="openSetCertificateModal(certificate)"
                                >
                                  {{ certificate.fileName }}
                                </a>
                              </h3>
                            </template>
                            <span>修改證件類型</span>
                          </v-tooltip>
                        </div>
                        <h3 v-else>{{ certificate.fileName }}</h3>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div class="img-area d-center">
                          <img v-if="certificate.imgSrc" style="width: 100%; max-height: 100%" :src="certificate.imgSrc">
                          <div v-else class="not-scan-area">
                            <span>尚未掃描</span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col v-if="formPageMode == 'edit'" cols="6" class="t-center">
                        <v-btn depressed color="error" @click="deleteCertificate(index)">
                          刪除
                          <v-icon
                            right
                            dark
                          >
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col v-if="formPageMode == 'accounting' || formPageMode=='view' || formPageMode == 'viewDownload' || formPageMode == 'edit'" :cols="(formPageMode == 'edit' ? 6 : 12)" class="t-center">
                        <v-btn depressed color="normal" :disabled="!certificate.imgSrc" @click="viewImage(certificate)">
                          檢視
                          <v-icon
                            right
                            dark
                          >
                            mdi-eye
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-if="formPageMode == 'edit'" cols="3" class="add-attachment-area d-center">
                    <v-row>
                      <v-col cols="12" class="d-center">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="mx-2"
                              fab
                              dark
                              depressed
                              color="primary"
                              v-bind="attrs"
                              v-on="on"
                              @click="scanCertificate()"
                            >
                              <v-icon dark>
                                mdi-scanner
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>掃描證件</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2 v-if="formPageMode == 'edit'">新增/刪除 附件</h2>
                <h2 v-else-if="attachmentList == null || attachmentList.length == 0">
                  附件 (無資料)
                </h2>
                <h2 v-else-if="formPageMode == 'cancel'">
                  附件 <span class="cancel-text">(若確定取消將在兩年後刪除)</span>
                </h2>
                <h2 v-else>
                  附件
                </h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row v-if="isAgentNeedScanAttach && (formPageMode == 'edit' || formPageMode == 'accounting')" class="mb-2">
                  <v-col cols="12">
                    <span class="hint-text">提示：代理人需至少上傳一項附件</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-for="(attachment, index) in attachmentList" :key="attachment.id" cols="3" class="mb-2">                    
                    <v-row>
                      <v-col cols="12" style="text-align: center;">
                        <h3>{{ attachment.fileName }}</h3>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <div class="img-area d-center">
                          <img v-if="attachment.imgSrc" style="max-width: 100%; max-height: 100%" :src="attachment.imgSrc">
                          <div v-else-if="attachment.originalFileName" class="t-center">
                            <v-icon x-large class="mb-2">
                              mdi-file-document-outline
                            </v-icon><br>
                            {{ attachment.originalFileName }}
                          </div>
                          <div v-else-if="formPageMode == 'view'">
                            <span>附件檔名</span>
                          </div>
                          <div v-else class="not-scan-area">
                            <span>尚未上傳</span>
                          </div>
                        </div>
                      </v-col> 
                                           
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="d-center">
                        <v-checkbox 
                          v-if="checkIsWord(attachment)"
                          v-model="attachment.needSeal" 
                          :disabled="formPageMode != 'edit' || attachment.canOnlyView"
                          class="mt-0" 
                          label="套印專用章" 
                          color="success" 
                          hide-details
                          @change="checkNeedSeal(index, attachment.needSeal)"
                        />
                      </v-col>
                    </v-row>
                    <input
                      ref="uploaders"
                      class="d-none"
                      type="file"
                      @change="onFileChanged"
                    >
                    <v-row v-if="formPageMode == 'edit' && !attachment.canOnlyView">
                      <v-col cols="6" class="t-center">
                        <v-btn depressed color="error" @click="deleteAttachment(index)">
                          刪除
                          <v-icon
                            right
                            dark
                          >
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" class="t-center">
                        <v-btn depressed color="primary" :loading="attachment.isSelecting" @click="uploadFile(attachment, index)">
                          上傳
                          <v-icon
                            right
                            dark
                          >
                            mdi-cloud-upload
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row v-else-if="formPageMode == 'accounting' || formPageMode=='view' || formPageMode == 'viewDownload' || attachment.canOnlyView">
                      <v-col v-if="attachment.imgSrc" cols="12" class="t-center">
                        <v-btn depressed color="normal" @click="viewImage(attachment)">
                          檢視
                          <v-icon
                            right
                            dark
                          >
                            mdi-eye
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col v-else cols="12" class="t-center mt-3">
                        <v-btn depressed color="primary" :disabled="!attachment.filePath" @click="downloadFile(attachment)">
                          下載
                          <v-icon
                            right
                            dark
                          >
                            mdi-cloud-download
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3" class="add-attachment-area d-center">
                    <v-row>
                      <v-col cols="12" class="d-center">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-if="formPageMode == 'edit'"
                              class="mx-2"
                              fab
                              dark
                              depressed
                              color="primary"
                              v-bind="attrs"
                              v-on="on"
                              @click="openNewAttachmentModal()"
                            >
                              <v-icon dark>
                                mdi-plus
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>新增附件</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="formPageMode == 'accounting'">
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2>核算備註區</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" class="d-center">
                  <v-textarea
                    v-model="accountingMemo"
                    class="accouting-textarea"                   
                    outlined
                    placeholder="點選 [儲存備註並關閉]、[退件]、[核算通過] 都會進行儲存"
                    :no-resize="true"
                    counter="100"
                    auto-grow
                    rows="4"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="formPageMode == 'cancel'">
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2>取消原因</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" class="d-center">
                  <v-textarea
                    v-model="cancelReason"
                    class="accouting-textarea"                   
                    outlined
                    placeholder="請輸入原因"
                    :no-resize="true"
                    counter="100"
                    auto-grow
                    rows="4"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row v-if="formPageMode == 'edit'">
        <v-col cols="12" class="t-right">
          <v-btn depressed large color="success" @click="save()">
            <span style="font-size: 18px">儲存</span>
            <v-icon
              right
              dark
              style="font-size: 24px"
            >
              mdi-check
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="formPageMode == 'accounting'">
        <v-col cols="12" class="t-right">
          <v-btn depressed large color="#E98B2A" @click="saveComments()">
            <span style="font-size: 18px; color: white">儲存備註並關閉</span>
            <v-icon
              right
              dark
              style="font-size: 24px; color: white"
            >
              mdi-content-save
            </v-icon>
          </v-btn>
          <v-btn depressed large color="error" class="ml-3" @click="retrunOrder()">
            <span style="font-size: 18px">退件</span>
            <v-icon
              right
              dark
              style="font-size: 24px"
            >
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn depressed large color="success" class="ml-3" @click="accountingSubmit()">
            <span style="font-size: 18px">核算通過</span>
            <v-icon
              right
              dark
              style="font-size: 24px"
            >
              mdi-check
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="formPageMode == 'cancel'">
        <v-col cols="12" class="t-right">
          <v-btn depressed large color="error" @click="cancel()">
            <span style="font-size: 18px">確定取消</span>
            <v-icon
              right
              dark
              style="font-size: 24px"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- 檢視圖片 modal -->
    <v-dialog
      v-model="viewImageDialog"
      transition="dialog-bottom-transition"
      width="70vw"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
          {{ viewImageTitle ? viewImageTitle : "檢視" }}
        </v-card-title>
        
        <v-card-text class="d-center">
          <img style="max-width: 100%; max-height: 100%" :src="viewImageSrc">
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="viewImageDialog = false"
          >
            關閉
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 設定證件 modal -->
    <v-dialog 
      v-model="setCertificateModal" 
      transition="dialog-bottom-transition"
      width="70vw"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
          請選擇證件類別
        </v-card-title>
        <v-card-text>
          <v-row class="ma-3">
            <div v-for="(option, index) in certificateOptions" :key="option.fileCode">
              <v-chip
                v-if="setCertificateType === index"
                label 
                x-large 
                class="ma-2" 
                color="success"
                text-color="white"
              >
                <span>{{ option.fileName }}</span>
              </v-chip>
              <v-chip v-else label x-large class="ma-2" @click="selectCertificate(index)">
                <span>{{ option.fileName }}</span>
              </v-chip>
            </div>
          </v-row>
          <v-row class="ma-3">
            <v-chip
              v-if="setCertificateType === certificateOptions.length"
              label 
              x-large 
              class="ma-2" 
              color="success"
              text-color="white"
            >
              <span>其他證件:&emsp;</span>
              <v-text-field v-model="otherCertificate" class="chip-text-field" placeholder="請輸入證件類別" />
            </v-chip>
            <v-chip v-else label x-large class="ma-2" @click="selectCertificate(certificateOptions.length)">
              <span>其他證件</span>
            </v-chip>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="setCertificateModal = false"
          >
            &emsp;關閉&emsp;
          </v-btn>
          <v-btn
            color="success"
            :disabled="setCertificateType == -1 || (setCertificateType === certificateOptions.length && !otherCertificate)"
            @click="setCertificate()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 新增附件 modal -->
    <v-dialog 
      v-model="newAttachmentModal" 
      transition="dialog-bottom-transition"
      width="50vw"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
          請選擇附件類別
        </v-card-title>
        <v-card-text>
          <v-row class="ma-3">
            <div v-for="(option, index) in attachmentOptions" :key="option.fileName">
              <v-chip
                v-if="newAttachmentType === index"
                label 
                x-large 
                class="ma-2" 
                color="success"
                text-color="white"
              >
                <span>{{ option.fileName }}</span>
              </v-chip>
              <v-chip v-else label x-large class="ma-2" @click="selectAttachment(index)">
                <span>{{ option.fileName }}</span>
              </v-chip>
            </div>
          </v-row>
          <v-row class="ma-3">
            <v-chip
              v-if="newAttachmentType === attachmentOptions.length"
              label 
              x-large 
              class="ma-2" 
              color="success"
              text-color="white"
            >
              <span>其他佐證文件:&emsp;</span>
              <v-text-field v-model="otherAttachment" class="chip-text-field" placeholder="請輸入附件類別" />
            </v-chip>
            <v-chip v-else label x-large class="ma-2" @click="selectAttachment(attachmentOptions.length)">
              <span>其他佐證文件</span>
            </v-chip>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="newAttachmentModal = false"
          >
            &emsp;關閉&emsp;
          </v-btn>
          <v-btn
            color="success"
            :disabled="newAttachmentType == -1 || (newAttachmentType === attachmentOptions.length && !otherAttachment)"
            @click="addAttachment()"
          >
            &emsp;新增&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./FormPage.js">
</script>

<style scoped>
    .marginLeft {
      margin-left: 100px !important;
    }
    .h-10{
      height: 10%;
    }
    .h-90{
      height: 90%;
    }
    .h-100{
      height: 100%;
    }
    .w-60{
      width: 60%
    }
    .w-100{
      width: 100%;
    }
    .row + .row{
      margin-top: 0;
    }
    .panel-header{
      border-bottom: 3px solid rgba(0, 0, 0, 0.54);
    }
    .d-center{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .t-center{
      text-align: center;
    }
    .t-right{
      text-align: right;
    }
    .t-center >>> input {
      text-align: center
    }
    .h3 >>> input{
      font-size: 1.5625rem !important;
      line-height: 1.4em !important;
      margin-top: 20px;
      margin-bottom: 4px;
    }
    .big-btn{
      height: 20vh !important;
      width: 20vw !important;
    }
    .big-btn-text{
      font-size: 5vh;
    }
    .sign-preview-area{
      width: 60%;
      height: 90%;
      border: 1px solid rgb(207, 207, 207);
      border-radius: 8px;
      text-align: center;
    }
    .img-area {
      height: 30vh;
      width: 100%;
      border: 1px solid rgb(207, 207, 207);
      border-radius: 8px;
    }
    .not-scan-area{
      width: 100%;
      height: 100%;
      background-color: rgba(230, 230, 230, 0.116);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .add-attachment-area{
      min-height: 30vh;
    }
    .chip-text-field >>> .v-text-field__slot input{
      color: white !important;
      font-size: 18px;
      margin-top: 5px !important;
    }
    .chip-text-field >>> .v-text-field__slot input::placeholder{
      color: white !important;
      opacity: 0.8;
    }
    .blocking-area{
      background-color: black;
      opacity: 0.8;
      font-size: 32px;
      z-index: 999;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .blocking-text{
      font-size: 60px;
      font-weight: bold;
      color: white;
      text-align: center;
    }

    .cancel-text{
      color: #db6154;
    }

    .hint-text{
      color: red;
      font-size: 24px;
    }
</style>