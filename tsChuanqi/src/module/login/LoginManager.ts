module EIGame{
    export class LoginManager extends EIGame.GameNode{
        private static mInstance:LoginManager;
        http_url="";
        socket_url="";
        private isLogined:boolean = false;

        constructor() {
            super();
        }

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new LoginManager();
            }
            return this.mInstance;
        }

        public init(){
            let self = this;
            console.log("DEBUG_MODE ", DEBUG_MODE);
            if(DEBUG_MODE){
                self.http_url = "http://192.168.2.65:9090";
                self.socket_url = "ws://192.168.2.65:8181";
            }else{
                self.http_url = "http://121.42.145.252:9090";
                self.socket_url = "ws://121.42.145.252:443/websocket";
            }
        }

        changeAccount(){
            UIStackManager.Instance().removeAllUIPlane();
            // MainScene.clear();
            LoginMainDlgUI.show();
        }

        breakTest(){

        }

        onloginSucc(next:any){
            if(next){
                next();
            }
        }
       
    }
}