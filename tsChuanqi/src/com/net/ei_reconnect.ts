module EIGame{
    export class ei_reconnect extends EIGame.EISingleton{
        private static mInstance:ei_reconnect;
        private state_start:number = 0;
        private state_wait:number = 1;
        private state_reconnect:number =2;
        private state_end:number = 3;
        private state = 0;
        //等待网络
        private wait_online_sec:number = 0;
        private wait_online_max_sec:number = 1000;
        //等待连接
        private try_reconnect_sec:number = 0;
        private try_reconnect_max_sec:number = 500;
        private try_reconnect_count:number = 0;
        private try_reconnect_max_count:number = 3;
        private cur_online_state:boolean = false;
        private mIsBreak:boolean = false;
        private mInited = false;
        private tag = "重连";

        private configs:Array<string> = [
            "ws://192.168.2.65:8181"
        ]

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ei_reconnect();
            }
            return this.mInstance;
        }

        init(){
            this.mInited = true;
            Laya.timer.loop(1, this, this.InWaitingState);
            this.toStart();
        }

        break(){

        }

        reConnect(url:string){
            NetWork.Instance().reConnect(url);
        }

        onReConnect(result:string){
            if(result == "fail"){
                console.log(this.state_tag() + "重连失败");
                this.try_reconnect_count++;
                if(this.try_reconnect_count > this.try_reconnect_max_count){
                    console.log(this.state_tag() + "重连次数已满...");
                    this.toEnd();
                }
            }else if(result == "success"){
                
                this.toStart();
            }
        }
        
        onlineChanged(isonline){
            let tmp = this.cur_online_state == isonline;
            // console.log("[重连] 监听", tmp);
            //断网
            if(tmp == false){
                if(this.isStarting()){
                    this.toWait();
                }
            //恢复网络
            }else{
                if(this.isWaitting()){
                    this.toReconnect();
                }else if (this.isReconnecting()){
                    this.toWait();
                }
            }
        }

        onHeartBeatTimeOut(){
            console.log(this.state_tag() + "心跳包超时");
            if(this.isStarting()){
                this.toReconnect();
            }
        }

        onSocketReConnected(){
            if(this.isReconnecting()){
                console.log(this.state_tag() + "重连成功");
                this.onReConnect("success");
            }else if(this.isWaitting()){
                console.log(this.state_tag() + "低频重连成功");
                this.onReConnect("success");
            }
        }

        //连接异常
        onConnectingException(tips:string, e:Event){
            console.log(this.state_tag() + "触发!", e);
            // NetWork.Instance().test_down_online();
            if(!this.mInited)
                return;

            if( this.isReconnecting()){
                this.onReConnect("fail");
                return;
            }
            //缺少配置不进行重连
            if(!this.hasConfig()){
                this.toEnd();
            }
            //重复确认一次连接情况
            if(NetWork.Instance().connected()){
                this.toStart();
                return;
            }
            //等待一段时间连接上网络
            if(this.isStarting()){
                this.toWait();
                return;
            }
        }

        hasConfig(){
            return this.configs && this.configs.length > 0;
        }

        isStarting(){
            return this.state == this.state_start;
        }

        isWaitting(){
            return this.state == this.state_wait;
        }

        isReconnecting(){
            return this.state == this.state_reconnect;
        }

        isEnding(){
            return this.state == this.state_end;
        }

        curState(){
            if(this.isStarting()){
                return "start";
            }else if(this.isWaitting()){
                return "wait";
            }else if(this.isReconnecting()){
                return "reconnect";
            }else if(this.isEnding()){
                return "end";
            }
        }

        toStart(){
            if(this.isEnding())
                return;
            // console.log(this.state_tag() + "==> START");
            if(this.isWaitting()){
                this.reset_wait();
            }
            if(this.isReconnecting()){
                HeartBeatManager.Instance().reset();
                HeartBeatManager.Instance().checkHeartBeat();
            }
            this.state = this.state_start;
        }

        toReconnect(){
            if(!this.mInited)
                return;
            // console.log(this.state_tag() + "==> RECONNECT");
            if(this.isWaitting()){
                this.reset_wait();
            }else if(this.isEnding()){
                this.reset_reconnect();
            }
            this.state = this.state_reconnect;
            if(this.hasConfig()){
                this.reConnect(this.getConfigURL());
            }
        }

        getConfigURL(){
            return this.configs[0];
        }

        InWaitingState (){
            let self = this;
            if(!self.isWaitting())
                return;
            // console.log("[等待]", self.wait_online_sec, self.wait_online_max_sec);
            self.wait_online_sec++;
            self.try_reconnect_sec++;
            // console.log("[低频]", self.try_reconnect_sec, self.try_reconnect_max_sec);
            if(self.wait_online_sec < self.wait_online_max_sec){
                //socket连接
                if(NetWork.Instance().connected()){
                    self.toStart();
                }
                //网络连接
                if(!NetWork.Instance().IsOnline()){
                    if(self.try_reconnect_sec >= self.try_reconnect_max_sec){
                        self.try_reconnect_sec = 0;
                        console.log(this.state_tag() + "wait，尝试一次重连");
                        this.reConnect(self.configs[0]);  
                    }
                }else{
                    console.log(this.state_tag() + "wait，网络恢复");
                    self.toReconnect();
                }
            }else{
                
                if(!NetWork.Instance().IsOnline()){
                    console.log(this.state_tag() + "wait，超时");
                    self.toEnd();
                }else{
                    console.log(this.state_tag() + "wait超时，网络恢复");
                    self.toReconnect();
                }
            }
        }

        state_tag():string{
            let str = "[" + this.tag;
            if(this.isStarting()){
                str = str + "start";
            }else if(this.isWaitting()){
                str = str + "wait";
            }else if(this.isReconnecting()){
                str = str + "reconnect";
            }else if(this.isEnding()){
                str = str + "end";
            }
            str = str + "] ";
            return str;
        }

        toWait(){
            if(!this.mInited)
                return;
            // console.log(this.state_tag() + "==> WAIT");
            let self = this;
            if(this.isEnding())
                return;
            self.state = this.state_wait;
            self.reset_wait();
        }

        reset_wait(){
            let self = this;
            self.wait_online_sec = 0;
            self.try_reconnect_sec = 0;
        }

        reset_reconnect(){
            let self = this;
            self.try_reconnect_count = 0;
        }

        toEnd(){
            if(!this.mInited)
                return;
            // console.log(this.state_tag() + "==> END");
            if(this.isWaitting()){
                this.reset_wait();
            }

            let self = this;
            this.state = self.state_end;
            NetWork.Instance().clearConnect();
            self.showNetErrorDialog(()=>{
                if(self.hasConfig()){
                    self.toReconnect();
                }else{
                    //Game.exit();
                }
                
            }, ()=>{
                //Game.exit();
            });
        }

        showNetErrorDialog(onYes, onNo){
            alert(this.state_tag() + "是否重连？");
            onYes();
        }
    }
}