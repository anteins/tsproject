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
    //protocol route
    var ExcutePacketRoute = (function (_super) {
        __extends(ExcutePacketRoute, _super);
        function ExcutePacketRoute() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.RouteMap = {
                1000: {
                    "msg": "c2s_auth_key",
                    "excute": null
                },
                1001: {
                    "msg": "s2c_auth_key",
                    "excute": _this.excuteLoginServer
                },
                1002: {
                    "msg": "p_role_base",
                    "excute": null
                },
                1003: {
                    "msg": "p_kv",
                    "excute": null
                },
                1004: {
                    "msg": "c2s_heart_beat",
                    "excute": null
                },
                1005: {
                    "msg": "s2c_heart_beat",
                    "excute": _this.excuteHeartBeat
                },
                1006: {
                    "msg": "c2s_re_connect",
                    "excute": _this.excuteTmp
                },
            };
            return _this;
        }
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        ExcutePacketRoute.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ExcutePacketRoute();
            }
            return this.mInstance;
        };
        ExcutePacketRoute.prototype.get_msg = function (protoId) {
            var self = this;
            if (self.RouteMap[protoId] && self.RouteMap[protoId]["msg"]) {
                // console.log("msg: ", self.RouteMap[protoId]);
                return self.RouteMap[protoId]["msg"];
            }
        };
        ExcutePacketRoute.prototype.route = function (protoId, datas) {
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if (self.RouteMap[protoId] && self.RouteMap[protoId]["excute"]) {
                self.RouteMap[protoId]["excute"](protoId, datas);
            }
        };
        ExcutePacketRoute.prototype.excuteLoginServer = function (protoId, datas) {
            EIGame.LoginMainDlgUI.Instance().excutePacket(protoId, datas);
        };
        ExcutePacketRoute.prototype.excuteHeartBeat = function (protoId, datas) {
            EIGame.HeartBeatManager.Instance().excutePacket(protoId, datas);
        };
        ExcutePacketRoute.prototype.excuteTmp = function (protoId, datas) {
            var pb = EIGame.ProtocolManager.Instance().decodeMsg(protoId, datas);
        };
        return ExcutePacketRoute;
    }(EIGame.EISingleton));
    EIGame.ExcutePacketRoute = ExcutePacketRoute;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ExcutePacketRoute.js.map