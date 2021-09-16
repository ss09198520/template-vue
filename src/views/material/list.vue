<template>
  <v-container fluid>
    <h2 class="font-bold">素材查詢</h2>
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
              素 材 名 稱
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                color="accent"
                dense
                placeholder="素材名稱"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1" class="ml-2">
              上 傳 人 員
            </v-col>
            <v-col cols="3" class="mt-5">
              <v-text-field
                color="accent"
                dense
                placeholder="上傳人員"
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
              素 材 類 型
            </v-col>
            <v-col cols="3">
              <v-select
                :items="['圖片', '影片',]"
                class="font-bold"
                color="accent"
                item-color="accent"
                placeholder="素材類型"
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
                    placeholder="上傳時間(起)"
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
                    placeholder="上傳時間(迄)"
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
            class="ma-2 justify-center"
            fab
            small
            @click="isGrid = !isGrid"
            v-on="on"
          >
            <v-icon v-text=" !isGrid ? 'mdi-view-grid-outline': 'mdi-format-list-bulleted-square'" />
          </v-btn>
        </template>
        <span>瀏覽模式</span>
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
      <v-col v-show="isGrid" md="12">
        <fet-card
          full-width
          title="搜尋結果"
          text=""
        >
          <div class="imgList">
            <ul class="resourceList">
              <li
                v-for="(resource,id) in resources"
                :id="resource.id"
                :key="id"
                :url="resource.url" 
                @click="selected($event)" 
              >
                <div class="imgBox">
                  <img :src="require(`@/resource/${resource.thumbnail}`)">
                </div>
                <p>{{ resource.name }}</p>
              </li>
            </ul>
          </div>
        </fet-card>
      </v-col>
      <v-col v-show="!isGrid" md="12">
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
              </v-tooltip> -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    x-small
                    color="error"
                    :disabled="item.active"
                    @click="action('deleteMultiMedia',item)"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                  <!-- <v-icon
                    :disabled="item.active"
                    color="error"
                    @click="deleteItem(item)"
                    v-on="on"
                  >
                    mdi-delete
                  </v-icon> -->
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
            <template v-slot:[`item.active`]="{ item }">
              <v-icon
                class="d-flex justify-center"
                :color="item.active?'green darken-2':''"
                v-on="on"
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
        </fet-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        isGrid: false,
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end
        //日曆
        releaseDateStartMenu: false,
        releaseDateStart: '',
        releaseDateEndMenu: false,
        releaseDateEnd: '',
        //日曆 end
        resources: [
          {
            "id": 1,
            "url": "image/bg1.jpg",
            "thumbnail": "image/bg1_tn.jpg",
            "name": "bg1.jpg",
            "type": "image"
          },
          {
            "id": 2,
            "url": "image/bg2.png",
            "thumbnail": "image/bg2_tn.jpg",
            "name": "bg2.jpg",
            "type": "image"
          },
          {
            "id": 3,
            "url": "image/p1.jpg",
            "thumbnail": "image/p1_tn.jpg",
            "name": "p1.jpg",
            "type": "image"
          },
          {
            "id": 4,
            "url": "image/p2.jpg",
            "thumbnail": "image/p2_tn.jpg",
            "name": "p2.jpg",
            "type": "image"
          },
          {
            "id": 5,
            "url": "image/p3.jpg",
            "thumbnail": "image/p3_tn.jpg",
            "name": "p3.jpg",
            "type": "image"
          },
          {
            "id": 6,
            "url": "image/p4.jpg",
            "thumbnail": "image/p4_tn.jpg",
            "name": "p4.jpg",
            "type": "image"
          },
          {
            "id": 7,
            "url": "image/p5.jpg",
            "thumbnail": "image/p5_tn.jpg",
            "name": "p5.jpg",
            "type": "image"
          },
          {
            "id": 8,
            "url": "image/p6.jpg",
            "thumbnail": "image/p6_tn.jpg",
            "name": "p6.jpg",
            "type": "image"
          },
          {
            "id": 9,
            "url": "image/p7.jpg",
            "thumbnail": "image/p7_tn.jpg",
            "name": "p7.jpg",
            "type": "image"
          },
          {
            "id": 10,
            "url": "image/p8.jpg",
            "thumbnail": "image/p8_tn.jpg",
            "name": "p8.jpg",
            "type": "image"
          },
          {
            "id": 11,
            "url": "image/p9.jpg",
            "thumbnail": "image/p9_tn.jpg",
            "name": "p9.jpg",
            "type": "image"
          },
          {
            "id": 12,
            "url": "image/p10.jpg",
            "thumbnail": "image/p10_tn.jpg",
            "name": "p10.jpg",
            "type": "image"
          }
        ],
        headerCRUD: [
          {
            text: '素材名稱',
            value: 'name',
            width: '24%',
          },
          {
            text: '上傳人員名稱',
            value: 'division',
            align: 'center',
          },
          {
            text: '上傳時間',
            value: 'ondate',
            align: 'center'
          },
          {
            text: '使用中',
            value: 'active',
            sortable: false,
            align: 'center',
          },
            {
              text: '狀態操作',
              value: 'action',
              sortable: false,
              align: 'center'
            },
        ],
        itemsCRUD: [
          {
            name: '電廠維護圖片',
            id: 1,
            scp_id: '一般',
            marquee_content: '台灣電力公司跑馬燈輪播測試!!! :   今日北部地區即時電力 最大供電能力 4,044.6 萬瓩 供電充裕。!!!!',
            division:'王大明',
            active: true,
            ondate: '2021-09-11',
            offdate: '2021-10-30',
            signoff: '簽核完成'
          },
          {
            name: '秋季節約用電宣導圖片',
            id: 2,
            scp_id: '預設',
            marquee_content: '台灣電力公司跑馬燈輪播測試!!! :   今日北部地區即時電力 最大供電能力 4,044.6 萬瓩 供電充裕。!!!!',
            division:'李小凡',
            active: false,
            ondate: '2020-12-21',
            offdate: '2021-04-30',
            signoff: '簽核完成'
          },
          {
            name: '颱風緊急通報圖片',
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
            name: '宣導圖片',
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
            signoff: '退件'
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

<style lang="scss" scoped>

#resource {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}

#resourceTree {
  border: 1px solid #c1c1c1;
  height: 98%;
  width: 12%;
  border-radius: 10px;
  overflow: hidden;
}

.title {
  height: 40px;
  background-color: #d33a31;
  line-height: 40px;
  padding-left: 10px;
  font-size: 1.4rem;
  color: white;
  letter-spacing: 3px;
}

.controlTree {
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding-right: 10px;
  border-bottom: 1px solid #dedede;
}

.controlTree > a {
  margin-left: 15px;
}

.controlTree > a > i {
  margin-right: 3px;
}

.controlTree > a:hover {
  color: #d33a31;
}

#resourceList {
  border: 1px solid #c1c1c1;
  height: 98%;
  border-radius: 10px;
  overflow: hidden;
  width: 87%;
}

.controlBox {
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
}

.control a {
  margin-left: 10px;
  font-size: 1.4rem;
  border-right: 1px solid #cfcfcf;
  padding-right: 10px;
}

.control > a > i {
  margin-right: 5px;
}

.search {
  display: flex;
}

.search > div {
  margin-right: 10px;
}

.imgList, .tableList {
  padding: 20px;
  height: 580px;
}

.resourceList {
  display: flex;
  flex-wrap: wrap;
}

.resourceList li {
  width: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 30px 40px;
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 5px;
  position: relative;
}

.imgBox {
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #e7e7e7;
}

.resourceList li img {
  max-width: 120px;
  max-height: 120px;
}

.resourceList li:hover {
  background-color: #ebebeb !important;
}

.resourceList p {
  min-width: 20px;
}

.el-upload-list__item-status-label {
  position: absolute;
  right: -15px;
  top: -7px;
  width: 46px;
  height: 26px;
  background: #13ce66;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 1px 1px #ccc;
}

.el-upload-list__item-status-label i {
  font-size: 12px;
  margin-top: 12px;
  transform: rotate(-45deg);
  color: white;
}

.page {
  text-align: right;
  padding-right: 20px;
}
</style>