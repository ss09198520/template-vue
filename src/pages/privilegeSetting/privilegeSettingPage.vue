<template>
  <v-container>

    <!-- 頁面上半 第一頁-->

    <div>
      <v-row>
        <v-col class="ml-10">
          <div class="cal-btn-bar">
            <!-- 標題 -->
            <div class="content-title font-bold font-40px">
              權限設定
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="mt-15">
      <v-row>
        <v-col cols="1" />
        <v-col cols="1">
          <div>
            <span class="font-bold font-26px">角色</span>
          </div>
        </v-col>
        <v-col
          lg="8"
          xl="4"
          class="d-flex"
        >                
          <v-select   
            v-model="role"
            :items="rolesOption"                
            color="#ADADAD"
            outlined
            hide-details
            dense
            placeholder="請選擇角色"
            class="font-bold font-20px"
            @change="chooseDivision()"
          />
          
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="1">
          <div>
            <span class="font-bold font-26px">說明</span>
          </div>
        </v-col>
        <v-col
          lg="3"
          xl="9"
          class="d-flex"
        >
          <v-textarea
            v-model="comments"
            class="my-textarea"
            color="#ADADAD"
            outlined
            name="input-7-4"
            :no-resize="true"
            placeholder="請輸入角色說明"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="1">
          <div>
            <span class="font-bold font-26px">權限</span>
          </div>
        </v-col>
        <v-col
          xl="9"
          class="d-flex"
        >
          <v-expansion-panels
            v-model="openList"
            multiple
            flat
          >
            <v-expansion-panel
              v-for="(item,i) in authorityList"
              :key="i"
              inset
            >
              <v-expansion-panel-header class="headerLine">
                <span class="d-inline-block mr-5 mt-5 font-bold font-26px">{{ item.text }}</span>      
               
               
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row> 
                  <v-col
                    v-for="(items,index) in item.subAuthList"
                    :key="index"
                    cols="6"
                  > 
                    <v-switch
                      v-model="items.hasAuth"
                      inset
                      class="d-inline-flex"
                      color="primary"
                      @click="turnSubAuth(item,items)"
                    />
                    <span class="d-inline-flex font-bold font-20px">{{ items.type == 1 ? '無紙化-' : null }}{{ items.text }}</span>
                  </v-col>                      
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-col>
      </v-row> 
      <v-row>
        <v-col
          class="d-end"
        >
          <v-btn depressed color="error" x-large @click="saveAuth()">儲存</v-btn>
        </v-col></v-row>
    </div>
  </v-container>
</template>
<script src="./privilegeSettingPage.js"></script>
<!--CSS暫放區 -->
<style>
  .my-textarea textarea { 
    color: black !important;
    font-weight:bold;
    font-size:20px !important;
  }
  .v-select {
    font-size: 20px;
}
  .headerLine{
    border-bottom:black 1px solid;
    padding: 8px 0px;
    margin: 10px 0px;
    min-height: 0;
    font-size:40px;
    font-weight: bold
  }
  .font-bold{
    font-weight:bold
  }
  .font-40px{
    font-size:40px
  }
   .font-26px{
    font-size:26px
  }
  .font-20px{
    font-size:20px
  }
  .d-end{
    display: flex;
    justify-content: flex-end;
  }
</style>