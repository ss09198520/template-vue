import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

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
        { text: '核算員姓名', value: 'accountingName', align: 'center' },
        { text: '檢算員', value: 'calculate', align: 'center' },
        { text: '檢算員姓名', value: 'calculateName', align: 'center' },
        { text: '設定人員', value: 'settingUser', align: 'center' },
        { text: '設定人員姓名', value: 'settingUserName', align: 'center' },
        { text: '設定日期', value: 'settingDate', align: 'center' },
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
      accountingList:[
        {empNo:'105012121', empName:'李小凡'},
        {empNo:'105012122', empName:'葉星辰'},
        {empNo:'105012123', empName:'王大明'},
      ],
      // 檢算員下拉選單
      calculateList:[
        {empNo:'105012124', empName:'連家齊'},
        {empNo:'105012125', empName:'甄文君'},
        {empNo:'105012126', empName:'君令偉'},
      ],
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
        electricNum:null,
        packageNum:null,
        highVoltageNum: null,
        meterType:null,
        meterElectricNum: null,
        meterCompute: null,
      }
     
    }
  },
  methods: {
    init(){
      this.queryInit();
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


    // Action:初始化
    queryInit(){
      let dispatchList = [        
          { 
            className: '1', 
            accounting: '1050434018', 
            accountingName: '王大明', 
            calculate: '1050434017',
            calculateName: '葉星辰',
            settingUser: '1050334016', 
            settingUserName: '李小凡', 
            settingDate: '2021-09-11 10:55:31', 
          },
          { 
            className: '2', 
            accounting: '1050434019', 
            accountingName: '李阿貴', 
            calculate: '1050434017',
            calculateName: '葉星辰',
            settingUser: '1050334016', 
            settingUserName: '李小凡', 
            settingDate: '2021-09-11 10:57:13', 
          }
      ];
      this.dispatchList = dispatchList;
    },

    // Action:查詢派工設定
     queryDispatch(item){
      // 查詢選取的派工資訊-先放Mock資料
      let dispatchList = [
        { 
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'P',
          status:'ACTIVE',
          computeDate:'',
          electricNumStart:'07140000000',
          electricNumEnd:'07140000099',
        },
        {
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'P',
          status:'ACTIVE',
          computeDate:'',
          electricNumStart:'07140000200',
          electricNumEnd:'07140000299',
        },
        {
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'H',
          status:'ACTIVE',
          computeDate:'',
          electricNumStart:'07140000300',
          electricNumEnd:'07140000399',
        },
        {
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'H',
          status:'ACTIVE',
          computeDate:'',
          electricNumStart:'07140000300',
          electricNumEnd:'07140000399',
        },
        {
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'F',
          status:'ACTIVE',
          computeDate:'01',
          electricNumStart:'',
          electricNumEnd:'',
        },
        {
          seq:'1',
          className:'1',
          accounting: '1050434019', 
          accountingName: '王大明', 
          calculate: '1050434017',
          calculateName: '葉星辰',
          type:'F',
          status:'ACTIVE',
          computeDate:'15',
          electricNumStart:'',
          electricNumEnd:'',
        },
      ];

      // 整理資料
      this.sortDispatchData(dispatchList);
          
      // 記下這次修改的 item
      this.editIndex = this.dispatchList.indexOf(item);
      // 切換 dialog 模式
      this.changeDialog('edit');
      // 打開 dialog
      this.dialog = true;

     },

     // Action:修改派工設定
     updateDispatch(dispatchList){
      console.log(dispatchList);
       // 關閉 dialog
       this.dialog = false;
    },

     // Action:新增派工設定
     createDispatch(dispatchList){
      console.log(dispatchList);
       // 關閉 dialog
       this.dialog = false;

    },

    // Action:刪除派工設定
    removeDispatch(){
      console.log(this.selectDispatch.accounting);
      if (this.selectIndex > -1) {
        this.dispatchList.splice(this.selectIndex, 1);
      }
      this.deleteDispatchModel = false;
      MessageService.showSuccess("刪除派工成功✓");
    },

     


    /**
     * Ajax end
     * 
     */


    /**
     *  資料整理 start
     * 
     */

    change(type){
        if(type === 'accounting'){
          this.dispatchInfo.accounting = this[type].empNo;
          this.dispatchInfo.accountingName = this[type].empName;
        } else {
          this.dispatchInfo.calculate = this[type].empNo;
          this.dispatchInfo.calculateName = this[type].empName;
        }
    },

    sortDispatchData(dispatchList){

      let electricNumList = [];
      let packageNumList = [];
      let highVoltageNumList = [];
      let meterElectricNumList = [];
      let computeDateList = [];
      let hasPackage = false;
      let hasHighVoltage = false;
      let hasMeter = false;
      let meterType = null;


      // 判斷為契約種類還是無限定，V無限定/H高壓/P包制/F表制
      if(dispatchList[0].type === 'V'){
        this.dispatchInfo.dispatchType = 0;
      } else {
        this.dispatchInfo.dispatchType = 1;
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
            if(dispatchList[i].computeDate.length > 0){
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

      // 判斷哪些電號沒有值，塞預設
      if(electricNumList.length === 0){
        electricNumList.push({
          start:null,
          end:null
        })
      } 
      if(highVoltageNumList.length === 0){
        highVoltageNumList.push({
          start:null,
          end:null
        })
      }
      if(packageNumList.length === 0){
        packageNumList.push({
          start:null,
          end:null
        })
      } 
      if(meterElectricNumList.length === 0){
        meterElectricNumList.push({
          start:null,
          end:null
        })
      }

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

    // 整理Input資料
    /**
     * 1.契約種類有分為兩類:純電號or契約種類 包制,高壓,表制，只能二選一設定
     * 2.可接受多組電號範圍
     * 3.表制又分為電號/計算日，只能二選一設定 
     * 
     */
    setInputVal(actionType){      
      
      // 驗證電號格式，若失敗直接return
      if(!this.checkElectric()){
        return;
      }

      let dispatchList = [];

      // 無契約種類-純電號
      if(this.dispatchInfo.dispatchType === 0 && this.dispatchInfo.electricNumList.length > 0) {
          for(let i in this.dispatchInfo.electricNumList){
            if(!ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.electricNumList[i].end)){
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
            if(!ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.packageNumList[i].end)){
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
            if(!ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].start) 
              && !ValidateUtil.isEmpty(this.dispatchInfo.highVoltageNumList[i].end)){
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
                if(!ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].start) 
                  && !ValidateUtil.isEmpty(this.dispatchInfo.meterElectricNumList[i].end)){
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
        if(this.checkElectricRange(dispatchList)){
            // 打後端Action，判斷是修改還是新增
            if(actionType === 'edit'){
              // 打修改派工設定的action
              this.updateDispatch(dispatchList);
            } else {
              // 打新增派工設定的action
              this.createDispatch(dispatchList);
            }
        }

        

    },

    /**
     * 資料整理 end
     * 
     */


    /**
     * 驗證 start
     * 
     */

    // 驗證電號
     checkElectric(selectItem,listName,type){
       // 取出是第幾筆的電號資料
      let selectIndex = this.dispatchInfo[listName].indexOf(selectItem);

      // 驗證電號格式
      if(!ValidateUtil.validateEletricNums(selectItem[type])){
        return;
      }

      // 驗證電號範圍
      if(!ValidateUtil.isEmpty(this.dispatchInfo[listName][selectIndex].start) 
          && !ValidateUtil.isEmpty(this.dispatchInfo[listName][selectIndex].end) ){
            if(parseInt(this.dispatchInfo[listName][selectIndex].start) > parseInt(this.dispatchInfo[listName][selectIndex].end) ){
              console.log('電號範圍錯誤');
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
                    console.log('重複電號範圍')
                    break; 
                  }
            }          
          }
      }
      return electricRange;     
    }


    /**
     * 驗證 end
     * 
     */
  }
}