<template>
  <v-container fluid>
    <h3>載入與進度條</h3>
    <v-row>
      <v-col>
        <v-card width="100%">
          <v-tabs>
            <v-tab>載入或執行中示意</v-tab>
            <v-tab>進度條</v-tab>

            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="一般（載入比例）"
                      text=""
                    >
                      <v-row>
                        <v-col class="text-center">
                          <v-progress-circular />
                          <v-progress-circular :value="size" />
                          <v-progress-circular :value="size * 2" />
                          <v-progress-circular :value="size * 3" />
                          <v-progress-circular :value="size * 4" />
                          <v-progress-circular :value="size * 5" />
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="客製化顏色"
                      text=""
                    >
                      <v-row>
                        <v-col class="text-center">
                          <v-progress-circular
                            :value="size"
                            color="blue-grey"
                          />
                          <v-progress-circular
                            :value="size * 2"
                            color="orange"
                          />
                          <v-progress-circular
                            :value="size * 3"
                            color="yellow"
                          />
                          <v-progress-circular
                            :value="size * 4"
                            color="indigo"
                          />
                          <v-progress-circular
                            :value="size * 5"
                            color="primary"
                          />
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="載入或執行中動畫"
                      text=""
                    >
                      <v-row>
                        <v-col class="text-center">
                          <v-progress-circular
                            :value="size"
                            color="primary"
                            indeterminate
                          />
                          <v-progress-circular
                            :value="size * 2"
                            color="secondary"
                            indeterminate
                          />
                          <v-progress-circular
                            :value="size * 3"
                            color="accent"
                            indeterminate
                          />
                          <v-progress-circular
                            :value="size * 4"
                            color="info"
                            indeterminate
                          />
                          <v-progress-circular
                            :value="size * 5"
                            color="success"
                            indeterminate
                          />
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="尺寸與寬度（Size and Width）"
                      text=""
                    >
                      <v-row>
                        <v-col class="text-center">
                          <v-progress-circular
                            :value="size"
                            color="primary"
                            indeterminate
                            size="50"
                          />
                          <v-progress-circular
                            :value="size * 2"
                            color="secondary"
                            indeterminate
                            width="3"
                          />
                          <v-progress-circular
                            :value="size * 3"
                            color="accent"
                            indeterminate
                            size="70"
                            width="7"
                          />
                          <v-progress-circular
                            :value="size * 4"
                            color="info"
                            indeterminate
                            width="3"
                          />
                          <v-progress-circular
                            :value="size * 5"
                            color="success"
                            indeterminate
                            size="50"
                          />
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="旋轉的原始位置（Rotate）"
                      text=""
                    >
                      <v-row>
                        <v-col
                          md="12"
                          class="text-center"
                        >
                          <p>顯示比例</p>
                          <v-progress-circular
                            color="primary"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            {{ value }}
                          </v-progress-circular>
                          <v-progress-circular
                            color="secondary"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            {{ value }}
                          </v-progress-circular>
                          <v-progress-circular
                            color="accent"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            {{ value }}
                          </v-progress-circular>
                          <v-progress-circular
                            color="info"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            {{ value }}
                          </v-progress-circular>
                          <v-progress-circular
                            color="success"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            {{ value }}
                          </v-progress-circular>
                        </v-col>
                        <v-col
                          md="12"
                          class="text-center"
                        >
                          <p>旋轉起始位置</p>
                          <v-progress-circular
                            :rotate="0"
                            color="primary"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            0度
                          </v-progress-circular>
                          <v-progress-circular
                            :rotate="90"
                            color="secondary"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            90度
                          </v-progress-circular>
                          <v-progress-circular
                            :rotate="180"
                            color="accent"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            180度
                          </v-progress-circular>
                          <v-progress-circular
                            :rotate="270"
                            color="info"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            270度
                          </v-progress-circular>
                          <v-progress-circular
                            :rotate="-45"
                            color="success"
                            :value="value"
                            size="70"
                            width="10"
                          >
                            -45度
                          </v-progress-circular>
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="搭配蓋版 (Overlay)"
                      text=""
                    >
                      <v-row>
                        <v-col>
                          <v-btn
                            color="accent"
                            @click="overlay = !overlay"
                          >
                            Open Overlay
                          </v-btn>
                          <v-overlay :value="overlay">
                            <v-progress-circular
                              size="80"
                              width="8"
                              indeterminate
                            />
                          </v-overlay>
                        </v-col>
                      </v-row>
                    </fet-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="一般"
                      text=""
                    >
                      <v-progress-linear value="30" />
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="客製化顏色"
                      text=""
                    >
                      <v-progress-linear
                        value="30"
                        color="info"
                      />
                      <v-progress-linear
                        value="30"
                        color="warning"
                      />
                      <v-progress-linear
                        value="30"
                        color="success"
                      />
                      <v-progress-linear
                        value="30"
                        background-color="accent"
                        color="primary"
                      />
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="動畫"
                      text=""
                    >
                      <v-progress-linear indeterminate />
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="調整線條高度與條紋背景"
                      text=""
                    >
                      <v-progress-linear
                        value="30"
                        color="info"
                        height="10"
                        striped
                      />
                      <v-progress-linear
                        value="30"
                        color="warning"
                        height="10"
                        striped
                      />
                      <v-progress-linear
                        value="30"
                        color="success"
                        height="10"
                        striped
                      />
                    </fet-card>
                  </v-col>
                  <v-col md="6">
                    <fet-card
                      flat
                      full-width
                      title="進度顯示"
                      text=""
                    >
                      <v-progress-linear
                        v-model="skills.power"
                        color="info"
                        height="25"
                      />
                      <v-progress-linear
                        v-model="skills.healthy"
                        height="25"
                      >
                        {{ Math.ceil(skills.healthy) }}%
                      </v-progress-linear>
                    </fet-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        size: 20,
        overlay: false,
        value: 0,
        skills: {
          power: 15,
          healthy: 50,
        },
      }
    },
    watch: {
      overlay(val) {
        val &&
          setTimeout(() => {
            this.overlay = false
          }, 3000)
      },
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    mounted() {
      this.interval = setInterval(() => {
        if (this.value === 100) return (this.value = 0)
        this.value += 10
      }, 1000)
    },
  }
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}
.v-progress-linear {
  margin-bottom: 1rem;
}
</style>