<template>
  <v-app> <!-- <div id="app"> -->
    <router-view />
    <!-- 通知設定 -->
    <notifications
      group="topRight"
      position="top center"
      :duration="5000"
      :max="10"
      animation-name="v-fade-right"
    />

    <!-- loading -->
    <v-overlay :value="isLoading" z-index="5000">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>

<script>
import EventBus from '@/assets/services/eventBus.js';

export default {
  components: {

  },
  data: () => ({
    isLoading: false, // 開啟loading畫面
  }),
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      // 註冊啟動畫面loading監聽事件 (ajax)
      EventBus.subscriber('toggleLoading',this.toggleLoading);
    },
    // 開啟Loading畫面
    toggleLoading(isLoading){
      this.isLoading = isLoading;
    },
  }
}

</script>

<style lang="scss">
@import '@/scss/overrides.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>