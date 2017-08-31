var EIGame;
(function (EIGame) {
    var NetworkUtil = (function () {
        function NetworkUtil() {
        }
        //除navigator.onLine属性之外，为了更好地确定网络是否可用，HTML5还定义了两个事件：online和offline。
        //当网络从离线变为在线或者从在线变为离线时，分别触发这两个事件。这两个事件在window对象上触发。
        NetworkUtil.addHandler = function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            }
            else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            }
            else {
                element["on" + type] = handler;
            }
        };
        NetworkUtil.isOnLine = function () {
            //检测是否联网，支持离线检测的浏览器有IE6+(只支持navigator.onLine属性)、Firefox3、Safari4、Opera 10.6、Chrome、iOS 3.2版Safari和Android版WebKit。
            if (navigator.onLine) {
                console.log("正常工作！");
            }
            else {
                //执行离线状态时的任务
                console.log("离线工作！");
            }
        };
        return NetworkUtil;
    }());
    EIGame.NetworkUtil = NetworkUtil;
})(EIGame || (EIGame = {}));
