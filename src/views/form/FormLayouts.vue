<template>
  <v-container fluid>
    <h3>表單排版</h3>
    <v-row>
      <v-col>
        <v-switch
          v-model="dense"
          label="dense (緊縮間距)"
          dense
          hide-details
        />
        <v-switch
          v-model="noGutters"
          label="no-gutters (移除間距)"
          dense
          hide-details
        />
        <v-switch
          v-model="hideDatails"
          label="details (隱藏提示資訊)"
          dense
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card width="100%">
          <v-tabs>
            <v-tab>單欄排版</v-tab>
            <v-tab>兩欄排版</v-tab>
            <v-tab>兩欄排版 - 標題在上</v-tab>
            <v-tab>無獨立標題</v-tab>

            <v-tab-item>
              <v-container>
                <v-row class="d-flex justify-center">
                  <v-col
                    sm="10"
                    md="8"
                  >
                    <fet-card
                      flat
                      full-width
                      title="單欄排版"
                      text
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
                              文字欄位
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
                              placeholder="請輸入文字"
                              outlined
                              hint="此欄位為必填欄位"
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
                              Email 欄位
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
                              placeholder="請輸入 Email"
                              outlined
                              hint="此欄位為必填欄位"
                              persistent-hint
                              prepend-inner-icon="mdi-email"
                              type="email"
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
                              密碼欄位
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
                              下拉選單
                              <span class="red--text">*</span>
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-select
                              :items="['option1', 'option2', 'option3']"
                              color="accent"
                              item-color="accent"
                              label="Select"
                              dense
                              outlined
                              hide-details
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
                              Checkbox
                            </v-subheader>
                          </v-col>
                          <v-col
                            cols="9"
                            md="8"
                          >
                            <v-row dense>
                              <v-col
                                md="4"
                                class="mt-n4"
                              >
                                <v-checkbox
                                  label="Checkbox1"
                                  input-value="true"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                                <v-checkbox
                                  label="Checkbox2"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                              </v-col>
                              <v-col
                                md="4"
                                class="mt-n4"
                              >
                                <v-checkbox
                                  label="Checkbox3"
                                  input-value="true"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                                <v-checkbox
                                  label="Checkbox4"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                              </v-col>
                              <v-col
                                md="4"
                                class="mt-n4"
                              >
                                <v-checkbox
                                  label="Checkbox5"
                                  input-value="true"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                                <v-checkbox
                                  label="Checkbox6"
                                  color="accent"
                                  dense
                                  hide-details
                                />
                              </v-col>
                            </v-row>
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
                              Radio Button
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
                                label="女生"
                                value="female"
                                color="red"
                              />
                              <v-radio
                                label="男生"
                                value="male"
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
                              上傳檔案
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
                    </fet-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row
                  class="d-flex justify-center"
                  dense
                >
                  <v-col
                    cols="12"
                    sm="10"
                  >
                    <fet-card
                      flat
                      full-width
                      title="兩欄排版"
                      text
                    >
                      <v-form>
                        <v-container>
                          <v-row
                            class="d-flex justify-center"
                            dense
                          >
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    文字欄位
                                    <span class="red--text">*</span>
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    placeholder="請輸入文字"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    Email 欄位
                                    <span class="red--text">*</span>
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    placeholder="請輸入 Email"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                    prepend-inner-icon="mdi-email"
                                    type="email"
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    密碼欄位
                                    <span class="red--text">*</span>
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
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
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    下拉選單
                                    <span class="red--text">*</span>
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-select
                                    :items="['option1', 'option2', 'option3']"
                                    color="accent"
                                    item-color="accent"
                                    label="Select"
                                    dense
                                    outlined
                                    hide-details
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    Checkbox
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-row dense>
                                    <v-col class="mt-n4">
                                      <v-checkbox
                                        label="Checkbox1"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox2"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                    <v-col class="mt-n4">
                                      <v-checkbox
                                        label="Checkbox3"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox4"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                    <v-col class="mt-n4">
                                      <v-checkbox
                                        label="Checkbox5"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox6"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    Radio Button
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-radio-group
                                    v-model="radios"
                                    class="mt-0"
                                    dense
                                    row
                                    hide-details
                                  >
                                    <v-radio
                                      label="女生"
                                      value="female"
                                      color="red"
                                    />
                                    <v-radio
                                      label="男生"
                                      value="male"
                                      color="blue"
                                    />
                                  </v-radio-group>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    上傳檔案
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
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
                                <v-col cols="3">
                                  <v-subheader class="justify-center">
                                    多行欄位
                                  </v-subheader>
                                </v-col>
                                <v-col cols="9">
                                  <v-textarea
                                    color="accent"
                                    outlined
                                    placeholder="請輸入文字"
                                    counter="50"
                                  />
                                </v-col>
                              </v-row>
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
                        </v-container>
                      </v-form>
                    </fet-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row
                  class="d-flex justify-center"
                  dense
                >
                  <v-col
                    cols="12"
                    sm="10"
                  >
                    <fet-card
                      flat
                      full-width
                      title="兩欄排版 - 標題在上"
                      text
                    >
                      <v-form>
                        <v-container>
                          <v-row class="d-flex justify-center">
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    文字欄位
                                    <span class="red--text">*</span>
                                  </p>
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    placeholder="請輸入文字"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    Email 欄位
                                    <span class="red--text">*</span>
                                  </p>
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    placeholder="請輸入 Email"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                    prepend-inner-icon="mdi-email"
                                    type="email"
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    密碼欄位
                                    <span class="red--text">*</span>
                                  </p>
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
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    下拉選單
                                    <span class="red--text">*</span>
                                  </p>
                                  <v-select
                                    :items="['option1', 'option2', 'option3']"
                                    color="accent"
                                    item-color="accent"
                                    label="Select"
                                    dense
                                    outlined
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    Checkbox
                                  </p>
                                  <v-row dense>
                                    <v-col
                                      md="4"
                                      class="mt-n4"
                                    >
                                      <v-checkbox
                                        label="Checkbox1"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox2"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                    <v-col
                                      md="4"
                                      class="mt-n4"
                                    >
                                      <v-checkbox
                                        label="Checkbox3"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox4"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                    <v-col
                                      md="4"
                                      class="mt-n4"
                                    >
                                      <v-checkbox
                                        label="Checkbox5"
                                        input-value="true"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                      <v-checkbox
                                        label="Checkbox6"
                                        color="accent"
                                        dense
                                        hide-details
                                      />
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    Radio Button
                                  </p>
                                  <v-radio-group
                                    v-model="radios"
                                    class="mt-0"
                                    dense
                                    row
                                    hide-details
                                  >
                                    <v-radio
                                      label="女生"
                                      value="female"
                                      color="red"
                                    />
                                    <v-radio
                                      label="男生"
                                      value="male"
                                      color="blue"
                                    />
                                  </v-radio-group>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    上傳檔案
                                  </p>
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
                                class="d-flex justify-center"
                              >
                                <v-col>
                                  <p class="mb-2">
                                    多行欄位
                                  </p>
                                  <v-textarea
                                    color="accent"
                                    outlined
                                    placeholder="請輸入文字"
                                    counter="50"
                                  />
                                </v-col>
                              </v-row>
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
                        </v-container>
                      </v-form>
                    </fet-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row
                  class="d-flex justify-center"
                  dense
                >
                  <v-col
                    cols="12"
                    sm="10"
                  >
                    <fet-card
                      flat
                      full-width
                      title="無獨立標題"
                      text
                    >
                      <v-form>
                        <v-container>
                          <v-row class="d-flex justify-center">
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col>
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    label="文字欄位"
                                    placeholder="請輸入文字"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col>
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    label="Email 欄位"
                                    placeholder="請輸入 Email"
                                    outlined
                                    hint="此欄位為必填欄位"
                                    persistent-hint
                                    prepend-inner-icon="mdi-email"
                                    type="email"
                                  />
                                </v-col>
                              </v-row>
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col>
                                  <v-text-field
                                    :hide-details="hideDatails"
                                    color="accent"
                                    dense
                                    label="密碼欄位"
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
                                <v-col>
                                  <v-select
                                    :items="['option1', 'option2', 'option3']"
                                    color="accent"
                                    item-color="accent"
                                    label="Select"
                                    placeholder="請選擇"
                                    dense
                                    outlined
                                    hide-details
                                  />
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-row
                                :dense="dense"
                                :no-gutters="noGutters"
                              >
                                <v-col>
                                  <v-file-input
                                    :hide-details="hideDatails"
                                    label="上傳圖片"
                                    placeholder="請點選上傳..."
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
                                <v-col>
                                  <v-textarea
                                    color="accent"
                                    outlined
                                    label="多行欄位"
                                    placeholder="請輸入文字"
                                    counter="50"
                                  />
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-row
                            :dense="dense"
                            :no-gutters="noGutters"
                            class="d-flex justify-center"
                          >
                            <v-col
                              cols="3"
                              md="2"
                            >
                              <v-subheader>
                                Checkbox
                              </v-subheader>
                            </v-col>
                            <v-col
                              cols="9"
                              md="8"
                            >
                              <v-row dense>
                                <v-col class="mt-n4">
                                  <v-checkbox
                                    label="Checkbox1"
                                    input-value="true"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                  <v-checkbox
                                    label="Checkbox2"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                </v-col>
                                <v-col class="mt-n4">
                                  <v-checkbox
                                    label="Checkbox3"
                                    input-value="true"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                  <v-checkbox
                                    label="Checkbox4"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                </v-col>
                                <v-col class="mt-n4">
                                  <v-checkbox
                                    label="Checkbox5"
                                    input-value="true"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                  <v-checkbox
                                    label="Checkbox6"
                                    color="accent"
                                    dense
                                    hide-details
                                  />
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-row
                            :dense="dense"
                            :no-gutters="noGutters"
                            class="d-flex justify-center"
                          >
                            <v-col
                              cols="3"
                              md="2"
                            >
                              <v-subheader>
                                Radio Button
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
                                  label="女生"
                                  value="female"
                                  color="red"
                                />
                                <v-radio
                                  label="男生"
                                  value="male"
                                  color="blue"
                                />
                              </v-radio-group>
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
                        </v-container>
                      </v-form>
                    </fet-card>
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
      }
    },
  }
</script>

<style lang="scss" scoped></style>