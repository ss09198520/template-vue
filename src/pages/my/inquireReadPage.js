import MessageService from "@/assets/services/message.service";
import ValidateUtil from "@/assets/services/validateUtil";

export default{
    data(){
        return{
            //點選查詢才顯示下方清單
            display: false,
            //預設當前頁數
            readFormListPage: 1,
            //預設總頁數
            readFormListPageCount: 0,
            //操作者角色
            User: 'guest',
            //視窗彈出與否
            popOut: false,
            //選擇的調閱對象
            readAudience: null,
            //調閱對象清單-先放假資料
            readAudienceOpt:[
                // { empNo: '', empName: '自己', empDivision:'', empGroup:'',empSection:'',character:'',settingStyle:'',memo:'',edit:false, isSelected:false},
                // { empNo: '1050330-001', empName: '梁朝偉', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                // { empNo: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                // { empNo: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                // { empNo: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                // { empNo: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                // { empNo: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                
                // { empNo: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                // { empNo: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                
                { empNo: '', empName: '自己',},
                { empNo: '1050330-001', empName: '梁朝偉'},
                { empNo: '1050330-002', empName: '王曉花'},
                { empNo: '1050330-003', empName: '林美美'},
                { empNo: '1050331-001', empName: '蔡政揚'},
                { empNo: '1050331-002', empName: '張芊芊'},
                { empNo: '1050331-003', empName: '江舒語'},                
                { empNo: '1050320-001', empName: '陳大天'},
                { empNo: '1050320-002', empName: '何欣惠'},
            
            ],
            //調閱原因清單-先放假資料
            readReasonOpt:[
                {readReason:'確認換表指數及內容', reasonCode:'REASON01'},
                {readReason:'確認設備容量', readReasonCode:'readReason02'},
                {readReason:'確認是否須拆除外線', reasonCode:'REASON03'},
                {readReason:'確認用電地址', reasonCode:'REASON04'},
                {readReason:'確認中抄指數', reasonCode:'REASON05'},
                {readReason:'前用戶異議單獨過戶', reasonCode:'REASON06'},
                {readReason:'電表報損確認賠償費用', reasonCode:'REASON07'},
                {readReason:'新增設案件抽查', reasonCode:'REASON08'},
                {readReason:'現場用電用途查核', reasonCode:'REASON09'},
                {readReason:'完工結算', reasonCode:'REASON10'},
            ],
            readFormHeaders: [
                { text: '受理號碼', value: 'acceptNum', align: 'center' },
                { text: '戶名', value: 'custName', align: 'center' },
                { text: '電號', value: 'electricNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'archieveNum', align: 'center' },
                { text: '申請日期', value: 'acceptDate', align: 'center' },
                { text: '歸檔日期', value: 'achieveDate', align: 'center' },            
                { text: '受理項目', value: 'acceptItem', align: 'center' },                
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            readFormList: [                
                { mani: true, seq:1 ,acceptNum: 'A00024',custName:'吳小花',contractType:'高壓',archieveNum:'000300', electricNum: '7140000123', acceptDate:'2021-09-10 10:00', achieveDate:'2021-09-15 10:00',  acceptItem:'QA210軍眷用電申請優待'},
                { mani: true, seq:2 ,acceptNum: 'A00615',custName:'虞小寒',contractType:'包制',archieveNum:'000301', electricNum: '7140000456', acceptDate:'2021-09-09 11:21', achieveDate:'2021-09-15 11:21',  acceptItem:'I0510故障換表'},
                { mani: true, seq:3 ,acceptNum: 'A00040',custName:'孔維祥',contractType:'表制',archieveNum:'000302', electricNum: '7140000789', acceptDate:'2021-09-07 15:36', achieveDate:'2021-09-15 15:36',  acceptItem:'I0520增加電表'},
                { mani: true, seq:4 ,acceptNum: 'A00605',custName:'文易席',contractType:'高壓',archieveNum:'000303', electricNum: '7140000888', acceptDate:'2021-09-10 09:45', achieveDate:'2021-09-15 09:45',  acceptItem:'F3030表燈非時間電價停用廢止'},
                { mani: true, seq:5 ,acceptNum: 'A00619',custName:'許慧貞',contractType:'包制',archieveNum:'000304', electricNum: '7140000999', acceptDate:'2021-09-10 13:44', achieveDate:'2021-09-15 13:44',  acceptItem:'I0510故障換表'},
            ],
            //日曆起(受理日期)
            menu1: false,
            date1: '',
            //日曆迄(受理日期)
            menu2: false,
            date2: '',
            //日曆起(歸檔日期)
            menu3: false,
            date3: '',
            //日曆迄(歸檔日期)
            menu4: false,
            date4: '',
            contractType:null,
            contractTypeOption:[
                {text:'表制', value:'1'},
                {text:'高壓', value:'2'},
                {text:'包制', value:'3'},
            ],
            otherReason: null, //其他原因
            selectForm:{}, // 選擇要調閱的案件資料
            readNum: '71023133', //調閱編號
            readDate:this.formatDateTime(new Date()),
            readReason: null,
            memo:null,
            formSeq: null,
            errMsg:{
                readAudience: null,
                readReason:null,
                memo:null,
            }
        }
    },
    methods:{
        search(item){
            // 將輸入框資料清空
            this.resetVal();

            // 判斷是否為TPESUser
            if(this.User === 'TPESUser'){
                this.selectForm = item;
            }
            // 取出表單流水號
            this.formSeq = item.seq;
            // 打開視窗
            this.popOut = true;
        },
        submit(){
            if(this.checkVal()){
                MessageService.showSuccess('調閱申請');
                this.popOut = false;
            }
        },
        resetVal(){
            this.otherReason = null; 
            this.readReason = null;
            this.memo = null;
            this.setMember = null;
            this.setReason = null;
        },
        checkVal(){
            let requiredArray = [];
            let formatArray = [];
            let hasCheck = true;
            // 若為TPES使用者申請調閱
            if(this.User !== 'TPESUser'){
                if(ValidateUtil.isEmpty(this.readAudience)){
                    requiredArray.push('調閱對象');
                    hasCheck = false;
                    this.errMsg.readAudience = "請選擇調閱對象";
                }
                if(ValidateUtil.isEmpty(this.readReason)){
                    requiredArray.push('調閱事由');
                    hasCheck = false;
                    this.errMsg.readReason = "請選擇調閱事由";
                }
                if(!ValidateUtil.isEmpty(this.otherReason) && this.otherReason.length > 50){
                    formatArray.push('其他事由');
                    hasCheck = false;
                }
            // 若為核算課長/調閱管理員申請調閱
            } else {
                if(ValidateUtil.isEmpty(this.readReason)){
                    requiredArray.push('調閱事由');
                    hasCheck = false;
                } else if(this.readReason.length > 50){
                    formatArray.push('調閱事由');
                    hasCheck = false;
                }
                if(!ValidateUtil.isEmpty(this.memo) && this.memo.length > 50){
                    formatArray.push('備註');
                    hasCheck = false;
                    this.errMsg.readReason = false;
                }
            }
            if(!hasCheck){
                MessageService.showCheckInfo(requiredArray,formatArray);
            }

            return hasCheck;
        },

        /**
         * Ajax start 
         * 
         **/


        /**
         * Ajax end 
         * 
         **/



        /**
         * UI start 
         * 
         * */
        formatDateTime(date) {
            var moment = require('moment');
            moment().format();
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        /**

        * UI end 
         * 
         * */
        
    }
    
}