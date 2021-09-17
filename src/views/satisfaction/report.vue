<template>
  <v-container fluid>
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
              <v-select
                :items="['核算課','大里服務中心','東山服務所']"
                color="accent"
                item-color="accent"
                placeholder="受理部門"
                dense
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              受 理 人 員
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                color="accent"
                dense
                placeholder="受理人員"
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
              <v-select
                :items="['QA210 軍眷用電申請優待','I0510 故障換表','I0520 增加電表','F3030 表燈非時間電價停用廢止','I0510 故障換表',]"
                color="accent"
                item-color="accent"
                placeholder="申請項目"
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
              調 查 日 期
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
                    v-model="releaseDateStart"
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
                  v-model="releaseDateStart"
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
                    v-model="releaseDateEnd"
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
                  v-model="releaseDateEnd"
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
            :disabled="!isDownload"
            @click="viewSchedule"
            v-on="on"
          >
            <v-icon v-text="'mdi-file-download-outline'" />
          </v-btn>
        </template>
        <span>下載查詢結果</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            fab
            small
            color="primary"
            @click="isDownload=!isDownload"
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
    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="id"
          :headers="headerCRUD"
          :items="itemsCRUD"
          :items-per-page="itemsPerPage"
          :footer-props="{
            showFirstLastPage: true,
          }"
          disable-sort
          class="font-weight-bold elevation-1"
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
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  class="mr-2"
                  color="red"
                  @click="editItem(item)"
                  v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>編輯</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  @click="deleteItem(item)"
                  v-on="on"
                >
                  mdi-eye
                </v-icon>
              </template>
              <span>刪除</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.marquee_content`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  class="mr-2 d-flex justify-center"
                  v-on="on"
                >
                  mdi-file
                </v-icon>
              </template>
              <span>{{ item.marquee_content }}</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="d-flex justify-center"
                  :color="item.active?'green darken-2':''"
                  v-on="on"
                >
                  {{ item.active ? 'mdi-checkbox-marked-circle':'mdi-minus-circle' }}
                </v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        isDownload: false,
        releaseDateStartMenu: false,
        releaseDateStart: '',
        releaseDateEndMenu: false,
        releaseDateEnd: '',
        sunsetDateStartMenu: false,
        sunsetDateStart: '',
        sunsetDateEndMenu: false,
        sunsetDateEnd: '',
        itemsPerPage: 10,
        headerCRUD: [
            { text: '下載', value: 'download', align: 'center' },
            { text: '審核', value: 'signOff', align: 'center' },
            { text: '調閱月份', value: 'readMonth', align: 'center' },
            { text: '區處', value: 'region', align: 'center' },
            { text: '調閱管理員簽核時間', value: 'signOffDate1', align: 'center' },
            { text: '核算課長簽核時間', value: 'signOffDate2', align: 'center' },  
            { text: '電費經理簽核時間', value: 'signOffDate3', align: 'center' },   
        ],
        itemsCRUD: [
          {
            name: '電廠維護公告',
            id: 1,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/menu',
            division:'台中區處',
            active: true,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '審核完成'
          },
          {
            name: '秋季節約用電宣導',
            id: 2,
            scp_id: '預設',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/footer',
            division:'業務處',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '審核完成'
          },
          {
            name: 'New! 9月11日颱風緊急通報',
            id: 3,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '暫存'
          },
          {
            name: '台電公司對受疫情影響農業及服務業之電費減免措施',
            id: 4,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'台中區處',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '審核中'
          },
          {
            name: '台電連4年獲亞洲企業社會責任獎',
            id: 5,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '退件'
          },
          {
            name: '台電首度攜手紙風車劇團，到彰化員林打造露天舞台劇',
            id: 6,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'業務處',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '退件'
          },
        ],
        defaultItem: {
          name: '',
          scp_id: '',
          marquee_content: '',
          division:'',
          ondate: 0,
          pages: 0,
        },
        // CRUD
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          scp_id: '',
          marquee_content: '',
          division:'',
          ondate: 0,
          pages: 0,
        },
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
    }
  }
</script>

<style lang="scss" scoped></style>