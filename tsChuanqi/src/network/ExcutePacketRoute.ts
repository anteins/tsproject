module EIGame{
    //protocol route
    export class ExcutePacketRoute extends EIGame.EISingleton{
        private static mInstance:ExcutePacketRoute;
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ExcutePacketRoute();
            }
            return this.mInstance;
        }

        RouteMap = {
            1000:{
                "msg":"c2s_auth_key",         
                "excute":null
            },
            1001:{
                "msg":"s2c_auth_key",         
                "excute":this.excuteLoginServer
            },
            1002:{
                "msg":"p_role_base",          
                "excute":null
            },
            1003:{
                "msg":"p_kv",                 
                "excute":null
            },
            1004:{
                "msg":"c2s_heart_beat",       
                "excute":null
            },
            1005:{
                "msg":"s2c_heart_beat",       
                "excute":this.excuteHeartBeat
            },
            1006:{
                "msg":"c2s_re_connect",       
                "excute":this.excuteTmp
            },
        }

        get_msg(protoId:number){
            var self = this;
            if(self.RouteMap[protoId] && self.RouteMap[protoId]["msg"]){
                // console.log("msg: ", self.RouteMap[protoId]);
                return self.RouteMap[protoId]["msg"];
            }
        }

        route(protoId:number, datas:Uint8Array){
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if(self.RouteMap[protoId] && self.RouteMap[protoId]["excute"]){
                self.RouteMap[protoId]["excute"](protoId, datas);
            }
        }

        excuteLoginServer(protoId:number, datas:Uint8Array){
            LoginMainDlgUI.Instance().excutePacket(protoId, datas);
        }

        excuteHeartBeat(protoId:number, datas:Uint8Array){
            HeartBeatManager.Instance().excutePacket(protoId, datas);
        }
        excuteTmp(protoId:number, datas:Uint8Array){
            var pb:any = ProtocolManager.decodeMsg(protoId, datas);
        }
    }
}