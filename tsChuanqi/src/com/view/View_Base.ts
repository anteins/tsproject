module EIGame{
    export class View_Base extends laya.display.Node{
        protected mView:any;
        protected _model:Model_Login;
        public name:string="";
        public mIsStarted:boolean;
        public mEventList: { [name: string]: Array<any>; } = {};

        public init(){
            if (!this.isStarted()) {
                this.mIsStarted = true;
                this.reset();
                this.initView();
                this.initViewPos();
            }
        }

        public getView(){
            return this.mView;
        }

        public initView():void {
        };

        public initViewPos():void {
            // 计算将Button至于舞台中心的偏移量
            var xOffset = Laya.stage.width / 2 - this.mView.width / 2;
            var yOffset = Laya.stage.height / 2 - this.mView.height / 2;
            this.mView.pos(xOffset, yOffset);
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
            // this.removeAllEvent();
            this.release();
        };
        
        public isStarted():boolean {
            return this.mIsStarted;
        };

        public addActionEvent(widget, event, ref, cb) {
            var obj = {};
            obj["widget"] = widget;
            obj["event"] = event;
            obj["cb"] = cb;
            obj["ref"] = ref;
            if (this.mEventList[widget.name] == null) {
                this.mEventList[widget.name] = new Array();
            }
            widget.on(event, ref, cb);
            this.mEventList[widget.name].push(obj);
            console.log("add: ", widget.name, this.mEventList[widget.name]);
        };

        public removeActionEvent(widget, event, ref, cb):void {
            if (this.mEventList[widget.name] != null) {
                for (var key in this.mEventList[widget.name]) {
                    var kv = this.mEventList[widget.name][key];
                    if (cb == kv["cb"]) {
                        console.log("remove: ", widget.name, kv);
                        widget.off(event, ref, cb);
                        break;
                    }
                }
            }
        };

        private removeAllEvent():void {
            if (this.mEventList) {
                for (var widget in this.mEventList) {
                    var widgetList = this.mEventList[widget];
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
                this.mEventList = null;
            }
        };
    }
}