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
        >
          <template v-slot:activator="{ on }">
            <div
              v-if="!event.timed"
              class="my-event"
              v-on="on"
              v-html="event.category"
            />
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import { fetchActiveMarquee } from "@/api/marquee"; 
import MessageService from "@/assets/services/message.service";

  const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

  export default {
    
    data: () => ({
      dark: false,
      startMenu: false,
      start: '2021-11-01',
      events: [],
      more: false,
      mode: 'column',
      modes: ['stack', 'column'],
      type: 'month',
      weekdays: weekdaysDefault,
      status:'請選擇',
      statusOptions: ['請選擇','上架','下架','未上架:審核中','未上架:審核完成','未上架:退件'],
      selfColor: [
        { text: '上架', value: 'indigo' },
        { text: '下架', value: 'grey' },
        { text: '未上架:退件', value: 'red' },
        { text: '未上架:審核中', value: 'lime' },
        { text: '未上架:審核完成', value: 'light-green' },
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

        let str = start.substring(0, 7);
        console.log(str);

        fetchActiveMarquee({
          region: null,
          releaseMonth: str
        }).then((res) => {
           const reslut =  JSON.parse(JSON.stringify( res.restData.marqueeBeanList));
           const keyMap = { marqueeName: 'name', releaseStartDate:'start', releaseEndDate:'end'}
           let objs = {}
         
           reslut.map((item) => {
           objs = Object.keys(item).reduce((newData, key) => {
              const newKey = keyMap[key] || key
              newData[newKey] = item[key]
              return newData
            }, {})
            this.events.push(objs)
            })
           MessageService.showInfo(res.restData.message, "成功✓");           
        }).catch((error) => {
          console.log(error)
        });
        /*const events = []
          events.push( 
                  {   name: '省電教學-1',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-09-28', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                    {   
                      name: '省電教學-2',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-29', // new Date(`${start.date}T00:00:00`),
                      end: '2021-09-29', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                     {   name: '省電教學-3',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-01', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },{   name: '省電教學-4',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-15', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                      {
                      name: '省電教學-5',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-01', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                      {   
                      name: '省電教學-6',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-01', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                     {   name: '省電教學-1',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-01', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                     {   name: '省電教學-1',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-09-28', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-01', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                    {
                      name: '省電教學0',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'下架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-10-02', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-05', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                     {
                      name: '省電教學1',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'上架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-10-06', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-12', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                    {
                      name: '省電教學2',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'未上架',
                      signStatus:'審核完成',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                      
                      start: '2021-10-13', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-16', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                    {
                      name: '省電教學3',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'未上架',
                      signStatus:'審核中',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                     
                      start: '2021-10-17', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-19', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },
                    {
                      name: '省電教學3',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'未上架',
                      signStatus:'審核中',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                     
                      start: '2021-10-20', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-23', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },     
                     {
                      name: '省電教學3',
                      type: '一般',
                      detail: '日光節約時間',
                      content: '純文字',
                      memo:'備註',
                      region:'區處',
                      status:'未上架',
                      signStatus:'退件',
                      curlevel:'等級',
                      fainlevel:'最後簽核狀態',
                      htmlcontent:'quill',                     
                      start: '2021-10-24', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-29', // new Date(`${end.date}T23:59:59`),
                      timed: false,
                    },    */                
        //)
        /*
        let statusArray = status.split(':');
        console.log('-----------------statusArray-----------------');
        console.log(statusArray);

        let eventTemp =  this.events.filter(function (el) {
          if(status == "請選擇")
           return el.status !== status
          else if (status == "上架" || status == "下架")
            return el.status == status
          else if (statusArray[0] == "未上架" && (statusArray[1] == "退件" ||statusArray[1] == "審核中"|| statusArray[1] == "審核完成"))
            return el.status == statusArray[0] &&  el.signStatus == statusArray[1];
        });

        console.log('-----------------eventTemp-----------------');
        console.log(eventTemp);

                console.log('-----------------eventTemp[1]-----------------');
        //console.log(Object.assign(eventTemp[1], {color: "blue"}));


        for(let i=0; i< eventTemp.length; i++){
            if(eventTemp[i].region == "區處"){
                if(eventTemp[i].status == "上架"){
                  Object.assign(eventTemp[i], {color: 'indigo'});                
                }else if (eventTemp[i].status == "下架"){
                   Object.assign(eventTemp[i], {color: 'grey darken-1'});                   
                }else if(eventTemp[i].status == "未上架" && eventTemp[i].signStatus=="退件"){
                  Object.assign(eventTemp[i], {color: 'red darken-4'});                    
                }else if(eventTemp[i].status == "未上架" && eventTemp[i].signStatus=="審核中"){
                   Object.assign(eventTemp[i], {color: 'lime darken-3'});
                }else if(eventTemp[i].status == "未上架" && eventTemp[i].signStatus=="審核完成"){                    
                    Object.assign(eventTemp[i], {color: 'light-green darken-3'});
                }

            }

        }
        console.log('-----------------eventTemp-----------------');
        console.log(eventTemp);
        
       this.events =eventTemp;

        console.log("this.events")
        console.log(this.events) */
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