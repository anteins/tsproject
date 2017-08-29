module EIGame{
    export class ei_reconnect{
        private static mInstance:ei_reconnect;
        private state_start:number = 0;
        private state_wait:number = 1;
        private state_reconnect:number =2;
        private state_end:number = 3;
        private state = 0;
        //等待网络
        private wait_online_sec:number = 0;
        private wait_online_max_sec:number = 2000;
        //等待连接
        private try_reconnect_sec:number = 0;
        private try_reconnect_max_sec:number = 500;
        private try_reconnect_count:number = 0;
        private try_reconnect_max_count:number = 3;
        private cur_online_state:boolean = false;
        private mIsBreak:boolean = false;
        private mInited = false;

        private reconnectUrl:Array<string> = [
            "ws://192.168.2.65:8181"
        ]

        constructor(){
        }

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ei_reconnect();
            }
            return this.mInstance;
        }

        init(){
            this.mInited = true;
            this.toStart();
        }

        break(){

        }

        reConnect(url:string){
            let self = this;
            try{
                this.try_reconnect_count++;
                if(this.try_reconnect_count > this.try_reconnect_max_count){
                    console.log("[重连机制] 重连次数已满...");
                    self.toEnd();
                    return;
                }
                SocketServer.Instance().reConnect(url);
            }catch(err){
                console.log("[重连机制] error ", err);
                this.onReConnectError();
            }
        }
        
        onlineChanged(isonline){
            let tmp = this.cur_online_state == isonline;
            console.log("[重连机制] 监听", tmp);
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

        onHeartCellTimeOut(){
            console.log("[重连] 心跳包超时");
            if(this.isStarting()){
                this.toReconnect();
            }
        }

        onSocketReConnected(){
            if(this.isReconnecting()){
                console.log("[重连] 重连成功");
                this.toStart();
            }else if(this.isWaitting()){
                console.log("[重连] 低频重连成功");
                this.toStart();
            }
        }

        onReConnectError(){
            if(this.isReconnecting()){
                this.toEnd();
            }
        }

        //连接异常
        onConnectingWarning(tips:string, e:Event){
            console.log("触发重连", tips, e);
            ei_network.Instance().test_down_online();
            if(!this.mInited)
                return;
            if( this.isReconnecting()){
                console.log("重连失败");
                this.toEnd();
                return;
            }
            if(!this.hasConfig()){
                this.toEnd();
            }
            if(this.isStarting()){
                this.toWait();
                return;
            }
        }

        hasConfig(){
            return this.reconnectUrl && this.reconnectUrl.length > 0;
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

        toStart(){
            if(this.isEnding())
                return;
            console.log("重连==>START");
            if(this.isWaitting()){
                this.reset_wait();
            }
            if(this.isReconnecting()){
                HeartCell.Instance().reset();
                HeartCell.Instance().checkHeartBeat();
            }
            this.state = this.state_start;
        }

        toReconnect(){
            if(!this.mInited)
                return;
            console.log("重连==>RECONNECT");
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
            return this.reconnectUrl[0];
        }

        InWaitingState (){
            let self = this;
            // console.log("[等待]", self.wait_online_sec, self.wait_online_max_sec);
            self.wait_online_sec++;
            self.try_reconnect_sec++;
            // console.log("[低频]", self.try_reconnect_sec, self.try_reconnect_max_sec);
            if(self.wait_online_sec < self.wait_online_max_sec){
                //socket连接
                if(ei_network.Instance().connected()){
                    self.toStart();
                }
                //网络连接
                if(!ei_network.Instance().IsOnline()){
                    if(self.try_reconnect_sec >= self.try_reconnect_max_sec){
                        self.try_reconnect_sec = 0;
                        console.log("[等待] 尝试一次重连");
                        // this.reConnect(self.reconnectUrl[0]);  
                    }
                }else{
                    console.log("网络恢复");
                    self.toReconnect();
                }
            }else{
                
                if(!ei_network.Instance().IsOnline()){
                    console.log("超时");
                    self.reset_wait();
                    self.toEnd();
                }else{
                    console.log("超时, 网络恢复");
                    self.toReconnect();
                }
            }
        }

        toWait(){
            if(!this.mInited)
                return;
            console.log("重连==>WAIT");
            let self = this;
            if(this.isEnding())
                return;
            self.state = this.state_wait;
            self.reset_wait();
            Laya.timer.loop(1, this, this.InWaitingState);
        }

        reset_wait(){
            let self = this;
            Laya.timer.clear(this, this.InWaitingState);
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
            console.log("重连==>END");
            if(this.isWaitting()){
                this.reset_wait();
            }

            let self = this;
            this.state = self.state_end;
            ei_network.Instance().ClosedConnectFinall();
            self.showNetErrorDialog(()=>{
                if(self.hasConfig()){
                    self.toReconnect();
                }else{
                    Game.exit();
                }
                
            }, ()=>{
                Game.exit();
            });
        }

        showNetErrorDialog(onYes, onNo){
            alert("是否重连？");
            onYes();
        }
    }
}