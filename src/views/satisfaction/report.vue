<template>
  <v-container>
    <h2 class="font-bold">滿意度調查結果</h2>
    <v-row>
      <v-col
        class="ml-10 font-18px"
        cols="12"
      >
        <v-form ref="form" v-model="valid" class="font-weight-bold">
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              受 理 部 門
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                v-model="postForm.applyDept"
                color="accent"
                dense
                placeholder="受理部門名稱(Ex:東山服務所...)"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              受 理 人 員
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                v-model="postForm.applyUser"
                color="accent"
                dense
                placeholder="受理人員員編"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              受 理 號 碼
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                v-model="postForm.applyNum"
                color="accent"
                dense
                placeholder="受理號碼"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              申 請 項 目
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="postForm.applyType"
                :items="applyTypeOption"
                item-text="acceptName"
                item-value="acceptCode"
                color="accent"
                outlined
                hide-details
                dense
                clearable
                placeholder="請選擇申請項目"
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              調 查 日 期
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex"
            >
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.startDate"
                    append-icon="mdi-calendar"
                    placeholder="調查日期(起)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details   
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="postForm.startDate"
                  scrollable
                  @input="startDateMenu = false"
                />
              </v-menu>
              <div class="mt-2" v-text="'~'" />
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.endDate"
                    append-icon="mdi-calendar"
                    placeholder="調查日期(迄)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details   
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="postForm.endDate"
                  scrollable
                  @input="endDateMenu = false"
                />
              </v-menu>
            </v-col>
            <span class="red--text font-12px">{{ errorMsg.dateInfo }}</span>  
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-end"
      dense
    >
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2 "
            fab
            small
            color="success"
            :disabled="!isDownload"
            v-on="on"
          >
            <v-icon v-text="'mdi-file-download-outline'" />
          </v-btn>
        </template>
        <span>下載查詢結果</span>
      </v-tooltip> -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            fab
            small
            color="success"
            @click="submitDownload"
            v-on="on"
          >
            <!-- <v-icon v-text="'mdi-magnify'" /> -->
            <v-icon v-text="'mdi-file-download-outline'" />
          </v-btn>
        </template>
        <span>下載查詢結果</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2 "
            fab
            small
            color="accent"
            @click="reset()"
            v-on="on"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>清空查詢</span>
      </v-tooltip>
    </v-row>
    <span class="annotation font-weight-bold">※提醒&nbsp;</span>
    <span class="annotation font-weight-bold">僅填入查詢時間，最多可查詢半年內之資料，若包含日期以外的條件最多可查詢兩年內之資料</span>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service"
  import ValidateUtil from "@/assets/services/validateUtil";
  import moment from 'moment'
  import { listSatisfactionRawData ,queryAcceptItem} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    applyNum: null,
    applyDept: null,
    applyType: null,
    startDate: null, 
    endDate: null, 
    category: 'QUESTIONNAIRE_REPORT_WEEKLY',
  }

  export default {
    data() {
      return {
        //api post data
        postForm: Object.assign({}, defaultForm),

        valid: false,
        isShow: false,
        isDownload: false,
        
        //日曆開關
        startDateMenu: false,
        endDateMenu: false,
        //受理項目下拉選單
        applyTypeOption: [],

        itemsPerPage: 10,
        // CRUD
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
        
        errorMsg:{
          dateInfo:null,
        },
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init() {
        //初始化受理項目下拉選單
        this.queryAcceptItem();
      },
      goWeek() {
        this.$router.push({path:`${this.$route.matched[0].path}/satisfyReport/month`})
      },
      goMonth() {
        this.$router.push({path:`${this.$route.matched[0].path}/satisfyReport/week`})
      },
      reset() {
        this.$refs.form.reset()
      },
      // 送出問卷查詢下載
      submitDownload() {
        console.log(this.postForm)
        
        // 驗證必填欄位是否為空值
        this.checkRequired()
        if (this.valid) {
          //API post data
          this.downloadSatisfactionReportFile(this.postForm)
        }
      },

      // 驗證是否欄位是否合法
      checkRequired(){
        let allEmpty = true
        Object.keys(this.postForm).forEach(key => {
          if(key!='startDate' && key!='endDate' && key!='category') {
            if(!isEmpty(this.postForm[key])) allEmpty = false
          }
        });
        //無任何條件且日期間隔大於183
        if(allEmpty  && isEmpty(this.postForm.startDate) && isEmpty(this.postForm.endDate)){
          this.errorMsg.dateInfo = '至少需填入查詢時間，最多可查詢半年內之資料'
          this.valid = false
          return
        }
        //無任何條件且日期間隔大於183
        else if(allEmpty && moment(this.postForm.endDate).diff(moment(this.postForm.startDate), 'days') > 183){
          this.errorMsg.dateInfo = '查詢時間錯誤，最多可查詢半年內之資料'
          this.valid = false
          return
        }
        //有任一條件但查詢起訖皆為空
        else if(!allEmpty && isEmpty(this.postForm.startDate) && isEmpty(this.postForm.endDate)){
          this.errorMsg.dateInfo ='查詢時間錯誤，最多可查詢兩年內之資料'
          this.valid = false
          return
        } 
        else if(!allEmpty && moment(this.postForm.endDate).diff(moment(this.postForm.startDate), 'days') > 730){
          this.errorMsg.dateInfo ='查詢時間錯誤，最多可查詢兩年內之資料'
          this.valid = false
          return
        }
        else if(isEmpty(this.postForm.startDate) || isEmpty(this.postForm.endDate)){
          this.errorMsg.dateInfo ='查詢時間錯誤需填入正確起訖'
          this.valid = false
          return
        }
        if(!ValidateUtil.validateDateRange(this.postForm.startDate,this.postForm.endDate)){
          this.errorMsg.dateInfo ='查詢時間錯誤，需填入正確日期範圍錯誤'
          this.valid = false
          return
        }
        this.valid = true
        this.errorMsg.dateInfo = null
      },

      /**
       * @param {Object} questionnaire
       * @returns {Object}
       */
      hasResult (dataList) {
        // 驗證是否有資料
        if(isEmpty(dataList) || dataList.length < 1 ){
            MessageService.showInfo('查無相關資料')
            return
        }
        return true
      },

      /**
       * 
       * Ajax start 
       * 
       **/

      //Action: 下載報表
      async downloadSatisfactionReportFile(postData) {
        
        const data = await listSatisfactionRawData(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'下載報表')
          return
        }
        if(data.restData.success){
          MessageService.showSuccess('下載報表成功')
        }else{
          MessageService.showError('下載報表')
        }
      },

      //Action: 查詢受理項目下拉
      async queryAcceptItem() {
        
        const data = await queryAcceptItem()
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'受理項目選單')
          return
        }
        if(data.restData.success){
          let itemMap = data.restData.acceptItemMap
          this.applyTypeOption = Object.keys(data.restData.acceptItemMap).reduce((acceptitems, keyName) => {
            // new {materialId , mediaFileName}
            acceptitems.push(Object.assign({
              acceptCode : keyName , 
              acceptName : itemMap[keyName]}
            ))
            return acceptitems
          }, [])
          // MessageService.showSuccess('受理項目選單查詢成功')
        }else{
          MessageService.showError('受理項目選單')
        }
      },
    }
  }
</script>

<style lang="scss" scoped></style>