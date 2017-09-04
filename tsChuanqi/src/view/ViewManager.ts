module EIGame{
    export class ViewManager extends laya.ui.View{
        public mIsStarted:boolean;
        private uistack = new Array();
        public actionListenMap: { [name: string]: Array<any>; };
        public view:any;
        public viewCb:any;
        public viewName:string = "";

        constructor(){super();}

        public LoadView(viewname:any, viewCb:any):void {
            this.viewName = viewname;
            this.viewCb = viewCb;
            this.view = this.viewCb();
        };

        public show():void {
            if (!this.view && this.viewCb) {
                this.view = this.viewCb();
            }

            GameManager.Scene().addChild(this.view);

            if (!this.isStarted()) {
                this.mIsStarted = true;
                this.actionListenMap = {};
                ViewStackManager.Instance().push(this);
                this.reset();
                this.init();
                this.initPos();
                this.initView();
            }
        };

        public init(){}
        
        public initPos():void {
            // 计算将Button至于舞台中心的偏移量
            var xOffset = Laya.stage.width / 2 - this.view.width / 2;
            var yOffset = Laya.stage.height / 2 - this.view.height / 2;
            this.view.pos(xOffset, yOffset);
        };
        public initView():void {
        };
        public update():void {
        };
        public reset():void {
        };
        public release():void {
        };
        public exit():void {
            if(!this.mIsStarted)
                return;
            this.mIsStarted = false;
            this.removeAllEvent();
            this.release();
            this.removeView();
            ViewStackManager.Instance().pop();
        };
        private removeView():void {
            if (this.view) {
                GameManager.Scene().removeChild(this.view);
                this.view.destroy();
                this.view = null;
            }
        };
        public addActionEvent(widget, event, ref, cb) {
            var obj = {};
            obj["widget"] = widget;
            obj["event"] = event;
            obj["cb"] = cb;
            obj["ref"] = ref;
            if (this.actionListenMap[widget.name] == null) {
                this.actionListenMap[widget.name] = new Array();
            }
            widget.on(event, ref, cb);
            this.actionListenMap[widget.name].push(obj);
            console.log("add: ", widget.name, this.actionListenMap[widget.name]);
        };
        
        public removeActionEvent(widget, event, ref, cb):void {
            if (this.actionListenMap[widget.name] != null) {
                for (var key in this.actionListenMap[widget.name]) {
                    var kv = this.actionListenMap[widget.name][key];
                    if (cb == kv["cb"]) {
                        console.log("remove: ", widget.name, kv);
                        widget.off(event, ref, cb);
                        break;
                    }
                }
            }
        };
        private removeAllEvent():void {
            if (this.actionListenMap) {
                for (var widget in this.actionListenMap) {
                    var widgetList = this.actionListenMap[widget];
                    for (var key in widgetList) {
                        var obj = widgetList[key];
                        var _widget = obj["widget"];
                        var _event = obj["widget"];
                        var _cb = obj["cb"];
                        var _ref = obj["ref"];
                        _widget.off(_event, _ref, _cb);
                        console.log(">", _widget.name, obj);
                    }
                }
                this.actionListenMap = null;
            }
        };
        
        public isStarted():boolean {
            return this.mIsStarted;
        };

    }
}