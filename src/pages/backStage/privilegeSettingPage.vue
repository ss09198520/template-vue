<template>
  <v-container>
    <!-- 頁面上半 第一頁-->
    <div>
      <h2 class="font-bold">權限設定</h2>       
    </div>

    <div class="ml-10">
      <v-row class="mt-5" align="center">
        <v-col cols="1">
          <div>
            <span class="font-bold font-18px">角色</span>
          </div>
        </v-col>
        <v-col
          lg="8"
          xl="3"
          class="d-flex"
        >                
          <v-select   
            v-model="role"
            :items="authRoleList"                
            color="#ADADAD"
            outlined
            hide-details
            item-text="roleName"
            :return-object="true"
            dense
            placeholder="請選擇角色"
            class="font-bold font-18px"
            @change="chooseDivision()"
          />
          
        </v-col>
      </v-row>
      <v-row v-if="role != null">
        <v-col cols="1">
          <div>
            <span class="font-bold font-18px">說明</span>
          </div>
        </v-col>
        <v-col
          lg="3"
          xl="9"
          class="d-flex"
        >
          <v-textarea
            v-model="description"
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
      <v-row v-if="role != null">
        <v-col cols="1">
          <div>
            <span class="font-bold font-18px">權限</span>
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
              v-for="(item,i) in rolePrivilegeList"
              :key="i"
              inset
            >
              <v-expansion-panel-header class="headerLine">
                <span class="d-inline-block mr-5 mt-5 font-bold font-18px">{{ item.privilegeTypeName }}</span>      
               
               
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row> 
                  <v-col
                    v-for="(items,index) in item.authPrivilegeList"
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
                    <span class="d-inline-flex font-bold font-18px">{{ items.privilegeName }}</span>
                  </v-col>                      
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-col>
      </v-row> 
      <v-row v-if="role != null">
        <v-col cols="9" />
        <v-col cols="">
          <v-btn depressed color="success" @click="setAuthInfo()">&emsp;儲存&emsp;</v-btn>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </div>
  </v-container>
</template>
<script src="./privilegeSettingPage.js"></script>