var EIGame;
(function (EIGame) {
    var Test = (function () {
        function Test() {
        }
        Test.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new EIGame.NetWork();
            }
            return this.mInstance;
        };
        Test.doTest = function () {
            Test.loadResTest();
            Test.socketTest();
            Test.httpTest();
            Test.storageTest();
        };
        Test.storageTest = function () {
            if (!window.localStorage) {
                console.log('当前浏览器不支持localStorage!');
            }
            else {
                Laya.LocalStorage.clear();
            }
            for (var i = 0; i < 50000; i++) {
                var key1_ = "key1_" + i;
                var key2 = "key2_" + i;
                var data_key = "data_" + i;
                var item_key = "item_" + i;
                var hellostr = "hello_" + i;
                Laya.LocalStorage.setItem("key", hellostr);
                var data = { key1_: 0, key2: i + 1 };
                var str = JSON.stringify(data);
                Laya.LocalStorage.setItem(data_key, "hello" + i);
                Laya.LocalStorage.setItem(item_key, str + i);
            }
            var size = util.getLocalStorageSize();
            console.log('当前localStorage剩余容量为' + size + 'KB!');
            Laya.LocalStorage.clear();
            var sessionStorage = Browser.window.sessionStorage;
            if (sessionStorage.pagecount) {
                sessionStorage.pagecount = parseInt(sessionStorage.pagecount) + 1;
            }
            else {
                sessionStorage.pagecount = 1;
            }
            // trace(sessionStorage.pagecount);
        };
        Test.loadResTest = function () {
            Laya.loader.load(Test.preResList, Handler.create(this, function () {
                var robotData = Loader.getRes(Test.preResList[0]);
                var robotTexture = Loader.getRes(Test.preResList[1]);
            }));
        };
        Test.preloadRes = function () {
            var _index = 0;
            for (var i in Test.preResList) {
                var res = Test.preResList[i];
                Test.resList[i] = res;
                Laya.loader.create(res, Laya.Handler.create(this, function () {
                    _index = _index + 1;
                }));
            }
        };
        Test.socketTest = function () {
            // NetWork.Instance().initConnect("ws://localhost:8181", (e)=>{
            //     Test.prototype.test_socket_pb();
            // });
        };
        Test.prototype.test_socket_pb = function () {
            var info = {
                "is_relogin": false,
                "user_id": "123456",
                "token": "123456",
                "channel": "123456",
                "sub_channel": "123456",
                "time_mix": "123456",
                "os": "123456",
                "cpu_num": 6,
            };
        };
        Test.httpTest = function () {
            var p_role_base = EIGame.ProtobufHelper.Instance().getRoot().lookup("p_role_base").create({
                playerId: 1001.0,
                playerName: "nihao",
                accountName: "hello",
                head: 1001,
                model: 10,
                level: 40,
                exp: 356,
                agentId: 10,
                serverId: 1,
                platform: 1991,
                createTime: 39399393,
                lastOfflineTime: 1111
            });
            var pb_buffer = EIGame.ProtobufHelper.Instance().encodeMsg(1001, {
                apkVersion: "v1.1",
                queueNum: 100,
                createRole: 199,
                serverTime: 11111.0,
                roleBase: p_role_base,
                sumPay: 10101,
                codeRegister: 11911,
                sendEnterTag: 1111,
            });
            var pb_msg = EIGame.ProtobufHelper.Instance().decodeMsg(1001, pb_buffer);
            console.log("decode:", pb_msg);
        };
        Test.resList = new Array();
        Test.preResList = [
            "../resource/Models/models_01/mod_hero_000_01.lh",
            "../resource/Models/models_01/mod_hero_001_01.lh",
            "../resource/Models/models_01/mod_hero_002_03.lh",
            "../resource/Models/models_01/mod_hero_007_01.lh",
            "../resource/Models/models_01/mod_role_030_01.lh",
            "../resource/Models/models_01/mod_role_038_01.lh",
            "../resource/Models/LayaScene_girl/girl.lh",
            "../resource/Models/skinModel/Zombie/new/Zombie.lh",
        ];
        Test.test_2D = function () {
            if (this.test1) {
                this.test1.startTest();
            }
        };
        return Test;
    }());
    EIGame.Test = Test;
})(EIGame || (EIGame = {}));
