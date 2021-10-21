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
                placeholder="請輸入姓名代號"
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
                placeholder="請輸入代理人姓名代號"
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
                placeholder="請選擇資料來源"
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
          <div v-if="leaveList != null">
            <v-data-table
              :headers="leaveListHeaders"
              :items="leaveList"
              :page.sync="leaveListPage"
              :items-per-page="10"
              hide-default-footer
              no-data-text="查無資料"
              class="elevation-1"
              disable-sort
              @page-count="leaveListPageCount = $event"
            >
              <!-- 代理請假日期範圍 -->
              <template v-slot:item.leaveDate="{ item }">                                            
                {{ item.startDate }}~{{ item.endDate }}
              </template>
              <!-- 狀態操作 -->
              <template v-slot:item.action="{ item }"> 
                <v-tooltip v-if="new Date(item.endDate) > sysDate" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="success"
                      v-on="on"
                      @click="openEditModel(item)"
                    >
                      <v-icon v-text="'mdi-account-edit-outline'" />
                    </v-btn>
                  </template>
                  <span>修改代理申請</span>
                </v-tooltip>                                                  
                <v-tooltip v-if="new Date(item.endDate) > sysDate" top>
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
                  <span>刪除代理申請</span>
                </v-tooltip>                            
              </template>
            </v-data-table>
            <!-- 選頁 -->
            <div class="mt-2">
              <v-pagination
                v-model="leaveListPage"
                color="#1976D2"
                :length="leaveListPageCount"
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
    <!-- 提醒視窗 -->
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
            {{ alertMsg }}
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
    <!-- 修改代理申請視窗 -->
    <v-dialog
      v-model="editModel"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
          修改代理申請
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="editModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row class="mt-3">
            <v-col cols="2">姓名代號</v-col>
            <v-col>
              {{ selectOne.empNo }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">員工姓名</v-col>
            <v-col>
              {{ selectOne.empName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">休假期間</v-col>
            <v-col>
              {{ selectOne.startDate }} ~ {{ selectOne.endDate }}
            </v-col>
          </v-row>
          <v-row align="center" class="mb-3">
            <v-col cols="2">代理人</v-col>
            <v-col cols="9">
              <v-select
                v-model="selectAgent"
                outlined
                :items="agentOpt"
                hide-details
                :return-object="true"
                dense
                item-text="empName"
                placeholder="請選擇代理人"
              >
                <template v-slot:selection="data">
                  <span>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}</span>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-content>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}</v-list-item-content>
                  </template>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="normal"              
            @click="editModel = false"
          >
            &emsp;取消&emsp;
          </v-btn>
          <v-btn
            color="success"              
            @click="submit('edit')"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script src="./leaveSearchPage.js"></script>