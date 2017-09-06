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
    var View_TEST2D = (function (_super) {
        __extends(View_TEST2D, _super);
        function View_TEST2D() {
            var _this = _super.call(this) || this;
            _this.uiList = new Array();
            _this._model = new EIGame.Model_Login();
            return _this;
        }
        View_TEST2D.prototype.initView = function () {
            this.mView = this.getView();
        };
        ;
        View_TEST2D.prototype.getView = function () {
            var self = this;
            var UIBox = new Laya.Sprite();
            UIBox.cacheAs = "bitmap";
            //标题------------
            var label = new Laya.Label();
            label.text = "2D DEMO";
            label.pos(0, 0);
            label.fontSize = 60;
            label.color = "#40FF40";
            label = UIBox.addChild(label);
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
            textBox = UIBox.addChild(textBox);
            self.uiList.push(textBox);
            // 方法1：使用loadImage
            var _right = 0;
            var _offsetX = 150 * Laya.Browser.pixelRatio;
            for (var i = 0; i < 4; i++) {
                var ape = new Laya.Sprite();
                ape = UIBox.addChild(ape);
                ape.loadImage(EIGame.ResManager.Instance().Path("apes/monkey" + i + ".png"));
                ape.x = ape.x + _offsetX * i;
                _right = ape.x;
                self.uiList.push(ape);
            }
            // 方法2：使用drawTexture
            Laya.loader.load(EIGame.ResManager.Instance().Path("apes/monkey2.png"), Laya.Handler.create(this, function () {
                var t = Laya.loader.getRes(EIGame.ResManager.Instance().Path("apes/monkey2.png"));
                var ape2 = new Laya.Sprite();
                ape2.graphics.drawTexture(t, 0, 0);
                ape2 = UIBox.addChild(ape2);
                ape2.pos(_right + _offsetX, 0);
                self.uiList.push(ape2);
            }));
            var res = [
                "ui/progressBar.png",
                "ui/progressBar$bar.png",
                "ui/textarea.png",
                "ui/vscroll.png",
                "ui/vscroll$bar.png",
                "ui/vscroll$down.png",
                "ui/vscroll$up.png",
                "ui/tree/clip_selectBox.png",
                "ui/tree/clip_tree_folder.png",
                "ui/tree/clip_tree_arrow.png",
                "apes/monkey2.png"
            ];
            for (var i_2 in res) {
                res[i_2] = EIGame.ResManager.Instance().Path(res[i_2]);
            }
            Laya.loader.load(res, Laya.Handler.create(this, function () {
                //进度条
                var progressBar = new Laya.ProgressBar(EIGame.ResManager.Instance().Path("ui/progressBar.png"));
                console.log("进度条: ", self);
                progressBar.width = EIGame.ViewManager.Instance().rootScene.width;
                progressBar.x = 0;
                progressBar.y = _topTextY;
                progressBar.sizeGrid = "5,5,5,5";
                progressBar = UIBox.addChild(progressBar);
                Laya.timer.loop(100, this, function () {
                    if (progressBar.value >= 1)
                        progressBar.value = 0;
                    progressBar.value += 0.05;
                });
                self.uiList.push(progressBar);
                //文本框---------------
                var ta = new Laya.TextArea("");
                ta.skin = EIGame.ResManager.Instance().Path("ui/textarea.png");
                ta.font = "Arial";
                ta.fontSize = 18;
                ta.bold = true;
                ta.color = "#3d3d3d";
                ta.pos(0, _topTextY + 14 * Laya.Browser.pixelRatio);
                ta.size(Laya.stage.width, 200);
                ta.padding = "70,8,8,8";
                var scaleFactor = Laya.Browser.pixelRatio;
                ta = UIBox.addChild(ta);
                self.uiList.push(ta);
                //拖动
                var ape = new Laya.Sprite();
                ape.loadImage(EIGame.ResManager.Instance().Path("apes/monkey2.png"));
                UIBox.addChild(ape);
                var texture = Laya.loader.getRes(EIGame.ResManager.Instance().Path("apes/monkey2.png"));
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
                UIBox.graphics.drawRect(dragRegion.x, dragRegion.y, dragRegion.width, dragRegion.height, null, "#FFFFFF", 2);
            }));
            // 多点触控-----------
            var sp = new Laya.Sprite();
            var w = 150, h = 150;
            sp.graphics.drawRect(0, 0, w, h, "#FF7F50");
            sp.size(w, h);
            sp.pivot(w / 2, h / 2);
            sp.pos(UIBox.width - w * Laya.Browser.pixelRatio, UIBox.height - h * Laya.Browser.pixelRatio);
            UIBox.addChild(sp);
            UIBox.on(Laya.Event.MOUSE_UP, this, function () {
                UIBox.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
            });
            UIBox.on(Laya.Event.MOUSE_OUT, this, function () {
                UIBox.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
            });
            var lastDistance = 0;
            var onMouseMove = function (e) {
                var distance = getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                var factor = 0.01;
                sp.scaleX += (distance - lastDistance) * factor;
                sp.scaleY += (distance - lastDistance) * factor;
                lastDistance = distance;
            };
            var getDistance = function (points) {
                var distance = 0;
                if (points && points.length == 2) {
                    var dx = points[0].stageX - points[1].stageX;
                    var dy = points[0].stageY - points[1].stageY;
                    distance = Math.sqrt(dx * dx + dy * dy);
                }
                return distance;
            };
            sp.on(Laya.Event.MOUSE_DOWN, this, function (e) {
                var touches = e.touches;
                if (touches && touches.length == 2) {
                    lastDistance = getDistance(touches);
                    UIBox.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);
                }
            });
            //等角地图
            var tiledMap = new Laya.TiledMap();
            tiledMap.createMap(EIGame.ResManager.Instance().Path("tiledMap/isometric_grass_and_water.json"), new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Handler.create(this, function () {
                var layer = tiledMap.getLayerByIndex(0);
                var radiusX = 32;
                var radiusY = Math.tan(180 / Math.PI * 30) * radiusX;
                var color = "#FF7F50";
                var sprite = new Laya.Sprite();
                sprite.graphics.drawLine(0, 0, -radiusX, radiusY, color);
                sprite.graphics.drawLine(0, 0, radiusX, radiusY, color);
                sprite.graphics.drawLine(-radiusX, radiusY, 0, radiusY * 2, color);
                sprite.graphics.drawLine(radiusX, radiusY, 0, radiusY * 2, color);
                UIBox.addChild(sprite);
            }), null, new Laya.Point(1600, 800));
            return UIBox;
        };
        View_TEST2D.prototype.release = function () {
            // console.log("~~~~2D release", this.UIBox, this.uiList.length);
            // if(this.UIBox){
            //     this.UIBox.destroyChildren();
            //     this.UIBox.destroy();
            //     this.UIBox = null;
            // }
            // for(var i=0;i<this.uiList.length;i++){
            //     let ui = this.uiList.pop();
            // }
        };
        return View_TEST2D;
    }(EIGame.View_Base));
    EIGame.View_TEST2D = View_TEST2D;
})(EIGame || (EIGame = {}));
