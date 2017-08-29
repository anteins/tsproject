var EIGame;
(function (EIGame) {
    var ei_network = (function () {
        function ei_network() {
            this.isSocket = false;
            this.init();
        }
        ei_network.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ei_network();
            }
            return this.mInstance;
        };
        ei_network.prototype.init = function () {
        };
        ei_network.prototype.initConnect = function (url, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            self.eiSocket = new EIGame.socketServer();
            self.eiSocket.initConnect(url, cb);
        };
        ei_network.prototype.closeConnect = function () {
            var self = this;
            if (self.eiSocket) {
                self.eiSocket.closeConnect();
            }
        };
        ei_network.prototype.IsConnected = function () {
            var self = this;
            return self.isSocket;
        };
        ei_network.prototype.onSocketConnected = function (e) {
            if (e === void 0) { e = null; }
            var self = this;
            self.isSocket = true;
        };
        ei_network.prototype.onSocketClose = function (e) {
            if (e === void 0) { e = null; }
            var self = this;
            self.isSocket = false;
            self.closeConnect();
        };
        ei_network.prototype.onSocketError = function (e) {
            if (e === void 0) { e = null; }
            var self = this;
        };
        ei_network.prototype.pack = function (protoId, buf) {
            var self = this;
            var byte = new Laya.Byte();
            byte.writeInt32(protoId); //4字节 协议ID
            byte.writeArrayBuffer(buf.buffer); //pb消息
            return byte.buffer;
        };
        ei_network.prototype.unpack = function (message) {
            if (message instanceof ArrayBuffer) {
                return this._unpack_buffer(message);
            }
            else if (message instanceof Laya.Byte) {
                return this._unpack_byte(message);
            }
        };
        ei_network.prototype._unpack_buffer = function (message) {
            var byte = new Laya.Byte();
            byte.writeArrayBuffer(message);
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.pos = 0;
            var protoId = byte.getInt32();
            var datas = byte.getUint8Array(4, message.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        };
        ei_network.prototype._unpack_byte = function (byte) {
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.pos = 0;
            var protoId = byte.getInt32();
            var datas = byte.getUint8Array(4, byte.buffer.byteLength - 4);
            byte.clear();
            return [protoId, datas];
        };
        ei_network.prototype.sendMessage = function (msg) {
            var self = this;
            if (self.IsConnected()) {
                self.eiSocket.sendMessage(msg);
            }
        };
        ei_network.prototype.sendPacket = function (protoId, buf) {
            var self = this;
            if (self.IsConnected()) {
                var buffer = self.pack(protoId, buf);
                console.log("send ", protoId, buf.buffer.byteLength, buffer);
                self.eiSocket.sendPacket(buffer);
            }
        };
        ei_network.prototype.excutePacketEx = function (message) {
            var self = this;
            try {
                if (self.IsConnected()) {
                    self.excutePakcetHeader(message);
                }
            }
            catch (exception) {
                console.log("exception: ", exception, message.byteLength);
            }
        };
        ;
        ei_network.prototype.excutePakcetHeader = function (message) {
            var _a = this.unpack(message), protoId = _a[0], datas = _a[1];
            protoId = protoId;
            datas = datas;
            //下行入口
            if (protoId == null || EIGame.PROTOCOL_ID[protoId] == null) {
                throw Error("excute error: no protoId info");
            }
            console.log("excute ", protoId, EIGame.PROTOCOL_ID[protoId], message);
            EIGame.excuteProtocol.Instance().route(protoId, datas);
        };
        ei_network.prototype.packetInt = function () {
        };
        ei_network.prototype.packetInt2 = function () {
        };
        ei_network.prototype.packetInt4 = function () {
        };
        ei_network.prototype.unpacketInt = function () {
        };
        ei_network.prototype.unpacketInt2 = function () {
        };
        ei_network.prototype.unpacketInt4 = function () {
        };
        return ei_network;
    }());
    EIGame.ei_network = ei_network;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_network.js.map