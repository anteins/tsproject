var EIGame;
(function (EIGame) {
    EIGame.ERROR_CODE = {
        10000: "socket.refuse",
        10001: "socket.disconnect",
        10002: "socket.timeout",
        10003: "http.refuse",
        10004: "http.disconnect",
        10005: "http.timeout"
    };
    EIGame.PROTOCOL_ID = {
        1000: "c2s_auth_key",
        1001: "s2c_auth_key",
        1002: "p_role_base",
        1003: "p_kv"
    };
})(EIGame || (EIGame = {}));
//# sourceMappingURL=Const.js.map