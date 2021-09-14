<template>
  <v-container fluid>
    <p class="text-xl-h4 font-weight-bold">滿意度區處報表(月)</p>
    <v-row>
      <v-col
        class="xs"
        cols="12"
      >
        <v-form>
          <v-row align="center">
            <v-col cols="1">
              調閱日期
            </v-col>
            <v-col cols="3" class="d-flex">
              <v-menu
                v-model="startDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="before7"
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
                  v-model="before7"
                  @input="startDate = false"
                />
              </v-menu>
              <div class="mt-1">~</div>
              <v-menu
                v-model="endDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
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
                  v-model="date"
                  @input="endDate = false"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="primary" class="ml-3" @click="search()"><v-icon style="margin-right: 3px;">mdi-magnify</v-icon>查詢</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-divider class="mt-6 mb-5" />
    <!-- <hr class="mt-6 mb-5"> -->
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
          class="font-weight-bold"
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
        // menu: false,
        // date: new Date().toISOString().substr(0, 10),
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
          {
            text: '操作',
            value: 'action',
            sortable: false,
            align: 'center'
          },
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
            text: '單位',
            value: 'division',
            align: 'center',
          },
          {
            text: '上架日期',
            value: 'ondate',
            align: 'center'
          },
          {
            text: '下架日期',
            value: 'offdate',
            align: 'center'
          },
          {
            text: '啟用',
            value: 'state',
            sortable: false,
            align: 'center',
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
            division:'台中區處',
            active: true,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '簽核完成'
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
            signoff: '簽核完成'
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