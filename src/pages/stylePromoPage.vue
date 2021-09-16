<template>
  <v-app>
    <v-container>
      <v-row>
        <h1>Button顏色說明</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="font-20px font-bold mt-3">
        <v-col cols="1">
          <v-btn depressed color="primary">&emsp;查詢&emsp;</v-btn>
        </v-col>
        <v-col cols="4">
          <span>用於瀏覽 : 不異動到資料的動作，如查詢與瀏覽等。</span>
        </v-col>
      </v-row> 
      <v-row class="font-20px font-bold mt-3">
        <v-col cols="1">
          <v-btn depressed color="error">&emsp;刪除&emsp;</v-btn>
        </v-col>
        <v-col cols="4">
          <span>用於刪減 : 會進行負面異動，如刪除與退件等。</span>
        </v-col>
      </v-row> 
      <v-row class="font-20px font-bold mt-3">
        <v-col cols="1">
          <v-btn depressed color="success">&emsp;新增&emsp;</v-btn>
        </v-col>
        <v-col cols="4">
          <span>用於增加 : 會新增或異動到資料的動作，如新增或審核等。</span>
        </v-col>
      </v-row> 
      <v-row class="font-20px font-bold mt-3">
        <v-col cols="1">
          <v-btn depressed color="#E98B2A" style="color:white">認領案件</v-btn>
        </v-col>
        <v-col cols="4">
          <span>用於其他 : 如用於認領案件，比較難分類的事項。</span>
        </v-col>
      </v-row> 
      <v-row class="font-20px font-bold mt-3">
        <v-col cols="1">
          <v-btn depressed color="normal">&emsp;取消&emsp;</v-btn>
        </v-col>
        <v-col cols="4">
          <span>用於次要操作 : 用於未被選擇的按鈕或取消視窗的動作等。</span>
        </v-col>
      </v-row> 
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Title</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row align="center" justify="space-around">
        <h1>This is a h1 title.</h1>
        <h2>This is a h2 title.</h2>
        <h3>This is a h3 title.</h3>
        <h4>This is a h4 title.</h4>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Button</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row align="center" justify="space-around">
        <v-btn depressed>Normal</v-btn>
        <v-btn depressed color="primary">Primary</v-btn>
        <v-btn depressed color="error">Error</v-btn>
        <v-btn depressed color="success">Success</v-btn>
        <v-btn depressed color="warning">Warning</v-btn>
        <v-btn depressed color="yellow">Yellow Button</v-btn>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Radio Button</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row align="center" justify="space-around">
        <v-radio-group row>
          <v-radio label="red" color="red" value="red" />
          <v-radio label="red darken-3" color="red darken-3" value="red darken-3" />
          <v-radio label="indigo" color="indigo" value="indigo" />
          <v-radio label="indigo darken-3" color="indigo darken-3" value="indigo darken-3" />
          <v-radio label="orange" color="orange" value="orange" />
          <v-radio label="orange darken-3" color="orange darken-3" value="orange darken-3" />
          <v-radio label="primary" color="primary" value="primary" />
          <v-radio label="secondary" color="secondary" value="secondary" />
          <v-radio label="success" color="success" value="success" />
          <v-radio label="info" color="info" value="info" />
          <v-radio label="warning" color="warning" value="warning" />
          <v-radio label="error" color="error" value="error" />
        </v-radio-group>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Checkbox</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="4" md="4">
          <v-checkbox label="red" color="red" value="red" hide-details />
          <v-checkbox label="red darken-3" color="red darken-3" value="red darken-3" hide-details />
          <v-checkbox label="primary" color="primary" value="primary" hide-details />
          <v-checkbox label="secondary" color="secondary" value="secondary" hide-details />
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-checkbox label="indigo" color="indigo" value="indigo" hide-details />
          <v-checkbox label="indigo darken-3" color="indigo darken-3" value="indigo darken-3" hide-details />
          <v-checkbox label="success" color="success" value="success" hide-details />
          <v-checkbox label="info" color="info" value="info" hide-details />
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-checkbox label="orange" color="orange" value="orange" hide-details />
          <v-checkbox label="orange darken-3" color="orange darken-3" value="orange darken-3" hide-details />
          <v-checkbox label="warning" color="warning" value="warning" hide-details />
          <v-checkbox label="error" color="error" value="error" hide-details />
        </v-col>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Select</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="space-round">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="selectItems" label="Standard" />
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="selectItems" filled label="Filled style" />
        </v-col>
      </v-row>
      <v-row justify="space-round">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="selectItems" solo label="Solo field" />
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="selectItems" outlined label="Outlined style" />
        </v-col>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Chip</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <div class="marginLeft">
          <v-btn
            v-if="!chip1 && !chip2 && !chip3 && !chip4 && !chip5"
            close
            color="primary"
            dark
            @click="chip1 = true, chip2 = true, chip3 = true, chip4 = true, chip5 = true"
          >Reset Chips</v-btn>
          <v-chip v-if="chip1" class="ma-2" close @click:close="chip1 = false">Default</v-chip>
          <v-chip
            v-if="chip2"
            class="ma-2"
            close
            color="primary"
            text-color="white"
            @click:close="chip2 = false"
          >Primary</v-chip>
          <v-chip v-if="chip3" class="ma-2" close color="secondary" @click:close="chip3 = false">Secondary</v-chip>
          <v-chip
            v-if="chip4"
            class="ma-2"
            close
            color="red"
            outlined
            @click:close="chip4 = false"
          >Outlined</v-chip>
          <v-chip
            v-if="chip5"
            class="ma-2"
            close
            color="orange"
            label
            outlined
            @click:close="chip5 = false"
          >Label</v-chip>
        </div>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Menu</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">Menu</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in menuItems" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Dialog</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">OPEN DIALOG</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Dialog Title</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">Dialog Content</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">CLOSE</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Breadcrumbs</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-breadcrumbs :items="breadcrumbItems">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Carousel</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <template>
          <v-carousel hide-delimiters>
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" :src="item.src" />
          </v-carousel>
        </template>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Date picker</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row class="marginLeft">
        <v-date-picker v-model="picker" />
        <span class="marginLeft"><h4>You clicked {{ picker }}.</h4></span>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <h1>Navigation Drawer</h1>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row>
        <v-card class="mx-auto" width="256" tile>
          <v-navigation-drawer permanent>
            <v-system-bar />
            <v-list>
              <v-list-item>
                <v-text-field v-model="searchText" class="searchArea" :append-icon="'mdi-magnify'" @click:append="search" />
              </v-list-item>
              <v-list-item>
                <v-tabs v-model="selectedTab" centered>
                  <v-tab @click="changeTab('A')">Tab A</v-tab>
                  <v-tab @click="changeTab('B')">Tab B</v-tab>
                </v-tabs>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list>
              <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.icon"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                  </v-list-item-content>
                </template>

                <v-list-item v-for="child in item.items" :key="child.title">
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <h1>Pagination</h1>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
      <v-row justify="center">
        <v-pagination
          v-model="page"
          :length="6"
        />
      </v-row>
      <hr style="margin-top: 30px;margin-bottom: 30px;">
    </v-container>
  </v-app>
