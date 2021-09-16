import FormPage from '@/pages/FormPage/FormPage.vue';
import MessageService from "@/assets/services/message.service";

export default {
    name: 'MyWaitingAccounting',
    components: {
      FormPage
    },
    props: {
    
    },
    data() {
        return {
            waitingCount: 5,
            headers: [
                { text: '受理編號', value: 'acceptNumber', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'completeDate', align: 'center' },
                { text: '登記單種類', value: 'category', align: 'center' },  
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            itemList: [
                {action: true, acceptNumber: 'A00028', acceptDate: '20210910 10:00', completeDate: '20210910 16:00', category: 'APR0370', acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00615', acceptDate: '20210909 11:21', completeDate: '20210909 15:21', category: 'APR0200', acceptItem: 'I0510  故障換表'},
                {action: true, acceptNumber: 'A00040', acceptDate: '20210907 15:36', completeDate: '20210908 15:06', category: 'APR0200', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605', acceptDate: '20210910 09:45', completeDate: '20210915 10:50', category: 'APR0160', acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619', acceptDate: '20210910 13:44', completeDate: '20210910 15:26', category: 'APR0200', acceptItem: 'I0510  故障換表'}
            ],
            dataListPage: 1,
            dataListPageCount: 1,
            accountingDialog: false,
            returnReasonModel: false,
            selectIndex: null,
            hasShowList:false,
            department:null,
            departmentOption:[
                {text:'核算課',value:'1'},
                {text:'大里服務中心',value:'2'},
                {text:'東山服務所',value:'3'},
            ],
        }
    },
    methods: {
        accounting(item) {
          this.selectIndex = this.itemList.indexOf(item);
          this.accountingDialog = true;
        },
        retrunOrder(){
            this.returnReasonModel = true;
        },
        returnSubmit(){
           if (this.selectIndex > -1) {
                this.itemList.splice(this.selectIndex, 1);
              }
            this.returnReasonModel = false;
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
            MessageService.showSuccess("退件成功✓");
        },
        checkSubmit(){
           if (this.selectIndex > -1) {
                this.itemList.splice(this.selectIndex, 1);
              }
            MessageService.showSuccess("核算成功✓");
            this.accountingDialog = false;
            this.waitingCount = this.waitingCount -1;
        }
    }
}