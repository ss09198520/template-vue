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
            :headers="headerCRUD"
            :items="itemsCRUD"
            item-key="id"
            :items-per-page="itemsPerPage"
            :hide-default-footer="false"
            :footer-props="{
              showFirstLastPage: true,
            }"
          >
            <template v-slot:top>
              <v-dialog
                v-model="dialog"
                max-width="500"
              />
              <v-dialog
                v-model="alertDialog"
                :max-width="250"
              >
                <v-card>
                  <v-card-title>Are you sure?</v-card-title>
                  <v-card-text />
                  <v-card-actions class="justify-center">
                    <v-btn
                      color="error"
                      depressed
                      @click="remove"
                    >
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    class="mr-2"
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
                    mdi-delete
                  </v-icon>
                </template>
                <span>刪除</span>
              </v-tooltip>
            </template>
            <template v-slot:item.material_path="{ item }">
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
                <span>{{ item.material_path }}</span>
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
        date: new Date().toISOString().substr(0, 10),
        itemsPerPage: 5,
        headerCRUD: [
          {
            text: '操作',
            value: 'action',
            sortable: false,
            width: '8%',
          },
          {
            text: '名稱',
            value: 'name',
            width: '26%',
          },
          {
            text: '版位ID(SCP)',
            value: 'scp_id',
            width: '20%',
          },
          {
            text: '素材CF',
            value: 'material_path',
            width: '12%',
          },
          {
            text: '上架日期',
            value: 'ondate',
            width: '17%',
          },
          {
            text: '下架日期',
            value: 'offdate',
            width: '17%',
          },
        ],
        itemsCRUD: [
          {
            name: 'menu_小網_全站主選單_1221_1231',
            id: 1,
            scp_id: 'mobile_menu_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/menu',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
          {
            name: 'footer_資費_預付卡全站下方橫幅_1221_1231',
            id: 2,
            scp_id: 'rateplan_prepaid_halban_1920156_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/01/footer',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
          {
            name: 'menu_遠傳生活圈_全站主選單_1221_1231',
            id: 3,
            scp_id: 'lifecircle_menu_240700_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
          {
            name: 'footer_資費_語音上網方案全站下方橫幅_1221_1231',
            id: 4,
            scp_id: 'rateplan_postpaid_halban_1920156_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
          {
            name: 'menu_遠傳生活圈_全站主選單_1221_1231',
            id: 5,
            scp_id: 'lifecircle_menu_240700_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/menu',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
          {
            name: 'footer_資費_語音上網方案全站下方橫幅_1221_1231',
            id: 6,
            scp_id: 'rateplan_postpaid_halban_1920156_750540',
            material_path: '/content/dam/fetnet/user_resource/cbu/contents/ad/material/202012/08/footer',
            ondate: '2020-12-21T00:00:00',
            offdate: '2020-12-31T23:59:00',
          },
        ],
        defaultItem: {
          name: '',
          scp_id: '',
          material_path: '',
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
          material_path: '',
          ondate: 0,
          pages: 0,
        },
      }
    },
    methods: {
      getParentRouteName() {
        // only show parent route with meta.title
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        return matched[0].meta.title
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
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