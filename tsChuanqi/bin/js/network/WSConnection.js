var EIGame;
(function (EIGame) {
    var WSConnection = (function () {
        function WSConnection() {
        }
        WSConnection.prototype.connect = function (host, port) {
            if (this.ws) {
                this.ws.connect(host, port);
            }
        };
        WSConnection.prototype.init = function () {
            if (this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            this.ws.endian = EIGame.ei_network.Instance().net_endian;
            this.output = this.ws.output;
            this.ws.on(Laya.Event.OPEN, this, function (e) {
                if (e === void 0) { e = null; }
                // console.log("[socket] onOpen ", e);
                EIGame.ei_network.Instance().onSocketConnected(e);
            });
            this.ws.on(Laya.Event.CLOSE, this, function (e) {
                if (e === void 0) { e = null; }
                // console.log("[socket] onClosed ", e);
                EIGame.ei_network.Instance().onSocketClose(e);
            });
            this.ws.on(Laya.Event.MESSAGE, this, function (message) {
                if (message === void 0) { message = null; }
                // console.log("[socket] Message from server ", message);
                EIGame.ei_network.Instance().onSocketMessage(message);
            });
            this.ws.on(Laya.Event.ERROR, this, function (e) {
                if (e === void 0) { e = null; }
                // console.log("[socket] error ", e);
                EIGame.ei_network.Instance().onSocketError(e);
            });
        };
        WSConnection.prototype.connectByUrl = function (url) {
            if (this.ws) {
                this.ws.connectByUrl(url);
            }
        };
        WSConnection.prototype.reConnect = function (url) {
            try {
                if (this.ws && url) {
                    this.ws.connectByUrl(url);
                }
            }
            catch (err) {
                console.log("[socket] 重连Error ", err);
            }
        };
        WSConnection.prototype.connected = function () {
            if (this.ws) {
                return this.ws.connected;
            }
            return false;
        };
        WSConnection.prototype.close = function () {
            if (this.ws) {
                // console.log("[socket] close ");
                this.ws.cleanSocket();
                this.ws.close();
            }
        };
        WSConnection.prototype.send = function (buffer) {
            if (this.ws) {
                this.ws.send(buffer);
                // console.log("[socket] send ", buffer);
            }
        };
        return WSConnection;
    }());
    EIGame.WSConnection = WSConnection;
})(EIGame || (EIGame = {}));
