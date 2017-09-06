var EIGame;
(function (EIGame) {
    var Model_Game = (function () {
        function Model_Game() {
            this.account = "";
            this.password = "";
            this.uid = "";
            this.key = "";
            this.token = "";
            this.channel = "channel";
            this.sub_channel = "sub_channel";
            this.login_btn_name = "";
            this.cancel_btn_name = "";
        }
        Model_Game.prototype.sendLoginServer = function (isRelogin) {
            if (isRelogin === void 0) { isRelogin = 0; }
            var self = this;
            // NetWork.Instance().sendPacket(1000, buffer);
        };
        Model_Game.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            var pb = EIGame.ProtobufHelper.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        };
        return Model_Game;
    }());
    EIGame.Model_Game = Model_Game;
})(EIGame || (EIGame = {}));
