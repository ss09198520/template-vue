<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">待核算</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ waitingCount }}</span>件</div>
          </div>
        </div>
      </div>
      <hr>
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="headers"
            :items="itemList"
            :page.sync="dataListPage"
            :items-per-page="10"
            disable-sort
            class="elevation-1"
            no-data-text="查無資料"
            hide-default-footer
            @page-count="dataListPageCount = $event"
          >
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.action" color="success" @click="accounting(item)">進行核算</v-btn>
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
    <v-dialog
      v-model="accountingDialog"
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
            @click="browserModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <FormPage :restrict-mode="'audit'" />
        </v-card-text>
        <v-card-actions class="d-end mt-5">
          <v-btn              
            color="error"            
            @click="retrunOrder()"
          >
            &emsp;退件&emsp;
          </v-btn>
          <v-btn              
            color="success"            
            @click="checkSubmit()"
          >
            核算通過
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            <v-col cols="3">
              退件原因
            </v-col>
            <v-col cols="7">
              <v-text-field
                outlined
                hide-details                                         
                dense
                placeholder="請輸入退件原因"
              />
            </v-col>
          </v-row>
          <v-row class="ml-1" align="center">
            <v-col cols="3">
              退件說明
            </v-col>
            <v-col cols="7">
              <v-textarea            
                color="#ADADAD"
                outlined
                name="input-7-4"
                :no-resize="true"
                placeholder="請輸入退件說明"
                hide-details
              />
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
  </v-app>
</template>

<script>
import FormPage from '@/pages/FormPage/FormPage.vue';
import MessageService from "@/assets/services/message.service";

export default {
    name: 'MyWaitingAccounting',
    components: {
      FormPage
    },
    props: {
    
    },
    data() {
        return {
            waitingCount: 5,
            headers: [
                { text: '狀態操作', value: 'action', align: 'center' },
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'completeDate', align: 'center' },
                { text: '登記單種類', value: 'category', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' }
            ],
            itemList: [
                {action: true, acceptNumber: 'A00028', acceptDate: '20210910 10:00', completeDate: '20210910 16:00', category: 'APR0370', acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00615', acceptDate: '20210909 11:21', completeDate: '20210909 15:21', category: 'APR0200', acceptItem: 'I0510  故障換表'},
                {action: true, acceptNumber: 'A00040', acceptDate: '20210907 15:36', completeDate: '20210908 15:06', category: 'APR0200', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605', acceptDate: '20210910 09:45', completeDate: '20210915 10:50', category: 'APR0160', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619', acceptDate: '20210910 13:44', completeDate: '20210910 15:26', category: 'APR0200', acceptItem: 'I0510  故障換表'}
            ],
            dataListPage: 1,
            dataListPageCount: 1,
            accountingDialog: false,
            returnReasonModel: false,
            selectIndex: null,
        }
    },
    methods: {
        accounting(item) {
          this.selectIndex = this.itemList.indexOf(item);
          this.accountingDialog = true;
        },
        retrunOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
           if (this.selectIndex > -1) {
                this.itemList.splice(this.selectIndex, 1);
              }
            this.returnReasonModel = false;
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
            MessageService.showSuccess("退件成功✓");
        },
        checkSubmit(){
           if (this.selectIndex > -1) {
                this.itemList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("核算成功✓");
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
        }
    }
}
</script>

<style scoped>
    .block {
        height: 250px;
        padding: 18px;
        position: relative;
    }

    .block .block-content {
        font-size: 24px;
        font-weight: 700;
        height: 100px;
        white-space: pre-wrap;
    }

    .block .block-title {
        font-size: 36px;
        font-weight: bold;
    }

    .block .block-number {
        font-weight: bold;
        font-size: 96px;
        margin-right: 20px;
    }
</style>