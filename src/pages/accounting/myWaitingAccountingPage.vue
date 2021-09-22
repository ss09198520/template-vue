<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">待核算</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ waitingCount }}</span>件</div>
          </div>
        </div>
      </div>
      <div class="mt-10 ml-10 font-18px font-bold">
        <v-row align="center">
          <v-col cols="1">
            受理號碼       
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              outlined
              hide-details                                         
              dense
              placeholder="請輸入受理號碼"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            電號
          </v-col>                                             
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入電號"
            />
          </v-col>     
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            計算日       
          </v-col>          
          <v-col
            cols="3"
          >
            <v-select
              v-model="calDate"
              :items="calDateOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              :clearable="true"
              class="my-auto"
              color="#ADADAD"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            整理號碼
          </v-col>                                             
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入整理號碼"
            />
          </v-col>     
        </v-row>
        <v-row>
          <v-col cols="11" />
          <v-col>
            <!-- <v-btn class="primary mt-5" @click="displayList = true">&emsp;查詢&emsp;</v-btn>     -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  small
                  color="primary"
                  v-on="on"
                  @click="hasShowList = true"
                >
                  <v-icon v-text="'mdi-magnify'" />
                </v-btn>
              </template>
              <span>查詢</span>
            </v-tooltip>
          </v-col>
        </v-row>  
        <hr class="mt-10 mb-10">
        <v-row v-if="hasShowList" class="mt-10">
          <v-col cols="12">    
            <v-data-table
              :headers="headers"
              :items="itemList"
              :page.sync="dataListPage"
              :items-per-page="10"
              disable-sort
              class="elevation-1"
              no-data-text="查無資料"
              hide-default-footer
              @page-count="dataListPageCount = $event"
            >
              <template v-slot:item.action="{ item }">              
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="item.action"                    
                      class="ma-2 success"
                      fab
                      small                
                      v-on="on"
                      @click="accounting(item)"
                    >
                      <v-icon>mdi-account-check-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>進行核算</span>
                </v-tooltip>
              </template>
              <template v-slot:item.hasView="{ item }">              
                <v-checkbox 
                  v-model="item.hasView" 
                  hide-details
                  class="shrink mt-0 ml-5"
                  style="margin-top: 0;" 
                  disabled
                />
              </template>
              <template v-slot:item.comments="{ item }">              
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2 primary"
                      fab
                      small                
                      v-on="on"
                      @click="openComments(item)"
                    >
                      <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>檢視備註</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <!-- 選頁 -->
            <div class="mt-2">
              <v-pagination
                v-model="dataListPage"
                color="#2F59C4"
                :length="dataListPageCount"
              />
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-dialog
      v-model="accountingDialog"
      max-width="1200px"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          瀏覽案件
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="accountingDialog = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormPage :restrict-mode="'audit'" @returnOrder="returnOrder()" @checkSubmit="checkSubmit()" @saveComments="saveComments()" />
        </v-card-text>
      </v-card>
    </v-dialog>

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
              退件部門
            </v-col>
            <v-col cols="7">
              <v-select   
                v-model="department"
                :items="departmentOption"
                item-text="text"
                :return-object="true"            
                color="#ADADAD"
                outlined
                hide-details
                dense
                placeholder="請選擇退件部門"
              />
            </v-col>
          </v-row>
          <v-row class="mt-6 ml-1" align="center">
            <v-col cols="3">
              退件原因
            </v-col>
            <v-col cols="7">
              <v-select   
                v-model="reason"
                :items="reasonOption"
                item-text="text"
                :return-object="true"
                outlined
                hide-details
                dense
                placeholder="請選擇退件原因"
              />
            </v-col>
          </v-row>
          <v-row class="ml-1" align="center">
            <v-col cols="3">
              退件說明
            </v-col>
            <v-col cols="7">
              <v-textarea            
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
    <!-- 備註視窗 -->
    <v-dialog
      v-model="commentsModel"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          備註
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="commentsModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-18px">
          <v-row class="mt-10">
            測試備註
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="primary"            
            @click="commentsModel = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./myWaitingAccountingPage.js" />
