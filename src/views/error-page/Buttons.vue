<template>
  <v-container fluid>
    <h3>按鈕樣式示範</h3>
    <v-row>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="實心按鈕，無陰影"
          text=""
        >
          <v-btn
            class="ma-1"
            depressed
            color="primary"
          >
            Primary
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="secondary"
          >
            Secondary
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="accent"
          >
            Accent
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="error"
          >
            Error
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="info"
          >
            Info
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="success"
          >
            Success
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="warning"
          >
            Warning
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="框線按鈕，無陰影"
          text=""
        >
          <v-btn
            class="ma-1"
            outlined
            color="primary"
          >
            Primary
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="secondary"
          >
            Secondary
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="accent"
          >
            Accent
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="error"
          >
            Error
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="info"
          >
            Info
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="success"
          >
            Success
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="warning"
          >
            Warning
          </v-btn>
        </fet-card>
      </v-col>

      <v-col md="6">
        <fet-card
          flat
          full-width
          title="尺寸"
          text=""
        >
          <v-btn
            class="ma-1"
            depressed
            x-small
            color="primary"
          >
            x-small
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            small
            color="secondary"
          >
            small
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            color="info"
          >
            normal
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            large
            color="accent"
          >
            large
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            x-large
            color="error"
          >
            x-large
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="icon，實心，尺寸"
          text=""
        >
          <v-btn
            class="ma-1"
            depressed
            fab
            x-small
            color="primary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            small
            color="secondary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            color="info"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            large
            color="accent"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            x-large
            color="error"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="icon，框線，尺寸"
          text=""
        >
          <v-btn
            class="ma-1"
            depressed
            fab
            outlined
            x-small
            color="primary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            outlined
            small
            color="secondary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            outlined
            color="info"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            outlined
            large
            color="accent"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            depressed
            fab
            outlined
            x-large
            color="error"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="滿格"
          text=""
        >
          <v-btn
            block
            color="primary"
          >
            Block
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="失效"
          text=""
        >
          <v-btn
            disabled
            class="ma-1"
            color="primary"
          >
            disabled
          </v-btn>
          <v-btn
            block
            disabled
            class="ma-1"
            color="primary"
          >
            disabled
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="帶 icon"
          text=""
        >
          <v-btn
            class="ma-1"
            color="primary"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
          <v-btn
            class="ma-1"
            outlined=""
            color="primary"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
          <v-btn
            class="ma-1"
            color="primary"
          >
            Edit
            <v-icon right>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            outlined
            color="primary"
          >
            Edit
            <v-icon right>
              mdi-pencil
            </v-icon>
          </v-btn>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="按鈕群組"
          text=""
        >
          <v-row>
            <v-col>
              <p>Exclusive</p>
              <v-btn-toggle v-model="toggle_exclusive">
                <v-btn>
                  <v-icon>mdi-format-align-left</v-icon>
                </v-btn>

                <v-btn>
                  <v-icon>mdi-format-align-center</v-icon>
                </v-btn>

                <v-btn>
                  <v-icon>mdi-format-align-right</v-icon>
                </v-btn>

                <v-btn>
                  <v-icon>mdi-format-align-justify</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>

            <v-col>
              <p>Text &amp; Icon Options</p>
              <v-btn-toggle
                v-model="icon"
                borderless
              >
                <v-btn value="left">
                  <v-icon left>
                    mdi-format-align-left
                  </v-icon>
                  <span class="hidden-sm-and-down">Left</span>
                </v-btn>

                <v-btn value="center">
                  <v-icon left>
                    mdi-format-align-center
                  </v-icon>
                  <span class="hidden-sm-and-down">Center</span>
                </v-btn>

                <v-btn value="right">
                  <v-icon left>
                    mdi-format-align-right
                  </v-icon>
                  <span class="hidden-sm-and-down">Right</span>
                </v-btn>

                <v-btn value="justify">
                  <v-icon left>
                    mdi-format-align-justify
                  </v-icon>
                  <span class="hidden-sm-and-down">Justify</span>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </fet-card>
      </v-col>
    </v-row>

    <h3>分頁按鈕示範</h3>
    <v-row>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="基本"
          text=""
        >
          <v-row>
            <v-col>
              <p>預設</p>
              <v-pagination
                v-model="page"
                :length="6"
              />
            </v-col>
            <v-col>
              <p>圓形</p>
              <v-pagination
                v-model="page"
                :length="6"
                circle
              />
            </v-col>
            <v-col>
              <p>禁用 (disabled)</p>
              <v-pagination
                v-model="page"
                :length="6"
                disabled
              />
            </v-col>
          </v-row>
        </fet-card>
      </v-col>
      <v-col md="6">
        <fet-card
          flat
          full-width
          title="顯示"
          text=""
        >
          <v-row>
            <v-col>
              <p>長度 15 頁</p>
              <v-pagination
                v-model="page"
                :length="15"
              />
            </v-col>
            <v-col>
              <p>限制顯示 7 個按鈕</p>
              <v-pagination
                v-model="page"
                :length="15"
                :total-visible="7"
                circle
              />
            </v-col>
          </v-row>
        </fet-card>
      </v-col>
      <v-col md="6">
          <v-row>
            <v-col>
              <p>客製化 icon</p>
              <v-pagination
                v-model="page"
                :length="6"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              />
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      icon: 'justify',
      toggle_exclusive: 2,
      page: 1,
    }),
  }
</script>

<style lang="scss" scoped></style>