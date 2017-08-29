module EIGame{
    export class pbManager{
        public ProtoBuf:any = Browser.window.protobuf;
        private static mInstance:pbManager;
        private mRoot;
        private protoLoadedMap: { [name: string]: any; } = {};
        private rootpath:string = "../src/network/message/";
        constructor(){}

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new pbManager();
            }
            return this.mInstance;
        }

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

            let Message = self.mRoot.lookup(PROTOCOL_ID[protoId]);
            if(!Message)
                throw Error("no this message '" + PROTOCOL_ID[protoId] + "'");

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
            let pbMessage = self.mRoot.lookup(PROTOCOL_ID[protoId]);
            if(!pbMessage){
                throw Error("no this message '" + PROTOCOL_ID[protoId] + "'");
            }
            pb = pbMessage.decode(buf);
            return pb;
        }

        getRoot(){
            return this.mRoot;
        }
    }
}