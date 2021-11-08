<template>
  <v-container>
    <h2 class="font-bold">滿意度問卷製作</h2>
    <v-row class="justify-center">
      <v-col
        class="ml-10"
        cols="12"
      >
        <v-form ref="questionnaireForm" v-model="valid" lazy-validation>
          <fet-card
            full-width
            outlined
            title="問 卷 製 作"
          >
            <v-row align="center">
              <div class="form-create-wrap font-weight-bold">
                <div v-if="!loading" class="wrap">
                  <div class="content-wrap">
                    <div class="item title" :class="{'title-focus': focusIndex === 'title'}" @click="focusTitle($event)">
                      <v-row>
                        <v-col md="3">
                          <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                            問 卷 標 題
                            <span class="red--text">*</span>
                          </v-subheader>
                        </v-col>
                        <v-col>
                          <v-textarea
                            v-model="questionnaire.questionnaireName"
                            :rules="rules.requiredRule"
                            class="form-title"
                            color="accent"
                            outlined
                            placeholder="問卷標題"
                            counter="40"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col md="3">
                          <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                            問 卷 描 述
                            <span class="red--text">*</span>
                          </v-subheader>
                        </v-col>
                        <v-col>
                          <v-textarea 
                            v-model="questionnaire.memo"
                            :rules="rules.requiredRule"
                            color="accent"
                            outlined
                            placeholder="問卷描述"
                            counter="40"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col md="3">
                          <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                            上 架 時 間
                            <span class="red--text">*</span>
                          </v-subheader>
                        </v-col>
                        <v-col md="3">
                          <v-menu
                            v-model="releaseDateStartMenu"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="questionnaire.releaseStartDate"
                                :rules="rules.requiredRule"
                                append-icon="mdi-calendar"
                                label="上架時間"
                                color="accent"
                                outlined
                                dense
                                class="font-weight-bold"
                                :clearable="true"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="questionnaire.releaseStartDate"
                              no-title
                              scrollable
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col md="3">
                          <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                            審 核 附 件 上 傳
                            <span class="red--text">*</span>
                          </v-subheader>
                        </v-col>
                        <v-col>
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
                      <div v-if="!questionnaire.questions.length" class="add-list" color="primary">
                        <v-btn
                          class="ma-2"
                          fab
                          color="#68cbd8"
                          @click="addListFn"
                        >
                          <v-icon v-text="'mdi-plus'" />
                        </v-btn>
                      </div>
                    </div>
                    <v-col class="q-wrap">
                      <draggable 
                        :list="questionnaire.questions"
                        :options="{group:'question'}"
                        @start="drag=true" 
                        @end="onEnd"
                      >
                        <template v-for="question, idxQ in questionnaire.questions">
                          <v-col id="items" :key="idxQ" class="q-li" :class="{'q-li-focus': focusIndex === idxQ}" @click="focusItem($event, idxQ)">
                            <div class="drap-area">
                              <v-icon v-text="'mdi-drag-horizontal'" />
                            </div>
                            <div class="q-item-wrap">
                              <div class="q-item q-title-wrap">
                                <div class="q-title">
                                  <v-text-field 
                                    v-model="question.title" 
                                    :rules="rules.requiredRule"
                                    placeholder="問題名稱" 
                                    color="#68cbd8" 
                                    outlined
                                  />
                                </div>
                              </div>
                              <div class="q-item">
                                <v-radio-group
                                  disabled
                                  row
                                >
                                  <v-radio
                                    v-for="answer, idxAns in question.answers" 
                                    :key="idxAns"
                                    :label="answer.label"
                                    :value="answer.value"
                                  />
                                </v-radio-group>
                              </div>
                              <div v-if="focusIndex === idxQ" class="q-item option-wrap">
                                <v-divider class="mt-6 mb-5" />
                                <ul class="option-list">
                                  <li>
                                    <v-icon @click="copyListFn(idxQ)" v-text="'mdi-content-copy'" />
                                  </li>
                                  <li>
                                    <v-icon @click="deleteListFn(idxQue)" v-text="'mdi-delete'" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </v-col>
                        </template>
                      </draggable>
                    </v-col>
                  </div>
                  <!-- <v-btn v-if="questionnaire.questions.length" class="primary form-sidebar" @click="addListFn">
                    <v-icon v-text="'mdi-plus'" />
                  </v-btn> -->
                </div>
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
                    @click="submit"
                  >
                    暫存
                  </v-btn>
                  <v-btn
                    class="ma-1"
                    depressed
                    color="success"
                    @click="submit"
                  >
                    送出審核
                  </v-btn>
                </v-col>
              </div>
            </v-row>
          </fet-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable'
  import MessageService from "@/assets/services/message.service";
  import { initQuestionnaireAnswer} from '@/api/questionnaire'

