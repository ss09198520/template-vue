<template>
  <v-container>
    <h2>調閱查詢</h2>
    <h3>查詢條件</h3>
    <div>
      <div>
        <v-row align="center">          
          受理編號 :          
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
          <div style="margin:auto 0">
            電號 :
          </div>
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
          <div style="margin:auto 0">
            登記單種類 :
          </div>
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
          <div style="margin:auto 0">
            員工編號 :
          </div>
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
          <div style="margin:auto 0">
            受理日期區間 :
          </div>
          <v-col            
            cols="4"
          >
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date1"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date1"
                @input="menu1 = false"
              />
            </v-menu>
          </v-col>
          <div style="margin:auto 0;">~</div>
          <v-col            
            cols="4"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
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
          <div style="margin:auto 0">
            歸檔日期區間 :
          </div>
          <v-col            
            cols="4"
          >
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date3"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date3"
                @input="menu3 = false"
              />
            </v-menu>
          </v-col>
          <div style="margin:auto 0;">~</div>
          <v-col            
            cols="4"
          >
            <v-menu
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date4"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
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
          <v-btn style="margin-left:300px;">查詢</v-btn>
        </v-row>        
        <v-row>
          <v-col>
            <v-data-table
              :headers="empListHeaders"
              :items="empMockList"
              :items-per-page="10"
              no-data-text="查無資料"
              style="font-weight: bold;"
            >
              <template v-slot:item.mani="{ item }">   
                <div v-if="item.mani==true">
                  <v-btn
                    outlined              
                    text
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
      </div>    
    </div>

    <!-- 彈出視窗 -->
    <v-dialog
      v-model="popOut"
      max-width="800"
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
          <v-row class="mt-3">
            <div style="margin:auto 0;">調閱對象 :</div>
            <v-col>
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
          <v-row>
            <div style="margin:auto 0;">調閱原因 :</div>
            <v-col>
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
          <v-row>
            <div style="margin:auto 0;">其他原因 :</div>
            <v-textarea
              outlined
              class="ml-3"
              value=""
            />
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="popOut = false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="popOut = false"
          >
            確定調閱
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-container>
</template>
<script src="./inquireReadPage.js"></script>