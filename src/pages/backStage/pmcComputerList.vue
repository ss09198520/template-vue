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
                @change="chooseDivision(searchParam.divisionCode)"
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
                @change="chooseGroup(searchParam.divisionCode,searchParam.groupCode)"
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
            <v-col cols="1" md="1"> 類型 </v-col>
            <v-col cols="4" md="3">
              <v-select
                v-model="searchParam.pmcType"
                :items="pmcTypeList"
                color="accent"
                outlined
                hide-details
                dense
                item-value="typeCode"
                item-text="typeName"
                placeholder="請選擇 PMC 類型    "
                :clearable="
                  pmcTypeList != null && pmcTypeList.length === 1
                    ? false
                    : true
                "
              />
            </v-col>
            <v-col cols="1" md="1"> Host </v-col>
            <v-col cols="4" md="3">
              <v-text-field
                v-model="searchParam.hostName"
                hideDatails
                color="accent"
                placeholder="請輸入 Hostname"
                outlined
                dense
                style="height: 40px;"
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start mt-3">
              <v-col cols="9" md="8" style="margin-top: 10px">
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
      pmcTypeNameMap:{},
      divsionNameMap:{},
      groupNameMap:{},
      sectionNameMap:{},
      pmcStatusNameMap:{},
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
        {
          text: "PMC 類型",
          value: "pmcType",
          align: "center",
        },
      ],
      searchParam: {
        divisionCode: null,
        groupCode: null,
        sectionCode: null,
        hostName: null,
        statusCode: null,
        pmcType: null,
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
            this.pmcTypeList = res.restData.pmcTypeList;
            this.divisionList = res.restData.divisionList;
            this.pmcStatusList = res.restData.pmcStatusList;
            this.initNameMap();
          } else {
            MessageService.showError(res.rtnMsg);
          }
        })
        .catch((error) => {
          MessageService.showError(error);
          console.log(error);
        });
    },
    
    initNameMap() {
        // reset data 
        this.divsionNameMap = {};
        this.groupNameMap = {};
        this.sectionNameMap = {};
        this.pmcStatusNameMap = {};
        this.pmcTypeNameMap = {};
        if(!ValidateUtil.isEmpty(this.divisionList)){
            // list to map
            let divCode = '';   
            let grpCode = '';
            let secCode = ''
            for(let i in this.divisionList){
                const dCode = this.divisionList[i].divisionCode;
                const dName = this.divisionList[i].divisionName;
                divCode = dCode;
                console.log('[' + divCode +"] [" + dName + "]")
                this.divsionNameMap[dCode] = dName;
                for(let index in this.divisionList[i].groupSectionList){
                    const gCode = this.divisionList[i].groupSectionList[index].groupCode;
                    const gName = this.divisionList[i].groupSectionList[index].groupName;
                    grpCode = dCode + gCode;
                    console.log('|---- [' + grpCode +"] [" + gName + "]")
                    this.groupNameMap[grpCode] = gName;
                    // initSectionMap
                    for(let idx in this.divisionList[i].groupSectionList[index].sectionList){
                        const sCode = this.divisionList[i].groupSectionList[index].sectionList[idx].sectionCode;
                        const sName = this.divisionList[i].groupSectionList[index].sectionList[idx].sectionName;
                        secCode = dCode + gCode + sCode
                        console.log('|     |------ [' + secCode +"] [" + sName + "]")
                        this.sectionNameMap[secCode] = sName;
                    }
                }
            }
            console.log(this.divsionNameMap)
            console.log(this.groupNameMap)
            console.log(this.sectionNameMap)
        }
        if(!ValidateUtil.isEmpty(this.pmcStatusList)){
            this.pmcStatusList.forEach( s => this.pmcStatusNameMap[s.statusCode] = s.statusName)
        }
        if(!ValidateUtil.isEmpty(this.pmcTypeList)){
            this.pmcTypeList.forEach( s => this.pmcTypeNameMap[s.typeCode] = s.typeName)
        }
    },

    queryPmcComputer() {
      // 送後端API
      fetchSearchPmcComputerList(this.searchParam)
        .then((res) => {
          if (res.rtnCode == "00000") {
            this.pmcComputerList = res.restData.pmcComputerList;    
            this.pmcComputerList.forEach(
                v => {
                    let dCode = v.division;
                    let gCode = dCode + v.group;
                    let sCode = gCode + v.section;
                    console.log(dCode);
                    console.log(gCode);
                    console.log(sCode);
                    if(!ValidateUtil.isEmpty(this.divsionNameMap[dCode])) v.division = this.divsionNameMap[dCode];
                    if(!ValidateUtil.isEmpty(this.groupNameMap[gCode])) v.group = this.groupNameMap[gCode];
                    if(!ValidateUtil.isEmpty(this.sectionNameMap[sCode])) v.section = this.sectionNameMap[sCode];
                    if(!ValidateUtil.isEmpty(this.pmcStatusNameMap[v.status])) v.status = this.pmcStatusNameMap[v.status];
                    if(!ValidateUtil.isEmpty(this.pmcTypeNameMap[v.pmcType])) v.pmcType = this.pmcTypeNameMap[v.pmcType];
                }
            )
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
        divisionCode: null,
        groupCode: null,
        sectionCode: null,
        hostName: null,
        statusCode: null,
        pmcType: null,
      };
      this.pmcComputerList = [];
    },

    chooseDivision(division){
        // 先將組/課選項清空
        this.groupList = []; 
        this.sectionList = [];
        this.searchParam.groupCode = null;
        this.searchParam.sectionCode = null;
        
        for(let i in this.divisionList){
            if(division === this.divisionList[i].divisionCode){
                for(let index in this.divisionList[i].groupSectionList){
                    this.groupList.push({
                        groupCode: this.divisionList[i].groupSectionList[index].groupCode,
                        groupName: this.divisionList[i].groupSectionList[index].groupName,
                    })
                }
            }
        }
    },

    chooseGroup(division,group){
        // 先將課選項清空
        this.sectionList = [];
        this.searchParam.sectionCode = null;

        for(let i in this.divisionList){
            if(division === this.divisionList[i].divisionCode){
                for(let index in this.divisionList[i].groupSectionList){
                    if(group === this.divisionList[i].groupSectionList[index].groupCode){
                        this.sectionList = this.divisionList[i].groupSectionList[index].sectionList;
                    }
                }
            }
        }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>