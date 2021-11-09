<template>
  <div>
    <sidemenu v-if="!showOnlyContent" />
    <core-topnav v-if="!showOnlyContent" />
    <core-content @showOnlyContent="showOnlyContent = true" />
    <core-footer v-if="!showOnlyContent" />
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
    data() {
      return {
        showOnlyContent: false
      }
    }
  }
</script>

<style lang="scss" scoped></style>