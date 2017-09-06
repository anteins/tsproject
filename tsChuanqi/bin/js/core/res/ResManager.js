var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIGame;
(function (EIGame) {
    var ResManager = (function (_super) {
        __extends(ResManager, _super);
        function ResManager() {
            var _this = _super.call(this) || this;
            _this.resPath = "./res/";
            _this.curIndex = 0;
            _this.maxIndex = 2;
            return _this;
        }
        ResManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ResManager();
            }
            return this.mInstance;
        };
        ;
        //预加载
        ResManager.prototype.loadGameRes = function () {
            console.log("loadGameRes");
            // Laya.loader.load("./res/django.json", Handler.create(this, this.onJsonLoaded), null, Loader.ATLAS);
            var assets = [
                "res/sound/achievement.mp3",
                "res/sound/bullet.mp3",
                "res/sound/enemy1_down.mp3",
                "res/sound/enemy2_down.mp3",
                "res/threeDimen/layabox.png",
                "res/threeDimen/monkey.png",
                "res/threeDimen/ui/button.png",
                "res/django.json",
                { url: "res/atlas/comp.json", type: Loader.ATLAS },
            ];
            // 无加载失败重试
            Laya.loader.retryNum = 0;
            Laya.loader.load(assets, Handler.create(this, this.onAssetLoaded), Handler.create(this, this.onLoading, null, false));
            // 侦听加载失败
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        };
        ResManager.prototype.onJsonLoaded = function () {
            var json = Laya.loader.getRes("res/django.json");
            console.log("json ", json);
        };
        ResManager.prototype.onAssetLoaded = function (texture) {
            // 使用texture
            console.log("加载结束");
            var json = Laya.loader.getRes("res/django.json");
            console.log("json ", json);
            this.event(Laya.Event.LOADED);
        };
        // 加载进度侦听器
        ResManager.prototype.onLoading = function (progress) {
            console.log("加载进度: " + progress);
            this.event(Laya.Event.PROGRESS, progress);
        };
        ResManager.prototype.onError = function (err) {
            console.log("加载失败: " + err);
        };
        ResManager.prototype.Path = function (resName) {
            if (resName === void 0) { resName = ""; }
            return this.resPath + resName;
        };
        return ResManager;
    }(laya.events.EventDispatcher));
    EIGame.ResManager = ResManager;
})(EIGame || (EIGame = {}));
