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
    var LoginMainDlgUI = (function (_super) {
        __extends(LoginMainDlgUI, _super);
        function LoginMainDlgUI(node) {
            if (node === void 0) { node = null; }
            var _this = _super.call(this) || this;
            _this.account = "";
            _this.password = "";
            _this.uid = "";
            _this.key = "";
            _this.token = "";
            _this.channel = "channel";
            _this.sub_channel = "sub_channel";
            _this.isLogined = false;
            _this.http_url = "http://192.168.2.65:9090";
            _this.socket_url = "ws://localhost:8181";
            _this.loginManager = node;
            _this.LoadView("ui.test.LoginMainDlgUI", function () {
                return new ui.test.LoginMainDlgUI();
            });
            return _this;
        }
        LoginMainDlgUI.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.LoginMainDlgUI();
            }
            return this.mInstance;
        };
        LoginMainDlgUI.show = function () {
            this.Instance().show();
        };
        LoginMainDlgUI.prototype.initView = function () {
            // //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
            // this.addActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin);
            // // this.addActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin2);
            // this.addActionEvent(this.view.btn_cancel, laya.events.Event.CLICK, this, this.onExit);
            // this.addActionEvent(this.view.TI_ACCOUNT, laya.events.Event.INPUT, this, this.onAccountInput);
            // this.addActionEvent(this.view.TI_PASSWORD, laya.events.Event.INPUT, this, this.onPasswordInput);
            // this.removeActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin);
            // this.removeActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, ()=>{
            // });
            this.view.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);
            this.view.TI_PASSWORD.type = "password";
        };
        ;
        LoginMainDlgUI.prototype.onLoginClick = function () {
            console.log("onLogin");
            var info = this.loginInfo();
            this.sendLoginServer(info, 0);
        };
        ;
        LoginMainDlgUI.prototype.enterGame = function () {
            var self = this;
            self.exit();
            EIGame.GameSceneUI.show();
        };
        LoginMainDlgUI.prototype.setAccount = function (text) {
            this.account = text;
        };
        LoginMainDlgUI.prototype.setPassword = function (text) {
            this.password = text;
        };
        LoginMainDlgUI.prototype.onAccountInput = function (input) {
            console.log("onAccInput: ", input.text);
            this.setAccount(input.text);
        };
        ;
        LoginMainDlgUI.prototype.onPasswordInput = function (input) {
            console.log("onPwdInput: ", input.text);
            this.setPassword(input.text);
        };
        ;
        LoginMainDlgUI.prototype.onExit = function () {
            this.exit();
        };
        ;
        LoginMainDlgUI.prototype.release = function () {
            this.view.btn_login.off(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_cancel.off(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.off(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.off(laya.events.Event.INPUT, this, this.onPasswordInput);
        };
        LoginMainDlgUI.prototype.IsLogined = function () {
            return this.isLogined;
        };
        LoginMainDlgUI.prototype.loginInfo = function () {
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
        LoginMainDlgUI.prototype.sendLoginServer = function (info, isRelogin) {
            var _this = this;
            if (isRelogin === void 0) { isRelogin = 0; }
            var self = this;
            EIGame.pbManager.Instance().load("pb.proto", function (err, root) {
                var buffer = EIGame.pbManager.Instance().encodeMsg("pb.proto", 1000, {
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
                console.log("账号 ", _this.account);
                console.log("uid ", info["uid"]);
                console.log("密码 ", _this.password);
                console.log("userId ", _this.account);
                console.log("token ", _this.token);
                console.log("channel ", _this.channel);
                console.log("时间戳 ", info["time_mix"]);
                console.log("OS ", info["os"]);
                console.log("平台 ", info["platform"]);
                console.log("重连 ", isRelogin);
                var req_buffer = EIGame.ei_network.Instance().pack(1000, buffer);
                EIGame.httpServer.Instance().require4(_this.http_url, req_buffer, "post", "text", function (data) {
                    if (1) {
                        console.log("登录服务器返回", data, typeof data);
                        self.excutePacket_test();
                        EIGame.LoginManager.Instance().onloginSucc(function () {
                            self.afterLogined();
                        });
                    }
                });
            });
        };
        LoginMainDlgUI.prototype.afterLogined = function () {
            var _this = this;
            EIGame.ei_network.Instance().initConnect(this.socket_url, function (e) {
                _this.enterGame();
            });
        };
        LoginMainDlgUI.prototype.excutePacket_test = function () {
            var self = this;
            EIGame.pbManager.Instance().load("pb.proto", function (err, root) {
                var Message = root.lookup(EIGame.PROTOCOL_ID[1001]);
                var ss = [0, 0, 3, 233, 10, 4, 118, 49, 46, 49, 16, 100, 24, 199, 1, 33, 0, 0, 0, 0, 128, 179, 197, 64, 42, 48, 9, 0, 0, 0, 0, 0, 72, 143, 64, 18, 5, 110, 105, 104, 97, 111, 26, 5, 104, 101, 108, 108, 111, 32, 233, 7, 40, 10, 48, 40, 56, 228, 2, 64, 10, 72, 1, 80, 199, 15, 88, 225, 223, 228, 18, 104, 215, 8, 56, 245, 78, 72, 135, 93, 80, 215, 8];
                var byte = new Laya.Byte(ss);
                var _a = EIGame.ei_network.Instance().unpack(byte), id = _a[0], datas = _a[1];
                id = id;
                datas = datas;
                // byte.endian = Laya.Byte.BIG_ENDIAN;
                // byte.pos = 0;
                // var id = byte.getUint32();
                // var uint8 = byte.getUint8Array(4, ss.length);
                var pb = Message.decode(datas);
                console.log("预备Byte id ", id);
                console.log("预备Byte pb: ", pb, datas.length);
            });
        };
        LoginMainDlgUI.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            EIGame.pbManager.Instance().load("pb.proto", function (err, root) {
                console.log("login excutePacket ", protoId, EIGame.PROTOCOL_ID[protoId]);
                var pb = EIGame.pbManager.Instance().decodeMsg("pb.proto", protoId, datas);
                console.log("预备Byte id ", protoId);
                console.log("预备Byte pb: ", pb);
            });
        };
        return LoginMainDlgUI;
    }(EIGame.UIPlane));
    EIGame.LoginMainDlgUI = LoginMainDlgUI;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=LoginMainDlgUI.js.map