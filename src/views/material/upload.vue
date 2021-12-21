<template>
  <v-container>
    <h2 class="font-bold">素 材 上 傳</h2>
    <v-row class="ml-10">
      <v-col class="ml-10 font-18px" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation class="ml-10 font-weight-bold">
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              素 材 名 稱
              <span class="red--text">*</span>
            </v-col>
            <v-col cols="7" md="6">
              <v-text-field
                v-model="postForm.materialName"
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
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              檔 案 描 述
            </v-col>
            <v-col cols="7" md="6">
              <v-text-field
                v-model="postForm.memo"
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
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              上 傳 格 式
              <span class="red--text">*</span>
            </v-col>
            <v-col cols="7" md="6">
              <v-radio-group
                v-model="postForm.materialType"
                class="mt-2"
                dense
                row
                :rules="[v => !!v || '必須選擇一種上傳格式']"
                @change="validate"
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
          <v-row class="d-flex justify-start mt-3">
            <v-col cols="2" md="2">
              上 傳 檔 案
              <span class="red--text">*</span>
            </v-col>
            <v-col cols="7" md="6">
              <v-file-input
                v-model="uploadData"
                :hide-details="hideDatails"
                label="上傳圖片或影片"
                show-size
                color="accent"
                accept="image/jpeg, image/png, image/jpg, video/*"
                hint="(.jpg、.png、影音，最多不超過 30MB)"
                persistent-hint
                prepend-inner-icon="mdi-cloud-upload"
                prepend-icon
                :rules="rules.filesSizeRules.concat([checkFileExt])"
                @change="getImagePreviews()"
              />
              <v-img 
                v-if="!!imageURL && isImage(postForm.file.originalFileName)"
                :src="imageURL"
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start mt-3">
            <v-col>
              <video 
                v-if="!!imageURL && isVideo(postForm.file.originalFileName)"
                width="1000" 
                height="650"
                :src="imageURL"
                controls 
                controlsList="nodownload"
              >
                <source type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
              </video>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn
                class="ma-1"
                outlined
                color="accent"
                @click="reset"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MessageService from "@/assets/services/message.service";
  import { uploadFile } from '@/api/media'
  import { getFileExtension } from '@/utils/validate'

  const defaultForm = {
    materialName: null,
    memo: null,
    materialType: null,
    file: {}
  }
  const defaultFile = {
    originalFileName: null,
    imgSrc: null,
    base64: null,
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
          filesSizeRules: [ v => !v || v.size < 30e6 || "檔案大小超過 30 MB!" ],
        },
      }
    },
    mounted() {
      this.reader = new FileReader();
      this.reader.addEventListener("load", () => {
        // preview data url
        this.imageURL = this.reader.result
        console.log(this.uploadData)
        // assign file 
        this.postForm.file = Object.assign({} , defaultFile)
        this.postForm.file.fileName = this.uploadData.name.substr(0,this.uploadData.name.lastIndexOf("."))
        this.postForm.file.originalFileName = this.uploadData.name
        this.postForm.file.fileExt = getFileExtension(this.uploadData.name)
        this.postForm.file.fileSize = this.uploadData.size
        // this.postForm.file.imgSrc = this.reader.result
        this.postForm.file.base64 = this.reader.result.split(",")[1]
      })
    },
    methods: {
      checkFileExt(file) {
        if(this.postForm.materialType == 'image'){
          return this.isImage(file.name) ? true : '圖片格式錯誤'
        } else if(this.postForm.materialType == 'video'){
          return this.isVideo(file.name) ? true : '影音格式錯誤'
        }

        return true
      },
      isImage(filename) {
        return (/\.(jpg|jpeg|tiff|png)$/i).test(filename)
      },
      isVideo(filename) {
        return (/\.(mp4)$/i).test(filename)
      },

      getImagePreviews() {    
        if (this.uploadData instanceof Blob){
          this.reader.readAsDataURL(this.uploadData)    
        }else{
          this.imageURL = null
        }
      },
      submit() {
        
        if (this.$refs.form.validate()) {
          // console.log(this.postForm)
          
          this.submitForm(this.postForm)
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