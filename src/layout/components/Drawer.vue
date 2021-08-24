<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :mini-variant="miniSidebar"
    :expand-on-hover="miniSidebar"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="220"
  >
    <v-img :src="showImage ? image : ''" />
    <v-list
      class="fill-height"
      dense
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

      <template v-for="(item, idx) in menuLinks">
        <v-list-group
          v-if=" !item.hidden && !!item.children && !!item.children.length"
          :key="idx"
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="item.name" />
          </template>
          <v-list-item
            v-for="(subItem, index) in item.children"
            :key="index"
            :to="subItem.path"
            :active-class="color"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="subItem.name" />
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="idx"
          :to="item.path"
          :active-class="color"
          class="v-list-item"
          @click="settingMenu()"
        >
          <v-list-item-action>
            <v-icon>mdi-chart-bubble</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="test3" />
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import path from 'path'
  import { mapState } from 'vuex'
  import { isExternal } from '@/utils/validate'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
      menuLinks: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      logo: require('@/assets/images/taipw_sm.jpg'),
      test: 'aaa',
      test2: 'bbb',
      test3: 'ccc',
    }),
    computed: {
      ...mapState('app', ['image', 'color', 'miniSidebar', 'showImage']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.$store.dispatch('app/setDrawer', val)
        },
      },
      items() {
        return this.$t('Layout.View.items')
      },
    },
    mounted() {
      console.log(this.menuLinks)
      this.menuLinks.forEach(item => {
        console.log(item)
        console.log(!!item.children)
      })
    },
    methods: {
      settingMenu() {
        // this.menuLinks.forEach(item => {
        //   if (item.meta.active) {
        //     item.meta.active = false
        //     return false
        //   }
        // })
      },
      resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    },
  }
</script>

<style lang="scss">
#app-drawer {
  .v-list.layout {
    border-radius: 0;
  }
  .v-list-item,
  .v-list-item::before {
    max-height: 48px;
  }
  .v-list-item.custom-logo {
    background-color: #fff;
    padding: 0;
    margin: 0;
    border-radius: 0;
    min-height: 60px;

    div {
      display: flex;
      justify-items: center;
      align-items: center;
      margin: 0 auto;
      img {
        max-height: 60px;
      }
    }
  }
  .v-list-item.secondary {
    background-color: #2196f3;
    border-color: #2196f3;
  }
}
</style>