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
    mobile-breakpoint="991"
    width="220"
  >
    <logo /> <!-- Logo -->
      
    <v-list dense>
      <template>
        <item-group v-for="route in menuLinks" :key="route.path" :item="route" :base-path="route.path" :color="color" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import Logo from './Logo'
  import ItemGroup from './ItemGroup.vue'
  import { mapState } from 'vuex'

  export default {
    components: { Logo , ItemGroup},
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
      test: 'aaa',
      test2: 'bbb',
      test3: 'ccc',
    }),
    computed: {
      ...mapState('app', ['color', 'miniSidebar',]),
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
        // this.menuLinks.forEach(item => {
        //   // console.log(item)
        //   // console.log(!!item.children)
        // })
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
  .v-list-item.secondary {
    background-color: #2196f3;
    border-color: #2196f3;
  }
}
</style>