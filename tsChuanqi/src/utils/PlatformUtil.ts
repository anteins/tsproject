module EIGame{
    export class PlatformUtil{
        private static resPath:string = "../resource/";

        public static IsPC():boolean{
            var userAgentInfo:string = navigator.userAgent;
            var Agents:Array<string> = [
                "Android", 
                "iPhone",
                "SymbianOS", 
                "Windows Phone",
                "iPad", 
                "iPod"
            ];
            var flag:boolean = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        public static getPlatform():string{
            var userAgentInfo:string = navigator.userAgent;
            var Agents:Array<string> = [
                "Android", 
                "iPhone",
                "SymbianOS", 
                "Windows Phone",
                "iPad", 
                "iPod",
                "Windows"
            ];
            var os:string = "null";
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    os = Agents[v];
                    break;
                }
            }
            return os;
        }

        public static getUrl(keyList:Array<string>=null):Array<any>
        {
            var url = location.search; //获取url中"?"符后的字串
            console.log("url: ", url);
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

        public static getResPath(resName=""):string{
            return this.resPath + resName;
        }
    }
}