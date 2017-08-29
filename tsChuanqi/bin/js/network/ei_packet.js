var EIGame;
(function (EIGame) {
    var ei_packet = (function () {
        function ei_packet(buffer) {
            if (buffer === void 0) { buffer = null; }
            this.default_size = 256;
            var self = this;
            if (buffer) {
                self.mBuffer = buffer;
            }
            else {
                self.mBuffer = new ArrayBuffer(self.default_size);
            }
        }
        ei_packet.prototype.packetInt = function () {
        };
        ei_packet.prototype.packetInt2 = function () {
        };
        ei_packet.prototype.packetInt4 = function () {
        };
        ei_packet.prototype.unpacketInt = function () {
        };
        ei_packet.prototype.unpacketInt2 = function () {
        };
        ei_packet.prototype.unpacketInt4 = function () {
        };
        return ei_packet;
    }());
    EIGame.ei_packet = ei_packet;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=ei_packet.js.map