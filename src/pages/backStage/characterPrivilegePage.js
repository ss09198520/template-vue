import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

  export default {
    data() {
      return {
        //預設當前頁數
        empListPage: 1,
        //預設總頁數
        empListPageCount: 0,
        //控制彈出視窗
        editPopOut: false,
        //控制選擇角色時最多顯示數量
        maxDisplay: 1,
        //控制是否打開修改角色                
        openSelectBox: '',
        deptList:[],
        //區處                
        division: [
            {division: null, divisionName: null},            
        ],
        divOption: [],
        //組別
        group: [
            {group: null, groupName: null},            
        ],
        groupOption: [],
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
        //課別
        section: [
            {section: null, sectionName: null},
        ],
        sectionOption: [],
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
        //角色別
        role: [
            {setRoleCode: null, setRoleName: null},            
        ],
        roleOption: [],
        //員工清單項目名稱
        empListHeaders: [
            { text: '姓名代號', value: 'empNo', align: 'center' },
            { text: '姓名', value: 'empName', align: 'center' },
            { text: '單位', value: 'divisionName', align: 'center' },
            { text: '組別', value: 'groupName', align: 'center' },
            { text: '課別', value: 'sectionName', align: 'center' },
            { text: '資料來源', value: 'settingStyle', align: 'center' },
            { text: '備註', value: 'memo', align: 'center' },
            { text: '角色', value: 'role', align: 'center',width:'25' }
        ],
        //員工清單
        empList: [
            
        ],
        empMockList: [
            //台中區處
            { empNo: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人工設定',memo:'',edit:false},
            { empNo: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人工設定',memo:'',edit:false},
            
            { empNo: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門主管,服務中心主辦',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            
            { empNo: '1050403-001', empName: '黃昕怡', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',role:'核算課長',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050403-002', empName: '簡芷蕾', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',role:'核算員,調閱管理員',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1050403-003', empName: '趙燁', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',role:'核算員,主辦業務計畫員',settingStyle:'人事資訊系統',memo:'',edit:false},
            //豐原分處
            { empNo: '1052331-001', empName: '葉慶華', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052331-002', empName: '王曉花', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052331-003', empName: '林美美', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052332-001', empName: '蔡政揚', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052332-002', empName: '張芊芊', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052332-003', empName: '江舒語', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},

            { empNo: '1052320-001', empName: '陳大天', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',role:'受理部門主管,服務中心主辦',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '1052320-002', empName: '何欣惠', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            //業務處
            { empNo: '0071702-001', empName: '李騰鴻', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '0071702-002', empName: '沈欺霜', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '0071702-003', empName: '楊振甫', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '0071700-001', empName: '牧青羽', empDivision:'業務處', empGroup:'行銷組',empSection:'',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false},
            { empNo: '0071700-002', empName: '王美玲', empDivision:'業務處', empGroup:'行銷組',empSection:'',role:'受理部門',settingStyle:'人工設定',memo:'',edit:false},
            { empNo: '0071700-003', empName: '蕭彥辰', empDivision:'業務處', empGroup:'行銷組',empSection:'',role:'受理部門',settingStyle:'人工設定',memo:'',edit:false},
        ],
        //控制上一筆點選修改是否編輯中
        selectEmp:null,
        //mock的角色清單
        mockChar:[
            { empNo: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            { empNo: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            { empNo: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            
            { empNo: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門主管,服務中心主辦',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
        ],
        //比對mock的角色清單
        oriMockChar:[
            { empNo: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            { empNo: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門主管',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            { empNo: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
            
            { empNo: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門主管,服務中心主辦',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:false},
            { empNo: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',role:'受理部門',settingStyle:'人事資訊系統',memo:'',edit:false, isSelected:true},
        ],
        modroleTitle:[],
        //批次選擇的角色
        setrole: '',
      }
    },
    beforeMount(){
        this.init();
    },
    methods: {
        init(){
            this.queryAuthSettingOption();
            this.queryEmpRoleInfo()
        },

        //根據選擇的單位顯示可選取組別，再根據選擇的組別顯示可選取課別
        chooseDivision(){
            this.division = this.divOption[0];
            for(let i in this.deptList){
                if(this.division.division === this.deptList[i].divisionCode){
                    for(let index in this.deptList[i].groupSectionList){
                        this.groupOption.push({
                            group: this.deptList[i].groupSectionList[index].groupCode,
                            groupName: this.deptList[i].groupSectionList[index].groupName,
                        })
                    }
                }
            }

            // 若組別資料只有一筆則直接顯示
            if(this.groupOption.length == 1){
                this.group = this.groupOption[0];

                this.chooseGroup();
            }

        },

        chooseGroup(){
            for(let i in this.deptList){
                if(this.division.division === this.deptList[i].divisionCode){
                    for(let index in this.deptList[i].groupSectionList){
                        if(this.group.group === this.deptList[i].groupSectionList[index].groupCode){
                            this.sectionOption = this.deptList[i].groupSectionList[index].sectionList;
                        }
                    }
                }
            }

            // 若課別資料只有一筆則直接顯示
            if(this.sectionOption.length == 1){
                this.section = this.sectionOption[0];
            }
        },
      
        searchRoleSetting(){  
            this.empList = [];        
            if(this.division == '1'){                              
                if(this.group == '1'){
                    if(this.section == '1'){
                        for(let i = 0; i < this.empMockList.length; i++){
                            if(this.empMockList[i].empSection == '服務中心' && this.empMockList[i].empDivision == '台中區處'){
                                this.empList.push(this.empMockList[i]);
                            }
                        }
                        return;
                    }else if(this.section == '2'){
                        for(let j = 0; j < this.empMockList.length; j++){
                            if(this.empMockList[j].empSection == '東山服務所' && this.empMockList[j].empDivision == '台中區處'){
                                this.empList.push(this.empMockList[j]);
                            }
                        }
                        return;
                    }else if(this.section == '3'){
                        for(let k = 0; k < this.empMockList.length; k++){
                            if(this.empMockList[k].empSection == '西屯服務所' && this.empMockList[k].empDivision == '台中區處'){
                                this.empList.push(this.empMockList[k]);
                            }
                        }
                        return;
                    }
                    for(let x = 0; x < this.empMockList.length; x++){
                        if(this.empMockList[x].empGroup == '業務組' && this.empMockList[x].empDivision == '台中區處'){
                            this.empList.push(this.empMockList[x]);
                        }
                    }
                    return;
                }else if(this.group == '2'){            
                    if(this.section == '15'){
                        for(let i = 0; i < this.empMockList.length; i++){
                            if(this.empMockList[i].empSection == '核算課' && this.empMockList[i].empDivision == '台中區處'){
                                this.empList.push(this.empMockList[i]);
                            }
                        }
                        return;
                    }
                    for(let y = 0; y < this.empMockList.length; y++){
                        if(this.empMockList[y].empGroup == '電費組'){
                            this.empList.push(this.empMockList[y]);
                        }
                    }
                    return;
                }

                for(let i = 0; i < this.empMockList.length; i++){                  
                    if(this.empMockList[i].empDivision == '台中區處'){                      
                        this.empList.push(this.empMockList[i]);
                    }                  
                }
            }else if(this.division == '2'){
                if(this.group == '1'){
                    if(this.section == '16'){
                        for(let i = 0; i < this.empMockList.length; i++){
                            if(this.empMockList[i].empSection == '服務中心' && this.empMockList[i].empDivision == '台中區處-豐原分處'){
                                this.empList.push(this.empMockList[i]);
                            }
                        }
                        return;
                    }else if(this.section == '17'){
                        for(let j = 0; j < this.empMockList.length; j++){
                            if(this.empMockList[j].empSection == '東勢服務所'){
                                this.empList.push(this.empMockList[j]);
                            }
                        }
                        return;
                    }else if(this.section == '18'){
                        for(let k = 0; k < this.empMockList.length; k++){
                            if(this.empMockList[k].empSection == '后里服務所'){
                                this.empList.push(this.empMockList[k]);
                            }
                        }
                        return;
                    }
                    for(let x = 0; x < this.empMockList.length; x++){
                        if(this.empMockList[x].empGroup == '業務組' && this.empMockList[x].empDivision == '台中區處-豐原分處'){
                            this.empList.push(this.empMockList[x]);
                        }
                    }
                    return;
                }
                for(let i = 0; i < this.empMockList.length; i++){                  
                    if(this.empMockList[i].empDivision == '台中區處-豐原分處'){                      
                        this.empList.push(this.empMockList[i]);
                    }                  
                }
            }else if(this.division == '3'){
                if(this.group == '3'){
                    for(let x = 0; x < this.empMockList.length; x++){
                        if(this.empMockList[x].empGroup == '行銷組'){
                            this.empList.push(this.empMockList[x]);
                        }
                    }
                    return;
                }
                for(let i = 0; i < this.empMockList.length; i++){                  
                    if(this.empMockList[i].empDivision == '業務處'){                      
                        this.empList.push(this.empMockList[i]);
                    }                  
                }
            }
        },
        modifyrole(item){ 
            if(this.selectEmp == null){
                this.selectEmp = item;
            }            
            this.selectEmp.edit = false;            
            this.role = [];                                  
            item.edit = true;
            this.openSelectBox = item.empNo;            
            let temprole = item.role.split(",");                        
            for(let i = 0; i < this.roleOption.length; i++){
                for(let j = 0; j < temprole.length; j++){
                    if(this.roleOption[i].text == temprole[j]){
                        this.role.push(this.roleOption[i]);                        
                    }
                }                               
            }                    
            this.selectEmp = item;       
        },
        submit(item){                       
            item.role = "";              
            let num = 0;            
            console.log(this.role);
            for(let i = 0; i < this.roleOption.length; i++){
                for(let j = 0; j < this.role.length; j++){  
                    if(this.roleOption[i].value == this.role[j].value){
                        if(num > 0){
                            item.role += ',' + this.roleOption[i].text;
                        }else{
                            item.role += this.roleOption[i].text;
                        }                                    
                        num++;
                    }                                                                                          
                }  
            }                                                                         
            this.role = [];
            this.openSelectBox = '';
            item.edit = false;
            
        },
        //彈出角色設定視窗
        popOut(editPopOut){
            this.editPopOut = !editPopOut;
        },
        //選擇新增角色
        toSelected(item){
            //build a copy item and compare to the original one                                    
            item.isSelected = true;                              
            for(let i = 0; i < this.mockChar.length; i++){
                if(this.mockChar[i].empNo == item.empNo && this.mockChar[i].isSelected != this.oriMockChar[i].isSelected){                                                                  
                    let checkTitleExist = false; 
                    for(let j = 0; j < this.modroleTitle.length; j++){
                        if(this.modroleTitle[j] == this.setrole.text){
                            checkTitleExist = true;
                        }
                    }
                    if(!checkTitleExist){
                        this.modroleTitle.push(this.setrole.text);
                    }                
                }                
            }
        },
        cancelMod(title){
            console.log(title);
            for(let i = 0; i < this.modroleTitle.length; i++){
                if(this.modroleTitle[i] == title){
                    this.modroleTitle.splice(i, 1);                                           
                }
            }
            for(let j = 0; j < this.mockChar.length; j++){
                for(let k = 0; k < this.oriMockChar.length; k++){
                    if(this.oriMockChar[k].empNo == this.mockChar[j].empNo && this.oriMockChar[k].isSelected != this.mockChar[j].isSelected){
                        let select = this.mockChar[j].isSelected;
                        this.mockChar[j].isSelected = !select;
                    }
                }
            }
            return false;
        },
        //選擇刪除角色
        toNotSelected(item){
            item.isSelected = false;
            for(let i = 0; i < this.mockChar.length; i++){
                if(this.mockChar[i].empNo == item.empNo && this.mockChar[i].isSelected != this.oriMockChar[i].isSelected){                                                                    
                    let checkTitleExist = false;
                    for(let j = 0; j < this.modroleTitle.length; j++){
                        if(this.modroleTitle[j] == this.setrole.text){
                            checkTitleExist = true;
                        }
                    }
                    if(!checkTitleExist){
                        this.modroleTitle.push(this.setrole.text);
                    }                       
                }                
            }
        },
        selectAll(selectType){
            if(selectType == 'add'){
                for(let item of this.mockChar){
                    item.isSelected = true;
                }
                let checkTitleExist = false;
                for(let j = 0; j < this.modroleTitle.length; j++){
                    if(this.modroleTitle[j] == this.setrole.text){
                        checkTitleExist = true;
                    }
                }
                if(!checkTitleExist){
                    this.modroleTitle.push(this.setrole.text);
                }
            } else{
                for(let item of this.mockChar){
                    item.isSelected = false;
                }
                let checkTitleExist = false;
                for(let j = 0; j < this.modroleTitle.length; j++){
                    if(this.modroleTitle[j] == this.setrole.text){
                        checkTitleExist = true;
                    }
                }
                if(!checkTitleExist){
                    this.modroleTitle.push(this.setrole.text);
                }
            }
        },

        settingOption(deptOptList){
           for(let i in deptOptList){
                this.divOption.push({
                    division:deptOptList[i].divisionCode,
                    divisionName:deptOptList[i].divisionName,
                })
           }

           if(this.divOption.length == 1){
             this.division = this.divOption[0];
             this.chooseDivision();
           }
        },



        /**
         * Ajax Start
         */

        // Action:查詢角色設定下拉選單
        queryAuthSettingOption(){
            AjaxService.post('/roleAuth/queryAuthSettingOption',{},
              (response) => {
                  // 驗證是否成功
                  if (!response.restData.success) {              
                      MessageService.showError(response.restData.returnMessage,'查詢角色設定下拉選單');
                      return;
                  }
                this.roleOption = response.restData.authList;
                this.deptList = response.restData.deptList;
                this.settingOption(response.restData.deptList);
                
      
              },
              // eslint-disable-next-line no-unused-vars
              (response) => {                
                  MessageService.showSystemError();
              });
        },

        // Action:依條件查詢員工角色清單
        queryEmpRoleInfo(){
            console.log(this.division);
            console.log(this.group);
            console.log(this.section);
            console.log(this.role);
            AjaxService.post('/roleAuth/querySettingEmpAuth',{
                division: this.division.division,
                group: this.group.group,
                section: (ValidateUtil.isEmpty(this.section)? null : this.section.sectionCode),
                roleCode:(ValidateUtil.isEmpty(this.role)? null : this.role.setRoleCode),
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.returnMessage,'依條件查詢員工角色清單');
                    return;
                }
                this.empList = response.restData.empRoleList;
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },

        // Action:修改員工角色
        updateEmpRole(){
            
        },

        // Action:依角色查詢設定的員工清單
        queryEmpInfoByRoleCode(){
            
        },

        // Action:依角色設定的員工
        updateEmpRoleByRoleCode(){
            
        },




        /**
         * Ajax End
         */
    },
  }
