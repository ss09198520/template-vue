<template>
  <v-app>
    <v-container>      
      <div class="d-flex">
        <div class="ml-9 font-bold">
          <h2 class="font-bold">調閱中</h2>
          <span style="font-size:96px;">{{ numOfRead }}</span><span style="font-size:30px;">件</span>
        </div>
        <div class="ml-9 font-bold">
          <h2 class="font-bold">申請中</h2>
          <span style="font-size:96px;">{{ numOfReadApply }}</span><span style="font-size:30px;">件</span>
        </div>            
      </div>
                  
      <div class="mt-10 ml-10 font-18px font-bold">
        <v-row align="center">
          <v-col cols="1">
            受理號碼        
          </v-col>          
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="acceptNum"
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
              v-model="electricNum"
              type="number"                   
              outlined
              hide-details
              dense
              placeholder="請輸入電號"
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
              v-model="archieveNum"
              outlined
              hide-details                                         
              dense
              placeholder="請輸入整理號碼"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            申請調閱日期
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
                  v-model="readDate.start"                  
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details                  
                  :clearable="true"
                  v-on="on"
                  @click:clear="resetDate('readDate','start')"
                />
              </template>
              <v-date-picker
                v-model="readDate.start"
                @input="menu1 = false"
                @change="checkDate()"
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
                  v-model="readDate.end"                  
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details
                  :clearable="true"
                  v-on="on"
                  @click:clear="resetDate('readDate','end')"
                />
              </template>
              <v-date-picker
                v-model="readDate.end"
                @input="menu2 = false"
                @change="checkDate()"
              />
            </v-menu>
          </v-col>
          <v-col cols="6" />
          <v-col style="margin-top:-1%">   
            <span class="red--text font-14px">{{ errMsg }}</span>
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
      </div>
      <hr class="mt-6">
      <div>
        <v-row class="ma-7">
          <v-col>
            <v-data-table
              :headers="formListHeaders"
              :items="formList"
              :items-per-page="10"
              no-data-text="查無資料"              
              disable-sort
              hide-default-footer
              class="elevation-1"
              :page.sync="formListPage"
              @page-count="formListPageCount = $event"
            >
              <!-- 調閱狀態欄位 -->
              <template v-slot:item.status="{ item }">                                                        
                <div v-if="item.status === '通過' && new Date(item.validDate) > sysDate">
                  有效日至{{ item.validDate }}
                </div>
                <div v-else-if="item.status === '通過' && new Date(item.validDate) < sysDate">
                  已逾期
                </div>
                <div v-else>
                  {{ item.status }}
                </div>

              </template>
              <template v-slot:item.action="{ item }">   
                <div v-if="item.status === '通過' && new Date(item.validDate) > sysDate">
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
            v-model="formListPage"
            color="#2F59C4"
            :length="formListPageCount"
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
            <form-page :key="formKey" restrict-mode="view" :form-param="formParam" />
          </v-card-text>
          <v-card-actions class="d-end mt-5">
            <v-btn              
              color="primary"            
              @click="browserModel = false"
            >
              &emsp;關閉&emsp;
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script src="./myReadPage.js"></script>
