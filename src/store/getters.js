const getters = {
  drawer: state => state.app.drawer,
  color: state => state.app.color,
  image: state => state.app.image,
  showImage: state => state.app.showImage,
  miniSidebar: state => state.app.miniSidebar,
  roles: state => state.user.roles,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  empName: state => state.user.empName,
  empNo: state => state.user.empNo,
  isLogin: state => state.user.isLogin,
  permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
}
export default getters