<template>
  <v-container>
    <h2 class="font-bold">滿意度區處報表(自訂查詢區間)</h2>
    <v-row>
      <v-col
        class="ml-10 font-18px"
        cols="12"
      >
        <v-form class="font-weight-bold">
          <v-row
            class="d-flex justify-start mt-2"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              查詢日期
            </v-col>

            <v-col cols="3" class="d-flex">
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="postForm.startDate"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="postForm.startDate"
                  @input="startDateMenu = false"
                />
              </v-menu>
              <div class="mt-3">~</div>
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="postForm.endDate"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="padding-top: 0;"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="postForm.endDate"
                  @input="endDateMenu = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="3" class="ml-2">
              <span class="annotation">※提醒&nbsp;查詢區間於6個月內</span>
              <!-- * 查詢區間於6個月內 -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" />
            <v-col cols="3" class="d-flex">
              <span class="red--text font-12px">{{ errorMsg.dateInfo }}</span>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
    <v-row
      class="d-flex justify-start ml-10 font-18px font-weight-bold"
      align="center"
    >     
      <v-col cols="2" class="ml-2 ">
        下載查詢結果
      </v-col>
      <v-col cols="8" class="ml-2 ">        
        <v-btn 
          v-if="isRegion"
          class="ml-3 ma-2"
          color="primary"
          @click="submitSearch(false)"
          v-on="on"
        > 
          下載查詢結果<v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
        <v-btn 
          v-if="!isRegion"
          class="ml-3 ma-2"
          color="primary"
          @click="submitSearch(true)"
        >
          查詢全區處 <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
        <v-btn
          v-if="!isRegion"
          class="ml-3 ma-2"
          color="primary"
          @click="submitSearch(false)"
        >
          查詢業務處彙總 <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
      </v-col>
      
    </v-row>

  </v-container>
</template>

<script>

  import MessageService from "@/assets/services/message.service"
  import ValidateUtil from "@/assets/services/validateUtil";
  import moment from 'moment'
  import { geneDynaRegionSatisfactionReport} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'
  import enums from '@/utils/enums'

  const defaultForm = {
    allRegion: false ,
    startDate: null, 
    endDate: null,
  }

  export default {
    data() {
      return {
        isRegion: false, // true區處、false業務處
        valid: false,
        isShow: false,
        //api post data
        postForm: Object.assign({}, defaultForm),
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end
        //日曆開關
        startDateMenu: false,
        endDateMenu: false,

        // CRUD
        dialog: false,
        alertDialog: false,

        errorMsg:{
          dateInfo:null,
        },
      }
    },
    mounted() { //initial data
      const token = this.$store.getters.token;
      this.isRegion = !token.authTokens.some(authCode => enums.salesTeamAuthCode.includes(authCode)) //不再業務處AuthCode內即為區處人員
    },
    methods: {
      
      // 驗證是否欄位是否合法
      checkRequired(){
        //無任何條件且日期間隔大於183
        if(isEmpty(this.postForm.startDate) && isEmpty(this.postForm.endDate)){
          this.errorMsg.dateInfo = '需填入查詢時間，最多可查詢半年內之資料'
          this.valid = false
          return
        }
        //無任何條件且日期間隔大於183
        else if(moment(this.postForm.endDate).diff(moment(this.postForm.startDate), 'days') > 183){
          this.errorMsg.dateInfo = '查詢時間錯誤，日期區間需介於6個月內'
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

      // 送出問卷查詢
      submitSearch(isAllRegion) {
        this.postForm.allRegion = isAllRegion
        
        this.checkRequired()
        if (this.valid) {
          //API post data
          this.geneDynaRegionSatisfactionReport(this.postForm)
        }
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
      
      //Action:動態報表資料查詢
      async geneDynaRegionSatisfactionReport(postData) {
        //查詢前清空資料
        const data = await geneDynaRegionSatisfactionReport(postData)

        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢動態報表資料');
            return;
        }
        this.isShow = true
        
        // 驗證是否有資料
        if(this.hasResult(data.restData.reports)){
          
          let tmpData = data.restData.reports
          
          this.reports = tmpData
        }
      },
    }
  }
</script>

<style lang="scss" scoped></style>