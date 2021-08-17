// api.js
import axios from 'axios'

// 初始化 Axios Instance 設定
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
})

// 在請求之前的攔截器
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 在回應之後的攔截器
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    if (error.response) {
      // Http error code 的處理
      switch (error.response.status) {
        case 404:
          console.log('你要找的頁面不存在')
          // go to 404 page
          break
        case 500:
          console.log('程式發生問題')
          // go to 500 page
          break
        default:
          console.log(error.message)
      }
    }
    return Promise.reject(error)
  }
)

export default instance