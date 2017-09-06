module EIGame{
    export class View_TEST2D extends View_Base{
        private static mInstance:View_TEST2D;
        private uiList:Array<any> = new Array();

        constructor() {
            super();
            this._model = new Model_Login();
        }

        public initView():void {
            this.mView = this.getView();
        };

        public getView(){
            let self = this;
            let UIBox:any = new Laya.Sprite();
            UIBox.cacheAs = "bitmap";
            //标题------------
            let label = new Laya.Label();
            label.text = "2D DEMO";
            label.pos(0, 0);
            label.fontSize = 60;
            label.color = "#40FF40";
            label = UIBox.addChild(label);

            let textBox = new Laya.Sprite();
            let text;
            let _topTextY = 200;
            for (let i = 0; i < 1000; i++)
            {
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
            let _right = 0;
            let _offsetX = 150 * Laya.Browser.pixelRatio;
            for(var i=0;i<4;i++){
                let ape = new Laya.Sprite();
                ape = UIBox.addChild(ape);
                ape.loadImage(ResManager.Instance().Path("apes/monkey"+i+".png"));
                ape.x = ape.x + _offsetX * i;
                _right = ape.x;
                self.uiList.push(ape);
            }

            // 方法2：使用drawTexture
            Laya.loader.load(ResManager.Instance().Path("apes/monkey2.png"), Laya.Handler.create(this, function()
            {
                let t = Laya.loader.getRes(ResManager.Instance().Path("apes/monkey2.png"));
                let ape2 = new Laya.Sprite();
                ape2.graphics.drawTexture(t, 0, 0);
                ape2 = UIBox.addChild(ape2);
                ape2.pos(_right + _offsetX, 0);
                self.uiList.push(ape2);
            }));

            let res = [
                "ui/progressBar.png",//进度条
                "ui/progressBar$bar.png",//进度条
                "ui/textarea.png",//文本框
                "ui/vscroll.png",
                "ui/vscroll$bar.png",
                "ui/vscroll$down.png",
                "ui/vscroll$up.png",
                "ui/tree/clip_selectBox.png",
                "ui/tree/clip_tree_folder.png",
                "ui/tree/clip_tree_arrow.png",
                "apes/monkey2.png"
            ];

            for(let i in res){
                res[i] = ResManager.Instance().Path(res[i]);
            }
            
            Laya.loader.load(res, Laya.Handler.create(this, function ()
            {
                //进度条
                let progressBar = new Laya.ProgressBar(ResManager.Instance().Path("ui/progressBar.png"));
                console.log("进度条: ", self);
                progressBar.width = ViewManager.Instance().rootScene.width;
                progressBar.x = 0;
                progressBar.y = _topTextY;
                progressBar.sizeGrid = "5,5,5,5";
                progressBar = UIBox.addChild(progressBar);
                Laya.timer.loop(100, this, function ()
                {
                    if (progressBar.value >= 1)
                        progressBar.value = 0;
                    progressBar.value += 0.05;
                });
                self.uiList.push(progressBar);

                //文本框---------------
                let ta = new Laya.TextArea("");
                ta.skin = ResManager.Instance().Path("ui/textarea.png");
                ta.font = "Arial";
                ta.fontSize = 18;
                ta.bold = true;
                ta.color = "#3d3d3d";
                ta.pos(0, _topTextY + 14 * Laya.Browser.pixelRatio);
                ta.size(Laya.stage.width, 200);
                ta.padding = "70,8,8,8";
                let scaleFactor = Laya.Browser.pixelRatio;
                ta = UIBox.addChild(ta);
                self.uiList.push(ta);

                //拖动
                let ape = new Laya.Sprite();
                ape.loadImage(ResManager.Instance().Path("apes/monkey2.png"));
                UIBox.addChild(ape);

                let texture = Laya.loader.getRes(ResManager.Instance().Path("apes/monkey2.png"));
                ape.pivot(texture.width / 2, texture.height / 2);
                ape.x = Laya.stage.width / 2;
                ape.y = Laya.stage.height / 2;

                ape.on(Laya.Event.MOUSE_DOWN, this, function(){
                    //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
                    ape.startDrag(dragRegion, true, 100);
                });
                
                //拖动限制区域
                let dragWidthLimit = 350;
                let dragHeightLimit = 200;
                let dragRegion = new Laya.Rectangle(Laya.stage.width - dragWidthLimit >> 1, Laya.stage.height - dragHeightLimit >> 1, dragWidthLimit, dragHeightLimit);

                //画出拖动限制区域
                UIBox.graphics.drawRect(
                    dragRegion.x, dragRegion.y, dragRegion.width, dragRegion.height,
                    null, "#FFFFFF", 2);
            }));

            // 多点触控-----------
            let sp = new Laya.Sprite();
            let w = 150,
            	h = 150;
            sp.graphics.drawRect(0, 0, w, h, "#FF7F50");
            sp.size(w, h);
            sp.pivot(w / 2, h / 2);
            sp.pos(UIBox.width - w * Laya.Browser.pixelRatio, UIBox.height - h * Laya.Browser.pixelRatio);
            UIBox.addChild(sp);

            UIBox.on(Laya.Event.MOUSE_UP, this, function(){
                UIBox.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
            });
            UIBox.on(Laya.Event.MOUSE_OUT, this, function(){
                UIBox.off(Laya.Event.MOUSE_MOVE, this, onMouseMove);
            });

            let lastDistance:number = 0;
            let onMouseMove = function(e){
                let distance = getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                const factor = 0.01;
                sp.scaleX += (distance - lastDistance) * factor;
                sp.scaleY += (distance - lastDistance) * factor;

                lastDistance = distance;
            }

            let getDistance = function(points)
            {
                let distance = 0;
                if (points && points.length == 2)
                {
                    let dx = points[0].stageX - points[1].stageX;
                    let dy = points[0].stageY - points[1].stageY;

                    distance = Math.sqrt(dx * dx + dy * dy);
                }
                return distance;
            }
            sp.on(Laya.Event.MOUSE_DOWN, this, function(e){
                let touches = e.touches;
                if (touches && touches.length == 2)
                {
                    lastDistance = getDistance(touches);
                    UIBox.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);
                }
            });

            //等角地图
            let tiledMap = new Laya.TiledMap();
            tiledMap.createMap(ResManager.Instance().Path("tiledMap/isometric_grass_and_water.json"), new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Handler.create(this, function ()
            {
                let layer = tiledMap.getLayerByIndex(0);
                let radiusX = 32;
                let radiusY = Math.tan(180 / Math.PI * 30) * radiusX;
                let color = "#FF7F50";
                let sprite = new Laya.Sprite();
                sprite.graphics.drawLine(0, 0, -radiusX, radiusY, color);
                sprite.graphics.drawLine(0, 0, radiusX, radiusY, color);
                sprite.graphics.drawLine(-radiusX, radiusY, 0, radiusY * 2, color);
                sprite.graphics.drawLine(radiusX, radiusY, 0, radiusY * 2, color);
                UIBox.addChild(sprite);
            }), null, new Laya.Point(1600, 800));
            return UIBox;
        }

        public release(){
            // console.log("~~~~2D release", this.UIBox, this.uiList.length);
            // if(this.UIBox){
            //     this.UIBox.destroyChildren();
            //     this.UIBox.destroy();
            //     this.UIBox = null;
            // }
            // for(var i=0;i<this.uiList.length;i++){
            //     let ui = this.uiList.pop();
            // }
        }
    }
}