
module EIGame{
    export class httpServer{
        private static mInstace:httpServer;
        private xhr:Laya.HttpRequest;
        private timeout:number = 10000;
        private header:Array<any> = 
        [
            "Access-Control-Allow-Origin", "*", 
            "Access-Control-Allow-Headers", "X-Requested-With", 
            "Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"
        ];

        constructor(){
            this.init();
        }

        public static Instance(){
            if(this.mInstace == null){
                this.mInstace = new httpServer();
            }
            return this.mInstace;
        }

        private init():void{
            var self = this;
        }

        public require4(url:string, datas:any, method:string, responseType:string, cb:any=null):void{
            var self = this;
            self._require(url, datas, method, responseType, cb);
        }

        private _require(url:string, datas:any, method:string, responseType:string, cb:any=null):void{
            var self = this;
            var xhr:Laya.HttpRequest = new Laya.HttpRequest();
            xhr.http.timeout = self.timeout;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, self, (data:Object)=>{
                console.log("http completeHandler: ", data);
                if(cb){
                    cb(xhr.data);
                }
            });
            xhr.once(Laya.Event.ERROR, self, (e:Object)=>{
                console.log("http errorHandler: ", e);
                
            });
            xhr.on(Laya.Event.PROGRESS, self, (data:Object)=>{
                console.log("http processHandler: ", data);
            });

            if(method == "post"){
                console.log("[http] post ", datas);
                xhr.send(url, datas, method, responseType);
            }else if(method == "get"){
                url = url + "?" + datas;
                console.log("[http] get ", url);
                xhr.send(url, "", method, responseType);
            }
        }
    }

}
        