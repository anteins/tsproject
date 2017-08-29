var EIGame;
(function (EIGame) {
    var packet = (function () {
        function packet(buffer) {
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
        return packet;
    }());
    EIGame.packet = packet;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=packet.js.map