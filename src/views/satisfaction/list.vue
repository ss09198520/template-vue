<template>
  <v-container>
    <h2 class="font-bold">滿意度問卷查詢</h2>
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
              問 卷 標 題
            </v-col>
            <v-col cols="3" class="mt-5 ">
              <v-text-field
                v-model="postForm.questionnaireName"
                color="accent"
                dense
                placeholder="滿意度問卷標題"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              簽 核 狀 態
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="postForm.status"
                :items="signStatusOption"
                clearable
                item-color="accent"
                class="font-bold"
                color="accent"
                placeholder="狀態"
                dense
                outlined
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
                v-model="releaseDateStartMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseDateStart"
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
                  v-model="postForm.releaseDateStart"
                  scrollable
                />
              </v-menu>
              <div class="mt-2" v-text="'~'" />
              <v-menu
                v-model="releaseDateEndMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.releaseDateEnd"
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
                  v-model="postForm.releaseDateEnd"
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
            class="ma-2"
            fab
            small
            color="primary"
            @click="submitSearch()"
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
            @click="postForm={};questionnaires=[]"
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
          :headers="headerQuestionnaire"
          :items="questionnaires"
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
                  <v-btn color="error" depressed v-text="'Yes'" />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="primary"
                  @click="previewItem(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-eye'" />
                </v-btn>
              </template>
              <span>預覽</span>
            </v-tooltip>
            <v-tooltip v-if="canView" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="success"
                  :disabled="!allowEdit(item.signStatus)"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-pencil'" />
                </v-btn>
              </template>
              <span>編輯</span>
            </v-tooltip>
          </template>
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
          <template v-slot:[`item.signStatus`]="{ item }">
            {{ signStatusOption.find(state => { return item.signStatus===state.value }).text }}
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
  import { fetchQuestionnaireList} from '@/api/questionnaire'
  import enums from '@/utils/enums'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    questionnaireName: null, 
    releaseDateStart: null, 
    releaseDateEnd: null, 
    status: null
  }

  export default {
    data() {
      return {
        isShow: false,
        menu: false,
        postForm: Object.assign({}, defaultForm),
        date: new Date().toISOString().substr(0, 10),
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end
        //日曆
        releaseDateStartMenu: false,
        releaseDateEndMenu: false,
        //日曆 end

        //上架下拉選單
        statusOption: enums.mediaStatusOption,
        //簽核狀態下拉選單
        signStatusOption: enums.mediaSignStatusOption,
        
        headerQuestionnaire: [
          { text: '滿意度問卷標題', value: 'questionnaireName', },
          { text: '上架人員', value: 'createAuthor', width: '10%', },
          { text: '狀態', value: 'signStatus', sortable: false, align: 'center', },
          { text: '上架日期', value: 'releaseStartDate', width: '10%', },
          { text: '問卷建立日期', value: 'createDate', width: '15%', align: 'center', },
          { text: '上架', value: 'status', sortable: false, align: 'center', },
          { text: '退件資訊', value: 'rejectInfo', align: 'center' },
          { text: '操作', value: 'action', sortable: false, align: 'center', },
        ],
        headerReject:[
          {text: '退件主管名稱',value: 'rejectManagerName',align: 'center',},
          {text: '退件日期',value: 'rejectDate',align: 'center',},
          {text: '退件原因',value: 'rejectReason',align: 'center',},
        ],
        questionnaires: [],
        // CRUD
        dialog: false,
        alertDialog: false,
      }
    },
    computed: {
      canView () {
        const token = this.$store.getters.token;
        let staffAuthCode = [
          'AUTH12' , //多媒體設定-區處
          'AUTH13' , //多媒體設定-業務處
        ]
        return token.authTokens.some(authCode => staffAuthCode.includes(authCode))
      },
    },
    methods: {
      allowEdit(signStatus) {
        return (/(DRAFT|REJECT)$/i).test(signStatus)
      },
      previewItem(item) {
        this.$router.push({path:`/media/preview/questionnaire/${item.questionnaireId}`})
      },
      editItem(item) {
        this.editedIndex = this.questionnaires.indexOf(item)
        if(this.allowEdit(item.signStatus)){
          // this.editedItem = Object.assign({}, item)
          this.$router.push({path: `${this.$route.matched[0].path}/edit/${item.questionnaireId}`})
        } else {
          MessageService.showNoticeInfo('無法編輯問卷狀態為:' + this.signStatusOption.find(state => { return item.signStatus===state.value }).text);
          return
        }
      },
      viewSchedule() {
        this.$router.push({path:`${this.$route.matched[0].path}/calendarList`})
      },
      // 送出問卷查詢
      submitSearch() {
        //API post data 
        this.fetchQuestionnaireList(this.postForm)
      },

      /**
       * @param {Object} questionnaire
       * @returns {Object}
       */
      hasResult (questionnaires) {
        // 驗證questionnaire是否有資料
        if(isEmpty(questionnaires) || questionnaires.length < 1 ){
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
      
      //Action:問卷查詢
      async fetchQuestionnaireList(postData) {
        this.isShow = false
        const data = await fetchQuestionnaireList(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢問卷清單資料');
            return;
        }
        //查詢前清空資料
        this.questionnaires = Object.assign([])
        // 驗證是否有資料
        if(this.hasResult(data.restData.questionnaires)){
          
          let tmpData = data.restData.questionnaires
          
          //處理退件資訊轉換
          tmpData.forEach(element => {
            if(element.signStatus==='REJECT'){
              Object.assign(element, {rejectInfo: {
                rejectManagerName: element.rejectUser,
                rejectDate: element.rejectDate,
                rejectReason: element.rejectReason,
              }});
            }
          });

          this.isShow = true
          this.questionnaires = tmpData
        }
        
        
      },
    }
  }
</script>

<style lang="scss" scoped></style>