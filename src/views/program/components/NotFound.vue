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
          size="50"
        >
          mdi-emoticon-sad-outline
        </v-icon>

        <h4 class="text-h4 font-weight-bold grey--text text--darken-2 ma-0">
          Data Not Found
        </h4>
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
          <v-btn 
            class="primary mb-1"
            color="accent"
            @click="back"
          >
            返回 
          </v-btn> 
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
        title: '很抱歉，找不到您選擇之資料',
        errorContent:
          `<p class="body-1 grey--text text--darken-2 mb-0">可能該資料已刪除、不存在。<br />
          請點選上方選單，前往您有興趣的頁面或返回 <a href="${process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_PATH : '/'}">首頁</a> 繼續瀏覽。</p>`,
      }
    },
    methods: {
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/' })
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>