// import isEmpty from 'lodash/isEmpty'
  // let lineEndOptions = Array.apply(null, Array(9)).map((item, i) => {
  //   return i + 2
  // })

  const defaultForm = {
    questionnaireName: null,
    memo: null,
    releaseStartDate: null, 
    questions: null
  }
  //固定的答案 
  const defaultAnswers =  [ 
    { label: '非常滿意', value: '5' },
    { label: '滿意', value: '4' },
    { label: '普通', value: '3' },
    { label: '不滿意', value: '2' },
    { label: '非常不滿意', value: '1' },
  ]

  const defaultQuestion = {
    question_id: null,
    title:'',
    type: 'radio',
    required: true,
    answers: null
  }

  export default {
    
    components: { draggable },

    data () {
      return {
        drag: false,
        valid: false,
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v && v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },

        auth: false,  
        loading: false,
        hideDatails: false,
        //日曆
        releaseDateStartMenu: false,
        //日曆 end
        
        postForm: Object.assign({}, defaultForm), //Form 送出用
        questionnaire: {
          questionnaireName: '',
          memo: '',
          releaseStartDate: null,
          questions: [{
            question_id: 1,
            title:'',
            type: 'radio',
            required: true, //預設此題必答
            answers: Object.assign([], defaultAnswers), //塞入預設答案
            }
          ]
        }, // 呈現用送出用
        
        // selectOptions: ['單選題', '多選題', '下拉列表', '線性量表', '矩陣量表', '優先級', '文本題'],
        type: 'radio',
        langCode: ['zh'],
        langList: ['中文'],
        // selectOptions: ['單選題', '多選題', '下拉列表', '線性量表', '矩陣量表', '優先級', '文本題'],
        // langCode: ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar'],
        // langList: ['中文', '英語', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '意大利語',
        //   '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語'],
        focusIndex: 0
      }
    },
    mounted() { //initial data
      // if (this.isView) {
      //   const id = this.$route.params && this.$route.params.id
      //   this.fetchQuestionnaire(id)
      // } else {
        // this.init()
      // }
    },
    methods: {
      onEnd () {
        this.drag = false
      },
      onMove ({relatedContext, draggedContext}) {
        let relatedIndex = relatedContext.index
        let index = draggedContext.index
        relatedContext.element.question_id = index + 1
        draggedContext.element.question_id = relatedIndex + 1
      },
      focusTitle (event) {
        let classList = event.target.classList
        if (classList.contains('add-list')) return
        this.focusIndex = 'title'
      },
      focusItem (event, i) {
        let classList = event.target.classList
        if (classList.contains('icon-copy') || this.focusIndex === i) return
        this.focusIndex = i
      },
      // addRadioFn (i, j) {
      //   let list = this.questionnaire.questions[i].content[j].answer
      //   this.addFormFn(list)
      // },
      // deleteRadioFn (i, j, k) {
      //   this.questionnaire.question[i].content[j].answer.splice(k, 1)
      // },
      // addFormFn (list) {
      //   let index = list.length ? parseInt(list[list.length - 1].description.substr(2)) + 1 : '1'
      //   let text = index ? '選項' + index : '選項1'
      //   list.push({answer_id: list.length + 1, description: text})
      //   this.$nextTick(() => {
      //     let input = document.querySelectorAll('.radio-input')
      //     input[input.length - 1].focus()
      //   })
      // },

      //初始化 
      init () {
        this.questionnaire = {
          questionnaireName: '',
          memo: '',
          releaseStartDate: null,
          questions: [{
            question_id: 1,
            title:'',
            type: 'radio',
            required: true, //預設此題必答
            answers: Object.assign([], defaultAnswers), //塞入預設答案
            }
          ]
        }
      },
      copyListFn (index) {
        let data = JSON.parse(JSON.stringify(this.questionnaire.questions[index]))
        this.questionnaire.questions.splice(index, 0, data)
        this.focusIndex = this.questionnaire.questions.length - 1
        console.log(this.questionnaire ,this.focusIndex ,this.questionnaire.questions)
      },
      addListFn () {
        let newQuestion = Object.assign({}, defaultQuestion) //塞入預設題目

        newQuestion.question_id = this.questionnaire.questions.length + 1 
        newQuestion.answers = Object.assign([], defaultAnswers) //塞入預設答案
        
        this.questionnaire.questions.push(newQuestion)
        this.focusIndex = this.questionnaire.questions.length - 1
        console.log(this.data)
      },
      deleteListFn (i) {
        this.questionnaire.questions.splice(i, 1)
        this.focusIndex = i === 0 && this.questionnaire.questions.length > 0 ? i : i - 1
      },
      // 送出問卷製作儲存
      submit() {
        //填答時先將資料Assign 進 postForm
        Object.keys(this.questionnaire).filter(key => key in this.postForm).forEach(key => this.postForm[key] = this.questionnaire[key]);

        //API post data 
        const postData = { questionnaire : this.postForm}

        if (this.$refs.questionnaireForm.validate()) {
          console.log(postData)
          this.submitForm(postData)
        }else{
          this.$nextTick(() => {
            const el = this.$el.querySelector(".error--text:first-of-type");
            this.$vuetify.goTo(el);
            return;
          });
        }
      },


      /**
       * 
       * Ajax start 
       * 
       **/
      
      //Action:問卷預覽頁面初始化
      async submitForm(postData) {
        const data = await initQuestionnaireAnswer(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'儲存問卷作答資料');
            return;
        }

        MessageService.showSuccess('作答成功' + "✓")
      },
    }
  }
</script>

<style lang="scss">
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
      .form-sidebar {
        flex: 1;
        flex-grow: 0;
        align-self: flex-end;
        display: inline-block;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
        .sidebar-li {
          cursor: pointer;
          padding: 10px 12px;
        }
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
      .add-list {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        // i {
        //   color: $green;
        //   font-size: 22px;
        // }
      }
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
        // margin-bottom: 10px;
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
            border-radius: 50%;
            border: 2px solid lightgray;
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
        // border-top: 1px solid lightgray;
        .option-list {
          float: right;
          li {
            float: left;
            list-style: none;
            margin: 20px 0 0 25px;
            .icon-copy {
              font-size: 20px;
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
