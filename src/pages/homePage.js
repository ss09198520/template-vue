export default {
    data(){
        return {
            //角色為受理人員
            general: true,
            //角色為核算員
            accounting: false,
            //角色為簽核人員
            signOff: false,
        }
    },
    methods: {
        member(character){
            if(character == '1'){
                this.general = true;
                this.accounting = false;
                this.signOff = false;
            }else if(character == '2'){
                this.general = false;
                this.accounting = true;
                this.signOff = false;
            }else if(character == '3'){
                this.general = false;
                this.accounting = false;
                this.signOff = true;
            }
        },
    },
}