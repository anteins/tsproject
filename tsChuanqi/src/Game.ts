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

namespace EIGame{
    export let DEBUG_MODE = true;
    export class Game{
        public scene:Laya.Sprite;
        private btnList:Array<any> = new Array();
        private sp;

        constructor(){}

        public init(){
            let self = this;
            this.scene = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
            //随意绘制显示对象
            this.sp = new Laya.Sprite();
            this.sp.loadImage(Res.Path("logo.png"));
            this.scene.addChild(this.sp);
            this.initMainSceneBtn();
        }

        private initMainSceneBtn():void{
            let btn_w = 90;
            let btn_h = 20;
            let button_res = Res.Path("threeDimen/ui/button.png");
            let self = this;
            Laya.loader.load([button_res], Laya.Handler.create(null, function () {
                let buttons;
                if(GameManager.mode=="2d"){
                    buttons = [
                        {"key":"2D性能测试", "value":function(){
                            if(!GameManager.isStarted())
                                return;
                            Test2dUI.show();
                        }},
                        {"key":"打开UI", "value":function(){
                            
                            LoginMainDlgUI.Instance().show();
                        }},
                        {"key":"清空", "value":function(){
                            if(!GameManager.isStarted())
                                return;
                            UIStackManager.Instance().removeAllUIPlane();
                        }},
                        {"key":"网络监听", "value":function(){
                            if(!GameManager.isStarted())
                                return;
                            if( conch )
                            {
                                
                                var nType = conch.config.getNetworkType();
                                alert("conch " + nType);
                                conch.setNetworkEvtFunction(function(type)
                                {
                                    alert(type);
                                    
                                });
                            }
                        }},
                        {"key":"截屏", "value":function(){
                            if(!GameManager.isStarted())
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
        
       
    }
}