import MessageService from "@/assets/services/message.service";
import AjaxService from "@/assets/services/ajax.service";

export default {
    components: {
  
    },   
    beforeMount() {
        this.init();
    },
    data() {
      return {
        openList: [0,1,2,3,4,5], // 存放縮合項目的index
        role: null, // 選擇的角色
        description: null, //說明 
        roleCode: null,
        // 角色清單
        authRoleList:[],
        oriAuthRoleList:[],//備份角色設定資料
        //查詢角色權限結果
        rolePrivilegeList : [],

      };
    },
    methods: {
      // 載入頁面初始化
      init() {
          this.queryAllRoleAuth();
      },

      // 判斷是否展開權限設定資料
      checkAuthList(){
          
      },

      chooseDivision(){
        // 將角色設定備註取出
        this.roleCode = this.role.roleCode;
        
        this.queryRolePrivilegeByRoleCode();
        this.description = this.role.description; 

     
      },

      turn(item){
        let i = 0;
        if(!item.hasAuth){
          for(i in item.subAuthList){
            item.subAuthList[i].hasAuth = false;
           }
        } else {
          for(i in item.subAuthList){
            item.subAuthList[i].hasAuth = true;
           }
        }
      },

      turnSubAuth(auth,subAuth){
        if(!auth.hasAuth){
          if(subAuth.hasAuth){
            auth.hasAuth = true;
          } 
        }
        let i = 0;
        if(!auth.hasAuth){
          for(i in auth.subAuthList){
            if(auth.subAuthList[i].hasAuth){
              auth.hasAuth = true;
              break;
            } else {
              auth.hasAuth = false;
            }
          }
        }
      },

      // 判斷選到的角色代碼是否為原本選單有的項目
      checkRole(authRolePrivilegeMapList){
        let hasCheck = false;
        
        for(let i in this.oriAuthRoleList){
            if(this.oriAuthRoleList[i].roleCode === authRolePrivilegeMapList[0].roleCode){
              hasCheck = true;
              break;
            }
        }
        return hasCheck;

      },


      /**Ajax start */

      // Action: 查詢全部角色設定資料
      queryAllRoleAuth(){
        AjaxService.post('/roleAuth/queryAllRoleAuth',{},
        (response) => {
            // 驗證是否成功
            if (!response.restData.success) {              
                MessageService.showError(response.restData.returnMessage,'查詢全部角色設定資料');
                return;
            }
  
            // 將取得的資料放進前端參數中
            this.authRoleList = response.restData.authRoleList;
            this.oriAuthRoleList = JSON.parse(JSON.stringify(response.restData.authRoleList));

        },
        // eslint-disable-next-line no-unused-vars
        (response) => {                
            MessageService.showSystemError();
        });
      },

      // Action: 依角色代碼查詢角色權限資料
      queryRolePrivilegeByRoleCode(){
        AjaxService.post('/roleAuth/queryRolePrivilegeByRoleCode',{
          roleCode :  this.roleCode,
        },
        (response) => {
            // 驗證是否成功
            if (!response.restData.success) {              
                MessageService.showError(response.restData.returnMessage,'依角色代碼查詢角色權限資料');
                return;
            }
  
            // 將取得的資料放進前端參數中
            this.rolePrivilegeList = response.restData.rolePrivilegeList;

        },
        // eslint-disable-next-line no-unused-vars
        (response) => {                
            MessageService.showSystemError();
        });
      },

      // 整理權限資料
      setAuthInfo(){
        let authRolePrivilegeMapList = [];
        for(let i in this.rolePrivilegeList){
          for(let index in this.rolePrivilegeList[i].authPrivilegeList){
            if(this.rolePrivilegeList[i].authPrivilegeList[index].hasAuth){
              authRolePrivilegeMapList.push({
                roleCode: this.role.roleCode,
                roleName: this.role.roleName,
                privilegeCode: this.rolePrivilegeList[i].authPrivilegeList[index].privilegeCode,
                privilegeName: this.rolePrivilegeList[i].authPrivilegeList[index].privilegeName,
              })
            }
          }
        }

        // 驗證選擇到的角色參數是否被修改過?
        if(!this.checkRole(authRolePrivilegeMapList)){
            MessageService.showError('不合法','選擇的角色')
            return;
        }
        // 打後端更新角色權限
        this.updateRolePrivilege(authRolePrivilegeMapList);
        
      },

      // Action: 修改角色權限
      updateRolePrivilege(authRolePrivilegeMapList){
        AjaxService.post('/roleAuth/updateRolePrivilege',{
          authRolePrivilegeMapList: authRolePrivilegeMapList,
          description: this.description,
          roleCode: this.roleCode
        },
        (response) => {
            // 驗證是否成功
            if (!response.restData.success) {              
                MessageService.showError(response.restData.returnMessage,'修改角色權限');
                return;
            }
            // 重新撈一次全部的角色設定，才能將更新的角色說明帶出
            this.queryAllRoleAuth();
            MessageService.showSuccess('修改角色權限');

        },
        // eslint-disable-next-line no-unused-vars
        (response) => {                
            MessageService.showSystemError();
        });
      },

      /**Ajax end */
     
    },
  };