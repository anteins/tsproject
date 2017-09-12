module EIGame{
    export class Model_Login{
        public account:string="";
        public password:string="";
        public uid:string="";
        public key:string="";
        public token:string="";
        public channel:string = "channel";
        public sub_channel:string = "sub_channel";
        public login_btn_name:string = "登录";
        public cancel_btn_name:string = "取消";

        loginInfo(isRelogin:number):any{
            //测试数据
            var time_mix = timeUtil.getTimeStamp();
            var os = PlatformUtil.getPlatform();
            this.token = "123456";
            var info = {
                "uid"           :   this.account,
                "key"           :   this.key,
                "agent_id"      :   1235,
                "server_id"     :   5555,
                "platform"      :   12,
                "isReconnect"   :   isRelogin,
                "token"         :   this.token,
                "channel"       :   this.channel,
                "sub_channel"   :   this.sub_channel,
                "time_mix"      :   time_mix,
                "os"            :   os,
                "cpu_num"       :   6,
                "front_version" :   "v1.2",
                "imei"          :   "imei_120",
                "device"        :   "device_120",
                "phoneSystem"   :   "phone_system_120",
                "sessionId"     :   "session_id_120",
                "time"          :   "time_120"
            };
            return info;
        }

        sendLoginServer(isRelogin:number = 0){
            let self = this;
            let info = self.loginInfo(isRelogin);
            var buffer:Uint8Array = ProtobufHelper.Instance().encodeMsg(1000, {
                uid             :info["uid"],
                key             :info["key"],
                frontVersion    :info["front_version"],
                agentId         :info["agent_id"],
                serverId        :info["server_id"],
                platform        :info["platform"],
                isReconnect     :info["isReconnect"],
                imei            :info["imei"],
                device          :info["device"],
                phoneSystem     :info["phoneSystem"],
                sessionId       :info["sessionId"],
                time            :info["time"]
            });

            console.log("uid ", info["uid"]);
            console.log("front_version ", info["front_version"]);
            console.log("agent_id ", info["agent_id"]);
            console.log("server_id ", info["server_id"]);
            console.log("platform ", info["platform"]);
            console.log("imei ", info["imei"]);
            console.log("device ", info["device"]);
            console.log("phoneSystem ", info["phoneSystem"]);
            console.log("sessionId ", info["sessionId"]);
            console.log("time ", info["time"]);

            NetWork.Instance().sendPacket(1000, buffer);
        }

        excutePacket(protoId:number, datas:Uint8Array){
            let self = this;
            var pb:any = ProtobufHelper.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            // console.log("[login] 登录返回pb: ", pb);
            GameManager.Instance().event("login_succ");
        }
    }

}