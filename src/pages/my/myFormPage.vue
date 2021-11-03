<template>
  <v-container>
    <div class="d-flex">
      <div class="ma-4 font-bold">
        <h2 class="font-bold">受理中</h2>
        <span style="font-size:96px;">{{ numberOfAccept }}</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4 font-bold">
        <h2 class="font-bold">代理件</h2>
        <span style="font-size:96px;">{{ numberOfAgent }}</span><span style="font-size:30px;">件</span>
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
            @click="display('all')"
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
            @click="display()"
            v-on="on"
          >
            <v-icon v-text="'mdi-text-box-search-outline'" />
          </v-btn>
        </template>
        <span>只顯示代理件</span>
      </v-tooltip>    
    </div>
    <hr class="mt-6 mb-5 ml-3">          
    <v-data-table
      :headers="formListHeaders"
      :items="formList"
      :items-per-page="10"
      no-data-text="查無資料"
      hide-default-footer
      class="elevation-1 ml-4"
      :page.sync="formListPage"
      @page-count="formListPageCount = $event"
    >
      <!-- 受理編號 -->
      <template v-slot:item.acceptNum="{ item }">   
        <v-tooltip top>
          <template v-slot:activator="{ on }">        
            <a href="javascript:void(0)" style="text-decoration:underline;" v-on="on" @click="openFormHistory(item)">{{ item.acceptNum }}</a>
          </template>
          <span>表單歷程</span>
        </v-tooltip>
      </template>
      <!-- 狀態操作 -->
      <template v-slot:item.action="{ item }">   
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="success"
                v-on="on"
                @click="action('supplement',item)"
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
      <!--是否為代理案件 -->
      <template v-slot:item.isAgent="{ item }">                                                        
        <div             
          v-if="item.isAgent === 'Y'"
          class="ma-2"
          icon
        >
          <v-icon>
            mdi-check-bold
          </v-icon>
        </div>                         
      </template>

      <!--代理件所有人 -->
      <template v-slot:item.agentAcceptUser="{ item }">                                                        
        <div             
          v-if="item.isAgent === 'Y'"
          class="ma-2"
          icon
        >
          {{ item.acceptUser }} {{ item.acceptUserName }}
        </div>                         
      </template>
    </v-data-table>                 
    <div class="mt-2">
      <v-pagination
        v-model="formListPage"
        color="#2F59C4"
        :length="formListPageCount"
      />
    </div>
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
          <form-page :key="formKey" restrict-mode="view" :form-param="formParam" />
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="primary"            
            @click="checkSubmit()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 補件視窗 -->
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
          <form-page :key="formKey" restrict-mode="edit" :form-param="formParam" @saveFile="saveFile()" />
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
</template>

<script src="./myFormPage.js"></script>