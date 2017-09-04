var EIGame;
(function (EIGame) {
    var ViewStackManager = (function () {
        function ViewStackManager() {
            this.uistack = new Array();
        }
        ViewStackManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.ViewStackManager();
            }
            return this.mInstance;
        };
        ViewStackManager.prototype.push = function (uiplane) {
            if (this.uistack) {
                this.uistack.push(uiplane);
            }
        };
        ViewStackManager.prototype.pop = function () {
            if (this.uistack && this.uistack.length > 0) {
                this.uistack.pop();
            }
        };
        ViewStackManager.prototype.removeAllUIPlane = function () {
            for (var _i = 0, _a = this.uistack; _i < _a.length; _i++) {
                var ui_1 = _a[_i];
                ui_1.exit();
            }
        };
        ViewStackManager.prototype.count = function () {
            return this.uistack.length;
        };
        return ViewStackManager;
    }());
    EIGame.ViewStackManager = ViewStackManager;
})(EIGame || (EIGame = {}));
