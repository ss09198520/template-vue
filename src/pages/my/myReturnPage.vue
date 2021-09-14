<template>
  <v-app>
    <v-container>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">案件退件</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ caseReturnCount }}</span>件</div>
          </div>
        </div>
      </div>
      <span class="annotation">案件退件區同課皆可看到，請選擇相關操作即可</span>
      <hr class="mb-3">
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="caseHeaders"
            :items="caseList"
            :page.sync="caseListPage"
            :items-per-page="5"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            disable-sort
            @page-count="caseListPageCount = $event"
          >
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.remain" color="success">補證操作</v-btn>
              <v-btn v-if="item.cancel" color="error" style="margin: 3px;">取消案件</v-btn>
              <v-btn v-if="item.view" color="primary">瀏覽案件</v-btn>
            </template>
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="caseListPage"
              color="#2F59C4"
              :length="caseListPageCount"
            />
          </div>
        </v-col>
      </v-row>
      <div class="d-flex w-100" style="margin-top: 20px;">
        <div class="block mr-5 w-100">
          <div>
            <div class="text-center block-title fw-6 mb-2">多媒體退件</div>
          </div>
          <div>
            <div class="block-content"><span class="block-number">{{ multiMediaReturnCount }}</span>件</div>
          </div>
        </div>
      </div>
      <span class="annotation">多媒體退件區同權限者皆可看到，請選擇相關操作即可</span>
      <hr class="mb-3">
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="multiMediaHeaders"
            :items="multiMediaList"
            :page.sync="multiMediaListPage"
            :items-per-page="5"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            disable-sort
            @page-count="multiMediaListPageCount = $event"
          >
            <template v-slot:item.action="{ item }">
              <v-btn v-if="item.edit" color="success" style="margin: 3px;">重新編輯</v-btn>
              <v-btn v-if="item.cancel" color="error">取消案件</v-btn>
            </template>
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="multiMediaListPage"
              color="#2F59C4"
              :length="multiMediaListPageCount"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
    name: 'MyReturn',
    props: {
    
    },
    data() {
        return {
            caseReturnCount: 2,
            multiMediaReturnCount: 3,
            caseHeaders: [
                { text: '狀態操作', value: 'action', align: 'center' },
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },          
                { text: '原受理人', value: 'acceptUser', align: 'center' },
                { text: '原受理人姓名', value: 'acceptName', align: 'center' }
            ],
            caseList: [
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00028', returnDate: '20210910 15:00', reason: '證件不清楚', desc: '現役軍人眷屬身分證圖片不清楚，須補證件', acceptItem: 'QA210  軍眷用電申請優待', acceptUser: '1050334016', acceptName: '李小凡'},
                {action: true, remain: true, cancel: true, view: true, acceptNumber: 'A00633', returnDate: '20210910 16:45', reason: '佐證文件不足', desc: '須提供XXX佐證文件', acceptItem: 'F3030  表燈非時間電價停用廢止', acceptUser: '1050334017', acceptName: '葉星辰'}
            ],
            multiMediaHeaders: [
                { text: '狀態操作', value: 'action', align: 'center' },
                { text: '送件編號', value: 'sendNumber', align: 'center' },
                { text: '退件日期', value: 'returnDate', align: 'center' },
                { text: '退件原因', value: 'reason', align: 'center' },
                { text: '退件說明', value: 'desc', align: 'center' },  
                { text: '送審項目', value: 'sendItem', align: 'center' },          
                { text: '原受理人', value: 'acceptUser', align: 'center' },
                { text: '原受理人姓名', value: 'acceptName', align: 'center' }
            ],
            multiMediaList: [
                { action: true, edit: true, cancel: true, sendNumber: 'M00001', returnDate: '20210910 15:00', reason: '文字修改', desc: '文字錯誤請重新修改', sendItem: '跑馬燈', acceptUser: '1050330001', acceptName: '林美美' },
                { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '20210910 15:00', reason: '影片、圖片錯誤', desc: '文字錯誤請重新修改', sendItem: '節目單', acceptUser: '1050330002', acceptName: '王曉花' },
                { action: true, edit: true, cancel: true, sendNumber: 'P00001', returnDate: '20210910 15:00', reason: '文字修改', desc: '文字錯誤請重新修改', sendItem: '滿意度調查', acceptUser: '1050330003', acceptName: '李小凡' }
            ],
            caseListPage: 1,
            caseListPageCount: 1,
            multiMediaListPage: 1,
            multiMediaListPageCount: 1
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
    
    .annotation {
        color: gray;
        font-size: 16px;
    }
</style>