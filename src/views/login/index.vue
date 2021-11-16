<template>
  <div class="login_container">
    <!-- 登入塊 -->
    <div class="login_box">
      <!-- 頭像 -->
      <div class="">
        <!-- <v-img src="@/assets/images/taipw_sm.jpg" /> -->
      </div>

      <!-- 表單區域 -->
      <v-slide-y-transition appear>

        <v-form ref="loginFormRef" class="login_form">
          <!-- 使用者名稱 -->
          <v-text-field
            v-model="loginForm.username"
            class="mt-10"
            color="secondary"
            :rules="rules.requiredNameRule"
            label="員工編號"
            placeholder="請輸入員工編號"
            prepend-icon="mdi-face"
            autocomplete="current-username"
          />
          <v-text-field
            v-model="loginForm.password"
            class="mb-8"
            color="secondary"
            :rules="rules.requiredPasswordRule"
            :type="showPassword ? 'text' : 'password'"
            label="密碼"
            placeholder="請輸入密碼"
            prepend-icon="mdi-lock-outline"
            autocomplete="current-password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <!-- 按鈕 -->
          <v-col class="d-flex justify-end">
            <v-btn
              depressed
              color="primary"
              class="v-btn--text"
              @click="handleLogin"
            >
              登入
            </v-btn>
          </v-col>
          
        </v-form>
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
	export default {
		data() {
			return {
        showPassword: false,
        redirect: undefined,
        otherQuery: {},
				// 表單資料物件
				loginForm: {
					username: '',
          password: '',
				},
        // 驗證物件
        rules: {
          requiredNameRule: [v => !!v || '員工編號為必填欄位'],
          requiredPasswordRule: [v => !!v || '密碼為必填欄位'],
        },
			}
		},
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    mounted() {
      // if (this.loginForm.username === '') {
      //   this.$refs.loginFormRef.username.focus()
      // } else if (this.loginForm.password === '') {
      //   this.$refs.loginFormRef.password.focus()
      // }
    },
    methods: {
      handleLogin() {
        if (this.$refs.loginFormRef.validate()) {
          this.$store.dispatch('user/login', this.loginForm) // 請看src/store/modules/user.js 內 login
            .then(() => {
              console.log('login success redirect to',this.redirect)
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch((error) => {
              MessageService.showError(error.message , '登入系統')
            })
        }
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    },
  }
</script>
<style lang="scss" scoped>
	.login_container {
		background-color: #677380;
		height: 100%;
	}
 
	.login_box {
		width: 450px;
		height: 300px;
		background-color: #ffffff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
 
		.acator_box {
			width: 130px;
			height: 130px;
			border: 1px solid #eeeeee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #dddddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			background-color: #869191;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eeeeee;
			}
		}
	}
	.btns {
		display: flex;
		justify-content: flex-end;
	}
	.login_form {
		position: absolute;
		bottom: 0%;
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>