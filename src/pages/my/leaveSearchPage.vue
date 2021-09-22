<template>
  <v-container>
    <div>      
      <h2 class="font-bold">請假清單</h2>     
      <div class="ml-10">
        <div class="font-18px font-bold">
          <v-row align="center">   
            <v-col cols="1">       
              姓名代號
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
              代理人姓名代號
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
            <v-col cols="1" />
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
          </v-row>
          <v-row align="center" />
          <v-row align="center">
           
            
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
                    :clearable="true"
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
                    :clearable="true"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date2"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              資料來源
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
                :clearable="true"
                placeholder="請選擇請假方式"
                class="my-auto"
                color="#ADADAD"
              />
            </v-col>
          </v-row>
        
          <v-row>
            <v-col cols="11" />
            <v-col>
              <!-- <v-btn color="primary ml-3" @click="search()">&emsp;查詢&emsp;</v-btn> -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    @click="search()"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>查詢</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <hr class="mt-6 mb-5">
          <div v-if="empMockList != null">
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
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="error"
                      @click="deleteLeave(item)"
                      v-on="on"
                    >
                      <v-icon v-text="'mdi-delete'" />
                    </v-btn>
                  </template>
                  <span>刪除請假</span>
                </v-tooltip>                        
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
    </div>
    <v-dialog
      v-model="deleteLeaveModel"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          刪除請假
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="deleteLeaveModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            請確認是否刪除該筆請假紀錄?
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="normal"            
            @click="deleteLeaveModel = false"
          >
            取消
          </v-btn>
          <v-btn              
            color="error"            
            @click="submit()"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="alertModel"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          提醒
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="alertModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px red--text">
          <v-row class="mt-6 ml-1 font-bold">
            已成功刪除請假紀錄，請記得到差假管理系統辦理銷假，謝謝
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="primary"            
            @click="alertModel = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script src="./leaveSearchPage.js"></script>