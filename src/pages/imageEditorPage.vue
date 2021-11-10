<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <tui-image-editor ref="tuiImageEditor" :include-ui="true" :options="options" />
      </v-row>
      <!-- <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="center">
        <v-btn style="width:200px; margin: 5px;" depressed color="primary" @click="downloadFile()">DOWNLOAD</v-btn>
      </v-row> -->
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="center">
        <span class="sign-title mb-3">用戶簽名</span>
        <VueSignaturePad
          ref="signaturePad"
          width="1350px"
          height="270px"
          :custom-style="signaturePadStyle"
          :options="signatureOptions"
        />
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn color="error" @click="clearSign()">
          清除重簽
          <v-icon
            right
            dark
          >
            mdi-eraser-variant
          </v-icon>
        </v-btn>
        <v-btn class="ml-2" color="success" @click="save()">
          確認儲存
          <v-icon
            right
            dark
          >
            mdi-check
          </v-icon>
        </v-btn>
      </v-row>
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
</style>