<template>
  <v-container fluid>
    <h3>表單驗證</h3>
    <v-row>
      <v-col
        cols="12"
        sm="10"
        md="6"
      >
        <fet-card
          flat
          full-width
          title="基本驗證"
          text=""
        >
          <v-form>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  名字 <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="validation.firstname"
                  :rules="nameRules"
                  color="accent"
                  placeholder="請輸入名字"
                  counter="10"
                  outlined
                  required
                  dense
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  姓氏 <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="validation.lastname"
                  :rules="nameRules"
                  color="accent"
                  placeholder="請輸入姓氏"
                  counter="10"
                  outlined
                  required
                  dense
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  Email <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="validation.email"
                  :rules="emailRules"
                  color="accent"
                  dense
                  placeholder="請輸入 Email"
                  outlined
                  prepend-inner-icon="mdi-email"
                  type="email"
                  required
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  Checkbox <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-checkbox
                  v-model="validation.checkbox"
                  :rules="[v => !!v || '你必須同意才能送出']"
                  label="Do you agree?"
                  color="accent"
                  required
                  dense
                />
              </v-col>
            </v-row>
          </v-form>
        </fet-card>
      </v-col>

      <v-col
        cols="12"
        sm="10"
        md="6"
      >
        <fet-card
          flat
          full-width
          title="送出表單與清除"
          text=""
        >
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  名字 <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  color="accent"
                  placeholder="請輸入名字"
                  counter="10"
                  outlined
                  required
                  dense
                />
              </v-col>
              <v-spacer />
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  姓氏 <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  color="accent"
                  placeholder="請輸入姓氏"
                  counter="10"
                  outlined
                  required
                  dense
                />
              </v-col>
              <v-spacer />
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  Email <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  color="accent"
                  dense
                  placeholder="請輸入 Email"
                  outlined
                  prepend-inner-icon="mdi-email"
                  type="email"
                  required
                />
              </v-col>
              <v-spacer />
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-subheader class="justify-center">
                  Checkbox <span class="red--text">*</span>
                </v-subheader>
              </v-col>
              <v-col cols="9">
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || '你必須同意才能送出']"
                  label="Do you agree?"
                  color="accent"
                  required
                  dense
                />
              </v-col>
              <v-spacer />
            </v-row>

            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn
                  :disabled="!valid"
                  class="mr-1"
                  color="success"
                  depressed
                  @click="submit"
                >
                  送出
                </v-btn>
                <v-btn
                  class="mr-1"
                  color="accent"
                  depressed
                  @click="validate"
                >
                  驗證
                </v-btn>
                <v-btn
                  color="warning"
                  class="mr-1"
                  depressed
                  @click="reset"
                >
                  重置表單
                </v-btn>
                <v-btn
                  color="info"
                  depressed
                  @click="resetValidation"
                >
                  重置驗證
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-snackbar
            v-model="snackbar"
            right
            color="success"
          >
            <v-icon
              color="white"
              class="mr-3"
            >
              mdi-bell-plus
            </v-icon>
            <div>送出成功!</div>
            <v-icon
              size="16"
              @click="snackbar = false"
            >
              mdi-close-circle
            </v-icon>
          </v-snackbar>
        </fet-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
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
    methods: {
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
    },
  }
</script>

<style lang="scss" scoped></style>