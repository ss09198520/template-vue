import WS from '@/assets/services/pmc.ws';
import EventBus from './eventBus';
class PMCService {
    constructor(){
        this.ws = WS;
        this.ws.Connect();
    }
     
    uuidv4 () {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    //證件拍攝器
    async callWebScanAdapter () {
        //var message = document.getElementById("txtMessage").value;
        var uuid = this.uuidv4();
    
        var message = JSON.stringify({
            'REQUEST_UUID': uuid,
            'DeviceName': 'WebScanAdapter'
        });
        this.ws.SendMessage(message, function (code, message, data) {
            // call back function here
            // console.log('get message:'+data);
            
            // parse json
            var json = JSON.parse(data);
        
            // check request UUID = response UUID
            if(uuid === json.REQUEST_UUID){
                console.log('-->request UUID = response UUID check OK.')
            } else {
                console.error.log('-->request UUID = response UUID check fail.')
            }
        
            // console.log('REQUEST_UUID:' + json.REQUEST_UUID);
            // console.log('RESULT_CODE:' + json.RESULT_CODE);
            // console.log('DeviceName:' + json.DeviceName);
            // console.log('RESULT_MESSAGE:' + json.RESULT_MESSAGE);
            
            if(json.DeviceName === 'WebScanAdapter') {
                for (var i = 0; i < json.ADAPTER_DATA.length; i++) {
                    var adapterdata = json.ADAPTER_DATA[i];
                    // console.log('SERIAL:' + adapterdata.SERIAL);
                    // console.log('BASE64STR:' + adapterdata.BASE64STR);
                    
                    var img = document.createElement('img');
                    img.src = 'data:image/jpg;base64,' + adapterdata.BASE64STR;
                    img.style.cssText = 'max-width:300px;max-height:400px;'
                }
            }
            EventBus.publish("scan-data-list", json.ADAPTER_DATA);
        });
    }

    cleanImg () {
        const myNode = document.getElementById('scanimage');
        myNode.innerHTML = '';
    }

    //開啟新網頁(Chrome)
    callBrowserAdapter (url) {
        var uuid = this.uuidv4();
        
        var timestamp = Date.now();
    
        var message = JSON.stringify({
            'REQUEST_UUID': uuid,
            'DeviceName': 'BrowserAdapter',
            'Action':'Chrome',
            'URL': url,
            'urlDecodeFlag': 'false',
            'timestamp': timestamp.toString()
        });

        this.ws.SendMessage(message, function (code, message, data) {
            // call back function here
            // console.log('get message:'+data);
            
            // parse json
            var json = JSON.parse(data);
    
            // check request UUID = response UUID
            if(uuid === json.REQUEST_UUID){
                console.log('-->request UUID = response UUID check OK.')
            } else {
                console.error.log('-->request UUID = response UUID check fail.')
            }
    
            console.log('REQUEST_UUID:' + json.REQUEST_UUID);
            console.log('RESULT_CODE:' + json.RESULT_CODE);
            console.log('DeviceName:' + json.DeviceName);
            console.log('RESULT_MESSAGE:' + json.RESULT_MESSAGE);
        });
    }

    //切換延伸螢幕
    callDualScreenAdapterExtend () {
        this.callDualScreenAdapter('SwitchMonitorToExtend');
    }

    //切換同步螢幕
    callDualScreenAdapterClone () {
        this.callDualScreenAdapter('SwitchMonitorToClone');
    }

    //DualScreenAdapter
    callDualScreenAdapter (action) {
        var uuid = this.uuidv4();
    
        var message = JSON.stringify({
            'REQUEST_UUID': uuid,
            'DeviceName': 'DualScreenAdapter',
            'Action': action
        });
        
        this.ws.SendMessage(message, function (code, message, data) {
            // call back function here
            // console.log('get message:'+data); 
            
            // parse json
            var json = JSON.parse(data);
    
            // check request UUID = response UUID
            if(uuid === json.REQUEST_UUID){
                console.log('-->request UUID = response UUID check OK.')
            } else {
                console.error.log('-->request UUID = response UUID check fail.')
            }
    
            console.log('REQUEST_UUID:' + json.REQUEST_UUID);
            console.log('RESULT_CODE:' + json.RESULT_CODE);
            console.log('DeviceName:' + json.DeviceName);
            console.log('RESULT_MESSAGE:' + json.RESULT_MESSAGE);
        });
    }
}

export default new PMCService();