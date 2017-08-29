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
            if (this.mInstace == null) {
                this.mInstace = new Login();
            }
            return this.mInstace;
        };
        Login.prototype.excute = function () {
            this.openUI();
        };
        Login.prototype.openUI = function () {
            if (this.login_ui)
                return;
            EIGame.LoginMainDlgUI.show();
        };
        Login.prototype.exit = function () {
            if (this.login_ui) {
                this.login_ui.exit();
            }
        };
        Login.prototype.changeAccount = function () {
        };
        Login.prototype.breakTest = function () {
        };
        return Login;
    }(EIGame.GameNode));
    EIGame.Login = Login;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=Login.js.map