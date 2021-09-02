import Vue from 'vue'

/*
MessageService
  用來顯示提示訊息，可設定「標題」與「內容」
*/
const MessageService = {
    async showError(message,title){
        // var defaultTitle = "系統錯誤";

        // // this.notify 噴錯
        // // this.$notify 噴錯
        // //window.vm.$notify 沒噴錯但沒訊息
        // Vue.notify({
        //     group : 'topRight',
        //     title : (title || defaultTitle),
        //     text : message,
        //     type: 'noti-error'
        // });
        console.log(title);
        console.log(message);
    },
    async showSuccess(message,title){
        Vue.notify({
            group : 'topRight',
            title : title,
            text : message,
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
    }
}

export default MessageService;