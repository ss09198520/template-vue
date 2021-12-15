import ValidateUtil from './validateUtil';

/*
common.service
共用方法
*/
const CommonService = {
    getParamFromURL(keyName){
        let targetUrl = ValidateUtil.isEmpty(location.search)?location.search:location.href;
        let params = targetUrl.split('?')[1];//AAAA=11111&BBBB=22222
        if(params!=null){
            let paramsArray = params.split('&');
            for(var i=0; i<paramsArray.length; i++){
                let paramArray = paramsArray[i].split('=');
                let key = paramArray[0];
                let value = paramArray[1];
                if(key == keyName){
                    return value;
                }
            }
        }
        return "";
    },
    getURLParamObject(){
        let targetUrl = !ValidateUtil.isEmpty(location.search)?location.search:location.href;
        let params = targetUrl.split('?')[1];//AAAA=11111&BBBB=22222
        return Object.fromEntries(new URLSearchParams(params));
    },
    getURLPage(){
        let urlList = location.href.split('?')[0].split('/');
        return urlList[urlList.length - 1];
    },
    getPrivilege(url){
        let privilegeCode = [];
        
        if(url.includes('myWorkSpace/myFormPage')){
            privilegeCode = ['P001'];
        } else if(url.includes('myWorkSpace/myReturn')){
            privilegeCode =  ['P002','P003'];
        } else if(url.includes('myWorkSpace/myCancelPage')){
            privilegeCode =  ['P033'];
        } else if(url.includes('myWorkSpace/inquireReadPage')){
            privilegeCode =  ['P004'];
        } else if(url.includes('myWorkSpace/myRead')){
            privilegeCode =  ['P005'];
        } else if(url.includes('myWorkSpace/leaveSearch')){
            privilegeCode =  ['P006'];
        } else if(url.includes('myWorkSpace/inquireLeave')){
            privilegeCode =  ['P007'];
        } else if(url.includes('signOff/readSignOff')){
            privilegeCode =  ['P008'];
        } else if(url.includes('signOff/sealSignOff')){
            privilegeCode =  ['P009'];
        } else if(url.includes('signOff/mediaOffPage')){
            privilegeCode =  ['P010','P011','P012'];
        } else if(url.includes('signOff/mediaOffPage')){
            privilegeCode =  ['P013'];
        } else if(url.includes('accounting/accountingDispatchPage')){
            privilegeCode =  ['P013'];
        } else if(url.includes('accounting/myWaitingAccounting')){
            privilegeCode =  ['P014'];
        } else if(url.includes('accounting/myWaitingArchieve')){
            privilegeCode =  ['P015'];
        } else if(url.includes('accounting/unDispatch')){
            privilegeCode =  ['P016'];
        } else if(url.includes('report/rejectReport')){
            privilegeCode =  ['P025'];
        } else if(url.includes('report/readReport')){
            privilegeCode =  ['P026'];
        } else if(url.includes('report/satisfyReport/search')){
            privilegeCode =  ['P027'];
        } else if(url.includes('report/satisfyReport/month')){
            privilegeCode =  ['P028'];
        } else if(url.includes('report/satisfyReport/week')){
            privilegeCode =  ['P029'];
        } else if(url.includes('material/upload')){
            privilegeCode =  ['P021'];
        } else if(url.includes('material/list')){
            privilegeCode =  ['P022'];
        } else if(url.includes('satisfaction/create')){
            privilegeCode =  ['P019'];
        } else if(url.includes('satisfaction/edit/:id)')){
            privilegeCode =  ['P019'];
        } else if(url.includes('satisfaction/list')){
            privilegeCode =  ['P020'];
        } else if(url.includes('/media/preview/questionnaire/:id')){
            privilegeCode =  ['P020'];
        } else if(url.includes('marquee/create')){
            privilegeCode =  ['P017'];
        } else if(url.includes('marquee/list')){
            privilegeCode =  ['P018'];
        } else if(url.includes('marquee/queryList')){
            privilegeCode =  ['P018'];
        } else if(url.includes('marquee/marqueeCreate')){
            privilegeCode =  ['P017'];
        } else if(url.includes('marquee/marqueeEdit')){
            privilegeCode =  ['P017'];
        } else if(url.includes('program/create')){
            privilegeCode =  ['P017'];
        } else if(url.includes('program/edit/:id')){
            privilegeCode =  ['P023'];
        } else if(url.includes('program/list')){
            privilegeCode =  ['P024'];
        } else if(url.includes('backStage/privilegeSetting')){
            privilegeCode =  ['P030'];
        } else if(url.includes('backStage/characterPrivilege')){
            privilegeCode =  ['P031'];
        } else if(url.includes('backStage/setting')){
            privilegeCode =  ['P032'];
        }
     
        return privilegeCode;
    }
}


export default CommonService;