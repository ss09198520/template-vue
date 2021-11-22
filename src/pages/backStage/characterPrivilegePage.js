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
            { text: '角色', value: 'role', align: 'center' }
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
        select:{
            division: null,
            group: null,
            section: null,
            role: null,
        },
        settingEmpList:[],
        unSettingEmpList:[],
        allSettingEmpList:[],
        errMsg:{
            role:null,
            division:null,
            group: null,
        },
        requiredArray:[],

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
        chooseDivision(division){
            this.resetSelect(); // 先將員工角色清單清空
            // 先將組/課選項清空
            this.groupOption = []; 
            this.sectionOption = [];
            this.group = null;
            this.section = null;

            debugger

            for(let i in this.deptList){
                if(division.division === this.deptList[i].divisionCode){
                    for(let index in this.deptList[i].groupSectionList){
                        this.groupOption.push({
                            group: this.deptList[i].groupSectionList[index].groupCode,
                            groupName: this.deptList[i].groupSectionList[index].groupName,
                        })
                    }
                }
            }
        },

        chooseGroup(division,group){
            this.resetSelect(); // 先將員工角色清單清空
             // 先將課選項清空
             this.sectionOption = [];
             this.section = null;

            for(let i in this.deptList){
                if(division.division === this.deptList[i].divisionCode){
                    for(let index in this.deptList[i].groupSectionList){
                        if(group.group === this.deptList[i].groupSectionList[index].groupCode){
                            this.sectionOption = this.deptList[i].groupSectionList[index].sectionList;
                        }
                    }
                }
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
            this.updateEmpRole(item);
        },
        //彈出角色設定視窗
        popOut(editPopOut){
            this.editPopOut = !editPopOut;
        },

        editSubmit(){
            // 驗證要設定的員工是否與選單中相符
            if(!this.checkSettingEmp()){
                MessageService.showError('驗證要設定的員工清單不符合清單資料','依角色設定員工資料');
                return;
            }
            console.log(this.select.role.setRoleCode);
            // 打後端更新員工角色
            this.updateEmpRoleByRoleCode();
        },

        //選擇新增角色
        toSelected(item,settingType){
            
            let selectIndex = 0;
            if (settingType == 'unSetting'){
                // 取出選擇要移動到設定區的那筆員工在unSettingEmpList中的位置
                selectIndex = this.unSettingEmpList.indexOf(item);   
                console.log(selectIndex);
                // 從unSettingEmpList中移除該筆員工資料
                this.unSettingEmpList.splice(selectIndex, 1);
                // 將該筆員工資料移到「settingList」中
                this.settingEmpList.push(item);
            } else {
                // 取出選擇要移動到設定區的那筆員工在settingEmpList中的位置
                selectIndex = this.settingEmpList.indexOf(item);   
                console.log(selectIndex);
                // 從settingEmpList中移除該筆員工資料
                this.settingEmpList.splice(selectIndex, 1);
                // 將該筆員工資料移到「unSettingList」中
                this.unSettingEmpList.push(item);
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
        // 角色設定視窗--全選/全取消按鈕流程
        selectAll(selectType){
            if(selectType == 'add'){
                for(let i in this.unSettingEmpList){
                    this.settingEmpList.push(this.unSettingEmpList[i]);
                }
                this.unSettingEmpList = [];
            } else {
                for(let i in this.settingEmpList){
                    this.unSettingEmpList.push(this.settingEmpList[i]);
                }
                this.settingEmpList = [];
            }
        },
        // 整理部門下拉選單
        settingOption(deptOptList){
            debugger;
           for(let i in deptOptList){
                this.divOption.push({
                    division:deptOptList[i].divisionCode,
                    divisionName:deptOptList[i].divisionName,
                })
           }

           // 若單位只有一筆資料，直接帶入組別下拉選單
           if(this.divOption.length == 1){
             this.division = this.divOption[0];
             this.select.division = this.divOption[0];
             this.chooseDivision(this.division);
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

        checkSettingEmp(){
            let allSettingMap = new Map();
            let isValid = true;

            // 先將所有可設定員工清單整理成Map
            for(let i in this.allSettingEmpList){
                allSettingMap.set(this.allSettingEmpList[i].empNo,this.allSettingEmpList[i]);
            }
            // 比對要設定的員工是否符合員工清單資料
            if(!ValidateUtil.isEmpty(this.settingEmpList)){
                for(let i in this.settingEmpList){
                    if(ValidateUtil.isEmpty(allSettingMap.get(this.settingEmpList[i].empNo))){
                        isValid = false;
                    }
                }
            }
            return isValid;
        },

        // 將選擇的員工清單重置
        resetSelect(){
            this.settingEmpList = [];
            this.unSettingEmpList = [];
            this.allSettingEmpList = [];
        },

        // 關閉視窗-將依角色設定多組員工的資料清空
        resetModel(){
            this.editPopOut = false;
            this.resetSelect();
           
            this.errMsg.role = null;
            this.errMsg.division = null;
            this.errMsg.group = null;
            
            this.select.role = null;
            this.select.division = null;
            this.select.group = null;
            this.select.section = null;
            
        },

        // 驗證查詢的條件資料
        checkSearchInfo(){
            let isValid = true;
            this.requiredArray = [];

            if(ValidateUtil.isEmpty(this.select.role)){
                this.errMsg.role = "請選擇設定角色";
                this.requiredArray.push('設定角色');
                isValid = false;
            } else {
                this.errMsg.role = null;
            }

            if(ValidateUtil.isEmpty(this.select.division)){
                this.errMsg.division = "請選擇單位";
                this.requiredArray.push('單位');
                isValid = false;
            } else {
                this.errMsg.division = null;
            }

            if(ValidateUtil.isEmpty(this.select.group)){
                this.errMsg.group = "請選擇組別";
                this.requiredArray.push('組別');
                isValid = false;
            } else {
                this.errMsg.group = null;
            }
            return isValid;
        },

        // 送出查詢
        searchSubmit(){
            // 驗證是否有選擇角色及部門
            if(!this.checkSearchInfo()){
                MessageService.showCheckInfo(this.requiredArray,null);
                return;
            }
            //通過驗證才打後端
            this.queryEmpInfoByRoleCode()
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
                division: (ValidateUtil.isEmpty(this.division)? null : this.division.division),
                group: (ValidateUtil.isEmpty(this.group)? null : this.group.group),
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
                  // 將選取資料重置
                  this.selectRole = [];
                  this.openSelectBox = null; 
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },

        // Action:修改員工角色
        updateEmpRole(item){
            AjaxService.post('/roleAuth/updateEmpRole',{
                newEmpAuthVoList: this.newAuthList,
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'修改員工角色');
                    return;
                }

                // 再重新call一次查詢員工資料清單
                this.queryEmpRoleInfo();

                    // 將選取資料重置
                this.selectRole = [];
                this.openSelectBox = null;
                item.edit = false;

                MessageService.showSuccess('修改員工角色');
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },

        // Action:依設定角色查詢可設定的員工清單
        queryEmpInfoByRoleCode(){
            AjaxService.post('/roleAuth/queryEmpInfoByRoleCode',{
                division: this.select.division.division,
                group: this.select.group.group,
                section: (ValidateUtil.isEmpty(this.select.section)? null : this.select.section.sectionCode),
                roleCode:this.select.role.setRoleCode,
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showNoticeInfo(response.restData.message);
                    return;
                }

                // 將已設定及未設定的員工清單帶入
                this.settingEmpList = [],
                this.unSettingEmpList = [],
                this.allSettingEmpList = [],
                this.settingEmpList = response.restData.settingEmpList;
                this.unSettingEmpList = response.restData.unSettingEmpList;

                // 用於後續比對資料用
                for(let i in response.restData.settingEmpList){
                    this.allSettingEmpList.push(response.restData.settingEmpList[i]);
                }
                for(let i in response.restData.unSettingEmpList){
                    this.allSettingEmpList.push(response.restData.unSettingEmpList[i]);
                }


                MessageService.showSuccess('查詢角色可設定的員工清單');
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },

        // Action:依角色設定員工角色資料
        updateEmpRoleByRoleCode(){
            AjaxService.post('/roleAuth/updateEmpRoleByRoleCode',{
                addEmpRoleList: this.settingEmpList,
                deleteEmpRoleList: this.unSettingEmpList,
                settingRoleCode: this.select.role.setRoleCode,
            },
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.restData.message,'依角色設定員工角色資料');
                    return;
                }

                MessageService.showSuccess('依角色設定員工角色資料');

                this. queryEmpRoleInfo(); // 同步更新回畫面清單
    
            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
        },




        /**
         * Ajax End
         */
    },
  }
