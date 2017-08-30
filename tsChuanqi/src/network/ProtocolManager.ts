module EIGame{
    export class ProtocolManager extends EIGame.EISingleton{
        private static mInstance:ProtocolManager;
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ProtocolManager();
            }
            return this.mInstance;
        }

        public ProtoBuf:any = Browser.window.protobuf;
        private mRoot;
        private protoLoadedMap: { [name: string]: any; } = {};
        private rootpath:string = "../src/network/message/";

        public init(){
        }

        load(protoList:Array<string>, cb:any=null){
            for(let i=0; i < protoList.length; i++){
                protoList[i] = this.rootpath + protoList[i];
            }
            this._load(protoList, cb);
        }

        private _load(protoList:any, cb:any=null){
            var self = this;
            if(Browser.window.protobuf){
                Browser.window.protobuf.load(protoList, function (err:any, root:any){
                    if (err)
                        throw err;
                    
                    self.mRoot = root;

                    if(cb){
                        cb(err, root);
                    }
                });
            }
        }

        public encodeMsg(protoId:number, List:any):Uint8Array{
            let self = this;
            if(self.mRoot == null)
                throw Error("mRoot is null.");

            let msgName = ExcutePacketRoute.Instance().get_msg(protoId);
            let Message = self.mRoot.lookup(msgName);
            if(!Message)
                throw Error("no this message '" + msgName + "'");

            let msg:any = Message.create(List);
            let errMsg:any = Message.verify(msg);
            if (errMsg)
                throw Error("message verify: " + errMsg);

            let buffer:Uint8Array = Message.encode(msg).finish();
            return buffer;
        }

        public decodeMsg(protoId:number, buf:Uint8Array):any{
            let self = this;
            let pb = null;
            if(self.mRoot == null){
                throw Error("mRoot is null.");
            }

            let msgName = ExcutePacketRoute.Instance().get_msg(protoId);
            let pbMessage = self.mRoot.lookup(msgName);
            if(!pbMessage){
                throw Error("no this message '" + msgName + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        }

        getRoot(){
            return this.mRoot;
        }
    }
}