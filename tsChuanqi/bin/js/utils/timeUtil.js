var EIGame;
(function (EIGame) {
    var timeUtil = (function () {
        function timeUtil() {
        }
        timeUtil.getTimeStamp = function () {
            return (new Date()).valueOf();
        };
        return timeUtil;
    }());
    EIGame.timeUtil = timeUtil;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=timeUtil.js.map