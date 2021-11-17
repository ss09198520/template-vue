import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";

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
        }
    },
    methods: {
      init(){
        this.queryReport();
      },
      queryReport(){
        AjaxService.post("/report/queryReadReport", {}, (response) => {
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
      }
    }
}