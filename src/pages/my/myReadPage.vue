<template>
  <v-app>
    <v-container>
      <h2 class="ma-4">調閱查詢</h2>
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
            
      <v-row class="ml-9 mb-5">
        <h3>查詢條件</h3>
      </v-row>
      <div class="ml-10">
        <v-row align="center">
          <v-col cols="1">
            受理編號 :          
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
          電號 :         
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
          <v-btn class="primary">查詢</v-btn>
        </v-row>        
      </div>
      <hr class="mt-6 ml-8 mr-8">
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
    </v-container>
  </v-app>
</template>

<script src="./myReadPage.js"></script>
