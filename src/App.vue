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
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapGetters([
      'isLoading',
    ]),
  },
}

</script>

<style lang="scss">
@import '@/scss/overrides.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>