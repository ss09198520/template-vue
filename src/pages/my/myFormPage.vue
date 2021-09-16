<template>
  <v-container>
    <div class="d-flex">
      <div class="ma-4 font-bold">
        <h2 class="font-bold">受理中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4 font-bold">
        <h2 class="font-bold">核算中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4 font-bold">
        <h2 class="font-bold">代理件</h2>
        <span style="font-size:96px;">1</span><span style="font-size:30px;">件</span>
      </div>      
    </div>
    <div>
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
        <span>只顯示受理件</span>
      </v-tooltip>    
    </div>
    <hr class="mt-6 mb-5 ml-3">          
    <v-data-table
      :headers="empListHeaders"
      :items="empMockList"
      :items-per-page="10"
      no-data-text="查無資料"
      hide-default-footer
      class="elevation-1 ml-4"
      disable-sort
      :page.sync="orderListPage"
      @page-count="orderListPageCount = $event"
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
                v-on="on"
                @click="action(item)"
              >
                <v-icon v-text="'mdi-file-document-edit-outline'" />
              </v-btn>
            </template>
            <span>補件操作</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="error"
                v-on="on"
                @click="action('delete',item)"
              >
                <v-icon v-text="'mdi-delete'" />
              </v-btn>
            </template>
            <span>取消案件</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="primary"
                v-on="on"
               
                @click="action('browse',item)"
              >
                <v-icon v-text="'mdi-eye'" />
              </v-btn>
            </template>
            <span>瀏覽案件</span>
          </v-tooltip>
        </div>                                                                               
      </template>

      <template v-slot:item.proxyEvent="{ item }">                                                        
        <div             
          v-if="item.proxyEvent == true"
          class="ma-2"
          icon
        >
          <v-icon>
            mdi-check-bold
          </v-icon>
        </div>                         
      </template>
    </v-data-table>                 
    <div class="mt-2">
      <v-pagination
        v-model="orderListPage"
        color="#2F59C4"
        :length="orderListPageCount"
      />
    </div>
    <!-- 取消案件 -->
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
            @click="submit()"
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
          <form-page restrict-mode="audit" />
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
  </v-container></template>

<script src="./myFormPage.js"></script>