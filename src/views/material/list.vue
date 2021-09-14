<template>
  <v-container fluid>
    <p class="text-h4 font-weight-bold">素材查詢</p>
    <p class="text-h5 font-weight-bold">查詢條件</p>
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
                class="font-weight-bold"
                dense
                label="素材名稱"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                color="accent"
                class="font-weight-bold"
                dense
                label="上傳人員"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col cols="4">
              <v-select
                :items="['圖片', '影片',]"
                class="font-weight-bold"
                color="accent"
                item-color="accent"
                label="素材類型"
                dense
                outlined
                hide-details
              />
            </v-col>
          </v-row>
          <v-row
            class="d-flex"
            dense
          >
            <v-col cols="4">
              <v-menu
                v-model="releaseDateStartMenu"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseDateStart"
                    label="上傳時間(起)"
                    color="accent"
                    outlined
                    dense
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
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="releaseDateEndMenu"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="releaseDateEnd"
                    label="上傳時間(迄)"
                    color="accent"
                    outlined
                    dense
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
          </v-row>
          <v-row
            class="d-flex justify-start"
            dense
          >
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
    <v-row v-show="isShow">
      <v-col md="12">
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
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true,
        itemsPerPage: 10,
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