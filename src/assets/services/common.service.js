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
}


export default CommonService;