import MessageService from "@/assets/services/message.service";
import formPage from "../FormPage/FormPage.vue";

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
            numberOfReject:2,
            multimediaReject: 3,
            formHeaders: [
                { text: '受理編號', value: 'acceptNum', align: 'center',width:'10%' },
                { text: '契約種類', value: 'contractType', align: 'center',width:'10%' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center',width:'10%'},
                { text: '計算日', value: 'computedDate', align: 'center',width:'10%' },
                { text: '退件日期', value: 'rejectDate', align: 'center' },
                { text: '退件原因', value: 'rejectReason', align: 'center',sortable: false,},
                { text: '退件說明', value: 'rejectDesc', align: 'center',sortable: false, },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '原受理人', value: 'acceptUser', align: 'center' },
                { text: '退件人', value: 'rejectUser', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center',sortable: false, }
            ],
            formList: [],
            // 多媒體參數命名待確認 尚不更動
            multimediHeaders: [
                { text: '送件編號', value: 'sendNumber', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '送審項目', value: 'sendItem', align: 'center' },          
                { text: '送件人', value: 'sender', align: 'center' },
                { text: '退件人', value: 'returner', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            multimediFormList: [],
            formListPage: 1,
            formListPageCount: 1,
            multimediFormListPage: 1,
            multimediFormListPageCount: 1,
            deleteOrderModel: false,
            deleteMultimediaModel: false,
            selectIndex: null,
            isMultimedia:false,
            browserModel: false,
            returnReason: null,
            returnReasonModel: false,
            supplementModel: false,
            formHistoryModel: false, // 表單歷程視窗開關
            formHistoryList:[],
            // 表單簽名圖
            signPreviewImgSrc: null,
            // 證件圖檔清單
            certificateList:[],
            selectItem:{},
        }
    },
    methods: {
      init(){
        this.queryReturnInit();
        this.queryMediaReturnInit();
      },
        action(type,item){
          // 抓出選的是第幾筆
          if(type == 'delete'){            
            this.deleteOrderModel = true;
            this.selectIndex = this.formList.indexOf(item); 
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
                this.formList.splice(this.selectIndex, 1);
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
        browerOrder(item){
          this.selectItem = item;
          // 查詢案件資料
          this.queryRetrnInfo();
          
          this.browserModel = true;
        },
        saveFile(){
          this.supplementModel = false;
        },
        // 開啟表單歷程
        openFormHistory(item){
          this.formHistoryList = item.formHistoryList;
          this.formHistoryModel = true;
      },

      /** 
       * 
       * Ajax Start
       * 
       * 
      */

      // Action: (無紙化案件)頁面初始化
      queryReturnInit(){
        // 模擬取回資料
        let formList = [
          {
            seq:34,                  
            acceptNum: 'A00028', 
            contractType: "表制", 
            electricNum:'0120123223', 
            custName:"余文文",
            computedDate: '01', 
            rejectDate: '2021-09-10 15:00', 
            rejectReason: '證件不清楚', 
            rejectDesc: '現役軍人眷屬身分證圖片不清楚，須補證件', 
            acceptItem: 'QA210  軍眷用電申請優待', 
            acceptUser: '10510122201',
            acceptUserName:'李小凡',
            rejectUser:'陳麗杉',
            formHistoryList:[
              '2021-09-14 15:10:14 退件中 (0151230020 吳靜)',
              '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
              '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',    
            ],
          },
          {
            seq:34,                  
            acceptNum: 'A00633', 
            contractType: "包制", 
            electricNum:'0120123222', 
            custName:"陳詩宇", 
            computedDate: '05', 
            rejectDate: '2021-09-10 16:45', 
            rejectReason: '佐證文件不足', 
            rejectDesc: '須提供XXX佐證文件', 
            acceptItem: 'F3030  表燈非時間電價停用廢止', 
            acceptUser: '10510122201',
            acceptUserName: '葉星辰',
            rejectUser:'林雯雯',
            formHistoryList:[
              '2021-09-14 14:20:14 退件中 (0151230020 吳靜)',
              '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
              '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',    
            ],
          }
        ];

        this.formList = formList;
      },


      // Action: (多媒體案件)頁面初始化
      queryMediaReturnInit(){
        // 模擬取回資料
        let multimediFormList = [
          { action: true, 
            edit: true, 
            cancel: true, 
            sendNumber: 'M00001', 
            returnDate: '2021-09-10 15:00', 
            reason: '文字修改', 
            desc: '文字錯誤請重新修改', 
            sendItem: '跑馬燈', 
            sender: '1050330001', 
            senderName: '林美美',
            returner:'甘仙文',
            formHistoryList:[
              '2021-09-14 14:20:14 退件中 (0151230020 吳靜)',
              '2021-09-14 13:50:14 核算分派 (0151230001 陳婷婷)',
              '2021-09-14 13:20:14 案件成立 (0151230011 鍾書文)',    
            ],
          },
          { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '2021-09-10 15:00', reason: '影片、圖片錯誤', desc: '文字錯誤請重新修改', sendItem: '節目單', sender: '1050330002', senderName: '王曉花',returner:'駱文成',formHistoryList:[] },
          { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '2021-09-10 15:00', reason: '文字修改', desc: '文字錯誤請重新修改', sendItem: '滿意度調查', sender: '1050330003', senderName: '李小凡',returner:'蔡又新',formHistoryList:[] }
        ];
        
        this.multimediFormList = multimediFormList;
      },

      // 取得表單資料
      queryRetrnInfo(){
        // Vin參數
        // seq: this.selectItem.seq,
          
          // 回傳參數
          this.signPreviewImgSrc = null; // 可參考FormPage.js格式
          this.certificateList = [];       // 可參考FormPage.js格式
      },


       /** 
       * 
       * Ajax End
       * 
       * 
      */
    }
}