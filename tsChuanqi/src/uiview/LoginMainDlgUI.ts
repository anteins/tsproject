module EIGame{
    export class LoginMainDlgUI extends UIPlane{
        private static mInstance:LoginMainDlgUI;
        private loginManager:EIGame.LoginManager;
        private account:string="";
        private password:string="";
        private uid:string="";
        private key:string="";
        private token:string="";
        private channel:string = "channel";
        private sub_channel:string = "sub_channel";
        private manager = LoginManager.Instance();

        private startLogin

        constructor(node:any=null) {
            super();
            this.loginManager = node;
            this.LoadView("ui.test.LoginMainDlgUI", function () {
                return new ui.test.LoginMainDlgUI();
            });
        }

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new EIGame.LoginMainDlgUI();
            }
            return this.mInstance;
        }

        public static show(){
            this.Instance().show();
        }

        public initView():void {
            this.view.btn_login.on(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_relogin.on(laya.events.Event.CLICK, this, this.onReLoginClick);
            this.view.btn_cancel.on(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.on(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.on(laya.events.Event.INPUT, this, this.onPasswordInput);

            this.view.TI_PASSWORD.type = "password";
        };

        onLoginClick():void {
            var self = this;
            var req = LoginMainDlgUI.Instance().sendLoginServer(0);
            console.log("[login] WS", req);
        };

        onReLoginClick(){
            var self = this;
            var req = LoginMainDlgUI.Instance().sendLoginServer(1);
            console.log("[RElogin] WS", req);
        }

        enterGame(){
            this.exit();
            GameSceneUI.show();
        }

        private onAccountInput(input):void {
            this.account = input.text;
        };

        private onPasswordInput(input):void {
            this.password = input.text;
        };

        private onExit():void {
            this.exit();
        };

        release(){
            this.view.btn_login.off(laya.events.Event.CLICK, this, this.onLoginClick);
            this.view.btn_cancel.off(laya.events.Event.CLICK, this, this.onExit);
            this.view.TI_ACCOUNT.off(laya.events.Event.INPUT, this, this.onAccountInput);
            this.view.TI_PASSWORD.off(laya.events.Event.INPUT, this, this.onPasswordInput);
        }

        loginInfo():any{
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
                "token"         :   this.token,
                "channel"       :   this.channel,
                "sub_channel"   :   this.sub_channel,
                "time_mix"      :   time_mix,
                "os"            :   os,
                "cpu_num"       :   6,
                "front_version" :   "v1.2"
            };
            return info;
        }

        sendLoginServer(isRelogin:number = 0){
            let self = this;
            let info = self.loginInfo();
            var buffer:Uint8Array = ProtocolManager.Instance().encodeMsg(1000, {
                uid:info["uid"],
                key:info["key"],
                frontVersion:info["front_version"],
                agentId:info["agent_id"],
                serverId:info["server_id"],
                platform:info["platform"],
                isReconnect: isRelogin,
                imei:"imei_120",
                device:"device_120",
                phoneSystem:"phone_system_120",
                sessionId:"session_id_120",
                time:"time_120"
            });

            console.log("账号 ",this.account);
            console.log("uid ", info["uid"]);
            console.log("密码 ", this.password);
            console.log("userId ", this.account);
            console.log("token ", this.token);
            console.log("channel ", this.channel);
            console.log("时间戳 ", info["time_mix"]);
            console.log("OS ", info["os"]);
            console.log("平台 ", info["platform"]);
            console.log("重连 ", isRelogin);

            ei_network.Instance().sendPacket(1000, buffer);
        }

        excutePacket(protoId:number, datas:Uint8Array){
            let self = this;
            var pb:any = ProtocolManager.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        }
    }
}