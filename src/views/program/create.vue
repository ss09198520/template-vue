<template>
  <v-container>
    <h2 class="font-bold">節 目 單 製 作</h2>
    <v-row class="d-flex justify-center">
      <v-col
        class="ml-10"
        cols="12"
      >
        <fet-card
          full-width
          outlined
          title="節 目 單 製 作"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="4"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  節 目 標 題
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="filename"
                  :rules="rules.requiredRule.concat(rules.lengthRules)"
                  :hide-details="hideDatails"
                  color="accent"
                  label=" 節 目 標 題"
                  placeholder="請輸入節目標題"
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
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  節 目 說 明
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="fileDesc"
                  :rules="rules.lengthRules"
                  :hide-details="hideDatails"
                  color="accent"
                  label="檔 案 描 述"
                  placeholder="請輸入檔案描述"
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
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="3"
                md="3"
              >
                <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                  選 擇 素 材
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-btn class="primary" style="margin:10px;" @click="dialog=true"><v-icon style="margin-right: 3px;">mdi-plus</v-icon>新增</v-btn>
              </v-col>
            </v-row>
            <v-row 
              v-show="isShow"
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col>
                <v-data-table
                  v-sortable-data-table
                  disable-sort
                  hide-default-footer
                  :headers="headerCRUD"
                  :items="itemsCRUD"
                  item-key="id"
                  class="font-weight-bold elevation-1"
                  @sorted="saveOrder"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <v-icon
                      class="mr-2"
                      @click="editItem(item)"
                      v-on="on"
                    >
                      mdi-sort-variant
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row
              :dense="dense"
              :no-gutters="noGutters"
            >
              <v-col
                cols="5"
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
                  label="上傳附件"
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
    <v-dialog
      v-model="dialog"
      max-width="800px"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;"> 選 擇 素 材 </v-card-title>
        
        <v-card-text>
          <v-row
            class="mt-2 justify-center"
          >
            <v-col>
              <v-text-field
                class="font-weight-bold"
                dense
                placeholder="素材名稱"
                outlined
                clearable
                persistent-hint
              />
            </v-col>
            <v-col>
              <v-select
                :items="['圖片','影片']"
                class="font-bold"
                item-color="accent"
                placeholder="素材類型"
                dense
                outlined
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-btn class="primary mb-1" @click="search()">&emsp;查詢&emsp;</v-btn>        
          </v-row>  
          <hr>
          <div class="imgList">
            <ul class="resourceList">
              <li
                v-for="(resource,id) in resources"
                :id="resource.id"
                :key="id"
                :url="resource.url" 
                @click="selected($event)" 
              >
                <label class="el-upload-list__item-status-label" />
                <div class="imgBox">
                  <img :src="require(`@/resource/${resource.thumbnail}`)">
                </div>
                <p>{{ resource.name }}</p>
              </li>
            </ul>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn style="margin: 0 10px 10px 0;" @click="dialog = false">關閉</v-btn>
          <v-btn color="primary" style="margin-bottom: 10px;" @click="dialog = false ; isShow = true">新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Sortable from 'sortablejs'
  
  export default {
    directives: {
      sortableDataTable: {
        bind (el, binding, vnode) {
          const options = {
            animation: 150,
            onUpdate: function (event) {
              vnode.child.$emit('sorted', event)
            }
          }
          Sortable.create(el.getElementsByTagName('tbody')[0], options)
        }
      }
    },
    data() {
      return {
        isShow: false,
        valid: false,
        dialog: false,
        maxCharacter: 40,
        filename: '',
        fileDesc: '',
        uploadType: '',
        uploadData: '',
        releaseStartDateMenu: false,
        releaseStartDate: '',
        releaseEndDateMenu: false,
        releaseEndDate: '',
        dateMenu: false,
        formData: {
          filename: '',
          fileDesc: '',
          uploadType: '',
          uploadData: '',
        },
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
        },
        headerCRUD: [
          {
            text: '素材名稱',
            value: 'name',
            width: '5%'
          },
          {
            text: '播放順序',
            value: 'action',
            sortable: false,
            align: 'center',
            width: '5%'
          },
        ],
        itemsCRUD: [
          {
            name: '電廠維護公告圖',
            id: 1,
          },
          {
            name: '秋季節約用電宣導',
            id: 2,
            scp_id: '預設',
          },
          {
            name: 'New! 9月11日颱風緊急通報',
            id: 3,
          },
        ],
        resources: [
          {
            "id": 1,
            "url": "image/bg1.jpg",
            "thumbnail": "image/bg1_tn.jpg",
            "name": "bg1.jpg",
            "type": "image"
          },
          {
            "id": 2,
            "url": "image/bg2.png",
            "thumbnail": "image/bg2_tn.jpg",
            "name": "bg2.jpg",
            "type": "image"
          },
          {
            "id": 3,
            "url": "image/p1.jpg",
            "thumbnail": "image/p1_tn.jpg",
            "name": "p1.jpg",
            "type": "image"
          },
          {
            "id": 4,
            "url": "image/p2.jpg",
            "thumbnail": "image/p2_tn.jpg",
            "name": "p2.jpg",
            "type": "image"
          },
          {
            "id": 5,
            "url": "image/p3.jpg",
            "thumbnail": "image/p3_tn.jpg",
            "name": "p3.jpg",
            "type": "image"
          },
          {
            "id": 6,
            "url": "image/p4.jpg",
            "thumbnail": "image/p4_tn.jpg",
            "name": "p4.jpg",
            "type": "image"
          },
          {
            "id": 7,
            "url": "image/p5.jpg",
            "thumbnail": "image/p5_tn.jpg",
            "name": "p5.jpg",
            "type": "image"
          },
          {
            "id": 8,
            "url": "image/p6.jpg",
            "thumbnail": "image/p6_tn.jpg",
            "name": "p6.jpg",
            "type": "image"
          },
          {
            "id": 9,
            "url": "image/p7.jpg",
            "thumbnail": "image/p7_tn.jpg",
            "name": "p7.jpg",
            "type": "image"
          },
          {
            "id": 10,
            "url": "image/p8.jpg",
            "thumbnail": "image/p8_tn.jpg",
            "name": "p8.jpg",
            "type": "image"
          },
          {
            "id": 11,
            "url": "image/p9.jpg",
            "thumbnail": "image/p9_tn.jpg",
            "name": "p9.jpg",
            "type": "image"
          },
          {
            "id": 12,
            "url": "image/p10.jpg",
            "thumbnail": "image/p10_tn.jpg",
            "name": "p10.jpg",
            "type": "image"
          }
        ],
        dense: false,
        noGutters: false,
        hideDatails: false,
        snackbar: false,
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },
      }
    },
    methods: {
      saveOrder (event) {
        const movedItem = this.itemsCRUD.splice(event.oldIndex, 1)[0];
        this.itemsCRUD.splice(event.newIndex, 0, movedItem);
        let step;
        for (step = 0; step < this.itemsCRUD.length; step++) {
          // 執行五次：從step為0到4
          console.log(this.itemsCRUD[step]);
          // this.itemsCRUD[step].id = step
        }
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
      selected(e) {
        let dom = e.currentTarget.id;
        let target = e.currentTarget;
        /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/     //currentTarget与target的区别
        let children = target.children[0];
        if (children.style.display != 'block') {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";

          this.downloadUrl = this.baseURL + document.getElementById(target.id).getAttribute("url")
          this.downloadName = target.children[2].innerText;
          this.ids.push(dom)
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.downloadUrl = '';
          this.downloadName = '';
          for (let i = 0; i < this.ids.length; i++) {
            if (this.ids[i] == dom) this.ids.splice(i, 1)
          }    //取消则从ids删除该元素
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  #resource {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #resourceList {
    border: 1px solid #c1c1c1;
    height: 98%;
    border-radius: 10px;
    overflow: hidden;
    width: 87%;
  }

  .resourceList {
    display: flex;
    flex-wrap: wrap;
  }

  .resourceList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 30px 40px;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 5px;
    position: relative;
  }

  .imgBox {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #e7e7e7;
  }

  .resourceList li img {
    max-width: 120px;
    max-height: 120px;
  }

  .resourceList li:hover {
    background-color: #ebebeb !important;
  }

  .resourceList p {
    min-width: 20px;
  }

  .el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
  }

  .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 12px;
    transform: rotate(-45deg);
    color: white;
  }

</style>