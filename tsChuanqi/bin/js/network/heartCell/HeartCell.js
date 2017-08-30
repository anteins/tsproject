var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIGame;
(function (EIGame) {
    var HeartBeatManager = (function (_super) {
        __extends(HeartBeatManager, _super);
        function HeartBeatManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loseHeartSec = 0;
            _this.heartBeatTime = 3 * 1000;
            _this.timeout = false;
            _this.need_heartCell = true;
            _this.handleDataStat = function (data) {
                if (!this.stat) {
                    var dataIndex = 2; //数据索引，因为第一个字节和第二个字节肯定不为数据，所以初始值为2
                    var secondByte = data[1]; //代表masked位和可能是payloadLength位的第二个字节
                    var hasMask = secondByte >= 128; //如果大于或等于128，说明masked位为1
                    secondByte -= hasMask ? 128 : 0; //如果有掩码，需要将掩码那一位去掉
                    var dataLength, maskedData;
                    //如果为126，则后面16位长的数据为数据长度，如果为127，则后面64位长的数据为数据长度
                    if (secondByte == 126) {
                        dataIndex += 2;
                        dataLength = data.readUInt16BE(2);
                    }
                    else if (secondByte == 127) {
                        dataIndex += 8;
                        dataLength = data.readUInt32BE(2) + data.readUInt32BE(6);
                    }
                    else {
                        dataLength = secondByte;
                    }
                    //如果有掩码，则获取32位的二进制masking key，同时更新index
                    if (hasMask) {
                        maskedData = data.slice(dataIndex, dataIndex + 4);
                        dataIndex += 4;
                    }
                    //数据量最大为10kb
                    if (dataLength > 10240) {
                        this.send("Warning : data limit 10kb");
                    }
                    else {
                        //计算到此处时，dataIndex为数据位的起始位置，dataLength为数据长度，maskedData为二进制的解密数据
                        this.stat = {
                            index: dataIndex,
                            totalLength: dataLength,
                            length: dataLength,
                            maskedData: maskedData,
                            opcode: parseInt(data[0].toString(16).split("")[1], 16) //获取第一个字节的opcode位
                        };
                    }
                }
                else {
                    this.stat.index = 0;
                }
            };
            return _this;
        }
        HeartBeatManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new HeartBeatManager();
            }
            return this.mInstance;
        };
        HeartBeatManager.prototype.init = function () {
            this.checkHeartBeat();
            this.ping_packet = EIGame.ProtocolManager.Instance().encodeMsg(1004, {
                ping: 1,
            });
        };
        HeartBeatManager.prototype.checkHeartBeat = function () {
            if (!this.need_heartCell) {
                console.log("不开启心跳包");
                return;
            }
            var self = this;
            var time_ms = self.heartBeatTime;
            this.sendCellFunc = setTimeout(function () {
                if (!EIGame.ei_network.Instance().connected() || !EIGame.ei_network.Instance().IsOnline())
                    return;
                if (self.loseHeartSec >= 3) {
                    self.timeout = true;
                    EIGame.ei_reconnect.Instance().onHeartBeatTimeOut();
                    return;
                }
                //记录心跳次数
                // console.log("心跳丢失", self.loseHeartSec);
                self.loseHeartSec++;
                self.sendPingPacket();
                self.checkHeartBeat();
            }, time_ms);
        };
        ;
        HeartBeatManager.prototype.sendReConnectPakcet = function () {
            var self = this;
        };
        HeartBeatManager.prototype.IsTimeOut = function () {
            return this.timeout;
        };
        HeartBeatManager.prototype.receivePong = function () {
            var self = this;
            self.loseHeartSec = 0;
            self.timeout = false;
        };
        HeartBeatManager.prototype.sendPingPacket = function () {
            if (this.ping_packet) {
                EIGame.ei_network.Instance().sendPacket(1004, this.ping_packet);
            }
        };
        ;
        HeartBeatManager.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            // var pb:any = ProtocolManager.Instance().decodeMsg(protoId, datas);
            // console.log("心跳包pb ", pb);
            self.receivePong();
        };
        HeartBeatManager.prototype.reset = function () {
            // console.log("重置心跳包");
            var self = this;
            self.loseHeartSec = 0;
            self.timeout = false;
            clearTimeout(this.sendCellFunc);
        };
        HeartBeatManager.prototype.close = function () {
            this.reset();
        };
        return HeartBeatManager;
    }(EIGame.EISingleton));
    EIGame.HeartBeatManager = HeartBeatManager;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=HeartCell.js.map