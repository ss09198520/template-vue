<template>
  <v-container>
    <h2 class="font-bold">{{ pageTitle }}</h2>
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
                placeholder="請輸入跑馬燈名稱，跑馬燈名稱不能重複"
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
            <v-col cols="2" md="2">
              上架日期
              <span class="red--text ml-2">*</span>
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
                    placeholder="上架時間(起)"
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
                    placeholder="上架時間(起)"
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
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                persistent-hint
                prepend-inner-icon="mdi-cloud-upload"
                prepend-icon
                show-size
                counter
                chips
              />
            </v-col>
          </v-row>
          <v-row
            v-if="location !== null"
            :dense="dense"
            :no-gutters="noGutters"
          >
            <v-col cols="2" md="2"> 審核附件歷史上傳 </v-col>          
            <v-col v-if="!isAttachedFiles" cols="6" md="6">
              <a :href="attachedFiles">下載確認</a>
            </v-col>
            <v-col v-else-if="isAttachedFiles" cols="6" md="6">
              {{ attachedFiles }}
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
              <span class="red--text font-14px">
                *錯誤提示：{{ errMsg.editorData }}
              </span>
            </v-col>
          </v-row>
          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col cols="9" md="8">
              <quill
                ref="myQuillEditor"
                v-model="marqueeHTML"
                class="quill-marquee"
                @change="onEditorChange($event)"
              />
            </v-col>
          </v-row>

          <v-row :dense="dense" :no-gutters="noGutters">
            <v-col class="d-flex justify-end" cols="8" md="8">
              <v-btn class="ma-1" outlined color="accent" @click="resetForm">
                取消
              </v-btn>
              <v-btn
                class="ma-1"
                depressed
                color="primary"
                :disabled="isAddButtonDisabled"
                @click="submit(false)"
              >
                暫存
              </v-btn>

              <v-btn
                class="ma-1"
                depressed
                color="success"
                :disabled="!valid"
                @click="submit(true)"
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
import { fetchInitMarquee, fetchQueryMarquee } from "@/api/marquee";
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
      pageTitle: "跑馬燈製作",
      startDateMenu: false,
      endDateMenu: false,
      startDate: "",
      endDate: "",
      valid: false,
      maxCharacter: 255,
      duration: 30,
      min: 0,
      max: 60,
      marqueeName: "台電跑馬燈",
      marqueeHTML: "",
      marqueeText: "",
      marqueeDesc: "",
      attachedFiles: null,
      fontColor: "#000000",
      backgroundColor: "#ffffff",
      dense: false,
      noGutters: false,
      hideDatails: false,
      isSubmited: false,
      location: "",
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
          v => !v || v.size < 25e6 || "Avatar size should be less than 25 MB!"
        ]
      }
    };
  },
  computed: {
    isAttachedFiles() {
      let isTrue = true;
      if (this.attachedFiles !== null) {
        isTrue = this.attachedFiles.includes("無檔案上傳");
      } else {
        isTrue = false;
      }
      return isTrue;
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    isAddButtonDisabled() {
      return !this.valid || this.isSubmited;
    },
    animationDuration() {
      return 600 / this.duration;
    }
  },
  created() {
    this.getQueryString("id");  
    if (this.location !== "" && this.location !== null) {
      this.queryMarqueeById();
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
    this.onEditorChange(this.marqueeHTML);
  },
  methods: {
    getQueryString(name) {
      // eslint-disable-next-line no-sparse-arrays
      this.location = decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) || null;
    },
    queryMarqueeById() {
      fetchQueryMarquee({ marqueeId: this.location })
        .then(res => {
          if (res.restData.code == "00000") {
            let resc = Object.assign({}, res.restData.marquee);
            this.pageTitle = "跑馬燈修改";
            MessageService.showInfo(res.restData.message, "成功✓");
            this.marqueeName = resc.marqueeName;
            this.marqueeText = resc.marqueeContent;
            this.marqueeHTML = resc.marqueeContentHTML;
            this.duration = resc.animationDuration;
            this.marqueeDesc = resc.memo;
            this.startDate = resc.releaseStartDate;
            this.endDate = resc.releaseEndDate;
            this.attachedFiles = resc.attachedFileName;
          } else if (res.restData.code == "20001") {
            MessageService.showError("查詢失敗", res.restData.message);
          }
        })
        .catch(error => {
          this.isSubmited = false;
          console.error(error);
        });
    },
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
          this.valid = false;
        } else {
          this.errMsg.acceptDate = null;
        }
        // 1-2 判斷輪播起迄日只有其中一欄有選擇日期
      } else if (
        !ValidateUtil.isEmpty(this.startDate) ||
        !ValidateUtil.isEmpty(this.endDate)
      ) {
        this.errMsg.acceptDate = "上架日期未選擇完整範圍";
        hasCheck = false;
        this.valid = false;
        // 1-3 判斷輪播起迄日欄位皆未選擇
      } else {
        this.errMsg.acceptDate = "上架日期(起-訖)必填";
      }
      return hasCheck;
    },

    submit(isSign) {
      //if (this.$refs.form.validate()) {
      var formData = new FormData();
      if (this.checkDate && this.onEditorChange) {
        console.log(this.marqueeText);
        /**多檔案要跑回圈 */
        // if(this.attachedFiles) {
        // for (let file in this.attachedFiles) {
        //   formData.append("attachedFiles", file);
        // }

        if (this.attachedFiles) {
          formData.append("attachedFiles", this.attachedFiles);
        }
        formData.append(
          "properties",
          new Blob(
            [
              JSON.stringify({
                marqueeId: this.location,
                marqueeName: this.marqueeName,
                marqueeType: "一般",
                marqueeContent: this.marqueeText,
                marqueeContentHTML: this.marqueeHTML,
                animationDuration: this.duration,
                memo: this.marqueeDesc,
                region: "區處",
                releaseStartDate: this.startDate,
                releaseEndDate: this.endDate,
                sign: isSign
              })
            ],
            {
              type: "application/json"
            }
          )
        );
        console.log(formData.getAll("properties"));

        fetchInitMarquee(formData)
          .then(res => {
            console.log("return");
            if (res.restData.code == "00000") {
              //MessageService.showSuccess("MessageService.showSuccess(res.restData.message)");
              MessageService.showInfo(res.restData.message, "成功✓");
              this.isSubmited = true;
              console.log("登入成功", res);
              this.resetForm();
              console.log(this.isSubmited);
              this.isSubmited = false;
            } else if (res.restData.code == "20001") {
              MessageService.showError("儲存失敗", res.restData.message);
            }
          })
          .catch(error => {
            //MessageService.showError(error.rtnMsg);
            this.isSubmited = false;
            console.error(error);
          });
      }
    },
    resetForm() {
      this.isSubmited = true;
      this.marqueeName = "";
      this.duration = 30;
      this.marqueeDesc = null;
      this.startDate = null;
      this.endDate = null;
      this.attachedFiles = null;
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
        //hasCheck = false;
        //this.valid = false;
        //this.isSubmited = false;
      } else {
        //this.errMsg.editorData = null;
      }
      console.log(this.marqueeText);
      return hasCheck;
    }
  }
};
</script>
<style lang="scss" scoped>
.marquee {
  height: 70px;
  font-family: Helvetica, Arial, sans-serif, "Microsoft JhengHei", "微軟正黑體",
    "Helvetica", sans-serif;
}
span.marquee > h1,
h2,
h3,
.h1,
.h2,
.h3 {
  margin-top: 0px;
  margin-bottom: 0px !important;
}
span.marquee > p {
  font-size: 32px !important;
  margin: 0px;
  font-weight: normal !important;
  display: inline;
}
span.marquee {
  font-size: 32px !important;
  margin: 0px;
  font-weight: normal !important;
  display: inline;
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
.marquee .ql-editor p {
  font-weight: normal !important;
  font-size: 32px !important;
}
.marquee .ql-editor.ql-size-small {
  font-size: 0.75em !important;
}
.marquee .ql-editor.ql-size-large {
  font-size: 1.2em !important;
}
.marquee .ql-editor.ql-size-huge {
  font-size: 1.35em !important;
}
</style>

<style>
/*需要覆蓋 全域的粗體樣式以及大小 此處style 不加上scoped申明 加上class .quill-marquee 避免衝突*/
.quill-marquee .ql-editor p {
  font-weight: normal !important;
  font-size: 32px !important;
}
.quill-marquee .ql-container.ql-snow {
  height: auto;
  font-weight: normal !important;
}
.quill-marquee .ql-size-small {
  font-size: 0.75em !important;
}
.quill-marquee .ql-size-large {
  font-size: 1.2em !important;
}
.quill-marquee .ql-size-huge {
  font-size: 1.35em !important;
}
span.quill-marquee > b,
strong {
  font-weight: bolder !important;
  font-size: inherit !important;
}
</style>