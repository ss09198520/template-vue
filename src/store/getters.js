const getters = {
  drawer: state => state.app.drawer,
  color: state => state.app.color,
  image: state => state.app.image,
  showImage: state => state.app.showImage,
  miniSidebar: state => state.app.miniSidebar,
  roles: state => state.user.roles,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
}
export default getters