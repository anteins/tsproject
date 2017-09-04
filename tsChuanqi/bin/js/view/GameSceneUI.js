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
            _this.LoadView("ui.test.GameSceneUI", function () {
                return new ui.test.GameSceneUI();
            });
            return _this;
        }
        View_Game.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.View_Game();
            }
            return this.mInstance;
        };
        View_Game.show = function () {
            this.Instance().show();
        };
        View_Game.prototype.initView = function () {
            var self = this;
            this.view.GAME_BTN_CHANGE.on(laya.events.Event.CLICK, this, function () {
                EIGame.LoginManager.changeAccount();
            });
            this.view.GAME_BTN_BREAK.on(laya.events.Event.CLICK, this, function () {
                EIGame.LoginManager.breakTest();
            });
            this.view.GAME_BTN_EXIT.on(laya.events.Event.CLICK, this, function () {
                EIGame.ei_network.Instance().closeConnect();
            });
        };
        ;
        View_Game.prototype.onLogin = function () {
        };
        ;
        View_Game.prototype.onExit = function () {
            this.exit();
        };
        ;
        View_Game.prototype.release = function () {
        };
        return View_Game;
    }(EIGame.ViewManager));
    EIGame.View_Game = View_Game;
})(EIGame || (EIGame = {}));
