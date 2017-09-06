module EIGame{
    export class ViewManager extends laya.ui.View{
        private static mInstance:ViewManager;
        private mViewStack = null;
        private mCurViewList:{ [name: string]: View_Base; };
        private mViewList:{ [name: string]: View_Base; };
        public rootScene:any = null;
        private mCurView:View_Base = null;

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ViewManager();
            }
            return this.mInstance;
        }

        constructor(){
            super();
            this.mViewStack = new Array();
            this.mViewList = {};
            this.mCurViewList = {};
            this.rootScene = Laya.stage;
            // Laya.stage = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
        }

        public addView(viewName:string, viewClazz:any){
            if(this.mViewList[viewName] == null){
                let view = new viewClazz();
                view.name = viewName;
                this.mViewList[viewName] = view;
            }
        }

        public openView(viewName:string){
            let view:View_Base = this.mViewList[viewName];
            if (view != null && !view.isStarted()) {
                view.init();
                Laya.stage.addChild(view.mView);
                this.mCurView = view;
            }
        }

        public closeView(viewName:string){
            let view:any = this.mViewList[viewName];
            if (view != null && view.isStarted()) {
                    Laya.stage.removeChild(view.mView);
                    this.mCurView = null;
                    view.exit();
            }
        }

        push(view):void{
            if(this.mViewStack){
                this.mViewStack.push(view);
            }
        }

        pop(view):View_Base{
            let ret = null;
            if(this.mViewStack && this.mViewStack.length > 0){
                ret = this.mViewStack.pop();
            }
            return ret;
        }

        removeAllView(){
            for(let viewName in this.mViewList){
                if(this.mViewList[viewName]){
                    console.log("closeView ", viewName);
                    this.closeView(viewName);
                }
            }
        }

        count(){
            return this.mViewStack.length;
        }
    }
}