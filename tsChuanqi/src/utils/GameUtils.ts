module EIGame{
    export class GameUtils{
        private static resPath:string = "./res/";

        public static getUrl(keyList:Array<string>=null):Array<any>
        {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest:Array<any> = new Array();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs:Array<string> = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }

        public static getLocalStorageSize(){
            var size = 0;
            for(var item in window.localStorage) {
                if(window.localStorage.hasOwnProperty(item)) {
                    size += window.localStorage.getItem(item).length;
                }
            }
            return (size / 1024).toFixed(2);
        }

        public static getResPath(resName=""):string{
            return this.resPath + resName;
        }



        // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

        /* utf.js - UTF-8 <=> UTF-16 convertion
         *
         * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
         * Version: 1.0
         * LastModified: Dec 25 1999
         * This library is free.  You can redistribute it and/or modify it.
         */

        static Utf8ArrayToStr(array) {
            var out, i, len, c;
            var char2, char3;

            out = "";
            len = array.length;
            i = 0;
            while(i < len) {
            c = array[i++];
            switch(c >> 4)
            { 
              case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
              case 12: case 13:
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
        }

        /**
         * Converts an array buffer to a string
         *
         * @param {Uin8} uint8arr | The buffer to convert
         * @param {Function} callback | The function to call when conversion is complete
         */
        static largeuint8ArrToString(uint8arr, callback) {
            var bb = new Blob([uint8arr]);
            var f = new FileReader();
            f.onload = function(e) {
                callback(e.target.result);
            };http://ourcodeworld.com/articles/read/164/how-to-convert-an-uint8array-to-string-in-javascript
            
            f.readAsText(bb);
        }
    }
}