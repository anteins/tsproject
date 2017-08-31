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
    var GameSceneUI = (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI(node) {
            if (node === void 0) { node = null; }
            var _this = _super.call(this) || this;
            _this.LoadView("ui.test.GameSceneUI", function () {
                return new ui.test.GameSceneUI();
            });
            return _this;
        }
        GameSceneUI.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.GameSceneUI();
            }
            return this.mInstance;
        };
        GameSceneUI.show = function () {
            this.Instance().show();
        };
        GameSceneUI.prototype.initView = function () {
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
        GameSceneUI.prototype.onLogin = function () {
        };
        ;
        GameSceneUI.prototype.onExit = function () {
            this.exit();
        };
        ;
        GameSceneUI.prototype.release = function () {
        };
        return GameSceneUI;
    }(EIGame.UIPlane));
    EIGame.GameSceneUI = GameSceneUI;
})(EIGame || (EIGame = {}));
