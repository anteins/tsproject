var EIGame;
(function (EIGame) {
    var Model_Equip = (function () {
        function Model_Equip() {
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
        Model_Equip.prototype.sendLoginServer = function (isRelogin) {
            if (isRelogin === void 0) { isRelogin = 0; }
            var self = this;
            // NetWork.Instance().sendPacket(1000, buffer);
        };
        Model_Equip.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            var pb = EIGame.ProtobufHelper.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        };
        return Model_Equip;
    }());
    EIGame.Model_Equip = Model_Equip;
})(EIGame || (EIGame = {}));
