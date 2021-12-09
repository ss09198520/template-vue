<template>
  <v-layout wrap>
    <v-flex
      sm12
      lg3
      class="pa-3 mb-3 feature-pane"
    >
      <v-btn
        fab
        small
        absolute
        left
        color="primary"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-btn
        fab        
        small
        absolute
        right
        color="primary"
        @click="$refs.calendar.next()"
      >
        <v-icon
          dark
        >
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <br><br><br>
      <v-select
        v-model="status"
        :items="statusOptions"
        class="font-weight-bold"
        label="狀態"
        @change="getEvents(status,start)"
      />
      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        lazy
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Start Date"
            prepend-icon="mdi-calendar-month"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer />
          <v-btn            
            color="primary"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn            
            color="primary"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-btn
        class="mr-4"
        color="amber"
        @click="setToday"
      >
        Today
      </v-btn>
      <hr class="mt-3">
      <v-row>
        <v-col
          v-for="selfColors in selfColor"
          :key="selfColors.text"
          cols="12" 
          md="12"
          class="pt-2 pb-0"
        >
          <v-list-item-avatar           
            tile
            size="20"
            :color="selfColors.value"
            class="ml-0 mt-1"
          />
          <span class="font-weight-bold mr-3"> {{ selfColors.text }}</span>          
        </v-col>
      </v-row>
    </v-flex>
    <v-flex
      sm12
      lg9
      class="pl-3"
    >
      <v-toolbar-title v-if="$refs.calendar" class="d-flex justify-center font-weight-bold">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
      <v-sheet height="1050">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"  
          :color="color"
          :event-overlap-mode="mode"
          :events="events"
          @change="getEvents(status,start)"
        />
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import { fetchActiveProgramCalendar } from "@/api/program"; 
import MessageService from "@/assets/services/message.service";

  const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

  export default {
    
    data: () => ({
      dark: false,
      startMenu: false,
      start: new Date().toISOString().substr(0, 10),
      events: [],
      more: false,
      mode: 'column',
      modes: ['stack', 'column'],
      type: 'month',
      weekdays: weekdaysDefault,
      status:'請選擇',
      statusOptions: ['請選擇','上架','下架','未上架:審核中','未上架:審核完成','未上架:退件','未上架:草稿'],
      selfColor: [
        { text: '上架', value: 'green darken-2' },
        { text: '下架', value: 'grey lighten-1' },
        { text: '未上架:退件', value: 'red' },
        { text: '未上架:審核中', value: 'light-blue accent-1' },
        { text: '未上架:審核完成', value: 'cyan darken-4' },
        { text: '未上架:草稿', value:'yellow darken-1'}
      ],
   /*   OtherColor: [
       { text: '上架', value: 'indigo darken-3' },
        { text: '下架', value: 'grey darken-3' },
        { text: '未上架:退件', value: 'red darken-3' },
        { text: '未上架:審核中', value: 'lime darken-3' },
        { text: '未上架:審核完成', value: 'light-green darken-3' }, 
      ],*/
      color: 'amber',
    }),

    computed: {
      hasIntervals () {
        return this.type in {
          'week': 1, 'day': 1, '4day': 1, 'custom-daily': 1
        }
      },
      hasEnd () {
        return this.type in {
          'custom-weekly': 1, 'custom-daily': 1
        }
      }
    },
    methods: {
       setToday () {
         function pad2(n) {  return (n < 10 ? '0' : '') + n;}
          let date = new Date();
          let month = pad2(date.getMonth()+1);//months (0-11)
          let day = pad2(date.getDate());//day (1-31)
          let year= date.getFullYear();
          //let formattedDate =  year+"-"+month+"-"+day;
          this.focus = year+"-"+month+"-"+day;
          this.start = this.focus;
          this.$refs.startMenu.save(this.start);        
      },
      getEvents (status,start) {        
        let objs = {}
        let event = [];
        let str = start.substring(0, 7);
        console.log(str);

        fetchActiveProgramCalendar({
          region: null,
          releaseMonth: str
        }).then((res) => {
            let reslut =  JSON.parse(JSON.stringify( res.restData.programs));
            MessageService.showInfo(res.restData.message, "成功✓");
            const keyMap = { programName: 'name', releaseStartDate:'start', releaseEndDate:'end'}
              reslut.map((item) => {
              objs = Object.keys(item).reduce((newData, key) => {
                const newKey = keyMap[key] || key
                newData[newKey] = item[key]
                return newData
              }, {})
              event.push(objs)
              })
              
              let statusArray = status.split(':');
              let eventTemp =  event.filter(function (el) {
                if(status == "請選擇")
                  return el.status;
                else if (status == "上架")
                  return el.status == "ACTIVE"
                else if (status == "下架")
                  return el.status =="CLOSE"
                else if (statusArray[0] == "未上架" && statusArray[1] == "退件")
                  return (el.status == "WAIT" &&  el.signStatus == "REJECT");
                else if (statusArray[0] == "未上架" &&  statusArray[1] == "審核中")
                  return (el.status == "WAIT" &&  el.signStatus == "WAIT");
                else if (statusArray[0] == "未上架" &&  statusArray[1] == "審核完成" )
                  return (el.status == "WAIT" &&  el.signStatus == "PROGRESS" );
                else if (statusArray[0] == "未上架" &&  statusArray[1] == "草稿")
                  return (el.status == "WAIT" &&  el.signStatus == "DRAFT");              
              });

             for(let i=0; i< eventTemp.length; i++){
              //  if(eventTemp[i].region == "區處"){
                if(eventTemp[i].status == "ACTIVE"){
                  Object.assign(eventTemp[i], {color: 'green darken-2'});                
                }else if (eventTemp[i].status == "CLOSE"){
                   Object.assign(eventTemp[i], {color: 'grey darken-1'});                   
                }else if(eventTemp[i].status == "WAIT" && eventTemp[i].signStatus=="REJECT"){
                  Object.assign(eventTemp[i], {color: 'red darken-4'});                    
                }else if(eventTemp[i].status == "WAIT" && (eventTemp[i].signStatus=="WAIT" || eventTemp[i].signStatus=="PROGRESS")){
                   Object.assign(eventTemp[i], {color: 'light-blue accent-1'});
                }else if(eventTemp[i].status == "WAIT" && (eventTemp[i].signStatus=="DRAFT")){
                   Object.assign(eventTemp[i], {color: 'yellow darken-1'});
                }else if(eventTemp[i].status == "WAIT" && eventTemp[i].signStatus=="PASS"){                    
                    Object.assign(eventTemp[i], {color: 'cyan darken-4'});
                }
        }
             this.events =  eventTemp;
        }).catch((error) => {
          console.log(error)
        });
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      
    } 
  }
</script>

<style scoped>

  .feature-pane {
    position: relative;
    padding-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

 .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }

   .day-header {
    margin: 0px 2px 2px 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day-body {
    position: absolute;
    top: 400px;
    height: 36px;
    margin: 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day {
    position: relative;
    height: 24px;
    margin: 0px;
    padding: 0px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .v-application--is-ltr .v-list-item__avatar:first-child {
    margin-right: 0px;
}
</style>