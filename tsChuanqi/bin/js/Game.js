// 程序入口
var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Handler = Laya.Handler;
var Socket = Laya.Socket;
var Vector3 = Laya.Vector3;
var util = EIGame.GameUtils;
var platformUtil = EIGame.PlatformUtil;
var EIGame;
(function (EIGame) {
    EIGame.DEBUG_MODE = true;
    var Game = (function () {
        function Game() {
            this.btnList = new Array();
            this.mode = "2d";
            this.isStarted = false;
            this.resLoaded = false;
            this.pbMessageLoaded = false;
            this._loopRate = 1000;
            this.initEffect = function () {
                var particleSprite3D = this.scene.addChild(Laya.Sprite3D.load(util.getResPath("/threeDimen/particle/ETF_Eternal_Light.lh")));
            };
            var self = this;
            var args = util.getUrl();
            if (args && args.length > 0 && args["mode"]) {
                console.log("args: ", args);
                self.mode = args["mode"];
            }
            EIGame.GameManager.Instance().setup(self);
        }
        Game.prototype.init = function () {
            var self = this;
            self.initLaya();
            self.initSence();
            self.initLoop();
            EIGame.ProtocolManager.Instance().init();
            EIGame.LoginManager.Instance().init();
            self.initPbMessage();
        };
        Game.prototype.preloadResource = function () {
            this.resLoaded = true;
        };
        Game.prototype.initPbMessage = function () {
            var self = this;
            var protos = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            EIGame.ProtocolManager.Instance().load(protos, function (err, root) {
                console.log("proto loaded! ", err, root);
                self.pbMessageLoaded = true;
                self.initNetWork();
                self.preloadResource();
            });
        };
        Game.prototype.initNetWork = function () {
            var self = this;
            EIGame.ei_network.Instance().init();
        };
        Game.prototype.initLaya = function () {
            var self = this;
            // Laya.ResourceManager.systemResourceManager.autoRelease = true;//true开启内存管理，，false关闭内存管理
            // Laya.ResourceManager.systemResourceManager.autoReleaseMaxSize =  1024 * 1024 * 60;//1M=1024KB,1KB=1024B//如果开启nei内存管理，内存大小设置
            if (self.mode == "2d") {
                Laya.init(640, 400, Laya.WebGL);
                //设置适配模式
                Laya.stage.scaleMode = "fixedheight";
                //设置横竖屏
                if (platformUtil.IsPC()) {
                    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
                }
                else {
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
        };
        Game.prototype.initSence = function () {
            this.scene = Laya.stage.addChild(new Laya.Sprite());
            //随意绘制显示对象
            this.sp = new Laya.Sprite();
            this.sp.loadImage(util.getResPath("logo.png"));
            this.scene.addChild(this.sp);
            this.initMainSceneBtn();
        };
        Game.prototype.initMainSceneBtn = function () {
            var btn_w = 90;
            var btn_h = 20;
            var button_res = util.getResPath("threeDimen/ui/button.png");
            var self = this;
            Laya.loader.load([button_res], Laya.Handler.create(null, function () {
                var buttons;
                if (self.mode == "2d") {
                    buttons = [
                        { "key": "2D性能测试", "value": function () {
                                if (!this.isStarted)
                                    return;
                                EIGame.Test2dUI.show();
                            } },
                        { "key": "打开UI", "value": function () {
                                EIGame.LoginMainDlgUI.Instance().show();
                            } },
                        { "key": "清空", "value": function () {
                                if (!self.isStarted)
                                    return;
                                EIGame.UIStackManager.Instance().removeAllUIPlane();
                            } },
                        { "key": "网络监听", "value": function () {
                                if (!self.isStarted)
                                    return;
                                // console.log("网络监听 ",conch);
                                // if( conch )
                                // {
                                //     conch.setNetworkEvtFunction(function(type)
                                //     {
                                //         alert(type)
                                //     });
                                // }
                            } },
                        { "key": "截屏", "value": function () {
                                if (!self.isStarted)
                                    return;
                                //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
                                //此处将canvas指定区域进行截屏
                                var htmlC = this.scene.drawToCanvas(640, 400, 0, 0);
                                //获取截屏区域的texture
                                var _texture = new Laya.Texture(htmlC);
                                //将截屏的texture进行draw绘制并显示到舞台
                                var sp2 = new Sprite();
                                sp2.x = 300;
                                sp2.graphics.drawTexture(_texture, 0, 0, 640, 400);
                                // sp2.scale(0.3, 0.3);
                                this.scene.addChild(sp2);
                            } },
                    ];
                }
                var start_x = Laya.stage.width - btn_w * Laya.Browser.pixelRatio;
                var start_y = Laya.stage.height - buttons.length * btn_h * Laya.Browser.pixelRatio;
                self.addButtons(buttons, button_res, start_x, start_y, btn_w, btn_h);
            }));
        };
        Game.prototype.addButtons = function (buttons, button_res, start_x, start_y, btn_w, btn_h) {
            this.clearButtons();
            var last_y = start_y;
            for (var i in buttons) {
                var kv = buttons[i];
                var btn = this.scene.addChild(new Laya.Button(button_res, kv.key));
                btn.size(btn_w, btn_h);
                btn.labelBold = true;
                btn.labelSize = 12;
                btn.sizeGrid = "4,4,4,4";
                btn.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
                btn.pos(start_x, last_y);
                btn.on(Laya.Event.CLICK, this, kv.value);
                last_y = (btn.y + btn.height * Laya.Browser.pixelRatio);
                this.btnList.push(btn);
            }
        };
        ;
        Game.prototype.clearButtons = function () {
            for (var i = 0; i < this.btnList.length; i++) {
                var btn = this.btnList.pop();
                btn.removeChild(btn);
            }
        };
        ;
        Game.prototype.startGame = function () {
            var self = this;
            self.isStarted = true;
            console.log("startGame");
            // Test.doTest();
        };
        Game.prototype.initLoop = function () {
            var self = this;
            setInterval(function () { self.gameLoop(); }, self._loopRate);
        };
        Game.prototype.gameLoop = function () {
            var self = this;
            if (self.isReadyStartGame()) {
                self.startGame();
            }
            if (self.isStarted) {
                // ei_network.Instance().say_ai();
            }
        };
        Game.prototype.isReadyStartGame = function () {
            return this.pbMessageLoaded && this.resLoaded && EIGame.ei_network.Instance().connected() && (!this.isStarted);
        };
        Game.prototype.clearRes = function () {
        };
        ;
        Game.exit = function () {
            console.log("游戏退出");
        };
        return Game;
    }());
    EIGame.Game = Game;
})(EIGame || (EIGame = {}));
new EIGame.Game();
//# sourceMappingURL=Game.js.map