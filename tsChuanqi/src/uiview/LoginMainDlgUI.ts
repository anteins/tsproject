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
            // //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
            // this.addActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin);
            // // this.addActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin2);
            // this.addActionEvent(this.view.btn_cancel, laya.events.Event.CLICK, this, this.onExit);
            // this.addActionEvent(this.view.TI_ACCOUNT, laya.events.Event.INPUT, this, this.onAccountInput);
            // this.addActionEvent(this.view.TI_PASSWORD, laya.events.Event.INPUT, this, this.onPasswordInput);
            // this.removeActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, this.onLogin);
            // this.removeActionEvent(this.view.btn_login, laya.events.Event.CLICK, this, ()=>{
            // });

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

        setAccount(text){
            this.account = text;
        }

        setPassword(text){
            this.password = text;
        }

        private onAccountInput(input):void {
            this.setAccount(input.text);
        };

        private onPasswordInput(input):void {
            this.setPassword(input.text);
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
            var buffer:Uint8Array = pbManager.Instance().encodeMsg(1000, {
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
            var pb:any = pbManager.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        }

        // excutePacket_test(){
        //     let self = this;
        //     var Message = pbManager.Instance().getRoot().lookup(PROTOCOL_ID[1001]);
        //     var ss = [0,0,3,233,10,4,118,49,46,49,16,100,24,199,1,33,0,0,0,0,128,179,197,64,42,48,9,0,0,0,0,0,72,143,64,18,5,110,105,104,97,111,26,5,104,101,108,108,111,32,233,7,40,10,48,40,56,228,2,64,10,72,1,80,199,15,88,225,223,228,18,104,215,8,56,245,78,72,135,93,80,215,8];
        //     var byte:Laya.Byte = new Laya.Byte(ss);
        //     let [id, datas] = ei_network.Instance().unpack(byte);
        //     id = id as number;
        //     datas = datas as Uint8Array;
        //     var pb = Message.decode(datas);
        //     console.log("预备Byte id ", id);
        //     console.log("预备Byte pb: ", pb, datas.length);
        // }
    }
}