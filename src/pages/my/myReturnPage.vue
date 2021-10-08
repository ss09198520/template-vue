<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">案件退件</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ numberOfReject }}</span>件</div>
          </div>
        </div>
      </div>
      <span class="annotation">案件退件區同課皆可看到，請選擇相關操作即可</span>
      <hr class="mb-3">
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="caseHeaders"
            :items="caseList"
            :page.sync="caseListPage"
            :items-per-page="5"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            @page-count="caseListPageCount = $event"
          >
            <template v-slot:item.acceptNum="{ item }"> 
              <v-tooltip top>
                <template v-slot:activator="{ on }">        
                  <a href="javascript:void(0)" style="text-decoration:underline;" @click="openFormHistory(item)" v-on="on">{{ item.acceptNum }}</a>
                </template>
                <span>表單歷程</span>
              </v-tooltip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <!-- <v-tooltip v-if="item.remain" top> -->
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    @click="action('supplement',item)"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-file-document-edit-outline'" />
                  </v-btn>
                </template>
                <span>補件操作</span>
              </v-tooltip>
              <v-tooltip top>
                <!-- <v-tooltip v-if="item.view" top> -->
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    @click="browerOrder()"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-eye'" />
                  </v-btn>
                </template>
                <span>瀏覽案件</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="caseListPage"
              color="#2F59C4"
              :length="caseListPageCount"
            />
          </div>
        </v-col>
      </v-row>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">多媒體退件</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ multimediaReject }}</span>件</div>
          </div>
        </div>
      </div>
      <span class="annotation">多媒體退件區同權限者皆可看到，請選擇相關操作即可</span>
      <hr class="mb-3">
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="multiMediaHeaders"
            :items="multiMediaList"
            :page.sync="multiMediaListPage"
            :items-per-page="5"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            @page-count="multiMediaListPageCount = $event"
          >
            <template v-slot:item.sendNumber="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">        
                  <a href="javascript:void(0)" style="text-decoration:underline;" @click="openFormHistory()" v-on="on">{{ item.sendNumber }}</a>
                </template>
                <span>表單歷程</span>
              </v-tooltip>
            </template>

            <template v-slot:item.action="{ item }">
              <v-tooltip v-if="item.edit" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-pencil'" />
                  </v-btn>
                </template>
                <span>重新編輯</span>
              </v-tooltip>
              <v-tooltip v-if="item.cancel" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="error"
                    @click="action('deleteMultiMedia',item)"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                </template>
                <span>取消案件</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="multiMediaListPage"
              color="#2F59C4"
              :length="multiMediaListPageCount"
            />
          </div>
        </v-col>
      </v-row>
      <v-dialog
        v-model="deleteOrderModel"
        max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            確認是否要取消案件
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="deleteOrderModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="font-24px">
            <v-row class="mt-6 ml-1 font-bold">
              取消案件將會刪除所有表單與附檔，是否執行 ?
            </v-row>
          </v-card-text>
          <v-card-actions class="d-end mt-6">
            <v-btn              
              color="normal"            
              @click="deleteOrderModel = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn              
              color="primary"            
              @click="submit(isMultimedia)"
            >
              &emsp;確定&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 瀏覽案件 -->
      <v-dialog
        v-model="browserModel"
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
            <form-page restrict-mode="view" />
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="primary"            
              @click="browserModel = false"
            >
              &emsp;確定&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 補件操作 -->
      <v-dialog
        v-model="supplementModel"
        max-width="1200px"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            補件操作
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="supplementModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <form-page restrict-mode="edit" @saveFile="saveFile()" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- 表單歷程視窗 -->
      <v-dialog
        v-model="formHistoryModel"
        max-width="700px"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            表單歷程
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="formHistoryModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="mt-10 font-22px">
            <div>
              <v-row v-for="(item,index) in formHistoryList" :key="index" class="mt-5">
                {{ item }}
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="primary"
              @click="formHistoryModel = false"
            >
              確認
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<script src="./myReturnPage.js" />


