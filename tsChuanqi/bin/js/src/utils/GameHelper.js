var EIGame;
(function (EIGame) {
    var GameHelper = (function () {
        function GameHelper() {
        }
        GameHelper.getUrl = function (keyList) {
            if (keyList === void 0) { keyList = null; }
            var url = location.search; //获取url中"?"符后的字串
            console.log("url: ", url);
            var theRequest = new Array();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };
        GameHelper.getLocalStorageSize = function () {
            var size = 0;
            for (var item in window.localStorage) {
                if (window.localStorage.hasOwnProperty(item)) {
                    size += window.localStorage.getItem(item).length;
                }
            }
            return (size / 1024).toFixed(2);
        };
        GameHelper.getResPath = function (resName) {
            if (resName === void 0) { resName = ""; }
            return this.resPath + resName;
        };
        GameHelper.resPath = "../resource/";
        return GameHelper;
    }());
    EIGame.GameHelper = GameHelper;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=GameHelper.js.map