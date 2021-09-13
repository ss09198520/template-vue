<template>
  <v-app>
    <v-container>
      <h2 class="font-bold">我的待核算</h2>
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
              <v-btn v-if="item.action" color="success">進行核算</v-btn>
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

<script>

export default {
    name: 'MyWaitingAccounting',
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
            dataListPageCount: 1
        }
    },
    methods: {
        
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