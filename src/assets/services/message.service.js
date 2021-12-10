import Vue from 'vue'
import ValidateUtil from './validateUtil';

/*
MessageService
  用來顯示提示訊息，可設定「標題」與「內容」
*/
const MessageService = {
    async showError(message,title){
        var defaultTitle = " 失敗";

        // this.notify 噴錯
        // this.$notify 噴錯
        // window.vm.$notify 沒噴錯但沒訊息
        Vue.notify({
            group : 'topRight',
            title : (title) ? title + defaultTitle : defaultTitle,
            text : message,
            type: 'noti-error'
        });
        console.log(title);
        console.log(message);
    },
    async showSuccess(title){
        Vue.notify({
            group : 'topRight',
            title : title,
            text : "成功✓",
            type: 'noti-success'
        });
    },
    async showInfo(message,title){
        var defaultTitle = "系統訊息";
        Vue.notify({
            group : 'topRight',
            title : (title || defaultTitle),
            text : message,
            type: 'noti-info'
        });
    },
    showSystemError(){
        Vue.notify({
            group : 'topRight',
            title : '系統錯誤',
            text : '系統發生錯誤，請洽系統管理員',
            type: 'noti-error'
        });
    },

    async showCheckInfo(required,format){
        var defaultTitle = "請確認填寫資料正確性";
        // 必填欄位的名稱
        let requiredMsg = '';
        let formatMsg = '';
        if(!ValidateUtil.isEmpty(required)){
            for(let i in required){
                requiredMsg = requiredMsg+required[i]+ (required.length-1 == i ? '':',') ;
            }
        }
        
        if(!ValidateUtil.isEmpty(format)){
            for(let index in format){
                formatMsg = formatMsg+format[index]+ (format.length-1 == index ? '':',') ;
            }
        }



        Vue.notify({
            group : 'topRight',
            title : defaultTitle,
            // text : '必填：「'+ requiredMsg+'」。' +'格式：「'+formatMsg+'」。',
            text : (!ValidateUtil.isEmpty(requiredMsg)?'1.必填欄位：':'')+ requiredMsg+ (!ValidateUtil.isEmpty(requiredMsg) && !ValidateUtil.isEmpty(formatMsg)?'<br>2.格式錯誤：': ValidateUtil.isEmpty(requiredMsg) && !ValidateUtil.isEmpty(formatMsg)? '1.格式錯誤：' : '')  + formatMsg,
            type: 'noti-checkInfo'
        });
    },

    async showNoticeInfo(message){
        var defaultTitle = "請重新確認";

        Vue.notify({
            group : 'topRight',
            title : defaultTitle,
            // text : '必填：「'+ requiredMsg+'」。' +'格式：「'+formatMsg+'」。',
            text :message,
            type: 'noti-checkInfo'
        });
    },
}

export default MessageService;