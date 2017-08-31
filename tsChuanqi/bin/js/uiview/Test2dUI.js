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
    var Test2dUI = (function (_super) {
        __extends(Test2dUI, _super);
        function Test2dUI() {
            var _this = _super.call(this) || this;
            _this.uiList = new Array();
            _this.LoadView("ui.test.Test2dUI", function () {
                var main_sence = EIGame.GameManager.Scene();
                var self = this;
                self.UIBox = new Laya.Sprite();
                self.UIBox.cacheAs = "bitmap";
                //标题------------
                var label = new Laya.Label();
                label.text = "2D DEMO";
                label.pos(0, 0);
                label.fontSize = 60;
                label.color = "#40FF40";
                label = self.UIBox.addChild(label);
                var textBox = new Laya.Sprite();
                var text;
                var _topTextY = 200;
                for (var i_1 = 0; i_1 < 1000; i_1++) {
                    text = new Laya.Text();
                    text.text = (Math.random() * 100).toFixed(0);
                    text.color = "#CCCCCC";
                    text.x = Math.random() * Laya.stage.width;
                    text.y = Math.random() * _topTextY;
                    textBox.addChild(text);
                }
                textBox = self.UIBox.addChild(textBox);
                self.uiList.push(textBox);
                // 方法1：使用loadImage
                var _right = 0;
                var _offsetX = 150 * Laya.Browser.pixelRatio;
                for (var i = 0; i < 4; i++) {
                    var ape = new Laya.Sprite();
                    ape = self.UIBox.addChild(ape);
                    ape.loadImage("../resource/apes/monkey" + i + ".png");
                    ape.x = ape.x + _offsetX * i;
                    _right = ape.x;
                    self.uiList.push(ape);
                }
                // 方法2：使用drawTexture
                Laya.loader.load("../resource/apes/monkey2.png", Laya.Handler.create(this, function () {
                    var t = Laya.loader.getRes("../resource/apes/monkey2.png");
                    var ape2 = new Laya.Sprite();
                    ape2.graphics.drawTexture(t, 0, 0);
                    ape2 = self.UIBox.addChild(ape2);
                    ape2.pos(_right + _offsetX, 0);
                    self.uiList.push(ape2);
                }));
                var res = [
                    "../resource/ui/progressBar.png",
                    "../resource/ui/progressBar$bar.png",
                    "../resource/ui/textarea.png",
                    "../resource/ui/vscroll.png",
                    "../resource/ui/vscroll$bar.png",
                    "../resource/ui/vscroll$down.png",
                    "../resource/ui/vscroll$up.png",
                    "../resource/ui/tree/clip_selectBox.png",
                    "../resource/ui/tree/clip_tree_folder.png",
                    "../resource/ui/tree/clip_tree_arrow.png",
                    "../resource/apes/monkey2.png"
                ];
                Laya.loader.load(res, Laya.Handler.create(this, function () {
                    //进度条
                    var progressBar = new Laya.ProgressBar("../resource/ui/progressBar.png");
                    console.log("进度条: ", self);
                    progressBar.width = main_sence.width;
                    progressBar.x = 0;
                    progressBar.y = _topTextY;
                    progressBar.sizeGrid = "5,5,5,5";
                    progressBar = self.UIBox.addChild(progressBar);
                    Laya.timer.loop(100, this, function () {
                        if (progressBar.value >= 1)
                            progressBar.value = 0;
                        progressBar.value += 0.05;
                    });
                    self.uiList.push(progressBar);
                    //文本框---------------
                    var ta = new Laya.TextArea("");
                    ta.skin = "../resource/ui/textarea.png";
                    ta.font = "Arial";
                    ta.fontSize = 18;
                    ta.bold = true;
                    ta.color = "#3d3d3d";
                    ta.pos(0, _topTextY + 14 * Laya.Browser.pixelRatio);
                    ta.size(Laya.stage.width, 200);
                    ta.padding = "70,8,8,8";
                    var scaleFactor = Laya.Browser.pixelRatio;
                    ta = self.UIBox.addChild(ta);
                    self.uiList.push(ta);
                    //拖动
                    var ape = new Laya.Sprite();
                    ape.loadImage("../resource/apes/monkey2.png");
                    self.UIBox.addChild(ape);
                    var texture = Laya.loader.getRes("../resource/apes/monkey2.png");
                    ape.pivot(texture.width / 2, texture.height / 2);
                    ape.x = Laya.stage.width / 2;
                    ape.y = Laya.stage.height / 2;
                    ape.on(Laya.Event.MOUSE_DOWN, this, function () {
                        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
                        ape.startDrag(dragRegion, true, 100);
                    });
                    //拖动限制区域
                    var dragWidthLimit = 350;
                    var dragHeightLimit = 200;
                    var dragRegion = new Laya.Rectangle(Laya.stage.width - dragWidthLimit >> 1, Laya.stage.height - dragHeightLimit >> 1, dragWidthLimit, dragHeightLimit);
                    //画出拖动限制区域
                    Laya.stage.graphics.drawRect(dragRegion.x, dragRegion.y, dragRegion.width, dragRegion.height, null, "#FFFFFF", 2);
                }));
                //多点触控-----------
                // sp = new Laya.Sprite();
                // let w = 150,
                // 	h = 150;
                // sp.graphics.drawRect(0, 0, w, h, "#FF7F50");
                // sp.size(w, h);
                // sp.pivot(w / 2, h / 2);
                // sp.pos(Laya.stage.width - w * Laya.Browser.pixelRatio, Laya.stage.height - h * Laya.Browser.pixelRatio);
                // Laya.stage.addChild(sp);
                // Laya.stage.on(Laya.Event.MOUSE_UP, this, function(){
                //     Laya.stage.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
                // });
                // Laya.stage.on(Laya.Event.MOUSE_OUT, this, function(){
                //     Laya.stage.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
                // });
                // let onMouseMove = function(e){
                //     let distance = getDistance(e.touches);
                //     //判断当前距离与上次距离变化，确定是放大还是缩小
                //     const factor = 0.01;
                //     sp.scaleX += (distance - lastDistance) * factor;
                //     sp.scaleY += (distance - lastDistance) * factor;
                //     lastDistance = distance;
                // }
                // let getDistance = function(points)
                // {
                //     let distance = 0;
                //     if (points && points.length == 2)
                //     {
                //         let dx = points[0].stageX - points[1].stageX;
                //         let dy = points[0].stageY - points[1].stageY;
                //         distance = Math.sqrt(dx * dx + dy * dy);
                //     }
                //     return distance;
                // }
                // sp.on(Laya.Event.MOUSE_DOWN, this, function(e){
                //     let touches = e.touches;
                //     if (touches && touches.length == 2)
                //     {
                //         lastDistance = getDistance(touches);
                //         Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);
                //     }
                // });
                // //等角地图
                // let tiledMap = new Laya.TiledMap();
                // tiledMap.createMap("../resource/tiledMap/isometric_grass_and_water.json", new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Handler.create(this, function ()
                // {
                //     layer = tiledMap.getLayerByIndex(0);
                //     let radiusX = 32;
                //     let radiusY = Math.tan(180 / Math.PI * 30) * radiusX;
                //     let color = "#FF7F50";
                //     sprite = new Laya.Sprite();
                //     sprite.graphics.drawLine(0, 0, -radiusX, radiusY, color);
                //     sprite.graphics.drawLine(0, 0, radiusX, radiusY, color);
                //     sprite.graphics.drawLine(-radiusX, radiusY, 0, radiusY * 2, color);
                //     sprite.graphics.drawLine(radiusX, radiusY, 0, radiusY * 2, color);
                //     Laya.stage.addChild(sprite);
                // }), null, new Laya.Point(1600, 800));
                return self.UIBox;
            });
            return _this;
        }
        Test2dUI.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.Test2dUI();
            }
            return this.mInstance;
        };
        Test2dUI.show = function () {
            this.Instance().show();
        };
        Test2dUI.prototype.initView = function () {
        };
        ;
        Test2dUI.prototype.release = function () {
            console.log("~~~~2D release", this.UIBox, this.uiList.length);
            if (this.UIBox) {
                this.UIBox.destroyChildren();
                this.UIBox.destroy();
                this.UIBox = null;
            }
            for (var i = 0; i < this.uiList.length; i++) {
                var ui_1 = this.uiList.pop();
            }
        };
        return Test2dUI;
    }(EIGame.UIPlane));
    EIGame.Test2dUI = Test2dUI;
})(EIGame || (EIGame = {}));
