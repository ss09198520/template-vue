<template>
  <v-container>
    <h2 class="font-bold">節 目 單 製 作</h2>
    
    <v-row class="d-flex justify-center">
      <v-col
        class="ml-10"
        cols="12"
      >
        <fet-card
          full-width
          outlined
          title="節 目 單 製 作"
        >
          <not-found v-if="isNotFound" />

          <v-form v-else ref="programForm" v-model="valid" lazy-validation>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="4"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  節 目 標 題
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="postForm.programName"
                  :rules="rules.requiredRule.concat(rules.lengthRules)"
                  :hide-details="hideDatails"
                  color="accent"
                  placeholder="請輸入節目標題"
                  :counter="maxCharacter"
                  outlined
                  required
                  dense
                />
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="3"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  節 目 說 明
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="postForm.memo"
                  :rules="rules.requiredRule.concat(rules.lengthRules)"
                  :hide-details="hideDatails"
                  color="accent"
                  placeholder="請輸入節目描述"
                  :counter="maxCharacter"
                  outlined
                  dense
                  persistent-hint
                />
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  輪 播 時 間
                </v-subheader>
              </v-col>
              <v-col cols="1" md="3">
                <v-menu
                  v-model="releaseStartDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="postForm.releaseStartDate"
                      :rules="rules.requiredRule.concat(rules.lengthRules)"
                      :error-messages="errormages.dateCheck"
                      append-icon="mdi-calendar"
                      placeholder="上架時間(起)"
                      color="accent"
                      outlined
                      dense
                      readonly
                      :hide-details="hideDatails"
                      :clearable="true"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="postForm.releaseStartDate"
                    scrollable
                    :min="getMinimumStartDate"
                    :max="getMaximumStartDate"
                    @input="releaseStartDateMenu = false"
                    @change="checkDate"
                  />
                </v-menu>
              </v-col>
              <v-col cols="1" md="3">
                <v-menu
                  v-model="releaseEndDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="postForm.releaseEndDate"
                      :rules="rules.requiredRule"
                      :error-messages="errormages.dateCheck"
                      append-icon="mdi-calendar"
                      placeholder="上架時間(迄)"
                      color="accent"
                      outlined
                      dense
                      readonly
                      :hide-details="hideDatails"
                      :clearable="true"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="postForm.releaseEndDate"
                    scrollable
                    :min="getMinimumEndDate"
                    @input="releaseEndDateMenu = false"
                    @change="checkDate"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="3"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  選 擇 素 材
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-btn class="primary" style="margin:10px;" @click="showSelectPannel"><v-icon small style="margin-right: 3px;">mdi-plus</v-icon>新增</v-btn>
              </v-col>
            </v-row>
            <v-row 
              v-if="selectedFiles.length > 0"
            >
              <v-col
                cols="3"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  已 選 擇 素 材
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-data-table
                  v-sortable-data-table
                  disable-sort
                  hide-default-footer
                  :headers="headerSelectedFiles"
                  :items="selectedFiles"
                  item-key="id"
                  class="font-weight-bold elevation-1"
                  @sorted="saveOrder"
                >
                  <!-- 縮圖 -->
                  <template v-slot:[`item.dataUrl`]="{ item }">
                    <v-img
                      :src="item.dataUrl"
                      max-width="50"
                      max-height="50"
                    />
                  </template>
                  <template v-slot:[`item.sort`]="{ item }">
                    <v-icon
                      class="mr-2"
                      :style="`cursor: pointer`"
                    >
                      mdi-sort-variant
                    </v-icon>
                    {{ item.sort || '' }}
                  </template>
                  <template v-slot:[`item.delete`]="{ item }">
                    <v-btn
                      class="ma-2"
                      fab
                      x-small
                      color="error"
                      @click="deleteItem(item)"
                    >
                      <v-icon v-text="'mdi-delete'" /> 
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="5"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  審 核 附 件 上 傳
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-file-input
                  v-model="attachmentFile"
                  :rules="rules.requiredRule"
                  placeholder="請選擇上傳附件"
                  color="accent"
                  outlined
                  dense
                  persistent-hint
                  prepend-inner-icon="mdi-cloud-upload"
                  prepend-icon
                  accept="application/pdf,application/vnd.ms-excel"
                  show-size
                  @change="onUpload"
                />
                <div v-if="!!dataURL" class="t-center">
                  <v-icon x-large class="mb-2">
                    mdi-file-document-outline
                  </v-icon><br>
                </div>
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col class="d-flex justify-end">
                <v-btn
                  class="ma-1"
                  outlined
                  color="accent"
                >
                  取消
                </v-btn>
                <v-btn
                  class="ma-1"
                  depressed
                  color="primary"
                  :disabled="!valid"
                  @click="submit(false)"
                >
                  暫存
                </v-btn>
                <v-btn
                  class="ma-1"
                  depressed
                  color="success"
                  :disabled="!valid"
                  @click="submit(true)"
                >
                  送出審核
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </fet-card>
      </v-col>
    </v-row>
    <!-- 選 擇 素 材 視 窗 -->
    <v-dialog
      v-model="dialog"
      max-width="50vw"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;"> 選 擇 素 材 </v-card-title>
        
        <v-card-text>
          <v-row
            class="mt-2 justify-center"
          >
            <v-col>
              <v-text-field
                v-model="postQueryForm.materialName"
                class="font-weight-bold"
                color="accent"
                dense
                placeholder="素材名稱"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="postQueryForm.materialType"
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
            class="mt-2 justify-center"
          >
            <v-col>
              <v-text-field
                v-model="postQueryForm.createAuthor"
                color="accent"
                dense
                placeholder="請輸入上傳人員(員編代號)"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col>
              <v-menu
                v-model="createDateStartMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="postQueryForm.createDateStart"
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
                  v-model="postQueryForm.createDateStart"
                  scrollable
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-btn 
              class="primary mb-1"
              depressed
              @click="submitSearch()"
            >
              查詢 
              <v-icon right v-text="'mdi-magnify'" />
            </v-btn>        
          </v-row>
          <!-- <v-divider class="mt-6 mb-5" /> -->
          <hr class="mt-6 mb-5">
          <v-item-group v-if="isShow">
            <v-container>
              <v-row>
                <v-col
                  v-for="(itemFile,id) in mediaFiles"
                  :id="itemFile.id"
                  :key="id"
                >
                  <v-checkbox 
                    :key="id"
                    v-model="itemFile.selected"
                  >
                    <template v-slot:label>
                      <v-img
                        :src="itemFile.dataUrl"
                        :lazy-src="itemFile.dataUrl"
                        class="grey lighten-2"
                        max-height="150"
                        max-width="150"
                      />
                      
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn style="margin: 0 10px 10px 0;" @click="dialog = false">關閉</v-btn>
          <v-btn color="primary" style="margin-bottom: 10px;" @click="addMediaFile">新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Sortable from 'sortablejs'
  import ValidateUtil from "@/assets/services/validateUtil";
  import MessageService from '@/assets/services/message.service'
  import { fetchProgram, initProgram } from '@/api/program'
  import { listMediaFile } from '@/api/media'
  import { getFileExtension } from '@/utils/validate'
  import enums from '@/utils/enums'
  import isEmpty from 'lodash/isEmpty'
  import NotFound from './NotFound.vue'

  const defaultForm = {
    programId: null,
    programName: null,
    memo: null,
    programType: null,
    releaseStartDate: null,
    releaseEndDate: null,
  }
  const defaultFile = { //sign AttachmentFile
    originalFileName: null,
    imgSrc: null,
    base64: null,
  }

  const defaultQueryForm = {
    materialName: null, 
    createDateStart: null, 
    createDateEnd: null, 
    createAuthor: null,
    status: null //暫無使用
  }

  const defaultQueryProgramForm = {
    programId: null, 
  }

  export default {
    directives: {
      sortableDataTable: {
        bind (el, binding, vnode) {
          const options = {
            animation: 150,
            onUpdate: function (event) {
              vnode.child.$emit('sorted', event)
            }
          }
          Sortable.create(el.getElementsByTagName('tbody')[0], options)
        }
      }
    },
    components: { NotFound },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        nowDate: new Date().toISOString().slice(0,10),
        errormages: {
          dateCheck: null,
        },
        isShow: false,
        isShowSelected: false,
        isNotFound: false,
        valid: false,
        dialog: false,
        isDraft: false,
        maxCharacter: 150,

        //素材日曆
        createDateStartMenu: false,
        //節目上架日曆
        releaseStartDateMenu: false,
        releaseStartDate: '',
        releaseEndDateMenu: false,
        releaseEndDate: '',
        //素材類型下拉
        materialTypeOption: enums.materialFileTypeOption,
        //素材資料清單
        mediaFiles:[],

        //api post data
        postForm: Object.assign({}, defaultForm),
        postQueryForm: Object.assign({},defaultQueryForm),
        postQueryProgramForm : Object.assign({} , defaultQueryProgramForm),
        //審核附件
        attachmentFile: null,
        attachmentList: [],
        dataURL: null,
        signAttachmentFileId: null,
        signAttachmentFile: null,
        
        selectedFiles:[],
        programMaterials:[], //set defaultProgramItem
        //素材資料
        headerMaterial: [
          { text: '素材名稱', value: 'materialName', width: '24%', },
          { text: '上傳人員名稱', value: 'createAuthor', width: '10%', },
          { text: '上傳時間', value: 'createDate', align: 'center' },
          { text: '縮圖', value: 'dataUrl', },
          { text: '關聯使用資訊', value: 'relatedInfos', align: 'center' },
          { text: '使用中', value: 'active', sortable: false, align: 'center', },
          { text: '狀態操作', value: 'action', sortable: false, align: 'center' },
        ],
        headerSelectedFiles: [
          { text: '素材名稱', value: 'materialName', },
          { text: '縮圖', value: 'dataUrl', },
          { text: '播放順序', value: 'sort', sortable: false, align: 'center', },
          { text: '', value: 'delete', align: 'right', width: '2%',},
          
        ],
        dense: false,
        noGutters: false,
        hideDatails: false,
        snackbar: false,
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v && v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },
      }
    },
    computed: {
      getMinimumEndDate() {
        let tmpDate
        if(isEmpty(this.postForm.releaseStartDate)){
          tmpDate = new Date(this.nowDate)
          tmpDate.setDate(tmpDate.getDate() + 1)
        } else {
          tmpDate = new Date(this.postForm.releaseStartDate)
          tmpDate.setDate(tmpDate.getDate() + 1)
        }
        return tmpDate.toISOString().slice(0,10)
      },
      getMinimumStartDate() {
        let tmpDate
        if(isEmpty(this.postForm.releaseEndDate)){
          tmpDate = new Date(this.nowDate)
        } else {
          tmpDate = new Date()
          tmpDate.setDate(tmpDate.getDate() + 1)
        }
        return tmpDate.toISOString().slice(0,10)
      },
      getMaximumStartDate() {
        let tmpDate
        let returnStr = ''
        if(!isEmpty(this.postForm.releaseEndDate)){
          tmpDate = new Date(this.postForm.releaseEndDate)
          tmpDate.setDate(tmpDate.getDate() - 1)
          returnStr = tmpDate.toISOString().slice(0,10)
        }
        return returnStr
      },
    },
    mounted() {
      this.init()
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.postQueryProgramForm.programId = id 
        this.fetchProgram(this.postQueryProgramForm)
      }
    },
    methods: {
      //Init 
      init() {
        this.reader = new FileReader();
        this.reader.onload = () => {
          // preview data url
          this.dataURL = this.reader.result
          
          // assign file 
          this.signAttachmentFile = Object.assign({} , defaultFile)
          this.signAttachmentFile.id = this.signAttachmentFileId 
          this.signAttachmentFile.category = "MEDIA_ATTACHMENT"
          this.signAttachmentFile.fileName = this.attachmentFile.name.substr(0,this.attachmentFile.name.lastIndexOf("."))
          this.signAttachmentFile.originalFileName = this.attachmentFile.name
          this.signAttachmentFile.fileExt = getFileExtension(this.attachmentFile.name)
          this.signAttachmentFile.fileSize = this.attachmentFile.size
          this.signAttachmentFile.base64 = this.dataURL.split(",")[1]
        }
      },
      checkDate() {
        let hasCheck = true;
        // 1-1 輪播起迄日都有選擇
        if (!isEmpty(this.postForm.releaseStartDate) && !isEmpty(this.postForm.releaseEndDate)) {
          console.log('start date' , this.postForm.releaseStartDate)
          console.log('end date' ,this.postForm.releaseEndDate)
          if (!ValidateUtil.validateDateRange(this.postForm.releaseStartDate, this.postForm.releaseEndDate)) {
            this.errormages.dateCheck= "上架日期選擇範圍錯誤，起始日期不得大於結束日期";
            hasCheck = false;
            this.valid = false;
          } else {
            this.errormages.dateCheck = null;
          }
        } else if(!isEmpty(this.postForm.releaseEndDate)) {
          console.log(this.postForm)
          if (!ValidateUtil.validateDateRange(this.postForm.releaseEndDate , this.postForm.releaseStartDate)) {
            this.errormages.dateCheck= "上架日期選擇範圍錯誤，結束日期不得大於起始日期";
            hasCheck = false;
            this.valid = false;
          } else {
            this.errormages.dateCheck = null;
          }
        }
        return hasCheck;
      },
      //附件上傳
      onUpload() {
        this.dataURL = null
        this.signAttachmentFile = null
        if (this.attachmentFile instanceof Blob){
          this.reader.readAsDataURL(this.attachmentFile)    
        }else{
          this.signAttachmentFile = this.attachmentFile
          this.dataURL = null
        }
      },
      
      // Button Function 開啟選取畫面
      showSelectPannel() {
        //將查詢結果與選取結果整理
        this.mediaFiles.forEach(item => item.selected = this.selectedFiles.some(selected => selected.id == item.id) ? true : false );
        this.dialog = true
      },
      // 排序欄位內刪除
      deleteItem(item) {
        this.editedIndex = this.selectedFiles.indexOf(item)
        this.selectedFiles.splice(this.editedIndex, 1)
      },
      // Button Function 添加已選擇素材
      addMediaFile() {
        this.dialog = false 
        this.isShowSelected = true
        
        for (const item of this.mediaFiles) {
          if (item.selected && !this.selectedFiles.some(selected => selected.id == item.id)) {
            this.selectedFiles.push(item)
          } else if (!item.selected && this.selectedFiles.some(selected => selected.id == item.id)) {
            const index = this.selectedFiles.indexOf(item)
            this.selectedFiles.splice(index,1)
          }
        }
      },

      //素材排序
      saveOrder (event) {
        const movedItem = this.selectedFiles.splice(event.oldIndex, 1)[0];
        this.selectedFiles.splice(event.newIndex, 0, movedItem);
        
        // for (let step = 0; step < this.selectedFiles.length; step++) {
        //   // 執行五次：從step為0到4
        //   this.selectedFiles[step].sort = step + 1;
        //   // this.itemsCRUD[step].id = step
        // }
      },

      // Button Function 查詢素材
      submitSearch() {
        //API post data 
        this.fetchMediaFileList(this.postQueryForm)
      },

      // Button Function 送出節目單製作儲存
      submit(isSign) {
      if (this.$refs.programForm.validate()) {
          
          if(isEmpty(this.selectedFiles)) {
            let formatArray = []
            let requiredArray = ['素材資料']

            MessageService.showCheckInfo(requiredArray,formatArray);
            this.valid = false
            return;
          } else {
            //塞入素材資訊
            this.postForm.programMaterials = this.selectedFiles.reduce((items, mediaFile) => {
              // new {materialId , mediaFileName}
              items.push(Object.assign({
                materialId : mediaFile.id , 
                mediaFileName : mediaFile.materialName}
              ))
              return items
            }, [])
          }
          
          //API post data 
          let postData = {
            program : this.postForm ,
            signAttachment : isEmpty(this.signAttachmentFile) ? null : this.signAttachmentFile,
            sign : isSign ? true : false, //是否暫存
          }
        
          console.log(postData)
          this.submitForm(postData)

        }else{
          this.$nextTick(() => {
            const el = this.$el.querySelector(".error--text:first-of-type");
            this.$vuetify.goTo(el);
            return;
          });
        }

        this.isDraft = !this.isDraft
      },
      reset() {
        this.$refs.programForm.reset()
        this.selectedFiles = Object.assign([])
        this.mediaFiles = Object.assign([])
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
      
      //Action: 節目單建立/暫存
      async submitForm(postData) {
        const data = await initProgram(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'儲存節目單資料')
            return;
        }

        MessageService.showSuccess('新增節目單資料')
        this.reset() //重置表單
      },
      //Action:編輯素材查詢
      async fetchProgram(postData) {

        this.isNotFound = true
        
        const data = await fetchProgram(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢編輯素材資料');
            return;
        }
        // 驗證是否有資料
        if(this.hasResult(data.restData.programs)){
          
          this.isNotFound = false

          let tmpData = data.restData.programs[0] //僅會有一筆
          Object.keys(this.postForm).filter(key => key in tmpData).forEach(key => this.postForm[key] = tmpData[key])
          
          //處理已選擇素材資訊轉換
          this.selectedFiles = tmpData.programMaterials.reduce((items, mediaFile) => {
            // new {materialId , mediaFileName}
            items.push(Object.assign(mediaFile))
            return items
          }, [])
          //塞入假檔案for 畫面呈現
          let tmpfile = data.restData.signAttachment.originalFileName
          this.attachmentFile = new File(["tmp"], tmpfile , {type:"text/plain", lastModified: new Date().getTime()});
          
          this.signAttachmentFile = data.restData.signAttachment
          this.signAttachmentFileId = data.restData.signAttachment.id
          console.log(this.signAttachmentFile)
          
          this.isShowSelected = true
        }
      },
      //Action:素材查詢
      async fetchMediaFileList(fetchMediaFilePostData) {
        this.isShow = false

        const data = await listMediaFile(fetchMediaFilePostData)
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

          //處理已選擇素材資訊轉換
          if(!isEmpty(this.selectedFiles)) {
            tmpData.forEach(item => {
              ////已選擇一一比對回傳之資料
              item.selected = this.selectedFiles.some(selected => selected.id == item.id) ? true : false
            });
          }
          this.mediaFiles = tmpData
          this.isShow = true
        }
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

  #resourceList {
    border: 1px solid #c1c1c1;
    height: 98%;
    border-radius: 10px;
    overflow: hidden;
    width: 87%;
  }

  .resourceList {
    display: flex;
    flex-wrap: wrap;
  }

  .resourceList li {
    width: 150px;
    height: 150px;
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

</style>