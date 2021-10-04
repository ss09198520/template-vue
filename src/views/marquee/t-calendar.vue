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
        @change="getEvents(status)"
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
        <v-col cols="12" md="12" class="mt-0 mb-0">
          <v-list-item-avatar
            tile
            size="30"
            color="indigo"
          />
          區處
          <v-list-item-avatar
            tile
            size="30"
            color="blue"
          />
          業務處
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
      <v-sheet height="700">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"  
          :color="color"
          :event-overlap-mode="mode"
          :events="events"
          @change="getEvents(status)"
        />
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

  export default {
    
    data: () => ({
      dark: false,
      startMenu: false,
      start: '2021-10-01',
      events: [],
      more: false,
      mode: 'column',
      modes: ['stack', 'column'],
      type: 'month',
      weekdays: weekdaysDefault,
      status:'請選擇',
      statusOptions: ['請選擇','上架','下架','未上架:審核中','未上架:審核完成','未上架:退件'],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      category: '日光節約時間',
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
      getEvents (status) {
        const events = []
        events.push( 
                  {
                      name: '省電教學-1',
                      category: '日光節約時間',
                      status:'下架',
                      start: '2021-09-01', // new Date(`${start.date}T00:00:00`),
                      end: '2021-09-03', // new Date(`${end.date}T23:59:59`),
                      color: 'blue',
                      timed: false,
                    },
                    {
                      name: '省電教學-1',
                      category: '日光節約時間',
                      status:'下架',
                      start: '2021-09-01', // new Date(`${start.date}T00:00:00`),
                      end: '2021-09-03', // new Date(`${end.date}T23:59:59`),
                      color: 'indigo',
                      timed: false,
                    },   
                    {
                      name: '省電教學0',
                      category: '日光節約時間',
                      status:'下架',
                      start: '2021-10-1', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-03', // new Date(`${end.date}T23:59:59`),
                      color: 'blue',
                      timed: false,
                    },
                    {
                      name: '省電教學0',
                      category: '日光節約時間',
                      status:'下架',
                      start: '2021-10-01', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-03', // new Date(`${end.date}T23:59:59`),
                      color: 'indigo',
                      timed: false,
                    },          
                    {
                      name: '省電教學1',
                      category: '日光節約時間',
                      status:'上架',
                      start: '2021-10-04', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-09', // new Date(`${end.date}T23:59:59`),
                      color: 'blue',
                      timed: false,
                    },
                    {
                      name: '省電教學1',
                      category: '日光節約時間',
                      status:'上架',
                      start: '2021-10-04', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-09', // new Date(`${end.date}T23:59:59`),
                      color: 'indigo',
                      timed: false,
                    },{
                      name: '省電教學2',
                      category: '關閉日光節約',
                      status:'未上架:審核完成',
                      start: '2021-10-13', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-16', // new Date(`${end.date}T23:59:59`),
                      color: 'blue',
                      timed: false,
                    },                    
                    {
                      name: '省電教學2',
                      category: '關閉日光節約',
                      status:'未上架:審核完成',
                      start: '2021-10-13', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-16', // new Date(`${end.date}T23:59:59`),
                      color: 'indigo',
                      timed: false,
                    },
                    {
                      name: '省電教學3',
                      category: '關閉日光節約',
                      status:'未上架:審核中',
                      start: '2021-10-20', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-28', // new Date(`${end.date}T23:59:59`),
                      color: 'indigo',
                      timed: false,
                    },
                    {
                      name: '省電教學3',
                      category: '關閉日光節約',
                      status:'未上架:審核中',
                      start: '2021-10-20', // new Date(`${start.date}T00:00:00`),
                      end: '2021-10-28', // new Date(`${end.date}T23:59:59`),
                      color: 'blue',
                      timed: false,
                    },
                    
        )

        this.events = events.filter(function (el) {
          console.log(el.status == status)
          if(status == "請選擇")
           return el.status !== status
          else
            return el.status == status
        });

        console.log("this.events")
        console.log(this.events) 
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
</style>