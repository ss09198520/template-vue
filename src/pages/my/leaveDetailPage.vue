<template>
  <v-container>
    <h2 class="font-bold">請假查詢</h2>
    <v-row class="ml-5">
      <h3 class="font-bold">查詢條件</h3>
    </v-row>
    <div class="ml-10">
      <div class="font-18px font-bold">
        <v-row align="center">  
          <v-col cols="1">       
            請假人
          </v-col>         
          <v-col cols="3">
            <v-select
              outlined
              :items="employeeList"
              dense
              hide-details
              placeholder="請選擇員工"
            />
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">       
            代理人
          </v-col>
          <v-col cols="3">
            <v-select
              outlined
              :items="employeeList"
              hide-details=""
              dense
              placeholder="請選擇代理人"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            請假區間
          </v-col>
          <v-col cols="3" class="d-flex">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
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
                  dense
                  hide-details
                  v-bind="attrs"
                  style="width:100%"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                @input="menu1 = false"
              />
            </v-menu>
            <div class="mt-1">~</div>
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
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
                  dense
                  hide-details
                  v-bind="attrs"
                  style="width:100%"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                @input="menu2 = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            假別
          </v-col>
          <v-col cols="3">
            <v-select
              outlined
              :items="leaveTypeList"
              :return-object="true"
              hide-details
              single-line
              dense
              placeholder="請選擇假別"
              class="my-auto"
              color="#ADADAD"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            請假原因
          </v-col>
          <v-col cols="3">
            <v-text-field                           
              outlined
              hide-details
              dense
              placeholder="請輸入請假原因"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="success" class="ml-3"><v-icon style="margin-right: 3px;">mdi-plus</v-icon>請假</v-btn>
        </v-row>
      </div>
    </div>
    <hr class="mt-6 mb-5">
    <v-row class="ml-5">
      <h3 class="font-bold">個人資訊</h3>
    </v-row>
    <div class="ml-10">
      <div class="font-18px font-bold">
        <v-row align="center">   
          <v-col cols="2">       
            目前狀態
          </v-col>          
          <v-col cols="3">
            {{ status }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2">       
            代理人
          </v-col>          
          <v-col cols="3">
            {{ agent }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2">       
            下一次請假時間
          </v-col>          
          <v-col cols="3">
            {{ nextLeave }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2">       
            下一次請假代理人
          </v-col>          
          <v-col cols="3">
            {{ nextLeaveAgent }}
          </v-col>
        </v-row>
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
            endDate: '',
            status: '請假中',
            agent: '代理人  1050334015 王大明',
            nextLeave: '2021/10/12 08:00 - 18:00',
            nextLeaveAgent: '1050334018	 趙元智'
        }
    },
    methods: {
        
    }
}
</script>