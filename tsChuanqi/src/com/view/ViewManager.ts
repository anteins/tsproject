module EIGame{

    export enum ViewType {
        View_Login = 1,
        View_Game,
        View_Samples,
        View_TEST2D,
    }
    export class ViewManager extends laya.ui.View{
        private static mInstance:ViewManager;
        private mViewStack = null;
        private mViewList:{ [name: number]: View_Base; };
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
            this.rootScene = Laya.stage;
            // Laya.stage = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
        }

        public addView(viewType:number, viewClazz:any){
            if(this.mViewList[viewType] == null){
                let view = new viewClazz();
                view.name = viewType;
                this.mViewList[viewType] = view;
            }
        }

        public openView(viewType:number){
            let view:View_Base = this.mViewList[viewType];
            if (view != null && !view.isStarted()) {
                view.init();
                Laya.stage.addChild(view.getView());
                this.mCurView = view;
            }
        }

        public closeView(viewType:number){
            let view:any = this.mViewList[viewType];
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
            for(let type in this.mViewList){
                if(this.mViewList[type]){
                    this.closeView(parseInt(type));
                }
            }
        }

        count(){
            return this.mViewStack.length;
        }
    }
}