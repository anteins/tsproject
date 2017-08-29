// 程序入口
var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Handler = Laya.Handler;
var Socket = Laya.Socket;
var Vector3 = Laya.Vector3;
var util = EIGame.GameHelper;
var platformUtil = EIGame.PlatformUtil;
var EIGame;
(function (EIGame) {
    var Game = (function () {
        function Game() {
            this.inited = false;
            this.btnList = new Array();
            this.debug = false;
            this.mode = "2d";
            this.isStarted = false;
            this.isloadedRes = true;
            this.initEffect = function () {
                var particleSprite3D = this.scene.addChild(Laya.Sprite3D.load(util.getResPath("/threeDimen/particle/ETF_Eternal_Light.lh")));
            };
            var self = this;
            var args = util.getUrl();
            if (args) {
                console.log("args: ", args, self.mode);
                // self.mode = args["mode"];
            }
            EIGame.GameManager.Instance().setup(self);
        }
        Game.prototype.init = function () {
            var self = this;
            self.initLaya();
            self.initSence();
            self.initLoop(1000);
            self.initNetWork();
        };
        Game.prototype.initNetWork = function () {
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
            if (this.inited)
                return;
            this.inited = true;
            this.scene = Laya.stage.addChild(new Laya.Scene());
            // this.preloadRes();
            this.initBtn();
        };
        Game.prototype.initBtn = function () {
            var btn_w = 90;
            var btn_h = 20;
            var button_res = util.getResPath("threeDimen/ui/button.png");
            var self = this;
            Laya.loader.load([button_res], Laya.Handler.create(null, function () {
                var buttons;
                if (self.mode == "2d") {
                    buttons = [
                        { "key": "2D性能测试", "value": function () {
                                if (!this.inited)
                                    return;
                                EIGame.Test2dUI.show();
                            } },
                        { "key": "打开UI", "value": function () {
                                if (!self.inited)
                                    return;
                                EIGame.LoginMainDlgUI.Instance().show();
                            } },
                        { "key": "清空", "value": function () {
                                if (!self.inited)
                                    return;
                                EIGame.UIStackManager.Instance().removeAllUIPlane();
                            } },
                    ];
                }
                var start_x = Laya.stage.width - btn_w * Laya.Browser.pixelRatio;
                var start_y = Laya.stage.height - buttons.length * btn_h * Laya.Browser.pixelRatio;
                self.addButtons(buttons, button_res, start_x, start_y, btn_w, btn_h);
            }));
        };
        Game.prototype.startGame = function () {
            var self = this;
            if (self.isStarted)
                return;
            self.isStarted = true;
            console.log("startGame");
            console.log("Browser.window.protobuf!!! ");
            // Test.doTest();
        };
        Game.prototype.startLogin = function () {
        };
        Game.prototype.initLoop = function (_loopRate) {
            var self = this;
            setInterval(function () { self.gameLoop(); }, _loopRate);
        };
        Game.prototype.gameLoop = function () {
            var self = this;
            if (this.isloadedRes) {
                this.isloadedRes = false;
                self.startGame();
            }
            // console.log("ui: ", UIStackManager.Instance().count());
            // ei_network.Instance().sendMessage("client loop");
        };
        Game.prototype.addButtons = function (buttons, button_res, start_x, start_y, btn_w, btn_h) {
            this.clearButtons();
            var last_y = start_y;
            for (var i in buttons) {
                var kv = buttons[i];
                var btn = Laya.stage.addChild(new Laya.Button(button_res, kv.key));
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
        Game.prototype.clearRes = function () {
        };
        ;
        return Game;
    }());
    EIGame.Game = Game;
})(EIGame || (EIGame = {}));
new EIGame.Game();
//# sourceMappingURL=Game.js.map