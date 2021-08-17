<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <v-spacer />
    <span class="body-2 font-weight-light">
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