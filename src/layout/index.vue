<template>
  <div>
      <sidemenu :menu-links="permission_routes" />
      <core-topnav />
      <core-content>
      </core-content>
      <core-footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import coreFooter from '@/layout/components/Footer'
  import Sidemenu from '@/layout/Sidemenu'
  import coreTopnav from '@/layout/Topnav'
  import coreContent from '@/layout/Content'

  // Data
  // import { menuLinks } from '@/data/sideMenu'

  export default {
    components: {
      Sidemenu,
      coreTopnav,
      coreFooter,
      coreContent,
    },
    computed: {
      ...mapGetters([
          'miniSidebar',
          'permission_routes',
      ]),
    },
    data() {
      return {
        menuLinks: this.permission_routes,
      }
    },
  }
</script>

<style lang="scss" scoped></style>