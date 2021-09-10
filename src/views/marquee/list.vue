<template>
  <v-container fluid>
    <v-row v-show="isShow">
      <v-col md="12">
        <fet-card
          full-width
          title="搜尋結果"
          text=""
        >
          <v-data-table
            item-key="id"
            :headers="headerCRUD"
            :items="itemsCRUD"
            :items-per-page="itemsPerPage"
            :footer-props="{
              showFirstLastPage: true,
            }"
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
        </fet-card>
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
            name: 'menu_小網_全站主選單_1221_1231',
            id: 1,
            scp_id: 'mobile_menu_750540',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'footer_資費_預付卡全站下方橫幅_1221_1231',
            id: 2,
            scp_id: 'rateplan_prepaid_halban_1920156_750540',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/footer',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'menu_遠傳生活圈_全站主選單_1221_1231',
            id: 3,
            scp_id: 'lifecircle_menu_240700_750540',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'footer_資費_語音上網方案全站下方橫幅_1221_1231',
            id: 4,
            scp_id: 'rateplan_postpaid_halban_1920156_750540',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'menu_遠傳生活圈_全站主選單_1221_1231',
            id: 5,
            scp_id: 'lifecircle_menu_240700_750540',
            marquee_content: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            division:'台中區處',
            ondate: '2020-12-21',
            offdate: '2021-04-30',
          },
          {
            name: 'footer_資費_語音上網方案全站下方橫幅_1221_1231',
            id: 6,
            scp_id: 'rateplan_postpaid_halban_1920156_750540',
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
        console.log(this.$router)
        // this.$router.push({ path: '/' })
        this.$router.push({path:'/marquee/create'})
        
        this.dialog = true
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