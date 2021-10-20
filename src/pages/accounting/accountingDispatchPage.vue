<template>
  <v-app>
    <v-container>
      <h2 class="font-bold">核算派工設定</h2>
      <v-row>
        <v-col cols="11" />
        <v-col>          
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="success"
                v-on="on"
                @click="newDispatch()"
              >
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-btn>
            </template>
            <span>新增派工</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <hr>
      <v-row>
        <v-col cols="12">    
          <v-data-table
            :headers="dispatchHeaders"
            :items="dispatchList"
            :page.sync="dispatchListPage"
            :items-per-page="10"
            hide-default-footer
            no-data-text="查無資料"
            class="elevation-1"
            disable-sort
            @page-count="dispatchListPageCount = $event"
          >
            <template v-slot:item.edit="{ item }">              
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2 success"
                    fab
                    small                
                    v-on="on"
                    @click="queryDispatch(item)"
                  >
                    <v-icon>mdi-account-edit-outline</v-icon>
                  </v-btn>
                </template>
                <span>修改派工</span>
              </v-tooltip>              
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2 error"
                    fab
                    small                
                    v-on="on"
                    @click="remove(item)"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                </template>
                <span>刪除派工</span>
              </v-tooltip>
            </template>
           
          </v-data-table>
          <!-- 選頁 -->
          <div class="mt-2">
            <v-pagination
              v-model="dispatchListPage"
              color="#2F59C4"
              :length="dispatchListPageCount"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="800px"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">{{ dialogTitle }}
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="dialog = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <hr>
          <div class="ml-10">
            <div class="font-18px font-bold">
              <v-row align="center" class="mt-5">          
                <v-col cols="2">
                  <span v-if="dialogType==='add'" class="red--text">*</span>       
                  班別
                </v-col>   
                <v-col cols="6">
                  <div v-if="dialogType==='add'">
                    <v-text-field
                      v-model="dispatchInfo.className"
                      outlined
                      hide-details                                         
                      dense
                      placeholder="請輸入班別"
                      @blur="checkRequired()"
                    />
                  </div>
                  <div v-if="dialogType!=='add'">
                    {{ dispatchInfo.className }}
                  </div>
                  <span class="red--text font-12px">{{ errorMsg.className }}</span>                
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <span v-if="dialogType==='add'" class="red--text">*</span>          
                  核算員
                </v-col>         
                <v-col cols="6">
                  <div v-if="dialogType==='add'">
                    <v-select
                      id="accountingSelect"
                      v-model="accounting"
                      outlined
                      hide-details                                         
                      dense
                      placeholder="請選擇核算員"
                      :items="accountingList"
                      item-text="empName"
                      :return-object="true"
                      @change="change('accounting')"
                      @blur="checkRequired()"
                    />
                  </div>
                  <div v-if="dialogType!=='add'">
                    {{ dispatchInfo.accountingName }}
                  </div>
                  <span class="red--text font-12px">{{ errorMsg.accounting }}</span>    
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <span v-if="dialogType==='add'" class="red--text">*</span>        
                  檢算員
                </v-col>         
                <v-col cols="6">
                  <div v-if="dialogType==='add'">
                    <v-select
                      v-model="calculate"
                      outlined
                      hide-details
                      dense
                      placeholder="請選擇檢算員"
                      :items="calculateList"
                      item-text="empName"
                      :return-object="true"
                      @change="change('calculate')"
                      @blur="checkRequired()"
                    />
                  </div>
                  <div v-if="dialogType!=='add'">
                    {{ dispatchInfo.calculateName }}
                  </div>
                  <span class="red--text font-12px">{{ errorMsg.calculate }}</span>    
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12">
                  <span class="red--text">*</span>       
                  登記單分派班別設定：
                </v-col>
              </v-row>
              <v-row>
                <span class="red--text font-12px ml-4">{{ errorMsg.classType }}</span>
              </v-row>
              <v-radio-group v-model="dispatchInfo.dispatchType">
                <v-radio label="不論契約種類，皆以電號設定分派班別。" @click="changeDispatchType('non')" />
                <span class="red--text font-12px ml-4">{{ errorMsg.electricNum }}</span>
                <v-row v-for="(electricNum, index) in dispatchInfo.electricNumList" :key="index" style="margin: 0 10px 10px 0;" align="center">
                  <div style="height: 10px; width: 15px;" />
                  <span style="margin-right: 10px;" :class="dispatchInfo.dispatchType === 0? '':'disable-text'">電號 : </span>         
                  <v-col cols="3">
                    <v-text-field
                      v-model="electricNum.start"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dispatchInfo.dispatchType !== 0"
                      @blur="checkElectric(electricNum,'electricNum','electricNumList','start')"
                    />
                  </v-col>
                  <span :class="dispatchInfo.dispatchType !== 1? '':'disable-text'">~</span>
                  <v-col cols="3">
                    <v-text-field
                      v-model="electricNum.end"
                      outlined
                      hide-details                                         
                      dense
                      :disabled="dispatchInfo.dispatchType !== 0"
                      @blur="checkElectric(electricNum,'electricNum','electricNumList','end')"
                    />
                  </v-col>
                  <v-col v-if="dispatchInfo.dispatchType == 0 && dispatchInfo.electricNumList.length > 1" cols="1">
                    <v-btn
                      :disabled="dispatchInfo.dispatchType !== 0"
                      class="ma-2"
                      color="error"
                      fab
                      small
                      @click="removeElectricNum(index)"
                    >
                      <v-icon v-text="'mdi-minus'" />
                    </v-btn>
                  </v-col>
                  <v-col v-if="index == dispatchInfo.electricNumList.length - 1 && dispatchInfo.dispatchType == 0" cols="1">
                    <v-btn
                      :disabled="dispatchInfo.dispatchType !== 0"
                      class="ma-2"
                      color="primary"
                      fab
                      small
                      @click="addElectricNum()"
                    >
                      <v-icon v-text="'mdi-plus'" />
                    </v-btn>
                  </v-col>
                </v-row>
                <v-radio label="依契約種類設定分派班別：" @click="changeDispatchType()" />
                <span class="red--text font-12px ml-4">{{ errorMsg.contractType }}</span>
                
                <!-- 包制 -->
                <v-row style="margin: 10px;" align="center">
                  <v-col style="padding-top: 0;">
                    <v-row align="center">            
                      <v-checkbox 
                        v-model="dispatchInfo.usePackage" 
                        hide-details
                        class="shrink mt-0"
                        style="margin-top: 0;" 
                        :disabled="dispatchInfo.dispatchType !== 1"
                      />
                      <span style="margin: 10px;" :class="dispatchInfo.dispatchType!==0? '':'disable-text'">
                        包制
                        <span class="red--text font-12px ml-4">{{ errorMsg.packageNum }}</span>
                      </span>
                    </v-row>
                    <v-row v-for="(packageNum, index) in dispatchInfo.packageNumList" :key="packageNum+index" class="ml-4" style="margin: 0 10px 10px 0;" align="center">
                      <div style="height: 10px; width: 15px;" />
                      <span style="margin-right: 10px;" :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.usePackage? '':'disable-text'">電號 : </span>         
                      <v-col cols="3">
                        <v-text-field
                          v-model="packageNum.start"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="dispatchInfo.dispatchType !== 1 || !dispatchInfo.usePackage"
                          @blur="checkElectric(packageNum,'packageNum','packageNumList','start')"
                        />
                      </v-col>
                      <span :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.usePackage ? '':'disable-text'">~</span>
                      <v-col cols="3">
                        <v-text-field
                          v-model="packageNum.end"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="dispatchInfo.dispatchType !== 1 || !dispatchInfo.usePackage"
                          @blur="checkElectric(packageNum,'packageNum','packageNumList','end')"
                        />
                      </v-col>
                      <v-col v-if="dispatchInfo.dispatchType == 1 && dispatchInfo.usePackage && dispatchInfo.packageNumList.length > 1" cols="1">
                        <v-btn
                          :disabled="dispatchInfo.dispatchType !== 1"
                          class="ma-2"
                          color="error"
                          fab
                          small
                          @click="removePackageNum(index)"
                        >
                          <v-icon v-text="'mdi-minus'" />
                        </v-btn>
                      </v-col>
                      <v-col v-if="index == dispatchInfo.packageNumList.length - 1 && dispatchInfo.dispatchType == 1 && dispatchInfo.usePackage" cols="1">
                        <v-btn
                          :disabled="dispatchInfo.dispatchType !== 1 && dispatchInfo.usePackage"
                          class="ma-2"
                          color="primary"
                          fab
                          small
                          @click="addPackageNum()"
                        >
                          <v-icon v-text="'mdi-plus'" />
                        </v-btn>
                      </v-col>
                    </v-row>
                    <!-- 高壓 -->
                    <v-row align="center">            
                      <v-checkbox 
                        v-model="dispatchInfo.useHighVoltage"
                        hide-details
                        class="shrink mt-0" 
                        style="margin-top: 0;"
                        :disabled="dispatchInfo.dispatchType !== 1"
                      />
                      <span style="margin: 10px;" :class="dispatchInfo.dispatchType!==0? '':'disable-text'">
                        高壓
                        <span class="red--text font-12px ml-4">{{ errorMsg.highVoltageNum }}</span>
                      </span>        
                    </v-row>
                    <v-row v-for="(highVoltageNum, index) in dispatchInfo.highVoltageNumList" :key="index" class="ml-4" style="margin: 0 10px 10px 0;" align="center">
                      <div style="height: 10px; width: 15px;" />
                      <span style="margin-right: 10px;" :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.useHighVoltage? '':'disable-text'">電號 : </span>         
                      <v-col cols="3">
                        <v-text-field
                          v-model="highVoltageNum.start"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="dispatchInfo.dispatchType !== 1 || !dispatchInfo.useHighVoltage"
                          @blur="checkElectric(highVoltageNum,'highVoltageNum','highVoltageNumList','start')"
                        />
                      </v-col>
                      <span :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.useHighVoltage ? '':'disable-text'">~</span>
                      <v-col cols="3">
                        <v-text-field
                          v-model="highVoltageNum.end"
                          outlined
                          hide-details                                         
                          dense
                          :disabled="dispatchInfo.dispatchType !== 1 || !dispatchInfo.useHighVoltage"
                          @blur="checkElectric(highVoltageNum,'highVoltageNum','highVoltageNumList','end')"
                        />
                      </v-col>
                      <v-col v-if="dispatchInfo.dispatchType == 1 && dispatchInfo.highVoltageNumList.length > 1 && dispatchInfo.useHighVoltage" cols="1">
                        <v-btn
                          :disabled="dispatchInfo.dispatchType !== 1"
                          class="ma-2"
                          color="error"
                          fab
                          small
                          @click="removeHighVoltageNum(index)"
                        >
                          <v-icon v-text="'mdi-minus'" />
                        </v-btn>
                      </v-col>
                      <v-col v-if="index == dispatchInfo.highVoltageNumList.length - 1 && dispatchInfo.dispatchType == 1 && dispatchInfo.useHighVoltage" cols="1">
                        <v-btn
                          :disabled="dispatchInfo.dispatchType !== 1 && dispatchInfo.useHighVoltage"
                          class="ma-2"
                          color="primary"
                          fab
                          small
                          @click="addHighVoltageNum()"
                        >
                          <v-icon v-text="'mdi-plus'" />
                        </v-btn>
                      </v-col>
                    </v-row>

                    <!-- 表制 -->
                    <v-radio-group v-model="dispatchInfo.meterType">
                      <v-row align="center">
                        <v-checkbox 
                          v-model="dispatchInfo.useMeter" 
                          hide-details
                          class="shrink mt-0"
                          style="margin-top: 0;"
                          :disabled="dispatchInfo.dispatchType !== 1" 
                        />
                        <span style="margin-left: 10px; width: 40px;" :class="dispatchInfo.dispatchType!==0? '':'disable-text'">表制 </span>                 
                        <span class="red--text font-12px ml-4">{{ errorMsg.meterType != null? errorMsg.meterType: errorMsg.meterElectricNum != null? errorMsg.meterElectricNum: errorMsg.meterCompute != null? errorMsg.meterCompute : null }}</span>
                      </v-row>
                      <v-row v-for="(meterElectricNum, index) in dispatchInfo.meterElectricNumList" :key="index" class="ml-4" style="margin: 0 10px 10px 0;" align="center">
                        <div v-if="index == 0">
                          <v-radio class="ml-5" :disabled="dispatchInfo.dispatchType!==1 || !dispatchInfo.useMeter" />
                        </div>
                        <div style="height: 10px;" />
                        <div v-if="index == 0">
                          <span class="mr-1" :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.useMeter && dispatchInfo.meterType == 0? '':'disable-text'">電號： </span>         
                        </div>
                        <div v-if="index != 0" class="ml-13">
                          <span class="mr-1" :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.useMeter && dispatchInfo.meterType == 0? '':'disable-text'">電號： </span>         
                        </div>
                        <v-col cols="3">
                          <v-text-field
                            v-model="meterElectricNum.start"
                            outlined
                            hide-details                                         
                            dense
                            :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==0"
                            @blur="checkElectric(meterElectricNum,'meterElectricNumList','start')"
                          />
                        </v-col>
                        <span :class="dispatchInfo.dispatchType !== 0 && dispatchInfo.useMeter ? '':'disable-text'">~</span>
                        <v-col cols="3">
                          <v-text-field
                            v-model="meterElectricNum.end"
                            outlined
                            hide-details                                         
                            dense
                            :disabled=" !dispatchInfo.useMeter || dispatchInfo.meterType!==0"
                            @blur="checkElectric(meterElectricNum,'meterElectricNumList','end')"
                          />
                        </v-col>
                        <v-col v-if="dispatchInfo.dispatchType == 1 && dispatchInfo.meterElectricNumList.length > 1 && dispatchInfo.useMeter && dispatchInfo.meterType == 0" cols="1">
                          <v-btn
                            :disabled="dispatchInfo.dispatchType !== 1"
                            class="ma-2"
                            color="error"
                            fab
                            small
                            @click="removeMeterElectricNum(index)"
                          >
                            <v-icon v-text="'mdi-minus'" />
                          </v-btn>
                        </v-col>
                        <v-col v-if="index == dispatchInfo.meterElectricNumList.length - 1 && dispatchInfo.dispatchType == 1 && dispatchInfo.useMeter && dispatchInfo.meterType == 0" cols="1">
                          <v-btn
                            :disabled="dispatchInfo.dispatchType !== 1 && dispatchInfo.useMeter"
                            class="ma-2"
                            color="primary"
                            fab
                            small
                            @click="addMeterElectricNum()"
                          >
                            <v-icon v-text="'mdi-plus'" />
                          </v-btn>
                        </v-col>
                      </v-row>
                     
                      <v-row>
                        <div style="height: 10px;width: 50px;" />
                        <v-radio style="margin-top: 10px;" :disabled="dispatchInfo.dispatchType !== 1 || !dispatchInfo.useMeter" />
                        <v-row align="center">
                          <span style="margin: 10px;" :class="dispatchInfo.dispatchType===1 && dispatchInfo.useMeter && dispatchInfo.meterType==1? '':'disable-text'">計算日</span>
                          <v-col>
                            <v-row>
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="01" value="01" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="02" value="02" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="03" value="03" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="04" value="04" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="05" value="05" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="06" value="06" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="07" value="07" class="meter-checkbox" />
                              <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="dispatchInfo.meterType!==1" label="08" value="08" class="meter-checkbox" />
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-row>
                      <v-row style="margin-top: 0;">
                        <div style="height: 10px;width: 140px;" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="09" value="09" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="10" value="10" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="11" value="11" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="12" value="12" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="13" value="13" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="14" value="14" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="15" value="15" class="meter-checkbox" />
                        <v-checkbox v-model="dispatchInfo.computeDateList" :disabled="!dispatchInfo.useMeter || dispatchInfo.meterType!==1" label="16" value="16" class="meter-checkbox" />
                      </v-row>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-radio-group>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn style="margin: 0 10px 10px 0;" @click="dialog = false">{{ closeText }}</v-btn>
          <v-btn v-if="dialogType==='add'" color="success" style="margin-bottom: 10px;" @click="setInputVal('new')">新增派工</v-btn>
          <v-btn v-if="dialogType==='edit'" color="success" style="margin-bottom: 10px;" @click="setInputVal('edit')">修改派工</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDispatchModel"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          確認是否要刪除派工
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="deleteDispatchModel = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="font-24px">
          <v-row class="mt-6 ml-1 font-bold">
            請確認是否要刪除派工 ?
          </v-row>
        </v-card-text>
        <v-card-actions class="d-end mt-6">
          <v-btn              
            color="normal"            
            @click="deleteDispatchModel = false"
          >
            &emsp;取消&emsp;
          </v-btn>
          <v-btn              
            color="primary"            
            @click="removeDispatch()"
          >
            &emsp;確定&emsp;
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./accountingDispatchPage.js" />
