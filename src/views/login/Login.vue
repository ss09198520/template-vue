<template>
  <div>
    <button @click="onLogin()">
      Login
    </button>
  </div>
</template>

<script>
  import { authUser } from '../../services/api/user'

  export default {
    data() {
      return {
        usesrname: '',
        password: '',
      }
    },
    mounted() {
      console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
      console.log(process.env.VUE_APP_API_ENDPOINT)
    },
    methods: {
      onLogin() {
        authUser({
          username: this.username,
          password: this.password,
        })
          .then(res => {
            console.log('登入成功' ,res)
          })
          .catch(error => {
            console.error(error)
          // response 攔截器會先執行，除非你漏接了，才會進到 catch
          })
      },
    },
  }
</script>

<style lang="scss" scoped></style>