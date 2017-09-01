var EIGame;
(function (EIGame) {
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.init = function () {
            var self = this;
            this.mGame.init();
            setInterval(function () {
                if (this.mGame != null && this.mIsGameReady == true) {
                    // ei_network.Instance().say_ai();
                }
            }, this.loopRate);
        };
        GameManager.setup = function (_game_) {
            this.mGame = _game_;
            return this;
        };
        GameManager.startGame = function () {
            this.setup(new EIGame.Game());
            this.init();
            this.mIsGameReady = true;
        };
        GameManager.isStarted = function () {
            return this.mIsGameReady;
        };
        GameManager.Scene = function () {
            return this.mGame.scene;
        };
        GameManager.exit = function () {
            console.log("游戏退出");
        };
        GameManager.mode = "2d";
        GameManager.loopRate = 1000;
        GameManager.mIsGameReady = false;
        GameManager.resLoaded = false;
        GameManager.pbMessageLoaded = false;
        return GameManager;
    }());
    EIGame.GameManager = GameManager;
})(EIGame || (EIGame = {}));
