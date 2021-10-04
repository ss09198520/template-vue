<template>  
  <v-container>
    <h2 class="font-bold">跑馬燈製作</h2>
    <v-row
      class="ml-10"
    >
      <v-col
        class="ml-10 font-18px"
        cols="12"
      >
        <v-form v-model="valid" class="ml-10 font-weight-bold">
          <v-row             
            :dense="dense"
            :no-gutters="noGutters"      
            class="d-flex justify-start mt-3"
          >
            <v-col cols="2" md="2">
              跑馬燈名稱
              <span class="red--text ml-2">*</span>             
            </v-col>
            <v-col cols="7" md="6">
              <v-text-field
                v-model="marqueeName"
                :rules="rules.requiredRule.concat(rules.lengthRules)"
                :hide-details="hideDatails"
                color="accent"
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
            <v-col cols="2" md="2">             
              描述註記
            </v-col>
            <v-col cols="7" md="6">
              <v-text-field
                v-model="marqueeDesc"
                :rules="rules.lengthRules"
                :hide-details="hideDatails"
                color="accent"          
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
            <v-col cols="2" md="2">
              輪播時間
            </v-col>
            <v-col cols="6" class="d-flex">
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width:100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="startDateMenu = false"
                />
              </v-menu>
              <div class="mt-1">~</div>
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width:100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="endDateMenu = false"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row
            :dense="dense"
            :no-gutters="noGutters"
          >
            <v-col
              cols="2"
              md="2"
            >           
              審核附件上傳
              <span class="red--text">*</span>
            </v-col>
            <v-col
              cols="6"
              md="6"
            >
              <v-file-input
                :hide-details="hideDatails"
                label="審核附件上傳"
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
            <v-col cols="2" md="2">
              播放速度
            </v-col>
            <v-col cols="6" md="6">
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
            <v-col cols="2" md="2">
             
              樣式預覽 {{ animationDuration }}<!-- TODO remove debug -->
              <span class="red--text ml-2">*</span>
             
            </v-col>
            <v-col cols="6" md="6">
              <marquee-text
                :duration="animationDuration"
                :repeat="1"
                :background-color="backgroundColor"
                :font-color="fontColor"
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
            <v-col class="d-flex justify-end" cols="8" md="8">
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script> 
  import Quill from '@/components/Quill'
  export default {
      components: {Quill},      
      data() {
      return {    
        name: 'editor',    
         content: `<p><strong style="color: rgb(255, 255, 204); background-color: rgb(255, 153, 0);">此</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(240, 102, 102);">時</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(194, 133, 255);">已</strong><strong style="color: rgb(136, 136, 136); background-color: rgb(255, 255, 102);">鶯</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(136, 136, 136);">飛</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(0, 41, 102);">草</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(102, 163, 224);">長</strong><strong> </strong><strong style="background-color: rgb(255, 194, 102); color: rgb(153, 51, 255);" class="ql-size-small">愛的人正在路上</strong></p><p><strong style="color: rgb(161, 0, 0);">我知他<u>風雨兼程</u> </strong><strong style="color: rgb(178, 178, 0);">途經日暮不賞 </strong></p><p><strong style="color: rgb(204, 232, 204); background-color: rgb(178, 107, 0);"> 穿越人海</strong><strong style="color: rgb(204, 232, 204);"> </strong><strong style="color: rgb(102, 185, 102);" class="ql-size-small">只為與你相擁</strong></p><p><span style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </span><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">此</strong><strong style="color: rgb(0, 102, 204); background-color: rgb(255, 255, 0);">刻</strong><strong style="color: rgb(153, 51, 255); background-color: rgb(255, 255, 0);">已</strong><strong style="color: rgb(0, 97, 0); background-color: rgb(255, 255, 0);">皓</strong><strong style="color: rgb(178, 107, 0); background-color: rgb(255, 255, 0);">月</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">當</strong><strong style="color: rgb(240, 102, 102); background-color: rgb(255, 255, 0);">空</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </strong><span style="color: rgb(230, 0, 0); background-color: rgb(102, 163, 224);"> </span><em style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">愛的人手捧星光</em></p><p><strong style="color: rgb(255, 255, 255); background-color: rgb(0, 55, 0);">我知他乘風破浪 </strong><span style="color: rgb(187, 187, 187); background-color: rgb(0, 55, 0);"> </span><strong style="color: rgb(255, 235, 204); background-color: rgb(240, 102, 102);">去了黑暗一趟</strong></p>`,
          editorOption: {
              modules: {
                toolbar:
                 [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜體 底線 刪除線
                //  ["blockquote", "code-block"], // 引用  程式碼區塊
                //  [{ header: 1 }, { header: 2 }], // 1、2 級標題
                //  [{ list: "ordered" }, { list: "bullet" }], // 有序、無序列表
                //  [{ script: "sub" }, { script: "super" }], // 下標/上標
                //  [{ indent: "-1" }, { indent: "+1" }], // 縮排
                  [{ size: ["small", false, "large", "huge"] }], // 字體大小
                 //[{ header: [1, 2, 3, 4, 5, 6, false] }], // 標題
                  [{ color: [] }, { background: [] }], // 字體顏色、字體背景顏色
                  //[{ font: [] }], // 字體種類
                  //[{ align: [] }], // 對其方式
                  ["clean"], // 清除文本格式
                  //["link", "image", "video"] // 鏈結、圖片、視頻
                ], //工具菜單欄配置
              },
              placeholder: '請設定跑馬燈內容', //提示
              readyOnly: false, //是否只讀
              theme: 'snow', //主題 snow/bubble
              syntax: true, //語法檢測
            },
        detail: '文章内容',
        startDateMenu: false,        
        endDateMenu: false,
        startDate: '',
        endDate: '',
        valid: false,
        maxCharacter: 30,
        duration: 30,
        min: 0,
        max: 60,
        marqueeName: '跑馬燈輪播測試',
        marqueeText: `<p><strong style="color: rgb(255, 255, 204); background-color: rgb(255, 153, 0);">此</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(240, 102, 102);">時</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(194, 133, 255);">已</strong><strong style="color: rgb(136, 136, 136); background-color: rgb(255, 255, 102);">鶯</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(136, 136, 136);">飛</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(0, 41, 102);">草</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(102, 163, 224);">長</strong><strong> </strong><strong style="background-color: rgb(255, 194, 102); color: rgb(153, 51, 255);" class="ql-size-small">愛的人正在路上</strong></p><p><strong style="color: rgb(161, 0, 0);">我知他<u>風雨兼程</u> </strong><strong style="color: rgb(178, 178, 0);">途經日暮不賞 </strong></p><p><strong style="color: rgb(204, 232, 204); background-color: rgb(178, 107, 0);"> 穿越人海</strong><strong style="color: rgb(204, 232, 204);"> </strong><strong style="color: rgb(102, 185, 102);" class="ql-size-small">只為與你相擁</strong></p><p><span style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </span><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">此</strong><strong style="color: rgb(0, 102, 204); background-color: rgb(255, 255, 0);">刻</strong><strong style="color: rgb(153, 51, 255); background-color: rgb(255, 255, 0);">已</strong><strong style="color: rgb(0, 97, 0); background-color: rgb(255, 255, 0);">皓</strong><strong style="color: rgb(178, 107, 0); background-color: rgb(255, 255, 0);">月</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">當</strong><strong style="color: rgb(240, 102, 102); background-color: rgb(255, 255, 0);">空</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </strong><span style="color: rgb(230, 0, 0); background-color: rgb(102, 163, 224);"> </span><em style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">愛的人手捧星光</em></p><p><strong style="color: rgb(255, 255, 255); background-color: rgb(0, 55, 0);">我知他乘風破浪 </strong><span style="color: rgb(187, 187, 187); background-color: rgb(0, 55, 0);"> </span><strong style="color: rgb(255, 235, 204); background-color: rgb(240, 102, 102);">去了黑暗一趟</strong></p>`,
        marqueeDesc: '',
        uploadType: '',
        dates: [],
        fontColor: '#000000',
        backgroundColor: '#ffffff',
        fontBold: false,
        fontItalic: false,
        menu: false,
        menu1: false,
        dateMenu: false,
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
       editor() {
            return this.$refs.myQuillEditor;
          },
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
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    },
    methods: {
          // components: { Editor },
          onEditorBlur() {
            //console.log('editor blur!', quill)
           },
          //獲得焦點
          onEditorFocus() {},
          // 開始
          onEditorReady() { },
          // 值發生變化
          onEditorChange(editor) {            
            this.content = editor.html;
            console.log( editor.html);
            console.log(editor);
          },
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
      decrementDuration() { //減慢播放
        this.duration = this.duration - 1 || 0
      },
      incrementDuration() { //加快播放
        this.duration = this.duration + 1 || 0
      },
      selfUpdate(val) {
        this.marqueeText = val;
      },
    }
  }
</script>

<style>
.marquee.span{
  height:50px;
}
span.marquee .ql-size-small {
    font-size: 0.75em;
}

span.marquee .ql-size-large {
    font-size: 1.25em;
}
span.marquee .ql-size-huge{
    font-size: 1.50em;
}
span.marquee > b, strong {
    font-weight: bolder !important;
    font-size: inherit;
    
}
span.marquee > h1, h2, h3, .h1, .h2, .h3 {
    margin-top: 0px;
    margin-bottom: 0px !important;
}
span.marquee >p{
  font-size: 32px !important;
  margin: 0px;
  font-weight: normal !important;
  display:inline;
} 
span.marquee > span {
   font-weight: normal !important;
   font-size: 32px !important;
}

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
