<template>
  <v-app>
    <v-container>
      <h2 class="font-bold">核算派工設定</h2>
      <v-row>
        <v-col>
          <v-btn class="success" style="margin:10px;" @click="newDispatch()">新增派工</v-btn>
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
                <v-col cols="6">
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
                <v-col cols="6">
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
                <v-radio label="不論契約種類，皆以電號設定分派班別。" />
                <v-row style="margin: 0 10px 10px 10px;" align="center">
                  <div style="height: 10px; width: 15px;" />
                  <span style="margin-right: 10px;" :class="dialogContent.dispatchType===0? '':'disable-text'">電號 : </span>         
                  <v-col cols="3">
                    <v-text-field
                      v-model="dialogContent.startElectricNum"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dialogContent.dispatchType !== 0"
                    />
                  </v-col>
                  <span :class="dialogContent.dispatchType!==1? '':'disable-text'">~</span>
                  <v-col cols="3">
                    <v-text-field
                      v-model="dialogContent.endElectricNum"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dialogContent.dispatchType !== 0"
                    />
                  </v-col>
                </v-row>
                <v-radio label="依契約種類設定分派班別：" />
                <v-row style="margin: 10px;" align="center">
                  <v-col style="padding-top: 0;">
                    <v-row align="center">            
                      <v-checkbox 
                        v-model="dialogContent.usePackage" 
                        hide-details
                        class="shrink mt-0"
                        style="margin-top: 0;" 
                        :disabled="dialogContent.dispatchType===0"
                      />
                      <span style="margin: 10px;" :class="dialogContent.dispatchType!==0? '':'disable-text'">包制: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.startPackageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.usePackage"
                        />
                      </v-col>
                      <span :class="dialogContent.dispatchType!==0 && dialogContent.usePackage? '':'disable-text'">~</span>
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
                        :disabled="dialogContent.dispatchType===0"
                      />
                      <span style="margin: 10px;" :class="dialogContent.dispatchType!==0? '':'disable-text'">高壓: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.startHighVoltageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.useHighVoltage"
                        />
                      </v-col>
                      <span :class="dialogContent.dispatchType!==0 && dialogContent.useHighVoltage? '':'disable-text'">~</span>
                      <v-col cols="3">
                        <v-text-field
                          v-model="dialogContent.endHighVoltageElectricNum"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!dialogContent.useHighVoltage"
                        />
                      </v-col>
                    </v-row>
                    <v-radio-group v-model="dialogContent.meterType">
                      <v-row align="center">
                        <v-checkbox 
                          v-model="dialogContent.useMeter" 
                          hide-details
                          class="shrink mt-0"
                          style="margin-top: 0;"
                          :disabled="dialogContent.dispatchType===0" 
                        />
                        <span style="margin-left: 10px; width: 40px;" :class="dialogContent.dispatchType!==0? '':'disable-text'">表制: </span>
                        <v-radio class="mt-2" :disabled="!dialogContent.useMeter" />
                        <v-row align="center">
                          <span style="margin: 10px;" :class="dialogContent.dispatchType===1 && dialogContent.useMeter && dialogContent.meterType===0? '':'disable-text'">電號</span>
                          <v-col cols="5">
                            <v-text-field
                              v-model="dialogContent.startMeterElectricNum"
                              outlined
                              hide-details                                         
                              dense
                              :disabled="!dialogContent.useMeter || dialogContent.meterType!==0"
                            />
                          </v-col>
                          <span :class="dialogContent.dispatchType===1 && dialogContent.useMeter && dialogContent.meterType===0? '':'disable-text'">~</span>
                          <v-col cols="5">
                            <v-text-field
                              v-model="dialogContent.endMeterElectricNum"
                              outlined
                              hide-details                                         
                              dense
                              :disabled="!dialogContent.useMeter || dialogContent.meterType!==0"
                            />
                          </v-col>
                        </v-row>
                      </v-row>
                      <v-row>
                        <div style="height: 10px;width: 82px;" />
                        <v-radio style="margin-top: 10px;" :disabled="!dialogContent.useMeter" />
                        <v-row align="center">
                          <span style="margin: 10px;" :class="dialogContent.dispatchType===1 && dialogContent.useMeter && dialogContent.meterType==1? '':'disable-text'">計算日</span>
                          <v-col>
                            <v-row>
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="01" value="01" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="02" value="02" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="03" value="03" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="04" value="04" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="05" value="05" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="06" value="06" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="07" value="07" class="meter-checkbox" />
                              <v-checkbox v-model="dialogContent.computeDate" :disabled="dialogContent.meterType!==1" label="08" value="08" class="meter-checkbox" />
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-row>
                      <v-row style="margin-top: 0;">
                        <div style="height: 10px;width: 174px;" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="09" value="09" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="10" value="10" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="11" value="11" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="12" value="12" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="13" value="13" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="14" value="14" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="15" value="15" class="meter-checkbox" />
                        <v-checkbox v-model="dialogContent.computeDate" :disabled="!dialogContent.useMeter || dialogContent.meterType!==1" label="16" value="16" class="meter-checkbox" />
                      </v-row>
                    </v-radio-group>
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
    <v-dialog
      v-model="deleteDispatchModel"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          確認是否要刪除派工
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="deleteDispatchModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            請確認是否要刪除派工 ?
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="normal"            
            @click="deleteDispatchModel = false"
          >
            &emsp;取消&emsp;
          </v-btn>
          <v-btn              
            color="primary"            
            @click="submit()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import MessageService from "@/assets/services/message.service";

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
            dispatchType: 0,
            usePackage: false,
            useHighVoltage: false,
            useMeter: false,
            meterType: 0,
            computeDate: [],
            startElectricNum: '07-14-0000-00-0',
            endElectricNum: '07-14-9999-99-9',
            startPackageElectricNum: '',
            endPackageElectriNum: '',
            startHighVoltageElectricNum: '',
            endHighVoltageElectricNum: '',
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
            dispatchType: 1,
            usePackage: false,
            useHighVoltage: false,
            useMeter: true,
            meterType: 1,
            computeDate: ['01', '03', '05', '07', '09'],
            startElectricNum: '',
            endElectricNum: '',
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
        // dispatchType: 0,
        usePackage: false,
        useHighVoltage: false,
        useMeter: false,
        // meterType: 0,
        computeDate: [],
        startElectricNum: '',
        endElectricNum: '',
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
    submit(){
      if (this.selectIndex > -1) {
        this.itemList.splice(this.selectIndex, 1);
      }
      this.deleteDispatchModel = false;
      MessageService.showSuccess("刪除派工成功✓");
    }
  }
}
</script>

<style scoped>
 
</style>
