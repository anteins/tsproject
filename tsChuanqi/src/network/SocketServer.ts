module EIGame{
    export class SocketServer{
        private static mInstace:SocketServer;
        private ws:Laya.Socket;
        private byte;
        private output;

        constructor(){}

        public static Instance(){
            if(this.mInstace == null){
                this.mInstace = new SocketServer();
            }
            return this.mInstace;
        }

        public initConnect(url:string){
            if(this.ws)
                return;
            this.ws = new Laya.Socket();
            this.byte = new Laya.Byte();
            this.ws.endian = ei_network.Instance().net_endian;
            this.ws.connectByUrl(url);
            this.output = this.ws.output;

            this.ws.on(Laya.Event.OPEN, this, (e:Event=null)=>{
                console.log("[socket] onOpen ", e);
                ei_network.Instance().onSocketConnected(e);
            });
            this.ws.on(Laya.Event.CLOSE, this, (e:CloseEvent=null)=>{
                console.log("[socket] onClosed ", e);
                ei_network.Instance().onSocketClose(e);
            });
            this.ws.on(Laya.Event.MESSAGE, this, (message:any=null)=>{
                // console.log("[socket] Message from server ", message);
                ei_network.Instance().onSocketMessage(message);
            });
            this.ws.on(Laya.Event.ERROR, this, (e:Event=null)=>{
                console.log("[socket] error ", e);
                ei_network.Instance().onSocketError(e);
            });
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

        public closeConnect():void{
            if(this.ws){
                // console.log("[socket] close ");
                this.ws.cleanSocket();
                this.ws.close();
            }
        }

        public sendMessage(msg:any){
            if(this.ws){
                this.ws.send(msg);
            }
        }

        public sendPacket(buffer:Uint8Array):void{
            if(this.ws){
                this.ws.send(buffer);
                // console.log("[socket] send ", buffer);
            }
        }
    }
}