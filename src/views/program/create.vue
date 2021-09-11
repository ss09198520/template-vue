<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card width="100%">
          <v-container>
            <v-row class="d-flex justify-center">
              <v-col
                sm="10"
                md="8"
              >
                <fet-card
                  flat
                  full-width
                  outlined
                  title="節 目 表 製 作"
                  text
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
                          節 目 名 稱
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
                          label=" 節 目 名 稱"
                          placeholder="請輸入節目名稱"
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
                          檔 案 描 述
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
                      <v-col
                        cols="3"
                        md="3"
                      >
                        <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                          上 傳 格 式
                          <span class="red--text">*</span>
                        </v-subheader>
                      </v-col>
                      <v-col
                        cols="7"
                        md="6"
                      >
                        <v-radio-group
                          v-model="uploadType"
                          class="mt-2"
                          dense
                          row
                          :rules="[v => !!v || '必須選擇一種上傳格式']"
                        >
                          <v-radio
                            label="純圖檔"
                            value="1"
                            color="red"
                          />
                          <v-radio
                            label="影片檔(mp4)"
                            value="2"
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
                        <v-subheader class="justify-center text-md-body-1 font-weight-bold">
                          上 傳 檔 案
                          <span class="red--text">*</span>
                        </v-subheader>
                      </v-col>
                      <v-col
                        cols="7"
                        md="6"
                      >
                        <v-file-input
                          :hide-details="hideDatails"
                          label="上傳圖片或影片"
                          color="accent"
                          outlined
                          dense
                          accept="image/jpg"
                          hint="(.jpg、.png，最多不超過 50MB)"
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
                        <v-btn class="ma-1" depressed color="accent" :disabled="!valid" @click="submit">
                          送出
                        </v-btn>

                        <v-btn class="ma-1" outlined color="accent">
                          取消
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </fet-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        maxCharacter: 40,
        filename: '',
        fileDesc: '',
        uploadType: '',
        uploadData: '',
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
      dropzoneS(file) {
        console.log('this.$message', this.$message)
        console.log(file)
      },
      dropzoneR(file) {
        console.log(file)
      },
    }
  }
</script>

<style lang="scss" scoped></style>