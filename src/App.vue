<template>
  <v-app> <!-- <div id="app"> -->
    <router-view />
    <!-- 通知設定 -->
    <notifications
      group="topRight"
      position="top right"
      :duration="5000"
      :max="5"
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