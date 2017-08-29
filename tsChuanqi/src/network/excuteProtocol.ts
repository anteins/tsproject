module EIGame{
    //protocol route
    export class excuteProtocol{
        private static mInstance:excuteProtocol;
        private id:number = 0;
        private bytes:Laya.Byte;
        constructor(){
            this.bytes = new Laya.Byte();
        }

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new excuteProtocol();
            }
            return this.mInstance;
        }

        RouteMap = {
            1001:this.excuteLoginServer,
            1005:this.excuteHeartBeat,
            1006:this.excuteTmp,
        }

        route(protoId:number, datas:Uint8Array){
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if(self.RouteMap[protoId]){
                self.RouteMap[protoId](protoId, datas);
            }
        }

        excuteLoginServer(protoId:number, datas:Uint8Array){
            LoginMainDlgUI.Instance().excutePacket(protoId, datas);
        }

        excuteHeartBeat(protoId:number, datas:Uint8Array){
            HeartCell.Instance().excutePacket(protoId, datas);
        }
        excuteTmp(protoId:number, datas:Uint8Array){
            // console.log("~ 1006 ~ ", datas);
            var pb:any = pbManager.Instance().decodeMsg(protoId, datas);
        }
    }
}