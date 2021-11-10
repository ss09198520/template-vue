<template>
  <v-container>
    <h2 class="font-bold">跑馬燈製作</h2>
    <v-row class="ml-10">
      <v-col class="ml-10 font-18px" cols="12">
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
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="2" md="2"> 描述註記 </v-col>
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
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="2" md="2"> 上架日期 </v-col>
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
                    :rules="rules.requiredRule"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width: 100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="startDateMenu = false"
                  @change="checkDate()"
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
                    :rules="rules.requiredRule"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    hide-details
                    v-bind="attrs"
                    style="width: 100%"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="endDateMenu = false"
                  @change="checkDate()"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="errMsg.acceptDate !== null"
              cols="2"
              md="2"
              style="margin-top: -25px"
            >
              <span class="red--text font-14px">*錯誤提示： </span>
            </v-col>
            <v-col cols="6" md="6" style="margin-top: -25px">
              <span class="red--text font-14px">{{ errMsg.acceptDate }}</span>
            </v-col>
          </v-row>
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="2" md="2"> 審核附件上傳 </v-col>
            <v-col cols="6" md="6">
              <v-file-input
                v-model="attachedFiles"
                :rules="rules.filesSizeRules"
                type="file"
                color="accent"
                label="點擊上傳檔案"
                outlined
                dense
                accept="application/pdf,application/vnd.ms-excel,image/gif, image/jpeg, image/png"
                persistent-hint
                prepend-inner-icon="mdi-cloud-upload"
                prepend-icon
                show-size
                counter
                chips
              />
            </v-col>
          </v-row>
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="2" md="2"> 播放速度 </v-col>
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
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="2" md="2">
              樣式預覽
              <span class="red--text ml-2">*</span>
            </v-col>
            <v-col cols="6" md="6">
              <marquee-text
                :duration="animationDuration"
                :repeat="1"
                :background-color="backgroundColor"
                :font-color="fontColor"
                class="marquee"
              >
                {{ marqueeHTML }}
              </marquee-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="errMsg.editorData !== null"
              cols="10"
              md="10"
              style="margin-top: -25px"
            >
              <span 
                class="red--text font-14px"
              >*錯誤提示：{{ errMsg.editorData }}
              </span>
            </v-col>
          </v-row>
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="9" md="8">
              <quill
                ref="editor"
                v-model="marqueeHTML"
                class="quill-marquee"                
                @change="onEditorChange($event)"
              />
            </v-col>
          </v-row>

          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col class="d-flex justify-end" cols="8" md="8">
              <v-btn class="ma-1" outlined color="accent"> 取消 </v-btn>
              <v-btn
                class="ma-1"
                depressed
                color="primary"
                :disabled="isAddButtonDisabled"
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
import Quill from "@/components/Quill";
import { fetchInitMarquee, fetchListMarquee } from "@/api/marquee";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";
export default {
  components: { Quill },
  data() {
    return {
      errMsg: {
        acceptDate: null,
        editorData: null
      },
      startDateMenu: false,
      endDateMenu: false,
      startDate: "",
      endDate: "",
      valid: false,
      maxCharacter: 255,
      duration: 30,
      min: 0,
      max: 60,
      marqueeName: "",
      marqueeHTML: "123",
      //`<p><strong style="color: rgb(255, 255, 204); background-color: rgb(255, 153, 0);">此</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(240, 102, 102);">時</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(194, 133, 255);">已</strong><strong style="color: rgb(136, 136, 136); background-color: rgb(255, 255, 102);">鶯</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(136, 136, 136);">飛</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(0, 41, 102);">草</strong><strong style="color: rgb(255, 255, 204); background-color: rgb(102, 163, 224);">長</strong><strong> </strong><strong style="background-color: rgb(255, 194, 102); color: rgb(153, 51, 255);" class="ql-size-small">愛的人正在路上</strong></p><p><strong style="color: rgb(161, 0, 0);">我知他<u>風雨兼程</u> </strong><strong style="color: rgb(178, 178, 0);">途經日暮不賞 </strong></p><p><strong style="color: rgb(204, 232, 204); background-color: rgb(178, 107, 0);"> 穿越人海</strong><strong style="color: rgb(204, 232, 204);"> </strong><strong style="color: rgb(102, 185, 102);" class="ql-size-small">只為與你相擁</strong></p><p><span style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </span><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">此</strong><strong style="color: rgb(0, 102, 204); background-color: rgb(255, 255, 0);">刻</strong><strong style="color: rgb(153, 51, 255); background-color: rgb(255, 255, 0);">已</strong><strong style="color: rgb(0, 97, 0); background-color: rgb(255, 255, 0);">皓</strong><strong style="color: rgb(178, 107, 0); background-color: rgb(255, 255, 0);">月</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);">當</strong><strong style="color: rgb(240, 102, 102); background-color: rgb(255, 255, 0);">空</strong><strong style="color: rgb(230, 0, 0); background-color: rgb(255, 255, 0);"> </strong><span style="color: rgb(230, 0, 0); background-color: rgb(102, 163, 224);"> </span><em style="color: rgb(255, 255, 255); background-color: rgb(102, 163, 224);">愛的人手捧星光</em></p><p><strong style="color: rgb(255, 255, 255); background-color: rgb(0, 55, 0);">我知他乘風破浪 </strong><span style="color: rgb(187, 187, 187); background-color: rgb(0, 55, 0);"> </span><strong style="color: rgb(255, 235, 204); background-color: rgb(240, 102, 102);">去了黑暗一趟</strong></p>`,
      marqueeText: "",
      marqueeDesc: "",
      attachedFiles: null,
      fontColor: "#000000",
      backgroundColor: "#ffffff",
      dense: false,
      noGutters: false,
      hideDatails: false,
      isSubmited: false,
      rules: {
        requiredRule: [v => !!v || "此欄位為必填欄位"],
        lengthRules: [
          v =>
            (v || "").length <= this.maxCharacter ||
            "Description must be 255 characters or less"
        ],
        /*filesSizeRules: [
          attachedFiles =>
            !attachedFiles ||
            !attachedFiles.some(attachedFiles => attachedFiles.size > 25e6) ||
            "Avatar size should be less than 25 MB!"
        ] 多檔案使用*/
        filesSizeRules: [
          v => !v || v.size < 25e6 || 'Avatar size should be less than 25 MB!',
         ],
      }
    };
  },
  computed: {      
    editor() {
      return this.$refs.myQuillEditor;
    },
    
    isAddButtonDisabled(){
      return !this.valid && !this.isSubmited;
    },

    animationDuration() {
      return 600 / this.duration;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
    this.onEditorChange(this.marqueeHTML);
  },
  methods: {

    filtersHTML(val) {
      if (val != null && val != "") {
        let reg = /<[^>]+>/g;
        return val.replace(reg, "");
      } else {
        return "";
      }
    },
    filtersBr(val) {
      if (val != null && val != "") {        
        let reg = /<br>/g;
        return val.replace(reg, "");
      } else {
        return "";
      }
    },
    checkDate() {
      this.errMsg.acceptDate = null;
      let hasCheck = true;
      // 1-1 輪播起迄日都有選擇
      if (
        !ValidateUtil.isEmpty(this.startDate) &&
        !ValidateUtil.isEmpty(this.endDate)
      ) {
        if (!ValidateUtil.validateDateRange(this.startDate, this.endDate)) {
          this.errMsg.acceptDate =
            "上架日期選擇範圍錯誤，起始日期不得大於結束日期";
          hasCheck = false;
        } else {
          this.errMsg.acceptDate = null;
        }
        // 1-2 判斷輪播起迄日只有其中一欄有選擇日期
      } else if (
        !ValidateUtil.isEmpty(this.startDate) ||
        !ValidateUtil.isEmpty(this.endDate)
      ) {
        this.errMsg.acceptDate = "上架日期未選擇完整範圍";
        // this.formatArray.push('受理日期區間');
        hasCheck = false;
        // 1-3 判斷受理日期起訖日欄位皆未選擇
      } else {
        this.errMsg.acceptDate = "上架日期(起-訖)必填";
      }
      return hasCheck;
    },

    submit() {
      //if (this.$refs.form.validate()) {
      var formData = new FormData();
      if (this.checkDate && this.onEditorChange) {
        console.log(this.marqueeText);
        if(this.attachedFiles) {
          for (let file in this.attachedFiles) {
            formData.append("attachedFiles", file);
          }
          console.log(formData.getAll("attachedFiles"));
          console.log(this.attachedFiles);
          console.log("hi here");
          formData.append("properties",new Blob([JSON.stringify({
              "marqueeName": this.marqueeName,
              "marqueeType": "一般",
              "marqueeContent": this.marqueeText,
              "marqueeContentHTML": this.marqueeHTML,
              "animationDuration": this.duration,
              "memo": this.marqueeDesc,
              "region": "區處",
              "releaseStartDate": this.startDate,
              "releaseEndDate": this.endDate                    
            })], {
                type: "application/json"
            }));
        }else{
          formData.append("properties",new Blob([JSON.stringify({
              "marqueeName": this.marqueeName,
              "marqueeType": "一般",
              "marqueeContent": this.marqueeText,
              "marqueeContentHTML": this.marqueeHTML,
              "animationDuration": this.duration,
              "memo": this.marqueeDesc,
              "region": "區處",
              "releaseStartDate": this.startDate,
              "releaseEndDate": this.endDate                    
            })], {
                type: "application/json"
            }));
        }
        fetchInitMarquee({formData})
          .then(res => {
            console.log("登入成功", res);
            MessageService.showSuccess(res.rtnMsg);
            this.isSubmited = true;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    decrementDuration() {
      //減慢播放
      this.duration = this.duration - 1 || 0;
    },
    incrementDuration() {
      //加快播放
      this.duration = this.duration + 1 || 0;
    },
    onEditorChange(val) {
      let hasCheck = true;
      //取代編輯器換行
      this.marqueeHTML = this.filtersBr(val);
      //取得編輯完成純文字
      this.marqueeText = this.filtersHTML(val);
      //判斷編輯器內容長度至少大於等於2 初始""\n"
      if (this.marqueeText.length <= 2) {
        this.errMsg.editorData = "跑馬燈內容必填";
        hasCheck = false;
      } else {
        this.errMsg.editorData = null;
        hasCheck = true;
      }
      console.log(this.marqueeText);
      return hasCheck;
    }
  }
};
</script>
<style lang="scss" scoped>
.marquee{
  height: 70px;  
  font-family: Helvetica, Arial, sans-serif, "Microsoft JhengHei", "微軟正黑體","Helvetica", sans-serif
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
span.marquee{
  font-size: 32px !important;
  margin: 0px;
  font-weight: normal !important;
  display:inline;
} 
span.marquee > span {
   font-weight: normal !important;
   font-size: 32px !important;
}
.quill-marquee .ql-editor {
  font-weight: normal !important;
  line-height: 1.42;
  height: 150px;
  font-size: 32px;
}
 .ql-editor p{
  font-weight: normal !important; 
  font-size: 32px !important; 
}
.ql-editor.ql-size-small {
    font-size: 0.75em !important; 
}
 .ql-editor.ql-size-large {
    font-size: 1.20em !important; 
}
 .ql-editor.ql-size-huge {
    font-size: 1.35em !important; 
}
</style>

<style>
/*需要覆蓋 全域的粗體樣式以及大小 此處style 不加上scoped申明 加上class .quill-marquee 避免衝突*/
.quill-marquee .ql-container.ql-snow{
  height: auto;
  font-weight: normal !important;
}  
.quill-marquee .ql-size-small {
    font-size: 0.75em !important;
}
.quill-marquee .ql-size-large {
    font-size: 1.20em !important;
}
.quill-marquee .ql-size-huge{
    font-size: 1.35em !important;
}
span.quill-marquee > b, strong {
    font-weight: bolder !important;
    font-size: inherit !important;
} 
</style>