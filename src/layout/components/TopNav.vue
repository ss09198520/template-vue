<template>
  <v-app-bar
    id="core-toolbar"
    app
    min-height="auto"
    height="60"
    absolute
  >
    <v-toolbar-title class="font-weight-light">
      <v-btn
        v-if="responsive"
        class="default v-btn--simple"
        icon
        @click.stop="onClickBtn"
      >
        <v-icon>mdi-view-quilt</v-icon>
      </v-btn>
      <template v-if="!responsive">
        <v-btn
          icon
          color="accent"
          @click="toggleMiniSidebar()"
        >
          <v-icon v-if="miniSidebar">
            mdi-view-quilt
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      {{ title }}
    </v-toolbar-title>
    
    <v-spacer />
    <v-toolbar-items class="d-flex align-center">

      <v-divider
        class="mx-3"
        vertical
      />

      <v-menu
        transition="slide-y-transition"
        bottom
        left
        offset-y
      >
        <template
          v-if="isLogin"
          v-slot:activator="{ on }"
        >
          <div v-on="on">
            <v-btn
              retain-focus-on-click
              :color="isLogin ? 'success' : ''"
              icon
              small
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </div>
        </template>

        <template
          v-else
          v-slot:activator="{ on }"
        >
          <div v-on="on">
            <router-link to="/">
              <v-btn
                icon
                small
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </router-link>
          </div>
        </template>

        <v-card
          class="mx-auto"
          max-width="200"
          tile
        >
          <template v-if="isLogin">
            <v-list dense>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="林珍妮"
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>林珍妮</v-list-item-title>
                  <v-list-item-subtitle class="grey--text">
                    Founder of Vuetify.js
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list dense>
              <v-list-item
                v-for="(item, i) in accountInfos"
                :key="i"
                link
                dense
                ripple
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-title v-text="item.text" />

                <v-badge
                  v-if="item.notification.num"
                  :color="item.notification.level"
                  left
                >
                  <template slot="badge">
                    {{ item.notification.num }}
                  </template>
                </v-badge>
              </v-list-item>
            </v-list>
            <v-divider />

            <v-list dense>
              <v-list-item
                link
                dense
                ripple
                @click="logout()"
              >
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>登出系統</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>

          <template v-else>
            <v-list dense>
              <v-list-item
                link
                dense
                ripple
                @click="login()"
              >
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>登入系統</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-card>
      </v-menu>
    </v-toolbar-items>
    <v-dialog
      v-model="loginDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          請輸入帳號密碼
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="loginDialog = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            帳號
            <v-text-field 
              v-model="account"
              dense
              outlined
            />
          </v-row>
          <v-row class="mt-6 ml-1 font-bold">
            密碼
            <v-text-field 
              v-model="password"
              dense
              outlined
            />
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="normal"            
            @click="loginDialog = false"
          >
            &emsp;取消&emsp;
          </v-btn>
          <v-btn              
            color="primary"            
            @click="confirmLogin()"
          >
            &emsp;登入&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import AjaxService from '@/assets/services/ajax.service'
  import { mapGetters } from 'vuex'
  export default {
    // data() {
    //   return {
    //     title: null,
    //     responsive: false,
    //   }
    // },
    data() {
      return {
        title: null,
        responsive: false,
        menuValue: false,
        menuValue2: false,
        menuValue3: false,
        // TODO: 測試用，之後應會刪除
        isLogin: false,
        loginDialog: false,
        account: '',
        password: '',
        data: {
          type: 1,
          seeAllLink: '/',
          notifications: [
            {
              id: 1,
              icon: 'mdi-flag',
              text: '系統承載狀態',
              link: '/',
            },
            {
              id: 2,
              icon: 'mdi-flag',
              text: '系統承載狀態',
              link: '/',
            },
            {
              id: 3,
              icon: 'mdi-flag',
              text: '系統承載狀態',
              link: '/',
            },
          ],
        },
        data2: {
          type: 2,
          seeAllLink: '/',
          notifications: [
            {
              id: 1,
              title: '網管',
              text: '登入店組當日已啟用門號(當天)，恭喜開通。測試測試測試測試測試',
              time: '現在',
              link: '/',
            },
            {
              id: 2,
              title: '網管',
              text: '登入店組當日已啟用門號(當天)，恭喜開通。測試測試測試測試測試',
              time: '15分鐘前',
              link: '/',
            },
          ],
        },
        data3: {
          type: 3,
          seeAllLink: '/',
          notifications: [
            {
              id: 1,
              title: 'New release v1.2',
              persentage: 30,
              color: 'info',
              link: '/',
            },
            {
              id: 2,
              title: 'Application development',
              persentage: 60,
              color: 'success',
              link: '/',
            },
            {
              id: 3,
              title: 'Mobile app release',
              persentage: 80,
              color: 'warning',
              link: '/',
            },
            {
              id: 4,
              title: 'Database migration',
              persentage: 90,
              color: 'info',
              link: '/',
            },
            {
              id: 5,
              title: 'Web server upgrade',
              persentage: 5,
              color: 'primary',
              link: '/',
            },
          ],
        },
        accountInfos: [
          {
            text: '帳號設定',
            icon: 'mdi-account',
            link: '',
            notification: {
              num: 0,
              level: '',
            },
          },
          {
            text: '行事曆',
            icon: 'mdi-calendar',
            link: '',
            notification: {
              num: 0,
              level: '',
            },
          },
          {
            text: '最新訊息',
            icon: 'mdi-email',
            link: '',
            notification: {
              num: 2,
              level: 'error',
            },
          },
          {
            text: '代辦事項',
            icon: 'mdi-format-list-bulleted',
            link: '',
            notification: {
              num: 3,
              level: 'success',
            },
          },
        ],
      }
    },
    computed: {
      ...mapGetters([
        'miniSidebar',
      ]),
    },
    watch: {
      $route(val) {
        this.title = val.meta.title||val.name
      },
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      onClickBtn() {
        this.$store.dispatch('app/toggleDrawer')
      },
      toggleMiniSidebar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
          if (this.miniSidebar) this.toggleMiniSidebar()
        } else {
          this.responsive = false
        }
      },
      login(){
        this.loginDialog = true;
      },
      confirmLogin(){
        let loginUrl = "/login?username=" + this.account + "&password=" + this.password;
        AjaxService.post(loginUrl, {}, (response) => {
          console.log(response);
          if(response.restData.code == 200){
            this.loginDialog = false;
            this.isLogin = true;
          }
        });
      },
      logout(){
        AjaxService.post("/logout", {}, (response) => {
          console.log(response);
          if(response.restData.code == 200){
            this.isLogin = false;
          }
        });
      }
    },
  }
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>