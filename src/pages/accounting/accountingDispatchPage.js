import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";
import AjaxService from "@/assets/services/ajax.service";

export default {
  name: 'MyWaiting',
  props: {
  
  },
  beforeMount(){
    this.init();
  },
  data() {
    return {
      // 派工設定title
      dispatchHeaders: [
        { text: '班別', value: 'className', align: 'center' },
        { text: '核算員', value: 'accounting', align: 'center' },      
        { text: '檢算員', value: 'calculate', align: 'center' },       
        { text: '設定人員', value: 'settingUser', align: 'center' },       
        { text: '設定日期', value: 'createDate', align: 'center' },
        { text: '狀態操作', value: 'edit', align: 'center' }
      ],
      // 派工設定清單
      dispatchList: [],
      // 派工設定清單頁碼
      dispatchListPage: 1,
      dispatchListPageCount: 1,
      dialog: false,
      dialogType: 'add',
      dialogTitle: '新增派工',
      // 核算員下拉選單
      accountingList:[],
      oriAccoutingList:[],
      // 檢算員下拉選單
      calculateList:[],
      oriCalculateList:[],
      // 新增/修改 Modal 內容
      dispatchInfo: {
        // 班別
        className: '',
        // 核算員
        accountingName: '',
        // 檢算員
        calculateName: '',
        // 派工方式 0: 直接以電號分派 / 1: 依契約種類設定分派
        dispatchType: null,
        // 包制
        usePackage: false,
        // 高壓
        useHighVoltage: false,
        // 表制
        useMeter: false,
        // 表制分派方式 0: 以電號分派 / 1: 以計算日分派
        // meterType: 0,
        // 選擇的計算日
        computeDateList: [],
        // 電號區間
        electricNumList: [
          {start: '', end: ''},
        ],
        // 包制電號區間
        packageNumList: [
          {start: '', end: ''},
        ],
        //高壓電號區間
        highVoltageNumList:[
          {start: '', end: ''},
        ],
        meterElectricNumList:[
          {start: '', end: ''},
        ],
      },
      editIndex: -1,
      closeText: '　關閉　',
      deleteDispatchModel:false,
      selectIndex: null,
      selectDispatch:{},
      accounting: null,
      calculate: null,
      errorMsg:{
        className:null,
        accounting:null,
        calculate: null,
        classType: null,
        contractType: null,
        electricNum:null,
        packageNum:null,
        highVoltageNum: null,
        meterType:null,
        meterElectricNum: null,
        meterCompute: null,
      },
      requiredArray:[],  //必填欄位
      formatArray:[],  //格式錯誤欄位 
     
    }
  },
  methods: {
    init(){
      this.queryAccountingDispatchInfo();
      this.queryAccountingDispatchOption();
    },
    // 開啟新增派工 dialog
    newDispatch(){
      // 切換 dialog 模式
      this.changeDialog('add');

      // 清空 dialog 內容
      this.dispatchInfo = {
        className: '',
        accounting:'',
        accountingName: '',
        calculate:'',
        calculateName:'',
        // dispatchType: 0,
        usePackage: false,
        useHighVoltage: false,
        useMeter: false,
        // meterType: 0,
        computeDateList: [],
        electricNumList: [
          {start: '', end: ''},
        ],
        packageNumList:[
          {start: '', end: ''},
        ],
        highVoltageNumList:[
          {start: '', end: ''},
        ],
        meterElectricNumList:[
          {start: '', end: ''},
        ],
      };

      this.errorMsg = {
        className:null,
        accounting:null,
        calculate: null,
        classType: null,
        contractType: null,
        electricNum:null,
        packageNum:null,
        highVoltageNum: null,
        meterType:null,
        meterElectricNum: null,
        meterCompute: null,
      },

      this.accounting = null;
      this.calculate = null;

      // 打開 dialog
      this.dialog = true;
    },
    // 切換 dialog 標題(新增派工和修改派工共用 dialog)
    changeDialog(mode){
      if(mode === 'add'){
          this.dialogTitle = "新增派工";
          
      }else{
          this.dialogTitle = "修改派工";
      }
      this.dialogType = mode;
    },

    // 打開刪除派工視窗
    remove(item) {
      this.selectDispatch = item;
      this.selectIndex = this.dispatchList.indexOf(item);
      this.deleteDispatchModel = true;
      
    },
       
    getDate() {
      return new Date().getFullYear() + "-" + this.checkNeedZero(new Date().getMonth() + 1) + "-" + 
        this.checkNeedZero(new Date().getDate()) + " " + this.checkNeedZero(new Date().getHours()) + ":" + 
        this.checkNeedZero(new Date().getMinutes()) + ":" + this.checkNeedZero(new Date().getSeconds());
    },
    // 如果是個位數則前面補 0
    checkNeedZero(num) {
      let newNum = ('' + num).length == 1? '0' + num : num;
      return newNum
    },
    // 新增電號
    addElectricNum(){
      this.dispatchInfo.electricNumList.push({start: '', end: ''});
    },
    // 移除電號
    removeElectricNum(index){
      this.dispatchInfo.electricNumList.splice(index, 1);
    },
    // 新增包制電號
    addPackageNum(){
      this.dispatchInfo.packageNumList.push({start: '', end: ''});
    },
    // 移除包制電號
    removePackageNum(index){
      this.dispatchInfo.packageNumList.splice(index, 1);
    },
    // 新增高壓電號
    addHighVoltageNum(){
      this.dispatchInfo.highVoltageNumList.push({start: '', end: ''});
    },
    // 移除高壓電號
    removeHighVoltageNum(index){
      this.dispatchInfo.highVoltageNumList.splice(index, 1);
    },
    // 新增表制電號
    addMeterElectricNum(){
      this.dispatchInfo.meterElectricNumList.push({start: '', end: ''});
    },
    // 刪除表制電號
    removeMeterElectricNum(index){
      this.dispatchInfo.meterElectricNumList.splice(index, 1);
    },

   

    

    /**
     * Ajax start
     * 
     */


    // Action:查詢全部啟用中的核算派工資料
    queryAccountingDispatchInfo(){
      AjaxService.post('/accountingDispatch/queryAccountingDispatchInfo',{},
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.returnMessage,'查詢全部啟用中的核算派工資料');
                    return;
                }
                // 驗證formList是否有資料
                if(ValidateUtil.isEmpty(response.restData.dispatchList) || response.restData.dispatchList.length < 1 ){
                    MessageService.showInfo('查無相關資料');
                    return;
                }

                // 將取得的資料放進前端參數中
                this.dispatchList = response.restData.dispatchList;

            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
          
    },

    // Action: 查詢核算員檢算員下拉選單
    queryAccountingDispatchOption(){
      AjaxService.post('/accountingDispatch/queryAccountingDispatchOption',{},
      (response) => {
          // 驗證是否成功
          if (!response.restData.success) {              
              MessageService.showError(response.restData.returnMessage,'查詢核算員檢算員下拉選單');
              return;
          }

          // 將取得的資料放進前端參數中
          this.accountingList = response.restData.accountingList;
          this.calculateList = response.restData.calculateList;
          this.oriAccoutingList = JSON.parse(JSON.stringify(response.restData.accountingList));
          this.oriCalculateList = JSON.parse(JSON.stringify(response.restData.calculateList));
          this.filterAccounting();

      },
      // eslint-disable-next-line no-unused-vars
      (response) => {                
          MessageService.showSystemError();
      });
    },

    // Action:依核算員編號查詢啟用的核算派工設定資料
    queryDispatchByAccounting(item){
      AjaxService.post('/accountingDispatch/queryDispatchByAccounting',
      {
        accounting:item.accounting,
      },
      (response) => {
          // 驗證是否成功
          if (!response.restData.success) {              
              MessageService.showError(response.restData.returnMessage,'依核算員編號查詢啟用的核算派工設定資料');
              return;
          }

          // 驗證formList是否有資料
          if(ValidateUtil.isEmpty(response.restData.dispatchList) || response.restData.dispatchList.length < 1 ){
            MessageService.showInfo('查無相關資料');
            return;
        }
            // 整理資料
            this.sortDispatchData(response.restData.dispatchList);
            // 切換 dialog 模式
            this.changeDialog('edit');
            // 打開 dialog
            this.dialog = true;

      },
      // eslint-disable-next-line no-unused-vars
      (response) => {                
          MessageService.showSystemError();
      });
     },

     // Action:修改派工設定
     updateDispatch(dispatchList){
       AjaxService.post('/accountingDispatch/updateDispatch',
       {
          dispatchList : dispatchList,
       },
       (response) => {
           // 驗證是否成功
           if (!response.restData.success) {              
               MessageService.showError(response.restData.returnMessage,'修改派工設定');
               return;
           }
           // 驗證是否重複
           if (!ValidateUtil.isEmpty(response.restData.message)) {              
            MessageService.showError(response.restData.message,'修改派工設定');
            return;
           } 
            // 關閉 dialog
            this.dialog = false;
            MessageService.showSuccess('修改派工設定');
            this.queryAccountingDispatchInfo();
            this.queryAccountingDispatchOption(); 
       },
       // eslint-disable-next-line no-unused-vars
       (response) => {                
           MessageService.showSystemError();
       });

      
    },

     // Action:新增派工設定
     createDispatch(dispatchList){
       AjaxService.post('/accountingDispatch/insertDispatch',
       {
          dispatchList : dispatchList,
       },
       (response) => {
           // 驗證是否成功
           if (!response.restData.success) {              
               MessageService.showError(response.restData.returnMessage,'新增派工設定');
               return;
           }
           // 驗證是否重複
           if (!ValidateUtil.isEmpty(response.restData.message)) {              
            MessageService.showError(response.restData.message,'新增派工設定');
            return;
        }
 
          // 關閉 dialog
          this.dialog = false;
          MessageService.showSuccess('新增派工設定');
          this.queryAccountingDispatchInfo();
          this.queryAccountingDispatchOption(); 
       },
       // eslint-disable-next-line no-unused-vars
       (response) => {                
           MessageService.showSystemError();
       });

    },

    // Action:刪除派工設定
    deleteDispatch(){
      AjaxService.post('/accountingDispatch/deleteDispatch',
      {
        accounting: this.selectDispatch.accounting,
        className: this.selectDispatch.className,
      },
      (response) => {
          // 驗證是否成功
          if (!response.restData.success) {              
              MessageService.showError(response.restData.returnMessage,'刪除派工設定');
              return;
          }

        this.deleteDispatchModel = false;
        MessageService.showSuccess("刪除派工設定");
        this.queryAccountingDispatchInfo();
        this.queryAccountingDispatchOption()

      },
      // eslint-disable-next-line no-unused-vars
      (response) => {                
          MessageService.showSystemError();
      });

    },

     


    /**
     * Ajax end
     * 
     */


    /**
     *  資料整理 start
     * 
     */

    // 將選擇的核算員/檢算員整理到dispatchInfo中
    change(type){
        if(type === 'accounting'){
          this.dispatchInfo.accounting = this[type].empNo;
          this.dispatchInfo.accountingName = this[type].empName;
        } else {
          this.dispatchInfo.calculate = this[type].empNo;
          this.dispatchInfo.calculateName = this[type].empName;
        }
    },

    // 整理取出的資料
    sortDispatchData(dispatchList){
      let electricNumList = [];         // 不論契約種類 電號範圍清單
      let packageNumList = [];          // 契約種類-包制 電號範圍清單
      let highVoltageNumList = [];      // 契約種類-高壓 電號範圍清單
      let meterElectricNumList = [];    // 契約種類-表制 電號範圍清單
      let computeDateList = [];         // 契約種類-表制 計算日清單
      let hasPackage = false;           // 是否有契約種類-包制的資料 
      let hasHighVoltage = false;       // 是否有契約種類-高壓的資料 
      let hasMeter = false;             // 是否有契約種類-表制的資料 
      let meterType = null;             // 在契約種類-表制中是否有選擇電號(0)還是計算日(1) 

      debugger;
      // 判斷為契約種類還是無限定，V無限定/H高壓/P包制/F表制
      if(dispatchList[0].type === 'V'){
        this.dispatchInfo.dispatchType = 0;  //不論契約種類
      } else {
        this.dispatchInfo.dispatchType = 1;  //有契約種類
      }

      // 判斷是哪種電號及計算日
      for(let i in dispatchList){
        // 類型為無限定
        if(dispatchList[i].type === 'V'){
            electricNumList.push({
            start:dispatchList[i].electricNumStart,
            end:dispatchList[i].electricNumEnd,
          })
        // 類型為高壓
        } else if(dispatchList[i].type === 'H'){    
            hasHighVoltage = true;
            highVoltageNumList.push({
            start:dispatchList[i].electricNumStart,
            end:dispatchList[i].electricNumEnd,
          })
        // 類型為包制
        } else if(dispatchList[i].type === 'P'){
            hasPackage = true;
            packageNumList.push({
            start:dispatchList[i].electricNumStart,
            end:dispatchList[i].electricNumEnd,
          })
        // 類型為表制
        } else if(dispatchList[i].type === 'F'){
            hasMeter = true;
            // 類型為表制 > 計算日
            if(!ValidateUtil.isEmpty(dispatchList[i].computeDate)){
              meterType = 1;
              computeDateList.push(
                dispatchList[i].computeDate
              )
            // 類型為表制 > 電號
            } else {
              meterType = 0;
              meterElectricNumList.push({
              start:dispatchList[i].electricNumStart,
              end:dispatchList[i].electricNumEnd,
            })
          }
        }
      }

      // 判斷哪些電號沒有值，塞預設值     
      this.defaultList(electricNumList);
      this.defaultList(highVoltageNumList);
      this.defaultList(packageNumList);
      this.defaultList(meterElectricNumList);

      // 將整理好的資料放回去
      this.dispatchInfo.className = dispatchList[0].className;
      this.dispatchInfo.accounting = dispatchList[0].accounting;
      this.dispatchInfo.accountingName = dispatchList[0].accountingName;
      this.dispatchInfo.calculate = dispatchList[0].calculate;
      this.dispatchInfo.calculateName = dispatchList[0].calculateName;
      this.dispatchInfo.electricNumList = electricNumList;
      this.dispatchInfo.highVoltageNumList = highVoltageNumList;
      this.dispatchInfo.packageNumList = packageNumList;
      this.dispatchInfo.meterElectricNumList = meterElectricNumList;
      this.dispatchInfo.computeDateList = computeDateList;
      this.dispatchInfo.useHighVoltage = hasHighVoltage;
      this.dispatchInfo.usePackage = hasPackage;
      this.dispatchInfo.useMeter = hasMeter;
      this.dispatchInfo.meterType = meterType;

      
    },

    // 沒有值的電號清單塞預設值
    defaultList(dataList){
      if(dataList.length === 0){
        dataList.push({
          start:null,
          end:null
        })
      } 
    },

    // 整理Input資料
    /**
     * 1.契約種類有分為兩類:純電號or契約種類 包制,高壓,表制，只能二選一設定
     * 2.可接受多組電號範圍
     * 3.表制又分為電號/計算日，只能二選一設定 
     * 
     */
    setInputVal(actionType){
      let isValid = true;
      let dispatchList = [];


      // 驗證必填欄位是否為空值
      if(!this.checkRequired()){        
        isValid = false;
      }

      // 將電號整理並放到dispatchList中      
      // 無契約種類-純電號
      if(this.dispatchInfo.dispatchType === 0 && this.dispatchInfo.electricNumList.length > 0) {
          for(let i in this.dispatchInfo.electricNumList){
            // 判斷電號起訖號是否都有值
            if(!ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].end)){
                // 將資料加到dispatchList中
                dispatchList.push({
                  className : this.dispatchInfo.className,
                  accounting : this.dispatchInfo.accounting,
                  accountingName :this.dispatchInfo.accountingName,
                  calculate : this.dispatchInfo.calculate,
                  calculateName : this.dispatchInfo.calculateName,
                  type : 'V',
                  electricNumStart : this.dispatchInfo.electricNumList[i].start,
                  electricNumEnd : this.dispatchInfo.electricNumList[i].end,
                })            
              }
          }
      // 有契約種類類別
      } else if(this.dispatchInfo.dispatchType === 1 ){
         // 包制
        if(this.dispatchInfo.usePackage && this.dispatchInfo.packageNumList.length > 0) {
          for(let i in this.dispatchInfo.packageNumList){
            // 判斷電號起訖號是否都有值
            if(!ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].end)){
                // 將資料加到dispatchList中
                dispatchList.push({
                  className : this.dispatchInfo.className,
                  accounting : this.dispatchInfo.accounting,
                  accountingName :this.dispatchInfo.accountingName,
                  calculate : this.dispatchInfo.calculate,
                  calculateName : this.dispatchInfo.calculateName,
                  type : 'P',
                  electricNumStart : this.dispatchInfo.packageNumList[i].start,
                  electricNumEnd : this.dispatchInfo.packageNumList[i].end,
                })         
              }
          }
        }
        
        // 高壓
        if(this.dispatchInfo.useHighVoltage && this.dispatchInfo.highVoltageNumList.length > 0) {
          for(let i in this.dispatchInfo.highVoltageNumList){
            // 判斷電號起訖號是否都有值
            if(!ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].end)){
                // 將資料加到dispatchList中
                dispatchList.push({
                  className : this.dispatchInfo.className,
                  accounting : this.dispatchInfo.accounting,
                  accountingName :this.dispatchInfo.accountingName,
                  calculate : this.dispatchInfo.calculate,
                  calculateName : this.dispatchInfo.calculateName,
                  type : 'H',
                  electricNumStart : this.dispatchInfo.highVoltageNumList[i].start,
                  electricNumEnd : this.dispatchInfo.highVoltageNumList[i].end,
                })       
              }
          }
        }

        // 表制-選擇設定電號
        if(this.dispatchInfo.useMeter){
          if(this.dispatchInfo.meterType === 0 && this.dispatchInfo.meterElectricNumList.length > 0) {
              for(let i in this.dispatchInfo.meterElectricNumList){
                // 判斷電號起訖號是否都有值
                if(!ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].start) 
                  && !ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].end)){
                    // 將資料加到dispatchList中
                    dispatchList.push({
                      className : this.dispatchInfo.className,
                      accounting : this.dispatchInfo.accounting,
                      accountingName :this.dispatchInfo.accountingName,
                      calculate : this.dispatchInfo.calculate,
                      calculateName : this.dispatchInfo.calculateName,
                      type : 'F',
                      electricNumStart : this.dispatchInfo.meterElectricNumList[i].start,
                      electricNumEnd : this.dispatchInfo.meterElectricNumList[i].end,
                    })       
                  }
            }
          // 表制-選擇設定計算日
          } else if(this.dispatchInfo.meterType === 1 && this.dispatchInfo.computeDateList.length > 0){
              for(let i in this.dispatchInfo.computeDateList){   
                // 將資料加到dispatchList中         
                  dispatchList.push({
                    className : this.dispatchInfo.className,
                    accounting : this.dispatchInfo.accounting,
                    accountingName :this.dispatchInfo.accountingName,
                    calculate : this.dispatchInfo.calculate,
                    calculateName : this.dispatchInfo.calculateName,
                    type : 'F',
                    computeDate: this.dispatchInfo.computeDateList[i]
                  })                
              }
            }
          }        
        }

        // 驗證電號是否重複        
        if(!this.checkElectricRange(dispatchList)){
          isValid = false;          
        }


        // 最後判斷驗證是否都通過，再決定要打修改還是新增的Action
        if(isValid){
            // 打後端Action，判斷是修改還是新增
            if(actionType === 'edit'){
              // 打修改派工設定的action
              this.updateDispatch(dispatchList);
            } else {
              // 打新增派工設定的action
              this.createDispatch(dispatchList);
            }
        } else {
          MessageService.showCheckInfo(this.requiredArray,this.formatArray);
        }       

    },

    /*將已選擇的核算員移除，核算員不可重複設定 */ 
    filterAccounting(){
        let accountingList = JSON.parse(JSON.stringify(this.oriAccoutingList));
        for(let i in this.dispatchList){
          for(let y in accountingList){
            if(this.dispatchList[i].accounting === accountingList[y].empNo){
              this.selectIndex = accountingList.indexOf(accountingList[y]);
              accountingList.splice(this.selectIndex, 1);
            }
          }
        }

        this.accountingList = accountingList;

    },

    /**
     * 資料整理 end
     * 
     */


    /**
     * 驗證 start
     * 
     */

    // 驗證是否空值
    checkRequired(){
      let checkEmpty = true;
      this.requiredArray = [];
      this.formatArray = [];

      // 確認班別
      if(ValidateUtil.isEmpty(this.dispatchInfo.className)){
        this.errorMsg.className = '請輸入班別';
        this.requiredArray.push('班別');
        checkEmpty = false;
      } else {
        this.errorMsg.className = null;
      }

      // 確認核算員
      if(ValidateUtil.isEmpty(this.dispatchInfo.accounting)){
        this.errorMsg.accounting = '請選擇核算員';
        this.requiredArray.push('核算員');
        checkEmpty = false;
      } else {
        this.errorMsg.accounting = null;
      }

      // 確認檢算員
      if(ValidateUtil.isEmpty(this.dispatchInfo.calculate)){
        this.errorMsg.calculate = '請選擇檢算員';
        this.requiredArray.push('減算員');
        checkEmpty = false;
      } else {
        this.errorMsg.calculate = null;
      }

      let checkElectric = true;

      // 確認是否有選擇契約種類
      if(ValidateUtil.isEmpty(this.dispatchInfo.dispatchType)){
        this.errorMsg.classType = '請選擇分派班別設定';
        this.requiredArray.push('分派班別');
        checkEmpty = false;
      } else {
        this.errorMsg.classType = null;
      }

      // 選擇不限契約種類，是否有選擇電號
      if(this.dispatchInfo.dispatchType == 0 && this.dispatchInfo.electricNumList.length >= 1){
        for(let i in this.dispatchInfo.electricNumList){
          if(ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].start) 
            || ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].end)){
              checkElectric = false;
              break;
            }
          }          
          // 只要有一組電號範圍起訖號未填
          if(!checkElectric){
            this.errorMsg.electricNum = '電號範圍設定不完全';
            this.requiredArray.push('電號');
            checkEmpty = false;
          } else {
            this.errorMsg.electricNum = null;
          }
      } else {
        this.errorMsg.electricNum = null;
      }

      // 選擇契約種類是否有選擇電號
        if(this.dispatchInfo.dispatchType == 1 
          && !this.dispatchInfo.usePackage 
          && !this.dispatchInfo.useHighVoltage 
          && !this.dispatchInfo.useMeter){
            
            this.errorMsg.contractType = '請選擇契約種類';
            this.requiredArray.push('契約種類');
            checkEmpty = false;
        } else {
            this.errorMsg.contractType = null;
        }

        //選擇包制，是否有輸入電號範圍
        checkElectric = true;
        
        if(this.dispatchInfo.usePackage && this.dispatchInfo.packageNumList.length > 0){
          for(let i in this.dispatchInfo.packageNumList){
            if(ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].start) 
              || ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].end)){
                checkElectric = false;
                break;
              }
          }
          if(!checkElectric){
            this.errorMsg.packageNum = '請輸入包制電號設定範圍';
            this.requiredArray.push('包制電號');
            checkEmpty = false;
          } else {
            this.errorMsg.packageNum = null;
          }
        } else {
          this.errorMsg.packageNum = null;
        }
        

         //選擇高壓，是否有輸入電號範圍
         checkElectric = true;

         if(this.dispatchInfo.useHighVoltage && this.dispatchInfo.highVoltageNumList.length > 0){
            for(let i in this.dispatchInfo.highVoltageNumList){
              if(ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].start) 
                || ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].end)){
                  checkElectric = false;
                  break;
                }
            }

            if(!checkElectric){
              this.errorMsg.highVoltageNum = '請輸入高壓電號設定範圍';
              this.requiredArray.push('高壓電號');
              checkEmpty = false;
            } else {
              this.errorMsg.highVoltageNum = null;
            }
        } else {
          this.errorMsg.highVoltageNum = null;
        }

        
        if(this.dispatchInfo.useMeter && ValidateUtil.isEmpty(this.dispatchInfo.meterType)){
          this.errorMsg.meterType = '請選擇電號或計算日';
          this.requiredArray.push('表制');
          checkEmpty = false;
        } else {
          this.errorMsg.meterType = null;
        }


         //選擇表制，是否有輸入電號範圍
         checkElectric = true;
         
         if(this.dispatchInfo.useMeter && this.dispatchInfo.meterType == 0 && this.dispatchInfo.meterElectricNumList.length > 0){
            for(let i in this.dispatchInfo.meterElectricNumList){
              if(ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].start) 
                || ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].end)){
                  checkElectric = false;
                  break;
                }
            }

            if(!checkElectric) {
              this.errorMsg.meterElectricNum = '請輸入表制電號設定範圍';
              this.requiredArray.push('表制-電號');
              checkEmpty = false;
            } else {
              this.errorMsg.meterElectricNum = null;
            }

         } else {
          this.errorMsg.meterElectricNum = null;
         }

        if (this.dispatchInfo.useMeter && this.dispatchInfo.meterType == 1 && this.dispatchInfo.computeDateList.length < 1) {
          this.errorMsg.meterCompute = '請選擇計算日';
          this.requiredArray.push('表制-計算日');
          checkEmpty = false; 
        }  else {
          this.errorMsg.meterCompute = null;
        }


        return checkEmpty;

    },


    /* 驗證電號 selectItem:選到的電號,item:類型,listName:清單名稱,type:起號還是迄號*/
     checkElectric(selectItem,item,listName,type){

       this.checkRequired();

       let selectIndex = null;

       // 取出是第幾筆的電號資料
      if(!ValidateUtil.isEmpty(selectItem)){
        selectIndex = this.dispatchInfo[listName].indexOf(selectItem);
      }

      // 驗證電號格式
      if(!ValidateUtil.validateEletricNums(selectItem[type])){
        console.log(selectItem[type]);
        
        return;
      }

      // 驗證電號範圍
      if(!ValidateUtil.isEmpty(this.dispatchInfo[listName][selectIndex].start) 
          && !ValidateUtil.isEmpty(this.dispatchInfo[listName][selectIndex].end) ){
            if(parseInt(this.dispatchInfo[listName][selectIndex].start) > parseInt(this.dispatchInfo[listName][selectIndex].end) ){
              this.errorMsg[item] = '電號範圍錯誤';
              this.formatArray.push('電號範圍');
              return;
            }
          }

     },

    // 驗證傳入參數的電號範圍是否重複
    checkElectricRange(dispatchList){
      let electricRange = true;
      let eletric = [];
      for(let i in dispatchList){
        eletric.push({
            start: dispatchList[i].electricNumStart,
            end:dispatchList[i].electricNumEnd,
        });       
      }

      for(let i in dispatchList){
          for(let index in eletric){
            // 不比對自己的電號
            if(dispatchList.indexOf(dispatchList[i]) !== eletric.indexOf(eletric[index])){
                if(parseInt(dispatchList[i].electricNumStart) <= parseInt(eletric[index].end)
                  && parseInt(dispatchList[i].electricNumEnd) >= parseInt(eletric[index].start)){
                    electricRange = false;                       
                    break; 
                  }
            }
            if(!electricRange) {
              break; 
            }  
          }
      }

      // 若有電號區間重複則顯示錯誤訊息
      if(!electricRange) {
        this.errorMsg.classType = '電號範圍區間重複';
        this.formatArray.push('電號範圍');
      }  

      return electricRange;     
    },

    // 修改不論契約種類or依契約種類設定選項，會將另一邊的錯誤訊息清空
    changeDispatchType(type){
      if(type === 'non') {
          this.errorMsg.contractType = null;
          this.errorMsg.packageNum = null;
          this.errorMsg.highVoltageNum = null;
          this.errorMsg.meterType= null;
          this.errorMsg.meterElectricNum = null;
          this.errorMsg.meterCompute = null;
      } else {
        this.errorMsg.electricNum = null
      }
    }

    /**
     * 驗證 end
     * 
     */
  }
}