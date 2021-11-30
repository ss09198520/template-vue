<template>
  <v-container>
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
              v-model="acceptNum"
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
              v-model="electricNum"                       
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
              v-model="custName"   
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
              v-model="archiveNum"                           
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
              :items="contractTypeList"
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
                  v-model="acceptDate.start"                  
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details                  
                  clearable
                  @click:clear="resetDate('acceptDate','start')"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="acceptDate.start"
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
                  v-model="acceptDate.end"                  
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  hide-details
                  clearable
                  @click:clear="resetDate('acceptDate','end')"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="acceptDate.end"
                @input="menu2 = false"
                @change="checkDate()"
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
                  v-model="archiveDate.start"                  
                  append-icon="mdi-calendar"
                  readonly
                  dense
                  outlined
                  hide-details
                  v-bind="attrs"
                  clearable
                  @click:clear="resetDate('archiveDate','start')"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="archiveDate.start"
                @input="menu3 = false"
                @change="checkDate()"
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
                  v-model="archiveDate.end"                  
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  hide-details
                  v-bind="attrs"
                  clearable
                  @click:clear="resetDate('archiveDate','end')"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="archiveDate.end"
                @input="menu4 = false"
                @change="checkDate()"
              />
            </v-menu>
          </v-col>
          <v-col cols="2" />
          <v-col cols="3" style="margin-top:-25px">
            <span class="red--text font-14px">{{ errMsg.acceptDate }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="3" style="margin-top:-25px">
            <span class="red--text font-14px">{{ errMsg.archiveDate }}</span>
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
        <div v-if="display == true">        
          <v-row>
            <v-col>
              <v-data-table
                :headers="readFormHeaders"
                :items="readFormList"
                :items-per-page="10"
                no-data-text="查無資料"              
                disable-sort
                hide-default-footer
                class="elevation-1"
                :page.sync="readFormListPage"
                @page-count="readFormListPageCount = $event"
              >
                <template v-slot:item.mani="{ item }">   
                  <div>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ma-2"
                          fab
                          small
                          color="success"
                          @click="applyRead(item)"
                          v-on="on"
                        >
                          <v-icon v-text="'mdi-eye-plus'" />
                        </v-btn>
                      </template>
                      <span>申請調閱</span>
                    </v-tooltip>                    
                  </div>                                                                               
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="readFormListPage"
              color="#2F59C4"
              :length="readFormListPageCount"
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
                  v-model="readAudience"                
                  :items="readAudienceList"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇調閱對象"
                  return-object 
                  item-text="empName"
                  @change="checkReadAudience()"
                />
                <!-- <v-text-field
                  v-model="setMember"                           
                  outlined
                  hide-details
                  dense
                  placeholder="請輸入調閱對象"
                /> -->
                <span v-if="errMsg.readAudience" class="red--text">{{ errMsg.readAudience }}</span>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">調閱事由</v-col>
              <v-col cols="9">
                <v-select
                  v-model="readReason"                
                  :items="readReasonList"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇調閱事由"
                  return-object
                  item-text="readReason"
                  @change="checkReadReason('mgmn')"
                />
                <span class="red--text"> {{ errMsg.readReason }}</span>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">其他事由</v-col>
              <v-col cols="9">
                <v-textarea
                  v-model="otherReason"
                  outlined                  
                  value=""
                  auto-grow
                  counter="50"
                  @keyup="checkOtherReason()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" />
              <v-col cols="" style="margin-top:-9%">
                <span class="red--text"> {{ errMsg.otherReason }}</span>
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
              v-model="acceptNum"
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
              v-model="electricNum"                           
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
              v-model="custName"                           
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
              v-model="archiveNum"                           
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
              :items="contractTypeList"
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
        <hr>
        <div v-if="display == true">
          <v-row>                    
            <v-col>
              <v-data-table
                :headers="readFormHeaders"
                :items="readFormList"
                :items-per-page="10"
                no-data-text="查無資料"              
                disable-sort
                hide-default-footer
                class="elevation-1"
                :page.sync="readFormListPage"
                @page-count="readFormListPageCount = $event"
              >
                <template v-slot:item.mani="{ item }">   
                  <div>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ma-2"
                          fab
                          small
                          color="success"
                          @click="applyRead(item)"
                          v-on="on"
                        >
                          <v-icon v-text="'mdi-eye-plus'" />
                        </v-btn>
                      </template>
                      <span>申請調閱</span>
                    </v-tooltip>              
                  </div>                                                                               
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="readFormListPage"
              color="#2F59C4"
              :length="readFormListPageCount"
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
              <v-col>
                {{ readDate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">調閱編號</v-col>
              <v-col cols="3">
                {{ readNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">受理號碼</v-col>
              <v-col cols="3">
                {{ selectForm.acceptNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">電號</v-col>
              <v-col cols="3">
                {{ selectForm.electricNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">整理號碼</v-col>
              <v-col cols="3">
                {{ selectForm.archiveNum }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"><span class="red--text">*</span>調閱事由</v-col>
              <v-col cols="9">
                <v-textarea
                  v-model="readReason"
                  outlined
                  value=""
                  rows="4"
                  auto-grow
                  counter="50"
                  @keyup="checkReadReason()"
                />
              </v-col>               
            </v-row>
            <v-row v-if="errMsg.readReason != null" style="margin-top:-9%">
              <v-col cols="2" />
              <v-col cols="">
                <span class="red--text"> {{ errMsg.readReason }}</span>
              </v-col>
            </v-row>    
            <v-row>
              <v-col cols="2">備註</v-col>
              <v-col cols="9">
                <v-textarea
                  v-model="otherReason"
                  outlined
                  value=""
                  rows="4"
                  counter="50"
                  auto-grow
                  @keyup="checkMemo()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" />
              <v-col cols="" style="margin-top:-9%">
                <span class="red--text"> {{ errMsg.memo }}</span>
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