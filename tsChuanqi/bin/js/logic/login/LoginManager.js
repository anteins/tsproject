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
            return _super.call(this) || this;
        }
        LoginManager.excute = function () {
            this.openUI();
        };
        LoginManager.openUI = function () {
        };
        return LoginManager;
    }(EIGame.GameNode));
    EIGame.LoginManager = LoginManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=LoginManager.js.map