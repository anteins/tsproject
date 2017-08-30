var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIGame;
(function (EIGame) {
    var ProtocolManager = (function (_super) {
        __extends(ProtocolManager, _super);
        function ProtocolManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ProtoBuf = Browser.window.protobuf;
            _this.protoLoadedMap = {};
            _this.rootpath = "../src/network/message/";
            return _this;
        }
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        ProtocolManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ProtocolManager();
            }
            return this.mInstance;
        };
        ProtocolManager.prototype.init = function () {
        };
        ProtocolManager.prototype.load = function (protoList, cb) {
            if (cb === void 0) { cb = null; }
            for (var i = 0; i < protoList.length; i++) {
                protoList[i] = this.rootpath + protoList[i];
            }
            this._load(protoList, cb);
        };
        ProtocolManager.prototype._load = function (protoList, cb) {
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
        ProtocolManager.prototype.encodeMsg = function (protoId, List) {
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
        ProtocolManager.prototype.decodeMsg = function (protoId, buf) {
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
        ProtocolManager.prototype.getRoot = function () {
            return this.mRoot;
        };
        return ProtocolManager;
    }(EIGame.EISingleton));
    EIGame.ProtocolManager = ProtocolManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ProtocolManager.js.map