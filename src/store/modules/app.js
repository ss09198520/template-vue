import Cookies from 'js-cookie'
// import { getLanguage } from '@/lang/index'

const state = {
//   sidebar: {
//     opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
//     withoutAnimation: false
//   },
//   device: 'desktop',
//   language: getLanguage(),
//   size: Cookies.get('size') || 'medium',
  drawer: null,
  color: 'primary',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  showImage: false,
  miniSidebar: false,
}


const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.miniSidebar = !state.miniSidebar
  },
  TOGGLE_DRAWER: state => {
    state.drawer = !state.drawer
  },
  TOGGLE_IMAGE: state => {
    state.showImage = !state.showImage
  },
  SET_COLOR: (state, color) => {
    state.color = color
    Cookies.set('color', color)
  },
  SET_DRAWER: (state, drawer) => {
    state.drawer = drawer
  },
  SET_IMAGE: (state, image) => {
    state.image = image
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleDrawer({ commit }) {
    commit('TOGGLE_DRAWER')
  },
  toggleImage({ commit }, { withoutAnimation }) {
    commit('TOGGLE_IMAGE', withoutAnimation)
  },
  setColor({ commit }, color) {
    commit('SET_COLOR', color)
  },
  setDrawer({ commit }, drawer) {
    commit('SET_DRAWER', drawer)
  },
  setImage({ commit }, image) {
    commit('SET_IMAGE', image)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
