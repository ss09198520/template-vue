<template>
  <v-app>
    <v-container>

      <h2 class="font-bold mb-5">調閱簽核清單</h2>
      <!-- <v-row class="ml-2">
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
      </v-row> -->
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
                申請調閱日期:
              </v-col>
              <v-col>
                {{ selectedSign.readDateStr }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱編號:
              </v-col>
              <v-col>
                {{ selectedSign.readNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱部門:
              </v-col>
              <v-col>
                {{ selectedSign.readDept }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                申請調閱人員:
              </v-col>
              <v-col>
                {{ selectedSign.applier }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                受理號碼:
              </v-col>
              <v-col>
                {{ selectedSign.acceptNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                電號:
              </v-col>
              <v-col>
                {{ selectedSign.electricNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                調閱事由:
              </v-col>
              <v-col>
                {{ selectedSign.readReason }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"              
              @click="returnOrder()"
            >
              &emsp;退件&emsp;
            </v-btn>
            <v-btn
              color="success"              
              @click="checkOrder()"
            >
              &emsp;簽核&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 退件原因 -->
      <v-dialog
        v-model="returnReasonModel"
        max-width="600"
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
              @click="returnReasonModel = false"
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
            <v-row class="ml-1">
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
                  counter="50"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="normal"            
              @click="returnReasonModel = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn              
              color="error"            
              @click="returnSubmit()"
            >
              確認退件
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script src="./readSignOffPage.js"></script>