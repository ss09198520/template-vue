<template>
  <v-container>
    <h2 class="font-bold">PMC 版本查詢</h2>
    <v-row class="ml-10">
      <v-col class="ml-10 font-18px" cols="12">
        <v-form ref="form" class="ml-10 font-weight-bold">
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="1" md="1"> 單位 </v-col>
            <v-col cols="4" md="3">
              <v-select
                v-model="searchParam.divisionCode"
                :items="divisionList"
                color="accent"
                outlined
                hide-details
                dense
                item-value="divisionCode"
                item-text="divisionName"
                placeholder="請選擇單位"
                :clearable="
                  divisionList != null && divisionList.length === 1
                    ? false
                    : true
                "
                @change="chooseDivision()"
              />
            </v-col>
            <v-col cols="1" md="1"> 組別 </v-col>
            <v-col cols="4" md="3">
              <v-select
                v-model="searchParam.groupCode"
                :items="groupList"
                color="accent"
                outlined
                hide-details
                dense
                item-value="groupCode"
                item-text="groupName"
                placeholder="請選擇組別"
                :clearable="
                  groupList != null && groupList.length === 1 ? false : true
                "
                @change="chooseGroup()"
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="1" md="1"> 課別 </v-col>
            <v-col cols="4" md="3">
              <v-select
                v-model="searchParam.sectionCode"
                :items="sectionList"
                color="accent"
                outlined
                hide-details
                dense
                item-value="sectionCode"
                item-text="sectionName"
                placeholder="請選擇課別"
                :clearable="
                  sectionList != null && sectionList.length === 1 ? false : true
                "
              />
            </v-col>
            <v-col cols="1" md="1"> 狀態 </v-col>
            <v-col cols="4" md="3">
              <v-select
                v-model="searchParam.statusCode"
                :items="pmcStatusList"
                color="accent"
                outlined
                hide-details
                dense
                item-value="statusCode"
                item-text="statusName"
                placeholder="請選擇更新狀態"
                :clearable="
                  pmcStatusList != null && pmcStatusList.length === 1
                    ? false
                    : true
                "
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="1" md="1"> Host </v-col>
            <v-col cols="4" md="3">
              <v-text-field
                v-model="searchParam.hostName"
                hideDatails
                color="accent"
                placeholder="請輸入 Hostname"
                outlined
                dense
              />
            </v-col>
            <v-col cols="5" md="4" style="margin-top: 10px">
              <v-row class="d-flex justify-end">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="primary"
                      @click="queryPmcComputer"
                      v-on="on"
                    >
                      <v-icon v-text="'mdi-magnify'" />
                    </v-btn>
                  </template>
                  <span>查詢</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-2"
                      fab
                      small
                      color="accent"
                      @click="resetSearchParam"
                      v-on="on"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>清空查詢</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <hr class="mt-6 mb-5" />
    <v-row>
      <v-col md="12">
        <v-data-table
          item-key="pmcComputerTable"
          :headers="pmcComputerTableHeader"
          :items="pmcComputerList"
          :items-per-page="tableSetting.pageSize"
          :page.sync="tableSetting.curPage"
          :footer-props="{
            showFirstLastPage: true,
          }"
          disable-sort
          class="font-weight-bold elevation-1"
          hide-default-footer
          no-data-text="查無資料"
          @page-count="tableSetting.pageCount = $event"
        >
        </v-data-table>
        <div class="mt-2">
          <v-pagination
            v-model="tableSetting.curPage"
            color="#2F59C4"
            :length="tableSetting.pageCount"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {
  fetchInitPmcComputerListData,
  fetchSearchPmcComputerList,
} from "@/api/pmcVersion";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";
export default {
  data() {
    return {
      rules: {
        requiredRule: [(v) => !!v || "此欄位為必填欄位"],
      },
      pmcTypeList: [],
      divisionList: [],
      groupList: [],
      sectionList: [],
      pmcStatusList: [],
      pmcComputerList: [],
      tableSetting: {
        pageSize: 10,
        curPage: 1,
        pageCount: 1,
      },
      pmcComputerTableHeader: [
        {
          text: "單位",
          value: "division",
          align: "center",
        },
        {
          text: "組別",
          value: "group",
          align: "center",
        },
        {
          text: "課別",
          value: "section",
          align: "center",
        },
        {
          text: "Hostname",
          value: "hostName",
          align: "center",
        },
        {
          text: "更新狀態",
          value: "status",
          align: "center",
        },
        {
          text: "更新時間",
          value: "updateDate",
          align: "center",
        },
        {
          text: "目前版本 MD5",
          value: "versionMd5",
          align: "center",
        },
      ],
      searchParam: {
        division: null,
        group: null,
        section: null,
        hostName: null,
        pmcStatus: null,
      },
    };
  },
  computed: {},
  beforeMount() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      // init List and Table Data
      fetchInitPmcComputerListData()
        .then((res) => {
          if (res.rtnCode == "00000") {
            // set dropdown list data
            // this.pmcTypeList = res.restData.pmcTypeList; 待確認是否要保留
            this.divisionList = res.restData.divisionList;
            this.groupList = res.restData.groupList;
            this.sectionList = res.restData.sectionList;
            this.pmcStatusList = res.restData.pmcStatusList;
          } else {
            MessageService.showError(res.rtnMsg);
          }
        })
        .catch((error) => {
          MessageService.showError(error);
          console.log(error);
        });
    },

    queryPmcComputer() {
      // 送後端API
      fetchSearchPmcComputerList(this.searchParam)
        .then((res) => {
          if (res.rtnCode == "00000") {
            this.pmcComputerList = res.restData.pmcComputerList;
          } else {
            MessageService.showError(res.rtnMsg);
          }
        })
        .catch((error) => {
          MessageService.showError(error);
          console.log(error);
        });
    },

    resetSearchParam() {
      // 清空查詢條件
      this.searchParam = {
        division: null,
        group: null,
        section: null,
        hostName: null,
        pmcStatus: null,
      };
      this.pmcComputerList = [];
    },
  },
};
</script>
<style lang="scss" scoped>
</style>