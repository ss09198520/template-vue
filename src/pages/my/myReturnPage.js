import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";
import EventBus from "@/assets/services/eventBus";

export default {
    name: 'MyReturn',
     components: {
        formPage,
    },
    props: {
    
    },
    beforeMount() { // 在這裡做初始化, 勿刪
      this.init();
    },
    data() {
        return {
            caseReturnCount: 2,
            multiMediaReturnCount: 3,
            caseHeaders: [
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '電號', value: 'electricNo', align: 'center' },
                { text: '戶名', value: 'accntName', align: 'center' },
                { text: '計算日', value: 'computeDate', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '原受理人姓名', value: 'acceptName', align: 'center' },
                { text: '退件人', value: 'returner', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            caseList: [
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00028', contractType: "表制", electricNo:'0120123223', accntName:"余文文", computeDate: '01', returnDate: '20210910 15:00', reason: '證件不清楚', desc: '現役軍人眷屬身分證圖片不清楚，須補證件', acceptItem: 'QA210  軍眷用電申請優待', acceptName: '李小凡',returner:'陳麗杉'},
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00633', contractType: "包制", electricNo:'0120123222', accntName:"陳詩宇", computeDate: '05', returnDate: '20210910 16:45', reason: '佐證文件不足', desc: '須提供XXX佐證文件', acceptItem: 'F3030  表燈非時間電價停用廢止', acceptName: '葉星辰',returner:'林雯雯'}
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
            supplementModel: false,
            formRecordModel: false, // 表單歷程視窗開關
            formRecordList:[
                {record:'2021/09/14 14:20:14 退件中 (0151230020 吳靜)'},
                {record:'2021/09/14 13:50:14 核算分派 (0151230001 陳婷婷)'},
                {record:'2021/09/14 13:20:14 案件成立 (0151230011 鍾書文)'},

            ],
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ]
        }
    },
    methods: {
      init(){
        // 控制補件存檔後將補件跳出視窗關閉
        EventBus.subscriber('saveFile',this.closeSupplementModel);
      },
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
          } else if(type == 'supplement'){
            this.supplementModel = true;
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
        },
        closeSupplementModel(){
          this.supplementModel = false;
        },
        openFormRecord(){
          this.formRecordModel = true;
      }
    }
}