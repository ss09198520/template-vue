<template>
  <v-container>
    <h2>請假查詢</h2>
    <h3>查詢條件</h3>
    <div>
      <div>
        <v-row align="center">          
          員工編號 :          
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
            員工姓名 :
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
            員工編號 :
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
            代理人編號 :
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
            代理人姓名 :
          </div>
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
        <v-row>
          <div style="margin:auto 0">
            日期區間 :
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
            請假方式 :
          </div>
          <v-col
            cols="3"
          >
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder=""
            />
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
                <v-btn
                  outlined
                  class="ma-2"
                  text
                  @click="test(item)"
                >
                  刪除請假
                </v-btn>                         
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>    
    </div>  
  </v-container>
</template>
<script src="./leaveAgentSearchPage.js"></script>