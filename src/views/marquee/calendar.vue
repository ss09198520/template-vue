<template>
  <v-container
    id="calendar"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="10"
        class="mx-auto"
      >
        <v-card>
          <v-toolbar flat :color="'elevation-0'">
            <v-btn
              outlined
              class="mr-4 justify-start"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>

            <calendar-btn
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon>
                mdi-chevron-left
              </v-icon>
            </calendar-btn>
            <calendar-btn
              text
              small
              color="grey darken-1"
              @click="next"
            >
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </calendar-btn>
            <v-spacer />
            <v-toolbar-title 
              v-if="$refs.calendar"
              class="d-flex text-xl-h5 font-weight-bold justify-start"
            >
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            
            <!-- <calendar-btn
              v-for="(t, i) in types"
              :key="i"
              @click="type = t"
            >
              {{ t }}
            </calendar-btn> -->
            <v-spacer />
            <!-- <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right v-text="'mdi-menu-down'" />
                </v-btn>
              </template>
              <v-list>
                <template v-for="(item , idx) in types">
                  <v-list-item :key="idx" @click="type = item">
                    <v-list-item-title>{{ typeToLabel[item] }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu> -->

          </v-toolbar>

          <v-sheet
            height="600"
            flat
            class="mt-5"
          >
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="error"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            />
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name" />
                  <v-spacer />
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details" />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Components
  import { VBtn } from 'vuetify/lib'

  export default {
    name: 'DashboardCalendar',

    components: {
      CalendarBtn: {
        extends: VBtn,
        props: {
          color: {
            type: String,
            default: 'secondary',
          },
          minWidth: {
            type: Number,
            default: 0,
          },
          rounded: {
            type: Boolean,
            default: true,
          },
        },
        computed: {
          classes () {
            return {
              ...VBtn.options.computed.classes.call(this),
              'mx-1': true,
              'text-lowercase': true,
            }
          },
        },
      },
    },

    data: () => ({
      focus: '',
      type: 'month',
      types: [
        'month',
        'week',
        'day',
        '4day'
      ],
      typeToLabel: {
        month: 'MONTH',
        week: 'WEEK',
        day: 'DAY',
        '4day': '4 DAYS',
      },
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['News!! 颱風登陸緊急警報', 'New! 秋季用電宣導', '台電公司對受疫情影響農業及服務業之電費減免措施', '台電連4年獲亞洲企業社會責任獎 以電幻1號所、循環經濟奪雙獎'],
      events: [
        {
          name: 'New! 9月11日颱風緊急通報',
          start: '2021-09-11',
          end: '2021-09-13',
          color: 'red',
        },
        {
          name: 'New! 秋季用電宣導',
          start: '2021-09-14',
          end: '2021-09-20',
          color: 'orange',
        },
        {
          name: '電廠維護公告',
          start: '2021-09-30',
          end: '2021-10-01',
          color: 'red',
        },
      ],
      selectedEvent: {},
      selectedOpen: false,
      selectedElement: null,
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        console.log(this.$refs.calendar)
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => (this.selectedOpen = true), 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const newevents = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days-30, days)
        
        for (let i = 0; i < eventCount; i++) {
          const allDay = !!1 //this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          newevents.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }
        this.events = this.events.concat(newevents)
        // this.events = Object.assign({},this.events)
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style lang="sass">
  #calendar
    .v-calendar-weekly__day:last-child,
    .v-calendar-weekly__head-weekday:last-child
      border-right: none

    .v-calendar-weekly__week:last-child .v-calendar-weekly__day
      border-bottom: none
</style>
