module EIGame{
    export class Model_Equip{
        public account:string="";
        public password:string="";
        public uid:string="";
        public key:string="";
        public token:string="";
        public channel:string = "channel";
        public sub_channel:string = "sub_channel";
        public login_btn_name:string = "";
        public cancel_btn_name:string = "";

        sendLoginServer(isRelogin:number = 0){
            let self = this;
            // NetWork.Instance().sendPacket(1000, buffer);
        }

        excutePacket(protoId:number, datas:Uint8Array){
            let self = this;
            var pb:any = ProtobufHelper.Instance().decodeMsg(protoId, datas);
            console.log("[login] 登录返回id ", protoId);
            console.log("[login] 登录返回pb: ", pb);
        }
    }

}