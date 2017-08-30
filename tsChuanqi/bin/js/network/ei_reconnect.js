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
    var ei_reconnect = (function (_super) {
        __extends(ei_reconnect, _super);
        function ei_reconnect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state_start = 0;
            _this.state_wait = 1;
            _this.state_reconnect = 2;
            _this.state_end = 3;
            _this.state = 0;
            //等待网络
            _this.wait_online_sec = 0;
            _this.wait_online_max_sec = 1000;
            //等待连接
            _this.try_reconnect_sec = 0;
            _this.try_reconnect_max_sec = 500;
            _this.try_reconnect_count = 0;
            _this.try_reconnect_max_count = 3;
            _this.cur_online_state = false;
            _this.mIsBreak = false;
            _this.mInited = false;
            _this.tag = "重连";
            _this.configs = [
                "ws://192.168.2.65:8181"
            ];
            return _this;
        }
        ei_reconnect.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ei_reconnect();
            }
            return this.mInstance;
        };
        ei_reconnect.prototype.init = function () {
            this.mInited = true;
            Laya.timer.loop(1, this, this.InWaitingState);
            this.toStart();
        };
        ei_reconnect.prototype.break = function () {
        };
        ei_reconnect.prototype.reConnect = function (url) {
            var self = this;
            try {
                EIGame.ei_network.Instance().reConnect(url);
            }
            catch (err) {
                console.log(this.state_tag() + "error ", err);
                this.onReConnectError();
            }
        };
        ei_reconnect.prototype.reConnectFailed = function () {
            console.log(this.state_tag() + "重连失败");
            this.try_reconnect_count++;
            if (this.try_reconnect_count > this.try_reconnect_max_count) {
                console.log(this.state_tag() + "重连次数已满...");
                this.toEnd();
                return;
            }
        };
        ei_reconnect.prototype.onlineChanged = function (isonline) {
            var tmp = this.cur_online_state == isonline;
            // console.log("[重连] 监听", tmp);
            //断网
            if (tmp == false) {
                if (this.isStarting()) {
                    this.toWait();
                }
                //恢复网络
            }
            else {
                if (this.isWaitting()) {
                    this.toReconnect();
                }
                else if (this.isReconnecting()) {
                    this.toWait();
                }
            }
        };
        ei_reconnect.prototype.onHeartBeatTimeOut = function () {
            console.log(this.state_tag() + "心跳包超时");
            if (this.isStarting()) {
                this.toReconnect();
            }
        };
        ei_reconnect.prototype.onSocketReConnected = function () {
            if (this.isReconnecting()) {
                console.log(this.state_tag() + "重连成功");
                this.toStart();
            }
            else if (this.isWaitting()) {
                console.log(this.state_tag() + "低频重连成功");
                this.toStart();
            }
        };
        ei_reconnect.prototype.onReConnectError = function () {
            if (this.isReconnecting()) {
                this.toEnd();
            }
        };
        //连接异常
        ei_reconnect.prototype.onConnectingException = function (tips, e) {
            console.log(this.state_tag() + "触发!", e);
            // ei_network.Instance().test_down_online();
            if (!this.mInited)
                return;
            if (this.isReconnecting()) {
                this.reConnectFailed();
                return;
            }
            //缺少配置不进行重连
            if (!this.hasConfig()) {
                this.toEnd();
            }
            //重复确认一次连接情况
            if (EIGame.ei_network.Instance().connected()) {
                this.toStart();
                return;
            }
            //等待一段时间连接上网络
            if (this.isStarting()) {
                this.toWait();
                return;
            }
        };
        ei_reconnect.prototype.hasConfig = function () {
            return this.configs && this.configs.length > 0;
        };
        ei_reconnect.prototype.isStarting = function () {
            return this.state == this.state_start;
        };
        ei_reconnect.prototype.isWaitting = function () {
            return this.state == this.state_wait;
        };
        ei_reconnect.prototype.isReconnecting = function () {
            return this.state == this.state_reconnect;
        };
        ei_reconnect.prototype.isEnding = function () {
            return this.state == this.state_end;
        };
        ei_reconnect.prototype.curState = function () {
            if (this.isStarting()) {
                return "start";
            }
            else if (this.isWaitting()) {
                return "wait";
            }
            else if (this.isReconnecting()) {
                return "reconnect";
            }
            else if (this.isEnding()) {
                return "end";
            }
        };
        ei_reconnect.prototype.toStart = function () {
            if (this.isEnding())
                return;
            // console.log(this.state_tag() + "==> START");
            if (this.isWaitting()) {
                this.reset_wait();
            }
            if (this.isReconnecting()) {
                EIGame.HeartBeatManager.Instance().reset();
                EIGame.HeartBeatManager.Instance().checkHeartBeat();
            }
            this.state = this.state_start;
        };
        ei_reconnect.prototype.toReconnect = function () {
            if (!this.mInited)
                return;
            // console.log(this.state_tag() + "==> RECONNECT");
            if (this.isWaitting()) {
                this.reset_wait();
            }
            else if (this.isEnding()) {
                this.reset_reconnect();
            }
            this.state = this.state_reconnect;
            if (this.hasConfig()) {
                this.reConnect(this.getConfigURL());
            }
        };
        ei_reconnect.prototype.getConfigURL = function () {
            return this.configs[0];
        };
        ei_reconnect.prototype.InWaitingState = function () {
            var self = this;
            if (!self.isWaitting())
                return;
            // console.log("[等待]", self.wait_online_sec, self.wait_online_max_sec);
            self.wait_online_sec++;
            self.try_reconnect_sec++;
            // console.log("[低频]", self.try_reconnect_sec, self.try_reconnect_max_sec);
            if (self.wait_online_sec < self.wait_online_max_sec) {
                //socket连接
                if (EIGame.ei_network.Instance().connected()) {
                    self.toStart();
                }
                //网络连接
                if (!EIGame.ei_network.Instance().IsOnline()) {
                    if (self.try_reconnect_sec >= self.try_reconnect_max_sec) {
                        self.try_reconnect_sec = 0;
                        console.log(this.state_tag() + "wait，尝试一次重连");
                        this.reConnect(self.configs[0]);
                    }
                }
                else {
                    console.log(this.state_tag() + "wait，网络恢复");
                    self.toReconnect();
                }
            }
            else {
                if (!EIGame.ei_network.Instance().IsOnline()) {
                    console.log(this.state_tag() + "wait，超时");
                    self.toEnd();
                }
                else {
                    console.log(this.state_tag() + "wait超时，网络恢复");
                    self.toReconnect();
                }
            }
        };
        ei_reconnect.prototype.state_tag = function () {
            var str = "[" + this.tag;
            if (this.isStarting()) {
                str = str + "start";
            }
            else if (this.isWaitting()) {
                str = str + "wait";
            }
            else if (this.isReconnecting()) {
                str = str + "reconnect";
            }
            else if (this.isEnding()) {
                str = str + "end";
            }
            str = str + "] ";
            return str;
        };
        ei_reconnect.prototype.toWait = function () {
            if (!this.mInited)
                return;
            // console.log(this.state_tag() + "==> WAIT");
            var self = this;
            if (this.isEnding())
                return;
            self.state = this.state_wait;
            self.reset_wait();
        };
        ei_reconnect.prototype.reset_wait = function () {
            var self = this;
            self.wait_online_sec = 0;
            self.try_reconnect_sec = 0;
        };
        ei_reconnect.prototype.reset_reconnect = function () {
            var self = this;
            self.try_reconnect_count = 0;
        };
        ei_reconnect.prototype.toEnd = function () {
            if (!this.mInited)
                return;
            // console.log(this.state_tag() + "==> END");
            if (this.isWaitting()) {
                this.reset_wait();
            }
            var self = this;
            this.state = self.state_end;
            EIGame.ei_network.Instance().clearConnect();
            self.showNetErrorDialog(function () {
                if (self.hasConfig()) {
                    self.toReconnect();
                }
                else {
                    EIGame.Game.exit();
                }
            }, function () {
                EIGame.Game.exit();
            });
        };
        ei_reconnect.prototype.showNetErrorDialog = function (onYes, onNo) {
            alert(this.state_tag() + "是否重连？");
            onYes();
        };
        return ei_reconnect;
    }(EIGame.EISingleton));
    EIGame.ei_reconnect = ei_reconnect;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_reconnect.js.map