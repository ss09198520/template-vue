<template>
  <v-container fluid>
    <p class="text-xl-h4 font-weight-bold">跑馬燈查詢</p>
    <p class="text-xl-h5 font-weight-bold">查詢條件</p>
    <v-row>
      <v-col
        class="xs"
        cols="12"
      >
        <v-form>
          <v-row
            class="d-flex justify-center"
            dense
          >
            <v-col cols="4">
              <v-text-field
                color="accent"
                dense
                label="搜尋條件 1"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                color="accent"
                dense
                label="搜尋條件 2"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                color="accent"
                dense
                label="搜尋條件 3"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-center"
            dense
          >
            <v-col cols="4">
              <v-text-field
                color="accent"
                dense
                label="搜尋條件 4"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="['option1', 'option2', 'option3']"
                color="accent"
                item-color="accent"
                label="下拉選單"
                dense
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="menu"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="日期選擇"
                    color="accent"
                    outlined
                    dense
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
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
    <v-divider />
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
            text: '跑馬燈名稱',
            value: 'name',
            width: '26%',
          },
          {
            text: '描述',
            value: 'scp_id',
            width: '20%',
          },
          {
            text: '撥放內容',
            value: 'marquee_content',
            align: 'center',
            width: '12%',
          },
          {
            text: '單位',
            value: 'division',
            align: 'center',
            width: '10%',
          },
          {
            text: '上架日期',
            value: 'ondate',
            width: '10%',
          },
          {
            text: '下架日期',
            value: 'offdate',
            width: '10%',
          },
          {
            text: '操作',
            value: 'action',
            sortable: false,
            width: '10%',
          },
        ],
        itemsCRUD: [
          {
            name: '電廠維護公告',
            id: 1,
            scp_id: '電廠緊急護公告',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: '秋季節約用電宣導',
            id: 2,
            scp_id: '秋季節約用電宣導',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/footer',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'New! 9月11日颱風緊急通報',
            id: 3,
            scp_id: '颱風登陸緊急通報',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: '台電公司對受疫情影響農業及服務業之電費減免措施',
            id: 4,
            scp_id: '電費減免措施',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: '台電連4年獲亞洲企業社會責任獎',
            id: 5,
            scp_id: '台電連4年獲亞洲企業社會責任獎',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: '台電首度攜手紙風車劇團，到彰化員林打造露天舞台劇',
            id: 6,
            scp_id: '台電首度攜手紙風車劇團，到彰化員林打造露天舞台劇',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'業務處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
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