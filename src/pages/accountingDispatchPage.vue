<template>
  <v-app>
    <v-container>
      <h2>核算派工</h2>
      <v-row>
        <v-col cols="10" />
        <v-col>
          <v-btn class="primary" style="margin:10px;"><v-icon style="margin-right: 3px;" @click="dialog=true;changeTitle('add')">mdi-plus</v-icon>新增</v-btn>
          <v-btn class="success" style="margin:10px;"><v-icon style="margin-right: 3px;">mdi-account-multiple</v-icon>派工</v-btn>
        </v-col>
      </v-row>
      <hr>
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="headers"
            :items="itemList"
            :disable-sort="true"
            :items-per-page="10"
            no-data-text="查無資料"
          >
            <template v-slot:item.edit="{ item }">
              <v-btn :disabled="!item.edit" icon style="color: #019858"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
            <template v-slot:item.remove="{ item }">
              <v-btn :disabled="!item.remove" icon style="color: red"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <hr>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="800px"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <hr>
          <v-row align="center" style="margin-top: 10px;">          
            <span style="margin-left: 10px;">班別 :  </span>     
            <v-col cols="3">
              <v-text-field
                outlined
                hide-details                                         
                dense
                placeholder="請輸入班別"
              />
            </v-col>
          </v-row>
          <v-row align="center">
            <span style="margin-left: 10px;">核算員 :  </span>         
            <v-col cols="3">
              <v-text-field
                outlined
                hide-details                                         
                dense
                placeholder="請輸入核算員"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              登記單分派班別設定：
            </v-col>
          </v-row>
          <v-radio-group v-model="dispatchType">
            <v-radio label="不論契約種類，皆以電號設定分派班別。" value="electricNum" />
            <v-row style="margin: 0 10px 10px 10px;" align="center">
              <div style="height: 10px; width: 15px;" />
              <span style="margin-right: 10px;">電號 : </span>         
              <v-col cols="3">
                <v-text-field
                  outlined
                  hide-details                                         
                  dense
                  :disabled="dispatchType !== 'electricNum'"
                />
              </v-col>
              ~
              <v-col cols="3">
                <v-text-field
                  outlined
                  hide-details                                         
                  dense
                  :disabled="dispatchType !== 'electricNum'"
                />
              </v-col>
            </v-row>
            <v-radio label="依契約種類設定分派班別：" value="contractType" />
            <v-row style="margin: 10px;" align="center">
              <v-col style="padding-top: 0;">
                <v-checkbox v-model="usePackage" style="margin-top: 0;">
                  <template v-slot:label>
                    <v-row align="center">            
                      <span style="margin: 10px;">包制: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!usePackage"
                        />
                      </v-col>
                      ~
                      <v-col cols="3">
                        <v-text-field
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!usePackage"
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-checkbox>
                <v-checkbox v-model="useHighVoltage" style="margin-top: 0;">
                  <template v-slot:label>
                    <v-row align="center">            
                      <span style="margin: 10px;">高壓: 電號</span>        
                      <v-col cols="3">
                        <v-text-field
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!usePackage"
                        />
                      </v-col>
                      ~
                      <v-col cols="3">
                        <v-text-field
                          outlined
                          hide-details                                         
                          dense
                          :disabled="!usePackage"
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-checkbox>
                <v-checkbox v-model="useMeter" style="margin-top: 0;">
                  <template v-slot:label>
                    <v-row align="center">
                      <span style="margin-left: 10px; width: 40px;">表制: </span>
                      <v-radio v-model="useElectricNum">
                        <template v-slot:label>
                          <v-row align="center">
                            <span style="margin: 10px;">電號</span>
                            <v-col cols="5">
                              <v-text-field
                                outlined
                                hide-details                                         
                                dense
                                :disabled="!usePackage"
                              />
                            </v-col>
                            ~
                            <v-col cols="5">
                              <v-text-field
                                outlined
                                hide-details                                         
                                dense
                                :disabled="!usePackage"
                              />
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </v-row>
                  </template>
                </v-checkbox>
                <v-row>
                  <div style="height: 10px;width: 82px;" />
                  <v-radio v-model="useComputeDate" style="margin-top: 10px;">
                    <template v-slot:label>
                      <v-row align="center">
                        <span style="margin: 10px;">計算日:</span>
                        <v-col>
                          <v-row>
                            <v-checkbox v-model="computeDate" label="01" value="01" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="02" value="02" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="03" value="03" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="04" value="04" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="05" value="05" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="06" value="06" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="07" value="07" class="meter-checkbox" />
                            <v-checkbox v-model="computeDate" label="08" value="08" class="meter-checkbox" />
                          </v-row>
                        </v-col>
                      </v-row>
                    </template>
                  </v-radio>
                </v-row>
                <v-row style="margin-top: 0;">
                  <div style="height: 10px;width: 174px;" />
                  <v-checkbox v-model="computeDate" label="09" value="09" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="10" value="10" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="11" value="11" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="12" value="12" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="13" value="13" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="14" value="14" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="15" value="15" class="meter-checkbox" />
                  <v-checkbox v-model="computeDate" label="16" value="16" class="meter-checkbox" />
                </v-row>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" style="margin: 0 10px 10px 0;" @click="saveNewClass()">新增</v-btn>
          <v-btn style="margin-bottom: 10px;" @click="dialog = false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

export default {
    name: 'MyWaiting',
    props: {
    
    },
    data() {
        return {
            headers: [
                { text: '班別', value: 'class', align: 'center' },
                { text: '核算員', value: 'accounting', align: 'center' },
                { text: '核算員姓名', value: 'accountingName', align: 'center' },
                { text: '設定人員', value: 'settingUser', align: 'center' },
                { text: '設定人員姓名', value: 'settingUserName', align: 'center' },
                { text: '設定日期', value: 'settingDate', align: 'center' },
                { text: '修改', value: 'edit', align: 'center' },
                { text: '刪除', value: 'remove', align: 'center' }
            ],
            itemList: [
                { class: '1', accounting: '1050434018', accountingName: '王大明', settingUser: '1050334016', settingUserName: '李小凡', settingDate: '2021/09/11 10:55:31', edit: true, remove: true },
                { class: '2', accounting: '1050434019', accountingName: '李阿貴', settingUser: '1050334016', settingUserName: '李小凡', settingDate: '2021/09/11 10:57:13', edit: true, remove: true }
            ],
            dialog: false,
            dialogTitle: '新增班別',
            // 派工方式 electricNum: 直接以電號分派 / contractType: 根據契約種類設定
            dispatchType: '',
            // 包制
            usePackage: false,
            // 高壓
            useHighVoltage: false,
            // 表制
            useMeter: false,
            // 表制分派方式 useElectricNum: 以電號分派 / useComputeDate: 以計算日分派
            useElectricNum: false,
            useComputeDate: false,
            // 選擇的計算日
            computeDate: []
        }
    },
    methods: {
        changeTitle(action){
            if(action === 'add'){
                this.dialogTitle = "新增班別";
            }else{
                this.dialogTitle = "修改班別";
            }
        },
        saveNewClass() {
          this.dialog = false;
        }
    }
}
</script>

<style scoped>
  .meter-checkbox {
    width: 50px;
  }
</style>
