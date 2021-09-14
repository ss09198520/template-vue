<template>
  <v-app>
    <v-container>
      <h2 class="font-bold">核算派工設定</h2>
      <v-row>
        <v-col>
          <v-btn class="success" style="margin:10px;" @click="dialog=true;">新增派工</v-btn>
        </v-col>
      </v-row>
      <hr>
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="headers"
            :items="itemList"
            :page.sync="dataListPage"
            :items-per-page="10"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            disable-sort
            @page-count="dataListPageCount = $event"
          >
            <template v-slot:item.edit="{ item }">
              <v-btn :disabled="!item.edit" class="success" @click="editDispatch(item)">修改派工</v-btn>
            </template>
            <template v-slot:item.remove="{ item }">
              <v-btn :disabled="!item.remove" class="error" @click="remove(item)">刪除派工</v-btn>
            </template>
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="dataListPage"
              color="#2F59C4"
              :length="dataListPageCount"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="800px"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <hr>
          <div class="ml-10">
            <div class="font-18px font-bold">
              <v-row align="center mt-5">          
                <v-col cols="2">       
                  班別
                </v-col>   
                <v-col cols="3">
                  <v-text-field
                    v-model="dialogContent.class"
                    outlined
                    hide-details                                         
                    dense
                    placeholder="請輸入班別"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">       
                  核算員
                </v-col>         
                <v-col cols="3">
                  <v-select
                    id="accountingSelect"
                    v-model="dialogContent.accountingName"
                    outlined
                    hide-details                                         
                    dense
                    placeholder="請選擇核算員"
                    :items="employeeList"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="4">
                  登記單分派班別設定：
                </v-col>
              </v-row>
              <v-radio-group v-model="dialogContent.dispatchType">
                <v-radio label="不論契約種類，皆以電號設定分派班別。" value="electricNum" />
                <v-row style="margin: 0 10px 10px 10px;" align="center">
                  <div style="height: 10px; width: 15px;" />
                  <span style="margin-right: 10px;" :class="dialogContent.dispatchType==='electricNum'? '':'disable-text'">電號 : </span>         
                  <v-col cols="3">
                    <v-text-field
                      v-model="dialogContent.startElectricNum"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dialogContent.dispatchType !== 'electricNum'"
                    />
                  </v-col>
                  ~
                  <v-col cols="3">
                    <v-text-field
                      v-model="dialogContent.endElectricNum"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dialogContent.dispatchType !== 'electricNum'"
                    />
                  </v-col>
                </v-row>
                <v-radio label="依契約種類設定分派班別：" value="contractType" />
                <v-row style="margin: 10px;" align="center">
                  <v-col style="padding-top: 0;">
                    <v-row align="center">            
                      <v-checkbox 
                        v-model="dialogContent.usePackage" 
                        hide-details
                        class="shrink mt-0"
                        style="margin-top: 0;" 
                        :disabled="dialogContent.dispatchType!=='contractType'"
                      />
                      <span style="margin: 10px;" :class="dialogContent.usePackage? '':'disable-text'">包制: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.startPackageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.usePackage"
                        />
                      </v-col>
                      ~
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.endPackageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.usePackage"
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">            
                      <v-checkbox 
                        v-model="dialogContent.useHighVoltage"
                        hide-details
                        class="shrink mt-0" 
                        style="margin-top: 0;"
                        :disabled="dialogContent.dispatchType!=='contractType'"
                      />
                      <span style="margin: 10px;" :class="dialogContent.useHighVoltage? '':'disable-text'">高壓: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.startHighVoltageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.usePackage"
                        />
                      </v-col>
                      ~
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.endHighVoltageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.usePackage"
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-checkbox 
                        v-model="dialogContent.useMeter" 
                        hide-details
                        class="shrink mt-0"
                        style="margin-top: 0;"
                        :disabled="dialogContent.dispatchType!=='contractType'" 
                      />
                      <span style="margin-left: 10px; width: 40px;" :class="dialogContent.useMeter? '':'disable-text'">表制: </span>
                      <v-radio v-model="dialogContent.meterType" value="useElectricNum" :disabled="!dialogContent.useMeter">
                        <template v-slot:label>
                          <v-row align="center">
                            <span style="margin: 10px;">電號</span>
                            <v-col cols="5">
                              <v-text-field
                                v-model="dialogContent.startMeterElectricNum"
                                outlined
                                hide-details                                         
                                dense
                                :disabled="!dialogContent.usePackage"
                              />
                            </v-col>
                            ~
                            <v-col cols="5">
                              <v-text-field
                                v-model="dialogContent.endMeterElectricNum"
                                outlined
                                hide-details                                         
                                dense
                                :disabled="!dialogContent.usePackage"
                              />
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </v-row>
                    <v-row>
                      <div style="height: 10px;width: 82px;" />
                      <v-radio v-model="dialogContent.meterType" style="margin-top: 10px;" value="useComputeDate" :disabled="!dialogContent.useMeter">
                        <template v-slot:label>
                          <v-row align="center">
                            <span style="margin: 10px;">計算日:</span>
                            <v-col>
                              <v-row>
                                <v-checkbox v-model="dialogContent.computeDate" label="01" value="01" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="02" value="02" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="03" value="03" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="04" value="04" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="05" value="05" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="06" value="06" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="07" value="07" class="meter-checkbox" />
                                <v-checkbox v-model="dialogContent.computeDate" label="08" value="08" class="meter-checkbox" />
                              </v-row>
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </v-row>
                    <v-row style="margin-top: 0;">
                      <div style="height: 10px;width: 174px;" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="09" value="09" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="10" value="10" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="11" value="11" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="12" value="12" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="13" value="13" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="14" value="14" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="15" value="15" class="meter-checkbox" />
                      <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter" label="16" value="16" class="meter-checkbox" />
                    </v-row>
                  </v-col>
                </v-row>
              </v-radio-group>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn style="margin: 0 10px 10px 0;" @click="dialog = false">{{ closeText }}</v-btn>
          <v-btn v-if="dialogType==='add'" color="success" style="margin-bottom: 10px;" @click="saveNewDispatch()">新增派工</v-btn>
          <v-btn v-if="dialogType==='edit'" color="success" style="margin-bottom: 10px;" @click="saveEditDispatch()">修改派工</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

