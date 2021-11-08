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
        openList: [0,1,2,3,4], // 存放縮合項目的index
        role: null, // 選擇的角色
        description: null, //說明 
        // 角色清單
        authRoleList:[],
        oriAuthRoleList:[],//備份角色設定資料
        authorityList:[],
        //查詢角色權限結果
        rolePrivilegeList : [

        ],

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

      // turnAll(status,item){
      //     let i = 0;
      //   if(status == 'on'){
      //      for(i in item.subAuthList){
      //       item.subAuthList[i].hasAuth = true;
      //      }
      //      item.hasAllAuth = true;
      //   } else{
      //       for(i in item.subAuthList){
      //           item.subAuthList[i].hasAuth = false;
      //          }
      //          item.hasAllAuth = false;
      //   }
      // },

      chooseDivision(){
        // 將角色設定備註取出
        this.description = this.role.description;      

        this.authorityList=[
          { text: '我的工作區',
            hasAuth:false,            
            subAuthList:[ 
                { text: '我的表單',value:'1',hasAuth:true},
                { text: '我的退件區-無紙化案件',value:'2',hasAuth:false},
                { text: '我的退件區-多媒體',value:'3',hasAuth:false}, 
                { text: '調閱申請',value:'4',hasAuth:false},
                { text: '我的調閱區',value:'5',hasAuth:false},
                { text: '請假清單',value:'6',hasAuth:true}, 
                { text: '請假申請',value:'7',hasAuth:true}, 
            ]
          },

          { text: '簽核區',
            hasAuth:false,            
            subAuthList:[ 
                  { text: '調閱簽核',value:'12',hasAuth:false,type:1},
                  { text: '專用章簽核',value:'14',hasAuth:false,type:1},
                  { text: '多媒體-跑馬燈',value:'14',hasAuth:false,type:2},
                  { text: '多媒體-節目單',value:'14',hasAuth:false,type:2},
                  { text: '多媒體-滿意度問卷',value:'14',hasAuth:false,type:2}, 
            ]},

            { text: '核算區',
            hasAuth:false,            
            subAuthList:[ 
                { text: '核算派工設定',value:'1',hasAuth:true},
                { text: '待核算',value:'2',hasAuth:false},
                { text: '待歸檔',value:'3',hasAuth:false}, 
                { text: '未分派區',value:'4',hasAuth:false},
            ]
          },

            { text: '多媒體區',
            hasAuth:false,            
            subAuthList:[ 
                  { text: '跑馬燈管理-新增/刪除/修改',value:'14',hasAuth:false}, 
                  { text: '跑馬燈管理-查詢',value:'',hasAuth:true}, 
                  { text: '滿意度調查-問卷設計-新增/刪除/修改',value:'',hasAuth:true},
                  { text: '滿意度調查-問卷設計-查詢',value:'',hasAuth:true},
                  { text: '素材管理-新增/刪除/修改',value:'14',hasAuth:false}, 
                  { text: '素材管理-查詢',value:'',hasAuth:true},
                  { text: '節目單管理-新增/刪除/修改',value:'14',hasAuth:false}, 
                  { text: '節目單管理-查詢',value:'',hasAuth:true}, 
            ]},
            { text: '報表區',
            hasAuth:false,            
            subAuthList:[ 
                  { text: '退件報表',value:'18',hasAuth:true},  
                  { text: '調閱清單',value:'19',hasAuth:true}, 
                  { text: '滿意度調查-raw data下查詢條件',value:'',hasAuth:true}, 
                  { text: '滿意度調查-摘要區處報表(月)',value:'',hasAuth:true}, 
                  { text: '滿意度調查-摘要個人報表(週)',value:'',hasAuth:true}, 
            ]},
            { text: '後台管理',
            hasAuth:false,
            subAuthList:[ 
                  { text: '權限設定',value:'1',hasAuth:true,},
                  { text: '角色設定',value:'2',hasAuth:true,},  
                  { text: '後台管理',value:'3',hasAuth:true},                  
            ]},
        ];

        

        let index = 0;
          let i = 0;
          for(index in this.authorityList){
            for(i in this.authorityList[index].subAuthList){
                if(this.authorityList[index].subAuthList[i].hasAuth){
                    this.authorityList[index].hasAuth = true;
                    break;
                }
            }
        }
          index = 0;
          for(index in this.authorityList){
              if(this.authorityList[index].hasAuth){
                  this.openList.push(parseInt(index));
              }
          }    
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

        },
        // eslint-disable-next-line no-unused-vars
        (response) => {                
            MessageService.showSystemError();
        });
      },

      // 儲存權限設定Action
      saveAuth(){
        MessageService.showSuccess("儲存成功✓");
      },

      /**Ajax end */
     
    },
  };