<template>
  <v-app>
    <v-container>
      <h2>退件報表</h2>
      <v-row>
        <v-col cols="2" />
        <v-col cols="12" sm="6" md="1">
          <span style="font-size: 25px;">退件日期</span>
        </v-col>
        <v-col cols="12" sm="6" md="2">
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
                v-bind="attrs"
                style="padding-top: 0;"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="before7"
              @input="startDate = false"
            />
          </v-menu>
        </v-col>
        <span style="font-size: 40px;margin-top: 10px;">~</span>
        <v-col cols="12" sm="6" md="2">
          <v-menu
            v-model="endDate"
            :close-on-content-click="false"
            :nudge-right="40"
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
        <v-btn style="margin: auto 2px; margin-left: 100px" color="primary" @click="search()">查詢</v-btn>
      </v-row>
      <hr>
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="headers"
            :items="itemList"
            :disable-sort="true"
            :items-per-page="10"
            no-data-text="查無資料"
          >
            <template v-slot:item.signOff="{ item }">
              <v-btn color="primary" v-if="item.signOff">簽核</v-btn>
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
              <v-btn v-if="item.download" icon style="color: #019858;"><v-icon>mdi-table</v-icon></v-btn>
              <v-btn v-else style="color:gray" icon disabled><v-icon>mdi-table</v-icon></v-btn>
            </template> 
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
    name: 'ReturnReport',
    props: {
    
    },
    data: () => ({
        startDate: false,
        endDate: false,
        // startDate 設定為現在時間往前7天
        before7: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000 + 10080000)).toISOString().substr(0, 10),
        // endDate 設定為現在時間
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        headers: [
            { text: '簽核', value: 'signOff', align: 'center' },
            { text: '退件日期', value: 'returnDate', align: 'center' },
            { text: '區處', value: 'region', align: 'center' },
            { text: '主辦業務計劃員簽核時間', value: 'signOffDate1', align: 'center' },
            { text: '核算課長簽核時間', value: 'signOffDate2', align: 'center' },            
            { text: '下載', value: 'download', align: 'center' }
        ],
        itemList: [
            {signOff: false, returnDate: '2021/09/06 ~ 2021/09/12', region: '台中', signOffDate1: '2021/09/17 13:00:26', signOffDate2: '2021/09/18 10:36:53', download: true},
            {signOff: true, returnDate: '2021/09/13 ~ 2021/09/19', region: '台中', signOffDate1: '', signOffDate2: '', download: true}
        ]
    }),
    mounted() {

    },
    methods: {
        search(){

        }
    }
}
</script>