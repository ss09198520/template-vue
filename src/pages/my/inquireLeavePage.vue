<template>
  <v-container>
    <h2 class="font-bold">代理申請</h2>
    <div v-if="hasMgmtAuth" class="ml-10">
      <div class="font-18px font-bold">
        <v-row align="center">  
          <v-col cols="1">       
            請假人
          </v-col>         
          <v-col cols="3">
            <v-select
              v-model="selectEmp"
              outlined
              :items="empList"
              dense
              hide-details
              placeholder="請選擇員工"
              item-text="empName"
              :return-object="true"
              @change="changeEmp()"
            >
              <template v-slot:selection="data">
                <span>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.deptName }})</span>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.deptName }})</v-list-item-content>
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
              :items="agentList"
              hide-details=""
              :return-object="true"
              dense
              item-text="empName"
              placeholder="請選擇代理人"
              @change="checkAgent()"
            >
              <template v-slot:selection="data">
                <span>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.deptName }})</span>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>{{ data.item.empNo }}&nbsp;{{ data.item.empName }}({{ data.item.deptName }})</v-list-item-content>
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
    <hr v-if="hasMgmtAuth" class="mt-6 mb-5">
    <div class="mt-10">
      <v-row class="ml-5">
        <h3 class="font-bold">個人資訊</h3>
      </v-row>
      <div class="ml-10">
        <div class="font-18px">
          <v-row align="center">   
            <v-col cols="2" class="font-bold mt-5">       
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
            <v-col v-if="empInfo.agent != null" cols="3">
              {{ empInfo.agent }}&emsp;{{ empInfo.agentName }}
            </v-col>
            <v-col v-if="empInfo.agent == null" cols="3">
              無
            </v-col>
          </v-row>
          <v-row align="center">   
            <v-col cols="2" class="font-bold">       
              下一次請假時間
            </v-col> 
            <v-col v-if="empInfo.agentName != null" cols="3">
              {{ empInfo.nextLeaveStartDate }}~{{ empInfo.nextLeaveEndDate }}
            </v-col>
            <v-col v-if="empInfo.agentName == null" cols="3">
              無請假紀錄
            </v-col>
          </v-row>
          <v-row align="center">   
            <v-col cols="2" class="font-bold">       
              下一次請假代理人
            </v-col>          
            <v-col v-if="empInfo.nextAgent != null" cols="3">
              {{ empInfo.nextAgent }}&emsp;{{ empInfo.nextAgentName }}
            </v-col>
            <v-col v-if="empInfo.nextAgent == null" cols="3">
              無請假紀錄
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <!-- 代理超過兩層的提醒視窗 -->
    <v-dialog
      v-model="alert.overTwoTiers"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          提醒
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="alert.overTwoTiers = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px red--text">
          <v-row class="mt-6 ml-1 font-bold">
            {{ alert.overTwoTiersMsg }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="primary"            
            @click="alert.overTwoTiers = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 選擇的代理人在該請假範圍也請假提醒視窗 -->
    <v-dialog
      v-model="alert.isAgentLeave"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          提醒
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="alert.isAgentLeave = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px red--text">
          <v-row class="mt-6 ml-1 font-bold">
            {{ alert.isAgentLeaveMsg }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="primary"            
            @click="alert.isAgentLeave = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 該代理人以代理超過兩位員工提醒視窗 -->
    <v-dialog
      v-model="alert.agentOverTwice"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          提醒
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="alert.agentOverTwice = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px red--text">
          <v-row class="mt-6 ml-1 font-bold">
            {{ alert.agentOverTwiceMsg }}
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="primary"            
            @click="alert.agentOverTwice = false"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>  
</template>
<script src="./inquireLeavePage.js" />