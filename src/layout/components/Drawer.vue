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
        class="fet-logo mb-2 justify-center"
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
          v-if="!!item.menuLinks.length"
          :key="idx"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="item.text" />
          </template>
          <v-list-item
            v-for="(subItem, index) in item.menuLinks"
            :key="index"
            :to="subItem.to"
            :active-class="color"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="subItem.text" />
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="idx"
          :to="item.to"
          :active-class="color"
          class="v-list-item"
          @click="settingMenu()"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="item.text" />
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import { mapMutations, mapState } from 'vuex'

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
      logo: require('@/assets/images/fet_logo_sm.jpg'),
    }),
    computed: {
      ...mapState('app', ['image', 'color', 'miniSidebar', 'showImage']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.setDrawer(val)
        },
      },
      items() {
        return this.$t('Layout.View.items')
      },
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      settingMenu() {
        this.menuLinks.forEach(item => {
          if (item.active) {
            item.active = false
            return false
          }
        })
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
  .v-list-item.fet-logo {
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