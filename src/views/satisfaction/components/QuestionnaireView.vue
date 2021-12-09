<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <v-form ref="questionnaireForm" v-model="valid" lazy-validation>
          <v-row align="center">
            <v-col class="form-create-wrap font-weight-bold">
              <v-col class="wrap">
                <v-col class="content-wrap">
                  <v-col class="item title" :class="{'title-focus': focusIndex === 'title'}">
                    <v-subheader class="item title justify-center text-md-body-1 font-weight-bold">
                      {{ questionnaire.questionnaireName }}
                    </v-subheader>
                  </v-col>
                  <v-col class="q-wrap">
                    <v-stepper v-model="step">
                      <v-stepper-items>
                        <div v-for="question, idx in questionnaire.questions" :key="idx">
                          <div id="items" :data-step="idx+1" class="q-li" :class="{'q-li-focus': focusIndex === idx}" @click="focusItem($event, idx)">
                            <v-stepper-content :step="idx+1">
                              <v-col class="q-item q-title-wrap">
                                <div class="q-title">
                                  <v-col class="li">
                                    第 {{ idx+1 }} 題 
                                    <div class="q-area font-weight-bold">
                                      {{ question.title }}
                                    </div>
                                  </v-col>
                                </div>
                              </v-col>
                              <div class="q-item-wrap">
                                <div v-if="question.type === 'radio' || question.type === 'checkbox'" class="q-item">
                                  <v-radio-group
                                    v-model="userAnswers[idx]"
                                    :rules="[rules.checkSelected(question.required)]"
                                    :disabled="isView"
                                    row
                                  >
                                    <v-radio
                                      v-for="answer, idx1 in question.answers" 
                                      :key="idx1"
                                      :label="answer.label"
                                      :value="answer.value"
                                      @change="setAnswerValue(question.questionId , answer.answerId , answer.label ,answer.value)"
                                    />
                                  </v-radio-group>
                                </div>
                              </div>
                              <v-btn 
                                v-if="idx > 0"
                                class="mr-1"
                                depressed
                                @click="prevStep($event,stepEl)"
                              >
                                <v-icon v-text="'mdi-chevron-left'" /> 前一題
                              </v-btn>
                              <v-btn
                                v-if="idx < questionnaire.questions.length - 1 "
                                class="mr-1"
                                depressed
                                @click="nextStep($event,stepEl)"
                              >
                                下一題 <v-icon v-text="'mdi-chevron-right'" />
                              </v-btn>
                              <!-- <v-btn
                                v-if="idx === questionnaire.questions.length - 1 && !isView"
                                class="mr-1"
                                depressed
                                color="success"
                                @click="submit"
                              >
                                提交問卷 <v-icon v-text="'mdi-clipboard-text-multiple'" />
                              </v-btn> -->
                            </v-stepper-content>
                          </div>
                        </div>
                      </v-stepper-items>
                    </v-stepper>
                  </v-col>
                </v-col>
              </v-col>
              <v-col v-if="!isView" class="d-flex justify-center">
                <v-btn
                  class="mr-1"
                  depressed
                  color="success"
                  @click="submit"
                >
                  提交問卷 <v-icon v-text="'mdi-clipboard-text-multiple'" />
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { fetchEditQuestionnaire , fetchActiveQuestionnaire , submitQuestionnaireAnswer} from '@/api/questionnaire'
  import isEmpty from 'lodash/isEmpty'

  const defaultForm = {
    questionnaireId: undefined,
    questionnaireName: '',
    acceptNum: '',
    questions: [{
      questionId: '',
    }]
  }
  export default {
    components: {
    },
    props: {
      isView: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        userAnswers: [],
        postForm: Object.assign({}, defaultForm),
        stepEl: 0,
        valid: false,
        rules: {
          checkSelected(isRequired) {
            return  v => (!!v || !isRequired)  || '此題必須作答'
          }
        },
        questionnaire: {},
        focusIndex: 0
      }
    },
    computed: {
      step() {
        return this.stepEl
      }
    },
    mounted() { //initial data
      if (this.isView) {
        const id = this.$route.params && this.$route.params.id
        this.fetchQuestionnaire(id)
      } else {
        this.fetchActiveQuestionnaire()
      }
    },
    methods: {
      focusTitle (event) {
        let classList = event.target.classList
        if (classList.contains('add-list') || classList.contains('el-icon-plus')) return
        this.focusIndex = 'title'
      },
      focusItem (event, i) {
        let classList = event.target.classList
        if (classList.contains('el-icon-delete') || classList.contains('icon-copy') || this.focusIndex === i) return
        this.focusIndex = i
      },
      setAnswerValue (questionId,answerId,answerLabel,answerValue) {
        // console.log('question.questionId:' , questionId , 'answer.answerId:' , answerId , 'answer.value:' , answerValue)
        const question = this.postForm.questions.find((value) => value.questionId===questionId)
        question.userAnswerId = answerId
        question.userAnswerLabel = answerLabel
        question.userAnswerValue = answerValue
      },

      nextStep () {
        this.stepEl = this.stepEl + 1
      },
      prevStep () {
        this.stepEl = this.stepEl - 1
      },
      reset () {
        this.$refs.form.reset()
      },
      // 送出問卷作答
      submit() {
        //API post data 
        this.postForm.acceptNum = this.$route.query.acceptNum
        const postData = { questionnaireAnswer : this.postForm}

        if (this.$refs.questionnaireForm.validate()) {
          this.submitForm(postData)
        }else{
          this.$nextTick(() => {
            this.$el.querySelector(".q-li-focus").classList.remove('q-li-focus');
            const el = this.$el.querySelector(".error--text:first-of-type").parentElement.closest("#items");
            el.classList.add('q-li-focus')
            // this.$vuetify.goTo(el);
            this.stepEl = Number(el.dataset.step)
            return;
          });
        }
      },

      /**
       * @param {Object} questionnaire
       * @returns {Object}
       */
      hasResult (questionnaire) {
        // 驗證questionnaire是否有資料
        if(isEmpty(questionnaire) || questionnaire.questions.length < 1 ){
            MessageService.showInfo('查無相關資料')
            return
        }
        return true
      },

      /**
       * 
       * Ajax start 
       * 
       **/
      
      // Action:問卷作答頁面初始化
      async fetchActiveQuestionnaire() {
        const data = await fetchActiveQuestionnaire()
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'查詢問卷上架資料');
            return;
        }
        // 驗證是否有資料
        if(this.hasResult(data.restData.questionnaire)){
          this.questionnaire = data.restData.questionnaire
          //填答時先將固定回傳資料Assign 進 postForm
          Object.keys(this.questionnaire).filter(key => key in this.postForm).forEach(key => this.postForm[key] = this.questionnaire[key]);
          this.$nextTick(() => {this.stepEl = 1});
        }
      },

      //Action:問卷預覽頁面初始化
      async fetchQuestionnaire(id) {
        const data = await fetchEditQuestionnaire(id)
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'查詢問卷詳細資料');
            return;
        }
        // 驗證是否有資料
        if(this.hasResult(data.restData.questionnaire)){
          this.questionnaire = data.restData.questionnaire
          this.hasResult(this.questionnaire)
          this.$nextTick(() => {this.stepEl = 1});
        }
      },

      //Action:問卷預覽頁面初始化
      async submitForm(postData) {
        const data = await submitQuestionnaireAnswer(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'送出問卷作答資料');
            return;
        }

        MessageService.showSuccess('作答成功' + "✓")

        window.close();
      },
      
    }
  }
