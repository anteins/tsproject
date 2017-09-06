module EIGame{
    export class ProtobufHelper extends laya.events.EventDispatcher{
        private static mInstance:ProtobufHelper;
        public ProtoBuf:any = Browser.window.protobuf;
        private mRoot;
        private protoLoadedMap: { [name: string]: any; } = {};
        private rootpath:string = "./message/";
        mIsPreLoad = false;
        private completeFunc:any = null;
        
        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ProtobufHelper();
            }
            return this.mInstance;
        }

        load(protoList:Array<string>, cb:any=null){
            var self = this;
            for(let i=0; i < protoList.length; i++){
                protoList[i] = this.rootpath + protoList[i];
            }

            self.completeFunc = cb;
            if(Browser.window.protobuf){
                Browser.window.protobuf.load(protoList, function (err:any, root:any){
                    if (err){
                        console.log("pb err ", err);
                        throw err;
                    }
                    self.mRoot = root;
                    self.event(Laya.Event.LOADED);
                });
            }
        }

        encodeMsg(protoId:number, List:any):Uint8Array{
            let self = this;
            if(self.mRoot == null)
                throw Error("mRoot is null.");

            let msgName = excutePacketRoute.Instance().get_msg(protoId);
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

        decodeMsg(protoId:number, buf:Uint8Array):any{
            let self = this;
            let pb = null;
            if(self.mRoot == null){
                throw Error("mRoot is null.");
            }

            let msgName = excutePacketRoute.Instance().get_msg(protoId);
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