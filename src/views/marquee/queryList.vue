<template>
  <v-container>
    <h2 class="font-bold">跑馬燈查詢</h2>
    <v-row>
      <v-col class="ml-10 font-18px" cols="12">
        <v-form ref="form" v-model="valid" class="font-weight-bold">
          <v-row class="d-flex justify-start" align="center">
            <v-col cols="1" class="ml-2"> 跑馬燈名稱 </v-col>
            <v-col cols="4" class="mt-5">
              <v-text-field
                v-model="marqueeName"
                class="font-weight-bold"
                color="accent"
                dense
                placeholder="請輸入跑馬燈名稱"
                outlined
                clearable
                persistent-hint
              />
            </v-col>

            <v-col cols="1" class="ml-2"> 跑馬燈類型 </v-col>
            <v-col cols="4" class="ml-2">
              <v-select
                v-model="marqueeType"
                :items="marqueeTypeOption"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="跑馬燈類型"
                dense
                outlined
                hide-details
                clearable
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start" align="center">
            <v-col cols="1" class="ml-2"> 簽核狀態 </v-col>
            <v-col cols="4">
              <v-select
                v-model="signStatus"
                :items="signStatusOption"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="狀態"
                clearable
                dense
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="1" class="ml-2"> 上架狀態 </v-col>
            <v-col cols="4" class="ml-2">
              <v-select
                v-model="status"
                :items="statusOption"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="上架狀態"
                clearable
                dense
                outlined
                hide-details
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start" align="center">
            <v-col cols="1" class="ml-2"> 上架日期 </v-col>
            <v-col cols="4" class="d-flex">
              <v-menu
                v-model="releaseStartDateFromMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseStartDateFrom"
                    append-icon="mdi-calendar"
                    placeholder="上架日期(起)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="releaseStartDateFrom" scrollable />
              </v-menu>
              <div class="mt-2">~</div>
              <v-menu
                v-model="releaseStartDateToMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseStartDateTo"
                    append-icon="mdi-calendar"
                    placeholder="上架日期(迄)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="releaseStartDateTo" scrollable />
              </v-menu>
            </v-col>

            <v-col cols="1" class="ml-2"> 下架日期 </v-col>
            <v-col cols="4" class="d-flex ml-2">
              <v-menu
                v-model="releaseEndDateFromMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseEndDateFrom"
                    append-icon="mdi-calendar"
                    label="下架日期(起)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="releaseEndDateFrom" scrollable />
              </v-menu>
              <div class="mt-2">~</div>
              <v-menu
                v-model="releaseEndDateToMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseEndDateTo"
                    append-icon="mdi-calendar"
                    label="下架日期(迄)"
                    color="accent"
                    outlined
                    dense
                    readonly
                    hide-details
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="releaseEndDateTo" scrollable />
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end" dense>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
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
            class="ma-2"
            fab
            small
            color="accent"
            @click="resetForm"
            v-on="on"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>清空查詢</span>
      </v-tooltip>
    </v-row>

    <hr class="mt-6 mb-5">
    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="id"
          :headers="headerCRUD"
          :items="itemsCRUD"
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
                <v-card-title 
                  class="justify-center"
                >Are you sure?</v-card-title>
                <v-card-text />
                <v-card-actions class="justify-center">
                  <v-btn
                    color="error"
                    depressed
                    @click="remove"
                    v-text="'Yes'"
                  />
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
            <v-tooltip v-if="allowEdit(item.signStatus ,item.marqueeType) && canView" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="success"
                  :disabled="!allowEdit(item.signStatus ,item.marqueeType)"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <!-- :disabled="(item.signStatus == 'WAIT' && item.marqueeType == 'GENERAL') || (item.signStatus == 'PROGRESS' && item.marqueeType == 'GENERAL')|| (item.signStatus == 'PASS' && item.marqueeType == 'GENERAL')" -->
                  <v-icon v-text="'mdi-pencil'" />
                </v-btn>
              </template>
              <span>編輯</span>
            </v-tooltip>
            <v-tooltip v-if="allowDelete(item.signStatus ,item.marqueeType) && canView" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2 error"
                  fab
                  x-small
                  :disabled="!allowDelete(item.signStatus ,item.marqueeType)"
                  @click="remove(item ,'DELETE')"
                  v-on="on"
                >
                  <!-- :disabled="item.signStatus == 'WAIT' || item.signStatus == 'PROGRESS' || item.signStatus == 'PASS' || item.marqueeType == 'DEFAULT' " -->
                  <v-icon v-text="'mdi-delete'" />
                </v-btn>
              </template>
              <span>刪除</span>
            </v-tooltip>
            <v-tooltip v-if="allowSunset(item.signStatus,item.status , item.marqueeType) && canView" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="error"
                  :disabled="!allowSunset(item.signStatus,item.status, item.marqueeType)"
                  @click="remove(item,'CLOSE')"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-arrow-down-bold-outline'" />
                </v-btn>
              </template>
              <span>下架</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.returnInfo`]="{ item }">
            <v-tooltip v-if="item.returnInfo" top>
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
                :headers="headerReturn"
                :items="[item.returnInfo]"
                disable-sort
                hide-default-footer
              />
            </v-tooltip>
          </template>
          <template v-slot:[`item.marqueeContent`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2 d-flex justify-center" v-on="on">
                  mdi-file
                </v-icon>
              </template>
              <span>{{ item.marqueeContent }}</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.active`]="{ item }">
            <v-icon
              class="d-flex justify-center"
              :color="item.active ? 'green darken-2' : ''"
            >
              {{
                item.active ? "mdi-checkbox-marked-circle" : "mdi-minus-circle"
              }}
            </v-icon>
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
          <!-- 跑馬燈類型 -->
          <template v-slot:[`item.marqueeType`]="{ item }">
            {{ marqueeTypeOption.find(type => { return item.marqueeType===type.value }).text }}
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

    <v-dialog v-model="deleteMarqueeModel" max-width="500">
      <v-card>
        <v-card-title
          class="text-h5 lighten-2"
          style="background-color: #c62828; color: white"
        >
          確認是否要刪除跑馬燈
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="deleteMarqueeModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            跑馬燈名稱: {{ selectMarquee.marqueeName }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn color="normal" @click="deleteMarqueeModel = false">
            &emsp;取消&emsp;
          </v-btn>
          <v-btn
            color="primary"
            @click="deleteMarquee(selectMarquee.marqueeId)"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="sunsetModel" v-model="sunsetModel" max-width="500">
      <v-card>
        <v-card-title
          class="text-h5 lighten-2"
          style="background-color: #c62828; color: white"
        >
          確認是否要下架跑馬燈
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
            跑馬燈名稱: {{ selectMarquee.marqueeName }} ,下架後將不會再播放此節目單
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

    <v-dialog v-model="preViewMarqueeModel" max-width="12800">
      <v-card>
        <v-card-title
          class="text-h5 lighten-2"
          style="background-color: #283593; color: white"
        >
          跑馬燈預覽
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="preViewMarqueeModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            跑馬燈名稱: {{ selectMarquee.marqueeName }}
            <marquee-text
              :duration="selectMarquee.animationDuration"
              :repeat="1"
              class="marquee"
            >
              {{ selectMarquee.marqueeContentHTML }}
            </marquee-text>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import enums from "@/utils/enums";
