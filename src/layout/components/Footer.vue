<template>
  <v-footer
    id="core-footer"
    height="52"
    absolute
  >
    <v-spacer class="hidden-sm-and-down" />
    <span class="text-body-2 font-weight-light pt-6 pt-md-0 text-center">
      Copyright &copy;
      {{ new Date().getFullYear() }}
      Far Eastone Telecommunications Co., Ltd. All Rights Reserved. 遠傳電信版權所有
    </span>
  </v-footer>
</template>

<script>
  export default {}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>