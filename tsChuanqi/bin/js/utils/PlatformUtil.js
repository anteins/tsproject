var EIGame;
(function (EIGame) {
    var PlatformUtil = (function () {
        function PlatformUtil() {
        }
        PlatformUtil.IsPC = function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = [
                "Android",
                "iPhone",
                "SymbianOS",
                "Windows Phone",
                "iPad",
                "iPod"
            ];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        };
        PlatformUtil.getPlatform = function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = [
                "Android",
                "iPhone",
                "SymbianOS",
                "Windows Phone",
                "iPad",
                "iPod",
                "Windows"
            ];
            var os = "null";
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    os = Agents[v];
                    break;
                }
            }
            return os;
        };
        PlatformUtil.getUrl = function (keyList) {
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
        return PlatformUtil;
    }());
    EIGame.PlatformUtil = PlatformUtil;
})(EIGame || (EIGame = {}));
