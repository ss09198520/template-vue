<template>
  <v-container>
    <!-- 角色:受理人員 -->
    <div class="ml-10">
      <div v-if="showCounts.myForm">
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
              <span style="font-size:96px;">{{ numberOf.numberOfMyFormAccept }}</span>
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
              <span style="font-size:96px;">{{ numberOf.numberOfMyFormAcceptAgent }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
        </v-row>
        <hr class="mt-8 mb-5">
      </div>
      <div v-if="showCounts.myReturnForm || showCounts.myReturnMedia">
        <h1 class="font-bold">
          我的退件區
        </h1>
        <v-row class="ml-10">      
          <v-col v-if="showCounts.myReturnForm" cols="2">
            <v-card
              elevation="6"
                        
              class="font-bold t-center"  
              max-width="200px"     
            >
              <h2 class="font-bold">案件退件</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfMyReturn }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
          <v-col v-if="showCounts.myReturnMedia" cols="2">
            <v-card
              elevation="6"
                         
              class="font-bold t-center"
              max-width="200px"       
            >
              <h2 class="font-bold">多媒體退件</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfMyReturnMedia }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
        </v-row>
        <hr class="mt-8 mb-5">      
      </div>
      <div v-if="showCounts.myRead">
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
              <span style="font-size:96px;">{{ numberOf.numberOfMyRead }}</span>
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
              <span style="font-size:96px;">{{ numberOf.numberOfMyReadApply }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
        </v-row>
        <hr class="mt-8 mb-5">
      </div>
      <!-- 角色:核算員 -->
      <div v-if="showCounts.myAccounting">
        <h1 class="font-bold">
          我的核算區
        </h1>      
        <v-row class="ml-10">        
          <v-col v-if="showCounts.hasAccounting" cols="2">
            <v-card
              elevation="6"                        
              class="font-bold t-center"
              max-width="200px"       
            >
              <h2 class="font-bold">待核算</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfAccounting }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
          <v-col v-if="showCounts.hasCalculate" cols="2">
            <v-card
              elevation="6"                        
              class="font-bold t-center"
              max-width="200px"       
            >
              <h2 class="font-bold">可檢算</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfCalculate }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
          <v-col v-if="showCounts.hasAccounting" cols="2">
            <v-card
              elevation="6"
                        
              class="font-bold t-center"  
              max-width="200px"     
            >
              <h2 class="font-bold">待歸檔</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfArchive }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>
          <v-col v-if="showCounts.hasAccounting" cols="2">
            <v-card
              elevation="6"
                        
              class="font-bold t-center"  
              max-width="200px"     
            >
              <h2 class="font-bold">未分派</h2>
              <span style="font-size:96px;">{{ numberOf.numberOfUndispatch }}</span>
              <span style="font-size:30px;">件</span>
            </v-card>
          </v-col>       
        </v-row>
        <hr class="mt-8 mb-5">
      </div>
      <div 
        v-if="showCounts.mySignOffSeal || showCounts.mySignOffReadApply || showCounts.mySignOffReadList || showCounts.mySignOffReturnReport || showCounts.mySignOffMedia"
      >
        <div>
          <h1 class="font-bold">
            我的簽核區
          </h1>      
          <v-row class="ml-10">        
            <v-col v-if="showCounts.mySignOffReadApply" cols="2">
              <v-card
                elevation="6"                        
                class="font-bold t-center"
                max-width="200px"       
              >
                <h2 class="font-bold">調閱簽核</h2>
                <span style="font-size:96px;">{{ numberOf.numberOfReadApply }}</span>
                <span style="font-size:30px;">件</span>
              </v-card>
            </v-col>
            <v-col v-if="showCounts.mySignOffSeal" cols="2">
              <v-card
                elevation="6"
                        
                class="font-bold t-center"  
                max-width="200px"     
              >
                <h2 class="font-bold">專用章</h2>
                <span style="font-size:96px;">{{ numberOf.numberOfSealSignOff }}</span>
                <span style="font-size:30px;">件</span>
              </v-card>
            </v-col>
            <v-col v-if="showCounts.mySignOffReturnReport" cols="2">
              <v-card
                elevation="6"
                        
                class="font-bold t-center"  
                max-width="200px"     
              >
                <h2 class="font-bold">退件報表</h2>
                <span style="font-size:96px;">{{ numberOf.numberOfRejectReport }}</span>
                <span style="font-size:30px;">件</span>
              </v-card>
            </v-col>
            <v-col v-if="showCounts.mySignOffReadList" cols="2">
              <v-card
                elevation="6"
                        
                class="font-bold t-center"  
                max-width="200px"     
              >
                <h2 class="font-bold">調閱清單</h2>
                <span style="font-size:96px;">{{ numberOf.numberOfReadReport }}</span>
                <span style="font-size:30px;">件</span>
              </v-card>
            </v-col>
            <v-col v-if="showCounts.mySignOffMedia" cols="2">
              <v-card
                elevation="6"
                        
                class="font-bold t-center"  
                max-width="200px"     
              >
                <h2 class="font-bold">多媒體簽核</h2>
                <span style="font-size:96px;">{{ numberOf.numberOfMediaAccounting }}</span>
                <span style="font-size:30px;">件</span>
              </v-card>
            </v-col>       
          </v-row>         
        </div> <hr class="mt-8 mb-5"></div></div></v-container>
</template>

<script src="./homePage.js"></script>
