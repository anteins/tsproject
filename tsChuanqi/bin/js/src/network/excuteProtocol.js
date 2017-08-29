var EIGame;
(function (EIGame) {
    //protocol route
    var excuteProtocol = (function () {
        function excuteProtocol() {
            var _this = this;
            this.id = 0;
            this.RouteMap = {
                1001: function () { _this.excuteLoginServer; },
            };
            this.bytes = new Laya.Byte();
        }
        excuteProtocol.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new excuteProtocol();
            }
            return this.mInstance;
        };
        excuteProtocol.prototype.Id = function () {
            return this.id;
        };
        excuteProtocol.prototype.Datas = function () {
            return this.bytes;
        };
        excuteProtocol.prototype.route = function (protoId, datas) {
            var self = this;
            if (self.RouteMap[protoId]) {
                self.bytes.clear();
                // self.id = protoId;
                // self.bytes = datas;
                self.RouteMap[protoId](protoId, datas);
            }
        };
        excuteProtocol.prototype.excuteLoginServer = function (protoId, datas) {
            EIGame.LoginMainDlgUI.Instance().excutePacket(protoId, datas);
        };
        return excuteProtocol;
    }());
    EIGame.excuteProtocol = excuteProtocol;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=excuteProtocol.js.map