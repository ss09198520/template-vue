<template>
  <v-container fluid>
    <p class="text-xl-h4 font-weight-bold">節目單查詢</p>
    <p class="text-xl-h5 font-weight-bold">查詢條件</p>
    <v-row>
      <v-col
        class="xs"
        cols="12"
      >
        <v-form>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2 font-weight-bold">
              節 目 單 標 題
            </v-col>
            <v-col cols="3" class="mt-5 font-weight-bold">
              <v-text-field
                class="font-weight-bold"
                color="accent"
                dense
                placeholder="節目單標題內容"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2 font-weight-bold">
              節 目 單 類 型
            </v-col>
            <v-col cols="3" class="ml-2 font-weight-bold">
              <v-select
                :items="['一般','預設']"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="節目單類型"
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
            <v-col cols="1" class="ml-2 font-weight-bold">
              狀 態
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
          </v-row>
          <v-row
            class="d-flex justify-start"
            align="center"
          >
            <v-col cols="1" class="ml-2 font-weight-bold">
              上 架 時 間
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex"
            >
              <v-menu
                v-model="releaseDateStartMenu"
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
                    class="font-weight-bold"
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="releaseDateStart"
                  no-title
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="releaseDateEndMenu"
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
                    class="font-weight-bold"
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="releaseDateEnd"
                  no-title
                  scrollable
                />
              </v-menu>
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2 font-weight-bold">
              下 架 時 間
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex"
            >
              <v-menu
                v-model="sunsetDateStartMenu"
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
                    class="font-weight-bold"
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="sunsetDateStart"
                  no-title
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="sunsetDateEndMenu"
                min-width="290px"
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
                    class="font-weight-bold"
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="sunsetDateEnd"
                  no-title
                  scrollable
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-end"
            dense
          >
            <v-btn
              class="ma-2 "
              depressed
              fab
              small
              color="success"
              @click="viewSchedule"
            >
              <v-icon v-text="'mdi-calendar'" />
            </v-btn>
            <v-btn
              class="ma-2"
              fab
              small
              color="primary"
              @click="isShow = true"
            >
              <v-icon v-text="'mdi-magnify'" />
            </v-btn>
            <v-btn
              class="ma-2 "
              depressed
              fab
              small
              color="accent"
              @click="isShow = false"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
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
        isShow: true,
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        itemsPerPage: 10,
        headerCRUD: [
          
          {
            text: '操作',
            value: 'action',
            sortable: false,
            align: 'center',
          },
          {
            text: '節目名稱',
            value: 'name',
          },
          {
            text: '節目類別',
            value: 'scp_id',
            align: 'center',
          },
          {
            text: '單位',
            value: 'division',
            align: 'center',
          },
          {
            text: '上架日期',
            value: 'ondate',
          },
          {
            text: '下架日期',
            value: 'offdate',
          },
          {
            text: '狀態',
            value: 'signoff',
            sortable: false,
            align: 'center',
          },
        ],
        itemsCRUD: [
          {
            name: '電廠維護公告',
            id: 1,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/menu',
            division:'業務處',
            ondate: '2021-09-15',
            offdate: '2021-10-30',
            active: true,
            signoff: '審核完成',
          },
          {
            name: '秋季節約用電宣導',
            id: 2,
            scp_id: '預設',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/footer',
            division:'業務處',
            ondate: '2021-12-21',
            offdate: '2022-01-30',
            active: true,
            signoff: '審核中',
          },
          {
            name: '台電公司對受疫情影響農業及服務業之電費減免措施',
            id: 4,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'業務處',
            ondate: '2021-10-21',
            offdate: '2021-10-30',
            active: true,
            signoff: '審核完成',
          },
          {
            name: '台電連4年獲亞洲企業社會責任獎',
            id: 5,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'業務處',
            ondate: '2021-11-11',
            offdate: '2021-12-24',
            active: true,
            signoff: '審核完成',
          },
          {
            name: '台電首度攜手紙風車劇團，到彰化員林打造露天舞台劇',
            id: 6,
            scp_id: '一般',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'業務處',
            ondate: '2021-12-21',
            offdate: '2022-04-30',
            active: true,
            signoff: '審核完成',
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
        this.$router.push({path: `${this.$route.matched[0].path}/create`})
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