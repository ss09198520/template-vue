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
            User: 'auditer',
            waitingCount: 5,
            headers: [
                { text: '受理號碼', value: 'acceptNumber', align: 'center',width:'10%' },
                { text: '受理日期', value: 'acceptDate', align: 'center',width:'10%'  },
                { text: '結案日期', value: 'completeDate', align: 'center',width:'10%'  },
                { text: '戶名', value: 'accntName', align: 'center',sortable:false,width:'5%'  },
                { text: '受理項目', value: 'acceptItem', align: 'center',width:'10%'  },
                { text: '計算日', value: 'calDate', align: 'center',width:'5%' },
                { text: '電號', value: 'electricNo', align: 'center',width:'5%'  },
                { text: '待核算累積日數', value: 'accumulatedDate', align: 'center',width:'5%'  },
                { text: '派工日期', value: 'dispatchDate', align: 'center',width:'10%'  },
                { text: '契約種類', value: 'contractType', align: 'center',width:'10%' },
                { text: '整理號碼', value: 'sortNo', align: 'center',width:'10%' },
                { text: '檢視註記', value: 'hasView', align: 'center',width:'5%'},
                { text: '代理件', value: 'agentCase', align: 'center',width:'5%' },
                { text: '備註', value: 'comments', align: 'center',sortable:false,width:'2%' },
                { text: '狀態操作', value: 'action', align: 'center',sortable:false,width:'2%' }
            ],
            itemList: [
                {action: true, acceptNumber: 'A00028',agentCase:false,hasView:false,sortNo:'000700',dispatchDate:'2021-09-10 10:00',electricNo:'91020122',accntName:'利小凡',calDate:'02',contractType:'表制',accumulatedDate:'3', acceptDate: '2021-09-10 10:00', completeDate: '2021-09-10 16:00',  acceptItem: 'QA210  軍眷用電申請優待'},
                {action: true, acceptNumber: 'A00615',agentCase:true,hasView:false,sortNo:'000701',dispatchDate:'2021-09-10 10:00',electricNo:'91020122',accntName:'陳和千',calDate:'05',contractType:'包制',accumulatedDate:'1', acceptDate: '2021-09-09 11:21', completeDate: '2021-09-09 15:21',  acceptItem: 'I0510  故障換表'},
                {action: true, acceptNumber: 'A00040',agentCase:false,hasView:false,sortNo:'000702',dispatchDate:'2021-09-10 10:00',electricNo:'91020122',accntName:'黎維成',calDate:'10',contractType:'表制',accumulatedDate:'4', acceptDate: '2021-09-07 15:36', completeDate: '2021-09-08 15:06', acceptItem: 'I0520  增加電表'},
                {action: true, acceptNumber: 'A00605',agentCase:true,hasView:false,sortNo:'000703',dispatchDate:'2021-09-10 10:00',electricNo:'91020122',accntName:'區立言',calDate:'16',contractType:'高壓',accumulatedDate:'3', acceptDate: '2021-09-10 09:45', completeDate: '2021-09-15 10:50',  acceptItem: 'F3030  表燈非時間電價停用廢止'},
                {action: true, acceptNumber: 'A00619',agentCase:false,hasView:false,sortNo:'000704',dispatchDate:'2021-09-10 10:00',electricNo:'91020122',accntName:'馮文卿',calDate:'01',contractType:'表制',accumulatedDate:'2', acceptDate: '2021-09-10 13:44', completeDate: '2021-09-10 15:26',  acceptItem: 'I0510  故障換表'}
            ],
            dataListPage: 1,
            dataListPageCount: 1,
            accountingDialog: false,
            checkingDialog: false,
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
            agentCaseOption:[
                {text:'顯示全部',value:'1'},
                {text:'顯示代理件',value:'2'},
                {text:'不顯示代理件',value:'3'},
            ],

            commentsModel:false,
            contractTypeOption:[
                {text:'表制', value:'1'},
                {text:'高壓', value:'2'},
                {text:'包制', value:'3'},
            ],
            contractType:null,
            
             //日曆起(受理日期)
             menu1: false,
             dispatchDate:null,
        }
    },
    methods: {
        accounting(item) {
          this.selectIndex = this.itemList.indexOf(item);
          this.accountingDialog = true;
          item.hasView = true;
        },
        checking(item){
            this.selectIndex = this.itemList.indexOf(item);
            this.checkingDialog = true;
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