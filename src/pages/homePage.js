import AjaxService from "@/assets/services/ajax.service";
import ValidateUtil from "@/assets/services/validateUtil";
import MessageService from "@/assets/services/message.service";

export default {
    beforeMount() { // 在這裡做初始化, 勿刪
        this.init();
    },
    data(){
        return {
            //角色為受理人員
            general: true,
            //角色為核算員
            accounting: false,
            //角色為簽核人員
            signOff: false,
            roleList : [],
            numberOf:{},
            showCounts:{
                myForm: false,
                myReturnForm: false,
                myReturnMedia: false,
                myRead:false,
                myAccounting: false,
                mySignOffSeal: false,
                mySignOffReadApply: false,
                mySignOffReadList:false,
                mySignOffReturnReport: false,
                mySignOffMedia: false,
            }
        }
    },
    methods: {
        init(){            
            this.queryFrontPageInit();
        },
        /**
         * Ajax Start
         * 
         */
        // Action:查詢首頁初始化
         queryFrontPageInit(){
            AjaxService.post('/frontPage/queryFrontPageInit',{},
            (response) => {
                // 驗證是否成功
                if (!response.restData.success) {              
                    MessageService.showError(response.resultMessage.returnMessage,'查詢首頁初始化');
                    return;
                }

                // 將取得的資料放進前端參數中
                this.roleList = response.restData.authEmpRoleMapVoList;
                this.numberOf = response.restData.numberOfVo;

                // 驗證權限開啟對應的區塊
                this.checkAuth(this.roleList);

            },
            // eslint-disable-next-line no-unused-vars
            (response) => {                
                MessageService.showSystemError();
            });
         },

         /**
         * Ajax End
         * 
         */

         /**
          * 
          * 資料整理 Start
          * 
          */
          checkAuth(roleList){
            for(let index in roleList){
                // 判斷我的表單區
                if(roleList[index].roleCode === 'AUTH02'){
                    this.showCounts.myForm = true;
                }
                // 判斷我的退件區-案件
                if(roleList[index].roleCode === 'AUTH07' || roleList[index].roleCode === 'AUTH15'){
                    this.showCounts.myReturnForm = true;
                }
                // 判斷我的退件區-多媒體
                if(roleList[index].roleCode === 'AUTH12' || roleList[index].roleCode === 'AUTH13'){
                    this.showCounts.myReturnMedia = true;
                }
                // 判斷我的調閱區
                if(roleList[index].roleCode === 'AUTH02' || roleList[index].roleCode === 'AUTH06'
                        || roleList[index].roleCode === 'AUTH07' || roleList[index].roleCode === 'AUTH15'){
                    
                    this.showCounts.myRead = true;
                } 
                // 判斷我的核算區
                if(roleList[index].roleCode === 'AUTH07' || roleList[index].roleCode === 'AUTH15'){            
                    this.showCounts.myAccounting = true;
                } 
                // 判斷我的簽核區-專用章待簽核
                if(roleList[index].roleCode === 'AUTH04' || roleList[index].roleCode === 'AUTH07'){            
                    this.showCounts.mySignOffSeal = true;
                }
                // 判斷我的簽核區-調閱申請待簽核
                if(roleList[index].roleCode === 'AUTH04' || roleList[index].roleCode === 'AUTH07'){            
                    this.showCounts.mySignOffReadApply = true;
                }
                // 判斷我的簽核區-退件報表待簽核
                if(roleList[index].roleCode === 'AUTH01' || roleList[index].roleCode === 'AUTH07'){            
                    this.showCounts.mySignOffReturnReport = true;
                }
                // 判斷我的簽核區-調閱清單待簽核
                if(roleList[index].roleCode === 'AUTH06' || roleList[index].roleCode === 'AUTH07'  || roleList[index].roleCode === 'AUTH08'){            
                    this.showCounts.mySignOffReadList = true;
                } 
                // 判斷我的簽核區-多媒體待簽核
                if(roleList[index].roleCode === 'AUTH05' || roleList[index].roleCode === 'AUTH09' || roleList[index].roleCode === 'AUTH10' || roleList[index].roleCode === 'AUTH11'){
                    this.showCounts.mySignOffMedia = true;
                }
            }
          },



          /**
          * 
          * 資料整理 End
          * 
          */
    },
}