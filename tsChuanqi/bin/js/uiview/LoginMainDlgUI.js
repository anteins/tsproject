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
            this.view.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_relogin.on(laya.events.Event.CLICK, this, this.onReLoginClick);
            this.view.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);
            this.view.TI_PASSWORD.type = "password";
        };
        ;
        LoginMainDlgUI.prototype.onLoginClick = function () {
            var self = this;
            var req = LoginMainDlgUI.Instance().sendLoginServer(0);
            console.log("[login] WS", req);
        };
        ;
        LoginMainDlgUI.prototype.onReLoginClick = function () {
            var self = this;
            var req = LoginMainDlgUI.Instance().sendLoginServer(1);
            console.log("[RElogin] WS", req);
        };
        LoginMainDlgUI.prototype.enterGame = function () {
            this.exit();
            EIGame.GameSceneUI.show();
        };
        LoginMainDlgUI.prototype.onAccountInput = function (input) {
            this.account = input.text;
        };
        ;
        LoginMainDlgUI.prototype.onPasswordInput = function (input) {
            this.password = input.text;
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
        LoginMainDlgUI.prototype.sendLoginServer = function (isRelogin) {
            if (isRelogin === void 0) { isRelogin = 0; }
            var self = this;
            var info = self.loginInfo();
            var buffer = EIGame.ProtocolManager.encodeMsg(1000, {
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
            EIGame.ei_network.Instance().sendPacket(1000, buffer);
        };
        LoginMainDlgUI.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            var pb = EIGame.ProtocolManager.decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        };
        return LoginMainDlgUI;
    }(EIGame.UIPlane));
    EIGame.LoginMainDlgUI = LoginMainDlgUI;
})(EIGame || (EIGame = {}));
