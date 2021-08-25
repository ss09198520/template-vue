<template>
  <div>
    <v-img :src="showImage ? image : ''" />
    <v-list
      dense
      nav
    >
      <v-list-item
        class="custom-logo mb-2 justify-center"
        to="/"
      >
        <v-sheet>
          <img
            :src="logo"
            :style="miniSidebar ? 'max-width: 100%' : ''"
            alt="logo"
          >
        </v-sheet>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarLogo',
  computed: {
    ...mapState('app', ['image', 'miniSidebar', 'showImage']),
  },
  data() {
    return {
      logo: require('@/assets/images/taipw_sm.jpg'),
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
