<template>
    <v-main>
      <div id="core-view">
        <v-container
          fluid
          style="height: 100%"
        >
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-container>
      </div>
    </v-main>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  #core-view {
    padding-bottom: 100px;
    height: 100%;
  }
</style>