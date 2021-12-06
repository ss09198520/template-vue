<template>
  <v-container>
    <h2 class="font-bold">滿意度區處報表(月)</h2>
    <v-row>
      <v-col
        class="ml-10 font-18px"
        cols="12"
      >
        <v-form class="font-weight-bold">
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2 mt-2 ">
              查詢月份
            </v-col>
            <v-col cols="2" class="d-flex mt-2 ">
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
                    :clearable="true"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="postForm.startDate"
                  type="month"
                  @input="startDateMenu = false"
                />
              </v-menu>
            </v-col>
            <v-col v-if="isRegion" cols="1">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-3"
                    fab
                    small
                    color="primary"
                    @click="submitSearch('QUESTIONNAIRE_REPORT_MONTHLY')"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>查詢</span>
              </v-tooltip>
            </v-col>
            <v-col cols="8" class="ml-2 ">        
              <v-btn 
                v-if="!isRegion"
                class="ml-3 ma-2"
                color="primary"
                @click="submitSearch('QUESTIONNAIRE_REPORT_MONTHLY_ALL')"
              >
                查詢全區處 <v-icon v-text="'mdi-file-download-outline'" />
              </v-btn>
              <v-btn
                v-if="!isRegion"
                class="ml-3 ma-2"
                color="primary"
                @click="submitSearch('QUESTIONNAIRE_REPORT_MONTHLY')"
              >
                查詢業務處彙總 <v-icon v-text="'mdi-file-download-outline'" />
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" />
            <v-col>
              <!-- <v-btn color="primary" class="ml-3" @click="search()">{{ searchText }}</v-btn> -->
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="fileId"
          :headers="header"
          :items="reports"
          :items-per-page="itemsPerPage"
          :page.sync="itemsListPage"
          :footer-props="{
            showFirstLastPage: true,
          }"
          disable-sort
          class="font-weight-bold elevation-1"
          hide-default-footer
          no-data-text="查無資料"
          @page-count="itemsListPageCount = $event"
        >
          <template v-slot:[`item.fileId`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  :disabled="!item.fileId"
                  class="ma-2"
                  fab
                  small
                  color="primary"
                  @click="downloadReport(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-file-download-outline'" />
                </v-btn>
              </template>
              <span v-text="item.fileId ? '下載檔案' : '無報表資料' " />
            </v-tooltip>
          </template>
        </v-data-table>
        <!-- 選頁 -->
        <div class="mt-2">
          <v-pagination
            v-model="itemsListPage"
            color="#2F59C4"
            :length="itemsListPageCount"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { fetchQuestionnaireReportList , downloadSatisfactionReportFile} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'
  import enums from '@/utils/enums'

  const defaultForm = {
    startDate: null, 
    category: 'QUESTIONNAIRE_REPORT_MONTHLY',
  }
  export default {
    data() {
      return {
        isRegion: false, // true區處、false業務處
        //api post data
        postForm: Object.assign({}, defaultForm),
        isShow: false,
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end

        //日曆開關
        startDateMenu: false,
        endDateMenu: false,

        //日曆 end
        reports : [],
        header: [
          { text: '報表名稱', value: 'reportName', align: 'center' },
          { text: '報表資料月份', value: 'dataDate', align: 'center' },
          { text: '報表產出時間', value: 'createDate', align: 'center' },
          { text: '下載', value: 'fileId', width: '10%', align: 'center' },
        ],
        // CRUD
        dialog: false,
        alertDialog: false,
      }
    },
    mounted() { //initial data
      const token = this.$store.getters.token;
      this.isRegion = !token.authTokens.some(authCode => enums.salesTeamAuthCode.includes(authCode)) //不再業務處AuthCode內即為區處人員
    },
    methods: {
      downloadReport(item) {
        this.downloadSatisfactionReportFile(item)
      },
      // 送出問卷查詢
      submitSearch(reportType) {
        
        if(reportType){
          this.postForm.category = reportType
        }
        //API post data
        this.fetchQuestionnaireReportList(this.postForm)
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
      
      //Action:報表清單查詢
      async fetchQuestionnaireReportList(postData) {
        //查詢前清空資料
        this.reports = Object.assign([])
        this.isShow = false
        
        const data = await fetchQuestionnaireReportList(postData)

        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢報表清單資料');
            return;
        }
        this.isShow = true
        
        // 驗證是否有資料
        if(this.hasResult(data.restData.reports)){
          
          let tmpData = data.restData.reports
          
          this.reports = tmpData
        }
      },

      //Action: 下載報表
      async downloadSatisfactionReportFile(item) {

        let postData = {
          fileId : item.fileId,
          category : item.category
        }
        
        const data = await downloadSatisfactionReportFile(postData)
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
    }
  }
</script>

<style lang="scss" scoped></style>