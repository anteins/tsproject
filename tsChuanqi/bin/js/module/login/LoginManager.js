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
    var LoginManager = (function (_super) {
        __extends(LoginManager, _super);
        function LoginManager() {
            var _this = _super.call(this) || this;
            _this.http_url = "";
            _this.socket_url = "";
            _this.isLogined = false;
            return _this;
        }
        LoginManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new LoginManager();
            }
            return this.mInstance;
        };
        LoginManager.prototype.init = function () {
            var self = this;
            console.log("DEBUG_MODE ", EIGame.DEBUG_MODE);
            if (EIGame.DEBUG_MODE) {
                self.http_url = "http://192.168.2.65:9090";
                self.socket_url = "ws://192.168.2.65:8181";
            }
            else {
                self.http_url = "http://121.42.145.252:9090";
                self.socket_url = "ws://121.42.145.252:443/websocket";
            }
        };
        LoginManager.prototype.changeAccount = function () {
            EIGame.UIStackManager.Instance().removeAllUIPlane();
            // MainScene.clear();
            EIGame.LoginMainDlgUI.show();
        };
        LoginManager.prototype.breakTest = function () {
        };
        LoginManager.prototype.onloginSucc = function (next) {
            if (next) {
                next();
            }
        };
        return LoginManager;
    }(EIGame.GameNode));
    EIGame.LoginManager = LoginManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=LoginManager.js.map