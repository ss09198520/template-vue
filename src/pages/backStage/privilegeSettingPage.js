import MessageService from "@/assets/services/message.service";


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
        comments: null, //說明 
        // 角色清單
        rolesOption:[
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
            { text: '多媒體設定-業務區', value: 'AUTH12'},
            { text: '多媒體設定-區處', value: 'AUTH13'},
            { text: '核算員', value: 'AUTH15'},
            { text: '多媒體滿意度報表調開-業務處', value: 'AUTH16'},

        ],
        authorityList:[],

      };
    },
    methods: {
      // 載入頁面初始化
      init() {
          
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
        this.authorityList=[
          { text: '我的工作區',
            hasAuth:false,            
            subAuthList:[ 
                { text: '我的表單',value:'1',hasAuth:true},
                { text: '我的退件區',value:'2',hasAuth:false}, 
                { text: '調閱申請',value:'3',hasAuth:false},
                { text: '我的調閱區',value:'4',hasAuth:false},
                { text: '請假清單',value:'5',hasAuth:true}, 
                { text: '請假申請',value:'6',hasAuth:true}, 
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

      // 儲存權限設定Action
      saveAuth(){
        MessageService.showSuccess("儲存成功✓");
      },

      /**Ajax end */
     
    },
  };