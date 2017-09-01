

// let args:Array<any> = EIGame.GameUtils.getUrl();
// if(args && args.length > 0 && args["mode"]){
//     console.log("args: ", args);
//     EIGame.GameManager.mode = args["mode"];
// }

// Laya.ResourceManager.systemResourceManager.autoRelease = true;//true开启内存管理，，false关闭内存管理
// Laya.ResourceManager.systemResourceManager.autoReleaseMaxSize =  1024 * 1024 * 60;//1M=1024KB,1KB=1024B//如果开启nei内存管理，内存大小设置
alert("~~~~");
if(EIGame.GameManager.mode=="2d"){
    Laya.init(640, 400, Laya.WebGL);
    //设置适配模式
    Laya.stage.scaleMode = "fixedheight";
    //设置横竖屏
    if(EIGame.PlatformUtil.IsPC()){
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    }else{
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    }
    Laya.stage.bgColor = "gray";
    //设置水平对齐
    Laya.stage.alignH = "center";
    //设置垂直对齐
    Laya.stage.alignV = "middle";
    Laya.stage.screenAdaptationEnabled = true;
}

//显示FPS
Laya.Stat.show(0, 50);

let Res = new EIGame.ResManager();
Res.on(Laya.Event.LOADED, this, ()=>{
    EIGame.ProtocolManager.init((err:any)=>{
        console.log("all proto loaded~ ", err);
        EIGame.ei_network.Instance().init();
        EIGame.LoginManager.init();
        EIGame.GameManager.startGame();
    });
});
Res.loadGameRes();

// var onAssestLoaded = function(){
    
// }


