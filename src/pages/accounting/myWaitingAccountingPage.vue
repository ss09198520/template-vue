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
      <hr>
      <v-row>
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
              <v-btn v-if="item.action" color="success" @click="accounting(item)">進行核算</v-btn>
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
            @click="browserModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormPage :restrict-mode="'audit'" />
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="error"            
            @click="retrunOrder()"
          >
            &emsp;退件&emsp;
          </v-btn>
          <v-btn              
            color="success"            
            @click="checkSubmit()"
          >
            核算通過
          </v-btn>
        </v-card-actions>
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
              退件原因
            </v-col>
            <v-col cols="7">
              <v-text-field
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
  </v-app>
</template>

<script src="./myWaitingAccountingPage.js" />

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