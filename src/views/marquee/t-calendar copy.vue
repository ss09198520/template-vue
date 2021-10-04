<template>
  <v-layout wrap>
    <v-flex
      sm12
      lg3
      class="pa-3 mb-3 feature-pane"
    >
      <v-btn
        fab
        outlined
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
        outlined
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
        v-model="color"
        :items="colorOptions"
        label="Color"
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
      
    </v-flex>
    <v-flex
      sm12
      lg9
      class="pl-3"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"  
          :color="color"
        >
          <template v-slot:day="day">
            <v-sheet
              v-if="day.day % 3 === 0"
              :color="color"
              class="white--text pa-1"
            >
              day slot {{ day.date }}
            </v-sheet>
          </template>
          <template v-slot:header="day">
            <div
              v-if="day.weekday % 2"
              class="day-header"
            >
              day-header slot {{ day.date }}
            </div>
          </template>
          <template v-slot:day-body="day">
            <div
              v-if="day.weekday % 3 === 2"
              class="day-body"
            >
              day-body slot {{ day.date }}
            </div>
          </template>
        </v-calendar>
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
      now: null,
      type: 'month',
      weekdays: weekdaysDefault,
      color: 'primary',
      colorOptions: [
        { text: 'Primary', value: 'primary' },
        { text: 'Secondary', value: 'secondary' },
        { text: 'Accent', value: 'accent' },
        { text: 'Red', value: 'red' },
        { text: 'Pink', value: 'pink' },
        { text: 'Purple', value: 'purple' },
        { text: 'Deep Purple', value: 'deep-purple' },
        { text: 'Indigo', value: 'indigo' },
        { text: 'Blue', value: 'blue' },
        { text: 'Light Blue', value: 'light-blue' },
        { text: 'Cyan', value: 'cyan' },
        { text: 'Teal', value: 'teal' },
        { text: 'Green', value: 'green' },
        { text: 'Light Green', value: 'light-green' },
        { text: 'Lime', value: 'lime' },
        { text: 'Yellow', value: 'yellow' },
        { text: 'Amber', value: 'amber' },
        { text: 'Orange', value: 'orange' },
        { text: 'Deep Orange', value: 'deep-orange' },
        { text: 'Brown', value: 'brown' },
        { text: 'Blue Gray', value: 'blue-gray' },
        { text: 'Gray', value: 'gray' },
        { text: 'Black', value: 'black' }
      ]
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
     
    }
  }
</script>

<style scoped>

  .feature-pane {
    position: relative;
    padding-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
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