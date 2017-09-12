module EIGame{
    export class NetWork extends EIGame.EISingleton{
        private static mInstance:NetWork;
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        static Instance():NetWork{
            if(this.mInstance == null){
                this.mInstance = new NetWork();
            }
            return this.mInstance;
        }

        private eiSocket:WSConnectionManager;
        private mIsOnline:boolean = true;
        private activeToClose:boolean = false;
        private _time:number = 0;
        private connectTimeOut;

        net_endian = Laya.Byte.BIG_ENDIAN;

        constructor(){
            super();
        }

        init(){
            var self = this;
            self.activeToClose = false;
            NetworkUtil.addHandler(window, "online", function() {
                console.log("Online---正常工作");
                self.mIsOnline = true;
                ei_reconnect.Instance().onlineChanged(self.mIsOnline);
            });
            NetworkUtil.addHandler(window, "offline", function() {
                alert("Offline ---离线工作");
                self.mIsOnline = false;
                ei_reconnect.Instance().onlineChanged(self.mIsOnline);
            });

            self.initConnect();
        }

        initConnect():void{
            var self = this;
            self.eiSocket = new WSConnectionManager();
            self.eiSocket.init();
            self.eiSocket.connectByUrl(LoginManager.socket_url);
        }

        closeConnect(error:any=null):void{
            let self = this;
            if(self.eiSocket){
                self.activeToClose = true;
                self.eiSocket.close();
            }
        }

        //---------------------------------------------- ws回调 -------------------------------------------
        onSocketMessage(message:any){
            this.excutePacketEx(message);
        }

        onSocketConnected(e:any=null):void{
            // console.log("[network] onConnected");
            let self = this;
            this.resetConnectTime();
            this.startConnecteTime();
            if( ei_reconnect.Instance().isReconnecting() || ei_reconnect.Instance().isWaitting()){
                ei_reconnect.Instance().onSocketReConnected();
                return;
            }
            ei_reconnect.Instance().init();
            HeartBeatManager.Instance().init();
            Reachability.Instance().AddListener();
            setInterval(()=>{
                self.checkNetState();
            }, 1000);
        }
        
        onSocketClose(e:any=null):void{
            ei_reconnect.Instance().onConnectingException("on Socket Close", e);
        }

        onSocketError(e:Event=null):void{
            ei_reconnect.Instance().onConnectingException("on Socket Error", e);
        }

        //---------------------------------------------- ws回调 -------------------------------------------
        connected():boolean{
            return this.eiSocket.connected();
        }

        IsOnline():boolean{
            return this.mIsOnline;
        }

        test_down_online(){
            this.mIsOnline = false;
        }

        getSocket(){
            return this.eiSocket;
        }

        reConnect(url:string):void{
            if(this.eiSocket){
                this.eiSocket.reConnect(url);
            }
        }
        
        clearConnect(){
            console.log("[network] 重连结束.....清理连接");
            var self = this;
            HeartBeatManager.Instance().close();
            Reachability.Instance().RemoveListener();
        }
        
        resetConnectTime(){
            this._time = 0;
            if(this.connectTimeOut){
                clearTimeout(this.connectTimeOut);
            }
        }

        startConnecteTime() {
            var self = this;
            this.connectTimeOut = setTimeout(()=> {
                self._time++;
                self.startConnecteTime();
            }, 1000);
        };

        checkNetState(){
            // NetworkUtil.isOnLine();
            Reachability.Instance().CheckConnectState(); 
        }

        say_ai(){
            if(this.connected()){
                ModelManager.Instance().getModel("Model_Login").sendLoginServer(0);
            }
        }

        pack(protoId:number, buf:Uint8Array):Uint8Array{
            let self = this;
            let byte = new Laya.Byte();
            byte.endian = self.net_endian;
            //4字节 协议ID
            byte.writeInt32(protoId);
            //pb消息流
            byte.writeArrayBuffer(buf);
            // console.log("[network] pack ", buf.length, buf);
            return byte.getUint8Array(0, buf.length + 4);
        }

        unpack(message:any){
            if(message instanceof ArrayBuffer){
                // console.log("[network] unpac_arrayb ", message);
                return this._unpack_buffer(message);
            }
            else if(message instanceof Laya.Byte){
                // console.log("[network] unpack_byte ", message);
                return this._unpack_byte(message);
            }
        }

        private _unpack_buffer(message:ArrayBuffer){
            let self = this;
            let byte = new Laya.Byte();
            byte.writeArrayBuffer(message);
            byte.endian = self.net_endian;
            byte.pos = 0;
            let protoId = byte.getInt32();
            let datas = byte.getUint8Array(4, message.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        }

        private _unpack_byte(byte:Laya.Byte){
            byte.endian = this.net_endian;
            byte.pos = 0;
            let protoId = byte.getInt32();
            let datas = byte.getUint8Array(4, byte.buffer.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        }

        public sendPacket(protoId:any, buf:Uint8Array){
            var self = this;
            if(!self.connected()){
                // console.log("网络连接中断");
                return;
            }
            var buffer:Uint8Array = self.pack(protoId, buf);
            // let log = new Laya.Byte(buffer);
            // console.log("[network] sendPacket ", protoId, excutePacket.Instance().get_msg(protoId), log);  
            self.eiSocket.send(buffer);
        }
        
        public excutePacketEx(message:ArrayBuffer):void {
            var self = this;
            if(self.connected()){
                Reachability.Instance().CheckConnectState();
                self.excutePakcetHeader(message);
            }
        };

        public excutePakcetHeader(message:ArrayBuffer){
            let unpack_t = null;
            try{
                unpack_t = this.unpack(message);
            }catch(e){
                console.log("[Error] 协议ID解析", e);
            }
            
            let[protoId, datas] = unpack_t;
            protoId = protoId as number;
            datas = datas as Uint8Array;
            //下行入口
            if(protoId == null || excutePacketRoute.Instance().get_msg(protoId) == null){
                throw Error("[Error] 缺少协议ID " + protoId);
            }
            let log = new Laya.Byte(message);
            console.log("[network] excutePacket ", protoId, excutePacketRoute.Instance().get_msg(protoId));
            excutePacketRoute.Instance().route(protoId, datas);
        }

        public packetInt(){
        }
        
        public packetInt2(){

        }

        public packetInt4(){

        }

        public unpacketInt(){

        }
        
        public unpacketInt2(){

        }

        public unpacketInt4(){

        }
    }
}