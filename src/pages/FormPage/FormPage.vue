<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col v-show="showModeSelect" cols="3">
          <v-select
            v-model="mode"
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
                  <v-btn depressed color="primary" class="big-btn">
                    <span class="pt-3">
                      <v-icon dark size="7vh">
                        mdi-file-document-outline
                      </v-icon><br>
                      <div v-if="mode==='audit'" class="big-btn-text mt-2">檢視表單</div>
                      <div v-else class="big-btn-text mt-2">開啟表單</div>
                    </span>
                  </v-btn>
                </v-col>
                <v-col v-if="mode!=='audit'" cols="6">
                  <div class="sign-preview-area">
                    <span>簽名預覽</span>
                    <img v-if="signPreviewImgSrc" style="width: 100%; max-height: 100%" :src="imgSrcPrefix + signPreviewImgSrc">
                    <div v-else class="not-scan-area">
                      <span>尚未簽名</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2 v-if="mode == 'edit'">新增/刪除 證件</h2>
                <h2 v-else>證件</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col v-for="(certificate, index) in certificateList" :key="certificate.id" cols="3" class="mb-2">
                    <v-row>
                      <v-col cols="12" class="d-center">
                        <h3 v-if="!certificate.isAdditional">{{ certificate.name }}</h3>
                        <v-text-field
                          v-else
                          v-model="certificate.name"
                          :disabled="mode != 'edit'"
                          dense
                          hide-details
                          class="h3 t-center"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div class="img-area d-center">
                          <img v-if="certificate.imgSrc" style="width: 100%; max-height: 100%" :src="imgSrcPrefix + certificate.imgSrc">
                          <div v-else class="not-scan-area">
                            <span>尚未掃描</span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="d-center">
                        <v-checkbox 
                          v-model="certificate.isIdCard" 
                          :disabled="mode != 'edit'"
                          class="mt-0" 
                          label="本人身分證" 
                          color="success" 
                          hide-details
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col v-if="mode == 'edit'" cols="6" class="t-center">
                        <v-btn v-if="certificate.isAdditional" depressed color="error" @click="deleteCertificate(index)">
                          刪除
                          <v-icon
                            right
                            dark
                          >
                            mdi-delete
                          </v-icon>
                        </v-btn>
                        <v-btn v-else depressed color="error" :disabled="!certificate.imgSrc" @click="cleanCertificateImg(certificate)">
                          清空
                          <v-icon
                            right
                            dark
                          >
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col v-if="mode == 'edit'" cols="6" class="t-center">
                        <v-btn depressed color="primary">
                          掃描
                          <v-icon
                            right
                            dark
                          >
                            mdi-scanner
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col v-if="mode == 'audit'" cols="12" class="t-center">
                        <v-btn depressed color="normal" @click="viewImage(certificate)">
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
                  <v-col v-if="mode == 'edit'" cols="3" class="add-attachment-area">
                    <v-row class="h-100">
                      <v-col cols="12" class="h-100 d-center">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          depressed
                          color="primary"
                          @click="addCertificate()"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
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
                <h2 v-if="mode == 'edit'">新增/刪除 附件</h2>
                <h2 v-else>附件</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col v-for="(attachment, index) in attachmentList" :key="attachment.id" cols="3" class="mb-2">
                    <v-row>
                      <v-col cols="12" style="text-align: center;">
                        <v-text-field
                          v-model="attachment.name"
                          :disabled="mode != 'edit'"
                          dense
                          hide-details
                          class="h3 t-center"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div class="img-area d-center">
                          <img v-if="attachment.imgSrc" style="width: 100%; max-height: 100%" :src="attachment.imgSrc">
                          <div v-else-if="attachment.file" class="t-center">
                            <v-icon x-large class="mb-2">
                              mdi-file-document-outline
                            </v-icon><br>
                            {{ attachment.file.name }}
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
                          v-model="attachment.useStamp" 
                          :disabled="mode != 'edit'"
                          class="mt-0" 
                          label="套印專用章" 
                          color="success" 
                          hide-details
                        />
                      </v-col>
                    </v-row>
                    <v-row v-if="mode == 'edit'">
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
                        <input
                          ref="uploaders"
                          class="d-none"
                          type="file"
                          @change="onFileChanged"
                        >
                      </v-col>
                    </v-row>
                    <v-row v-if="mode == 'audit'">
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
                      <v-col v-else cols="12" class="t-center">
                        <v-btn depressed color="primary" :disabled="!attachment.file">
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
                  <v-col cols="3" class="add-attachment-area">
                    <v-row class="h-100">
                      <v-col cols="12" class="h-100 d-center">
                        <v-btn
                          v-if="mode == 'edit'"
                          class="mx-2"
                          fab
                          dark
                          depressed
                          color="primary"
                          @click="addAttachment()"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row v-if="mode == 'edit'">
        <v-col cols="12" class="t-right">
          <v-btn depressed large color="success">
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
      <v-row v-if="mode == 'audit'">
        <v-col cols="12" class="t-right">
          <v-btn depressed large color="error">
            <span style="font-size: 18px">退件</span>
            <v-icon
              right
              dark
              style="font-size: 24px"
            >
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn depressed large color="success" class="ml-3">
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
    </v-container>

    <!-- 檢視圖片 modal -->
    <v-dialog
      v-model="viewImageDialog"
      width="70vw"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ viewImageTitle }}
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
  </v-app>
</template>

<script src="./FormPage.js">
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }
    .h-100{
        height: 100%;
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
        height: 100%;
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
</style>