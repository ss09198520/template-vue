<template>
  <v-container>
    <h2 class="font-bold">素 材 上 傳</h2>
    <v-row class="d-flex justify-center">
      <v-col
        class="ml-10"
        cols="12"
      >
        <fet-card
          full-width
          outlined
          title="素 材 上 傳"
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
                <v-subheader class="justify-center">
                  素 材 名 稱
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="postForm.fileName"
                  :rules="rules.requiredRule.concat(rules.lengthRules)"
                  :hide-details="hideDatails"
                  color="accent"
                  placeholder="請輸入素材名稱"
                  :counter="maxCharacter"
                  outlined
                  required
                  dense
                  clearable
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
                  檔 案 描 述
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-text-field
                  v-model="postForm.fileDesc"
                  :rules="rules.requiredRule.concat(rules.lengthRules)"
                  :hide-details="hideDatails"
                  color="accent"
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
              <v-col
                cols="3"
                md="3"
              >
                <v-subheader class="justify-center">
                  上 傳 格 式
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-radio-group
                  v-model="postForm.uploadType"
                  class="mt-2"
                  dense
                  row
                  :rules="[v => !!v || '必須選擇一種上傳格式']"
                >
                  <v-radio
                    label="純圖檔"
                    value="image"
                    color="red"
                  />
                  <v-radio
                    label="影片檔(mp4)"
                    value="video"
                    color="red"
                  />
                  <!-- <v-radio
                    label="圖檔+影片檔(mp4)"
                    value="3"
                  /> -->
                </v-radio-group>
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
                  上 傳 檔 案
                  <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col
                cols="7"
                md="6"
              >
                <v-file-input
                  v-model="uploadData"
                  :hide-details="hideDatails"
                  label="上傳圖片或影片"
                  show-size
                  color="accent"
                  accept="image/jpg , image/png , video/*"
                  hint="(.jpg、.png，最多不超過 50MB)"
                  persistent-hint
                  prepend-inner-icon="mdi-cloud-upload"
                  prepend-icon
                  @change="getImagePreviews()"
                />
                <v-img :src="imageURL" />
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
                  儲存
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
  import MessageService from "@/assets/services/message.service";
  import { uploadFile} from '@/api/mediaFile'

  const defaultForm = {
    fileName: null,
    fileDesc: null,
    uploadType: null,
  }
  export default {
    data() {
      return {
        valid: false,
        maxCharacter: 40,
        postForm: Object.assign({} , defaultForm),
        uploadData: null,
        imageURL: null,
        reader: null,
        dense: false,
        noGutters: false,
        hideDatails: false,
        snackbar: false,
        rules: {
          requiredRule: [v => !!v || '此欄位為必填欄位'],
          lengthRules: [v => (v && v.length <= this.maxCharacter) || `不能超過 ${this.maxCharacter} 個字`],
          videoSizeRules: [v => !!v || v.size < 50000000 || 'Avatar size should be less than 50 MB!',],
          iamgeSizeRules: [v => !!v || v.size < 10000000 || 'Avatar size should be less than 10 MB!',],
        },
      }
    },
    mounted() {
      this.reader = new FileReader();
      this.reader.addEventListener("load", () => {
        this.imageURL = this.reader.result
      })
    },
    methods: {
      getImagePreviews() {    
        if (this.uploadData instanceof Blob){
          this.reader.readAsDataURL(this.uploadData)    
        }else{
          this.imageURL = null
        }
      },
      submit() {
        const formData = new FormData();
        formData.append("file", this.uploadData);
        formData.append("req", JSON.stringify(this.postForm));
        console.log(formData)
        
        if (this.$refs.form.validate()) {
          console.log(this.postForm)
          console.log(this.$refs.form)
          
          this.submitForm(formData)
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

      /**
       * 
       * Ajax start 
       * 
       **/
      
      //Action: 上傳素材
      async submitForm(postData) {
        const data = await uploadFile(postData)
        // 驗證是否成功
        if (!data.restData.success) {              
            MessageService.showError(data.restData.message,'上傳素材');
            return;
        }

        MessageService.showSuccess('上傳成功' + "✓")
        
        this.reset() //重置表單
      },
    }
  }
</script>

<style lang="scss" scoped></style>