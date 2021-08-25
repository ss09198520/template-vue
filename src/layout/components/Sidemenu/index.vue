<template>
  <div>
    <core-drawer :menu-links="permission_routes" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CoreDrawer from './Drawer'

  export default {
    components: { CoreDrawer },
    computed: {
      ...mapGetters([
          'permission_routes',
      ]),
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

<style lang="scss" scoped></style>