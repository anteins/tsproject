module EIGame{
    //protocol route
    export class excutePacketRoute extends EIGame.EISingleton{
        private static mInstance:excutePacketRoute;
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new excutePacketRoute();
            }
            return this.mInstance;
        }

        RouteMap = {
            1000:{
                "message":"c2s_auth_key",
                "route":null
            },
            1001:{
                "message":"s2c_auth_key",         
                "route":this.excuteLoginServer
            },
            1002:{
                "message":"p_role_base",          
                "route":null
            },
            1003:{
                "message":"p_kv",                 
                "route":null
            },
            1004:{
                "message":"c2s_heart_beat",       
                "route":null
            },
            1005:{
                "message":"s2c_heart_beat",       
                "route":this.excuteHeartBeat
            },
            1006:{
                "message":"c2s_re_connect",       
                "route":this.excuteTmp
            },
        }

        get_msg(protoId:number){
            var self = this;
            if(self.RouteMap[protoId] && self.RouteMap[protoId]["message"]){
                // console.log("msg: ", self.RouteMap[protoId]);
                return self.RouteMap[protoId]["message"];
            }
        }

        route(protoId:number, datas:Uint8Array){
            var self = this;
            // console.log("excute[route] ", protoId, self.RouteMap[protoId]);
            if(self.RouteMap[protoId] && self.RouteMap[protoId]["route"]){
                self.RouteMap[protoId]["route"](protoId, datas);
            }
        }

        //----------------------------------------------- execute -----------------------------------------------
        excuteLoginServer(protoId:number, datas:Uint8Array){
            ModelManager.Instance().getModel("Model_Login").excutePacket(protoId, datas);
        }

        excuteHeartBeat(protoId:number, datas:Uint8Array){
            HeartBeatManager.Instance().excutePacket(protoId, datas);
        }
        excuteTmp(protoId:number, datas:Uint8Array){
            var pb:any = ProtobufHelper.Instance().decodeMsg(protoId, datas);
            ModelManager.Instance().getModel("Model_Login").excutePacket(protoId, datas);
        }
    }
}