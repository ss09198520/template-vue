<template>
  <div>
    <sidemenu :menu-links="menuLinks" />
    <footer />
  </div>
</template>

<script>
  import Footer from '@/components/core/Footer'
  import Sidemenu from '@/layout/Sidemenu'
  import Topnav from '@/layout/Topnav'
  import Content from '@/layout/Content'

  // Data
  import { menuLinks } from '@/data/sideMenu'

  export default {
    components: {
      Sidemenu,
      Footer,
      Topnav,
      Content,
    },
    data() {
      return {
        menuLinks: menuLinks,
      }
    },
  }
</script>

<style lang="scss" scoped></style>