export default {
  name: 'MyWaiting',
  props: {
  
  },
  data() {
    return {
      headers: [
        { text: '修改', value: 'edit', align: 'center' },
        { text: '刪除', value: 'remove', align: 'center' },
        { text: '班別', value: 'class', align: 'center' },
        { text: '核算員', value: 'accounting', align: 'center' },
        { text: '核算員姓名', value: 'accountingName', align: 'center' },
        { text: '設定人員', value: 'settingUser', align: 'center' },
        { text: '設定人員姓名', value: 'settingUserName', align: 'center' },
        { text: '設定日期', value: 'settingDate', align: 'center' }
      ],
      itemList: [
        { 
          class: '1', 
          accounting: '1050434018', 
          accountingName: '王大明', 
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: '2021/09/11 10:55:31', 
          edit: true, 
          remove: true,
          dialogContent: {
            // 派工方式 electricNum: 直接以電號分派 / contractType: 根據契約種類設定
            dispatchType: 'electricNum',
            // 包制
            usePackage: false,
            // 高壓
            useHighVoltage: false,
            // 表制
            useMeter: false,
            // 表制分派方式 useElectricNum: 以電號分派 / useComputeDate: 以計算日分派
            meterType: '',
            // 選擇的計算日
            computeDate: [],
            // 電號區間
            startElectricNum: '07-14-0000-00-0',
            endElectricNum: '07-14-9999-99-9',
            // 包制電號區間
            startPackageElectricNum: '',
            endPackageElectriNum: '',
            // 高壓電號區間
            startHighVoltageElectricNum: '',
            endHighVoltageElectricNum: '',
            // 表制電號區間
            startMeterElectricNum: '',
            endMeterElectricNum: ''
          }
        },
        { 
          class: '2', 
          accounting: '1050434019', 
          accountingName: '李阿貴', 
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: '2021/09/11 10:57:13', 
          edit: true, 
          remove: true,
          dialogContent: {
            // 派工方式 electricNum: 直接以電號分派 / contractType: 根據契約種類設定
            dispatchType: 'contractType',
            // 包制
            usePackage: false,
            // 高壓
            useHighVoltage: false,
            // 表制
            useMeter: true,
            // 表制分派方式 useElectricNum: 以電號分派 / useComputeDate: 以計算日分派
            meterType: 'useComputeDate',
            // 選擇的計算日
            computeDate: ['01', '03', '05', '07', '09'],
            // 電號區間
            startElectricNum: '',
            endElectricNum: '',
            // 包制電號區間
            startPackageElectricNum: '',
            endPackageElectriNum: '',
            // 高壓電號區間
            startHighVoltageElectricNum: '',
            endHighVoltageElectricNum: '',
            // 表制電號區間
            startMeterElectricNum: '',
            endMeterElectricNum: ''
          }
        }
      ],
      dialog: false,
      dialogType: 'add',
      dialogTitle: '新增派工',
      // 空的 dialog 內容 for 新增派工使用
      emptyDialog: {
        class: '',
        accountingName: '',
        dispatchType: '',
        usePackage: false,
        useHighVoltage: false,
        useMeter: false,
        meterType: '',
        computeDate: [],
        startElectricNum: '',
        endElectricNum: '',
        startPackageElectricNum: '',
        endPackageElectriNum: '',
        startHighVoltageElectricNum: '',
        endHighVoltageElectricNum: '',
        startMeterElectricNum: '',
        endMeterElectricNum: ''
      },
      employeeList: ['1050334016 李小凡', '1050434017 葉星辰', '1050434018 王大明', '1050434019 李阿貴'],
      dataListPage: 1,
      dataListPageCount: 1,
      // 新增/修改 Modal 內容
      dialogContent: {
        // 班別
        class: '',
        // 核算員
        accountingName: '',
        // 派工方式 electricNum: 直接以電號分派 / contractType: 根據契約種類設定
        dispatchType: '',
        // 包制
        usePackage: false,
        // 高壓
        useHighVoltage: false,
        // 表制
        useMeter: false,
        // 表制分派方式 useElectricNum: 以電號分派 / useComputeDate: 以計算日分派
        meterType: '',
        // 選擇的計算日
        computeDate: [],
        // 電號區間
        startElectricNum: '',
        endElectricNum: '',
        // 包制電號區間
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
      closeText: '　關閉　'
    }
  },
  methods: {
    // 開啟新增派工 dialog
    newDispatch(){
      // 切換 dialog 模式
      this.changeDialog('add');
      // 清空 dialog 內容
      this.dialogContent = this.emptyDialog;
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
        settingUser: '1050334016', 
        settingUserName: '李小凡', 
        settingDate: this.getDate(),
        edit: true,
        remove: true
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
      // preSelect 核算員
      setTimeout(() => {
        document.getElementById("accountingSelect").value = item.accounting + " " + item.accountingName;
      }, 500);
      // 記下這次修改的 item
      this.editIndex = this.itemList.indexOf(item);
      console.log(this.editIndex);
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
          settingUser: '1050334016', 
          settingUserName: '李小凡', 
          settingDate: this.getDate(),
          edit: true,
          remove: true
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
      console.log(this.itemList);
    },
    // 刪除派工
    remove(item) {
      console.log(item);
      let index = this.itemList.indexOf(item);
      console.log(index);
      if (index > -1) {
        this.itemList.splice(index, 1);
      }
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
    }
  }
}
</script>

<style scoped>
  .meter-checkbox {
    width: 50px;
  }

  .disable-text {
    color: lightgray;
  }
</style>
