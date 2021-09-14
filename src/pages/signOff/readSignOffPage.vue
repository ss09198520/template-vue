<template>
  <v-app>
    <v-container>

      <h2 class="font-bold mb-5">調閱簽核清單</h2>
      <v-row class="ml-2">
        <v-btn class="ma-3" :class="{'primary': displayAll}" @click="displayAll = true">
          顯示全部
        </v-btn>
        <v-btn class="ma-3" :class="{'primary': !displayAll}" @click="displayAll = false">
          只顯示待簽核
        </v-btn>        
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
                <v-btn
                  color="success"
                  @click="sign()"
                >
                  &emsp;簽核&emsp;
                </v-btn>                 
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
            審核調閱資訊
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
                調閱日期:
              </v-col>
              <v-col>
                20210915 10:00
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱編號:
              </v-col>
              <v-col>
                07-110-000001
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱單位:
              </v-col>
              <v-col>
                南屯服務所
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                申請調閱人員:
              </v-col>
              <v-col>
                王大明
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                受理號碼:
              </v-col>
              <v-col>
                A00024
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                電號:
              </v-col>
              <v-col>
                7140000123
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱事由:
              </v-col>
              <v-col>
                客戶來要求查詢當時申請項目
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                備註:
              </v-col>
              <v-col>
                客戶已來抱怨兩次
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"              
              @click="popOut = false"
            >
              &emsp;退件&emsp;
            </v-btn>
            <v-btn
              color="success"              
              @click="popOut = false"
            >
              &emsp;簽核&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>      
    </v-container>
  </v-app>
</template>

<script src="./readSignOffPage.js"></script>