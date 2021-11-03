<template>
  <v-container>
    <h2 class="font-bold">跑馬燈查詢</h2>
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
              跑 馬 燈 內 容
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                class="font-weight-bold"
                color="accent"
                dense
                placeholder="跑馬燈內容"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              跑 馬 燈 類 型
            </v-col>
            <v-col cols="3" class="ml-2">
              <v-select
                :items="['一般','預設']"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="跑馬燈類型"
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
              狀態
            </v-col>
            <v-col cols="3">
              <v-select
                :items="['暫存', '退件', '審核中', '審核完成']"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="狀態"
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
              <v-select
                :items="['上架','未上架','下架']"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="上架狀態"
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
                    v-model="releaseDateStart"
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
                  v-model="releaseDateStart"
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
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
                  v-model="releaseDateEnd"
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
                v-model="sunsetDateStartMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y              
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="sunsetDateStart"
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
                  v-model="sunsetDateStart"
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="sunsetDateEndMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y              
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="sunsetDateEnd"
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
                  v-model="sunsetDateEnd"
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
            @click="isShow = true"
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
          <template v-slot:[`item.action`]="{ item }">
            <!-- <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  color="red"
                  @click="editItem(item)"
                  v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>編輯</span>
            </v-tooltip> -->
            <v-tooltip top>
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
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="success"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-pencil'" />
                </v-btn>
              </template>
              <span>編輯</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  x-small
                  color="error"
                  @click="action('deleteMultiMedia',item)"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-delete'" />
                </v-btn>
              </template>
              <span>刪除</span>
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
          <template v-slot:[`item.marquee_content`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2 d-flex justify-center"
                  v-on="on"
                >
                  mdi-file
                </v-icon>
              </template>
              <span>{{ item.marquee_content }}</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.active`]="{ item }">
            <v-icon
              class="d-flex justify-center"
              :color="item.active?'green darken-2':''"
            >
              {{ item.active ? 'mdi-checkbox-marked-circle':'mdi-minus-circle' }}
            </v-icon>
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
  export default {
    data() {
      return {
        isShow: false,
        // menu: false,
        // date: new Date().toISOString().substr(0, 10),
        //分頁
        releaseDateStartMenu: false,
        releaseDateStart: '',
        releaseDateEndMenu: false,
        releaseDateEnd: '',
        sunsetDateStartMenu: false,
        sunsetDateStart: '',
        sunsetDateEndMenu: false,
        sunsetDateEnd: '',
        //分頁 end
        //日曆
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //日曆 end
        headerCRUD: [
          {
            text: '跑馬燈名稱',
            value: 'name',
            width: '24%',
          },
          {
            text: '跑馬燈內容',
            value: 'marquee_content',
            align: 'center',
          },
          {
            text: '跑馬燈類別',
            value: 'scp_id',
            align: 'center'
          },
          {
            text: '上架人員名稱',
            value: 'division',
            align: 'center',
          },
          {
            text: '狀態',
            value: 'signoff',
            sortable: false,
            align: 'center',
          },
          {
            text: '上架日期',
            value: 'ondate',
            align: 'center',
          },
          {
            text: '下架日期',
            value: 'offdate',
            align: 'center',
          },
          {
            text: '上架',
            value: 'active',
            sortable: false,
            width: '10%',
            align: 'center',
          },
          {
            text: '退件資訊',
            value: 'returnInfo',
            align: 'center'
          },
          {
            text: '操作',
            value: 'action',
            sortable: false,
            align: 'center',
          },
        ],
        headerReturn:[
          {text: '退件主管名稱',value: 'returnManagerName',align: 'center',},
          {text: '退件日期',value: 'returnDate',align: 'center',},
          {text: '退件原因',value: 'returnReason',align: 'center',},
        ],
        itemsCRUD: [
          {
            name: '電廠維護公告',
            id: 1,
            scp_id: '一般',
            marquee_content: '台灣電力公司跑馬燈輪播測試!!! :   今日北部地區即時電力 最大供電能力 4,044.6 萬瓩 供電充裕。!!!!',
            division:'王大明',
            active: true,
            ondate: '2021-09-11',
            offdate: '2021-10-30',
            signoff: '審核完成'
          },
          {
            name: '秋季節約用電宣導',
            id: 2,
            scp_id: '預設',
            marquee_content: '台灣電力公司跑馬燈輪播測試!!! :   今日北部地區即時電力 最大供電能力 4,044.6 萬瓩 供電充裕。!!!!',
            division:'李小凡',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '審核完成'
          },
          {
            name: 'New! 9月11日颱風緊急通報',
            id: 3,
            scp_id: '一般',
            marquee_content: '台灣電力公司跑馬燈輪播測試!!! :   今日北部地區即時電力 最大供電能力 4,044.6 萬瓩 供電充裕。!!!!',
            division:'葉星辰',
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
            division:'趙元智',
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
            division:'陳立元',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '退件',
            returnInfo: {
              returnManagerName: '黃課長',
              returnDate: '上架',
              returnReason: '文字錯誤',
            },
          },
          {
            name: '台電首度攜手紙風車劇團，到彰化員林打造露天舞台劇',
            id: 6,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'陳立元',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '退件',
            returnInfo: {
              returnManagerName: '陳組長',
              returnDate: '上架',
              returnReason: '名稱錯誤',
            },
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
      editItem(item) {
        this.editedIndex = this.itemsCRUD.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$router.push({path:`${this.$route.matched[0].path}/create`})
      },
      viewSchedule() {
        this.$router.push({path:`${this.$route.matched[0].path}/calendarList`})
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