<template>
  <v-app>
    <v-container>      
      <div class="d-flex">
        <div class="ml-9 font-bold">
          <h2 class="font-bold">調閱中</h2>
          <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
        </div>
        <div class="ml-9 font-bold">
          <h2 class="font-bold">申請中</h2>
          <span style="font-size:96px;">1</span><span style="font-size:30px;">件</span>
        </div>            
      </div>
                  
      <div class="mt-10 ml-10 font-18px font-bold">
        <v-row align="center">
          <v-col cols="1">
            受理編號        
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              outlined
              hide-details                                         
              dense
              placeholder="請輸入受理編號"
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
                  @click="displayList = true"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-magnify'" />
                </v-btn>
              </template>
              <span>查詢</span>
            </v-tooltip>
          </v-col>
        </v-row>    
      </div>
      <hr class="mt-6">
      <div v-if="displayList == true">
        <v-row class="ma-7">
          <v-col>
            <v-data-table
              :headers="empListHeaders"
              :items="empMockList"
              :items-per-page="10"
              no-data-text="查無資料"              
              disable-sort
              hide-default-footer
              class="elevation-1"
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
                        color="primary"
                        @click="browerOrder(item)"
                        v-on="on"
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
                  @click="test(item)"
                >
                  <v-icon>
                    mdi-check-bold
                  </v-icon>
                </div>                         
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <!-- 選頁 -->
        <div class="mt-2">
          <v-pagination
            v-model="orderListPage"
            color="#2F59C4"
            :length="orderListPageCount"
          />
        </div>
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
            <form-page restrict-mode="view" />
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
    </v-container>
  </v-app>
</template>

<script src="./myReadPage.js"></script>
