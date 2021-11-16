<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">待歸檔</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ numOfArchieve }}</span>件</div>
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
              v-model="acceptNum"
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
              v-model="electricNum"
              type="number"                      
              outlined
              hide-details
              dense
              placeholder="請輸入電號"
            />
          </v-col>     
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            整理號碼     
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="archieveNum"
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
                  @click="queryArchieveList()"
                >
                  <v-icon v-text="'mdi-magnify'" />
                </v-btn>
              </template>
              <span>查詢</span>
            </v-tooltip>
          </v-col>
        </v-row> 
        <span class="annotation">※提醒&nbsp; 08:00 – 13:00 內送件，4小時內可以執行「退回核算」; 13:00 之後送件，17:00 前可以執行「退回核算」</span>
        <hr>
      </div>
      <div class="ml-10">    
        <v-data-table
          :headers="headers"
          :items="archieveList"
          :page.sync="dataListPage"
          :items-per-page="10"
          hide-default-footer
          no-data-text="查無資料"
          class="elevation-1"
          disable-sort
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
                  @click="returnToAccounting(item)"
                >
                  <v-icon>mdi-account-arrow-left-outline</v-icon>
                </v-btn>
              </template>
              <span>退回核算</span>
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
      </div>
    </v-container>
    <!-- 退回核算確認視窗 -->
    <v-dialog
      v-model="returnModel"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          退回核算
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="returnModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-18px">
          <v-row class="mt-10">
            此操作將把案件由待歸檔區退回待核算區，若要進行退回請按 [確認] ，若維持原狀請按 [取消]
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="error"            
            @click="returnModel = false"
          >
            取消
          </v-btn>
          <v-btn              
            color="success"            
            @click="returnForm()"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./myWaitingArchievePage.js" />