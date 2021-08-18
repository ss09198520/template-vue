<template>
  <div>
      <!-- <sidemenu :menu-links="menuLinks" /> -->
      <core-topnav />
      <core-content>
        <core-footer />
      </core-content>
  </div>
</template>

<script>
   import coreFooter from '@/layout/components/Footer'
  // import Sidemenu from '@/layout/Sidemenu'
  import coreTopnav from '@/layout/Topnav'
  import coreContent from '@/layout/Content'

  // Data
  // import { menuLinks } from '@/data/sideMenu'

  export default {
    components: {
      // Sidemenu,
      coreTopnav,
      coreFooter,
      coreContent,
    },
    data() {
      return {
        menuLinks: 'menuLinks',
      }
    },
  }
</script>

<style lang="scss" scoped></style>