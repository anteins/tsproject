module EIGame{
    export class Test{
        private static resList:Array<any> = new Array();
        private static mInstance:NetWork;

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new NetWork();
            }
            return this.mInstance;
        }

        static preResList: Array<any> = [
            "../resource/Models/models_01/mod_hero_000_01.lh",
            "../resource/Models/models_01/mod_hero_001_01.lh",
            "../resource/Models/models_01/mod_hero_002_03.lh",
            "../resource/Models/models_01/mod_hero_007_01.lh",
            "../resource/Models/models_01/mod_role_030_01.lh",
            "../resource/Models/models_01/mod_role_038_01.lh",
            "../resource/Models/LayaScene_girl/girl.lh",
            "../resource/Models/skinModel/Zombie/new/Zombie.lh",
        ];

        public static doTest(){
            Test.loadResTest();
            Test.socketTest();
            Test.httpTest();
            Test.storageTest();
        }

        public static storageTest()
        {
            if(!window.localStorage) {
                console.log('当前浏览器不支持localStorage!')
            }else{
                Laya.LocalStorage.clear();
            }

            for(let i = 0;i< 50000; i++)
            {
                let key1_:string = "key1_" + i;
                let key2:string = "key2_" + i;
                let data_key:string = "data_" + i;
                let item_key:string = "item_" + i;
                let hellostr:string = "hello_" + i;
                Laya.LocalStorage.setItem("key", hellostr);
                let data:any = {key1_:0, key2: i+1};
                let str:string = JSON.stringify(data);
                Laya.LocalStorage.setItem(data_key, "hello" + i);
                Laya.LocalStorage.setItem(item_key, str + i);
            }

            let size = util.getLocalStorageSize();
            console.log('当前localStorage剩余容量为' + size + 'KB!');
            Laya.LocalStorage.clear();

            let sessionStorage:any = Browser.window.sessionStorage;
            if(sessionStorage.pagecount){
                sessionStorage.pagecount = parseInt(sessionStorage.pagecount)+1;
            }
            else{
                sessionStorage.pagecount = 1;
            }
            // trace(sessionStorage.pagecount);
        }

        public static test_2D = function(){
            if(this.test1){
                this.test1.startTest();
            }
        };
        public static loadResTest():void{
            Laya.loader.load(Test.preResList, Handler.create(this, ()=>{
                let robotData: any = Loader.getRes(Test.preResList[0]);
                let robotTexture: any = Loader.getRes(Test.preResList[1]);
            }));
        }

        public static preloadRes():void{
            let _index = 0;
            for(let i in Test.preResList){
                let res:string = Test.preResList[i];
                Test.resList[i] = res;
                Laya.loader.create(res, Laya.Handler.create(this, function(){
                    _index = _index + 1;
                }));
            }
        }

        public static socketTest():void
        {
            // NetWork.Instance().initConnect("ws://localhost:8181", (e)=>{
            //     Test.prototype.test_socket_pb();
            // });
        }

        public test_socket_pb(){
           var info = {
                "is_relogin"    :   false,
                "user_id"       :   "123456",
                "token"         :   "123456",
                "channel"       :   "123456",
                "sub_channel"   :   "123456",
                "time_mix"      :   "123456",
                "os"            :   "123456",
                "cpu_num"       :   6,
            };
        }

        public static httpTest():void{
            var p_role_base:any = ProtobufHelper.Instance().getRoot().lookup("p_role_base").create({
                playerId:1001.0,
                playerName:"nihao",
                accountName:"hello",
                head:1001,
                model:10,
                level:40,
                exp:356,
                agentId:10,
                serverId:1,
                platform:1991,
                createTime:39399393,
                lastOfflineTime:1111
            });

            var pb_buffer:any = ProtobufHelper.Instance().encodeMsg(1001, {
                apkVersion:"v1.1",
                queueNum:100,
                createRole:199,
                serverTime:11111.0,
                roleBase:p_role_base,
                sumPay:10101,
                codeRegister:11911,
                sendEnterTag:1111,
            });

            var pb_msg = ProtobufHelper.Instance().decodeMsg(1001, pb_buffer);
            console.log("decode:", pb_msg);
        }
    }
}