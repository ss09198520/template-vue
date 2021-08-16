<template>
  <div>
    <sidemenu :menu-links="menuLinks" />
    <content>
      <footer />
    </content>
  </div>
</template>

<script>
  import Footer from '@/components/core/Footer'
  import Sidemenu from '@/views/layout/Sidemenu'
  import Topnav from '@/views/layout/Topnav'
  import Content from '@/views/layout/Content'

  // Data
  import { menuLinks } from '@/data/sideMenu'

  export default {
    components: {
      Footer,
      Sidemenu,
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