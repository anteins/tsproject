module EIGame{
    export class View_Game extends ViewManager{
        private static mInstance:View_Game;

        constructor(node:any=null) {
            super();
            this.LoadView("ui.test.GameSceneUI", function () {
                return new ui.test.GameSceneUI();
            });
        }

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new EIGame.View_Game();
            }
            return this.mInstance;
        }

        public static show(){
            this.Instance().show();
        }

        public initView():void {
            var self = this;
            this.view.GAME_BTN_CHANGE.on(laya.events.Event.CLICK, this, ()=>{
                LoginManager.changeAccount();
            });
            this.view.GAME_BTN_BREAK.on(laya.events.Event.CLICK, this, ()=>{
                LoginManager.breakTest();
            });
            this.view.GAME_BTN_EXIT.on(laya.events.Event.CLICK, this, ()=>{
                ei_network.Instance().closeConnect();
            });
        };

        private onLogin():void {
           
        };

     
        private onExit():void {
            this.exit();
        };

        public release(){
        }

    }
}