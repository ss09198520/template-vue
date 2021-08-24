<template>
  <div>
    <core-drawer :menu-links="menuLinks" />
  </div>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/layout/components/Drawer'),
    },
    props: {
      menuLinks: {
        type: Array,
        default: () => [],
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

<style lang="scss" scoped></style>