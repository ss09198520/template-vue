<template>
  <v-container>
    <div class="d-flex">
      <div class="ma-4 font-bold">
        <h2 class="font-bold">受理中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4 font-bold">
        <h2 class="font-bold">核算中</h2>
        <span style="font-size:96px;">2</span><span style="font-size:30px;">件</span>
      </div>
      <div class="ma-4 font-bold">
        <h2 class="font-bold">代理件</h2>
        <span style="font-size:96px;">1</span><span style="font-size:30px;">件</span>
      </div>      
    </div>
    <div>
      <v-btn class="ma-3" :class="{'primary': displayAll}" @click="displayAll = true">
        顯示全部
      </v-btn>
      <v-btn class="ma-3" :class="{'primary': !displayAll}" @click="displayAll = false">
        只顯示受理件
      </v-btn>      
    </div>
    <hr class="mt-6 mb-5 ml-3">          
    <v-data-table
      :headers="empListHeaders"
      :items="empMockList"
      :items-per-page="10"
      no-data-text="查無資料"
      hide-default-footer
      class="elevation-1 ml-4"
      disable-sort
      :page.sync="orderListPage"
      @page-count="orderListPageCount = $event"
    >
      <template v-slot:item.mani="{ item }">   
        <div v-if="item.mani==true">
          <v-btn                
            color="success"
            class="ma-1"
            @click="test(item)"
          >
            補件操作
          </v-btn>
          <v-btn                
            color="error"
            class="ma-1"
            @click="test(item)"
          >
            取消案件
          </v-btn>
          <v-btn                
            color="primary"
            class="ma-1"
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
    <div class="mt-2">
      <v-pagination
        v-model="orderListPage"
        color="#2F59C4"
        :length="orderListPageCount"
      />
    </div>  
  </v-container>
</template>

<script src="./myFormPage.js"></script>