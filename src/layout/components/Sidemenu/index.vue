<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    :mini-variant="miniSidebar"
    :expand-on-hover="miniSidebar"
    app
    dark
    floating
    persistent
    mobile-breakpoint="991"
    mini-variant-width="80"
    width="230"
    v-bind="$attrs"
  >
    <logo /> <!-- Logo -->
      
    <v-list dense>
      <template>
        <fet-item-group v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :color="color" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Logo from './Logo'
  import { mapGetters } from 'vuex'

  export default {
    
    components: { Logo },
    computed: {
      ...mapGetters([
        'miniSidebar',
        'permission_routes',
        'color',
      ]),
      drawer: {
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
    methods: {
      settingMenu() {
        // this.menuLinks.forEach(route => {
        //   if (route.active) {
        //     route.active = false
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
    min-height: 48px;
  }
  .v-list-item.secondary {
    background-color: #2196f3;
    border-color: #2196f3;
  }
}
</style>