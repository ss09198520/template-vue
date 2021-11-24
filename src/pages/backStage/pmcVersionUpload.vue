<template>
  <v-container>
    <h2 class="font-bold">PMC 版本上傳</h2>
    <v-row class="ml-10">
      <v-col class="ml-10 font-18px" cols="12">
        <v-form ref="form" class="ml-10 font-weight-bold">
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              PMC 類型
              <span class="red--text ml-2">*</span>
            </v-col>
            <v-col cols="7" md="6">
              <v-select
                v-model="pmcType"
                :items="pmcTypeList"
                :rules="rules.requiredRule"
                color="accent"
                outlined
                hide-details
                dense
                :return-object="true"
                item-text="typeName"
                placeholder="請選擇 PMC 類型"
                :clearable="pmcTypeList.length === 1 ? false : true"
                @change="choosePmcType()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" md="2"> PMC 檔案上傳 </v-col>
            <v-col cols="6" md="6">
              <v-file-input
                v-model="file"
                :rules="rules.filesSizeRules"
                type="file"
                color="accent"
                label="點擊上傳檔案"
                outlined
                dense
                accept=".zip"
                persistent-hint
                prepend-inner-icon="mdi-cloud-upload"
                prepend-icon
                show-size
                counter
                chips
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end" cols="8" md="8">
              <v-btn
                class="ma-1"
                depressed
                color="success"
                :disabled="false"
                @click="submitPmcUpload"
              >
                確認上傳
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <hr class="mt-6 mb-5" />
    <v-row>
      <v-col md="12">
        <v-data-table
          item-key="pmcVersionTable"
          :headers="pmcVersionTableHeader"
          :items="pmcTableView"
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
import { fetchInitVersionData, fetchUploadPmcVersion } from "@/api/pmcVersion";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";
export default {
  data() {
    return {
      rules: {
        requiredRule: [(v) => !!v || "此欄位為必填欄位"],
        filesSizeRules: [
          (v) =>
            !v || v.size < 25e6 || "Avatar size should be less than 25 MB!",
        ],
      },
      pmcTypeList: [],
      pmcVersionList: [],
      pmcTableView: [],
      tableSetting: {
        pageSize: 10,
        curPage: 1,
        pageCount: 1,
      },
      pmcVersionTableHeader: [
        {
          text: "PMC 類型",
          value: "pmcType",
          align: "center",
        },
        {
          text: "最後更新日期",
          value: "updateTimeStr",
          align: "center",
        },
        {
          text: "MD5",
          value: "versionMd5",
          align: "center",
        },
      ],
      file: null,
      pmcType: null,
    };
  },
  computed: {},
  beforeMount() {
        this.init();
  },
  mounted() {},
  methods: {

    // init
    init() {
      // setDefault
      this.file = null;
      this.pmcType = null;
      // remove validate
      // TODO
      // init List and Table Data
      fetchInitVersionData()
          .then(res => {
            if(res.rtnCode == "00000"){
              this.pmcTypeList = res.restData.pmcTypeList;
              this.pmcVersionList = res.restData.pmcVersionList;
              // render table
              this.filterVersionListByPmcType();
            }else {
              MessageService.showError(res.rtnMsg);
            }          
          })
          .catch(error => {
            MessageService.showError(error);
            console.log(error);
          });
    },

    filterVersionListByPmcType (type){
      if(ValidateUtil.isEmpty(type)){
        this.pmcTableView = Array.from(this.pmcVersionList); 
      }else{
        const rule = event => event.pmcType.includes(type.typeCode);
        this.pmcTableView = Array.from(this.pmcVersionList).filter(rule);
      }
    },

    choosePmcType(){
      this.filterVersionListByPmcType(this.pmcType);
    },

    submitPmcUpload() {
      // 驗證
      const checkInfoMessage = []
      if(ValidateUtil.isEmpty(this.pmcType)){
        checkInfoMessage.push('PMC 類型。');
      }
      if(ValidateUtil.isEmpty(this.file)){
         checkInfoMessage.push('PMC 檔案。');
      }
      if(!ValidateUtil.isEmpty(checkInfoMessage)){
        MessageService.showCheckInfo(checkInfoMessage);
        return; 
      }
      // 組裝資料
      var formData = new FormData();
      formData.append("pmcType", this.pmcType.typeCode);
      formData.append("file", this.file);
      console.log(formData.getAll("properties"));
      // 送後端API
      fetchUploadPmcVersion(formData)
          .then(res => {
            if(res.rtnCode == "00000"){
              MessageService.showSuccess("上傳成功");
              this.init();
            }else {
              MessageService.showError(res.rtnMsg);
            }          
          })
          .catch(error => {
            MessageService.showError(error);
            console.log(error);
          });
    }

  },
};
</script>