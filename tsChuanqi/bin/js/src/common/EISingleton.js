var EIGame;
(function (EIGame) {
    var EISingleton = (function () {
        function EISingleton() {
        }
        EISingleton.setup = function (newcb) {
            this.prototype.newcb = newcb;
        };
        EISingleton.prototype.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = this.newcb();
            }
            return this.mInstance;
        };
        return EISingleton;
    }());
    EIGame.EISingleton = EISingleton;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=EISingleton.js.map