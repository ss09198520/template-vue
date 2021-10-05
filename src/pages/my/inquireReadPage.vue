<template>
  <v-container>
    <v-btn class="ma-2" :class="{'primary': User == 'guest'}" @click="User = 'guest'">角色：核算課長/調閱管理員</v-btn>
    <v-btn class="ma-2" :class="{'primary': User == 'TPESUser'}" @click="User = 'TPESUser'">角色：TPES使用者</v-btn>
    <div v-if="User != 'TPESUser'">
      <h2 class="font-bold">案件查詢</h2>      
      <div class="ml-10 font-18px font-bold">        
        <v-row align="center">
          <v-col cols="1">
            受理號碼     
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              outlined
              hide-details                                         
              dense
              placeholder="請輸入受理號碼"
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
        <v-row align="center">
          <v-col cols="1">
            戶名
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              outlined
              hide-details                                         
              dense              
              placeholder="請輸入戶名"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            整理號碼
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入整理號碼"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            契約種類
          </v-col>
          <v-col            
            cols="3"   
            class="d-flex"         
          >
            <v-select
              v-model="contractType"
              :items="contractTypeOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              :clearable="true"
              class="my-auto"
              color="#ADADAD"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            受理日期區間
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
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details                  
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date1"
                @input="menu1 = false"
              />
            </v-menu>          
            <div style="margin:auto 0;">~</div>          
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
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details
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
        <v-row>
          <v-col cols="1">
            歸檔日期區間
          </v-col>
          <v-col            
            cols="3"
            class="d-flex"
          >
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"              
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date3"                  
                  append-icon="mdi-calendar"
                  readonly
                  dense
                  outlined
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date3"
                @input="menu3 = false"
              />
            </v-menu>          
            <div style="margin:auto 0;">~</div>          
            <v-menu
              v-model="menu4"
              :close-on-content-click="false"              
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date4"                  
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date4"
                @input="menu4 = false"
              />
            </v-menu>
          </v-col>
        </v-row>
             
        <v-row>       
          <v-col cols="11" />
          <v-col>     
            <!-- <v-btn color="primary ml-3" @click="display = true">&emsp;查詢&emsp;</v-btn> -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  small
                  color="primary"
                  @click="display = true"
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
        <div v-if="display == true">        
          <v-row>
            <v-col>
              <v-data-table
                :headers="empListHeaders"
                :items="empMockList"
                :items-per-page="10"
                no-data-text="查無資料"              
                disable-sort
                hide-default-footer
                class="elevation-1"
                :page.sync="applyListPage"
                @page-count="applyListPageCount = $event"
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
                          @click="search(item)"
                          v-on="on"
                        >
                          <v-icon v-text="'mdi-eye-plus'" />
                        </v-btn>
                      </template>
                      <span>申請調閱</span>
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
              v-model="applyListPage"
              color="#2F59C4"
              :length="applyListPageCount"
            />
          </div>
        </div>           
      </div>

      <!-- 彈出視窗 -->
      <v-dialog
        v-model="popOut"
        max-width="600"
      >
        

        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
            請選擇調閱原因
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="popOut = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row class="mt-3" align="center">
              <v-col cols="2">調閱對象</v-col>
              <v-col cols="9">
                <v-select
                  v-model="setMember"                
                  :items="memberOption"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇調閱對象"
                  return-object 
                  item-text="empName"              
                />
                <!-- <v-text-field
                  v-model="setMember"                           
                  outlined
                  hide-details
                  dense
                  placeholder="請輸入調閱對象"
                /> -->
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">調閱事由</v-col>
              <v-col cols="9">
                <v-select
                  v-model="setReason"                
                  :items="reasonOption"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇調閱事由"
                  return-object
                />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">其他事由</v-col>
              <v-col cols="9">
                <v-textarea
                  outlined                  
                  value=""
                  auto-grow
                  counter="50"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn      
              color="normal"                     
              @click="popOut = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn
              color="success"              
              @click="submit()"
            >
              確定調閱
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- 角色為TPES使用者 -->
    <div v-if="User == 'TPESUser'">        
      <h2 class="font-bold">案件查詢</h2>
      <div class="ml-10 font-18px font-bold">            
        <v-row align="center">          
          <v-col cols="1">
            受理號碼
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field
              outlined
              hide-details                                         
              dense
              placeholder="請輸入受理號碼"
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
        <v-row align="center">
          <v-col cols="1">
            戶名
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入戶名"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            整理號碼
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入整理號碼"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            契約種類
          </v-col>
          <v-col
            cols="3"
          >
            <v-select
              v-model="contractType"
              :items="contractTypeOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              :clearable="true"
              class="my-auto"
              color="#ADADAD"
            />
          </v-col>
        </v-row>                                                 
        <v-row>    
          <v-col cols="11" />
          <v-col>        
            <!-- <v-btn class="mb-7 ml-3" color="primary" @click="display = true">&emsp;查詢&emsp;</v-btn> -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-2"
                  fab
                  small
                  color="primary"
                  @click="display = true"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-magnify'" />
                </v-btn>
              </template>
              <span>查詢</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <hr>
        <div v-if="display == true">
          <v-row>                    
            <v-col>
              <v-data-table
                :headers="empListHeaders"
                :items="empMockList"
                :items-per-page="10"
                no-data-text="查無資料"              
                disable-sort
                hide-default-footer
                class="elevation-1"
                :page.sync="applyListPage"
                @page-count="applyListPageCount = $event"
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
                          @click="search(item)"
                          v-on="on"
                        >
                          <v-icon v-text="'mdi-eye-plus'" />
                        </v-btn>
                      </template>
                      <span>申請調閱</span>
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
              v-model="applyListPage"
              color="#2F59C4"
              :length="applyListPageCount"
            />
          </div>
        </div>                                       
      </div>

      <!-- 彈出視窗 -->
      <v-dialog
        v-model="popOut"
        max-width="600"
      >
        <v-card>
          <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">
            輸入申請調閱資料
            <v-spacer />
            <v-btn
              color="white"
              icon
              small
              text
              @click="popOut = false"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row class="mt-3">
              <v-col cols="2">調閱日期</v-col>
              <v-col cols="3">
                2021-09-10 13:45
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">調閱編號</v-col>
              <v-col cols="3">
                7110000001
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">受理號碼</v-col>
              <v-col cols="3">
                A00040
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">電號</v-col>
              <v-col cols="3">
                7140000123
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">整理號碼</v-col>
              <v-col cols="3">
                000300
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">調閱事由</v-col>
              <v-col cols="9">
                <v-textarea
                  outlined
                  value=""
                  rows="4"
                  auto-grow
                  counter="50"
                />
              </v-col>
            </v-row>            
            <v-row>
              <v-col cols="2">備註</v-col>
              <v-col cols="9">
                <v-textarea
                  outlined
                  value=""
                  rows="4"
                  counter="50"
                  auto-grow
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="normal"              
              @click="popOut = false"
            >
              &emsp;取消&emsp;
            </v-btn>
            <v-btn
              color="success"              
              @click="submit()"
            >
              確定調閱
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>    
    </div>    
  </v-container>
  <!-- TPES使用者 -->
  
        
   
</template>
<script src="./inquireReadPage.js"></script>