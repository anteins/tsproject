var EIGame;
(function (EIGame) {
    //protocol route
    var excuteProtocol = (function () {
        function excuteProtocol() {
            this.id = 0;
            this.RouteMap = {
                1001: this.excuteLoginServer,
                1005: this.excuteHeartBeat,
                1006: this.excuteTmp,
            };
            this.bytes = new Laya.Byte();
        }
        excuteProtocol.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new excuteProtocol();
            }
            return this.mInstance;
        };
        excuteProtocol.prototype.route = function (protoId, datas) {
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if (self.RouteMap[protoId]) {
                self.RouteMap[protoId](protoId, datas);
            }
        };
        excuteProtocol.prototype.excuteLoginServer = function (protoId, datas) {
            EIGame.LoginMainDlgUI.Instance().excutePacket(protoId, datas);
        };
        excuteProtocol.prototype.excuteHeartBeat = function (protoId, datas) {
            EIGame.HeartCell.Instance().excutePacket(protoId, datas);
        };
        excuteProtocol.prototype.excuteTmp = function (protoId, datas) {
            // console.log("~ 1006 ~ ", datas);
            var pb = EIGame.pbManager.Instance().decodeMsg(protoId, datas);
        };
        return excuteProtocol;
    }());
    EIGame.excuteProtocol = excuteProtocol;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=excuteProtocol.js.map