import axios from 'axios';
import MessageService from '@/assets/services/message.service.js';
import EventBus from '@/assets/services/eventBus.js';
import LoadingConfig from '@/assets/constant/loadingConfig.js';

const AjaxService = {
    /**
     * @param {*} url 
     * @param {*} data 
     * @param {*} callBack 
     * @param {*} errorCallBack 
     * @param {*} noLoading     true:不轉圈圈(背景執行); false:轉圈圈
     * @param {*} urlParam 
     */
    async post(url, data, callBack, errorCallBack, noLoading, urlParam) {
  
      // let vue = window.vm; /* 取得Vue物件 */
      LoadingConfig.blockCount++; // 加上 ajax 計數器，平行呼叫時才擋得住畫面
      
      if(LoadingConfig.blockCount == 1){
        // 目前使用上 vue-loading-overlay 在畫面上不能同時存在兩個，所以註冊到 Vue 中統一控管
        // LoadingConfig.loader = LoadingConfig.$loading.show();/* 開啟loading小圈圈 */
        
        // 使用 Vuetify 的 <v-overlay> <v-progress-circular> 開啟Loading畫面
        if(!noLoading){
          EventBus.publish('toggleLoading', true); /* 開啟loading小圈圈 */
          LoadingConfig.hasLoader = true;
        }
      }
  
      await axios.post(`${url}`, data, {
        headers: {
          // for NSP 大網 Action 辨認小網 Request 
          // 因為服務異動後端用大網 Action, 但大小網 OwnId 來源不同
          // 'From-Mobile-Counter': 'True' 
        },
        params : urlParam
      }).then((response) => {
          
          // 1.2 回傳正確資訊
          callBack(response.data);
  
        }).catch((error) => {
  
          // 無登入權限, 401 導頁,
          if(error != undefined && error.response != undefined && error.response.status == 401){
            // 清除登入資訊, 導至登入頁
            EventBus.publish('unauthorizedLogout');
          }
  
          // 1 呼叫後端失敗
          if (errorCallBack) {
            // 1.1 有給自定義要執行的 error call back 的 function
            errorCallBack(error);
          } else {
            // 1.2 預設網路傳輸錯誤處理
            MessageService.showError('Network Error', '請稍後再試');
          }
          // LoadingConfig.$debug.error(error);
        }).then(() => {
          LoadingConfig.blockCount--;
          if(LoadingConfig.blockCount <= 0){
          // 3 關掉loading 小圈圈
            LoadingConfig.blockCount = 0;
            if(LoadingConfig.hasLoader){
              EventBus.publish('toggleLoading', false); /* 關閉loading小圈圈 */
              LoadingConfig.hasLoader = false;
            }
          }
        });
    }
  };
  
  export default AjaxService;
