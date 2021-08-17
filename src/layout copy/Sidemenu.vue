<template>
  <div>
    <core-drawer :menu-links="menuLinks" />
  </div>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
    },
    props: {
      menuLinks: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
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

<style lang="scss" scoped></style>