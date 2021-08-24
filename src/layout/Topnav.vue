<template>
  <v-app-bar
    id="core-toolbar"
    app
    min-height="auto"
    height="60"
  >
    <v-toolbar-title class="font-weight-light">
      <v-btn
        v-if="responsive"
        class="default v-btn--simple"
        icon
        @click.stop="onClickBtn"
      >
        <v-icon>mdi-view-quilt</v-icon>
      </v-btn>
      <template v-if="!responsive">
        <v-btn
          icon
          color="accent"
          @click="toggleMiniSidebar()"
        >
          <v-icon v-if="miniSidebar">
            mdi-view-quilt
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      {{ title }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        title: null,
        responsive: false,
      }
    },
    computed: {
      ...mapGetters([
        'miniSidebar',
        'permission_routes',
      ]),
    },
    watch: {
      $route(val) {
        this.title = val.name
      },
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      onClickBtn() {
        this.$store.dispatch('app/toggleDrawer')
      },
      toggleMiniSidebar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
          if (this.miniSidebar) this.toggleMiniSidebar()
        } else {
          this.responsive = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>