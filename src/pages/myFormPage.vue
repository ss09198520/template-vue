<template>
  <v-container>
    <div class="d-flex">
      <div class="ma-4">
        <h2>受理中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4">
        <h2>核算中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4">
        <h2>代理件</h2>
        <span style="font-size:96px;">1</span><span style="font-size:30px;">件</span>
      </div>      
    </div>
    <div>
      <v-btn class="ma-4" color="primary">
        只顯示受理件
      </v-btn>
      <v-btn class="ma-4" color="primary">
        顯示全部
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="empListHeaders"
          :items="empMockList"
          :items-per-page="10"
          no-data-text="查無資料"
          style="font-weight: bold;"
        >
          <template v-slot:item.mani="{ item }">   
            <div v-if="item.mani==true">
              <v-btn
                outlined              
                text
                @click="test(item)"
              >
                補件操作
              </v-btn>
              <v-btn
                outlined              
                text
                @click="test(item)"
              >
                取消案件
              </v-btn>
              <v-btn
                outlined              
                text
                @click="test(item)"
              >
                瀏覽案件
              </v-btn>
            </div>                                                                               
          </template>

          <template v-slot:item.proxyEvent="{ item }">                                                        
            <div             
              v-if="item.proxyEvent == true"
              class="ma-2"
              icon
              @click="test(item)"
            >
              <v-icon>
                mdi-check-bold
              </v-icon>
            </div>                         
          </template>
        </v-data-table>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script src="./myFormPage.js"></script>