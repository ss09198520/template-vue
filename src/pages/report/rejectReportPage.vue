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
                v-model="openStartDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
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
                  v-model="startDate"
                  @input="openStartDate = false"
                />
              </v-menu>
              <div class="mt-1">~</div>
              <v-menu
                v-model="openEndDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
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
                  v-model="endDate"
                  @input="openEndDate = false"
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
                    @click="search()"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>&nbsp;查詢&nbsp;</span>
              </v-tooltip>
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
            <template v-slot:item.salesPlannerSignDateStr="{ item }">
              <v-tooltip v-if="item.needSalesPlannerSign" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    v-on="on"
                    @click="signOff(item.fileNo, 'AUTH01')"
                  >
                    <v-icon v-text="'mdi-account-check-outline'" />
                  </v-btn>
                </template>
                <span>簽核</span>
              </v-tooltip>
              <span v-else-if="item.salesPlannerSignDateStr" style="color: gray;">{{ item.salesPlannerSignDateStr }}</span>
              <span v-else>未簽核</span>
            </template>           
            <template v-slot:item.leaderSignDateStr="{ item }">
              <v-tooltip v-if="item.needLeaderSign" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    v-on="on"
                    @click="signOff(item.fileNo, 'AUTH07')"
                  >
                    <v-icon v-text="'mdi-account-check-outline'" />
                  </v-btn>
                </template>
                <span>簽核</span>
              </v-tooltip>
              <span v-else-if="item.leaderSignDateStr">{{ item.leaderSignDateStr }}</span>
              <span v-else>未簽核</span>
            </template>    
            <template v-slot:item.download="{ item }">              
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="primary"
                    v-on="on"
                    @click="download(item.fileNo)"
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

<script src="./rejectReportPage.js" />