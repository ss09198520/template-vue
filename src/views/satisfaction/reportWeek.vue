<template>
  <v-container>
    <h2 class="font-bold ">滿意度個人摘要(週)</h2>
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
            <v-col cols="1" class="ml-2 ">
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
                    :clearable="true"
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
                    :clearable="true"
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
            <v-col cols="1">
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
                <span>查詢</span>
              </v-tooltip>
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
    <span class="annotation font-weight-bold">※提醒&nbsp;此報表為每週一凌晨01:00產出，資料為前一週不意度達10%以上之人員</span>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="id"
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
  import { fetchQuestionnaireReportList ,downloadSatisfactionReportFile} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    startDate: null, 
    endDate: null, 
    category: 'QUESTIONNAIRE_REPORT_WEEKLY',
  }
  
  export default {
    data() {
      return {
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
        
        reports : [],
        header: [
          { text: '報表名稱', value: 'reportName', align: 'center' },
          { text: '報表資料日期區間', value: 'dataDate', align: 'center' },
          { text: '報表產出時間', value: 'createDate', align: 'center' },
          { text: '下載', value: 'fileId', width: '10%', align: 'center' },
        ],
        // headerCRUD: [
        //   {
        //     text: '區處',
        //     value: 'region',
        //     align: 'center'
        //   },
        //   {
        //     text: '報表產出時間',
        //     value: 'signOffDate1',
        //     align: 'center'
        //   },
        //   {
        //     text: '下載',
        //     value: 'download',
        //     width: '10%',
        //     align: 'center'
            
        //   },
          
        // ],
        itemsCRUD: [
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/06 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/09/13 14:14:42', signOffDate2: '', signOffDate3: '', download: true},
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/24 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/09/27 14:14:42', signOffDate2: '', signOffDate3: '', download: false},
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/10/04 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/10/11 14:14:42', signOffDate2: '', signOffDate3: '', download: true}
        ],
        dialog: false,
        alertDialog: false,
      }
    },
    methods: {
      //下載報表
      downloadReport(item) {
        this.downloadSatisfactionReportFile(item)
      },
      // 送出問卷查詢
      submitSearch() {
        console.log(this.postForm)
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
        console.log('this.reports',this.reports)
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