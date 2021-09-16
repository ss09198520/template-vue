<template>
  <v-app>
    <v-container>
      <h2 class="font-bold mb-5">專用章簽核</h2>
      <v-row class="ml-2">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              fab
              small
              :class="{'primary': displayAll}"
              @click="displayAll = true"
              v-on="on"
            >
              <v-icon v-text="'mdi-text-box-multiple-outline'" />
            </v-btn>
          </template>
          <span>顯示全部</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-2"
              fab
              small
              :class="{'primary': !displayAll}"
              @click="displayAll = false"
              v-on="on"
            >
              <v-icon v-text="'mdi-text-box-search-outline'" />
            </v-btn>
          </template>
          <span>只顯示待簽核</span>
        </v-tooltip>        
      </v-row>
      <hr class="mt-6 mb-5 ml-4 mr-5">
      <v-row class="ma-2">
        <v-col>
          <v-data-table
            :headers="sealSignListHeaders"
            :items="sealSignList"
            :items-per-page="10"
            no-data-text="查無資料"              
            disable-sort
            hide-default-footer
            class="elevation-1"
            :page.sync="sealSignListPage"
            @page-count="sealSignListPageCount = $event"
          >
            <template v-slot:item.mani="{ item }">   
              <div>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
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
                <v-tooltip v-if="!item.status" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="success"
                      @click="sign(item)"
                      v-on="on"
                    >
                      <v-icon v-text="'mdi-account-check-outline'" />
                    </v-btn>
                  </template>
                  <span>簽核</span>
                </v-tooltip>
               
              </div>                                                                         
            </template>           
          </v-data-table>
        </v-col>
      </v-row>
      <!-- 選頁 -->
      <div class="mt-2">
        <v-pagination
          v-model="sealSignListPage"
          color="#2F59C4"
          :length="sealSignListPageCount"
        />
      </div>
    </v-container>
  </v-app>
</template>

<script src="./sealSignOffPage.js"></script>