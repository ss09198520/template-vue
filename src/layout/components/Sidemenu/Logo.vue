<template>
  <v-card>
    <v-img :src="showImage ? image : ''" />
    <v-list
      dense
      nav
    >
      <v-list-item
        class="custom-logo mb-2 justify-center"
        to="/"
      >
        <v-sheet>
          <!-- <img
            :src="logo"
            :style="miniSidebar ? 'max-width: 100%' : ''"
            alt="logo"
          >           -->
          <div class="title">
            營業櫃檯無紙化系統(TPES)
          </div>
        </v-sheet>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarLogo',
  data() {
    return {
      logo: require('@/assets/images/taipw_sm.jpg'),
    }
  },
  computed: {
    ...mapState('app', ['image', 'miniSidebar', 'showImage']),
  },
}
</script>

<style lang="scss" scoped>
.v-list-item.custom-logo {
  background-color: #fff;
  padding: 0;
  margin: 0;
  border-radius: 0;
  min-height: 60px;

  div {
    display: flex;
    justify-items: center;
    align-items: center;
    margin: 0 auto;
    img {
      max-height: 60px;
    }
  }
}

.title {
  color: black;
  background-color: #fff;
  text-align: center;  
}

</style>
