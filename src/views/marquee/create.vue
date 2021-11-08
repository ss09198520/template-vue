<template>
  <v-container>
    <h2 class="font-bold">跑 馬 燈 製 作</h2>
    <v-row class="d-flex justify-center">
      <v-col
        class="ml-10"
        cols="12"
      >
        <fet-card
          full-width
          outlined
          title="跑 馬 燈 製 作"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col cols="4" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  跑 馬 燈 名 稱
                  <span class="red--text ml-2">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="7" md="6">
                <v-text-field
                  v-model="marqueeName"
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
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  描 述 註 記
                </v-subheader>
              </v-col>
              <v-col cols="7" md="6">
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
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  跑 馬 燈 內 容
                  <span class="red--text ml-2">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="9"
                md="8"
              >
                <quill ref="editor" v-model="marqueeText" :height="400" @change="selfUpdate" />
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  輪 播 時 間
                </v-subheader>
              </v-col>
              <v-col cols="1" md="3">
                <v-menu
                  v-model="releaseStartDateMenu"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="releaseStartDate"
                      append-icon="mdi-calendar"
                      placeholder="上架時間(起)"
                      color="accent"
                      outlined
                      dense
                      readonly
                      hide-details   
                      :clearable="true"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="releaseStartDate"
                    scrollable
                  />
                </v-menu>
              </v-col>
              <v-col cols="1" md="3">
                <v-menu
                  v-model="releaseEndDateMenu"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="releaseEndDate"
                      append-icon="mdi-calendar"
                      placeholder="上架時間(迄)"
                      color="accent"
                      outlined
                      dense
                      readonly
                      hide-details   
                      :clearable="true"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="releaseEndDate"
                    scrollable
                  />
                </v-menu>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  外 觀 樣 式
                </v-subheader>
              </v-col>
              <v-col cols="3" md="3">
                <v-switch 
                  v-model="fontBold" 
                  class="mt-1"
                  :label="`粗體字`" 
                  inset 
                />
              </v-col>
              <v-col cols="3" md="3">
                <v-switch 
                  v-model="fontItalic"
                  class="mt-1"
                  :label="`斜體字`"
                  inset
                />
              </v-col>
            </v-row> -->
            <!-- <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col cols="2" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  顏 色 配 置
                  <span class="red--text ml-2">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="3" md="3">
                <v-text-field 
                  color="acc ent"
                  readonly
                  label="文字顏色"
                  dense
                  style="width:100px"
                >
                  <template v-slot:prepend>
                    <v-menu v-model="menu" top nudge-bottom="33" nudge-left="13" :close-on-content-click="false">
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
              <v-col cols="2">
                <v-text-field 
                  label="背景顏色"
                  dense
                  solo
                  style="width:116px"
                >
                  <template v-slot:prepend>
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
            </v-row> -->
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  撥 放 速 度
                </v-subheader>
              </v-col>
              <v-col cols="7" md="6">
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
              <v-col cols="3" md="3">
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  樣 式 預 覽
                  <span class="red--text ml-2">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="7" md="6">
                <!-- <v-color-picker v-model="color" /> -->
                <marquee-text
                  :duration="animationDuration"
                  :repeat="1"
                >
                  {{ marqueeText }}
                </marquee-text>
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
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  審 核 附 件 上 傳
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-file-input
                  :hide-details="hideDatails"
                  label="審 核 附 件 上 傳"
                  color="accent"
                  outlined
                  dense
                  accept="image/jpg"
                  persistent-hint
                  prepend-inner-icon="mdi-cloud-upload"
                  prepend-icon
                />
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col class="d-flex justify-end">
                <v-btn
                  class="ma-1"
                  outlined
                  color="accent"
                >
                  取消
                </v-btn>
                <v-btn
                  class="ma-1"
                  depressed
                  color="primary"
                  :disabled="!valid"
                  @click="submit"
                >
                  暫存
                </v-btn>
                <v-btn
                  class="ma-1"
                  depressed
                  color="success"
                  :disabled="!valid"
                  @click="submit"
                >
                  送出審核
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </fet-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Quill from '@/components/Quill'
  // const defaultForm = {
  //   marqueeName: '',
  //   content: '', 
  //   id: undefined,
  //   comment_disabled: false,
  //   importance: 0
  // }
  export default {
    components: { Quill},
    data() {
      return {
        valid: false,
        maxCharacter: 30,
        duration: 30,
        min: 1,
        max: 60,
        marqueeName: '跑馬燈輪播測試',
        marqueeText: `<p><strong style="color: rgb(255, 255, 204); background-color: rgb(255, 153, 0);">此</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(240, 102, 102);">時</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(194, 133, 255);">已</strong><strong style="color: rgb(136, 136, 136); background-color: rgb(255, 255, 102);">鶯</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(136, 136, 136);">飛</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(0, 41, 102);">草</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(102, 163, 224);">長</strong><strong> </strong><strong style="background-color: rgb(255, 194, 102); color: rgb(153, 51, 255);" class="ql-size-small">愛的人正在路上</strong></p><p><strong style="color: rgb(161, 0, 0);">我知他<u>風雨兼程</u> </strong><strong style="color: rgb(178, 178, 0);">途經日暮不賞 </strong></p><p><strong style="color: rgb(204, 232, 204); background-color: rgb(178, 107, 0);"> 穿越人海</strong><strong style="color: rgb(204, 232, 204);"> </strong><strong style="color: rgb(102, 185, 102);" class="ql-size-small">只為與你相擁</strong></p><p><span style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </span><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">此</strong><strong style="color: rgb(0, 102, 204); background-color: rgb(255, 255, 0);">刻</strong><strong style="color: rgb(153, 51, 255); background-color: rgb(255, 255, 0);">已</strong><strong style="color: rgb(0, 97, 0); background-color: rgb(255, 255, 0);">皓</strong><strong style="color: rgb(178, 107, 0); background-color: rgb(255, 255, 0);">月</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">當</strong><strong style="color: rgb(240, 102, 102); background-color: rgb(255, 255, 0);">空</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </strong><span style="color: rgb(230, 0, 0); background-color: rgb(102, 163, 224);"> </span><em style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">愛的人手捧星光</em></p><p><strong style="color: rgb(255, 255, 255); background-color: rgb(0, 55, 0);">我知他乘風破浪 </strong><span style="color: rgb(187, 187, 187); background-color: rgb(0, 55, 0);"> </span><strong style="color: rgb(255, 235, 204); background-color: rgb(240, 102, 102);">去了黑暗一趟</strong></p>`,
        marqueeDesc: '',
        uploadType: '',
        releaseStartDateMenu: false,
        releaseStartDate: '',
        releaseEndDateMenu: false,
        releaseEndDate: '',
        menu: false,
        menu1: false,
        dense: false,
        noGutters: false,
        hideDatails: false,
        snackbar: false,
        // basicStyle : {
        //   cursor: 'pointer',
        //   height: '20px',
        //   width: '20px',
        //   transition: 'border-radius 200ms ease-in-out'
        // },
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v && v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },
      }
    },
    computed: {
      animationDuration() {
        return 600 / this.duration
      },
      // backgroundStyle() {
      //   const { backgroundColor, menu1 } = this
      //   return Object.assign({
      //     backgroundColor: backgroundColor,
      //     borderRadius: menu1 ? '4px' : '50%',
      //   }, this.basicStyle)
      // },
      // fontStyle() {
      //   const { fontColor, menu } = this
      //   return Object.assign({
      //     backgroundColor: fontColor,
          
      //     borderRadius: menu ? '50%' : '4px',
      //   }, this.basicStyle)
      // },
    },
    methods: {
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
      selfUpdate(val) {
        this.marqueeText = val;
      }
    }
  }
</script>

<style lang="scss" scoped>

.ql-editor {
  line-height: 1.42;
  height: 150px;
  font-size: 32px;
}

.ql-editor p{
  font-weight: normal !important; 
  font-size: 32px !important; 
}


.ql-editor .ql-size-small {
    font-size: 0.75em;
}

.ql-editor  .ql-size-large {
    font-size: 1.25em;
}

.ql-editor .ql-size-huge {
    font-size: 1.50em;
}
</style>