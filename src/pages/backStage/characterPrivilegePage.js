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
        electricBillSectionOption:[
            { text: '核算課', value: '15'},
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
        empList: [],
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
        selectRole:[],
        newAuthList:[],
    }
    },
    beforeMount(){
        this.init();
    },
    methods: {
        init(){
            this.queryAuthSettingOption();
            this.queryEmpRoleInfo();
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
      
        modifyrole(item){
            let roleList = [];
            this.selectRole = [];                                  
            
            // 取出選擇到的員工角色清單
            for(let i in item.roleList){
                roleList.push(item.roleList[i].roleName);
            }
            // 將選到的員工放進selectEmp參數中
            if(this.selectEmp == null){
                this.selectEmp = item;
            }
            this.selectEmp.edit = false;            
            item.edit = true;
            this.openSelectBox = item.empNo;
            // 比對角色下拉選項，那些是已經設定的角色          
            for(let i = 0; i < this.roleOption.length; i++){
                for(let j = 0; j < roleList.length; j++){
                    if(this.roleOption[i].setRoleName == roleList[j]){
                        this.selectRole.push(this.roleOption[i]);                        
                    }
                }                               
            }                    
            this.selectEmp = item;       
        },
        submit(item){
            this.newAuthList = [];
            let optionArray = new Map(); // 下拉選單資料

            // 驗證選擇要設定的角色權限是否有在角色選單中
            if(!this.checkSettingRoleLegal()){
                return;
            }

            // 先將下拉選單取出並加進MAP中
            for(let i in this.roleOption){
                optionArray.set(this.roleOption[i].setRoleCode,this.roleOption[i]);
            }

            // 將原本的角色權限但不屬於操作人權限範圍的角色取出
            for(let authIndex in this.selectEmp.roleList){
                if(ValidateUtil.isEmpty(optionArray.get(this.selectEmp.roleList[authIndex].roleCode))){
                    this.newAuthList.push({
                        empNo: this.selectEmp.empNo,
                        empName: this.selectEmp.empName,
                        roleCode:this.selectEmp.roleList[authIndex].roleCode,
                        roleName:this.selectEmp.roleList[authIndex].roleName,
                    })
                }
            }

            // 在操作人權限範圍內更動的角色權限
            for(let optionIndex in this.roleOption){
                for(let authIndex in this.selectRole){
                    if(this.roleOption[optionIndex].setRoleName == this.selectRole[authIndex].setRoleName){
                        this.newAuthList.push({
                            empNo: this.selectEmp.empNo,
                            empName: this.selectEmp.empName,
                            roleCode:this.selectRole[authIndex].setRoleCode,
                            roleName:this.selectRole[authIndex].setRoleName,
                        })
                    }
                }
            }

            // 驗證是否沒有要更改的資料
            let requiredArray = [];
            if(ValidateUtil.isEmpty(this.newAuthList)){
                requiredArray.push('請選擇要設定的角色')
                MessageService.showCheckInfo(requiredArray,null);
                return;
            }

            // 將更新的資料打後端更新
            this.updateEmpRole();
                                   
            // 將選取資料重置
            this.selectRole = [];
            this.openSelectBox = null;
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

        // 整理部門下拉選單
        settingOption(deptOptList){
           for(let i in deptOptList){
                this.divOption.push({
                    division:deptOptList[i].divisionCode,
                    divisionName:deptOptList[i].divisionName,
                })
           }

           // 若單位只有一筆資料，直接帶入組別下拉選單
           if(this.divOption.length == 1){
             this.division = this.divOption[0];
             this.chooseDivision();
           }
        },

        // 驗證要設定的角色權限資料是否合法
        checkSettingRoleLegal(){
            let optionArray = new Map();
            let hasSettingLegal = true;

             // 先將下拉選單取出並加進MAP中
             for(let i in this.roleOption){
                optionArray.set(this.roleOption[i].setRoleCode,this.roleOption[i]);
            }
            // 比對選擇要更改的角色權限是否符合角色下拉選單
            for( let i in this.selectRole){
               if(ValidateUtil.isEmpty(optionArray.get(this.selectRole[i].setRoleCode))){
                  hasSettingLegal = false; 
               }
            }

           return hasSettingLegal;
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
                
                this.roleOption = response.restData.authList;// 將角色下拉選單帶入  
                this.deptList = response.restData.deptList;// 部門下拉選單資料帶入
                this.settingOption(response.restData.deptList);// 整理部門下拉選單
                
      
              },
              // eslint-disable-next-line no-unused-vars
              (response) => {                
                  MessageService.showSystemError();
              });
        },

        // Action:依條件查詢員工角色清單
        queryEmpRoleInfo(){
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
                
                // 將員工角色資料帶入
                this.empList = response.restData.empRoleList;
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },

        // Action:修改員工角色
        updateEmpRole(){
            AjaxService.post('/roleAuth/updateEmpRole',{
                newEmpAuthVoList: this.newAuthList,
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.returnMessage,'修改員工角色');
                    return;
                }

                // 再重新call一次查詢員工資料清單
                this.queryEmpRoleInfo();
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
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
