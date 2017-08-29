var EIGame;
(function (EIGame) {
    //网络重连检测
    var Reachability = (function () {
        function Reachability() {
        }
        Reachability.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new Reachability();
            }
            return this.mInstance;
        };
        Reachability.prototype.AddListener = function () {
            if (Laya.Render.isConchApp) {
                conch.setNetworkEvtFunction(function (type) {
                    // NET_NO = 0;
                    // NET_WIFI = 1;
                    // NET_2G = 2;
                    // NET_3G = 3;
                    // NET_4G = 4;
                    // NET_UNKNOWN=5
                    alert(type);
                });
            }
        };
        Reachability.prototype.RemoveListener = function () {
        };
        Reachability.prototype.CheckConnectState = function () {
            // console.log("CheckConnectState ");
            if (Laya.Render.isConchApp) {
                var nType = conch.config.getNetworkType();
                console.log("网络状态 ", nType);
            }
            // var state = _check();
            // if(state){
            //     let count = 0;
            //     while(count < this.try_time){
            //         this.ReConnect();
            //         count++;
            //     }
            // }
        };
        Reachability.prototype.ReConnect = function () {
        };
        Reachability.prototype.ReachabilityWithAddress = function (address) {
            return true;
        };
        Reachability.prototype.CurState = function () {
        };
        Reachability.STAT_START = 0; //网络正常状态，简称S
        Reachability.STAT_WAIT = 1; //网络已经断开，等待网络恢复，简称W
        Reachability.STAT_RECONNECT = 2; //重新连接状态，简称R
        Reachability.STAT_END = 3; //重新连接失败，简称E
        return Reachability;
    }());
    EIGame.Reachability = Reachability;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=Reachability.js.map