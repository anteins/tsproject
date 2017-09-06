var EIGame;
(function (EIGame) {
    var GameUtils = (function () {
        function GameUtils() {
        }
        GameUtils.getUrl = function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Array();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };
        GameUtils.getLocalStorageSize = function () {
            var size = 0;
            for (var item in window.localStorage) {
                if (window.localStorage.hasOwnProperty(item)) {
                    size += window.localStorage.getItem(item).length;
                }
            }
            return (size / 1024).toFixed(2);
        };
        GameUtils.getResPath = function (resName) {
            if (resName === void 0) { resName = ""; }
            return this.resPath + resName;
        };
        // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
        /* utf.js - UTF-8 <=> UTF-16 convertion
         *
         * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
         * Version: 1.0
         * LastModified: Dec 25 1999
         * This library is free.  You can redistribute it and/or modify it.
         */
        GameUtils.Utf8ArrayToStr = function (array) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        };
        GameUtils.resPath = "./res/";
        return GameUtils;
    }());
    EIGame.GameUtils = GameUtils;
})(EIGame || (EIGame = {}));
