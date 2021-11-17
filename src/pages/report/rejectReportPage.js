import AjaxService from "@/assets/services/ajax.service";
import MessageService from "@/assets/services/message.service";

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
    }),
    methods: {
        init(){
            this.queryReport();
        },
        queryReport(){
            AjaxService.post("/report/queryRejectReport", {}, (response) => {
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
          }
    }
}