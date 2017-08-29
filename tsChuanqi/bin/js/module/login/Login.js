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
    var Login = (function (_super) {
        __extends(Login, _super);
        function Login() {
            return _super.call(this) || this;
        }
        Login.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new Login();
            }
            return this.mInstance;
        };
        Login.prototype.onEnter = function () {
            console.log("[Login] onEnter");
            if (this.uiView)
                return;
            console.log("[Login] come in");
            this.uiView = EIGame.LoginMainDlgUI.Instance();
            this.uiView.show();
        };
        Login.prototype.exit = function () {
            if (this.uiView) {
                this.uiView.exit();
                this.uiView = null;
            }
        };
        Login.prototype.changeAccount = function () {
        };
        Login.prototype.breakTest = function () {
        };
        Login.prototype.excutePacket = function (protoId, datas) {
            if (this.uiView) {
                this.uiView.excutePacket(protoId, datas);
            }
        };
        return Login;
    }(EIGame.GameNode));
    EIGame.Login = Login;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=Login.js.map