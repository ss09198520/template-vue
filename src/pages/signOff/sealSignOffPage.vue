<template>
  <v-app>
    <v-container>
      <h2 class="font-bold mb-5">專用章簽核</h2>
      <v-row class="ml-2">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              fab
              small
              :class="{'primary': displayAll}"
              @click="display()"
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
              @click="displayWaitToSign()"
              v-on="on"
            >
              <v-icon v-text="'mdi-text-box-search-outline'" />
            </v-btn>
          </template>
          <span>只顯示待簽核</span>
        </v-tooltip>        
      </v-row>
      <hr class="mt-6 mb-5 ml-4 mr-5">
      <v-row class="ma-2">
        <v-col>
          <v-data-table
            :headers="sealSignListHeaders"
            :items="sealSignList"
            :items-per-page="10"
            no-data-text="查無資料"              
            disable-sort
            hide-default-footer
            class="elevation-1"
            :page.sync="sealSignListPage"
            @page-count="sealSignListPageCount = $event"
          >
            <template v-slot:item.sealStatus="{ item }">   
              <div v-if="item.sealStatus === 'WAIT'">
                待簽核
              </div>  
              <div v-else-if="item.sealStatus === 'PASS'">
                簽核完畢
              </div>    
              <div v-else />                                                                   
            </template> 
            <template v-slot:item.mani="{ item }">   
              <div>
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
                  <span>瀏覽表單</span>
                </v-tooltip>
                <v-tooltip v-if="item.sealStatus === 'WAIT'" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="success"
                      @click="signOff(item.acceptNum)"
                      v-on="on"
                    >
                      <v-icon v-text="'mdi-account-check-outline'" />
                    </v-btn>
                  </template>
                  <span>簽核</span>
                </v-tooltip>               
              </div>                                                                         
            </template> 
            <template v-slot:item.download="{ item }">  
              <v-tooltip v-if="item.sealStatus === 'PASS'" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-download-box-outline'" />
                  </v-btn>
                </template>
                <span>專用章檔案下載</span>
              </v-tooltip>
            </template>    
          </v-data-table>
        </v-col>
      </v-row>
      <!-- 選頁 -->
      <div class="mt-2">
        <v-pagination
          v-model="sealSignListPage"
          color="#2F59C4"
          :length="sealSignListPageCount"
        />
      </div>
      <!-- 瀏覽案件 -->
      <v-dialog
        v-model="browserModel"
        max-width="1200px"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            瀏覽表單
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
            <div v-show="sealOffFinish">
              <form-page :key="formKey" restrict-mode="viewDownload" :form-param="formParam" />
            </div>         
          </v-card-text>
          <!-- <v-card-text>
            <form-page v-if="sealOffFinishNot" restrict-mode="viewSealSignOffBefore" />            
          </v-card-text>           -->
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="primary"            
              @click="checkSubmit()"
            >
              &emsp;關閉&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script src="./sealSignOffPage.js"></script>