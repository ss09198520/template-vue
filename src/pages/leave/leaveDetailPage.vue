<template>
  <v-container>
    <h2>請假查詢</h2>
    <h3>查詢條件</h3>
    <div>
      <div>
        <v-row align="center">  
          <div style="height: 10px;width: 12px;" />        
          請假人 :          
          <v-col cols="3" style="height: 66px;">
            <v-select
              outlined
              :items="employeeList"
              dense
              placeholder="請選擇員工"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <div style="height: 10px;width: 12px;" />
          代理人 :
          <v-col cols="3" style="height: 66px;">
            <v-select
              outlined
              :items="employeeList"
              dense
              placeholder="請選擇代理人"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <div style="height: 10px;width: 12px;" />
          請假區間 :
          <v-col cols="2" style="height: 76px;">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                @input="menu1 = false"
              />
            </v-menu>
          </v-col>
          <div style="margin:auto 0;">~</div>
          <v-col cols="2" style="height: 76px;">
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                @input="menu2 = false"
              />
            </v-menu>
          </v-col>
        </v-row>
        <v-row align="center">
          <div style="height: 10px;width: 12px;" />
          假別 :
          <v-col cols="3" style="height: 66px;">
            <v-select
              outlined
              :items="leaveTypeList"
              dense
              placeholder="請選擇假別"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <div style="height: 10px;width: 12px;" />
          請假原因 :
          <v-col cols="3" style="height: 66px;">
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder=""
            />
          </v-col>
        </v-row>
        <v-row>            
          <v-btn style="margin-left:12px;">請假</v-btn>
        </v-row>
        <hr style="margin-top: 50px;margin-bottom: 50px;">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th colspan="2" class="header text-center white--text">
                  個人資訊區
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="sub-header">
                  目前狀態
                </th>
                <th class="text-center">
                  請假中
                </th>
              </tr>
              <tr>
                <th class="sub-header">
                  代理人
                </th>
                <th class="text-center">
                  代理人  1050334015 王大明
                </th>
              </tr>
              <tr>
                <th class="sub-header" />
                <th />
              </tr>
              <tr>
                <th class="sub-header">
                  下一次請假時間
                </th>
                <th class="text-center">
                  2021/10/12 08:00 - 18:00
                </th>
              </tr>
              <tr>
                <th class="sub-header">
                  下一次請假代理人
                </th>
                <th class="text-center">
                  1050334018	 趙元智
                </th>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
    name: 'LeaveDetail',
    props: {
    
    },
    data() {
        return {
            employeeList: ['王大明', '葉星辰', '辛吉德', '羅斯柴'],
            leaveTypeList: ['特休', '病假', '事假', '特定假別'],
            startDateMenu: false,
            startDate: '',
            endDateMenu: false,
            endDate: ''
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .header {
        background-color: #1976D2;
    }

    .sub-header {
        width: 200px;
    }

    tbody th {
        border: black 1px solid;
    }
</style>