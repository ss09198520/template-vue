<template>
  <v-app>
    <!-- 擋件區 -->
    <div v-if="isBlocking" class="blocking-area">
      <span class="blocking-text" v-html="blockingMsg" />
    </div>
    <v-container>
      <v-row>
        <v-expansion-panels v-model="panel" flat accordion value="0" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header class="panel-header mb-3">
              <v-col cols="12">
                <h2>證件預覽</h2>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col v-for="(file, index) in fileList" :key="file.id" cols="5" class="mb-2">
                    <v-row>
                      <v-col cols="5" class="mb-2">
                        <v-row>
                          <v-col cols="12" style="text-align: center;">
                            <h3>{{ file.fileName }}</h3>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <div class="img-area d-center">
                              <img :src="file.base64" style="width: 100%; max-height: 100%">
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="t-center">
                            <v-btn depressed color="normal" @click="viewImage(file)">
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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

<script src="./viewExternalFile.js">
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