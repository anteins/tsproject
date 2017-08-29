var EIGame;
(function (EIGame) {
    var UIStackManager = (function () {
        function UIStackManager() {
            this.uistack = new Array();
        }
        UIStackManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.UIStackManager();
            }
            return this.mInstance;
        };
        UIStackManager.prototype.push = function (uiplane) {
            if (this.uistack) {
                this.uistack.push(uiplane);
            }
        };
        UIStackManager.prototype.pop = function () {
            if (this.uistack && this.uistack.length > 0) {
                this.uistack.pop();
            }
        };
        UIStackManager.prototype.removeAllUIPlane = function () {
            for (var _i = 0, _a = this.uistack; _i < _a.length; _i++) {
                var ui_1 = _a[_i];
                ui_1.exit();
            }
        };
        UIStackManager.prototype.count = function () {
            return this.uistack.length;
        };
        return UIStackManager;
    }());
    EIGame.UIStackManager = UIStackManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=UIStackManager.js.map