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
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loopRate = 1000;
            _this.mIsGameReady = false;
            _this.resLoaded = false;
            _this.pbMessageLoaded = false;
            return _this;
        }
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        GameManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new GameManager();
            }
            return this.mInstance;
        };
        GameManager.prototype.init = function () {
            var self = this;
            this.mGame.init();
            setInterval(function () {
                if (this.mGame != null && this.mIsGameReady == true) {
                    // NetWork.Instance().say_ai();
                }
            }, this.loopRate);
        };
        GameManager.prototype.setup = function (_game_) {
            this.mGame = _game_;
            return this;
        };
        GameManager.prototype.startGame = function () {
            this.setup(new EIGame.Game());
            this.init();
            this.mIsGameReady = true;
        };
        GameManager.prototype.isGamePlaying = function () {
            return this.mIsGameReady;
        };
        GameManager.prototype.exit = function () {
            console.log("游戏退出");
        };
        GameManager.mode = "2d";
        return GameManager;
    }(laya.events.EventDispatcher));
    EIGame.GameManager = GameManager;
})(EIGame || (EIGame = {}));
