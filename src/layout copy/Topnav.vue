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
          @click="toogleMiniSidebar()"
        >
          <v-icon v-if="miniSidebar">
            mdi-view-quilt
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        responsive: false,
      }
    },
    computed: {
      ...mapState('app', ['miniSidebar']),
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toogleMiniSidebar']),
      onClickBtn() {
        this.setDrawer(!this.$store.state.app.drawer)
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
          if (this.miniSidebar) this.toogleMiniSidebar()
        } else {
          this.responsive = false
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>