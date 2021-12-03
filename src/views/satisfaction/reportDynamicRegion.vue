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
            <v-col cols="2" class="ml-2 ">
              查詢日期
            </v-col>

            <v-col cols="4" class="d-flex">
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
    <hr class="mt-6 mb-5">
    <v-row
      class="d-flex justify-start ml-10 font-18px font-weight-bold"
      align="center"
    >     
      <v-col cols="2" class="ml-2 ">
        查詢下載結果
      </v-col>
      <v-col cols="8" class="ml-2 ">        
        <v-btn 
          v-if="isRegion==1"
          class="ml-3 ma-2"
          color="primary"
          @click="submitSearch(false)"
          v-on="on"
        > 
          查詢下載結果<v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
        <v-btn 
          v-if="isRegion==0"
          class="ml-3 ma-2"
          color="primary"
          @click="submitSearch(true)"
        >
          查詢全區處 <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
        <v-btn
          v-if="isRegion==0"
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

  import MessageService from "@/assets/services/message.service";
  import { geneDynaRegionSatisfactionReport} from '@/api/questionnaireReport'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    allRegion: false ,
    startDate: null, 
    endDate: null,
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

        // CRUD
        dialog: false,
        alertDialog: false,
      }
    },
    methods: {

      // 送出問卷查詢
      submitSearch(isAllRegion) {
        this.postForm.allRegion = isAllRegion
        console.log(this.postForm)
        //API post data
        this.geneDynaRegionSatisfactionReport(this.postForm)
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