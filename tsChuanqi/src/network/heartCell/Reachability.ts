module EIGame{
    //网络重连检测
    export class Reachability{
        private static mInstance:Reachability;
        static STAT_START=0;        //网络正常状态，简称S
        static STAT_WAIT=1          //网络已经断开，等待网络恢复，简称W
        static STAT_RECONNECT=2     //重新连接状态，简称R
        static STAT_END=3           //重新连接失败，简称E

        private state;

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new Reachability();
            }
            return this.mInstance;
        }

        AddListener(){
            if(Laya.Render.isConchApp )
            {
                conch.setNetworkEvtFunction(function(type)
                {
                    // NET_NO = 0;
                    // NET_WIFI = 1;
                    // NET_2G = 2;
                    // NET_3G = 3;
                    // NET_4G = 4;
                    // NET_UNKNOWN=5
                    alert(type);
                });
            }
        }

        RemoveListener(){

        }

        CheckConnectState(){
            // console.log("CheckConnectState ");
            if(Laya.Render.isConchApp )
            {
                var nType = conch.config.getNetworkType();
                console.log("网络状态 ", nType);
            }
            // var state = _check();
            // if(state){
            //     let count = 0;
            //     while(count < this.try_time){
            //         this.ReConnect();
            //         count++;
            //     }
            // }
        }

        ReConnect(){

        }

        ReachabilityWithAddress(address:string):boolean{
            return true;
        }

        CurState(){

        }


    }

}