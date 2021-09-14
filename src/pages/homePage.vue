<template>
  <v-container>
    <v-btn class="primary ma-2" @click="general = true">角色：受理人員</v-btn>
    <v-btn class="primary ma-2" @click="general = false">角色：核算員</v-btn>
    <!-- 角色:受理人員 -->
    <div v-if="general == true" class="ml-10">
      <h1 class="font-bold">
        我的表單
      </h1>      
      <v-row class="ml-10">        
        <v-col cols="2">
          <v-card
            elevation="6"                        
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">受理中</h2>
            <span style="font-size:96px;">2</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">核算中</h2>
            <span style="font-size:96px;">2</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">代理件</h2>
            <span style="font-size:96px;">1</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
      </v-row>
      <hr class="mt-8 mb-5">
      <h1 class="font-bold">
        我的退件區
      </h1>
      <v-row class="ml-10">        
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"  
            max-width="200px"     
          >
            <h2 class="font-bold">案件退件</h2>
            <span style="font-size:96px;">2</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                         
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">多媒體退件</h2>
            <span style="font-size:96px;">3</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
      </v-row>
      <hr class="mt-8 mb-5">      
      <h1 class="font-bold">
        我的調閱區
      </h1>
      <v-row class="ml-10">
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">調閱中</h2>
            <span style="font-size:96px;">2</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                         
            class="font-bold t-center" 
            max-width="200px"      
          >
            <h2 class="font-bold">申請中</h2>
            <span style="font-size:96px;">1</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- 角色:核算員 -->
    <div v-if="general == false" class="ml-10">
      <h1 class="font-bold">
        我的核算區
      </h1>      
      <v-row class="ml-10">        
        <v-col cols="2">
          <v-card
            elevation="6"                        
            class="font-bold t-center"
            max-width="200px"       
          >
            <h2 class="font-bold">待核算</h2>
            <span style="font-size:96px;">5</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"  
            max-width="200px"     
          >
            <h2 class="font-bold">待歸檔</h2>
            <span style="font-size:96px;">4</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"  
            max-width="200px"     
          >
            <h2 class="font-bold">未分派</h2>
            <span style="font-size:96px;">3</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>       
      </v-row>
      <hr class="mt-8 mb-5">
      <h1 class="font-bold">
        我的調閱區
      </h1>
      <v-row class="ml-10">        
        <v-col cols="2">
          <v-card
            elevation="6"
                        
            class="font-bold t-center"  
            max-width="200px"     
          >
            <h2 class="font-bold">調閱中</h2>
            <span style="font-size:96px;">2</span>
            <span style="font-size:30px;">件</span>
          </v-card>
        </v-col>        
      </v-row>      
    </div>
  </v-container>
</template>

<script src="./homePage.js"></script>
