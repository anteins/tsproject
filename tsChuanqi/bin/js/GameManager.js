var EIGame;
(function (EIGame) {
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.Instance = function () {
            if (this.mInstace == null) {
                this.mInstace = new EIGame.GameManager();
            }
            return this.mInstace;
        };
        GameManager.prototype.setup = function (game) {
            this.mGame = game;
            this.mGame.init();
        };
        GameManager.prototype.mainSence = function () {
            return this.mGame.scene;
        };
        return GameManager;
    }());
    EIGame.GameManager = GameManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=GameManager.js.map