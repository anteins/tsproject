var EIGame;
(function (EIGame) {
    var LoginManager = (function () {
        function LoginManager() {
        }
        LoginManager.init = function () {
            console.log("DEBUG_MODE ", EIGame.DEBUG_MODE);
            if (EIGame.DEBUG_MODE) {
                this.http_url = "http://192.168.2.65:9090";
                this.socket_url = "ws://192.168.2.65:8181";
            }
            else {
                this.http_url = "http://121.42.145.252:9090";
                this.socket_url = "ws://121.42.145.252:443/websocket";
            }
        };
        LoginManager.changeAccount = function () {
            EIGame.ViewStackManager.Instance().removeAllUIPlane();
            // MainScene.clear();
            EIGame.View_Login.show();
        };
        LoginManager.breakTest = function () {
        };
        LoginManager.prototype.onloginSucc = function (next) {
            if (next) {
                next();
            }
        };
        LoginManager.http_url = "http://192.168.2.65:9090";
        LoginManager.socket_url = "ws://192.168.2.65:8181";
        LoginManager.isLogined = false;
        return LoginManager;
    }());
    EIGame.LoginManager = LoginManager;
})(EIGame || (EIGame = {}));
