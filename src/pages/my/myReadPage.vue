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
                  
      <div class="ml-10 font-18px font-bold">
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
        </v-row>
        <v-row>
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
        <v-btn class="primary mt-5" @click="displayList = true">&emsp;查詢&emsp;</v-btn>        
      </div>
      <hr class="mt-6 ml-8 mr-8">
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
                  <v-btn
                    color="primary"
                    @click="search(item)"
                  >
                    瀏覽案件
                  </v-btn>                 
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
    </v-container>
  </v-app>
</template>

<script src="./myReadPage.js"></script>
