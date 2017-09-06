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
    var View_Game = (function (_super) {
        __extends(View_Game, _super);
        function View_Game(node) {
            if (node === void 0) { node = null; }
            var _this = _super.call(this) || this;
            _this.mView = new ui.test.GameSceneUI();
            _this._model = new EIGame.Model_Login();
            return _this;
        }
        View_Game.prototype.initView = function () {
            var self = this;
            this.mView.GAME_BTN_CHANGE.on(laya.events.Event.CLICK, this, function () {
                EIGame.LoginManager.changeAccount();
            });
            this.mView.GAME_BTN_BREAK.on(laya.events.Event.CLICK, this, function () {
                EIGame.LoginManager.breakTest();
            });
            this.mView.GAME_BTN_EXIT.on(laya.events.Event.CLICK, this, function () {
                EIGame.NetWork.Instance().closeConnect();
            });
            this.mView.GAME_BTN_CLOSE.on(laya.events.Event.CLICK, this, function () {
                EIGame.ViewManager.Instance().closeView("View_Game");
            });
        };
        ;
        View_Game.prototype.onExit = function () {
            this.exit();
        };
        ;
        View_Game.prototype.release = function () {
        };
        return View_Game;
    }(EIGame.View_Base));
    EIGame.View_Game = View_Game;
})(EIGame || (EIGame = {}));
