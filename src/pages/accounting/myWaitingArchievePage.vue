<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">待歸檔</div>
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
      </div>
      <div v-if="hasShowList" class="ml-10">    
        <v-data-table
          :headers="headers"
          :items="itemList"
          :page.sync="dataListPage"
          :items-per-page="10"
          hide-default-footer
          no-data-text="查無資料"
          class="elevation-1"
          disable-sort
          @page-count="dataListPageCount = $event"
        />
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
  </v-app>
</template>

<script src="./myWaitingArchievePage.js" />