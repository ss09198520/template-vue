import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

export default {
    name: 'ReadReport',
    props: {
    
    },
    mounted(){
      this.init();
    },
    data() {
        return {
          openStartDate: false, //是否開啟查詢調閱日期的datePicker
          openEndDate: false, //是否開啟查詢調閱日期的datePicker
          monthPicker: false,
          headers: [
            { text: '調閱月份', value: 'yearMonth', align: 'center' },
            { text: '調閱管理員簽核時間', value: 'readMgmtSignDateStr', align: 'center' },  
            { text: '核算課長簽核時間', value: 'leaderSignDateStr', align: 'center' },  
            { text: '電費經理簽核時間', value: 'managerSignDateStr', align: 'center' },          
            { text: '下載', value: 'download', align: 'center' },
            
          ],
          itemList: [],
          dataListPage: 1,
          dataListPageCount: 1,
          startDate:'',   //查詢調閱日期(起)
          endDate:'', //查詢調閱日期(迄)
          readApplyDate:{
            start: null,
            end: null,
          },
          readApplyDateErrMsg: null,
          formatArray:[],
        }
    },
    methods: {
      init(){
        this.queryReport();
      },
      queryReport(){
        AjaxService.post("/report/queryReadReport", 
        {
          readApplyStartDate: (ValidateUtil.isEmpty(this.readApplyDate.start)? null:this.readApplyDate.start),
          readApplyEndDate: (ValidateUtil.isEmpty(this.readApplyDate.end)? null:this.readApplyDate.end),
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

        AjaxService.post("/report/readSignOff", param, (response) => {
          if(response.restData.success){
            MessageService.showSuccess("簽核");
            this.queryReport();
          }else{
            MessageService.showError(response.restDate.message, "簽核");
          }
        });
      },
        // 驗證派工日期區間
        checkDate(){
          this.formatArray = [];
          let isValid = true;
          this.readApplyDate.start = null;
          this.readApplyDate.end = null;

          if(!ValidateUtil.isEmpty(this.startDate) && ValidateUtil.isEmpty(this.endDate) || 
              (ValidateUtil.isEmpty(this.startDate) && !ValidateUtil.isEmpty(this.endDate))){
            this.readApplyDateErrMsg = '日期範圍不完整'
            this.formatArray.push("退件日期");
            isValid = false;
          } else {
            this.readApplyDateErrMsg = null;
          }

          if(!ValidateUtil.isEmpty(this.startDate) && !ValidateUtil.isEmpty(this.endDate)){
              this.readApplyDate.start = this.startDate + ' 00:00:00';
              this.readApplyDate.end = this.endDate + ' 23:59:59';
              
              if(!ValidateUtil.validateDateRange(this.readApplyDate.start,this.readApplyDate.end)){
                  this.readApplyDateErrMsg = '日期範圍錯誤'
                  this.formatArray.push("退件日期");
                  isValid = false;
                  
              } else {
                  this.readApplyDateErrMsg = null;
              }
          }

          return isValid;
      },
      search(){
        // 再次驗證日期範圍格式
        if(!this.checkDate()){
          MessageService.showCheckInfo(null,this.formatArray);
          return;
        }

        // 驗證通過則後端取資料
        this.queryReport();


      },
    }
}