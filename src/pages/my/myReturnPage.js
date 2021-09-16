import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

export default {
    name: 'MyReturn',
     components: {
        formPage,
    },
    props: {
    
    },
    data() {
        return {
            caseReturnCount: 2,
            multiMediaReturnCount: 3,
            caseHeaders: [
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },          
                { text: '原受理人', value: 'acceptUser', align: 'center' },
                { text: '原受理人姓名', value: 'acceptName', align: 'center' },
                { text: '退件人', value: 'returner', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            caseList: [
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00028', returnDate: '20210910 15:00', reason: '證件不清楚', desc: '現役軍人眷屬身分證圖片不清楚，須補證件', acceptItem: 'QA210  軍眷用電申請優待', acceptUser: '1050334016', acceptName: '李小凡',returner:'陳麗杉'},
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00633', returnDate: '20210910 16:45', reason: '佐證文件不足', desc: '須提供XXX佐證文件', acceptItem: 'F3030  表燈非時間電價停用廢止', acceptUser: '1050334017', acceptName: '葉星辰',returner:'林雯雯'}
            ],
            multiMediaHeaders: [
                { text: '送件編號', value: 'sendNumber', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '送審項目', value: 'sendItem', align: 'center' },          
                { text: '原受理人', value: 'acceptUser', align: 'center' },
                { text: '原受理人姓名', value: 'acceptName', align: 'center' },
                { text: '退件人', value: 'returner', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            multiMediaList: [
                { action: true, edit: true, cancel: true, sendNumber: 'M00001', returnDate: '20210910 15:00', reason: '文字修改', desc: '文字錯誤請重新修改', sendItem: '跑馬燈', acceptUser: '1050330001', acceptName: '林美美',returner:'甘仙文' },
                { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '20210910 15:00', reason: '影片、圖片錯誤', desc: '文字錯誤請重新修改', sendItem: '節目單', acceptUser: '1050330002', acceptName: '王曉花',returner:'駱文成' },
                { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '20210910 15:00', reason: '文字修改', desc: '文字錯誤請重新修改', sendItem: '滿意度調查', acceptUser: '1050330003', acceptName: '李小凡',returner:'蔡又新' }
            ],
            caseListPage: 1,
            caseListPageCount: 1,
            multiMediaListPage: 1,
            multiMediaListPageCount: 1,
            deleteOrderModel: false,
            deleteMultimediaModel: false,
            selectIndex: null,
            isMultimedia:false,
            browserModel: false,
            returnReason: null,
            returnReasonModel: false,
        }
    },
    methods: {
        action(type,item){
          // 抓出選的是第幾筆
          if(type == 'delete'){            
            this.deleteOrderModel = true;
            this.selectIndex = this.caseList.indexOf(item); 
            this.isMultimedia = false;
          } else if(type == 'deleteMultiMedia'){
            this.deleteOrderModel = true;
            this.selectIndex = this.multiMediaList.indexOf(item);
            this.isMultimedia = true;
          }
        },
         submit(isMultimedia){
           if(!isMultimedia){
             if (this.selectIndex > -1) {
                this.caseList.splice(this.selectIndex, 1);
                this.caseReturnCount = this.caseReturnCount -1;
              }
           } else {
              if (this.selectIndex > -1) {
                this.multiMediaList.splice(this.selectIndex, 1);
                this.multiMediaReturnCount = this.multiMediaReturnCount -1;
              }
           }
            
            MessageService.showSuccess("取消案件成功✓");
            this.deleteOrderModel = false;
        },
        browerOrder(){
          this.browserModel = true;
        },

        retrunOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
           if (this.selectIndex > -1) {
                this.caseList.splice(this.selectIndex, 1);
                this.caseReturnCount = this.caseReturnCount -1;
              }
            this.returnReasonModel = false;
            this.browserModel = false;
            MessageService.showSuccess("退件成功✓");
        },
        checkSubmit(){
           if (this.selectIndex > -1) {
                this.caseList.splice(this.selectIndex, 1);
                this.caseReturnCount = this.caseReturnCount -1;
              }
            MessageService.showSuccess("核算成功✓");
            this.browserModel = false;
        }
    }
}