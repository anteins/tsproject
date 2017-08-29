var EIGame;
(function (EIGame) {
    var SocketServer = (function () {
        function SocketServer() {
        }
        SocketServer.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new SocketServer();
            }
            return this.mInstace;
        };
        SocketServer.prototype.initConnect = function (url) {
            if (this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            this.ws.endian = EIGame.ei_network.Instance().net_endian;
            this.ws.connectByUrl(url);
            this.output = this.ws.output;
            this.ws.on(Laya.Event.OPEN, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("[socket] onOpen ", e);
                EIGame.ei_network.Instance().onSocketConnected(e);
            });
            this.ws.on(Laya.Event.CLOSE, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("[socket] onClosed ", e);
                EIGame.ei_network.Instance().onSocketClose(e);
            });
            this.ws.on(Laya.Event.MESSAGE, this, function (message) {
                if (message === void 0) { message = null; }
                // console.log("[socket] Message from server ", message);
                EIGame.ei_network.Instance().onSocketMessage(message);
            });
            this.ws.on(Laya.Event.ERROR, this, function (e) {
                if (e === void 0) { e = null; }
                console.log("[socket] error ", e);
                EIGame.ei_network.Instance().onSocketError(e);
            });
        };
        SocketServer.prototype.reConnect = function (url) {
            try {
                if (this.ws && url) {
                    this.ws.connectByUrl(url);
                }
            }
            catch (err) {
                console.log("[socket] 重连Error ", err);
            }
        };
        SocketServer.prototype.connected = function () {
            if (this.ws) {
                return this.ws.connected;
            }
            return false;
        };
        SocketServer.prototype.closeConnect = function () {
            if (this.ws) {
                // console.log("[socket] close ");
                this.ws.cleanSocket();
                this.ws.close();
            }
        };
        SocketServer.prototype.sendMessage = function (msg) {
            if (this.ws) {
                this.ws.send(msg);
            }
        };
        SocketServer.prototype.sendPacket = function (buffer) {
            if (this.ws) {
                this.ws.send(buffer);
                // console.log("[socket] send ", buffer);
            }
        };
        return SocketServer;
    }());
    EIGame.SocketServer = SocketServer;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=SocketServer.js.map