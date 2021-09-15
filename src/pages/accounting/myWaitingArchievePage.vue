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
      <div style="margin-bottom: 10px;">
        <v-btn :class="showAllArchieve? 'primary' : ''" @click="showArchieve('all')">顯示全部</v-btn>
        <v-btn :class="showMyArchieve? 'primary' : ''" style="margin-left: 10px;" @click="showArchieve('my')">只顯示我的待歸檔</v-btn>
      </div>
      <hr>
      <v-row>
        <v-col cols="12">    
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
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./myWaitingArchievePage.js" />

<style scoped>
    .block {
        height: 250px;
        padding: 18px;
        position: relative;
    }

    .block .block-content {
        font-size: 24px;
        font-weight: 700;
        height: 100px;
        white-space: pre-wrap;
    }

    .block .block-title {
        font-size: 36px;
        font-weight: bold;
    }

    .block .block-number {
        font-weight: bold;
        font-size: 96px;
        margin-right: 20px;
    }
</style>