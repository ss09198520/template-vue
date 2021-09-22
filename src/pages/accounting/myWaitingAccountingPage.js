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
                { text: '受理號碼', value: 'acceptNumber', align: 'center' },
                { text: '受理日期', value: 'acceptDate', align: 'center' },
                { text: '結案日期', value: 'completeDate', align: 'center' },
                { text: '戶名', value: 'accntName', align: 'center' },
                { text: '受理項目', value: 'acceptItem', align: 'center' },
                { text: '計算日', value: 'calDate', align: 'center' },
                { text: '電號', value: 'electricNo', align: 'center' },
                { text: '待核算累積日數', value: 'accumulatedDate', align: 'center' },
                { text: '派工日期', value: 'dispatchDate', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'sortNo', align: 'center' },
                { text: '檢視註記', value: 'hasView', align: 'center' },
                { text: '備註', value: 'comments', align: 'center' },
                { text: '狀態操作', value: 'action', align: 'center' }
            ],
            itemList: [
                {action: true, acceptNumber: 'A00028',hasView:false,sortNo:'000700',dispatchDate:'20210910 10:00',electricNo:'91020122',accntName:'利小凡',calDate:'02',contractType:'表制',accumulatedDate:'3', acceptDate: '20210910 10:00', completeDate: '20210910 16:00',  acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00615',hasView:false,sortNo:'000701',dispatchDate:'20210910 10:00',electricNo:'91020122',accntName:'陳和千',calDate:'05',contractType:'包制',accumulatedDate:'1', acceptDate: '20210909 11:21', completeDate: '20210909 15:21',  acceptItem: 'I0510  故障換表'},
                {action: true, acceptNumber: 'A00040',hasView:false,sortNo:'000702',dispatchDate:'20210910 10:00',electricNo:'91020122',accntName:'黎維成',calDate:'10',contractType:'表制',accumulatedDate:'4', acceptDate: '20210907 15:36', completeDate: '20210908 15:06', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605',hasView:false,sortNo:'000703',dispatchDate:'20210910 10:00',electricNo:'91020122',accntName:'區立言',calDate:'16',contractType:'高壓',accumulatedDate:'3', acceptDate: '20210910 09:45', completeDate: '20210915 10:50',  acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619',hasView:false,sortNo:'000704',dispatchDate:'20210910 10:00',electricNo:'91020122',accntName:'馮文卿',calDate:'01',contractType:'表制',accumulatedDate:'2', acceptDate: '20210910 13:44', completeDate: '20210910 15:26',  acceptItem: 'I0510  故障換表'}
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
            reason: null,
            reasonOption:[
                {text:'原因由台電提供_1',value:'1'},
                {text:'原因由台電提供_2',value:'2'},
                {text:'原因由台電提供_3',value:'3'},
                {text:'原因由台電提供_4',value:'4'},
                {text:'原因由台電提供_5',value:'5'},
                {text:'原因由台電提供_6',value:'6'},
                {text:'原因由台電提供_7',value:'7'},
                {text:'原因由台電提供_8',value:'8'},
                {text:'原因由台電提供_9',value:'9'},
                {text:'原因由台電提供_10',value:'10'},
            ],
            calDate:null,
            calDateOption:[
                {text:'01',value:'1'},
                {text:'02',value:'2'},
                {text:'03',value:'3'},
                {text:'04',value:'4'},
                {text:'05',value:'5'},
                {text:'06',value:'6'},
                {text:'07',value:'7'},
                {text:'08',value:'8'},
                {text:'09',value:'9'},
                {text:'10',value:'10'},
                {text:'11',value:'11'},
                {text:'12',value:'12'},
                {text:'13',value:'13'},
                {text:'14',value:'14'},
                {text:'15',value:'15'},
                {text:'16',value:'16'},

            ],
            commentsModel:false,
        }
    },
    methods: {
        accounting(item) {
          this.selectIndex = this.itemList.indexOf(item);
          this.accountingDialog = true;
          item.hasView = true;
        },
        returnOrder(){
            this.returnReasonModel = true;
        },
        saveComments(){
            this.accountingDialog = false;
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
        },
        openComments(item){
            console.log(item);
            this.commentsModel = true;

        }
    }
}