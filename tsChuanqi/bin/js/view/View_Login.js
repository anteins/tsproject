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
    var View_Login = (function (_super) {
        __extends(View_Login, _super);
        function View_Login(node) {
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
        View_Login.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.View_Login();
            }
            return this.mInstance;
        };
        View_Login.show = function () {
            this.Instance().show();
        };
        View_Login.prototype.initView = function () {
            this.view.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_relogin.on(laya.events.Event.CLICK, this, this.onReLoginClick);
            this.view.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);
            this.view.TI_PASSWORD.type = "password";
        };
        ;
        View_Login.prototype.onLoginClick = function () {
            var self = this;
            var req = View_Login.Instance().sendLoginServer(0);
            console.log("[login] WS", req);
        };
        ;
        View_Login.prototype.onReLoginClick = function () {
            var self = this;
            var req = View_Login.Instance().sendLoginServer(1);
            console.log("[RElogin] WS", req);
        };
        View_Login.prototype.enterGame = function () {
            this.exit();
            EIGame.View_Game.show();
        };
        View_Login.prototype.onAccountInput = function (input) {
            this.account = input.text;
        };
        ;
        View_Login.prototype.onPasswordInput = function (input) {
            this.password = input.text;
        };
        ;
        View_Login.prototype.onExit = function () {
            this.exit();
        };
        ;
        View_Login.prototype.release = function () {
            this.view.btn_login.off(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_cancel.off(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.off(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.off(laya.events.Event.INPUT, this, this.onPasswordInput);
        };
        View_Login.prototype.loginInfo = function () {
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
        View_Login.prototype.sendLoginServer = function (isRelogin) {
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
        View_Login.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            var pb = EIGame.ProtocolManager.decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        };
        return View_Login;
    }(EIGame.ViewManager));
    EIGame.View_Login = View_Login;
})(EIGame || (EIGame = {}));
