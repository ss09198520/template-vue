<template>
  <v-container>
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
                v-model="postForm.materialName"
                color="accent"
                dense
                placeholder="請輸入素材名稱"
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
                v-model="postForm.createAuthor"
                color="accent"
                dense
                placeholder="請輸入上傳人員(員編代號)"
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
              <v-autocomplete
                v-model="postForm.materialType"
                :items="materialTypeOption"
                clearable
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
              上 傳 時 間
            </v-col>
            <v-col 
              cols="3"   
              class="d-flex"
            >
              <v-menu
                v-model="createDateStartMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.createDateStart"
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
                  v-model="postForm.createDateStart"
                  scrollable
                />
              </v-menu>
              <div class="mt-2"> ~ </div>
              <v-menu
                v-model="createDateEndMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postForm.createDateEnd"
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
                  v-model="postForm.createDateEnd"
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
            class="ma-2 "
            fab
            small
            color="accent"
            @click="postForm={};mediaFiles=[]"
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
    <v-row v-if="isShow">
      <v-col v-if="isGrid" md="12">
        <fet-card
          full-width
          title="搜尋結果"
          text=""
        >
          <v-row>
            <div class="imgList">
              <ul class="resourceList">
                <li
                  v-for="(resource,id) in mediaFiles"
                  :id="resource.id"
                  :key="id"
                  @dblclick="(previewUrl = resource.dataUrl),(overlay = true)"
                >
                  <div class="imgBox">
                    <img :src="resource.dataUrl">
                  </div>

                  <p>{{ resource.materialName }}</p>
                </li>
              </ul>
            </div>
          </v-row>
        </fet-card>
      </v-col>
      <v-col v-if="!isGrid" md="12">
        <fet-card
          full-width
          title="搜尋結果"
          text=""
        >
          <v-data-table
            item-key="id"
            :headers="header"
            :items="mediaFiles"
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
            <!-- 刪除案件 -->
            <template v-slot:top>
              <v-dialog v-model="dialog" max-width="500" />
              <v-dialog v-if="alertDialog" v-model="alertDialog" :max-width="450">
                <v-card>
                  <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
                    確認是否要刪除素材
                    <v-spacer />
                    <v-btn
                      color="white"
                      icon
                      small
                      text
                      @click="alertDialog = false"
                    >
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-title class="justify-center">確定刪除 {{ mediaFiles[editedIndex].materialName||'' }} 此筆素材資料?</v-card-title>
                  <v-card-actions class="justify-center">
                    <v-btn color="normal" depressed @click="alertDialog = false ; dialog = false" v-text="' 取消 '" />
                    <v-btn color="error" depressed @click="remove" v-text="' 確定 '" />
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
                    color="error"
                    :disabled="!!item.relatedInfos"
                    @click="deleteItem(item)"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                </template>
                <span>刪除</span>
              </v-tooltip>
            </template>

            <!-- 關聯節目單資訊 -->
            <template v-slot:[`item.relatedInfos`]="{ item }">
              <v-tooltip v-if="item.relatedInfos" top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="mr-2 d-flex justify-center"
                    color="success"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                <v-data-table
                  :headers="headerReleate"
                  :items="item.relatedInfos"
                  disable-sort
                  hide-default-footer
                >
                  <template v-slot:[`item.status`]="{ item }">
                    {{ statusOption.find(state => { return item.status===state.value }).text }}
                  </template>
                  <template v-slot:[`item.signStatus`]="{ item }">
                    {{ signStatusOption.find(state => { return item.signStatus===state.value }).text }}
                  </template>
                </v-data-table>
              </v-tooltip>
            </template>
            <!-- 使用中 -->
            <template v-slot:[`item.active`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="d-flex justify-center"
                    :color="!!item.relatedInfos ? 'green darken-2':''"
                    v-on="on"
                  >
                    {{ !!item.relatedInfos ? 'mdi-checkbox-marked-circle':'' }}
                  </v-icon>
                </template>
                {{ !!item.relatedInfos ? '使用中':'' }}
              </v-tooltip>
            </template>
            <!-- 縮圖 -->
            <template v-slot:[`item.dataUrl`]="{ item }">
              <v-img
                :src="item.dataUrl"
                :style="`cursor: pointer`"
                max-width="50"
                max-height="50"
                @dblclick="(previewUrl = item.dataUrl),(overlay = true)"
              />
              {{ item.fileName }}
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
    <v-overlay
      :value="overlay"
      z-index="1000"
      class="text-right"
    >
      <v-img
        :src="previewUrl"
        max-width="700"
        max-height="1024"
        @load="imageLoaded = true"
        @click="(overlay = false), (imageLoaded = false)"
      />
      <v-progress-circular
        v-show="!imageLoaded"
        indeterminate
      />
    </v-overlay>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service"
  import { listMediaFile , deleteFile} from '@/api/mediaFile'
  import enums from '@/utils/enums'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    materialName: null, 
    createDateStart: null, 
    createDateEnd: null, 
    createAuthor: null,
    status: null //暫無使用
  }
  
  export default {
    
    data() {
      return {
        //api post data
        postForm: Object.assign({}, defaultForm),

        isShow: false,
        isGrid: false,
        overlay: false,
        previewUrl: '',
        imageLoaded: false,
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end
        //日曆
        createDateStartMenu: false,
        createDateEndMenu: false,
        //日曆 end

        //素材類型下拉
        materialTypeOption: enums.materialFileTypeOption,
        //上架下拉選單
        statusOption: enums.mediaStatusOption,
        //簽核狀態下拉選單
        signStatusOption: enums.mediaSignStatusOption,
        
        //素材資料清單
        mediaFiles:[],
        header: [
          { text: '素材名稱', value: 'materialName', width: '24%', },
          { text: '上傳人員名稱', value: 'createAuthor', width: '10%', },
          { text: '上傳時間', value: 'createDate', align: 'center' },
          { text: '縮圖', value: 'dataUrl', },
          { text: '關聯使用資訊', value: 'relatedInfos', align: 'center' },
          { text: '使用中', value: 'active', sortable: false, align: 'center', },
          { text: '狀態操作', value: 'action', sortable: false, align: 'center' },
        ],
        headerReleate:[
          {text: '節目單標題',value: 'programName',align: 'center',},
          {text: '關聯節目單類別',value: 'programType',align: 'center',},
          {text: '關聯節目單審核狀態',value: 'signStatus',align: 'center',},
          {text: '關聯節目單播放狀態',value: 'status',align: 'center',},
        ],
        // CRUD
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
      }
    },
    methods: {
      close() {
        this.dialog = false
        this.editedIndex = -1
        this.alertDialog = false
      },
      editItem(item) {
        this.editedIndex = this.mediaFiles.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        this.$router.push({path:'/marquee/create'})
        this.dialog = true
      },
      
      remove() {
        let itemId = this.mediaFiles[this.editedIndex].id
        this.deleteMediaFile(itemId)
        this.close()
      },
      preview(e) {
        console.log(e)
        
        this.previewUrl = document.getElementById(e.currentTarget.id).getAttribute("url");
        // this.title = this.treeName.slice(0, 2);
        // if (this.url.indexOf('mp4') != '-1') {
        //   this.format = 'video';
        // } else if (this.url.indexOf('png') != '-1' || this.url.indexOf('jpg') != '-1' || this.url.indexOf('jpeg') != '-1') {
        //   this.format = 'image'
        // } else {
        //   this.$message({
        //     message: this.$t('Msg.ID_MSG_26'),
        //     center: true,
        //     type: 'warning'
        //   });
        //   return false
        // }
        this.overlay = true
         console.log(this.previewUrl)
        // if (this.format == 'video') {
        //   let myVideo = document.getElementById('myVideo');
        //   myVideo.load();
        // }
      },
      // 送出查詢
      submitSearch() {
        //API post data 
        this.fetchMediaFileList(this.postForm)
      },
      //刪除素材
      deleteItem(item) {
        // this.dialog = true
        this.alertDialog = true
        this.editedIndex = this.mediaFiles.indexOf(item)
      },

      /**
       * @param {Object} questionnaire
       * @returns {Object}
       */
      hasResult (dataList) {
        // 驗證questionnaire是否有資料
        if(isEmpty(dataList) || dataList.length < 1 ){
            MessageService.showInfo('查無相關資料')
            return
        }
        return true
      },


      /**
       * 
       * Ajax start 
       * 
       **/
      
      //Action:素材查詢
      async fetchMediaFileList(postData) {
        
        const data = await listMediaFile(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢素材清單資料');
            return;
        }
        //查詢前清空資料
        this.mediaFiles = Object.assign([])
        // 驗證是否有資料
        if(this.hasResult(data.restData.materialFiles)){
          let tmpData = data.restData.materialFiles

          //處理關聯資訊轉換
          // tmpData.forEach(element => {
          //   element.relatedInfo = [];
          //   Object.assign(element.relatedInfo, defaultRelatedInfo);
          // });
          this.mediaFiles = tmpData
          this.isShow = true 
        }
        
      },

      //Action:素材刪除
      async deleteMediaFile(id) {
        
        const data = await deleteFile(id)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'刪除素材資料');
            return;
        }
        MessageService.showSuccess('刪除成功' + "✓")
        //刪除畫面資料
        this.mediaFiles.splice(this.editedIndex, 1)

      },
    }
  }
</script>

<style lang="scss" scoped>


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

img {
  max-width: 120px;
  max-height: 120px;
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

</style>