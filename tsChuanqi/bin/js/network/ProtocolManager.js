var EIGame;
(function (EIGame) {
    var ProtocolManager = (function () {
        function ProtocolManager() {
            this.ProtoBuf = Browser.window.protobuf;
        }
        ProtocolManager.init = function (next) {
            var self = this;
            var files = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            this.load(files, function (err) {
                next(err);
            });
        };
        ProtocolManager.load = function (protoList, cb) {
            if (cb === void 0) { cb = null; }
            for (var i = 0; i < protoList.length; i++) {
                protoList[i] = this.rootpath + protoList[i];
            }
            this._load(protoList, cb);
        };
        ProtocolManager._load = function (protoList, cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            if (Browser.window.protobuf) {
                Browser.window.protobuf.load(protoList, function (err, root) {
                    if (err) {
                        console.log("pb err ", err);
                        throw err;
                    }
                    self.mRoot = root;
                    if (cb) {
                        cb(err);
                    }
                });
            }
        };
        ProtocolManager.encodeMsg = function (protoId, List) {
            var self = this;
            if (self.mRoot == null)
                throw Error("mRoot is null.");
            var msgName = EIGame.ExcutePacketRoute.Instance().get_msg(protoId);
            var Message = self.mRoot.lookup(msgName);
            if (!Message)
                throw Error("no this message '" + msgName + "'");
            var msg = Message.create(List);
            var errMsg = Message.verify(msg);
            if (errMsg)
                throw Error("message verify: " + errMsg);
            var buffer = Message.encode(msg).finish();
            return buffer;
        };
        ProtocolManager.decodeMsg = function (protoId, buf) {
            var self = this;
            var pb = null;
            if (self.mRoot == null) {
                throw Error("mRoot is null.");
            }
            var msgName = EIGame.ExcutePacketRoute.Instance().get_msg(protoId);
            var pbMessage = self.mRoot.lookup(msgName);
            if (!pbMessage) {
                throw Error("no this message '" + msgName + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        };
        ProtocolManager.getRoot = function () {
            return this.mRoot;
        };
        ProtocolManager.protoLoadedMap = {};
        ProtocolManager.rootpath = "./message/";
        ProtocolManager.mIsPreLoad = false;
        return ProtocolManager;
    }());
    EIGame.ProtocolManager = ProtocolManager;
})(EIGame || (EIGame = {}));
