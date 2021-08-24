<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card width="100%">
          <v-tabs>
            <v-tab>素 材 上 傳</v-tab>

            <v-tab-item>
              <v-container>
                <v-row class="d-flex justify-center">
                  <v-col
                    sm="10"
                    md="8"
                  >
                      <v-form>
                        <v-row
                          :dense="dense"
                          :no-gutters="noGutters"
                        >
                          <v-col
                            cols="3"
                            md="3"
                          >
                            <v-subheader class="justify-center">
                              素 材 名 稱
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-text-field
                              v-model="validation.firstname"
                              :rules="nameRules"
                              :hide-details="hideDatails"
                              color="accent"
                              placeholder="請輸入文字"
                              hint="此欄位為必填欄位"
                              persistent-hint
                              counter="10"
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
                            <v-subheader class="justify-center">
                              檔 案 描 述
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-text-field
                              :hide-details="hideDatails"
                              color="accent"
                              dense
                              placeholder="請輸入密碼"
                              outlined
                              hint="此欄位為必填欄位"
                              persistent-hint
                              prepend-inner-icon="mdi-lock"
                              type="password"
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
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-radio-group
                              v-model="radios"
                              class="mt-0"
                              dense
                              row
                              hide-details
                            >
                              <v-radio
                                label="純圖檔"
                                value="1"
                                color="red"
                              />
                              <v-radio
                                label="影片檔(mp4)"
                                value="2"
                                color="blue"
                              />
                              <v-radio
                                label="圖檔+影片檔(mp4)"
                                value="3"
                                color="blue"
                              />
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
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-file-input
                              :hide-details="hideDatails"
                              label="上傳圖片"
                              color="accent"
                              outlined
                              dense
                              hint="(.jpg、.png，最多不超過 5MB)"
                              persistent-hint
                              prepend-inner-icon="mdi-camera"
                              prepend-icon
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
                              多行欄位
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-textarea
                              color="accent"
                              outlined
                              placeholder="請輸入文字"
                              counter="50"
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
                              depressed
                              color="accent"
                            >
                              送出
                            </v-btn>

                            <v-btn
                              class="ma-1"
                              outlined
                              color="accent"
                            >
                              取消
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        radios: 'female',
        dense: false,
        noGutters: false,
        hideDatails: false,
        validation: {
          firstname: '',
          lastname: '',
          email: '',
          checkbox: false,
        },
        valid: false,
        firstname: '',
        lastname: '',
        email: '',
        checkbox: false,
        nameRules: [v => !!v || '此欄位為必填欄位', v => (v && v.length <= 10) || '名字不能超過 10 個字'],
        emailRules: [v => !!v || '此欄位為必填欄位', v => /.+@.+/.test(v) || '這個 Email 並非合法'],
        snackbar: false,
      }
    },
  }
</script>

<style lang="scss" scoped></style>