var EIGame;
(function (EIGame) {
    var pbManager = (function () {
        function pbManager() {
            this.ProtoBuf = Browser.window.protobuf;
            this.protoAssetsMap = {};
            this.rootpath = "../src/network/message/";
        }
        pbManager.prototype.loadAll = function (pbList) {
            for (var _i = 0, pbList_1 = pbList; _i < pbList_1.length; _i++) {
                var pb = pbList_1[_i];
                pbManager.Instance().load(pb);
            }
        };
        pbManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new pbManager();
            }
            return this.mInstance;
        };
        pbManager.prototype.load = function (protoName, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            if (Browser.window.protobuf) {
                Browser.window.protobuf.load(this.rootpath + protoName, function (err, root) {
                    if (err)
                        throw err;
                    self.protoAssetsMap[protoName] = root;
                    if (cb) {
                        cb(err, root);
                    }
                });
            }
        };
        pbManager.prototype.encodeMsg = function (rootName, protoId, List) {
            var self = this;
            var root = self.getProto(rootName);
            if (root == null) {
                throw Error("proto '" + rootName + "' not loaded.");
            }
            var Message = root.lookup(EIGame.PROTOCOL_ID[protoId]);
            if (!Message) {
                throw Error("no this message '" + EIGame.PROTOCOL_ID[protoId] + "'");
            }
            var msg = Message.create(List);
            var errMsg = Message.verify(msg);
            if (errMsg)
                throw Error("message verify: " + errMsg);
            var buffer = Message.encode(msg).finish();
            return buffer;
        };
        pbManager.prototype.decodeMsg = function (rootName, protoId, buf) {
            var pb = null;
            var root = this.getProto(rootName);
            if (root == null) {
                throw Error("proto '" + rootName + "' not loaded.");
            }
            var pbMessage = root.lookup(EIGame.PROTOCOL_ID[protoId]);
            if (!pbMessage) {
                throw Error("no this message '" + EIGame.PROTOCOL_ID[protoId] + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        };
        pbManager.prototype.getProto = function (protoName) {
            var self = this;
            return self.protoAssetsMap[protoName];
        };
        return pbManager;
    }());
    EIGame.pbManager = pbManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=pbManager.js.map