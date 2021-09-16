<template>
  <v-container fluid>
    <p class="text-xl-h4 font-weight-bold">滿意度問卷設計</p>
    <v-divider />
    <fet-card
      outlined
      title="問 卷 設 計"
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
                      v-model="data.display_name"
                      class="form-title"
                      color="accent"
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
                      v-model="data.name.desc"
                      color="accent"
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
                          v-model="releaseDateStart"
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
                        v-model="releaseDateStart"
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
                <!-- <textarea v-model="i.desc" placeholder="問卷說明" @focus="$autoText($event)" @input="$autoText($event)" /> -->
                <div v-if="!data.question.length" class="add-list" color="primary">
                  <v-icon @click="addListFn" v-text="'mdi-plus'" />
                </div>
              </div>
              <div class="q-wrap">
                <draggable v-for="data, index in data.question" :key="index" v-model="data.question" :options="{group:'people'}" :move="onMove">
                  <div id="items" class="q-li" :class="{'q-li-focus': focusIndex === index}" @click="focusItem($event, index)">
                    <div class="drap-area">
                      <v-icon @click="addListFn" v-text="'mdi-drag-horizontal'" />
                    </div>
                    <div v-for="content, index1 in data.content" :key="index1" class="q-item-wrap">
                      <div class="q-item q-title-wrap">
                        <div class="q-title">
                          <div class="li">
                            <textarea v-model="content.title" class="q-area" placeholder="問題" @focus="$autoText($event)" @input="$autoText($event)" />
                          </div>
                        </div>
                        <!-- <el-select class="q-select" v-if="focusIndex === index" v-model="data.types" filterable placeholder="請選擇">
                          <el-option
                            v-for="item in selectOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                          </el-option>
                        </el-select> -->
                      </div>
                      <div v-if="data.types === '下拉列表' || data.types === '單選題' || data.types === '多選題' || data.types === '優先級'" class="q-item">
                        <div v-for="item, i in content.answer" :key="i" class="q-radio">
                          <div v-if="data.types === '下拉列表' || data.types === '優先級'" class="icon-radio">{{ i + 1 }}.</div>
                          <div v-else class="icon-radio" :class="{'icon-cirle': data.types === '單選題', 'icon-square': data.types === '多選題'}" />
                          <input v-model="item.description" class="radio-input">
                          <i v-if="focusIndex === index" class="el-icon-close" @click="deleteRadioFn(index, index1, i)" />
                        </div>
                        <!-- <div v-if="focusIndex === index" class="q-radio">
                          <div v-if="data.types === '下拉列表' || data.types === '優先級'" class="icon-radio">{{ content.answer.length + 1 }}.</div>
                          <div v-else class="icon-radio" :class="{'icon-cirle': data.types === '單選題', 'icon-square': data.types === '多選題'}" />
                          <input v-model="addRadio" class="radio-add" @focus="addRadioFn(index, index1)">
                        </div> -->
                      </div>
                      <div v-if="data.types === '文本題'" class="q-item text-wrap">文本回答</div>
                      <div v-if="focusIndex === index" class="q-item option-wrap">
                        <ul class="option-list">
                          <li>
                            <v-icon @click="copyListFn(index)" v-text="'mdi-content-copy'" />
                          </li>
                          <li>
                            <v-icon @click="deleteListFn(index)" v-text="'mdi-delete'" />
                          </li>
                          <li class="mt-1">
                            <!-- <v-switch 
                              v-model="data.is_required" 
                              color="red"
                              :label="`必填`" 
                            /> -->
                            <!-- <el-switch :width="40" on-color="#4ca2ae" v-model="data.is_required" on-text="" off-text="">
                            </el-switch> -->
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
            <!-- <v-btn v-if="data.question.length" class="primary form-sidebar" @click="addListFn">
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
  </v-container>
</template>

