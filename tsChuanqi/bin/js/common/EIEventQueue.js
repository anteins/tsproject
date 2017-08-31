var EIGame;
(function (EIGame) {
    var EIEventQueue = (function () {
        function EIEventQueue() {
        }
        EIEventQueue.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.GameSceneUI();
            }
            return this.mInstance;
        };
        EIEventQueue.prototype.AsyncExcute = function (func, onSucc) {
            this.eventList.push({ func: func, onSucc: onSucc });
        };
        EIEventQueue.prototype.Update = function () {
            if (this.eventList) {
                for (var _i = 0, _a = this.eventList; _i < _a.length; _i++) {
                    var event_1 = _a[_i];
                }
            }
        };
        return EIEventQueue;
    }());
    EIGame.EIEventQueue = EIEventQueue;
})(EIGame || (EIGame = {}));
