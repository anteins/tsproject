module EIGame{
    export class LoginManager{
        static http_url="http://192.168.2.65:9090";
        static socket_url="ws://192.168.2.65:8181";
        private static isLogined:boolean = false;

        constructor() {
        }

        static init(){
            console.log("DEBUG_MODE ", DEBUG_MODE);
            if(DEBUG_MODE){
                this.http_url = "http://192.168.2.65:9090";
                this.socket_url = "ws://192.168.2.65:8181";
            }else{
                this.http_url = "http://121.42.145.252:9090";
                this.socket_url = "ws://121.42.145.252:443/websocket";
            }
        }

        static changeAccount(){
            ViewStackManager.Instance().removeAllUIPlane();
            // MainScene.clear();
            View_Login.show();
        }

        static breakTest(){

        }

        onloginSucc(next:any){
            if(next){
                next();
            }
        }
    }
}