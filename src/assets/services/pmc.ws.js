import MessageService from './message.service';

class WS {
    constructor(){
        this._uri = "wss://127.0.0.1:2330"; // server url
        this._ws = null; // websocket
        this._serial = 0; // message serial
        this._queue = {}; // queue[serial] = callback
        this._disp = {}; // disp[event] = callback

        // application: ImageManager, ImageViewer, ImageVerifier
        this.Application = "";
    }

    // default empty callback
    OnConnect () {
        console.log("PmcControllerTestPageWs: OnConnect");
    }

    // default empty callback
    OnDisconnect () {
        console.log("PmcControllerTestPageWs: OnDisconnect");

        console.log('Socket is closed. Reconnect will be attempted in 10 second.');

        MessageService.showError("PMC 連線失敗", "PMC ");
        setTimeout(this.CheckAndReconnect(), 10000);
    }

    // default empty callback
    OnError () {
        console.log("PmcControllerTestPageWs: OnError");
    }

    // default empty callback
    OnMessageIn (resp) {
        console.log("PmcControllerTestPageWs: OnMessageIn: ", resp);
    }

    // default empty callback
    OnMessageOut (req) {
        console.log("PmcControllerTestPageWs: OnMessageOut: ", req);
    }

    // incoming websocket message
    onMessage (e) {
        console.log(this);
        let resp = e.data;

        // for debug
        // this.OnMessageIn(resp);

        // parse json
        let json = JSON.parse(resp);
        let id = json["REQUEST_UUID"];
        console.log('onMessage receive callback REQUEST_UUID:' + id)

        if (id) {
            // get callback
            let callback = this._queue[id];
            delete this._queue[id];

            // run callback
            if (callback) {
                let code = json["REQUEST_UUID"];
                let message = json["RESULT_MESSAGE"];
                let data = resp;
                callback(code, message, data);
            }
        } else if (id == -1) {
            // event
            let app = json["Application"];
            let event = json["Event"];
            let data = json["Data"];

            if (app in this._disp) {
                let callback = this._disp[app][event];
                if (callback) {
                    callback(data);
                }
            }
        }
    }

    // connect websocket
    Connect () {
        this._ws = new WebSocket(this._uri);
        this._ws.onopen = this.OnConnect;
        this._ws.onclose = this.OnDisconnect;
        this._ws.onerror = this.OnError;
        this._ws.onmessage = this.onMessage;
        this._ws._queue = this._queue;
        this._ws._serial = this._serial;
        this._ws._disp = this._disp;
        this._ws.OnMessageIn = this.OnMessageIn;
    }

    // disconnect websocket
    Disconnect () {
        this._ws.close();
        this._ws = null;

        // clear message queue
        this._queue = {};
        // clear event dispatcher
        this._disp = {};
    }

    Event (event, callback) {
        let app = this.Application;

        if (!(app in this._disp)) {
            this._disp[app] = {};
        }

        this._disp[app][event] = callback;
    }

    uuidv4 () {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    // open app
    Open (argument, callback) {
        // set callback
        let id = this.uuidv4();
        this._queue[id] = callback;

        let req = JSON.stringify({
            "REQUEST_UUID": id,
            "Application": this.Application,
            "DeviceName": "Open",
            "Data": {
                "Arguments": argument,
            },
        });

        // for debug
        this.OnMessageOut(req);

        // send
        this._ws.send(req);
    }

    // close app
    Close (callback) {
        // set callback
        let id = this.uuidv4();
        this._queue[id] = callback;

        let req = JSON.stringify({
            "Serial": id,
            "Application": this.Application,
            "Action": "Close",
            "Data": {},
        });

        // for debug
        this.OnMessageOut(req);

        // send
        this._ws.send(req);
    }

    // list files
    ListFiles (subdir, recursive, callback) {
        // set callback
        console.log('ListFiles()');
        console.log(subdir);
        console.log(recursive);
        console.log(callback);
    }

    // delete file
    DeleteFile (file, callback) {
        // set callback
        console.log('DeleteFile()');
        console.log(file);
        console.log(callback);
    }

    // read file
    ReadFile (file, toBase64, callback) {
        // set callback
        console.log('ReadFile()');
        console.log(file);
        console.log(toBase64);
        console.log(callback);
    }

    // SendMessage
    SendMessage (argument, callback) {

        this.CheckAndReconnect();

        console.log('-->arguments:'+argument);

        const obj = JSON.parse(argument);
        
        console.log('-->arguments:'+obj.REQUEST_UUID);
        /*
        "REQUEST_UUID": uuid,
        "DeviceName": "WebScanAdapter",
        "Data": {
            "Arguments": arguments,
        }
        */
        // set callback
        this._queue[obj.REQUEST_UUID] = callback;

        /*
        let req = JSON.stringify({
            "REQUEST_UUID": obj.REQUEST_UUID,
            "DeviceName": obj.DeviceName,
            "Data": JSON.stringify(obj.Data)
        });
        */

        // for debug
        this.OnMessageOut(argument);

        // send
        this._ws.send(argument);
    }

    CheckAndReconnect () {
        console.log('-->CheckAndReconnect');
        if (this._ws.readyState === WebSocket.CLOSED) {
            // Do your stuff...
            console.log('-->CheckAndReconnect: Reconnecting....');
            this.Connect();
            console.log('-->CheckAndReconnect: Reconnect OK.');
         }
         console.log('-->CheckAndReconnect OK.');
    }
}

export default new WS();