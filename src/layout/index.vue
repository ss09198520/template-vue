<template>
  <div>
      <sidemenu />
      <core-topnav />
      <core-content />
      <core-footer />
  </div>
</template>

<script>
  import { CoreTopnav, CoreContent, Sidemenu, CoreFooter} from './components'

  export default {
    components: {
      Sidemenu,
      CoreTopnav,
      CoreFooter,
      CoreContent,
    },
  }
</script>

<style lang="scss" scoped></style>