<template>
  <v-container>
    <h2 class="font-bold">PMC 設備所在區處設定</h2>
    <v-row class="ml-10">
      <v-col class="ml-10 font-18px" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation class="ml-10 font-weight-bold">
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              區處
              <span class="red--text ml-2">*</span>
            </v-col>
            <v-col cols="7" md="6">
              <v-select
                v-model="postForm.regionInfo"
                :items="regionAndComputerIpOption"
                :rules="rules.requiredRule"
                item-text="regionName"
                color="accent"
                outlined
                hide-details
                dense
                clearable
                :return-object="true"
                placeholder="請選擇安裝的服務區處"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" md="2"> 電 腦 IP </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="postForm.computerIp"
                :rules="rules.requiredRule"
                :hide-details="hideDatails"
                color="accent"
                placeholder="請輸入電腦IP"
                outlined
                required
                dense
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
                @click="submit"
              >
                確認新增
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <hr class="mt-6 mb-5">
    <!-- <v-row>
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
        />
        
        <div class="mt-2">
          <v-pagination
            v-model="tableSetting.curPage"
            color="#2F59C4"
            :length="tableSetting.pageCount"
          />
        </div>
      </v-col>
    </v-row> -->
  </v-container>
</template>


<script>
import { addNewPmcComputer ,getPmcComputerIP } from "@/api/pmcVersion";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";
import enums from '@/utils/enums'

const defaultForm = {
  computerIp: null,
  regionInfo: null,
}

export default {
  data() {
    return {
      rules: {
        requiredRule: [(v) => !!v || "此欄位為必填欄位"],
        filesSizeRules: [
          (v) =>
            !v || v.size < 25e6 || "檔案大小超過 25 MB!",
        ],
      },
      //api post data
      postForm: Object.assign({}, defaultForm),
      //區處代碼下拉選單
      regionAndComputerIpOption: enums.regionAndComputerIpOption,
      
      clientIp:null,
      valid: false,
      hideDatails: false,
      
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
      
    };
  },
  computed: {

  },
  beforeMount() {
        this.getClientIP();
  },
  mounted() {

  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('this.postForm',this.postForm)
        // 送後端API
        this.addNewPmcComputer(this.postForm)
      }
    },
    getClientIP() {
      // 送後端API
      this.getPmcComputerIP()
    },

    //Action:新增區處電腦IP設定
    async addNewPmcComputer(postData) {
      const data = await addNewPmcComputer(postData)
      // 驗證是否成功
      if (!data.restData.success) {              
        MessageService.showError(data.restData.message,'新增區處電腦資料');
          return;
      }
      MessageService.showSuccess('新增區處電腦資料')
    },
    //Action:取得區處電腦IP設定
    async getPmcComputerIP() {
      const data = await getPmcComputerIP()
      // 驗證是否成功
      if (!data.restData.success) {              
        MessageService.showError(data.restData.message,'新增區處電腦資料');
          return;
      }
      this.clientIp = data.restData.clientIp
      this.postForm.computerIp = data.restData.clientIp
      MessageService.showSuccess('新增區處電腦資料')
    },
  },
};
</script>