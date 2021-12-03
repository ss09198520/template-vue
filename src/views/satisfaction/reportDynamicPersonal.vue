<template>
  <v-container>
    <h2 class="font-bold">不滿意度個人動態查詢(自訂區間與%數)</h2>
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
            <v-col cols="2" class="ml-2 ">
              查詢日期
            </v-col>
            <v-col cols="5" class="d-flex">
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
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="2" class="ml-2">
              不滿意度未達%數
            </v-col>
            <v-col cols="2" md="2">
              <v-text-field
                v-model="postForm.unSatisfyPercent"
                outlined
                required
                dense
              />
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
            <v-col cols="3" class="ml-2" color="red">
              * 查詢區間於6個月內
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
    <hr class="mt-12 mb-12">
    <v-row
      class="d-flex justify-start ml-10 font-18px font-weight-bold"
      align="center"
    >     
      <v-col cols="2" class="ml-2 ">
        查詢下載結果
      </v-col>
      <v-col cols="8" class="ml-2 ">
        
        <v-btn      
          class="ml-3 ma-2"
          fab
          small
          color="primary"
          @click="submitSearch"
          v-on="on"
        > 
          <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
      </v-col> 
    </v-row>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { geneDynaSatisfactionReport} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    startDate: null, 
    endDate: null,
    unSatisfyPercent: null
  }

  export default {
    data() {
      return {
        isRegion: 1, // 1區處、else業務處
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
      }
    },
    methods: {

      // 送出問卷查詢
      submitSearch() {
        console.log(this.postForm)
        //API post data
        this.geneDynaSatisfactionReport(this.postForm)
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

        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢動態個人報表資料');
            return;
        }
        
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