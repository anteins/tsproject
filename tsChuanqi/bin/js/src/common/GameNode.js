var EIGame;
(function (EIGame) {
    var GameNode = (function () {
        function GameNode() {
        }
        GameNode.prototype.excute = function () {
            this.onEnter();
        };
        GameNode.prototype.onEnter = function () {
        };
        GameNode.prototype.exit = function () {
        };
        return GameNode;
    }());
    EIGame.GameNode = GameNode;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=GameNode.js.map