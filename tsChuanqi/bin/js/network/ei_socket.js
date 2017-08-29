var EIGame;
(function (EIGame) {
    var ei_socket = (function () {
        function ei_socket() {
        }
        ei_socket.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new ei_socket();
            }
            return this.mInstace;
        };
        ei_socket.prototype.initConnect = function (url, endian, onOpen) {
            if (url === void 0) { url = null; }
            if (endian === void 0) { endian = null; }
            if (onOpen === void 0) { onOpen = null; }
            if (this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            //这里我们采用小端
            this.ws.endian = Laya.Byte.BIG_ENDIAN;
            if (url) {
                this.ws.connectByUrl(url);
            }
            if (endian) {
                this.ws.endian = endian;
            }
            this.output = this.ws.output;
            this.ws.on(Laya.Event.OPEN, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("socket Connected");
                if (onOpen) {
                    onOpen(e);
                }
                EIGame.ei_network.Instance().onSocketConnected(e);
            });
            this.ws.on(Laya.Event.CLOSE, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("Socket closed");
                EIGame.ei_network.Instance().onSocketClose(e);
            });
            this.ws.on(Laya.Event.MESSAGE, this, function (message) {
                if (message === void 0) { message = null; }
                console.log("Socket Message from server:", message);
                EIGame.ei_network.Instance().excutePacketEx(message);
            });
            this.ws.on(Laya.Event.ERROR, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("Socket error: ", e, typeof e);
                EIGame.ei_network.Instance().onSocketError(e);
            });
        };
        ei_socket.prototype.sendMessage = function (msg) {
            if (this.ws) {
                this.ws.send(msg);
            }
        };
        ei_socket.prototype.sendPacket = function (buffer) {
            if (this.ws) {
                this.ws.send(buffer);
            }
        };
        ei_socket.prototype.close = function () {
            if (this.ws) {
                this.ws.close();
            }
        };
        return ei_socket;
    }());
    EIGame.ei_socket = ei_socket;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_socket.js.map