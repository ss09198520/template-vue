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
        />
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
  export default {
    
    data() {
      return {
        division: '',
        divOption: [
            { text: '台中區處', value: '1'},
            { text: '台中區處-豐原分處', value: '2'},
            { text: '業務處', value: '3'},
        ],
        group: '',
        groupOption: [

        ],
        taichungGroupOption: [
            { text: '業務組', value: '1'},
            { text: '電費組', value: '2'},
        ],
        fonyuenGroupOption:[
            { text: '業務組', value: '1'},
        ],
        mainGroupOption: [
            { text: '行銷組', value: '3'},        
        ],
        section: '', 
        sectionOption: [

        ],
        taiSectionOption: [
            { text: '服務中心', value: '1' },
            { text: '東山服務所', value: '2' },
            { text: '西屯服務所', value: '3' },
            { text: '南屯服務所', value: '4' },
            { text: '烏日服務所', value: '5' },
            { text: '大里服務所', value: '6' },
            { text: '太平服務所', value: '7' },
            { text: '潭子服務所', value: '8' },
            { text: '大雅服務所', value: '9' },
            { text: '清水服務所', value: '10' },
            { text: '梧棲服務所', value: '11' },
            { text: '沙鹿服務所', value: '12' },
            { text: '龍井服務所', value: '13' },
            { text: '大肚服務所', value: '14' },            
        ],
        electricBillSectionOption:[
            { text: '核算課', value: '15'},
        ],
        fonYuenSectionOption: [
            { text: '服務中心', value: '16'},
            { text: '東勢服務所', value: '17'},
            { text: '后里服務所', value: '18'},
            { text: '神岡服務所', value: '19'},
            { text: '新社服務所', value: '20'},
            { text: '石岡服務所', value: '21'},
            { text: '梨山服務所', value: '22'},
            { text: '谷關服務所', value: '23'},
            { text: '大甲服務所', value: '24'},
            { text: '外埔服務所', value: '25'},
            { text: '大安服務所', value: '26'},
            { text: '甲安服務所', value: '27'},
        ],
        character: '',
        characterOption: [
            { text: '主辦業務計畫員', value: '1'},
            { text: '受理部門', value: '2'},
            { text: '服務中心主辦', value: '3'},
            { text: '受理部門主管', value: '4'},
            { text: '業務經理', value: '5'},
            { text: '調閱管理員', value: '6'},
            { text: '核算課長', value: '7'},
            { text: '電費經理', value: '8'},
            { text: '服務中心主任', value: '9'},
            { text: '行銷主管-銷售作業', value: '10'},
            { text: '行銷組組長', value: '11'},
            { text: '多媒體設定-業務處', value: '12'},
            { text: '多媒體設定-區處', value: '13'},
            { text: '核算員', value: '14'},
        ],
        //員工清單項目名稱
        empListHeaders: [
            { text: '編號', value: 'empId', align: 'center' },
            { text: '姓名', value: 'empName', align: 'center' },
            { text: '單位', value: 'empDivision', align: 'center' },
            { text: '組別', value: 'empGroup', align: 'center' },
            { text: '課別', value: 'empSection', align: 'center' },            
            { text: '角色', value: 'character', align: 'center' },
            { text: '設定方式', value: 'settingStyle', align: 'center' },
            { text: '備註', value: 'memo', align: 'center' },
        ],
        empList: [
            
        ],
        empMockList: [
            //台中區處
            { empId: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            
            { empId: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:''},
            { empId: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:''},
            
            { empId: '1050403-001', empName: '黃昕怡', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算課長',settingStyle:'自動抓取',memo:''},
            { empId: '1050403-002', empName: '簡芷蕾', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算員,調閱管理員',settingStyle:'自動抓取',memo:''},
            { empId: '1050403-003', empName: '趙燁', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算員,主辦業務計畫員',settingStyle:'自動抓取',memo:''},
            //豐原分處
            { empId: '1052331-001', empName: '葉慶華', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '1052331-002', empName: '王曉花', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1052331-003', empName: '林美美', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1052332-001', empName: '蔡政揚', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '1052332-002', empName: '張芊芊', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '1052332-003', empName: '江舒語', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門',settingStyle:'自動抓取',memo:''},

            { empId: '1052320-001', empName: '陳大天', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:''},
            { empId: '1052320-002', empName: '何欣惠', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:''},
            //業務處
            { empId: '0071702-001', empName: '李騰鴻', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '0071702-002', empName: '沈欺霜', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '0071702-003', empName: '楊振甫', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '0071700-001', empName: '牧青羽', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門主管',settingStyle:'自動抓取',memo:''},
            { empId: '0071700-002', empName: '王美玲', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門',settingStyle:'自動抓取',memo:''},
            { empId: '0071700-003', empName: '蕭彥辰', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門',settingStyle:'自動抓取',memo:''},
        ],

      }
    },
    methods: {
      //根據選擇的單位顯示可選取組別，再根據選擇的組別顯示可選取課別
      chooseDivision(){
          if(this.division == '1'){
              this.groupOption = this.taichungGroupOption;
              if(this.group == '1'){
                  this.sectionOption = this.taiSectionOption;
              }else if(this.group == '2'){
                  this.sectionOption = this.electricBillSectionOption;
              }
          }else if(this.division == '2'){
              this.groupOption = this.fonyuenGroupOption;
              if(this.group == '1'){
                  this.sectionOption = this.fonYuenSectionOption;
              }
          }else if(this.division == '3'){
              this.groupOption = this.mainGroupOption;
          }
      },
      
      search(){          
          if(this.division == '1'){                                     
              for(let i = 0; i < this.empMockList.length; i++){                  
                  if(this.empList[i].empDivision != '台中區處'){                      
                      this.empList.push(i, 1);
                  }                  
              }
          }
      },
    },
  }
</script>

<style lang="scss" scoped></style>