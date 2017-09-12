module EIGame{
    export class View_Game extends View_Base{
        protected mView:ui.test.GameSceneUI;

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
            this.mView.GAME_BTN_EXITGAME.on(laya.events.Event.CLICK, this, ()=>{
                NetWork.Instance().closeConnect();
                ViewManager.Instance().closeView(ViewType.View_Game);
            });
            this.mView.GAME_BTN_CLOSE.on(laya.events.Event.CLICK, this, ()=>{
                ViewManager.Instance().closeView(ViewType.View_Game);
            });

            this.mView.GAME_IMG_ICEMAN.on(laya.events.Event.CLICK, this, ()=>{
                ViewManager.Instance().closeView(ViewType.View_Game);
                GameManager.Instance().initGameMainUIScene();
            });
        };

        public release(){
        }

    }
}