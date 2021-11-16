// import { login, logout, getInfo } from '@/api/user'
import { login,getInfo,logout} from '@/api/user'
import { getToken, setToken , removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  isLogin: false,
  empNo: null,
  empName: null,
  avatar: null,
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGIN: (state, loginState) => {
    state.isLogin = loginState
  },
  SET_EMPNO: (state, empNo) => {
    state.empNo = empNo
  },
  SET_NAME: (state, empName) => {
    state.empName = empName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {

  toggleIsLogin({ commit } , loginState) {
    commit('SET_LOGIN' , loginState)
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { restData } = response
        if(response.restData.code == 200){
          let empName = response.restData.empName;
          console.log(response.restData)
          //放入員工資訊
          commit('SET_TOKEN', response.restData)
          commit('SET_NAME', response.restData.empName)
          commit('SET_EMPNO', response.restData.empNo)
          commit('SET_LOGIN' , true)

          setToken(response.restData)
        } else {
          reject(response.restData)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve) => {
      // getInfo(state.token).then(response => {
        // const { data } = response
        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }

        // const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        let tokenInfo = getToken()
        
        if (tokenInfo) {
          let empInfo = JSON.parse(tokenInfo)
          commit('SET_LOGIN' , true)
          commit('SET_NAME', empInfo.empName)
          commit('SET_EMPNO', empInfo.empNo)
        }

        commit('SET_ROLES', ['admin'])
        commit('SET_AVATAR', 'avatar')
        
        resolve({'roles':['admin']})
      // }).catch(error => {
        // reject(error)
      // })
    })
  },

//   // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_LOGIN', false)
        removeToken()
        resetRouter()

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // },

//   // dynamically modify permissions
//   async changeRoles({ commit, dispatch }, role) {
//     const token = role + '-token'

//     commit('SET_TOKEN', token)
//     setToken(token)

//     const { roles } = await dispatch('getInfo')

//     resetRouter()

//     // generate accessible routes map based on roles
//     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
//     // dynamically add accessible routes
//     router.addRoutes(accessRoutes)

//     // reset visited views and cached views
//     dispatch('tagsView/delAllViews', null, { root: true })
//   }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}