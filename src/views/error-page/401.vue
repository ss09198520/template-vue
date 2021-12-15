<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex align-center justify-center"
  >
    <v-sheet class="d-flex flex-column flex-md-row pa-2">
      <v-sheet
        class="d-flex flex-column flex-md-row align-center justify-center"
      >
        <v-icon
          size="120"
        >
          mdi-emoticon-sad-outline
        </v-icon>
        <h1 class="text-h1 font-weight-bold grey--text text--darken-2 ma-0">
          401
        </h1>
      </v-sheet>
      <v-divider
        vertical
        class="mx-4"
      />
      <v-sheet class="d-flex align-center align-md-start justify-center flex-column">
        <p
          class="overline text-10"
          style="font-size: 1.2em !important;"
        >
          {{ title }}
        </p>
        <div
          class="text-center text-md-left"
          v-html="errorContent"
        />
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
  export default {
    data() {
      return {
        title: '很抱歉，您沒有該頁面使用權限',
        errorContent:
          `<p class="body-1 grey--text text--darken-2 mb-0">您可能輸錯網址，或該網頁已刪除、不存在。<br />
          請點選上方選單，前往您有興趣的頁面或返回 <a href="${process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_PATH : '/'}">首頁</a> 繼續瀏覽。</p>`,
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>