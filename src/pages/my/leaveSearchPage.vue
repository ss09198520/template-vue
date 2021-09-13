<template>
  <v-container>
    <div>
      <h2 class="font-bold">請假查詢</h2>
      <v-row class="ml-5">
        <h3 class="font-bold">查詢條件</h3>
      </v-row>
      <div class="ml-10">
        <div class="font-18px font-bold">
          <v-row align="center">   
            <v-col cols="1">       
              員工編號
            </v-col>          
            <v-col
              cols="3"
            >
              <v-text-field
                outlined
                hide-details                                         
                dense
                placeholder="請輸入員工編號"
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              員工姓名
            </v-col>
            <v-col
              cols="3"
            >
              <v-text-field                           
                outlined
                hide-details
                dense
                placeholder="請輸入員工姓名"
              />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="1">
              員工編號
            </v-col>
            <v-col
              cols="3"
            >
              <v-text-field                           
                outlined
                hide-details
                dense
                placeholder="請輸入員工編號"
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              代理人編號
            </v-col>
            <v-col
              cols="3"
            >
              <v-text-field                           
                outlined
                hide-details
                dense
                placeholder="請輸入代理人編號"
              />
            </v-col>
          </v-row>
          <v-row align="center" />
          <v-row align="center">
            <v-col cols="1">
              代理人姓名
            </v-col>
            <v-col
              cols="3"
            >
              <v-text-field                           
                outlined
                hide-details
                dense
                placeholder="請輸入代理人姓名"
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              日期區間
            </v-col>
            <v-col            
              cols="3"
              class="d-flex"
            >
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date1"
                    append-icon="mdi-calendar"
                    outlined
                    readonly
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width:100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date1"
                  @input="menu1 = false"
                />
              </v-menu>
              <div class="mt-1">~</div>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date2"
                    append-icon="mdi-calendar"
                    outlined
                    readonly
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width:100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date2"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="1">
              請假方式
            </v-col>
            <v-col
              cols="3"
            >             
              <v-select
                v-model="leaveWay"
                :items="leaveWayOption"
                item-text="text"
                :return-object="true"
                outlined
                hide-details
                single-line
                dense
                placeholder="請選擇請假方式"
                class="my-auto"
                color="#ADADAD"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="primary ml-3">查詢</v-btn>
          </v-row>
        
          
          <hr class="mt-6 mb-5">
          <div class="content-table-blue">
            <v-data-table
              :headers="empListHeaders"
              :items="empMockList"
              :page.sync="empListPage"
              :items-per-page="10"
              hide-default-footer
              no-data-text="查無資料"
              class="elevation-1"
              disable-sort
              @page-count="empListPageCount = $event"
            >
              <template v-slot:item.mani="{ item }">                                            
                <v-btn
                  class="ma-2"
                  color="error"
                  depressed
                  @click="test(item)"
                >
                  刪除請假
                </v-btn>                         
              </template>
            </v-data-table>
            <!-- 選頁 -->
            <div class="mt-2">
              <v-pagination
                v-model="empListPage"
                color="#1976D2"
                :length="empListPageCount"
              />
            </div>
          </div>
        </div>
      
      </div>
    </div></v-container>
</template>
<script src="./leaveSearchPage.js"></script>