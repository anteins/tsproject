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
            _this.mView = new ui.test.LoginMainDlgUI();
            _this._model = new EIGame.Model_Login();
            return _this;
        }
        View_Login.prototype.initView = function () {
            this.mView.btn_login.label = this._model.login_btn_name;
            this.mView.btn_cancel.label = this._model.cancel_btn_name;
            this.mView.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.mView.btn_relogin.on(laya.events.Event.CLICK, this, this.onReLoginClick);
            this.mView.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.mView.btn_close.on(laya.events.Event.CLICK, this, function () {
                EIGame.ViewManager.Instance().closeView("View_Login");
            });
            this.mView.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.mView.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);
            this.mView.TI_PASSWORD.type = "password";
            EIGame.GameManager.Instance().on("login_succ", this, this.enterGame);
            EIGame.GameManager.Instance().on("login_fail", this, this.loginFailed);
        };
        ;
        View_Login.prototype.onLoginClick = function () {
            var req = this._model.sendLoginServer(0);
        };
        ;
        View_Login.prototype.onReLoginClick = function () {
            var req = this._model.sendLoginServer(1);
        };
        View_Login.prototype.enterGame = function () {
            EIGame.ViewManager.Instance().closeView("View_Login");
            EIGame.ViewManager.Instance().openView("View_Game");
        };
        View_Login.prototype.loginFailed = function () {
            console.log("loginFailed~");
        };
        View_Login.prototype.onAccountInput = function (input) {
            this._model.account = input.text;
        };
        ;
        View_Login.prototype.onPasswordInput = function (input) {
            this._model.password = input.text;
        };
        ;
        View_Login.prototype.onExit = function () {
            EIGame.ViewManager.Instance().closeView("View_Login");
        };
        ;
        View_Login.prototype.release = function () {
            this.mView.btn_login.off(laya.events.Event.CLICK, this, this.onLoginClick);
            this.mView.btn_cancel.off(laya.events.Event.CLICK, this, this.onExit);
            this.mView.TI_ACCOUNT.off(laya.events.Event.INPUT, this, this.onAccountInput);
            this.mView.TI_PASSWORD.off(laya.events.Event.INPUT, this, this.onPasswordInput);
        };
        return View_Login;
    }(EIGame.View_Base));
    EIGame.View_Login = View_Login;
})(EIGame || (EIGame = {}));
