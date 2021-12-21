<template>
  <v-app>
    <v-container>

      <h2 class="font-bold mb-5">多媒體簽核清單</h2>
      <v-row class="ml-2">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              fab
              small
              :class="{'primary': displayAll}"
              @click="displayAll = true"
              v-on="on"
            >
              <v-icon v-text="'mdi-text-box-multiple-outline'" />
            </v-btn>
          </template>
          <span>顯示全部</span>
        </v-tooltip>
        <!-- <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              fab
              small
              :class="{'primary': !displayAll}"
              @click="displayAll = false"
              v-on="on"
            >
              <v-icon v-text="'mdi-text-box-search-outline'" />
            </v-btn>
          </template>
          <span>只顯示待簽核</span>
        </v-tooltip>         -->
      </v-row>
      <hr class="mt-6 mb-5 ml-4 mr-5">
      <v-row class="ma-2">
        <v-col>
          <v-data-table
            :headers="signListHeaders"
            :items="signList"
            :items-per-page="10"
            no-data-text="查無資料"              
            disable-sort
            hide-default-footer
            class="elevation-1"
            :page.sync="inquireListPage"
            @page-count="inquireListPageCount = $event"
          >
            <template v-slot:[`item.mediaSignType`]="{ item }">
              {{ mediaSignTypeOption.find(state => { return item.mediaSignType===state.value }).text }}
            </template>
            <template v-slot:[`item.mani`]="{ item }">   
              <div>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="success"
                      @click="sign(item)"
                      v-on="on"
                    >
                      <v-icon v-text="'mdi-account-check-outline'" />
                    </v-btn>
                  </template>
                  <span>簽核</span>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!-- 選頁 -->
      <div class="mt-2">
        <v-pagination
          v-model="inquireListPage"
          color="#2F59C4"
          :length="inquireListPageCount"
        />
      </div>
      <v-dialog
        v-model="popOut"
        width="600"
      >        
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636;color:white;">
            審核資訊
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="popOut = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text v-if="selectedSign">
            <v-row class="mt-3">
              <v-col cols="3">
                上架日期:
              </v-col>
              <v-col>
                {{ selectedSign.detailData.releaseStartDate }}
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col cols="3">
                下架日期:
              </v-col>
              <v-col>
                {{ selectedSign.detailData.releaseEndDate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                {{ mediaSignTypeOption.find(state => { return selectedSign.mediaSignType===state.value }).text }}標題 :
              </v-col>
              <v-col>
                {{ selectedSign.mediaSignName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                {{ mediaSignTypeOption.find(state => { return selectedSign.mediaSignType===state.value }).text }}描述 :
              </v-col>
              <v-col>
                {{ selectedSign.detailData.memo }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                單位 :
              </v-col>
              <v-col>
                {{ selectedSign.detailData.region }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                上架人員 :
              </v-col>
              <v-col>
                {{ selectedSign.detailData.createAuthor }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                送審日期 :
              </v-col>
              <v-col>
                {{ selectedSign.createDate }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"              
              @click="downloadAttachment"
            >
              附件下載
            </v-btn>
            <v-btn
              color="primary"              
              @click="previewItem"
            >
              預 覽
            </v-btn>
            <v-btn
              color="error"              
              @click="rejectReasonModel = true"
            >
              退 件
            </v-btn>
            <v-btn
              color="success"              
              @click="signSubmit(true)"
            >
              核 准
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 退件原因 -->
      <v-dialog
        v-model="rejectReasonModel"
        width="900"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            請填寫退件原因
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="rejectReasonModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="font-18px">
            <v-row class="mt-6 ml-1" align="center">
              <v-col cols="3">
                退件原因
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="rejectReason"
                  outlined
                  hide-details                                         
                  dense
                  placeholder="請輸入退件原因"
                />
              </v-col>
            </v-row>
            <v-row class="ml-1" align="center">
              <v-col cols="3">
                退件說明
              </v-col>
              <v-col cols="7">
                <v-textarea
                  v-model="rejectDesc"
                  color="#ADADAD"
                  outlined
                  name="input-7-4"
                  :no-resize="true"
                  placeholder="請輸入退件說明"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="normal"            
              @click="rejectReasonModel = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn              
              color="error"            
              @click="signSubmit(false)"
            >
              確認退件
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="preViewProgramModel" max-width="100%">
        <v-card>
          <v-carousel hide-delimiters>
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" reverse-transition="fade-transition" transition="fade-transition">
              <v-img
                v-if="!!item.dataUrl && isImage(item.originalFileName)"
                :src="item.dataUrl"
                max-width="100%"
                max-height="100%"
              />
              <video 
                v-if="!!item.dataUrl && isVideo(item.originalFileName)"
                width="100%" 
                height="100%"
              >
                <source
                  :src="item.dataUrl"
                  type="video/mp4"
                >
                Sorry, your browser doesn't support embedded videos.
              </video>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-dialog>

      <v-dialog v-model="preViewMarqueeModel" max-width="1280">
        <v-card>
          <v-card-title
            style="background-color: #003D79; color: white"
          >
            跑馬燈預覽
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="preViewMarqueeModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="font-24px">
            <v-row class="mt-6 ml-1 font-bold">
              跑馬燈名稱: {{ selectedMarquee.marqueeName }}
              <marquee-text
                :duration="selectedMarquee.animationDuration"
                :repeat="1"
                class="marquee"
              >
                {{ selectedMarquee.marqueeContentHTML }}
              </marquee-text>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- <v-snackbar
        v-model="snackbar"
        top
        right
        color="green"
      >
        <v-icon
          color="white"
          class="mr-3"
        >
          mdi-bell-plus
        </v-icon>
        <div>{{ alertMsg }}</div>
        <v-icon
          size="16"
          @click="snackbar = false"
        >
          mdi-close-circle
        </v-icon>
      </v-snackbar> -->
    </v-container>
  </v-app>
</template>

<script>
import MessageService from "@/assets/services/message.service";
import enums from '@/utils/enums'
import isEmpty from 'lodash/isEmpty'
import { queryMediaSignOff , mediaSignOff , downloadMediaSignOffFile} from '@/api/media'
import { fetchProgram } from '@/api/program'
import {  fetchListMarquee } from "@/api/marquee";

const defaultQueryForm = {}

const defaultMediaSignOffForm = {
  signOffNo : null,
  mediaSignId : null,
  mediaSignType : null,
  pass: null,
  rejectReason: null,
  rejectDesc: null,
}

const defaultQueryProgramForm = {
  programId: null, 
}

export default {
    
    data() {
        return{
            //api post data
            postQueryForm: {},
            postMediaSignOffForm: {},
            postQueryProgramForm : Object.assign({} , defaultQueryProgramForm),

            //預設當前頁數
            inquireListPage: 1,
            //預設總頁數
            inquireListPageCount: 0,
            //彈出簽核視窗與否
            popOut: false,
            //預設簽核顯示範圍按鈕
            displayAll: true,
            //退件原因說明視窗
            rejectReasonModel: false,
            rejectReason: '',
            rejectDesc: '',

            //節目單預覽彈出視窗
            preViewProgramModel: false,
            preViewMarqueeModel: false,

            //類型對照
            mediaSignTypeOption: enums.mediaSignTypeOption,

            //預覽用
            carouselItems: [],
            selectedMarquee: {},
            snackbar: false,
            alert: false,
            //
            signListHeaders: [
                  // { text: '多媒體編號', value: 'orderId', align: 'center' },
                  { text: '內 容 名 稱', value: 'mediaSignName', align: 'center' },                
                  { text: '類型', value: 'mediaSignType', align: 'center' },
                  { text: '申請人員', value: 'createAuthor', align: 'center' },
                  { text: '申請人員單位', value: 'region', align: 'center' },            
                  { text: '申請送審日期', value: 'createDate', align: 'center' },
                  { text: '狀態操作', value: 'mani', align: 'center' },
              ],
            signList: [],
            selectedSign: null, //選擇要操作的該筆調閱簽核
            
        }
    },
    mounted() {
        this.init();
    },
    methods:{
      init() {
        //api post data
        this.postQueryForm = Object.assign({},defaultQueryForm)
        this.postMediaSignOffForm = Object.assign({},defaultMediaSignOffForm)
        //
        this.querySignOffList();
      },
      reset() {
        this.rejectReason = ''
        this.rejectDesc = ''
        this.popOut = false
        this.rejectReasonModel = false
        this.selectedSign = null
      },
      sign(item){
        this.selectedSign = item;
        // this.querySignDetail();
        this.popOut = true;
      },
      previewItem() {
        if(this.selectedSign.mediaSignType=='MEDIA_MARQUEE'){
          this.postQueryProgramForm.programId = this.selectedSign.id
          this.fetchMarquee({ marqueeId: this.selectedSign.id })
        }
        if(this.selectedSign.mediaSignType=='MEDIA_PROGRAM'){
          this.postQueryProgramForm.programId = this.selectedSign.id
          this.fetchProgram(this.postQueryProgramForm)
        }
        if(this.selectedSign.mediaSignType=='MEDIA_QUESTIONNAIRE'){
          let config = 'top=0,left=0,statusbar=no,scrollbars=yes,status=no,location=no';
          this.formSignPage = window.open(`/tpes/#/media/preview/questionnaire/${this.selectedSign.id}`, "_blank", config);
        }
      },
      isImage(filename) {
        return (/\.(jpg|jpeg|tiff|png)$/i).test(filename)
      },
      isVideo(filename) {
        return (/\.(mp4)$/i).test(filename)
      },
      downloadAttachment() {
        this.downloadMediaSignOffFile(this.selectedSign)
      },
      signSubmit(pass){
        // 驗證
        if (!pass && isEmpty(this.rejectReason)) {
            MessageService.showCheckInfo(['退件原因'],'');
            return;
        }
        this.mediaSignOff(pass)
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

      //Action:簽核查詢
      async querySignOffList() {
        this.isShow = false
        
        const data = await queryMediaSignOff(this.postQueryForm)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢簽核清單資料');
            return;
        }
        //查詢前清空資料
        this.signList = Object.assign([])
        // 驗證是否有資料
        if(this.hasResult(data.restData.signList)){
          let tmpData = data.restData.signList

          this.signList = tmpData
          this.isShow = true
        }
      },

      //Action: 送出簽核
      async mediaSignOff(pass) {

        let postMediaSignOffData = Object.assign({} , this.defaultMediaSignOffForm)
        
        postMediaSignOffData.pass = pass
        postMediaSignOffData.signOffNo = this.selectedSign.signOffNo
        postMediaSignOffData.mediaSignId = this.selectedSign.id
        postMediaSignOffData.mediaSignType = this.selectedSign.mediaSignType
        postMediaSignOffData.rejectReason = pass ? null : this.rejectReason
        postMediaSignOffData.rejectDesc = pass ? null : this.rejectDesc
        
        const data = await mediaSignOff(postMediaSignOffData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'簽核')
          return
        }

        if(data.restData.success){
          MessageService.showSuccess(pass ? '簽核成功' : '已退件成功')
          // 重整頁面
          this.reset()
          this.init()
        }else{
          MessageService.showError(data.restData.message, pass ? '簽核':'退件')
        }
      },

      //Action: 送出簽核
      async downloadMediaSignOffFile(item) {

        let postData = {
          relatedSeq : item.id,
          mediaSignType : item.mediaSignType
        }
        
        const data = await downloadMediaSignOffFile(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'下載附件')
          return
        }
        if(data.restData.success){
          MessageService.showSuccess('下載附件成功')
        }else{
          MessageService.showError('下載附件')
        }
      },

      //Action:預覽節目單查詢
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
          
          let tmpData = data.restData.programs[0] //僅會有一筆
          this.carouselItems = tmpData.programMaterials
          //開啟預覽視窗
          this.preViewProgramModel = true
        }
      },
      //Action:預覽跑馬燈查詢
      async fetchMarquee(postData) {

        const data = await fetchListMarquee(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
          MessageService.showError(data.restData.message,'查詢編輯素材資料');
            return;
        }
        // 驗證是否有資料
        if(this.hasResult(data.restData.marquee[0])){
          
          let tmpData = data.restData.marquee[0] //僅會有一筆
          this.selectedMarquee = tmpData
          //開啟預覽視窗
          this.preViewMarqueeModel = true
        }
      },

    },
}
</script>