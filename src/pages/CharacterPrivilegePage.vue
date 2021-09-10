<template>
  <v-container>
    <h2>設定角色</h2>
    <div>
      <v-row>
        <div style="margin: auto 1px;">單位</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex"
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
        <div style="margin: auto 1px;">組別</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex"
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
      <v-row style="margin-bottom:10px;">
        <div style="margin: auto 1px;">課別</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex"
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
        <div style="margin: auto 1px;">角色</div>
        <v-col
          lg="3"
          xl="4"
          class="d-flex"
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
      </v-row>         
    </div>    
    <hr>
    <v-row>
      <v-col cols="12">    
        <v-data-table
          :headers="empListHeaders"
          :items="empList"
          :items-per-page="10"
          no-data-text="查無資料"
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
  </v-container>
</template>

<script src="./characterPrivilegePage.js"></script>

<style lang="scss" scoped></style>