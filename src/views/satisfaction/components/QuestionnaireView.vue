<template>
  <div>
    <v-container v-if="!initStatus">
      <v-row>
        <v-card
          class="mx-auto"
          max-width="900"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              size="80"
            ><v-img src="~@/images/logo_tpc.svg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-h4 mt-6 mb-10">
                服務滿意度調查同意書
              </div>
              <div class="text-h6 mt-4 mb-2">
                感謝您長期對台灣電力公司的支持與愛護。              
                想了解更多關於您的經驗和意見有助於我們建構更完善的服務流程。             
                接下來需花費您3-5分鐘進行簡短的服務滿意度調查。
              </div>
              <div v-show="false" class="text-h6 mt-4 mb-2 info--text">
                我們不會將您對此調查的回答與您的個人資訊相關聯。
              </div>
              <div class="text-h6 mt-4 mb-2 error--text">
                我們將會保留您的調查回答以及個人資訊相關聯，以利後續優化或訪談。
              </div>
            </v-list-item-content>
          </v-list-item>
          <div class="crystalStyle text-center" justify="space-around">
            <v-btn
              class="col-5 mr-1"
              rounded
              depressed
              @click="custom_close()"
            >
              不同意
            </v-btn>
            <v-btn
              class="col-5 mr-1"
              rounded
              depressed
              color="info"
              @click="initStatus=true"
            >
              同意
            </v-btn>
          </div>
        </v-card>
      </v-row>
    </v-container>
    <div v-if="initStatus">
      <div id="header">
        <div id="nav">
          <div id="logo">
            <a class="circle">
              <h1>LOGO</h1>
            </a><a class="text">
              <h1>台灣電力公司</h1>
            </a>
          </div>
          <div class="clear" />
        </div>
        <div id="top_menu">
          <ul id="menu" class="scrollbar" data-mcs-theme="minimal-dark" />
        </div>
      </div>
      <v-container>
        <v-row>
          <v-col>
            <v-form id="questionnaireForm" ref="questionnaireForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col class="form-create-wrap font-weight-bold">
                  <v-col class="wrap">
                    <v-col class="content-wrap">
                      <v-col class="item title" :class="{'title-focus': focusIndex === 'title'}">
                        <v-subheader class="title font-weight-bold">
                          {{ "台灣電力公司營業櫃台服務滿意度調查" }}｜問卷主題:{{ questionnaire.questionnaireName }}
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
                                  <v-row class="crystalStyle" justify="space-around">
                                    <v-btn 
                                      v-if="idx > 0"
                                      class="col-5 mr-1"
                                      depressed
                                      @click="prevStep($event,stepEl)"
                                    >
                                      <v-icon v-text="'mdi-chevron-left'" /> 前一題
                                    </v-btn>
                                    <v-btn
                                      v-if="idx < questionnaire.questions.length - 1 "
                                      class="col-5 mr-1"
                                      depressed
                                      @click="nextStep($event,stepEl)"
                                    >
                                      下一題 <v-icon v-text="'mdi-chevron-right'" />
                                    </v-btn>
                                  </v-row>
                                </v-stepper-content>
                              </div>
                            </div>
                          </v-stepper-items>
                        </v-stepper>
                      </v-col>
                      <v-col v-if="!isView" class="d-flex justify-center">
                        <input id="answered" type="hidden" :value="answered">
                        <v-btn
                          class="mr-1 text-h6"                        
                          color="success"
                          block
                          elevation="1"
                          fab
                          rounded                        
                          @click="submit"
                        >
                          提交問卷&emsp;<v-icon v-text="'mdi-clipboard-text-multiple'" />
                        </v-btn>
                      </v-col>
                    </v-col>
                  </v-col>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
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
        initStatus: false,
        userAnswers: [],
        postForm: Object.assign({}, defaultForm),
        stepEl: 0,
        valid: false,
        answered: false,
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
      custom_close(){
        
        if(confirm("您確定要關閉本頁嗎？")){
          window.opener=null;
          window.open('','_self');
          window.close();
        }
      },
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
        
        //作答成功後將隱藏欄位改為true ,可於parent window查詢判斷訊息
        this.answered = true
        this.$nextTick(() => {
          window.close()
        });
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

