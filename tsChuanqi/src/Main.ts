
namespace EIGame{
    export class Main{
        constructor(){
            EIGame.GameManager.mode = EIGame.GameUtils.getUrl()["model"] || "2d";
            // Laya.ResourceManager.systemResourceManager.autoRelease = true;//true开启内存管理，，false关闭内存管理
            // Laya.ResourceManager.systemResourceManager.autoReleaseMaxSize =  1024 * 1024 * 60;//1M=1024KB,1KB=1024B//如果开启nei内存管理，内存大小设置
            if(EIGame.GameManager.mode == "2d"){
                Laya.init(640, 400, Laya.WebGL);
                //设置适配模式
                Laya.stage.scaleMode = "fixedheight";
                //设置横竖屏
                if(EIGame.PlatformUtil.IsPC()){
                    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
                }else{
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

            ResManager.Instance().on(Laya.Event.LOADED, this, this.onLoadComplete);
            ResManager.Instance().loadGameRes();
        }

        private onLoadComplete(error:any){
            let files = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            ProtobufHelper.Instance().on(Laya.Event.LOADED, this, this.onPbComplete);
            ProtobufHelper.Instance().load(files);
        }

        private onPbComplete(err:any){
            console.log("all proto loaded~ ");
            NetWork.Instance().init();
            LoginManager.init();
            this.initViews();
            this.initModels();
            GameManager.Instance().startGame();
        }

        private initViews(){
            ViewManager.Instance().addView("View_Login", View_Login);
            ViewManager.Instance().addView("View_Game", View_Game);
            ViewManager.Instance().addView("View_TEST2D", View_TEST2D);
            ViewManager.Instance().addView("View_Samples", View_Samples);
        }

        private initModels(){
            ModelManager.Instance().addModel("Model_Login", Model_Login);
        }
    }
}

let main = new EIGame.Main();