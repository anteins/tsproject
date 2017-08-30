// 程序入口

import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Browser = Laya.Browser;
import WebGL = Laya.WebGL;
import Loader = Laya.Loader;
import Handler = Laya.Handler;
import Socket = Laya.Socket;
import Vector3 = Laya.Vector3;

import util  = EIGame.GameUtils;
import platformUtil  = EIGame.PlatformUtil;

module EIGame{
    export let DEBUG_MODE = true;
    export class Game{
        public scene:Laya.Sprite;
        private btnList:Array<any> = new Array();
        private mode:String = "2d";
        private isStarted:boolean = false;
        private resLoaded:boolean = false;
        private pbMessageLoaded:boolean = false;
        private _loopRate = 1000;

        constructor()
        {
            let self = this;
            let args:Array<any> = util.getUrl();
            if(args && args.length>0 && args["mode"]){
                console.log("args: ", args);
                self.mode = args["mode"];
            }
            EIGame.GameManager.Instance().setup(self);
        }

        public init(){
            let self = this;
            self.initLaya();
            self.initSence();
            self.initLoop();
            ProtocolManager.Instance().init();
            LoginManager.Instance().init();
            self.initPbMessage();
        }

        preloadResource(){
            this.resLoaded = true;
        }

        initPbMessage(){
            let self = this;
            let protos = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            ProtocolManager.Instance().load(protos, (err:any, root:any)=>{
                console.log("proto loaded! ", err, root);
                self.pbMessageLoaded = true;
                self.initNetWork();
                self.preloadResource();
            });
        }

        private initNetWork():void{
            let self = this;
            ei_network.Instance().init();
        }

        private initLaya():void{
            let self = this;
            // Laya.ResourceManager.systemResourceManager.autoRelease = true;//true开启内存管理，，false关闭内存管理
            // Laya.ResourceManager.systemResourceManager.autoReleaseMaxSize =  1024 * 1024 * 60;//1M=1024KB,1KB=1024B//如果开启nei内存管理，内存大小设置
            if(self.mode=="2d"){
                Laya.init(640, 400, Laya.WebGL);
                //设置适配模式
                Laya.stage.scaleMode = "fixedheight";
                //设置横竖屏
                if(platformUtil.IsPC()){
                    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
                }else{
                    Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
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
        }

        private sp;
        private initSence(){
            this.scene = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;

            //随意绘制显示对象
            this.sp = new Laya.Sprite();
            this.sp.loadImage(util.getResPath("logo.png"));
            this.scene.addChild(this.sp);

            this.initMainSceneBtn();
        }
        
        private initMainSceneBtn():void{
            let btn_w = 90;
            let btn_h = 20;
            let button_res = util.getResPath("threeDimen/ui/button.png");
            let self = this;
            Laya.loader.load([button_res], Laya.Handler.create(null, function () {
                let buttons;
                if(self.mode=="2d"){
                    buttons = [
                        {"key":"2D性能测试", "value":function(){
                            if(!this.isStarted)
                                return;
                            Test2dUI.show();
                        }},
                        {"key":"打开UI", "value":function(){
                            
                            LoginMainDlgUI.Instance().show();
                        }},
                        {"key":"清空", "value":function(){
                            if(!self.isStarted)
                                return;
                            UIStackManager.Instance().removeAllUIPlane();
                        }},
                        {"key":"网络监听", "value":function(){
                            if(!self.isStarted)
                                return;

                            // console.log("网络监听 ",conch);
                            // if( conch )
                            // {
                            //     conch.setNetworkEvtFunction(function(type)
                            //     {
                            //         alert(type)
                            //     });
                            // }
                        }},
                        {"key":"截屏", "value":function(){
                            if(!self.isStarted)
                                return;
                            //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
                            //此处将canvas指定区域进行截屏
                            var htmlC:Laya.HTMLCanvas = this.scene.drawToCanvas(640, 400,0,0);
                            //获取截屏区域的texture
                            var _texture:Laya.Texture = new Laya.Texture(htmlC);
                            
                            //将截屏的texture进行draw绘制并显示到舞台
                            var sp2:Sprite = new Sprite();
                            sp2.x = 300;
                            sp2.graphics.drawTexture(_texture,0,0,640, 400);
                            // sp2.scale(0.3, 0.3);
                            this.scene.addChild(sp2);
                        }},
                    ];
                }
                let start_x = Laya.stage.width - btn_w * Laya.Browser.pixelRatio;
                let start_y = Laya.stage.height - buttons.length * btn_h * Laya.Browser.pixelRatio;
                self.addButtons(buttons, button_res, start_x, start_y, btn_w, btn_h);
            }));
        }
        private addButtons(buttons:Array<any>, button_res:string, start_x:any, start_y:any, btn_w:any, btn_h:any):void{
            this.clearButtons();
            let last_y = start_y;
            for(let i in buttons){
                let kv = buttons[i];
                let btn:any = this.scene.addChild(new Laya.Button(button_res, kv.key));
                btn.size(btn_w, btn_h);
                btn.labelBold = true;
                btn.labelSize = 12;
                btn.sizeGrid = "4,4,4,4";
                btn.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
                btn.pos(start_x, last_y)
                btn.on(Laya.Event.CLICK, this, kv.value);
                last_y = (btn.y + btn.height * Laya.Browser.pixelRatio);
                this.btnList.push(btn);
            }
        };
        private clearButtons():void{
            for(let i=0;i < this.btnList.length; i++){
                let btn = this.btnList.pop();
                btn.removeChild(btn);
            }
        };

        public startGame():void{
            let self = this;
            self.isStarted = true;
            console.log("startGame");
            // Test.doTest();
        }

        public initLoop():void{
            let self = this;
            setInterval(function(){self.gameLoop();}, self._loopRate);
        }
        
        private gameLoop():void{
            let self = this;
            if(self.isReadyStartGame()){
                self.startGame();
            }
            if(self.isStarted){
                // ei_network.Instance().say_ai();
            }
        }

        private isReadyStartGame(){
            return this.pbMessageLoaded && this.resLoaded && ei_network.Instance().connected() && (!this.isStarted);
        }

        
        private initEffect = function(){
            let particleSprite3D = this.scene.addChild(Laya.Sprite3D.load(util.getResPath("/threeDimen/particle/ETF_Eternal_Light.lh")));
        };

        private clearRes():void {
        };

        static exit(){
            console.log("游戏退出");
        }
    }
}
new EIGame.Game();