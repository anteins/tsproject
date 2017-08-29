var EIGame;
(function (EIGame) {
    var socketServer = (function () {
        function socketServer() {
            this.url = "ws://localhost:8181";
            this.default_endian = Laya.Byte.LITTLE_ENDIAN;
        }
        socketServer.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new socketServer();
            }
            return this.mInstace;
        };
        socketServer.prototype.initConnect = function (url, onOpen) {
            if (url === void 0) { url = null; }
            if (onOpen === void 0) { onOpen = null; }
            if (this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            //这里我们采用小端
            this.ws.endian = this.default_endian;
            if (url) {
                this.ws.connectByUrl(url);
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
        socketServer.prototype.closeConnect = function () {
            if (this.ws) {
                this.ws.close();
            }
        };
        socketServer.prototype.sendMessage = function (msg) {
            if (this.ws) {
                this.ws.send(msg);
            }
        };
        socketServer.prototype.sendPacket = function (buffer) {
            if (this.ws) {
                this.ws.send(buffer);
            }
        };
        return socketServer;
    }());
    EIGame.socketServer = socketServer;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=socketServer.js.map