import { fetchListMarquee, fetchDeleteMarquee ,updateMarqueeStatus } from "@/api/marquee";
import MessageService from "@/assets/services/message.service";
export default {
  data() {
    return {
      isShow: false,
      marqueeName: null,
      marqueeType: null,
      releaseStartDateFrom: null,
      releaseStartDateTo: null,
      releaseEndDateFrom: null,
      releaseEndDateTo: null,
      status: null,
      signStatus: null,
      //日曆開關
      releaseStartDateFromMenu: false,
      releaseStartDateToMenu: false,
      releaseEndDateFromMenu: false,
      releaseEndDateToMenu: false,
      //分頁 end
      //日曆
      itemsPerPage: 10,
      itemsListPage: 1,
      itemsListPageCount: 1,

      valid: false,

      deleteMarqueeModel: false,
      preViewMarqueeModel: false,
      selectIndex: null,
      selectMarquee: {},
      selectAction: null,

      //上架下拉選單
      statusOption: enums.mediaStatusOption,
      //簽核狀態下拉選單
      signStatusOption: enums.mediaSignStatusOption,
      //類型下拉選單
      marqueeTypeOption: enums.mediaTypeOption,

      //日曆 end
      headerCRUD: [
        {
          text: "跑馬燈名稱",
          value: "marqueeName",
          width: "18%",
        },
        {
          text: "內容",
          value: "marqueeContent",
          align: "center",
          width: "5%",
        },
        {
          text: "類別",
          value: "marqueeType",
          align: "center",
          width: "7%",
        },
        {
          text: "上架人員",
          value: "createAuthor",
          align: "center",
        },
        {
          text: "狀態",
          value: "signStatus",
          sortable: false,
          align: "center",
        },
        {
          text: "上架日期",
          value: "releaseStartDate",
          align: "center",
        },
        {
          text: "下架日期",
          value: "releaseEndDate",
          align: "center",
        },
        {
          text: "上架",
          value: "status",
          sortable: false,
          width: "6%",
          align: "center",
        },
        {
          text: "退件資訊",
          value: "returnInfo",
          align: "center",
          width: "7%",
        },
        {
          text: "操作",
          value: "action",
          sortable: false,
          align: "center",
          width: "17%",
        },
      ],
      headerReturn: [
        { text: "退件主管名稱", value: "rejectUser", align: "center" },
        { text: "退件日期", value: "rejectDate", align: "center" },
        { text: "退件原因", value: "rejectReason", align: "center" },
      ],
      itemsCRUD: [],
      defaultItem: {
        name: "",
        scp_id: "",
        marqueeContent: "",
        division: "",
        ondate: 0,
        pages: 0,
      },
      // CRUD
      dialog: false,
      alertDialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        scp_id: "",
        marqueeContent: "",
        division: "",
        ondate: 0,
        pages: 0,
      },
    };
  },
  computed: {
    canView () {
      const token = this.$store.getters.token
      let staffAuthCode = [
        'AUTH12' , //多媒體設定-區處
        'AUTH13' , //多媒體設定-業務處
      ]
      return token.authTokens.some(authCode => staffAuthCode.includes(authCode))
    },
  },
  methods: {
    allowEdit(signStatus ,programType) {
      return (/(DRAFT|REJECT)$/i).test(signStatus) || (/(DEFAULT)$/i).test(programType)
    },
    allowDelete(signStatus ,marqueeType) {
      return (/(DRAFT|REJECT)$/i).test(signStatus) && !(/(DEFAULT)$/i).test(marqueeType)
    },
    allowSunset(signStatus,status,marqueeType) {
      return (/(PASS)$/i).test(signStatus) && (/(ACTIVE)$/i).test(status) && !(/(DEFAULT)$/i).test(marqueeType)
    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.alertDialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.itemsCRUD[this.editedIndex], this.editedItem);
      } else {
        this.itemsCRUD.push(this.editedItem);
      }
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.itemsCRUD.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$router.push({
        path: `${this.$route.matched[0].path}/marqueeEdit?id=${item.marqueeId}`,
      });
    },
    previewItem(item) {
      this.selectMarquee = item;
      this.preViewMarqueeModel = true;
      
      // this.$router.push({path:`${this.$route.matched[0].path}/createMarquee?id=${item.marqueeId}`})
    },
    viewSchedule() {
      this.$router.push({
        path: `${this.$route.matched[0].path}/marqueeCalendar`,
      });
    },
    deleteItem(item) {
      this.alertDialog = true;
      this.editedIndex = this.itemsCRUD.indexOf(item);
    },
    remove(item , action) {
      this.selectMarquee = item;
      this.selectAction = action;
      //this.itemsCRUD.splice(this.editedIndex, 1)
      //this.close()
      if(action =='DELETE'){
        this.deleteMarqueeModel = true;
      } else if (action =='CLOSE'){
        this.sunsetModel = true;
      }
    },
    // 送出狀態更新
    updateStatus() {
      let postData = {
        id: this.selectMarquee.marqueeId ,
        action: this.selectAction ,
      }
      console.log('updateMarqueeStatus',postData)
      //API post 
      this.updateMarqueeStatus(postData)
    },
    resetForm() {
      (this.marqueeName = null),
        (this.releaseStartDateFrom = null),
        (this.releaseStartDateTo = null),
        (this.releaseEndDateFrom = null),
        (this.releaseEndDateTo = null),
        (this.status = null),
        (this.marqueeType = null),
        (this.signStatus = null),
        (this.isShow=false),
        (this.itemsCRUD = []);
    },
    deleteMarquee(item) {
      fetchDeleteMarquee({
        marqueeId: item,
      }).then((res) => {
        this.deleteMarqueeModel = false;
        if (res.rtnCode == "00000" && res.restData.code == "00000") {   
          MessageService.showSuccess(res.rtnMsg);         
        } else if (res.restData.code == "20001") {
          MessageService.showError(res.restData.message, "刪除");
        } else {
          MessageService.showInfo(res.restData.message, res.restData.code);
        }
          this.submitSearch();
      });
    },
    // 查詢
    submitSearch() {
      //查詢前清空資料
      this.itemsCRUD = [];
      this.isShow = false
      fetchListMarquee({
        marqueeName: this.marqueeName,
        marqueeType: this.marqueeType,
        releaseStartDateFrom: this.releaseStartDateFrom,
        releaseStartDateTo: this.releaseStartDateTo,
        releaseEndDateFrom: this.releaseEndDateFrom,
        releaseEndDateTo: this.releaseEndDateTo,
        status: this.status,
        signStatus: this.signStatus,
      })
        .then((res) => {
          
          if ( res.restData.marquee !== null || res.restData.marquee.length >= 1 ) {
            let arrayObj = res.restData.marquee;
            arrayObj.forEach((item) => {
              if (item.signStatus === "REJECT") {
                Object.assign(item, {
                  returnInfo: {
                    rejectUser: item.rejectUser,
                    rejectDate: item.rejectDate,
                    rejectReason: item.rejectReason,
                  },
                });
              }
            });

            this.itemsCRUD = Object.assign([], arrayObj);
            this.isShow = true
          } else {
            (this.itemsCRUD = []), MessageService.showSuccess("查無資料");
          }
          console.log(this.itemsCRUD);
        })
        .catch((error) => {
          //MessageService.showError(error.rtnMsg);
          this.isSubmited = false;
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
