<template>
  <v-container>
    <h2 class="font-bold">角色設定</h2>
    <div class="ml-10 font-18px font-bold">
      <v-row align="center">
        <v-col cols="1">單位</v-col>
        <v-col          
          cols="3"
          class="font-bold"          
        > 
          <v-select   
            v-model="division"
            :items="divOption"                
            color="#ADADAD"
            outlined
            hide-details
            dense
            :return-object="true"
            item-text="divisionName"
            placeholder="請選擇單位"
            :clearable="(divOption.length === 1? false : true)"
            @change="chooseDivision()"
          />
        </v-col>
        <v-col cols="1" />
        <v-col cols="1">組別</v-col>
        <v-col
          cols="3"
          class="font-bold"          
        >                
          <v-select
            v-model="group"
            :items="groupOption"   
            color="#ADADAD"
            :return-object="true"
            outlined
            hide-details
            item-text="groupName"
            dense
            placeholder="請選擇組別"
            :clearable="(groupOption.length === 1? false : true)"
            @change="chooseGroup()"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="1">課別</v-col>
        <v-col
          cols="3"
          class="font-bold"          
        >            
          <v-select
            v-model="section"
            :items="sectionOption"
            :return-object="true"            
            color="#ADADAD"
            outlined
            item-text="sectionName"
            hide-details
            dense
            :clearable="true"
            placeholder="請選擇課別"
          />
        </v-col>
        <v-col cols="1" />
        <v-col cols="1">角色</v-col>
        <v-col
          cols="3"         
          class="font-bold"          
        >                
          <v-select  
            v-model="role"
            :items="roleOption" 
            :return-object="true"
            color="#ADADAD"
            outlined
            hide-details
            item-text="setRoleName"
            :clearable="true"
            dense
            placeholder="請選擇角色"
          />
        </v-col>
        <!-- <v-col cols="1" /> -->
      </v-row>
      <v-row class="mt-5">
        <v-col cols="10" />
        <v-col>
          <!-- <v-btn class="primary ml-3" @click="search()">&emsp;查詢&emsp;</v-btn>        
          <v-btn class="primary ml-3" @click="popOut(editPopOut)">          
            依角色設定          
          </v-btn> -->
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="primary"
                @click="queryEmpRoleInfo()"
                v-on="on"
              >
                <v-icon v-text="'mdi-magnify'" />
              </v-btn>
            </template>
            <span>查詢</span>
          </v-tooltip>     
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ma-2"
                fab
                small
                color="primary"
                @click="popOut(editPopOut)"
                v-on="on"
              >
                <v-icon v-text="'mdi-account'" />
              </v-btn>
            </template>
            <span>依角色設定</span>
          </v-tooltip>
        </v-col>
      </v-row>         
    </div>    
    <hr class="mt-6 mb-5 ml-8">
    <v-row class="ml-5">
      <v-col cols="12">    
        <v-data-table
          :headers="empListHeaders"
          :items="empList"
          :items-per-page="10"
          no-data-text="查無資料"          
          disable-sort
          hide-default-footer
          class="elevation-1"
          :page.sync="empListPage"
          @page-count="empListPageCount = $event"
        >
          <template v-slot:item.role="{ item }">
            <!--隱藏被選擇的欄位 -->
            <div v-if="!item.edit" class="d-flex">
              <div style="width:250px; margin: auto; text-overflow: ellipsis; overflow: hidden; white-space:nowrap;">
                <div v-for="(role,index) in item.roleList" :key="index">{{ role.roleName }}</div>
              </div>              
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    fab
                    small
                    color="success"
                    @click="modifyrole(item)"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-pencil'" />
                  </v-btn>
                </template>
                <span>修改</span>
              </v-tooltip>
            </div> 
                          
            <div v-if="openSelectBox == item.empNo" class="d-flex">
              <v-select
                v-model="selectRole"
                style="width:200px"
                multiple
                :items="roleOption"
                item-text="setRoleName"
                return-object        
              >
                <template v-slot:selection="{ item, index }">
                  <span v-if="index < maxDisplay">{{ item.setRoleName }} &nbsp;</span>
                  <span
                    v-if="index === maxDisplay"
                    class="grey--text caption"
                  >(..還有{{ selectRole.length - maxDisplay }}項)</span>
                </template>
              </v-select>
              <v-btn class="mt-3" color="success" @click="submit(item)">&emsp;送出&emsp;</v-btn>
            </div>   
          </template>                 
        </v-data-table>
      </v-col>
    </v-row>
    <!-- 選頁 -->
    <div class="mt-2">
      <v-pagination
        v-model="empListPage"
        color="#2F59C4"
        :length="empListPageCount"
      />
    </div>    
    <v-dialog
      v-model="editPopOut"
      max-width="800"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="background-color:#363636; color:white;">          
          依角色設定
          <v-spacer />
          <v-btn
            color="white"
            icon
            small
            text
            @click="popOut(editPopOut)"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div style="margin:10px 12px">
            <div style="font-weight:bold; font-size:18px; color:black;">步驟一:請選擇角色</div>          
            <v-row style="margin:auto;">                        
              <div style="font-size:16px; color:black; margin:auto 0;">
                角色
              </div>                                      
              <v-col cols="4">
                <v-select
                  v-model="select.role"                
                  :items="roleOption"
                  item-text="setRoleName"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇角色"
                  return-object
                  @change="resetSelect()"
                />            
              </v-col>            
            </v-row>
            <div style="font-weight:bold; font-size:18px; color:black;">步驟二:請選擇單位</div>  
            <v-row style="margin: auto;">
              <div style="font-size:16px; color:black; margin:auto 0;">
                單位            
              </div>
              <v-col cols="4">
                <v-select   
                  v-model="select.division"
                  :return-object="true"
                  :items="divOption"
                  :clearable="(divOption.length === 1? false : true)"           
                  color="#ADADAD"
                  outlined
                  hide-details
                  item-text="divisionName"
                  dense
                  placeholder="請選擇單位"
                  @change="chooseDivision()"
                />
              </v-col>  
            </v-row>    
            <div style="font-weight:bold; font-size:18px; color:black;">步驟三:請選擇組別(若設定組長或組員，選擇至組即可)</div>
            <v-row style="margin: auto;">
              <div style="font-size:16px; color:black; margin:auto 0;">
                組別              
              </div>
              <v-col cols="4">
                <v-select
                  v-model="select.group"
                  :return-object="true"
                  :items="groupOption"
                  :clearable="(groupOption.length === 1? false : true)"       
                  color="#ADADAD"
                  outlined
                  hide-details
                  item-text="groupName"
                  dense                
                  placeholder="請選擇組別"
                  @change="chooseDivision()"
                />
              </v-col>
            </v-row>
            <div style="font-weight:bold; font-size:18px; color:black;">步驟四:請選擇課別</div>
            <v-row style="margin: auto;">
              <div style="font-size:16px; color:black; margin:auto 0;">
                課別      
              </div>
              <v-col cols="4">
                <v-select
                  v-model="select.section"
                  :return-object="true"
                  :items="sectionOption"
                  :clearable="(sectionOption.length === 1? false : true)" 
                  item-text="sectionName"                      
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇課別"
                  @change="resetSelect()"
                />
              </v-col>            
            </v-row>                     
          </div>
          <v-row>
            <v-col>
              <v-btn class="primary ml-3" @click="queryEmpInfoByRoleCode()">查詢</v-btn>
            </v-col>
          </v-row>   

          <hr class="mt-5 ml-3">
          <v-chip
            v-for="(title, index) in modroleTitle"
            :key="index"
            close
            @click:close="cancelMod(title)"
          >        
            {{ title }}
          </v-chip>          
          
          <v-row style="margin:auto;">
            <v-col>
              <v-btn color="primary" style="margin:5px 0;" @click="selectAll('add')">全選</v-btn>
              <span class="ml-5 font-bold">尚未設定該角色的員工清單</span>
              <v-col style="border:2px solid green; height:260px; overflow-y:scroll; border-radius:5px;">
                <div v-for="(item, index) in unSettingEmpList" :key="index">
                  <v-btn style="margin: 2px;" @click="toSelected(item,'unSetting')">{{ item.empNo }}{{ item.empName }}</v-btn>
                </div>                            
              </v-col>
              
            </v-col>
            <v-col>
              <v-btn color="primary" style="margin:5px 0;" @click="selectAll('clear')">清空</v-btn>
              <span class="ml-5 font-bold">已設定該角色的員工清單</span>
              <v-col style="border:2px solid green; height:260px;overflow-y:scroll; border-radius:5px;">
                <div v-for="(item, index) in settingEmpList" :key="index">
                  <v-btn style="margin: 2px;" @click="toSelected(item,'setting')">{{ item.empNo }}{{ item.empName }}</v-btn>
                </div> 
              </v-col>
            </v-col>                        
          </v-row>          
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="normal"            
            @click="editPopOut = false"
          >
            &emsp;關閉&emsp;
          </v-btn>
          <v-btn
            color="success"            
            @click="editSubmit()"
          >
            &emsp;確定&emsp;
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-container>
</template>

<script src="./characterPrivilegePage.js"></script>

<style lang="scss" scoped></style>