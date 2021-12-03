<template>
  <v-container>
    <h2 class="font-bold">滿意度調查結果</h2>
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
            <v-col cols="1" class="ml-2">
              受 理 部 門
            </v-col>
            <v-col cols="3" class="ml-2">
              <!-- <v-select
                :items="['核算課','大里服務中心','東山服務所']"
                color="accent"
                item-color="accent"
                placeholder="受理部門"
                dense
                outlined
                hide-details
              /> -->
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
            <v-col cols="3" class="ml-5">
              <!-- <v-select
                :items="['QA210 軍眷用電申請優待','I0510 故障換表','I0520 增加電表','F3030 表燈非時間電價停用廢止','I0510 故障換表',]"
                color="accent"
                item-color="accent"
                placeholder="申請項目"
                dense
                outlined
                hide-details
              /> -->
              <v-text-field
                v-model="postForm.applyType"
                color="accent"
                item-color="accent"
                placeholder="申請項目"
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
            @click="isShow = false"
            v-on="on"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>清空查詢</span>
      </v-tooltip>
    </v-row>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { listSatisfactionRawData } from '@/api/questionnaireReport'
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

        isShow: false,
        isDownload: false,
        
        //日曆開關
        startDateMenu: false,
        endDateMenu: false,

        itemsPerPage: 10,
        // CRUD
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
      }
    },
    methods: {
      close() {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.alertDialog = false
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.itemsCRUD[this.editedIndex], this.editedItem)
        } else {
          this.itemsCRUD.push(this.editedItem)
        }
        this.close()
      },
      goWeek() {
        this.$router.push({path:`${this.$route.matched[0].path}/satisfyReport/month`})
      },
      goMonth() {
        this.$router.push({path:`${this.$route.matched[0].path}/satisfyReport/week`})
      },
      deleteItem(item) {
        this.alertDialog = true
        this.editedIndex = this.itemsCRUD.indexOf(item)
      },
      remove() {
        this.itemsCRUD.splice(this.editedIndex, 1)
        this.close()
      },
      // 送出問卷查詢下載
      submitDownload() {
        console.log(this.postForm)
        //API post data
        this.downloadSatisfactionReportFile(this.postForm)
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
    }
  }
</script>

<style lang="scss" scoped></style>