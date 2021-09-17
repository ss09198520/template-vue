<template>
  <v-app>
    <v-container>
      <h2 class="font-bold">退件報表</h2>
      <div class="ml-10">
        <div class="font-18px font-bold">
          <v-row align="center">
            <v-col cols="1">
              退件日期
            </v-col>
            <v-col cols="3" class="d-flex">
              <v-menu
                v-model="startDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="before7"
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
                  v-model="before7"
                  @input="startDate = false"
                />
              </v-menu>
              <div class="mt-1">~</div>
              <v-menu
                v-model="endDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="padding-top: 0;"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  @input="endDate = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="1">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>{{ searchText }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" />
            <v-col>
              <!-- <v-btn color="primary" class="ml-3" @click="search()">{{ searchText }}</v-btn> -->
            </v-col>
          </v-row>
        </div>
      </div>
      <hr class="mt-6 mb-5">
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="headers"
            :items="itemList"
            :page.sync="dataListPage"
            :items-per-page="10"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            disable-sort
            @page-count="dataListPageCount = $event"
          >
            <template v-slot:item.signOff="{ item }">
              <!-- <v-btn v-if="item.signOff" color="success">{{ signOffText }}</v-btn> -->
              <v-tooltip v-if="item.signOff" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-account-check-outline'" />
                  </v-btn>
                </template>
                <span>簽核</span>
              </v-tooltip>
              <span v-else style="color: gray;">已簽核</span>
            </template>
            <template v-slot:item.signOffDate1="{ item }">
              <span v-if="!item.signOffDate1" style="color: gray;">未簽核</span>
              <span v-else>{{ item.signOffDate1 }}</span>
            </template>
            <template v-slot:item.signOffDate2="{ item }">
              <span v-if="!item.signOffDate2" style="color: gray;">未簽核</span>
              <span v-else>{{ item.signOffDate2 }}</span>
            </template>    
            <template v-slot:item.download="{ item }">              
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="item.download"
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-file-download-outline'" />
                  </v-btn>
                </template>
                <span>下載檔案</span>
              </v-tooltip>
            </template> 
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="dataListPage"
              color="#2F59C4"
              :length="dataListPageCount"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./returnReportPage.js" />