<script>
/* export default {
  beforeCreate() {
    const { query } = this.$route
    const path = query.path
    this.$router.replace({ path: path })
  },
  mounted() {},
  render: function(h) {
    return h() // avoid warning message
  } 
}*/
/* export default {
  beforeRouteEnter(to, from, next) {
  next(vm => {
      vm.$router.replace(from.path);
      // 跳到该路由页面后，再替换为from.path来源路径 
  })
  }
} */


export default {

 beforeRouteEnter(to, from, next) {
  next(vm => {
      vm.$router.replace(from.path)
      // 跳到该路由页面后，再替换为from.path来源路径 
  })}

/*
    name: "Reload",
    props: {},
    beforeCreate() {
      const { query } = this.$route;
      const { path } = query;
      console.log(path)
      this.$router.replace({
          path:path,
      });
    },
    render(h) {
        return h();
    }
*/
}


</script>