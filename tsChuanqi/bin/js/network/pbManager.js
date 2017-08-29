var EIGame;
(function (EIGame) {
    var pbManager = (function () {
        function pbManager() {
            this.ProtoBuf = Browser.window.protobuf;
            this.protoLoadedMap = {};
            this.rootpath = "../src/network/message/";
        }
        pbManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new pbManager();
            }
            return this.mInstance;
        };
        pbManager.prototype.init = function () {
        };
        pbManager.prototype.load = function (protoList, cb) {
            if (cb === void 0) { cb = null; }
            for (var i = 0; i < protoList.length; i++) {
                protoList[i] = this.rootpath + protoList[i];
            }
            this._load(protoList, cb);
        };
        pbManager.prototype._load = function (protoList, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            if (Browser.window.protobuf) {
                Browser.window.protobuf.load(protoList, function (err, root) {
                    if (err)
                        throw err;
                    self.mRoot = root;
                    if (cb) {
                        cb(err, root);
                    }
                });
            }
        };
        pbManager.prototype.encodeMsg = function (protoId, List) {
            var self = this;
            if (self.mRoot == null)
                throw Error("mRoot is null.");
            var Message = self.mRoot.lookup(EIGame.PROTOCOL_ID[protoId]);
            if (!Message)
                throw Error("no this message '" + EIGame.PROTOCOL_ID[protoId] + "'");
            var msg = Message.create(List);
            var errMsg = Message.verify(msg);
            if (errMsg)
                throw Error("message verify: " + errMsg);
            var buffer = Message.encode(msg).finish();
            return buffer;
        };
        pbManager.prototype.decodeMsg = function (protoId, buf) {
            var self = this;
            var pb = null;
            if (self.mRoot == null) {
                throw Error("mRoot is null.");
            }
            var pbMessage = self.mRoot.lookup(EIGame.PROTOCOL_ID[protoId]);
            if (!pbMessage) {
                throw Error("no this message '" + EIGame.PROTOCOL_ID[protoId] + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        };
        pbManager.prototype.getRoot = function () {
            return this.mRoot;
        };
        return pbManager;
    }());
    EIGame.pbManager = pbManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=pbManager.js.map