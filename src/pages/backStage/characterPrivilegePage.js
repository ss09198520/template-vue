
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
        //區處                
        division: '',
        divOption: [
            { text: '台中區處', value: '1'},
            { text: '台中區處-豐原分處', value: '2'},
            { text: '業務處', value: '3'},
        ],
        //組別
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
        //課別
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
        //角色別
        character: [],
        characterOption: [
            { text: '主辦業務計畫員', value: 'AUTH01'},
            { text: '受理部門', value: 'AUTH02'},
            { text: '服務中心主辦', value: 'AUTH03'},
            { text: '受理部門主管', value: 'AUTH04'},
            { text: '業務經理', value: 'AUTH05'},
            { text: '調閱管理員', value: 'AUTH06'},
            { text: '核算課長', value: 'AUTH07'},
            { text: '電費經理', value: 'AUTH08'},
            { text: '服務中心主任', value: 'AUTH09'},
            { text: '行銷主管-銷售作業', value: 'AUTH10'},
            { text: '行銷組組長', value: 'AUTH11'},
            { text: '多媒體設定-業務處', value: 'AUTH12'},
            { text: '多媒體設定-區處', value: 'AUTH13'},
            { text: '核算員', value: 'AUTH15'},
        ],
        //員工清單項目名稱
        empListHeaders: [
            { text: '編號', value: 'empId', align: 'center' },
            { text: '姓名', value: 'empName', align: 'center' },
            { text: '單位', value: 'empDivision', align: 'center' },
            { text: '組別', value: 'empGroup', align: 'center' },
            { text: '課別', value: 'empSection', align: 'center' },
            { text: '設定方式', value: 'settingStyle', align: 'center' },
            { text: '備註', value: 'memo', align: 'center' },
            { text: '角色', value: 'character', align: 'center',width:'25' }
        ],
        //員工清單
        empList: [
            
        ],
        empMockList: [
            //台中區處
            { empId: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            
            { empId: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            
            { empId: '1050403-001', empName: '黃昕怡', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算課長',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050403-002', empName: '簡芷蕾', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算員,調閱管理員',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1050403-003', empName: '趙燁', empDivision:'台中區處', empGroup:'電費組',empSection:'核算課',character:'核算員,主辦業務計畫員',settingStyle:'自動抓取',memo:'',edit:false},
            //豐原分處
            { empId: '1052331-001', empName: '葉慶華', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052331-002', empName: '王曉花', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052331-003', empName: '林美美', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'東勢服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052332-001', empName: '蔡政揚', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052332-002', empName: '張芊芊', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052332-003', empName: '江舒語', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'后里服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},

            { empId: '1052320-001', empName: '陳大天', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '1052320-002', empName: '何欣惠', empDivision:'台中區處-豐原分處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            //業務處
            { empId: '0071702-001', empName: '李騰鴻', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '0071702-002', empName: '沈欺霜', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '0071702-003', empName: '楊振甫', empDivision:'業務處', empGroup:'行銷組',empSection:'銷售作業課',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '0071700-001', empName: '牧青羽', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '0071700-002', empName: '王美玲', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
            { empId: '0071700-003', empName: '蕭彥辰', empDivision:'業務處', empGroup:'行銷組',empSection:'',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false},
        ],
        //控制上一筆點選修改是否編輯中
        selectEmp:null,
        //mock的角色清單
        mockChar:[
            { empId: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            { empId: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            { empId: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            
            { empId: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
        ],
        //比對mock的角色清單
        oriMockChar:[
            { empId: '1050330-001', empName: '', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            { empId: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            { empId: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            
            { empId: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
            { empId: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
        ],
        modCharacterTitle:[],
        //批次選擇的角色
        setCharacter: '',
      }
    },
    beforeMount(){
        this.init();
    },
    methods: {
        init(){
            this.empList = this.empMockList;
        },

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
        modifyCharacter(item){ 
            if(this.selectEmp == null){
                this.selectEmp = item;
            }            
            this.selectEmp.edit = false;            
            this.character = [];                                  
            item.edit = true;
            this.openSelectBox = item.empId;            
            let tempCharacter = item.character.split(",");                        
            for(let i = 0; i < this.characterOption.length; i++){
                for(let j = 0; j < tempCharacter.length; j++){
                    if(this.characterOption[i].text == tempCharacter[j]){
                        this.character.push(this.characterOption[i]);                        
                    }
                }                               
            }                    
            this.selectEmp = item;       
        },
        submit(item){                       
            item.character = "";              
            let num = 0;            
            console.log(this.character);
            for(let i = 0; i < this.characterOption.length; i++){
                for(let j = 0; j < this.character.length; j++){  
                    if(this.characterOption[i].value == this.character[j].value){
                        if(num > 0){
                            item.character += ',' + this.characterOption[i].text;
                        }else{
                            item.character += this.characterOption[i].text;
                        }                                    
                        num++;
                    }                                                                                          
                }  
            }                                                                         
            this.character = [];
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
                if(this.mockChar[i].empId == item.empId && this.mockChar[i].isSelected != this.oriMockChar[i].isSelected){                                                                  
                    let checkTitleExist = false; 
                    for(let j = 0; j < this.modCharacterTitle.length; j++){
                        if(this.modCharacterTitle[j] == this.setCharacter.text){
                            checkTitleExist = true;
                        }
                    }
                    if(!checkTitleExist){
                        this.modCharacterTitle.push(this.setCharacter.text);
                    }                
                }                
            }
        },
        cancelMod(title){
            console.log(title);
            for(let i = 0; i < this.modCharacterTitle.length; i++){
                if(this.modCharacterTitle[i] == title){
                    this.modCharacterTitle.splice(i, 1);                                           
                }
            }
            for(let j = 0; j < this.mockChar.length; j++){
                for(let k = 0; k < this.oriMockChar.length; k++){
                    if(this.oriMockChar[k].empId == this.mockChar[j].empId && this.oriMockChar[k].isSelected != this.mockChar[j].isSelected){
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
                if(this.mockChar[i].empId == item.empId && this.mockChar[i].isSelected != this.oriMockChar[i].isSelected){                                                                    
                    let checkTitleExist = false;
                    for(let j = 0; j < this.modCharacterTitle.length; j++){
                        if(this.modCharacterTitle[j] == this.setCharacter.text){
                            checkTitleExist = true;
                        }
                    }
                    if(!checkTitleExist){
                        this.modCharacterTitle.push(this.setCharacter.text);
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
                for(let j = 0; j < this.modCharacterTitle.length; j++){
                    if(this.modCharacterTitle[j] == this.setCharacter.text){
                        checkTitleExist = true;
                    }
                }
                if(!checkTitleExist){
                    this.modCharacterTitle.push(this.setCharacter.text);
                }
            } else{
                for(let item of this.mockChar){
                    item.isSelected = false;
                }
                let checkTitleExist = false;
                for(let j = 0; j < this.modCharacterTitle.length; j++){
                    if(this.modCharacterTitle[j] == this.setCharacter.text){
                        checkTitleExist = true;
                    }
                }
                if(!checkTitleExist){
                    this.modCharacterTitle.push(this.setCharacter.text);
                }
            }
        },
    },
  }
