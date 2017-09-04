module EIGame{
    export class ProtobufHelper{
        public ProtoBuf:any = Browser.window.protobuf;
        private static mRoot;
        private static protoLoadedMap: { [name: string]: any; } = {};
        private static rootpath:string = "./message/";
        static mIsPreLoad = false;

        static init(next){
            let self = this;
            let files = [
                "pb.proto",
                "awesome.proto",
                "demopb.proto",
                "login.proto"
            ];
            this.load(files, (err:any)=>{
                next(err);
            });
        }

        static load(protoList:Array<string>, cb:any=null){
            for(let i=0; i < protoList.length; i++){
                protoList[i] = this.rootpath + protoList[i];
            }
            this._load(protoList, cb);
        }

        private static _load(protoList:any, cb:any=null){
            var self = this;
            if(Browser.window.protobuf){
                Browser.window.protobuf.load(protoList, function (err:any, root:any){
                    if (err){
                        console.log("pb err ", err);
                        throw err;
                    }
                    
                    self.mRoot = root;

                    if(cb){
                        cb(err);
                    }
                });
            }
        }

        static encodeMsg(protoId:number, List:any):Uint8Array{
            let self = this;
            if(self.mRoot == null)
                throw Error("mRoot is null.");

            let msgName = ExecutePacketNetRoute.Instance().get_msg(protoId);
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

        static decodeMsg(protoId:number, buf:Uint8Array):any{
            let self = this;
            let pb = null;
            if(self.mRoot == null){
                throw Error("mRoot is null.");
            }

            let msgName = ExecutePacketNetRoute.Instance().get_msg(protoId);
            let pbMessage = self.mRoot.lookup(msgName);
            if(!pbMessage){
                throw Error("no this message '" + msgName + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        }

        static getRoot(){
            return this.mRoot;
        }
    }
}