<script>
  import draggable from 'vuedraggable'

  let lineEndOptions = Array.apply(null, Array(9)).map((item, i) => {
    return i + 2
  })

  let that
  export default {
    
    components: {
      draggable
    },

    data () {
      that = this
      return {
        auth: false,
        loading: false,
        // selectOptions: ['單選題', '多選題', '下拉列表', '線性量表', '矩陣量表', '優先級', '文本題'],
        type: 'a',
        types: ['a'],
        typeToLabel: {
          a: '單選題',
          b: '多選題',
          c: '下拉列表',
          d: '文本題',
        },
        langCode: ['zh'],
        langList: ['中文'],
        // selectOptions: ['單選題', '多選題', '下拉列表', '線性量表', '矩陣量表', '優先級', '文本題'],
        // langCode: ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar'],
        // langList: ['中文', '英語', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '意大利語',
        //   '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語'],
        defaultLang: '英語',
        tabLang: '中文',
        editableTabs: ['中文'],
        addLangVisible: false,
        defaultOption: '單選題',
        addRadio: '添加選項',
        lineOptions: [0, 1],
        lineEndOptions: lineEndOptions,
        langArray: [],
        data: {
          display_name: '',
          name: {
            questionnaire_name: '',
            desc: '',
            language: 'cn'
          },
          repeat_submit: false,
          question: [{
            question_id: 1,
            types: '單選題',
            is_required: false,
            content: [
              {
                language: 'cn',
                title: '',
                answer: [{
                  answer_id: 1,
                  description: '非常滿意'
                },{
                  answer_id: 2,
                  description: '滿意'
                },{
                  answer_id: 3,
                  description: '普通'
                },{
                  answer_id: 4,
                  description: '不滿意'
                },{
                  answer_id: 5,
                  description: '非常不滿意'
                }],
                line_answer: {
                  line_value: 1,
                  line_end_value: 5,
                  line_tag: '',
                  line_end_tag: ''
                },
                text_answer: ''
              }
            ]}
          ]
        },
        editable: true,
        focusIndex: 0
      }
    },
    methods: {
      onEnd () {
        that.drag = false
      },
      onMove ({relatedContext, draggedContext}) {
        let relatedIndex = relatedContext.index
        let index = draggedContext.index
        relatedContext.element.question_id = index + 1
        draggedContext.element.question_id = relatedIndex + 1
      },
      focusTitle (event) {
        let classList = event.target.classList
        if (classList.contains('add-list') || classList.contains('el-icon-plus')) return
        that.focusIndex = 'title'
      },
      focusItem (event, i) {
        let classList = event.target.classList
        if (classList.contains('el-icon-delete') || classList.contains('icon-copy') || that.focusIndex === i) return
        that.focusIndex = i
      },
      addRadioFn (i, j) {
        let list = that.data.question[i].content[j].answer
        that.addFormFn(list)
      },
      deleteRadioFn (i, j, k) {
        that.data.question[i].content[j].answer.splice(k, 1)
      },
      addFormFn (list) {
        let index = list.length ? parseInt(list[list.length - 1].description.substr(2)) + 1 : '1'
        let text = index ? '選項' + index : '選項1'
        list.push({answer_id: list.length + 1, description: text})
        that.$nextTick(() => {
          let input = document.querySelectorAll('.radio-input')
          input[input.length - 1].focus()
        })
      },
      copyListFn (index) {
        let data = JSON.parse(JSON.stringify(that.data.question[index]))
        that.data.question.splice(index, 0, data)
        that.focusIndex = that.data.question.length - 1
      },
      addListFn () {
        let codeList = that.editableTabs.map((i) => {
          return that.langCode[that.langList.indexOf(i)]
        })
        let contentList = codeList.map((i) => {
          return {
            language: i,
            title: '',
            answer: [{
              answer_id: 1,
              description: '非常滿意'
            },{
              answer_id: 2,
              description: '滿意'
            },{
              answer_id: 3,
              description: '普通'
            },{
              answer_id: 4,
              description: '不滿意'
            },{
              answer_id: 5,
              description: '非常不滿意'
            }],
            line_answer: {
              line_value: 1,
              line_end_value: 5,
              line_tag: '',
              line_end_tag: ''
            },
            text_answer: ''
          }
        })
        let list = {
          question_id: that.data.question.length + 1,
          types: '單選題',
          is_required: false,
          content: contentList
        }
        that.data.question.push(list)
        that.focusIndex = that.data.question.length - 1
      },
      deleteListFn (i) {
        that.data.question.splice(i, 1)
        that.focusIndex = i === 0 && that.data.question.length > 0 ? i : i - 1
      },
      saveFn () {
      },
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          that.addLangVisible = true
        }
        if (action === 'remove') {
          that.$confirm('確定刪除語言: ' + targetName + '的問卷嗎？', {
            title: ' ',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
            beforeClose: (action, instance, done) => {
              let closeFn = () => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '確定'
              }
              if (action === 'confirm') {
                let tabs = that.editableTabs
                let activeName = that.tabLang
                if (activeName === targetName) {
                  tabs.forEach((tab, index) => {
                    if (tab === targetName) {
                      let nextTab = tabs[index + 1] || tabs[index - 1]
                      if (nextTab) {
                        activeName = nextTab
                      }
                    }
                  })
                }
                that.tabLang = activeName
                that.editableTabs = tabs.filter(tab => tab !== targetName)
                closeFn()
                done()
              } else {
                closeFn()
                done()
              }
            }
          }).then(() => {
          }).catch(() => {
          })
        }
      }
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
        border-radius: 50%;
        background-color: #e9e9e9;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i {
          color: $green;
          font-size: 22px;
        }
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
