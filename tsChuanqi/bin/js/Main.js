var EIGame;
(function (EIGame) {
    var Main = (function () {
        function Main() {
            EIGame.GameManager.mode = EIGame.GameUtils.getUrl()["model"] || "2d";
            // Laya.ResourceManager.systemResourceManager.autoRelease = true;//true开启内存管理，，false关闭内存管理
            // Laya.ResourceManager.systemResourceManager.autoReleaseMaxSize =  1024 * 1024 * 60;//1M=1024KB,1KB=1024B//如果开启nei内存管理，内存大小设置
            if (EIGame.GameManager.mode == "2d") {
                Laya.init(640, 400, Laya.WebGL);
                //设置适配模式
                Laya.stage.scaleMode = "fixedheight";
                //设置横竖屏
                if (EIGame.PlatformUtil.IsPC()) {
                    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
                }
                else {
                    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
                }
                Laya.stage.bgColor = "gray";
                //设置水平对齐
                Laya.stage.alignH = "center";
                //设置垂直对齐
                Laya.stage.alignV = "middle";
                Laya.stage.screenAdaptationEnabled = true;
            }
            //显示FPS
            Laya.Stat.show(0, 50);
            EIGame.ResManager.Instance().on(Laya.Event.LOADED, this, this.onLoadComplete);
            EIGame.ResManager.Instance().loadGameRes();
        }
        Main.prototype.onLoadComplete = function (error) {
            var files = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            EIGame.ProtobufHelper.Instance().on(Laya.Event.LOADED, this, this.onPbComplete);
            EIGame.ProtobufHelper.Instance().load(files);
        };
        Main.prototype.onPbComplete = function (err) {
            console.log("all proto loaded~ ");
            EIGame.NetWork.Instance().init();
            EIGame.LoginManager.init();
            this.initViews();
            this.initModels();
            EIGame.GameManager.Instance().startGame();
        };
        Main.prototype.initViews = function () {
            EIGame.ViewManager.Instance().addView("View_Login", EIGame.View_Login);
            EIGame.ViewManager.Instance().addView("View_Game", EIGame.View_Game);
            EIGame.ViewManager.Instance().addView("View_TEST2D", EIGame.View_TEST2D);
            EIGame.ViewManager.Instance().addView("View_Samples", EIGame.View_Samples);
        };
        Main.prototype.initModels = function () {
            EIGame.ModelManager.Instance().addModel("Model_Login", EIGame.Model_Login);
        };
        return Main;
    }());
    EIGame.Main = Main;
})(EIGame || (EIGame = {}));
var main = new EIGame.Main();
