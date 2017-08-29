var EIGame;
(function (EIGame) {
    var ei_reconnect = (function () {
        function ei_reconnect() {
            this.state_start = 0;
            this.state_wait = 1;
            this.state_reconnect = 2;
            this.state_end = 3;
            this.state = 0;
            //等待网络
            this.wait_online_sec = 0;
            this.wait_online_max_sec = 2000;
            //等待连接
            this.try_reconnect_sec = 0;
            this.try_reconnect_max_sec = 500;
            this.try_reconnect_count = 0;
            this.try_reconnect_max_count = 3;
            this.cur_online_state = false;
            this.mIsBreak = false;
            this.mInited = false;
            this.reconnectUrl = [
                "ws://192.168.2.65:8181"
            ];
        }
        ei_reconnect.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ei_reconnect();
            }
            return this.mInstance;
        };
        ei_reconnect.prototype.init = function () {
            this.mInited = true;
            this.toStart();
        };
        ei_reconnect.prototype.break = function () {
        };
        ei_reconnect.prototype.reConnect = function (url) {
            var self = this;
            try {
                this.try_reconnect_count++;
                if (this.try_reconnect_count > this.try_reconnect_max_count) {
                    console.log("[重连机制] 重连次数已满...");
                    self.toEnd();
                    return;
                }
                EIGame.SocketServer.Instance().reConnect(url);
            }
            catch (err) {
                console.log("[重连机制] error ", err);
                this.onReConnectError();
            }
        };
        ei_reconnect.prototype.onlineChanged = function (isonline) {
            var tmp = this.cur_online_state == isonline;
            console.log("[重连机制] 监听", tmp);
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
        ei_reconnect.prototype.onHeartCellTimeOut = function () {
            console.log("[重连] 心跳包超时");
            if (this.isStarting()) {
                this.toReconnect();
            }
        };
        ei_reconnect.prototype.onSocketReConnected = function () {
            if (this.isReconnecting()) {
                console.log("[重连] 重连成功");
                this.toStart();
            }
            else if (this.isWaitting()) {
                console.log("[重连] 低频重连成功");
                this.toStart();
            }
        };
        ei_reconnect.prototype.onReConnectError = function () {
            if (this.isReconnecting()) {
                this.toEnd();
            }
        };
        //连接异常
        ei_reconnect.prototype.onConnectingWarning = function (tips, e) {
            console.log("触发重连", tips, e);
            EIGame.ei_network.Instance().test_down_online();
            if (!this.mInited)
                return;
            if (!this.hasConfig()) {
                this.toEnd();
            }
            if (this.isStarting()) {
                this.toWait();
                return;
            }
        };
        ei_reconnect.prototype.hasConfig = function () {
            return this.reconnectUrl && this.reconnectUrl.length > 0;
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
        ei_reconnect.prototype.toStart = function () {
            if (this.isEnding())
                return;
            console.log("重连==>START");
            if (this.isWaitting()) {
                this.reset_wait();
            }
            if (this.isReconnecting()) {
                EIGame.HeartCell.Instance().reset();
                EIGame.HeartCell.Instance().checkHeartBeat();
            }
            this.state = this.state_start;
        };
        ei_reconnect.prototype.toReconnect = function () {
            if (!this.mInited)
                return;
            console.log("重连==>RECONNECT");
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
            return this.reconnectUrl[0];
        };
        ei_reconnect.prototype.InWaitingState = function () {
            var self = this;
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
                        console.log("[等待] 尝试一次重连");
                        // this.reConnect(self.reconnectUrl[0]);  
                    }
                }
                else {
                    console.log("网络恢复");
                    self.toReconnect();
                }
            }
            else {
                if (!EIGame.ei_network.Instance().IsOnline()) {
                    console.log("超时");
                    self.reset_wait();
                    self.toEnd();
                }
                else {
                    console.log("超时, 网络恢复");
                    self.toReconnect();
                }
            }
        };
        ei_reconnect.prototype.toWait = function () {
            if (!this.mInited)
                return;
            console.log("重连==>WAIT");
            var self = this;
            if (this.isEnding())
                return;
            self.state = this.state_wait;
            self.reset_wait();
            Laya.timer.loop(1, this, this.InWaitingState);
        };
        ei_reconnect.prototype.reset_wait = function () {
            var self = this;
            Laya.timer.clear(this, this.InWaitingState);
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
            console.log("重连==>END");
            if (this.isWaitting()) {
                this.reset_wait();
            }
            var self = this;
            this.state = self.state_end;
            EIGame.ei_network.Instance().ClosedConnectFinall();
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
            alert("是否重连？");
            onYes();
        };
        return ei_reconnect;
    }());
    EIGame.ei_reconnect = ei_reconnect;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_reconnect.js.map