import axios from 'axios'
import store from '@/store'
import MessageService from '@/assets/services/message.service.js';
import EventBus from '@/assets/services/eventBus.js';
import LoadingConfig from '@/assets/constant/loadingConfig.js';

//檢查回傳JSON是否為BLOB
const isJsonBlob = (data) => data instanceof Blob && data.type === "application/json";

// 將blob物件轉化為json（檔案型別呼叫ajax 取後端的返回值做特殊處理）
const fileToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = res => {
      const { result } = res.target // 得到字串
      const data = JSON.parse(result) // 解析成json物件
      console.log(data)
      resolve(data)
    } // 成功回傳
    reader.onerror = err => {
      reject(err)
    } // 失敗回傳
    reader.readAsText(new Blob([file]), 'utf-8') // 按照utf-8編碼解析
  })
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: { 'Content-Type': 'application/json' }, //body content type
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // ** do something before request is sent **//

    // 使用 Vuetify 的 <v-overlay> <v-progress-circular> 開啟Loading畫面
    // EventBus.publish('toggleLoading', true); /* 開啟loading小圈圈 */
    store.dispatch('app/toggleLoading' , true)
    LoadingConfig.hasLoader = true;

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error

    //送出請求錯誤後 關閉loading
    LoadingConfig.blockCount--;
    if(LoadingConfig.blockCount <= 0){
    // 3 關掉loading 小圈圈
      LoadingConfig.blockCount = 0;
      if(LoadingConfig.hasLoader){
        // EventBus.publish('toggleLoading', false); /* 關閉loading小圈圈 */
        store.dispatch('app/toggleLoading' , false)
        LoadingConfig.hasLoader = false;
      }
    }
    MessageService.showError('送出請求發生錯誤');

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {

    LoadingConfig.blockCount--;
    if(LoadingConfig.blockCount <= 0){
    // 3 關掉loading 小圈圈
      LoadingConfig.blockCount = 0;
      if(LoadingConfig.hasLoader){
        // EventBus.publish('toggleLoading', false); /* 關閉loading小圈圈 */
        store.dispatch('app/toggleLoading' , false)
        LoadingConfig.hasLoader = false;
      }
    }
    const { data, headers } = response
    
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    
    if(headers['content-disposition']){ //判斷檔回傳
      
      const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')

      // 下載檔案
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', decodeURI(fileName)); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    }else if (isJsonBlob(res)) { //正常回傳
      
      let message = this.fileToJson(response.data)
      console.log(message)
    
      MessageService.showSystemError()
      return Promise.reject(new Error(res.rtnMsg || 'Error'))
    }else if (res.rtnCode !== '00000') { //正常回傳

      MessageService.showSystemError()
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === '400' || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   console.log('re login')
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload()
      //   })
      // }
      return Promise.reject(new Error(res.rtnMsg || 'Error'))
    } else {
      // 401:HTTP.UNAUTHORIZED , 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.restData.code === '401' || res.restData.code === 50012 || res.restData.code === 50014) {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return res
    }
  },
  error => {
    //送出請求錯誤後 關閉loading
    LoadingConfig.blockCount--;
    if(LoadingConfig.blockCount <= 0){
    // 3 關掉loading 小圈圈
      LoadingConfig.blockCount = 0;
      if(LoadingConfig.hasLoader){
        // EventBus.publish('toggleLoading', false); /* 關閉loading小圈圈 */
        store.dispatch('app/toggleLoading' , false)
        LoadingConfig.hasLoader = false;
      }
    }
    if (error.response) {
      // Http error code 的處理
      switch (error.response.status) {
        case 404:
          // go to 404 page
          MessageService.showError('你要找的頁面不存在');
          break
        case 500:
          MessageService.showSystemError();
          break
        default:
          console.log(error.message)
          MessageService.showSystemError();
      }
    } else {
      MessageService.showError('接收伺服器回應發生錯誤' ,'');
    }
    return Promise.reject(error)
  }
)

export default service
