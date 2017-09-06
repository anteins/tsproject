var EIGame;
(function (EIGame) {
    var HttpServer = (function () {
        function HttpServer() {
            this.timeout = 10000;
            this.header = [
                "Access-Control-Allow-Origin", "*",
                "Access-Control-Allow-Headers", "X-Requested-With",
                "Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"
            ];
            this.init();
        }
        HttpServer.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new HttpServer();
            }
            return this.mInstace;
        };
        HttpServer.prototype.init = function () {
            var self = this;
        };
        HttpServer.prototype.require4 = function (url, datas, method, responseType, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            self._require(url, datas, method, responseType, cb);
        };
        HttpServer.prototype._require = function (url, datas, method, responseType, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = self.timeout; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, self, function (data) {
                console.log("http completeHandler: ", data);
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
                console.log("[http] post ", datas);
                xhr.send(url, datas, method, responseType);
            }
            else if (method == "get") {
                url = url + "?" + datas;
                console.log("[http] get ", url);
                xhr.send(url, "", method, responseType);
            }
        };
        return HttpServer;
    }());
    EIGame.HttpServer = HttpServer;
})(EIGame || (EIGame = {}));