/*台電header */
  #header {
    width: 100%;
    background: #FFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  #nav {
    width: 100%;
    margin: 0 auto;
    padding: 30px 0 10px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 1250px;
  }


  #logo {
      position: relative;
      float: left;
      width: 280px;
      height: 30px;
  }

  #logo .circle {
    position: absolute;
    top: -20px;
    left: 0px;
    z-index: 9998;
    margin: 0;
    padding: 0;
    width: 100px;
    height: 100px;
    background: url("~@/images/logo_tpc.svg") no-repeat center;
    text-indent: -9999px;
  }

  #logo a {
    display: block;
  }

  a:link,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  .clear {
    zoom: 1;
    clear: both;
  }


  #logo .text {
    position: absolute;
    top: 0px;
    left: 100px;
    z-index: 9998;
    margin: 0;
    padding: 0;
    width: 164px;
    height: 27px;
    background: url("~@/images/logo.png") no-repeat left center;
    text-indent: -9999px;
  }

  #top_menu {
    position: relative;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #9dd127;
    background: -webkit-radial-gradient(top, ellipse cover, #43c11c 0%, #54cb11 10%, #87d127 50%, #9dd127 100%);
    background: -moz-radial-gradient(top, ellipse cover, #43c11c 0%, #54cb11 10%, #87d127 50%, #9dd127 100%);
    background: radial-gradient(ellipse at top, #43c11c 0%, #54cb11 10%, #87d127 50%, #9dd127 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#43c11c', endColorstr='#9dd127',GradientType=1 );
  }

  #top_menu ul {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 56px;
    margin: 0 auto;
    padding: 0 0 0 105px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .crystalStyle{
     margin-bottom: 20px !important;
  }
</style>
<style>
/*問卷框架*/
  #questionnaireForm .form-create-wrap .wrap {
    width: auto;
    min-height: 100px;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  #questionnaireForm .form-create-wrap .wrap .content-wrap{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #fff;
    -webkit-box-shadow: 0;
    box-shadow: 0 0 2px rgb(0 0 0 / 0%), 0 2px 4px rgb(0 0 0 / 0%);
    margin-right: 10px;
  }

  #questionnaireForm .form-create-wrap .q-wrap .q-li-focus{
    border-left-color: #ffffff !important;
    -webkit-box-shadow: 0 -2px 2px 0 rgb(0 0 0 / 20%), 0 2px 6px 0 rgb(0 0 0 / 24%);
    box-shadow: 0 -2px 2px 0 rgb(0 0 0 / 20%), 0 2px 6px 0 rgb(0 0 0 / 24%);
  }

  #questionnaireForm .form-create-wrap{
    position: relative;
    width: 80%;
    min-width: 400px;
    margin: 0px auto;
  }

  #questionnaireForm .form-create-wrap .q-wrap .q-item-wrap{
    padding: 0px 24px 54px 42px;
  }

  #questionnaireForm .v-stepper__content {
    top: 0;
    padding: 24px 24px 56px 24px;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    width: 100%;
  }

  #questionnaireForm .form-create-wrap .q-wrap .q-title-wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 0px !important;
  }

  /**redio buttom */
  .ckbutton_checkbox, .rdobutton_radio{
    width: 60px;
    height: 60px;
  }
  #questionnaireForm .v-label {
        font-size: 25px;
  }

  #questionnaireForm .v-icon.v-icon.v-icon.v-icon {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-font-feature-settings: "liga";
    font-feature-settings: "liga";
    font-size: 34px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    position: relative;
    text-indent: 0;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #questionnaireForm .v-input--radio-group__input {
    border: none;
    cursor: default;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
</style>
