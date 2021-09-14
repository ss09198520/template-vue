<template>
  <v-container>
    <v-btn class="primary ma-2" @click="User = 'guest'">角色：核算課長/調閱管理員</v-btn>
    <v-btn class="primary ma-2" @click="User = 'TPESUser'">角色：TPES使用者</v-btn>
    <div v-if="User != 'TPESUser'">
      <h2 class="font-bold">調閱查詢</h2>
      <v-row class="ml-5">
        <h3 class="font-bold">查詢條件</h3>
      </v-row>
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
              placeholder="請輸入員工編號"
            />
          </v-col>
        </v-row>
        <v-row align="center">
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
              placeholder="請輸入員工姓名"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            登記單種類
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
        </v-row>
        <v-row>
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
              placeholder="請輸入代理人編號"
            />
          </v-col>
        </v-row>
        <v-row>
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
          <v-btn color="primary ml-3" @click="display = true">&emsp;查詢&emsp;</v-btn>
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
                    <v-btn
                      color="success"
                      @click="search(item)"
                    >
                      申請調閱
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
              <v-col cols="5">
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
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">調閱原因</v-col>
              <v-col cols="5">
                <v-select
                  v-model="setReason"                
                  :items="reasonOption"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇調閱原因"
                  return-object
                />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">其他原因</v-col>
              <v-col>
                <v-textarea
                  outlined                  
                  value=""
                  hide-details
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
              @click="popOut = false"
            >
              確定調閱
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- 角色為TPES使用者 -->
    <div v-if="User == 'TPESUser'">        
      <h2 class="font-bold">調閱查詢</h2>
      <v-row class="ml-5">
        <h3 class="font-bold">查詢條件</h3>
      </v-row>
      <div class="ml-10">            
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
              placeholder="請輸入員工編號"
            />
          </v-col>
        </v-row>
        <v-row align="center">
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
              placeholder="請輸入員工姓名"
            />
          </v-col>
        </v-row>
        <v-row align="center">
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
              placeholder="請輸入員工編號"
            />
          </v-col>
        </v-row>                                        
        <v-row>            
          <v-btn class="mb-7 ml-3" color="primary" @click="display = true">&emsp;查詢&emsp;</v-btn>
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
                    <v-btn                                                                                     
                      color="success"
                      @click="search(item)"
                    >
                      申請調閱
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
                20210910 13:45
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">調閱編號</v-col>
              <v-col cols="3">
                7110000001
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">受理編號</v-col>
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
            <v-row class="mb-5">
              <v-col cols="2">調閱事由</v-col>
              <v-textarea
                outlined
                class="ml-3"
                value=""
                rows="4"
                hide-details
              />
            </v-row>
            <v-row>
              <v-col cols="2">備註</v-col>
              <v-textarea
                outlined
                class="ml-3"
                value=""
                rows="4"
                hide-details
              />
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
              @click="popOut = false"
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