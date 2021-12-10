import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

export default {
    name: 'RejectReport',
    props: {
    
    },
    mounted() {
        this.init();
    },
    data: () => ({        
        openStartDate: false, //是否開啟查詢退件日期的datePicker
        openEndDate: false, //是否開啟查詢退件日期的datePicker
        headers: [
            { text: '退件日期', value: 'rejectDate', align: 'center' },
            { text: '核算部門主辦簽核時間', value: 'salesPlannerSignDateStr', align: 'center' },
            { text: '核算課長簽核時間', value: 'leaderSignDateStr', align: 'center' },         
            { text: '下載', value: 'download', align: 'center' },            
        ],
        itemList: [],
        dataListPage: 1,
        dataListPageCount: 1,
        startDate:'',   //查詢退件日期(起)
        endDate:'', //查詢退件日期(迄)
        returnDateErrMsg: null,
        returnDate:{
          start:null,
          end: null,
        },
        formatArray:[],
    }),
    methods: {
        init(){
            this.queryReport();
        },
        queryReport(){
            AjaxService.post("/report/queryRejectReport", 
            {
              rejectStartDate: ValidateUtil.isEmpty(this.returnDate.start)? null :this.returnDate.start,
              rejectEndDate: ValidateUtil.isEmpty(this.returnDate.end)? null :this.returnDate.end,
            }, 
            (response) => {
              if(response.restData.success){
                this.itemList = response.restData.reportList;
              }else{
                MessageService.showError(response.restData.message, "取得報表列表");
              }
            });
        },
        
        download(fileNo){
            let param = {
                fileNo: fileNo
            };

            AjaxService.postFile("/report/downloadReport", param, 
                (response) => {
                    if(response.restData.success){
                        MessageService.showSuccess("下載");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        signOff(fileNo, roleCode){
            let param = {
              fileNo: fileNo,
              roleCode: roleCode
            };
    
            AjaxService.post("/report/rejectSignOff", param, (response) => {
              if(response.restData.success){
                MessageService.showSuccess("簽核");
                this.queryReport();
              }else{
                MessageService.showError(response.restDate.message, "簽核");
              }
            });
          },
        
        // 依條件查詢退件報表
         search(){
            if(!this.checkDate()){
              MessageService.showCheckInfo(null,this.formatArray);
              return;
            }

            // 通過驗證，打後端撈資料
            this.queryReport();
          },

          // 驗證派工日期區間
        checkDate(){
          this.formatArray = [];
          let isValid = true;
          this.returnDate.start = null;
          this.returnDate.end = null;

          if(!ValidateUtil.isEmpty(this.startDate) && ValidateUtil.isEmpty(this.endDate) || 
              (ValidateUtil.isEmpty(this.startDate) && !ValidateUtil.isEmpty(this.endDate))){
            this.returnDateErrMsg = '日期範圍不完整'
            this.formatArray.push("退件日期");
            isValid = false;
          } else {
            this.returnDateErrMsg = null;
          }

          if(!ValidateUtil.isEmpty(this.startDate) && !ValidateUtil.isEmpty(this.endDate)){
              this.returnDate.start = this.startDate + ' 00:00:00';
              this.returnDate.end = this.endDate + ' 23:59:59';
              
              if(!ValidateUtil.validateDateRange(this.returnDate.start,this.returnDate.end)){
                  this.returnDateErrMsg = '日期範圍錯誤'
                  this.formatArray.push("退件日期");
                  isValid = false;
                  
              } else {
                  this.returnDateErrMsg = null;
              }
          }

          return isValid;
      },
    }
}