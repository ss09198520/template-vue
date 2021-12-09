<template>
  <v-app>
    <v-container style="max-width: 100%">
      <v-row v-show="!isSign" justify="center">
        <tui-image-editor ref="tuiImageEditor" :include-ui="true" :options="options" />
      </v-row>
      <!-- <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="center">
        <v-btn style="width:200px; margin: 5px;" depressed color="primary" @click="downloadFile()">DOWNLOAD</v-btn>
      </v-row> -->
      <div v-show="mode != 'view' && !isSign">
        <hr style="margin-top: 30px;margin-bottom: 30px;">
        <v-row justify="center">
          <v-btn color="primary" class="mt-3 big-btn" @click="isSign = true">
            <span class="big-btn-text">用戶簽名</span>
            <v-icon
              right
              dark
              size="3vh"
            >
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-row>
      </div>
      <div v-if="isSign">
        <v-row justify="center">
          <span class="sign-title mb-3">用戶簽名</span>
          <VueSignaturePad
            ref="signaturePad"
            width="100%"
            height="80vh"
            :custom-style="signaturePadStyle"
            :options="signatureOptions"
          />
          <span class="hint-text">您的電子簽名僅使用於本表單的各簽名處</span>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-btn class="big-btn" @click="isSign = false">
            <span class="big-btn-text">返回瀏覽表單</span>
            <v-icon
              right
              dark
              size="3vh"
            >
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <v-btn class="ml-12 big-btn" color="error" @click="clearSign()">
            <span class="big-btn-text">清除重簽</span>
            <v-icon
              right
              dark
              size="3vh"
            >
              mdi-eraser-variant
            </v-icon>
          </v-btn>
          <v-btn class="ml-12 big-btn" color="success" @click="save()">
            <span class="big-btn-text">確認儲存</span>
            <v-icon
              right
              dark
              size="3vh"
            >
              mdi-check
            </v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script src="./imageEditorPage.js" />

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }

    .tui-image-editor-help-menu {
        display: none !important;
    }
    .sign-title {
      width: 100%;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
    }
    .big-btn{
      height: 10vh !important;
      width: 12vw !important;
    }
    .big-btn-text{
      font-size: 1.4vw;
    }
    .hint-text{
      color: red;
      font-size: 32px;
    }
</style>