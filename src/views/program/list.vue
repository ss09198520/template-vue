<template>
  <v-container>
    <h2 class="font-bold">節目單查詢</h2>
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
              節 目 單 標 題
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                v-model="postForm.programName"
                color="accent"
                dense
                placeholder="節目單標題內容"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              節 目 單 類 型
            </v-col>
            <v-col cols="3" class="ml-2">
              <v-select
                v-model="postForm.programType"
                :items="programTypeOption"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="節目單類型"
                dense
                outlined
                clearable
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              簽 核 狀 態
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="postForm.signStatus"
                :items="signStatusOption"
                clearable
                item-color="accent"
                class="font-bold"
                color="accent"
                placeholder="簽核狀態"
                dense
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              上架狀態
            </v-col>
            <v-col cols="3" class="ml-2">
              <v-autocomplete
                v-model="postForm.status"
                :items="statusOption"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="上架狀態"
                dense
                outlined
                clearable
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2">
              上 架 時 間
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex"
            >
              <v-menu
                v-model="releaseStartDateFromMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseStartDateFrom"
                    append-icon="mdi-calendar"
                    placeholder="上架時間(起)"
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
                  v-model="postForm.releaseStartDateFrom"
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="releaseStartDateToMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseStartDateTo"
                    append-icon="mdi-calendar"
                    placeholder="上架時間(迄)"
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
                  v-model="postForm.releaseStartDateTo"
                  scrollable
                />
              </v-menu>
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              下 架 時 間
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex ml-2"
            >
              <v-menu
                v-model="releaseEndDateFromMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseEndDateFrom"
                    append-icon="mdi-calendar"
                    label="下架時間(起)"
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
                  v-model="postForm.releaseEndDateFrom"
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="releaseEndDateToMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseEndDateTo"
                    append-icon="mdi-calendar"
                    label="下架時間(迄)"
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
                  v-model="postForm.releaseEndDateTo"
                  scrollable
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
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2 "
            fab
            small
            color="success"
            @click="viewSchedule"
            v-on="on"
          >
            <v-icon v-text="'mdi-calendar'" />
          </v-btn>
        </template>
        <span>行事曆劉覽</span>
      </v-tooltip>
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
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2 "
            fab
            small
            color="accent"
            @click="postForm={};programs=[]"
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
    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="id"
          :headers="headerProgram"
          :items="programs"
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
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500" />
            <v-dialog v-model="alertDialog" :max-width="250">
              <v-card>
                <v-card-title class="justify-center">Are you sure?</v-card-title>
                <v-card-text />
                <v-card-actions class="justify-center">
                  <v-btn color="error" depressed @click="remove" v-text="'Yes'" />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <!-- 動作 -->
          <template v-slot:[`item.action`]="{ item }">
            <!-- <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="primary"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-eye'" />
                </v-btn>
              </template>
              <span>預覽</span>
            </v-tooltip> -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="success"
                  :disabled="!allowEdit(item.signStatus ,item.programType)"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-pencil'" />
                </v-btn>
              </template>
              <span>編輯</span>
            </v-tooltip>
            <v-tooltip v-if="allowDelete(item.signStatus)" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="error"
                  :disabled="!allowDelete(item.signStatus)"
                  @click="remove(item,'DELETE')"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-delete'" />
                </v-btn>
              </template>
              <span>刪除</span>
            </v-tooltip>
            <v-tooltip v-if="allowSunset(item.signStatus,item.status , item.programType)" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="error"
                  :disabled="!allowSunset(item.signStatus,item.status, item.programType)"
                  @click="remove(item,'CLOSE')"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-arrow-down-bold-outline'" />
                </v-btn>
              </template>
              <span>下架</span>
            </v-tooltip>
          </template>
          <!-- 退件資訊 -->
          <template v-slot:[`item.rejectInfo`]="{ item }">
            <v-tooltip v-if="item.rejectInfo" top>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2 d-flex justify-center"
                  color="error"
                  v-on="on"
                >
                  mdi-information-outline
                </v-icon>
              </template>
              <v-data-table
                :headers="headerReject"
                :items="[item.rejectInfo]"
                disable-sort
                hide-default-footer
              />
            </v-tooltip>
          </template>
          
          <!-- 上架狀態 -->
          <template v-slot:[`item.status`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="d-flex justify-center"
                  :color="item.status==='ACTIVE' ? 'green darken-2':''"
                  v-on="on"
                >
                  {{ statusOption.find(state => { return item.status===state.value }).icon }}
                </v-icon>
              </template>
              {{ statusOption.find(state => { return item.status===state.value }).text }}
            </v-tooltip>
          </template>
          <!-- 簽核狀態 -->
          <template v-slot:[`item.signStatus`]="{ item }">
            {{ signStatusOption.find(state => { return item.signStatus===state.value }).text }}
          </template>
          <!-- 節目單類型 -->
          <template v-slot:[`item.programType`]="{ item }">
            {{ programTypeOption.find(type => { return item.programType===type.value }).text }}
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
    <v-dialog v-model="deleteModel" max-width="500">
      <v-card>
        <v-card-title
          class="text-h5 lighten-2"
          style="background-color: #c62828; color: white"
        >
          確認是否要刪除節目單
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="deleteModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            節目單名稱: {{ selectProgram.programName }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn color="normal" @click="deleteModel = false">
            &emsp;取消&emsp;
          </v-btn>
          <v-btn
            color="primary"
            @click="updateStatus()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sunsetModel" max-width="500">
      <v-card>
        <v-card-title
          class="text-h5 lighten-2"
          style="background-color: #c62828; color: white"
        >
          確認是否要下架節目單
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="sunsetModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            節目單名稱: {{ selectProgram.programName }} ,下架後將不會再播放此節目單
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn color="normal" @click="sunsetModel = false">
            &emsp;取消&emsp;
          </v-btn>
          <v-btn
            color="primary"
            @click="updateStatus()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { fetchProgramList ,updateProgramStatus} from '@/api/program'
  import enums from '@/utils/enums'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    programName: null, 
    releaseStartDateFrom: null, 
    releaseStartDateTo: null, 
    releaseEndDateFrom: null, 
    releaseEndDateTo: null, 
    status: null,
    signStatus:null
  }

  export default {
    data() {
      return {
        isShow: false,
        menu: false,
        
        //api post data
        postForm: Object.assign({}, defaultForm),

        date: new Date().toISOString().substr(0, 10),
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end

        //日曆開關
        releaseStartDateFromMenu: false,
        releaseStartDateToMenu: false,
        releaseEndDateFromMenu: false,
        releaseEndDateToMenu: false,
        //日曆 end

        //節目單類型下拉選單
        programTypeOption: enums.mediaTypeOption,
        //節目單上架下拉選單
        statusOption: enums.mediaStatusOption,
        //節目單簽核狀態下拉選單
        signStatusOption: enums.mediaSignStatusOption,

        //節目單DataTable表頭
        headerProgram: [
          { text: '節目標題', value: 'programName',},
          { text: '節目類別', value: 'programType', align: 'center', },
          { text: '簽核狀態', value: 'signStatus', sortable: false, align: 'center', },
          { text: '上架人員名稱', value: 'createAuthor', align: 'center', },
          { text: '上架日期', value: 'releaseStartDate', align: 'center', },
          { text: '下架日期', value: 'releaseEndDate', align: 'center', },
          { text: '建立時間', value: 'createDate', align: 'center' },
          { text: '上架', value: 'status', sortable: false, width: '10%', align: 'center', },
          { text: '退件資訊', value: 'rejectInfo', align: 'center' },
          { text: '操作', value: 'action', sortable: false, align: 'center', },
        ],
        //退件資訊表頭
        headerReject:[
          {text: '退件主管名稱',value: 'rejectManagerName',align: 'center',},
          {text: '退件日期',value: 'rejectDate',align: 'center',},
          {text: '退件原因',value: 'rejectReason',align: 'center',},
        ],
        
        programs: [],
        //彈跳視窗
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
        deleteModel: false,
        sunsetModel: false,
        selectIndex: null,
        selectProgram: {},
        selectAction: null,
      }
    },
    methods: {
      allowEdit(signStatus ,programType) {
        return (/(DRAFT|REJECT)$/i).test(signStatus) || (/(DEFAULT)$/i).test(programType)
      },
      allowDelete(signStatus) {
        return (/(DRAFT|REJECT)$/i).test(signStatus)
      },
      allowSunset(signStatus,status,programType) {
        return (/(PASS)$/i).test(signStatus) && (/(ACTIVE)$/i).test(status) && !(/(DEFAULT)$/i).test(programType)
      },
      previewItem(item) {
        this.$router.push({path:`/media/preview/questionnaire/${item.questionnaireId}`})
      },
      close() {
        this.dialog = false
        this.editedIndex = -1
        this.alertDialog = false
        
        this.selectProgram = {};
        this.selectAction = null;
        this.deleteModel = false;
        this.sunsetModel = false;
      },
      editItem(item) {
        // this.editedItem = Object.assign({}, item)
        if(this.allowEdit(item.signStatus , item.programType)){
          this.$router.push({path: `${this.$route.matched[0].path}/edit/${item.programId}`})
        } else {
          MessageService.showNoticeInfo('無法編輯節目狀態為:' + this.signStatusOption.find(state => { return item.signStatus===state.value }).text);
          return
        }

      },
      viewSchedule() {
        this.$router.push({path:`${this.$route.matched[0].path}/calendarList`})
      },
      remove(item , action) {
        this.selectProgram = item;
        this.selectAction = action;
        if(action =='DELETE'){
          this.deleteModel = true;
        } else if (action =='CLOSE'){
          this.sunsetModel = true;
        }
      },
      // 送出問卷查詢
      submitSearch() {
        console.log(this.postForm)
        //API post data
        this.fetchProgramList(this.postForm)
      },
      // 送出狀態更新
      updateStatus() {
        let postData = {
          id: this.selectProgram.programId ,
          action: this.selectAction ,
        }
        console.log('postData',postData)
        //API post 
        this.updateProgramStatus(postData)
      },

      /**
       * @param {Object} questionnaire
       * @returns {Object}
       */
      hasResult (dataList) {
        // 驗證questionnaire是否有資料
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
      
      //Action:節目單清單查詢
      async fetchProgramList(postData) {
        //查詢前清空資料
        this.programs = Object.assign([])
        this.isShow = false
        
        const data = await fetchProgramList(postData)

        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢節目單清單資料');
            return;
        }
        this.isShow = true
        
        // 驗證是否有資料
        if(this.hasResult(data.restData.programs)){
          
          let tmpData = data.restData.programs
          
          //處理退件資訊轉換
          tmpData.forEach(item => {
            if(item.signStatus==='REJECT'){
              Object.assign(item, {rejectInfo: {
                rejectManagerName: item.rejectUser,
                rejectDate: item.rejectDate,
                rejectReason: item.rejectReason,
              }});
            }
          });

          this.programs = tmpData
        }
        
        
      },
      //Action:更新節目單清單查詢
      async updateProgramStatus(postData) {
        
        const data = await updateProgramStatus(postData)

        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢節目單清單資料');
            return;
        }
        MessageService.showSuccess('更新成功' + "✓")

        //關閉視窗
        this.close()
        //重新查詢
        this.submitSearch()
      },
      
    }
  }
</script>

<style lang="scss" scoped></style>