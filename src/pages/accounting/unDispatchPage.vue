<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">未分派</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ waitingCount }}</span>件</div>
          </div>
        </div>
      </div>
      <hr>
     

      <div>
        <v-data-table
          :headers="unDispatchHeaders"
          :items="unDispatchList"
          :page.sync="unDispatchListPage"
          :items-per-page="10"
          hide-default-footer
          no-data-text="查無資料"
          class="elevation-1"
          disable-sort
          @page-count="unDispatchListPageCount = $event"
        >
          <template v-slot:item.action="{ item }">                                                        
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="item.action"                    
                  class="ma-2 success"
                  fab
                  small                
                  v-on="on"
                  @click="action('dispatch',item)"
                >
                  <v-icon>mdi-account-arrow-right-outline</v-icon>
                </v-btn>
              </template>
              <span>分派案件</span>
            </v-tooltip>       
            
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="item.action"                    
                  class="ma-2 orange"                  
                  fab
                  small                
                  v-on="on"
                  @click="action('takeAway',item)"
                >
                  <v-icon>mdi-account-arrow-left-outline</v-icon>
                </v-btn>
              </template>
              <span>認領案件</span>
            </v-tooltip>                          
          </template>
        </v-data-table>
        <!-- 選頁 -->
        <div class="mt-2">
          <v-pagination
            v-model="unDispatchListPage"
            color="#2F59C4"
            :length="unDispatchListPageCount"
          />
        </div>
      </div>
      <v-dialog
        v-model="dispatchModel"
        max-width="600"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
            分派案件
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="dispatchModel = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="font-18px">
          
            <v-row class="mt-6 ml-1" align="center">
              <v-col cols="3">
                選擇班別
              </v-col>
              <v-col cols="7">
                <v-select
                  v-model="classType"
                  :items="classTypeOption"
                  item-text="text"
                  :return-object="true"
                  outlined
                  hide-details
                  single-line
                  dense
                  :clearable="true"
                  class="my-auto"
                  color="#ADADAD"
                  @change="change('classType')"
                />
              </v-col>
            </v-row>
            <v-row class="mt-6 ml-1" align="center">
              <v-col cols="3" class="ml-7">
                或
              </v-col>              
            </v-row>
            <v-row class="ml-1" align="center">
              <v-col cols="3">
                選擇核算員
              </v-col>
              <v-col cols="7">
                <v-select
                  v-model="selectEmp"
                  :items="empListOption"
                  item-text="text"
                  :return-object="true"
                  outlined
                  hide-details
                  single-line
                  :clearable="true"
                  dense
                  class="my-auto"
                  color="#ADADAD"
                  @change="change('selectEmp')"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="normal"            
              @click="dispatchModel = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn              
              color="success"            
              @click="submit()"
            >
              確認分派
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>     
    </v-container>
  </v-app>
</template>
<script src="./unDispatchPage.js"></script>