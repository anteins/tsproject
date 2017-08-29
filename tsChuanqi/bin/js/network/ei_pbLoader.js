var EIGame;
(function (EIGame) {
    var ei_pbLoader = (function () {
        function ei_pbLoader() {
            this.ProtoBuf = Browser.window.protobuf;
            this.pbMessageCache = {};
            this.rootpath = "../src/network/message/";
            this.ProtoBuf = Browser.window.protobuf;
        }
        ei_pbLoader.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new EIGame.ei_pbLoader();
            }
            return this.mInstace;
        };
        ei_pbLoader.prototype.Pb = function () {
            return this.ProtoBuf;
        };
        ei_pbLoader.prototype.load = function (pbPath, cb) {
            var self = this;
            if (self.ProtoBuf) {
                self.ProtoBuf.load(self.rootpath + pbPath, function (err, root) {
                    if (err)
                        throw err;
                    self.mRoot = root;
                    if (cb) {
                        cb(err, root);
                    }
                });
            }
        };
        ei_pbLoader.prototype.encodeMsg = function (protoId, List) {
            var self = this;
            var buffer = null;
            var Message = this.mRoot.lookup(protoId);
            if (Message) {
                var msg = Message.create(List);
                var errMsg = Message.verify(msg);
                if (errMsg)
                    throw Error(errMsg);
                var buffer = Message.encode(msg).finish();
            }
            else {
                throw Error("no this pb! " + protoId);
            }
            return buffer;
        };
        ei_pbLoader.prototype.getPb = function (protoId) {
            return EIGame.C2G_PROTOCOL_ID[protoId];
        };
        ei_pbLoader.prototype.decodeMsg = function (protoId, buf) {
            var self = this;
            var pb = null;
            var pbMessage = this.mRoot.lookup(protoId);
            if (pbMessage) {
                pb = pbMessage.decode(buf);
            }
            else {
                throw Error("no this pb! " + protoId);
            }
            return pb;
        };
        return ei_pbLoader;
    }());
    EIGame.ei_pbLoader = ei_pbLoader;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_pbLoader.js.map