
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

            ResourceManager.Instance().preload(()=>{
                //初始化进度条
                let progressView = new Laya.ProgressBar(ResUtils.Get("ui/progressBar.png"));
                progressView.width = 400;
                progressView.x = (Laya.stage.width - progressView.width) / 2;
                progressView.y = Laya.stage.height / 2;
                progressView.sizeGrid = "5,5,5,5";
                progressView.value = 0;

                this.start_time = (new Date()).valueOf();

                ResourceManager.Instance().on(Laya.Event.LOADED, this, this.onLoadResComplete);
                ResourceManager.Instance().loadGameRes("ResourceMap.json", progressView);
            });
        }

        private start_time;
        private onLoadResComplete(error:any){
            let now_time = (new Date()).valueOf();
            let cost = (now_time - this.start_time) / 1000;
            console.log("资源加载耗时 ", cost);

            let files = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            
            ProtobufHelper.Instance().on(Laya.Event.LOADED, this, this.onProtobufComplete);
            ProtobufHelper.Instance().load(files);
        }

        private onProtobufComplete(err:any){
            

            NetWork.Instance().init();
            LoginManager.init();
            this.initViews();
            this.initModels();
            Laya.SoundManager.playMusic(ResUtils.Get("sounds/bgm.mp3"), 1, new Handler(this, ()=>{
                console.log("播放完成");
            }));

            GameManager.Instance().init();
        }

        private initViews(){
            ViewManager.Instance().addView(ViewType.View_Login, View_Login);
            ViewManager.Instance().addView(ViewType.View_Game, View_Game);
            ViewManager.Instance().addView(ViewType.View_TEST2D, View_TEST2D);
            ViewManager.Instance().addView(ViewType.View_Samples, View_Samples);
        }

        private initModels(){
            ModelManager.Instance().addModel("Model_Login", Model_Login);
        }
    }
}

let main = new EIGame.Main();