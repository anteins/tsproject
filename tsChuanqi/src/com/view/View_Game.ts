module EIGame{
    export class View_Game extends View_Base{
        constructor(node:any=null) {
            super();
            this.mView = new ui.test.GameSceneUI();
            this._model = new Model_Login();
        }

        public initView():void {
            var self = this;
            this.mView.GAME_BTN_CHANGE.on(laya.events.Event.CLICK, this, ()=>{
                LoginManager.changeAccount();
            });
            this.mView.GAME_BTN_BREAK.on(laya.events.Event.CLICK, this, ()=>{
                LoginManager.breakTest();
            });
            this.mView.GAME_BTN_EXIT.on(laya.events.Event.CLICK, this, ()=>{
                NetWork.Instance().closeConnect();
            });
            this.mView.GAME_BTN_CLOSE.on(laya.events.Event.CLICK, this, ()=>{
                ViewManager.Instance().closeView("View_Game");
            });
        };

        private onExit():void {
            this.exit();
        };

        public release(){
        }

    }
}