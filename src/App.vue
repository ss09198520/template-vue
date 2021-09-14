<template>
  <v-app> <!-- <div id="app"> -->
    <router-view />
    <!-- 通知設定 -->
    <notifications
      group="topRight"
      position="top center"
      :duration="100000"
      :max="10"
      animation-name="v-fade-right"
    />
  </v-app>
</template>


<style lang="scss">
@import '@/scss/overrides.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>