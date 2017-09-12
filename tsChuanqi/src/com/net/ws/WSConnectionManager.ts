module EIGame{
    export class WSConnectionManager{
        private ws:Laya.Socket;
        private byte;
        private output;

        constructor(){}

        public connect(host: string, port: number):void{
            if(this.ws){
                this.ws.connect(host, port);
            }
        }

        public init(){
            if(this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            this.ws.endian = NetWork.Instance().net_endian;
            this.output = this.ws.output;

            this.ws.on(Laya.Event.OPEN, this, (e:Event=null)=>{
                // console.log("[socket] onOpen ", e);
                NetWork.Instance().onSocketConnected(e);
            });
            this.ws.on(Laya.Event.CLOSE, this, (e:CloseEvent=null)=>{
                // console.log("[socket] onClosed ", e);
                NetWork.Instance().onSocketClose(e);
            });
            this.ws.on(Laya.Event.MESSAGE, this, (message:any=null)=>{
                // console.log("[socket] Message from server ", message);
                NetWork.Instance().onSocketMessage(message);
            });
            this.ws.on(Laya.Event.ERROR, this, (e:Event=null)=>{
                // console.log("[socket] error ", e);
                NetWork.Instance().onSocketError(e);
            });
        }

        public connectByUrl(url:string):void{
            if(this.ws){
                this.ws.connectByUrl(url);
            }
        }

        public reConnect(url:string){
            try{
                if(this.ws && url){
                    this.ws.connectByUrl(url);
                }
            }catch(err){
                console.log("[socket] 重连Error ", err);
            }
        }

        connected():boolean{
            if(this.ws){
                return this.ws.connected;
            }
            return false;
        }

        public close():void{
            if(this.ws){
                console.log("[socket] close ");
                this.ws.cleanSocket();
                this.ws.close();
            }
        }

        public send(buffer:Uint8Array):void{
            if(this.ws){
                this.ws.send(buffer);
                // console.log("[socket] send ", buffer);
            }
        }
    }
}