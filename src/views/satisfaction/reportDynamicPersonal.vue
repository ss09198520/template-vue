<template>
  <v-container>
    <h2 class="font-bold">滿意度個人動態查詢(自訂區間與%數)</h2>
    <v-row>
      <v-col
        class="ml-10 mt-10 font-18px"
        cols="12"
      >
        <v-form class="font-weight-bold">
          <v-row
            class="d-flex justify-start"
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
              <div class="mt-1">~</div>
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
          
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              不滿意度達
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="postForm.unSatisfyPercent"
                outlined
                required
                dense
                hide-details
              />
            </v-col>
            <v-col cols="1">
              %
            </v-col>
            <!-- <v-col cols="1">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    @click="submitSearch"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span> 查詢 </span>
              </v-tooltip>
            </v-col> -->
          </v-row>
          <v-row>
            <v-col cols="1" />
            <v-col cols="3" class="d-flex">
              <span class="red--text font-12px">{{ errorMsg.unSatisfyPercentInfo }}</span>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-12 mb-12">
    <v-row
      class="d-flex justify-start ml-10 font-18px font-weight-bold"
      align="center"
    >     
      <v-col cols="2" class="ml-2 ">
        下載查詢結果
      </v-col>
      <v-col cols="8" class="ml-2 ">
        
        <v-btn      
          class="ml-3 ma-2"
          fab
          small
          color="primary"
          @click="submitSearch"
        > 
          <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
      </v-col> 
    </v-row>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service"
  import ValidateUtil from "@/assets/services/validateUtil";
  import moment from 'moment'
  import { geneDynaSatisfactionReport} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'
  import enums from '@/utils/enums'

  const defaultForm = {
    startDate: null, 
    endDate: null,
    unSatisfyPercent: null,
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

        //日曆 end
        dialog: false,
        alertDialog: false,

        errorMsg:{
          dateInfo:null,
          unSatisfyPercentInfo:null,
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
        console.log()
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
          this.errorMsg.dateInfo ='查詢時間錯誤，需填入正確起訖'
          this.valid = false
          return
        }
        if(!ValidateUtil.validateDateRange(this.postForm.startDate,this.postForm.endDate)){
          this.errorMsg.dateInfo ='查詢時間錯誤，需填入正確日期範圍錯誤'
          this.valid = false
          return
        }
        if ( !Number.isInteger(Number(this.postForm.unSatisfyPercent)) 
            || (Number(this.postForm.unSatisfyPercent) > 100 || Number(this.postForm.unSatisfyPercent < 0)) ) {
          
          this.errorMsg.unSatisfyPercentInfo ='格式錯誤，需1~100之數字'
          this.valid = false
          return
        }

        this.valid = true
        this.errorMsg.dateInfo = null
      },

      // 送出問卷查詢
      submitSearch() {
        this.checkRequired()
        if (this.valid) {
          //API post data
          this.geneDynaSatisfactionReport(this.postForm)
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
      
      //Action:查詢動態個人報表資料
      async geneDynaSatisfactionReport(postData) {
        //查詢前清空資料
        
        const data = await geneDynaSatisfactionReport(postData)

      },

    }
  }
</script>

<style lang="scss" scoped></style>