var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIGame;
(function (EIGame) {
    var NetWork = (function (_super) {
        __extends(NetWork, _super);
        function NetWork() {
            var _this = _super.call(this) || this;
            _this.mIsOnline = true;
            _this.activeToClose = false;
            _this._time = 0;
            _this.net_endian = Laya.Byte.BIG_ENDIAN;
            return _this;
        }
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        NetWork.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new NetWork();
            }
            return this.mInstance;
        };
        NetWork.prototype.init = function () {
            var self = this;
            self.activeToClose = false;
            EIGame.NetworkUtil.addHandler(window, "online", function () {
                console.log("Online---正常工作");
                self.mIsOnline = true;
                EIGame.ei_reconnect.Instance().onlineChanged(self.mIsOnline);
            });
            EIGame.NetworkUtil.addHandler(window, "offline", function () {
                alert("Offline ---离线工作");
                self.mIsOnline = false;
                EIGame.ei_reconnect.Instance().onlineChanged(self.mIsOnline);
            });
            self.initConnect();
        };
        NetWork.prototype.initConnect = function () {
            var self = this;
            self.eiSocket = new EIGame.WSConnection();
            self.eiSocket.init();
            self.eiSocket.connectByUrl(EIGame.LoginManager.socket_url);
        };
        NetWork.prototype.closeConnect = function (error) {
            if (error === void 0) { error = null; }
            var self = this;
            if (self.eiSocket) {
                self.activeToClose = true;
                self.eiSocket.close();
            }
        };
        //---------------------------------------------- ws回调 -------------------------------------------
        NetWork.prototype.onSocketMessage = function (message) {
            this.excutePacketEx(message);
        };
        NetWork.prototype.onSocketConnected = function (e) {
            if (e === void 0) { e = null; }
            // console.log("[network] onConnected");
            var self = this;
            this.resetConnectTime();
            this.startConnecteTime();
            if (EIGame.ei_reconnect.Instance().isReconnecting() || EIGame.ei_reconnect.Instance().isWaitting()) {
                EIGame.ei_reconnect.Instance().onSocketReConnected();
                return;
            }
            EIGame.ei_reconnect.Instance().init();
            EIGame.HeartBeatManager.Instance().init();
            EIGame.Reachability.Instance().AddListener();
            setInterval(function () {
                self.checkNetState();
            }, 1000);
        };
        NetWork.prototype.onSocketClose = function (e) {
            if (e === void 0) { e = null; }
            EIGame.ei_reconnect.Instance().onConnectingException("on Socket Close", e);
        };
        NetWork.prototype.onSocketError = function (e) {
            if (e === void 0) { e = null; }
            EIGame.ei_reconnect.Instance().onConnectingException("on Socket Error", e);
        };
        //---------------------------------------------- ws回调 -------------------------------------------
        NetWork.prototype.connected = function () {
            return this.eiSocket.connected();
        };
        NetWork.prototype.IsOnline = function () {
            return this.mIsOnline;
        };
        NetWork.prototype.test_down_online = function () {
            this.mIsOnline = false;
        };
        NetWork.prototype.getSocket = function () {
            return this.eiSocket;
        };
        NetWork.prototype.reConnect = function (url) {
            if (this.eiSocket) {
                this.eiSocket.reConnect(url);
            }
        };
        NetWork.prototype.clearConnect = function () {
            console.log("[network] 重连结束.....清理连接");
            var self = this;
            EIGame.HeartBeatManager.Instance().close();
            EIGame.Reachability.Instance().RemoveListener();
        };
        NetWork.prototype.resetConnectTime = function () {
            this._time = 0;
            if (this.connectTimeOut) {
                clearTimeout(this.connectTimeOut);
            }
        };
        NetWork.prototype.startConnecteTime = function () {
            var self = this;
            this.connectTimeOut = setTimeout(function () {
                self._time++;
                self.startConnecteTime();
            }, 1000);
        };
        ;
        NetWork.prototype.checkNetState = function () {
            // NetworkUtil.isOnLine();
            EIGame.Reachability.Instance().CheckConnectState();
        };
        NetWork.prototype.say_ai = function () {
            if (this.connected()) {
                EIGame.ModelManager.Instance().getModel("Model_Login").sendLoginServer(0);
            }
        };
        NetWork.prototype.pack = function (protoId, buf) {
            var self = this;
            var byte = new Laya.Byte();
            byte.endian = self.net_endian;
            //4字节 协议ID
            byte.writeInt32(protoId);
            //pb消息流
            byte.writeArrayBuffer(buf);
            // console.log("[network] pack ", buf.length, buf);
            return byte.getUint8Array(0, buf.length + 4);
        };
        NetWork.prototype.unpack = function (message) {
            if (message instanceof ArrayBuffer) {
                // console.log("[network] unpac_arrayb ", message);
                return this._unpack_buffer(message);
            }
            else if (message instanceof Laya.Byte) {
                // console.log("[network] unpack_byte ", message);
                return this._unpack_byte(message);
            }
        };
        NetWork.prototype._unpack_buffer = function (message) {
            var self = this;
            var byte = new Laya.Byte();
            byte.writeArrayBuffer(message);
            byte.endian = self.net_endian;
            byte.pos = 0;
            var protoId = byte.getInt32();
            var datas = byte.getUint8Array(4, message.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        };
        NetWork.prototype._unpack_byte = function (byte) {
            byte.endian = this.net_endian;
            byte.pos = 0;
            var protoId = byte.getInt32();
            var datas = byte.getUint8Array(4, byte.buffer.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        };
        NetWork.prototype.sendPacket = function (protoId, buf) {
            var self = this;
            if (!self.connected()) {
                // console.log("网络连接中断");
                return;
            }
            var buffer = self.pack(protoId, buf);
            // let log = new Laya.Byte(buffer);
            // console.log("[network] sendPacket ", protoId, excutePacket.Instance().get_msg(protoId), log);  
            self.eiSocket.send(buffer);
        };
        NetWork.prototype.excutePacketEx = function (message) {
            var self = this;
            if (self.connected()) {
                EIGame.Reachability.Instance().CheckConnectState();
                self.excutePakcetHeader(message);
            }
        };
        ;
        NetWork.prototype.excutePakcetHeader = function (message) {
            var unpack_t = null;
            try {
                unpack_t = this.unpack(message);
            }
            catch (e) {
                console.log("[Error] 协议ID解析", e);
            }
            var protoId = unpack_t[0], datas = unpack_t[1];
            protoId = protoId;
            datas = datas;
            //下行入口
            if (protoId == null || EIGame.excutePacketRoute.Instance().get_msg(protoId) == null) {
                throw Error("[Error] 缺少协议ID " + protoId);
            }
            var log = new Laya.Byte(message);
            console.log("[network] excutePacket ", protoId, EIGame.excutePacketRoute.Instance().get_msg(protoId));
            EIGame.excutePacketRoute.Instance().route(protoId, datas);
        };
        NetWork.prototype.packetInt = function () {
        };
        NetWork.prototype.packetInt2 = function () {
        };
        NetWork.prototype.packetInt4 = function () {
        };
        NetWork.prototype.unpacketInt = function () {
        };
        NetWork.prototype.unpacketInt2 = function () {
        };
        NetWork.prototype.unpacketInt4 = function () {
        };
        return NetWork;
    }(EIGame.EISingleton));
    EIGame.NetWork = NetWork;
})(EIGame || (EIGame = {}));
