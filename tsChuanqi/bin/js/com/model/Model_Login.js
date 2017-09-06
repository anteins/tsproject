var EIGame;
(function (EIGame) {
    var Model_Login = (function () {
        function Model_Login() {
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
        Model_Login.prototype.loginInfo = function () {
            //测试数据
            var time_mix = EIGame.timeUtil.getTimeStamp();
            var os = EIGame.PlatformUtil.getPlatform();
            this.token = "123456";
            var info = {
                "uid": this.account,
                "key": this.key,
                "agent_id": 1235,
                "server_id": 5555,
                "platform": 12,
                "token": this.token,
                "channel": this.channel,
                "sub_channel": this.sub_channel,
                "time_mix": time_mix,
                "os": os,
                "cpu_num": 6,
                "front_version": "v1.2"
            };
            return info;
        };
        Model_Login.prototype.sendLoginServer = function (isRelogin) {
            if (isRelogin === void 0) { isRelogin = 0; }
            var self = this;
            var info = self.loginInfo();
            var buffer = EIGame.ProtobufHelper.Instance().encodeMsg(1000, {
                uid: info["uid"],
                key: info["key"],
                frontVersion: info["front_version"],
                agentId: info["agent_id"],
                serverId: info["server_id"],
                platform: info["platform"],
                isReconnect: isRelogin,
                imei: "imei_120",
                device: "device_120",
                phoneSystem: "phone_system_120",
                sessionId: "session_id_120",
                time: "time_120"
            });
            console.log("账号 ", this.account);
            console.log("uid ", info["uid"]);
            console.log("密码 ", this.password);
            console.log("userId ", this.account);
            console.log("token ", this.token);
            console.log("channel ", this.channel);
            console.log("时间戳 ", info["time_mix"]);
            console.log("OS ", info["os"]);
            console.log("平台 ", info["platform"]);
            console.log("重连 ", isRelogin);
            EIGame.NetWork.Instance().sendPacket(1000, buffer);
        };
        Model_Login.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            // var pb:any = ProtobufHelper.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            // console.log("[login] 登录返回pb: ", pb);
            EIGame.GameManager.Instance().event("login_succ");
        };
        return Model_Login;
    }());
    EIGame.Model_Login = Model_Login;
})(EIGame || (EIGame = {}));
