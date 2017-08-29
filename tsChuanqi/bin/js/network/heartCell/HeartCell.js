var EIGame;
(function (EIGame) {
    var HeartCell = (function () {
        function HeartCell() {
            this.loseHeartSec = 0;
            this.heartBeatTime = 3;
            this.timeout = false;
            this.need_heartCell = true;
            this.handleDataStat = function (data) {
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
        }
        HeartCell.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new HeartCell();
            }
            return this.mInstance;
        };
        HeartCell.prototype.init = function () {
            this.checkHeartBeat();
            this.ping_packet = EIGame.pbManager.Instance().encodeMsg(1004, {
                ping: 1,
            });
        };
        HeartCell.prototype.checkHeartBeat = function () {
            if (!this.need_heartCell) {
                console.log("不开启心跳包");
                return;
            }
            var self = this;
            var time_ms = self.heartBeatTime * 1000;
            this.sendCellFunc = setTimeout(function () {
                if (self.loseHeartSec >= 3) {
                    self.timeout = true;
                    EIGame.ei_reconnect.Instance().onHeartCellTimeOut();
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
        HeartCell.prototype.sendReConnectPakcet = function () {
            var self = this;
        };
        HeartCell.prototype.IsTimeOut = function () {
            return this.timeout;
        };
        HeartCell.prototype.receivePong = function () {
            var self = this;
            self.loseHeartSec = 0;
            self.timeout = false;
        };
        HeartCell.prototype.sendPingPacket = function () {
            if (this.ping_packet) {
                EIGame.ei_network.Instance().sendPacket(1004, this.ping_packet);
            }
        };
        ;
        HeartCell.prototype.excutePacket = function (protoId, datas) {
            var self = this;
            // var pb:any = pbManager.Instance().decodeMsg(protoId, datas);
            // console.log("心跳包pb ", pb);
            self.receivePong();
        };
        HeartCell.prototype.reset = function () {
            // console.log("重置心跳包");
            var self = this;
            self.loseHeartSec = 0;
            self.timeout = false;
            clearTimeout(this.sendCellFunc);
        };
        HeartCell.prototype.close = function () {
            this.reset();
        };
        return HeartCell;
    }());
    EIGame.HeartCell = HeartCell;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=HeartCell.js.map