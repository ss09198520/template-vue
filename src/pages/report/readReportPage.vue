<template>
  <v-app>
    <v-container>
      <h2>調閱清單</h2>
      <v-row>
        <v-col cols="2" />
        <v-col cols="12" sm="6" md="1">
          <span style="font-size: 25px;">調閱月份</span>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-menu
            ref="menu"
            v-model="monthPicker"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                append-icon="mdi-calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              type="month"
              no-title
              scrollable
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
              <v-btn v-if="item.signOff" color="primary">簽核</v-btn>
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
            <template v-slot:item.signOffDate3="{ item }">
              <span v-if="!item.signOffDate3" style="color: gray;">未簽核</span>
              <span v-else>{{ item.signOffDate3 }}</span>
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
    name: 'ReadReport',
    props: {
    
    },
    data() {
        return {
          date: new Date().toISOString().substr(0, 7),
          monthPicker: false,
          headers: [
            { text: '簽核', value: 'signOff', align: 'center' },
            { text: '調閱月份', value: 'readMonth', align: 'center' },
            { text: '區處', value: 'region', align: 'center' },
            { text: '調閱管理員簽核時間', value: 'signOffDate1', align: 'center' },
            { text: '核算課長簽核時間', value: 'signOffDate2', align: 'center' },  
            { text: '電費經理簽核時間', value: 'signOffDate3', align: 'center' },          
            { text: '下載', value: 'download', align: 'center' }
          ],
          itemList: [
            {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/01 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
            {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/10/01 14:14:42', signOffDate2: '', signOffDate3: '', download: true}
          ]
        }
    },
    methods: {

    }
}
</script>