</script>

<style lang="scss" scoped >
  .form-create-wrap {
    $green: #4ca2ae;
    $grey: rgba(0,0,0,.5);
    position: relative;
    width: 80%;
    min-width: 400px;
    margin: 30px auto;
    @media (min-width: 520px) {
      width: 100%;
    }
    .wrap {
      width: 780px;
      min-height: 100px;
      margin: 0 auto;
      @media (max-width: 920px) {
        width: 100%;
      }
      display: flex;
      .content-wrap {
        flex: 1;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.1);
        margin-right: 10px;
      }
    }
    .item {
      padding: 16px 24px 24px 42px;
      .li-right {
        text-align: right;
      }
      .li-left {
        text-align: left;
        .q-select {
          display: inline-block;
          width: 120px;
        }
      }
    }
    .title-focus {
      border-left-color: $green !important;
    }
    .title {
      border-left: 3px solid transparent;
      position: relative;
    }
    .q-wrap {
      .q-li-focus {
        border-left-color: $green !important;
        box-shadow: 0 -2px 2px 0 rgba(0,0,0,0.2), 0 2px 6px 0 rgba(0,0,0,0.24);
      }
      .q-li {
        border-left: 3px solid transparent;
      }
      .q-title-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px !important;
        .q-index {
          flex: 1;
          flex-grow: 0;
          margin-right: 10px;
        }
        .q-title {
          flex: 1;
          flex-grow: 2;
          .li {
            margin-bottom: 0;
          }
        }
        .q-select {
          flex: 1;
          flex-shrink: 0;
        }
      }
      .drap-area {
        padding: 5px;
        cursor: move;
        .icon-tuozhuai {
          color: lightgray;
          font-size: 20px;
          margin-left: 37px;
        }
      }
      .q-item-wrap {
        padding:  16px 24px 24px 42px;
      }
      .q-item {
        margin-bottom: 10px;
        /*overflow: hidden;*/
        .q-radio {
          margin: 15px auto;
          display: flex;
          align-items: center;
          .icon-radio {
            width: 15px;
            height: 15px;
            border: 2px solid transparent;
            margin-right: 15px;
          }
          .icon-cirle {
            border: 2px solid lightgray;
            border-radius: 50%;
          }
          .icon-square {
            border: 2px solid lightgray;
            border-radius: 0;
          }
          input {
            flex: 2;
            margin-right: 15px;
            border: 1px solid transparent;
            padding-bottom: 3px;
            &:focus {
              border-bottom: 1px solid lightgray;
            }
          }
          i {
            flex: 1;
            flex-grow: 0;
            color: rgba(0,0,0,0.3);
            cursor: pointer;
          }
          .radio-add {
            color: $green;
            font-weight: bold;
            cursor: pointer;
            flex: 0;
          }
        }
      }
      .line-wrap {
        .q-item-line {
          display: flex;
          align-items: center;
          .el-select {
            width: 70px;
            .el-input {
              border: none !important;
            }
          }
          .line-tip {
            padding: 15px;
          }
        }
        .q-radio {
          input {
            border-bottom: 1px solid lightgray !important;
            flex: 0;
          }
        }
      }
      .text-wrap {
        color: $grey;
        border-bottom: 1px dotted lightgray;
        padding-bottom: 5px;
        width: 60%;
        text-align: left;
      }
      .square-wrap {
        display: flex;
        .square-li {
          flex: 1
        }
      }
      .option-wrap {
        overflow: hidden;
        border-top: 1px solid lightgray;
        .option-list {
          float: right;
          li {
            float: left;
            list-style: none;
            margin: 20px 0 0 25px;
            .icon-copy {
              font-size: 20px;
            }
            .el-icon-delete {
              font-size: 21px;
              vertical-align: middle;
            }
            i {
              cursor: pointer;
            }
          }
          .lang-li {
            margin: 15px 8px;
            display: flex;
            align-items: center;
            span {
              margin-left: 10px;
              cursor: pointer;
              color: $green;
              font-weight: bold;
            }
            .el-select {
              width: 120px;
            }
          }
        }
      }
      .lang-wrap {
        border-top: 1px dotted lightgray;
        padding-top: 20px;
        .lang-li-wrap {
          display: flex;
          .li-text {
            margin-right: 15px;
            i {
              display: block;
              margin-top: 20px;
              cursor: pointer;
            }
            .el-icon-delete {
              font-size: 21px;
            }
          }
          .li-content {
            flex: 1;
          }
        }
      }
    }
    .li {
      position: relative;
      margin-bottom: 15px;
      height: 100%;
      &:after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -1px;
        left: 0;
        transform: scaleX(0);
        background-color: $green;
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-delay: 0s;
      }
      &:hover:after {
        border-bottom: 1px solid transparent;
        transform: scaleX(1);
      }
      .form-title {
        font-size: 24px;
        &::-webkit-input-placeholder {
          font-size: 24px;
        }
      }
      .title-area {
        font-size: 20px;
        &::-webkit-input-placeholder {
          font-size: 20px;
        }
      }
      .q-area {
        font-size: 18px;
        &::-webkit-input-placeholder {
          font-size: 18px;
        }
      }
    }
    textarea {
      background-color: transparent;
      border: none;
      resize: none;
      display: block;
      width: 100%;
      height: 35px;
    }
    .expand-area {
      position: relative;
      textarea {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        overflow: hidden;
      }
      pre {
        display: block;
        visibility: hidden;
        min-height: 100px;
        margin: 0;
      }
    }
    .add-lang {
      .li-item {
        display: flex;
        align-items: center;
        .label {
          margin-right: 15px;
        }
      }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: $grey;
    }
    .el-tabs__item.is-active, .el-tabs__new-tab:hover {
      color: $green;
    }
  }
</style>
