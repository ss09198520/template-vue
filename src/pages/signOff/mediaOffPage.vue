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
        <v-tooltip top>
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
        </v-tooltip>        
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
            <template v-slot:item.mani="{ item }">
              <div v-if="item.mani==true">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="success"
                      @click="sign()"
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

          <v-card-text>
            <v-row class="mt-3">
              <v-col cols="3">
                上架日期:
              </v-col>
              <v-col>
                2021-09-15
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col cols="3">
                下架日期:
              </v-col>
              <v-col>
                2021-10-15
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                跑馬燈標題 :
              </v-col>
              <v-col>
                秋季節約用電宣導
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                跑馬燈描述 :
              </v-col>
              <v-col>
                宣導入秋使用節約電力方式
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                單位 :
              </v-col>
              <v-col>
                台中
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                上架人員 :
              </v-col>
              <v-col>
                王大明
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                送審日期 :
              </v-col>
              <v-col>
                2021-09-15 13:44
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="3"
              >
                退件原因
              </v-col>
              <v-col
                cols="9"
                md="8"
              >
                <v-textarea
                  color="accent"
                  outlined
                  placeholder="請輸入文字"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"              
              @click="popOut = false"
            >
              附件預覽
            </v-btn>
            <v-btn
              color="primary"              
              @click="popOut = false"
            >
              預 覽
            </v-btn>
            <v-btn
              color="error"              
              @click="showMessage('退件成功')"
            >
              退 件
            </v-btn>
            <v-btn
              color="success"              
              @click="showMessage('核准成功')"
            >
              核 准
            </v-btn>
          </v-card-actions>
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

export default {
    data(){
        return{
            //預設當前頁數
            inquireListPage: 1,
            //預設總頁數
            inquireListPageCount: 0,
            //彈出簽核視窗與否
            popOut: false,
            //預設簽核顯示範圍按鈕
            displayAll: true,
            snackbar: false,
            alert: false,
            //
            signListHeaders: [
                  { text: '簽核狀態', value: 'inquireStatus', align: 'center' },
                  // { text: '多媒體編號', value: 'orderId', align: 'center' },
                  { text: '內 容 名 稱', value: 'orderItems', align: 'center' },                
                  { text: '類型', value: 'category', align: 'center' },
                  { text: '申請人員', value: 'inquireName', align: 'center' },
                  { text: '申請人員單位', value: 'inquireUnit', align: 'center' },            
                  { text: '送審日期', value: 'inquireDate', align: 'center' },
                  { text: '狀態操作', value: 'mani', align: 'center' },
              ],
              signList:[
                  { mani: true, inquireStatus: '申請人主管已簽核', orderId: 'M00024', electNum:'7140000123', inquireUnit:'台中區處', inquireName:'王大明', inquireDate:'2021-09-15 10:00',orderType:'APR0370',orderItems:'夏季輪播跑馬燈', category:'跑馬燈'},
                  { mani: true, inquireStatus: '未簽核', orderId: 'P00615', electNum:'7140000456', inquireUnit:'台中區處', inquireName:'李小凡', inquireDate:'2021-09-15 11:21',orderType:'APR0200',orderItems:'夏季宣導文宣影片', category:'節目單'},
                  { mani: true, inquireStatus: '未簽核', orderId: 'P00040', electNum:'7140000789', inquireUnit:'台中區處', inquireName:'葉星辰', inquireDate:'2021-09-15 15:36',orderType:'APR0200',orderItems:'秋季季宣導文宣', category:'節目單'},
                  { mani: true, inquireStatus: '申請人主管已簽核', orderId: 'S00605', electNum:'7140000888', inquireUnit:'台中區處', inquireName:'趙元智', inquireDate:'2021-09-15 09:45',orderType:'APR0160',orderItems:'客戶觀感調查', category:'滿意度調查'},
                  { mani: false, inquireStatus: '簽核完畢', orderId: 'P00619', electNum:'7140000999', inquireUnit:'台中區處', inquireName:'陳立元', inquireDate:'2021-09-15 13:44',orderType:'APR0200',orderItems:'櫃台體驗滿意調查', category:'滿意度調查'},
              ],
        }
    },
    methods:{
        sign(){
            this.popOut = true;
        },
        showMessage(msg) {
          MessageService.showSuccess(msg + "✓")
          this.popOut = false
        },
        
    },
}
</script>