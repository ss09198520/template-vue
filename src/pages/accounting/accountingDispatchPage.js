import MessageService from "@/assets/services/message.service";

export default {
  name: 'MyWaiting',
  props: {
  
  },
  data() {
    return {
      headers: [
        { text: '班別', value: 'class', align: 'center' },
        { text: '核算員', value: 'accounting', align: 'center' },
        { text: '核算員姓名', value: 'accountingName', align: 'center' },
        { text: '檢算員', value: 'checking', align: 'center' },
        { text: '檢算員姓名', value: 'checkingName', align: 'center' },
        { text: '設定人員', value: 'settingUser', align: 'center' },
        { text: '設定人員姓名', value: 'settingUserName', align: 'center' },
        { text: '設定日期', value: 'settingDate', align: 'center' },
        { text: '狀態操作', value: 'edit', align: 'center' }
      ],
      itemList: [
        { 
          class: '1', 
          accounting: '1050434018', 
          accountingName: '王大明', 
          checking: '1050434017',
          checkingName: '葉星辰',
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: '2021/09/11 10:55:31', 
          edit: true, 
          remove: true,
          dialogContent: {
            dispatchType: 0,
            usePackage: false,
            useHighVoltage: false,
            useMeter: false,
            meterType: null,
            computeDate: [],
            electricNumList: [
              {start: '07-14-0000-00-0', end: '07-14-9999-99-9'},
              {start: '07-16-0000-00-0', end: '07-16-9999-99-9'},
            ],
            packageNumList: [
              {start: '', end: ''},
            ],
            highVoltageNumList:[
              {start: '', end: ''},
            ],
            meterElectricNumList:[
              {start: '', end: ''},
            ],
            startPackageElectricNum: '',
            endPackageElectriNum: '',
            startHighVoltageElectricNum: '',
            endHighVoltageElectricNum: '',
            startMeterElectricNum: '',
            endMeterElectricNum: ''
          },
        },
        { 
          class: '2', 
          accounting: '1050434019', 
          accountingName: '李阿貴', 
          checking: '1050434017',
          checkingName: '葉星辰',
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: '2021/09/11 10:57:13', 
          edit: true, 
          remove: true,
          dialogContent: {
            dispatchType: 1,
            usePackage: true,
            useHighVoltage: true,
            useMeter: true,
            meterType: 1,
            computeDate: ['01', '03', '05', '07', '09'],
            electricNumList: [
              {start: '', end: ''},
            ],
            packageNumList: [
              {start: '07-14-0000-00-0', end: '07-14-9999-99-9'},
            ],
            highVoltageNumList:[
              {start: '07-14-0000-00-0', end: '07-14-9999-99-9'},
            ],
            meterElectricNumList:[
              {start: '', end: ''},
            ],
            startPackageElectricNum: '',
            endPackageElectriNum: '',
            startHighVoltageElectricNum: '',
            endHighVoltageElectricNum: '',
            startMeterElectricNum: '',
            endMeterElectricNum: ''
          }
        }
      ],
      dialog: false,
      dialogType: 'add',
      dialogTitle: '新增派工',
      employeeList: ['1050334016 李小凡', '1050434017 葉星辰', '1050434018 王大明', '1050434019 李阿貴'],
      dataListPage: 1,
      dataListPageCount: 1,
      // 新增/修改 Modal 內容
      dialogContent: {
        // 班別
        class: '',
        // 核算員
        accountingName: '',
        // 檢算員
        checkingName: '',
        // 派工方式 0: 直接以電號分派 / 1: 依契約種類設定分派
        // dispatchType: 0,
        // 包制
        usePackage: false,
        // 高壓
        useHighVoltage: false,
        // 表制
        useMeter: false,
        // 表制分派方式 0: 以電號分派 / 1: 以計算日分派
        // meterType: 0,
        // 選擇的計算日
        computeDate: [],
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
        startPackageElectricNum: '',
        endPackageElectriNum: '',
        // 高壓電號區間
        startHighVoltageElectricNum: '',
        endHighVoltageElectricNum: '',
        // 表制電號區間
        startMeterElectricNum: '',
        endMeterElectricNum: ''
      },
      editIndex: -1,
      closeText: '　關閉　',
      deleteDispatchModel:false,
      selectIndex: null,
    }
  },
  methods: {
    // 開啟新增派工 dialog
    newDispatch(){
      // 切換 dialog 模式
      this.changeDialog('add');

      // 清空 dialog 內容
      this.dialogContent = {
        class: '',
        accountingName: '',
        checkingName: '',
        // dispatchType: 0,
        usePackage: false,
        useHighVoltage: false,
        useMeter: false,
        // meterType: 0,
        computeDate: [],
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
        startPackageElectricNum: '',
        endPackageElectriNum: '',
        startHighVoltageElectricNum: '',
        endHighVoltageElectricNum: '',
        startMeterElectricNum: '',
        endMeterElectricNum: ''
      };

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
    // 儲存新增派工
    saveNewDispatch() {
      let newItem = {
        class: this.dialogContent.class,
        accounting: this.dialogContent.accountingName.split(" ")[0],
        accountingName: this.dialogContent.accountingName.split(" ")[1],
        checking: this.dialogContent.checkingName.split(" ")[0],
        checkingName: this.dialogContent.checkingName.split(" ")[1],
        settingUser: '1050334016', 
        settingUserName: '李小凡', 
        settingDate: this.getDate(),
        edit: true,
        remove: true,
        dialogContent: this.dialogContent
      }
      this.itemList.push(newItem);
      // 關閉 dialog
      this.dialog = false;
    },
    // 修改派工
    editDispatch(item) {
      // 把選取的派工資訊放到 dialog 上
      this.dialogContent = item.dialogContent;
      this.dialogContent.class = item.class;
      this.dialogContent.accountingName = item.accounting + " " + item.accountingName;
      this.dialogContent.checkingName = item.checking + " " + item.checkingName;
      // 記下這次修改的 item
      this.editIndex = this.itemList.indexOf(item);
      // 切換 dialog 模式
      this.changeDialog('edit');
      // 打開 dialog
      this.dialog = true;
    },
    saveEditDispatch() {
      if(this.editIndex > -1){
        let editItem = {
          class: this.dialogContent.class,
          accounting: this.dialogContent.accountingName.split(" ")[0],
          accountingName: this.dialogContent.accountingName.split(" ")[1],
          checking: this.dialogContent.checkingName.split(" ")[0],
          checkingName: this.dialogContent.checkingName.split(" ")[1],
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: this.getDate(),
          edit: true,
          remove: true,
          dialogContent: this.dialogContent
        }
        /* 直接更新特定 item 畫面不會刷新
           解法1: 刪除重新加
           解法2: 更新特定 item 後調用 window.location.reload() 強制刷新
           目前 prototype 先用解法1 
        */
        this.itemList.splice(this.editIndex, 1);
        this.itemList.push(editItem);
      }
      // 關閉 dialog
      this.dialog = false;
    },
    // 刪除派工
    remove(item) {
      this.selectIndex = this.itemList.indexOf(item);
      this.deleteDispatchModel = true;
      
    },
    getDate() {
      return new Date().getFullYear() + "/" + this.checkNeedZero(new Date().getMonth() + 1) + "/" + 
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
      this.dialogContent.electricNumList.push({start: '', end: ''});
    },
    removeElectricNum(index){
      this.dialogContent.electricNumList.splice(index, 1);
    },
    // 新增包制電號
    addPackageNum(){
      this.dialogContent.packageNumList.push({start: '', end: ''});
    },
    removePackageNum(index){
      this.dialogContent.packageNumList.splice(index, 1);
    },
    // 新增高壓電號
    addHighVoltageNum(){
      this.dialogContent.highVoltageNumList.push({start: '', end: ''});
    },
    removeHighVoltageNum(index){
      this.dialogContent.highVoltageNumList.splice(index, 1);
    },
    addMeterElectricNum(){
      this.dialogContent.meterElectricNumList.push({start: '', end: ''});
    },

    removeMeterElectricNum(index){
      this.dialogContent.meterElectricNumList.splice(index, 1);
    },

    submit(){
      if (this.selectIndex > -1) {
        this.itemList.splice(this.selectIndex, 1);
      }
      this.deleteDispatchModel = false;
      MessageService.showSuccess("刪除派工成功✓");
    },
  }
}