<template>
  <div>
    <v-content>
      <div id="core-view">
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-container>
      </div>
      <slot />
    </v-content>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped></style>