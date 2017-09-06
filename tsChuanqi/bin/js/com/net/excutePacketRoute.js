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
    var excutePacketRoute = (function (_super) {
        __extends(excutePacketRoute, _super);
        function excutePacketRoute() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.RouteMap = {
                1000: {
                    "message": "c2s_auth_key",
                    "route": null
                },
                1001: {
                    "message": "s2c_auth_key",
                    "route": _this.excuteLoginServer
                },
                1002: {
                    "message": "p_role_base",
                    "route": null
                },
                1003: {
                    "message": "p_kv",
                    "route": null
                },
                1004: {
                    "message": "c2s_heart_beat",
                    "route": null
                },
                1005: {
                    "message": "s2c_heart_beat",
                    "route": _this.excuteHeartBeat
                },
                1006: {
                    "message": "c2s_re_connect",
                    "route": _this.excuteTmp
                },
            };
            return _this;
        }
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        excutePacketRoute.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new excutePacketRoute();
            }
            return this.mInstance;
        };
        excutePacketRoute.prototype.get_msg = function (protoId) {
            var self = this;
            if (self.RouteMap[protoId] && self.RouteMap[protoId]["message"]) {
                // console.log("msg: ", self.RouteMap[protoId]);
                return self.RouteMap[protoId]["message"];
            }
        };
        excutePacketRoute.prototype.route = function (protoId, datas) {
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if (self.RouteMap[protoId] && self.RouteMap[protoId]["route"]) {
                self.RouteMap[protoId]["route"](protoId, datas);
            }
        };
        //----------------------------------------------- execute -----------------------------------------------
        excutePacketRoute.prototype.excuteLoginServer = function (protoId, datas) {
            EIGame.ModelManager.Instance().getModel("Model_Login").excutePacket(protoId, datas);
        };
        excutePacketRoute.prototype.excuteHeartBeat = function (protoId, datas) {
            EIGame.HeartBeatManager.Instance().excutePacket(protoId, datas);
        };
        excutePacketRoute.prototype.excuteTmp = function (protoId, datas) {
            var pb = EIGame.ProtobufHelper.Instance().decodeMsg(protoId, datas);
            EIGame.ModelManager.Instance().getModel("Model_Login").excutePacket(protoId, datas);
        };
        return excutePacketRoute;
    }(EIGame.EISingleton));
    EIGame.excutePacketRoute = excutePacketRoute;
})(EIGame || (EIGame = {}));
