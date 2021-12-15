<template>
  <v-app>
    <v-container>
      <div v-if="hasAccountingAuth == true">
        <div class="d-flex w-100" style="margin-top: 20px;">
          <div class="block mr-5 w-100">
            <div>
              <div class="text-center block-title fw-6 mb-2">待核算</div>
            </div>
            <div>
              <div class="block-content"><span class="block-number">{{ numOfAccounting }}</span>件</div>
            </div>
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
                v-model="searchForm.acceptNum"
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
                v-model="searchForm.electricNum"
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
              戶名       
            </v-col>          
            <v-col
              cols="3"
            >            
              <v-text-field
                v-model="searchForm.custName"
                outlined
                hide-details
                dense
                placeholder="請輸入戶名"
              />
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              待核算累積日數
            </v-col>                                             
            <v-col
              cols="3"
            >
              <v-text-field
                v-model="searchForm.cumulativeDay"
                type="number" 
                outlined
                hide-details
                dense
                placeholder="請輸入待核算累積日數"
              />
            </v-col>     
          </v-row>
          <v-row align="center">
            <v-col cols="1">
              計算日       
            </v-col>          
            <v-col
              cols="3"
            >
              <v-select
                v-model="searchForm.computeDate"
                :items="computeDateOption"
                item-text="text"
                :return-object="true"
                outlined
                hide-details
                single-line
                dense
                :clearable="true"
                class="my-auto"
                color="#ADADAD"
                placeholder="請選擇計算日"
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
                v-model="searchForm.archiveNum"                       
                outlined
                hide-details
                dense
                placeholder="請輸入整理號碼"
              />
            </v-col>     
          </v-row>
          <v-row align="center">
            <v-col cols="1">
              派工日期區間
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
                    v-model="dispatchDate.start"                  
                    append-icon="mdi-calendar"
                    readonly
                    dense
                    outlined
                    hide-details
                    v-bind="attrs"
                    clearable
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dispatchDate.start"
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
                    v-model="dispatchDate.end"                  
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    clearable
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dispatchDate.end"
                  @input="menu2 = false"
                  @change="checkDate()"
                />
              </v-menu>
            </v-col>
            <v-col cols="1" />
            <v-col cols="1">
              卡別
            </v-col>                                             
            <v-col
              cols="3"
            >
              <v-select
                v-model="searchForm.contractType"
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
                placeholder="請選擇卡別"
              />
            </v-col>
            <v-col cols="3" />
            <v-col v-if="errMsg.dispatchDate !== null" cols="1" />
            <v-col v-if="errMsg.dispatchDate !== null" cols="3" style="margin-top:-25px">
              <span class="red--text font-14px">{{ errMsg.dispatchDate }}</span>
            </v-col> 
          </v-row>
          <v-row align="center">
            <v-col cols="1">
              代理件顯示       
            </v-col>          
            <v-col
              cols="3"
            >
              <v-select
                v-model="searchForm.caseType"
                :items="agentCaseOption"
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
              <!-- <v-btn class="primary mt-5" @click="displayList = true">&emsp;查詢&emsp;</v-btn>     -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    v-on="on"
                    @click="search()"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>查詢</span>
              </v-tooltip>
            </v-col>
          </v-row>  
          <hr class="mt-10 mb-10">
          <v-row class="mt-10">
            <v-col cols="12">    
              <v-data-table
                :headers="accoutingHeaders"
                :items="accoutingList"
                :page.sync="accoutingListPage"
                :items-per-page="10"

                class="elevation-1"
                no-data-text="查無資料"
                hide-default-footer
                @page-count="accoutingListPageCount = $event"
              >
                <!-- 是否為代理件 -->
                <template v-slot:item.isAgent="{ item }"> 
                  <div             
                    v-if="item.isAgent"
                    class="ma-2"
                    icon
                  >
                    <v-icon>
                      mdi-check-bold
                    </v-icon>
                  </div>       
                </template>
                <!-- 操作狀態 -->
                <template v-slot:item.action="{ item }">              
                  <v-tooltip v-if="auditor" top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-if="item.action"                    
                        class="ma-2 success"
                        fab
                        small                
                        v-on="on"
                        @click="accounting(item)"
                      >
                        <v-icon>mdi-account-check-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>進行核算</span>
                  </v-tooltip>
                  <v-tooltip v-if="checker" top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-if="item.action"                    
                        class="ma-2 primary"
                        fab
                        small                
                        v-on="on"
                        @click="checking(item)"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>瀏覽案件</span>
                  </v-tooltip>
                </template>
                <!-- 檢視註記 -->
                <template v-slot:item.hasView="{ item }">              
                  <v-checkbox 
                    v-model="item.hasView" 
                    hide-details
                    class="shrink mt-0 ml-5"
                    style="margin-top: 0;" 
                    disabled
                  />
                </template>
                <!-- 備註按鈕 -->
                <template v-slot:item.memo="{ item }">              
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="ma-2 primary"
                        fab
                        small                
                        v-on="on"
                        @click="openComments(item)"
                      >
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>檢視備註</span>
                  </v-tooltip>
                </template>
              </v-data-table>
              <!-- 選頁 -->
              <div class="mt-2">
                <v-pagination
                  v-model="accoutingListPage"
                  color="#2F59C4"
                  :length="accoutingListPageCount"
                />
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
    <!-- 核算視窗 -->
    <v-dialog
      v-model="accountingDialog"
      max-width="1200px"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          核算案件
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="accountingDialog = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormPage
            :key="formKey"
            :form-param="formParam"
            :restrict-mode="'accounting'"
            :query-memo="memo"
            @returnOrder="returnOrder($event)"
            @accountingSubmit="accountingSubmit($event)"
            @saveComments="saveComments($event)"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 瀏覽視窗 -->
    <v-dialog
      v-model="checkingDialog"
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
            @click="checkingDialog = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormPage 
            :key="formKey"
            :restrict-mode="'viewDownload'" 
            :form-param="formParam"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 退件視窗 -->   
    <v-dialog
      v-model="returnReasonModel"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          請填寫退件原因
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="returnReasonModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-18px">
          <v-row class="mt-6 ml-1" align="center">
            <!-- <v-col cols="3">
              <span class="red--text">*</span>
              退件部門
            </v-col>
            <v-col cols="7">
              <v-select   
                v-model="department"
                :items="deptList"
                item-text="deptName"
                :return-object="true"            
                color="#ADADAD"
                outlined
                hide-details
                dense
                placeholder="請選擇退件部門"
                @change="checkRejectVal()"
              />
              <span class="red--text font-14px">{{ errMsg.dept }}</span>
            </v-col> -->
          </v-row>
          <v-row class="mt-6 ml-1" align="center">
            <v-col cols="3">
              <span class="red--text">*</span>
              退件原因
            </v-col>
            <v-col cols="7">
              <v-select
                v-model="rejectReason"
                :items="reasonList"
                item-text="returnReasonName"
                :return-object="true"
                outlined
                hide-details
                dense
                placeholder="請選擇退件原因"
                @change="checkRejectVal()"
              />
              <span class="red--text font-14px">{{ errMsg.rejectReason }}</span>
            </v-col>
          </v-row>
          <v-row class="ml-1" align="center">
            <v-col cols="3">
              <span class="red--text">*</span>
              退件說明
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="rejectDesc"            
                color="#ADADAD"
                outlined
                name="input-7-4"
                :no-resize="true"
                placeholder="請輸入退件說明"
                auto-grow
                counter="50"
                @keyup="checkRejectVal()"
              />
            </v-col>
            <v-col cols="3" />
            <v-col style="margin-top:-15%">
              <span class="red--text font-14px">{{ errMsg.rejectDesc }}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="normal"            
            @click="returnReasonModel = false"
          >
            &emsp;取消&emsp;
          </v-btn>
          <v-btn              
            color="error"            
            @click="returnSubmit()"
          >
            確認退件
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 備註視窗 -->
    <v-dialog
      v-model="commentsModel"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          備註
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="commentsModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-18px">
          <v-row class="mt-10">
            {{ memo }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="primary"            
            @click="commentsModel = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./myWaitingAccountingPage.js" />
