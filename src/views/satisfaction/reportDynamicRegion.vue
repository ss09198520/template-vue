<template>
  <v-container>
    <h2 class="font-bold">滿意度區處報表(自訂查詢區間)</h2>
    <v-row>
      <v-col
        class="ml-10 font-18px"
        cols="12"
      >
        <v-form class="font-weight-bold">
          <v-row
            class="d-flex justify-start mt-2"
            align="center"
          >
            <v-col cols="2" class="ml-2 ">
              查詢日期
            </v-col>

            <v-col cols="4" class="d-flex">
              <v-menu
                v-model="startDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="before7"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="before7"
                  @input="startDate = false"
                />
              </v-menu>
              <div class="mt-3">~</div>
              <v-menu
                v-model="endDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="padding-top: 0;"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  @input="endDate = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="1">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-3"
                    fab
                    small
                    color="primary"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-magnify'" />
                  </v-btn>
                </template>
                <span>{{ searchText }}</span>
              </v-tooltip>
            </v-col>
           <v-col cols="3" class="ml-2" color="red">
              * 查詢區間於6個月內
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" />
            <v-col>
              <!-- <v-btn color="primary" class="ml-3" @click="search()">{{ searchText }}</v-btn> -->
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- <v-divider class="mt-6 mb-5" /> -->
    <hr class="mt-6 mb-5">
    <v-row
      class="d-flex justify-start ml-10 font-18px font-weight-bold"
      align="center"
    >     
      <v-col cols="2" class="ml-2 ">
        查詢下載結果
      </v-col>
      <v-col cols="8" class="ml-2 ">
        業務處
        <v-btn      
          class="ml-3 ma-2"
          fab
          small
          color="primary"
          v-on="on"
        > 
          <v-icon v-text="'mdi-file-download-outline'" />
        </v-btn>
      </v-col>
      <v-col cols="2" class="ml-2 ">
        查詢下載結果
      </v-col>
      <v-col cols="6" class="ml-2 ">
        區處 or 全區處
        <v-btn
          class="ma-2"
          fab
          small
          color="primary"
          v-on="on"
        >
          <v-icon v-text="'mdi-file-download-outline'" />          
        </v-btn>
      </v-col>

     
    </v-row>

    <v-row v-show="isShow">
      <v-col md="12">
        <v-data-table
          item-key="id"
          :headers="headerCRUD"
          :items="itemsCRUD"
          :items-per-page="itemsPerPage"
          :page.sync="itemsListPage"
          :footer-props="{
            showFirstLastPage: true,
          }"
          disable-sort
          class="font-weight-bold elevation-1"
          hide-default-footer
          no-data-text="查無資料"
          @page-count="itemsListPageCount = $event"
        >
          <template v-slot:[`item.download`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  :disabled="!item.download"
                  class="ma-2"
                  fab
                  small
                  color="primary"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-file-download-outline'" />
                </v-btn>
              </template>
              <span v-text="item.download ? '下載檔案' : '無報表資料' " />
            </v-tooltip>
          </template>
        </v-data-table>
        <!-- 選頁 -->
        <div class="mt-2">
          <v-pagination
            v-model="itemsListPage"
            color="#2F59C4"
            :length="itemsListPageCount"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        // menu: false,
        // date: new Date().toISOString().substr(0, 10),
        //分頁
        itemsPerPage: 10,
        itemsListPage: 1,
        itemsListPageCount: 1,
        //分頁 end
        releaseDateStartMenu: false,
        releaseDateStart: '',
        releaseDateEndMenu: false,
        releaseDateEnd: '',
        sunsetDateStartMenu: false,
        sunsetDateStart: '',
        sunsetDateEndMenu: false,
        sunsetDateEnd: '',
        headerCRUD: [
          {
            text: '區處',
            value: 'region',
            align: 'center'
          },
          {
            text: '報表產出時間',
            value: 'signOffDate1',
            align: 'center'
          },
          {
            text: '下載',
            value: 'download',
            width: '10%',
            align: 'center'
            
          },
          
        ],
        itemsCRUD: [
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/06 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/09/13 14:14:42', signOffDate2: '', signOffDate3: '', download: true},
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/09/24 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/09/27 14:14:42', signOffDate2: '', signOffDate3: '', download: false},
          {signOff: false, readMonth: '2021/08', region: '台中', signOffDate1: '2021/10/04 13:00:26', signOffDate2: '2021/09/02 10:36:53', signOffDate3: '2021/09/02 14:42:51', download: true},
          {signOff: true, readMonth: '2021/09', region: '台中', signOffDate1: '2021/10/11 14:14:42', signOffDate2: '', signOffDate3: '', download: true}
        ],
        defaultItem: {
          name: '',
          scp_id: '',
          marquee_content: '',
          division:'',
          ondate: 0,
          pages: 0,
        },
        // CRUD
        dialog: false,
        alertDialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          scp_id: '',
          marquee_content: '',
          division:'',
          ondate: 0,
          pages: 0,
        },
      }
    },
    methods: {
      close() {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.alertDialog = false
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.itemsCRUD[this.editedIndex], this.editedItem)
        } else {
          this.itemsCRUD.push(this.editedItem)
        }
        this.close()
      },
      editItem(item) {
        this.editedIndex = this.itemsCRUD.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$router.push({path:`${this.$route.matched[0].path}/create`})
      },
      viewSchedule() {
        this.$router.push({path:`${this.$route.matched[0].path}/calendarList`})
      },
      deleteItem(item) {
        this.alertDialog = true
        this.editedIndex = this.itemsCRUD.indexOf(item)
      },
      remove() {
        this.itemsCRUD.splice(this.editedIndex, 1)
        this.close()
      },
    }
  }
</script>

<style lang="scss" scoped></style>