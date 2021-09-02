<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card width="100%">
          <v-tabs>
            <v-tab>{{getParentRouteName()}}</v-tab>
            <v-tab-item>
              <v-container>
                <v-row class="d-flex justify-center">
                  <v-col
                    sm="10"
                    md="8"
                  >
                    <fet-card
                      flat
                      full-width
                      outlined
                      title="跑 馬 燈 製 作"
                      text
                    >
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                              跑 馬 燈 名 稱
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="7"
                            md="6"
                          >
                            <v-text-field
                              v-model="marqueeText"
                              :rules="rules.requiredRule.concat(rules.lengthRules)"
                              :hide-details="hideDatails"
                              color="accent"
                              label="跑 馬 燈 名 稱"
                              placeholder="請輸入跑馬燈名稱"
                              :counter="maxCharacter"
                              outlined
                              required
                              dense
                            />
                          </v-col>
                        </v-row>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                              描 述 註 記
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="7"
                            md="6"
                          >
                            <v-text-field
                              v-model="marqueeDesc"
                              :rules="rules.lengthRules"
                              :hide-details="hideDatails"
                              color="accent"
                              label="描 述 註 記"
                              placeholder="請輸入描述註記"
                              :counter="maxCharacter"
                              outlined
                              dense
                              persistent-hint
                            />
                          </v-col>
                        </v-row>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                               外 觀 樣 式
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-switch
                              v-model="fontBold" 
                              label="粗體字"
                              inset
                            />
                          </v-col>
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-switch
                              v-model="fontItalic" 
                              label="斜體字"
                              inset
                            />
                          </v-col>
                        </v-row>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="4"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                              顏 色 配 置
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-text-field v-model="fontColor" 
                                          v-mask="mask"
                                          readonly
                                          color="accent"
                                          label="文字顏色"
                                          persistent-hint>
                              <template v-slot:append>
                                <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                                  <template v-slot:activator="{ on }">
                                    <div :style="fontStyle" v-on="on" />
                                  </template>
                                  <v-card>
                                    <v-color-picker v-model="fontColor" hide-inputs flat />
                                  </v-card>
                                </v-menu>
                              </template>
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="3"
                            md="3"
                            class="mt-4"
                          >
                            <v-text-field v-model="backgroundColor" 
                                          v-mask="mask"
                                          readonly
                                          color="accent"
                                          label="背景顏色"
                                          dense>
                              <template v-slot:append>
                                <v-menu v-model="menu1" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                                  <template v-slot:activator="{ on }">
                                    <div :style="backgroundStyle" v-on="on" />
                                  </template>
                                  <v-card>
                                    <v-color-picker v-model="backgroundColor" hide-inputs flat />
                                  </v-card>
                                </v-menu>
                              </template>
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                               撥 放 速 度
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="7"
                            md="6"
                          >
                            <v-slider
                              v-model="duration"
                              :min="min"
                              :max="max"
                              dense
                              color="accent"
                              thumb-color="accent"
                              track-color="accent lighten-3"
                              prepend-icon="mdi-minus"
                              append-icon="mdi-plus"
                              @click:prepend="decrementDuration('minus')"
                              @click:append="incrementDuration('plus')"
                            />
                          </v-col>
                        </v-row>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                              樣 式 預 覽 {{animationDuration}}
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="7"
                            md="6"
                          >
                          <!-- <v-color-picker v-model="color" /> -->
                          <marquee-text
                            :duration="animationDuration"
                            :backgroundColor="backgroundColor"
                            :fontColor="fontColor"
                            :repeat="1"
                          >
                            {{marqueeText}}
                          </marquee-text>
                          </v-col>
                        </v-row>

                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col class="d-flex justify-end">
                            <v-btn
                              class="ma-1"
                              depressed
                              color="accent"
                              @click="submit"
                              :disabled="!valid"
                            >
                              送出
                            </v-btn>

                            <v-btn
                              class="ma-1"
                              outlined
                              color="accent"
                            >
                              取消
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
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
        valid: false,
        maxCharacter: 40,
        duration: 80,
        min: 60,
        max: 600,
        marqueeText: '台灣電力公司跑馬燈輪播測試!!! :   今日預告台北將不會停電!!!!',
        marqueeDesc: '',
        uploadType: '',
        fontColor: '#000000FF',
        backgroundColor: '#1976D2FF',
        mask: '!#XXXXXXXX',
        fontBold: false,
        fontItalic: false,
        menu: false,
        menu1: false,
        dense: false,
        noGutters: false,
        hideDatails: false,
        snackbar: false,
        basicStyle : {
          cursor: 'pointer',
          height: '20px',
          width: '20px',
          transition: 'border-radius 200ms ease-in-out'
        },
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },
      }
    },
    computed: {
      animationDuration() {
        return 600 / this.duration
      },
      backgroundStyle() {
        const { backgroundColor, menu1 } = this
        return Object.assign({
          backgroundColor: backgroundColor,
          borderRadius: menu1 ? '4px' : '50%',
        }, this.basicStyle)
      },
      fontStyle() {
        const { fontColor, menu } = this
        return Object.assign({
          backgroundColor: fontColor,
          borderRadius: menu ? '50%' : '4px',
        }, this.basicStyle)
      },
    },
    methods: {
      getParentRouteName() {
        // only show parent route with meta.title
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        return matched[0].meta.title
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
      decrementDuration() { //減慢撥放
        this.duration = this.duration - 6 || 0
      },
      incrementDuration() { //加快撥放
        this.duration = this.duration + 6 || 0
      },
    }
  }
</script>

<style lang="scss" scoped></style>