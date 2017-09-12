module EIGame{
    export class View_Login extends View_Base{
        constructor(node:any=null) {
            super();
            this.mView = new ui.test.LoginMainDlgUI();
            this._model = new Model_Login();
        }

        public initView():void {
            this.mView.btn_login.label = this._model.login_btn_name;
            this.mView.btn_cancel.label = this._model.cancel_btn_name;

            this.mView.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.mView.btn_relogin.on(laya.events.Event.CLICK, this, this.onReLoginClick);
            this.mView.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.mView.btn_close.on(laya.events.Event.CLICK, this, ()=>{
                ViewManager.Instance().closeView(ViewType.View_Login);
            });
            this.mView.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.mView.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);
            this.mView.TI_PASSWORD.type = "password";

            GameManager.Instance().on("login_succ", this, this.enterGame);
            GameManager.Instance().on("login_fail", this, this.loginFailed);
        };

        onLoginClick():void {
            var req = this._model.sendLoginServer(0);
        };

        onReLoginClick(){
            var req = this._model.sendLoginServer(1);
        }

        enterGame(){
            ViewManager.Instance().closeView(ViewType.View_Login);
            ViewManager.Instance().openView(ViewType.View_Game);
        }

        loginFailed(){
            console.log("loginFailed~");
        }

        private onAccountInput(input):void {
            this._model.account = input.text;
        };

        private onPasswordInput(input):void {
            this._model.password = input.text;
        };

        private onExit():void {
            ViewManager.Instance().closeView(ViewType.View_Login);
        };

        release(){
            this.mView.btn_login.off(laya.events.Event.CLICK, this, this.onLoginClick);
            this.mView.btn_cancel.off(laya.events.Event.CLICK, this, this.onExit);
            this.mView.TI_ACCOUNT.off(laya.events.Event.INPUT, this, this.onAccountInput);
            this.mView.TI_PASSWORD.off(laya.events.Event.INPUT, this, this.onPasswordInput);
        }
    }
}