import MessageService from "@/assets/services/message.service";

export default{
    data(){
        return{
            //點選查詢才顯示下方清單
            display: false,
            //預設當前頁數
            applyListPage: 1,
            //預設總頁數
            applyListPageCount: 0,
            //操作者角色
            User: 'guest',
            //視窗彈出與否
            popOut: false,
            //選擇的調閱對象
            setMember: '',
            //調閱對象清單
            memberOption:[
                { empId: '', empName: '自己', empDivision:'', empGroup:'',empSection:'',character:'',settingStyle:'',memo:'',edit:false, isSelected:false},
                { empId: '1050330-001', empName: '梁朝偉', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                { empId: '1050330-002', empName: '王曉花', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                { empId: '1050330-003', empName: '林美美', empDivision:'台中區處', empGroup:'業務組',empSection:'東山服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                { empId: '1050331-001', empName: '蔡政揚', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門主管',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                { empId: '1050331-002', empName: '張芊芊', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                { empId: '1050331-003', empName: '江舒語', empDivision:'台中區處', empGroup:'業務組',empSection:'西屯服務所',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
                
                { empId: '1050320-001', empName: '陳大天', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門主管,服務中心主辦',settingStyle:'自動抓取',memo:'',edit:false, isSelected:false},
                { empId: '1050320-002', empName: '何欣惠', empDivision:'台中區處', empGroup:'業務組',empSection:'服務中心',character:'受理部門',settingStyle:'自動抓取',memo:'',edit:false, isSelected:true},
            ],
            setReason: '',
            reasonOption:[
                {text:'確認換表指數及內容', value:'1'},
                {text:'確認設備容量', value:'2'},
                {text:'確認是否須拆除外線', value:'3'},
                {text:'確認用電地址', value:'4'},
                {text:'確認中抄指數', value:'5'},
                {text:'前用戶異議單獨過戶', value:'6'},
                {text:'電表報損確認賠償費用', value:'7'},
                {text:'新增設案件抽查', value:'8'},
                {text:'現場用電用途查核', value:'9'},
                {text:'完工結算', value:'10'},
            ],
            empListHeaders: [
                { text: '受理號碼', value: 'orderId', align: 'center' },
                { text: '戶名', value: 'accntName', align: 'center' },
                { text: '電號', value: 'electNum', align: 'center' },
                { text: '契約種類', value: 'contractType', align: 'center' },
                { text: '整理號碼', value: 'sortNo', align: 'center' },
                { text: '申請日期', value: 'orderDate', align: 'center' },
                { text: '歸檔日期', value: 'achieveDate', align: 'center' },            
                { text: '受理項目', value: 'orderItems', align: 'center' },                
                { text: '狀態操作', value: 'mani', align: 'center' }
            ],
            empMockList: [                
                { mani: true, orderId: 'A00024',accntName:'吳小花',contractType:'高壓',sortNo:'000300', electNum: '7140000123', orderDate:'20210910 10:00', achieveDate:'20210915 10:00',  orderItems:'QA210軍眷用電申請優待'},
                { mani: true, orderId: 'A00615',accntName:'虞小寒',contractType:'包制',sortNo:'000301', electNum: '7140000456', orderDate:'20210909 11:21', achieveDate:'20210915 11:21',  orderItems:'I0510故障換表'},
                { mani: true, orderId: 'A00040',accntName:'孔維祥',contractType:'表制',sortNo:'000302', electNum: '7140000789', orderDate:'20210907 15:36', achieveDate:'20210915 15:36',  orderItems:'I0520增加電表'},
                { mani: true, orderId: 'A00605',accntName:'文易席',contractType:'高壓',sortNo:'000303', electNum: '7140000888', orderDate:'20210910 09:45', achieveDate:'20210915 09:45',  orderItems:'F3030表燈非時間電價停用廢止'},
                { mani: true, orderId: 'A00619',accntName:'許慧貞',contractType:'包制',sortNo:'000304', electNum: '7140000999', orderDate:'20210910 13:44', achieveDate:'20210915 13:44',  orderItems:'I0510故障換表'},
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
            ]
        }
    },
    methods:{
        search(item){
            this.popOut = true;
            console.log(item);            
        },
        submit(){
            MessageService.showSuccess("調閱成功✓");  
            this.popOut = false;
        }
    }
    
}