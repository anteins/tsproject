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
        }
        Game.prototype.init = function () {
            var self = this;
            this.scene = Laya.stage.addChild(new Laya.Sprite());
            //随意绘制显示对象
            this.sp = new Laya.Sprite();
            this.sp.loadImage(Res.Path("logo.png"));
            this.scene.addChild(this.sp);
            this.initMainSceneBtn();
        };
        Game.prototype.initMainSceneBtn = function () {
            var btn_w = 90;
            var btn_h = 20;
            var button_res = Res.Path("threeDimen/ui/button.png");
            var self = this;
            Laya.loader.load([button_res], Laya.Handler.create(null, function () {
                var buttons;
                if (EIGame.GameManager.mode == "2d") {
                    buttons = [
                        { "key": "2D性能测试", "value": function () {
                                if (!EIGame.GameManager.isStarted())
                                    return;
                                EIGame.Test2dUI.show();
                            } },
                        { "key": "打开UI", "value": function () {
                                EIGame.LoginMainDlgUI.Instance().show();
                            } },
                        { "key": "清空", "value": function () {
                                if (!EIGame.GameManager.isStarted())
                                    return;
                                EIGame.UIStackManager.Instance().removeAllUIPlane();
                            } },
                        { "key": "网络监听", "value": function () {
                                if (!EIGame.GameManager.isStarted())
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
                                if (!EIGame.GameManager.isStarted())
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
        return Game;
    }());
    EIGame.Game = Game;
})(EIGame || (EIGame = {}));
