<template>
  <v-container>
    <h2 class="font-bold">代理申請</h2>
    <div class="ml-10">
      <div class="font-18px font-bold">
        <v-row align="center">  
          <v-col cols="1">       
            請假人
          </v-col>         
          <v-col cols="3">
            <v-select
              v-model="selectEmp"
              outlined
              :items="empOpt"
              dense
              hide-details
              placeholder="請選擇員工"
              item-text="empName"
              :return-object="true"
              @change="changeEmp()"
            >
              <template v-slot:selection="data">
                <span>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.dept }})</span>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.dept }})</v-list-item-content>
                </template>
              </template>
            </v-select>
            <span class="red--text font-14px">{{ errMsg.selectEmp }}</span>
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">       
            代理人
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selectAgent"
              outlined
              :items="agentOpt"
              hide-details=""
              :return-object="true"
              dense
              item-text="empName"
              placeholder="請選擇代理人"
              @change="checkAgent()"
            >
              <template v-slot:selection="data">
                <span>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.dept }})</span>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.dept }})</v-list-item-content>
                </template>
              </template>
            </v-select>
            <span class="red--text font-14px">{{ errMsg.selectAgent }}</span>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1">
            請假起日
          </v-col>
          <v-col cols="3" class="d-flex">
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
                  dense
                  hide-details
                  v-bind="attrs"
                  style="width:100%"
                  v-on="on"                  
                />
              </template>
              <v-date-picker
                v-model="startDate"
                :min="sysDate"
                @input="menu1 = false"
                @change="changeStartDate()"
              />
            </v-menu>
            <v-select
              v-model="startHour"
              :items="hourOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              class="my-auto ml-2 font-14px"
              color="#ADADAD"
              @change="changeStartDate()"
            />            
            <span class="mt-2 ml-1 mr-1">時</span>
            <v-select
              v-model="startMin"
              :items="minOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              class="my-auto font-14px"
              color="#ADADAD"
              @change="changeStartDate()"
            />        
            <span class="mt-2 ml-1">分</span>
          </v-col>
          <v-col cols="1" />
          <v-col cols="1">
            請假迄日
          </v-col>
          <v-col cols="3" class="d-flex">
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
                  dense
                  hide-details
                  v-bind="attrs"
                  style="width:100%"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                :min="sysDate"
                @input="menu2 = false"
                @change="changeEndDate()"
              />
            </v-menu>
            <v-select
              v-model="endHour"
              :items="hourOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              class="my-auto ml-2 font-14px"
              color="#ADADAD"
              @change="changeEndDate()"
            />            
            <span class="mt-2 ml-1 mr-1">時</span>
            <v-select
              v-model="endMin"
              :items="minOption"
              item-text="text"
              :return-object="true"
              outlined
              hide-details
              single-line
              dense
              class="my-auto font-14px"
              color="#ADADAD"
              @change="changeEndDate()"
            />        
            <span class="mt-2 ml-1">分</span>
          </v-col>
          <v-col cols="3" />
          <v-col cols="1" />
          <v-col cols="3" style="margin-top:-25px">
            <span class="red--text font-14px">{{ errMsg.selectDate }}</span>
          </v-col>
        </v-row>
      
        <v-row>
          <v-col cols="11" />
          <v-col>
            <v-btn color="success" class="ml-3" @click="submit()">&emsp;請假&emsp;</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <hr class="mt-6 mb-5">
    <v-row class="ml-5">
      <h3 class="font-bold">個人資訊</h3>
    </v-row>
    <div class="ml-10">
      <div class="font-18px">
        <v-row align="center">   
          <v-col cols="2" class="font-bold">       
            目前狀態
          </v-col>          
          <v-col cols="3">
            {{ empInfo.status }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2" class="font-bold">       
            代理人
          </v-col>          
          <v-col cols="3">
            {{ empInfo.agent }}&emsp;{{ empInfo.agentName }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2" class="font-bold">       
            下一次請假時間
          </v-col>          
          <v-col cols="3">
            {{ empInfo.nextLeaveStartDate }}~{{ empInfo.nextLeaveEndDate }}
          </v-col>
        </v-row>
        <v-row align="center">   
          <v-col cols="2" class="font-bold">       
            下一次請假代理人
          </v-col>          
          <v-col cols="3">
            {{ empInfo.nextAgent }}&emsp;{{ empInfo.nextAgentName }}
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>
<script src="./inquireLeavePage.js" />