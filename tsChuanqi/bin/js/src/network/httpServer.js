var EIGame;
(function (EIGame) {
    var httpServer = (function () {
        function httpServer() {
            this.timeout = 10000;
            this.header = [
                "Access-Control-Allow-Origin", "*",
                "Access-Control-Allow-Headers", "X-Requested-With",
                "Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"
            ];
            this.init();
        }
        httpServer.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new httpServer();
            }
            return this.mInstace;
        };
        httpServer.prototype.init = function () {
            var self = this;
        };
        httpServer.prototype.require4 = function (url, datas, method, responseType, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            self._require(url, datas, method, responseType, cb);
        };
        httpServer.prototype._require = function (url, datas, method, responseType, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = self.timeout; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, self, function (data) {
                // console.log("http completeHandler: ", data);
                if (cb) {
                    cb(xhr.data);
                }
            });
            xhr.once(Laya.Event.ERROR, self, function (e) {
                console.log("http errorHandler: ", e);
            });
            xhr.on(Laya.Event.PROGRESS, self, function (data) {
                console.log("http processHandler: ", data);
            });
            if (method == "post") {
                xhr.send(url, datas, method, responseType);
            }
            else if (method == "get") {
                xhr.send(url, null, method, responseType);
            }
        };
        return httpServer;
    }());
    EIGame.httpServer = httpServer;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=httpServer.js.map