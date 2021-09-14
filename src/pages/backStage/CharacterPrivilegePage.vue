<template>
  <v-container>
    <h2 class="font-bold">設定角色</h2>
    <div>
      <v-row class="ml-5" align="center">
        <v-col cols="1">單位 :</v-col>
        <v-col
          lg="3"
          xl="4"
          class="d-flex font-bold"          
        >                
          <v-select   
            v-model="division"
            :items="divOption"                
            color="#ADADAD"
            outlined
            hide-details
            dense
            placeholder="請選擇單位"
            @change="chooseDivision()"
          />
        </v-col>
        <div style="margin: auto 1px;color:black;">組別</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex font-bold"          
        >                
          <v-select
            v-model="group"
            :items="groupOption"   
            color="#ADADAD"
            outlined
            hide-details
            dense
            placeholder="請選擇組別"
            @change="chooseDivision()"
          />
        </v-col>
      </v-row>
      <v-row class="ml-5 mb-5">
        <div style="margin: auto 1px;color:black;">課別</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex font-bold"          
        >            
          <v-select
            v-model="section"
            :items="sectionOption"                   
            color="#ADADAD"
            outlined
            hide-details
            dense
            placeholder="請選擇課別"
          />
        </v-col>
        <div style="margin: auto 1px;color:black;">角色</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex font-bold"          
        >                
          <v-select  
            v-model="character"
            :items="characterOption" 
            color="#ADADAD"
            outlined
            hide-details
            dense
            placeholder="請選擇角色"
          />
        </v-col>
        <v-btn style="margin: auto 2px;" color="primary" @click="search()">查詢</v-btn>
        <v-btn style="margin: auto 0 auto 23%;" color="primary" @click="popOut(editPopOut)">
          <v-icon dark>
            mdi-account
          </v-icon>
          依角色設定          
        </v-btn>
      </v-row>         
    </div>    
    <hr class="ma-4">
    <v-row class="ma-2">
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
          <template v-slot:item.character="{ item }">
            <!--TODO: 如何隱藏被選擇的欄位 -->
            <div v-if="!item.edit" class="d-flex">
              <div style="width:250px; margin: auto; text-overflow: ellipsis; overflow: hidden; white-space:nowrap;">{{ item.character }}</div>              
              <v-btn
                class="ma-2"
                icon
                @click="modifyCharacter(item)"
              >
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div> 
                          
            <div v-if="openSelectBox == item.empId" class="d-flex">
              <v-select
                v-model="character"
                style="width:min-content; margin:auto;"
                multiple
                :items="characterOption"
                item-text="text"
                item-value="value"
                return-object                   
              >
                <template v-slot:selection="{ item, index }">
                  <span v-if="index < maxDisplay">{{ item.text }} &nbsp;</span>
                  <span
                    v-if="index === maxDisplay"
                    class="grey--text caption"
                  >(..還有{{ character.length - maxDisplay }}項)</span>
                </template>
              </v-select>
              <v-btn color="error" @click="submit(item)">送出</v-btn>
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
                  v-model="setCharacter"                
                  :items="characterOption"
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇角色"
                  return-object
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
                  v-model="division"
                  :items="divOption"                
                  color="#ADADAD"
                  outlined
                  hide-details
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
                  v-model="group"
                  :items="groupOption"   
                  color="#ADADAD"
                  outlined
                  hide-details
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
                  :items="sectionOption"                               
                  outlined
                  hide-details
                  dense
                  placeholder="請選擇課別"
                />
              </v-col>            
            </v-row>                     
          </div>
          <v-row>
            <v-col cols="5">
              <v-btn color="primary">查詢</v-btn>
            </v-col>
          </v-row>   

          <hr>
          <v-chip
            v-for="(title, index) in modCharacterTitle"
            :key="index"
            close
            @click:close="cancelMod(title)"
          >        
            {{ title }}
          </v-chip>          
          
          <v-row style="margin:auto;">
            <v-col>
              <v-btn color="primary" style="margin:5px 0;" @click="selectAll('add')">全選</v-btn>
              <v-col style="border:2px solid green; height:260px; overflow-y:scroll; border-radius:5px;">
                <div v-for="(item, index) in mockChar" :key="index">
                  <v-btn v-if="!item.isSelected" style="margin: 2px;" @click="toSelected(item)">{{ item.empId }}{{ item.empName }}</v-btn>
                </div>                            
              </v-col>
            </v-col>
            <v-col>
              <v-btn color="primary" style="margin:5px 0;" @click="selectAll('clear')">清空</v-btn>
              <v-col style="border:2px solid green; height:260px;overflow-y:scroll; border-radius:5px;">
                <div v-for="(item, index) in mockChar" :key="index">
                  <v-btn v-if="item.isSelected" style="margin: 2px;" @click="toNotSelected(item)">{{ item.empId }}{{ item.empName }}</v-btn>
                </div> 
              </v-col>
            </v-col>                        
          </v-row>          
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"            
            @click="popOut(editPopOut)"
          >
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-container>
</template>

<script src="./characterPrivilegePage.js"></script>

<style lang="scss" scoped></style>