</template>

<script>

export default {
    name: 'StylePromo',
    props: {
    
    },
    data() {
        return {
            selectItems: [
                'Option1', 'Option2', 'Option3', 'Option4', 'Option5'
            ],
            chip1: true,
            chip2: true,
            chip3: true,
            chip4: true,
            chip5: true,
            menuItems: [
                {
                    title: "option1"
                },
                {
                    title: "option2"
                },
                {
                    title: "option3"
                }
            ],
            breadcrumbItems: [
                {
                    text: 'Step1',
                    disabled: false,
                    href: '#',
                },
                {
                    text: 'Step2',
                    disabled: false,
                    href: '#',
                },
                {
                    text: 'Step3',
                    disabled: true,
                    href: '#',
                }
            ],
            carouselItems: [
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
            ],
            picker: '',
            items: [],
            itemsA: [
              {
                icon: 'mdi-ticket',
                items: [{ title: 'SubItem A-1-1' }],
                title: 'Item A-1',
              },
              {
                icon: 'mdi-silverware-fork-knife',
                items: [
                  { title: 'SubItem A-2-1' },
                  { title: 'SubItem A-2-2' },
                  { title: 'SubItem A-2-3' },
                ],
                title: 'Item A-2',
              },
              {
                icon: 'mdi-school',
                items: [{ title: 'SubItem A-3-1' }],
                title: 'Item A-3',
              },
              {
                icon: 'mdi-run',
                items: [{ title: 'SubItem A-4-1' }],
                title: 'Item A-4',
              },
              {
                icon: 'mdi-bottle-tonic-plus',
                items: [{ title: 'SubItem A-5-1' }],
                title: 'Item A-5',
              },
              {
                icon: 'mdi-content-cut',
                items: [{ title: 'SubItem A-6-1' }],
                title: 'Item A-6',
              },
              {
                icon: 'mdi-tag',
                items: [{ title: 'SubItem A-7-1' }],
                title: 'Item A-7',
              }
            ],
            itemsB: [
              {
                icon: 'mdi-ticket',
                items: [{ title: 'SubItem B-1-1' }],
                title: 'Item B-1',
              },
              {
                icon: 'mdi-silverware-fork-knife',
                items: [
                  { title: 'SubItem B-2-1' },
                  { title: 'SubItem B-2-2' },
                  { title: 'SubItem B-2-3' },
                ],
                title: 'Item B-2',
              },
              {
                icon: 'mdi-school',
                items: [{ title: 'SubItem B-3-1' }],
                title: 'Item B-3',
              },
              {
                icon: 'mdi-run',
                items: [{ title: 'SubItem B-4-1' }],
                title: 'Item B-4',
              },
              {
                icon: 'mdi-bottle-tonic-plus',
                items: [{ title: 'SubItem B-5-1' }],
                title: 'Item B-5',
              },
              {
                icon: 'mdi-content-cut',
                items: [{ title: 'SubItem B-6-1' }],
                title: 'Item B-6',
              },
              {
                icon: 'mdi-tag',
                items: [{ title: 'SubItem B-7-1' }],
                title: 'Item B-7',
              }
            ],
            searchText: '',
            selectedTab: null,
            page: 1
        }
    },
    mounted() {
        this.changeTab("A");
    },
    methods: {
        search() {
            console.log(this.searchText);
        },
        changeTab(tabId) {
            if("A" === tabId){
                this.items = this.itemsA;
            }else{
                this.items = this.itemsB;
            }
        }
    }
}
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }

    .searchArea {
        width: 90%;
        height: 26px;
        border: 0.1px black solid;
        border-radius: 5px;
        padding: 0 !important;
    }
</style>