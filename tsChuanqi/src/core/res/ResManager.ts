module EIGame{
    export class ResManager extends laya.events.EventDispatcher{
        private static mInstance:ResManager;
        private resPath:string = "./res/";
        private curIndex = 0;
        private maxIndex = 2;

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ResManager();
            }
            return this.mInstance;
        }

        constructor(){
            super();
        };

        //预加载
        loadGameRes(){
            console.log("loadGameRes");
            // Laya.loader.load("./res/django.json", Handler.create(this, this.onJsonLoaded), null, Loader.ATLAS);
            let assets = [
                "res/sound/achievement.mp3",
                "res/sound/bullet.mp3",
                "res/sound/enemy1_down.mp3",
                "res/sound/enemy2_down.mp3",
                "res/threeDimen/layabox.png",
                "res/threeDimen/monkey.png",
                "res/threeDimen/ui/button.png",
                "res/django.json",
                { url: "res/atlas/comp.json", type: Loader.ATLAS },
            ];

            // 无加载失败重试
			Laya.loader.retryNum = 0;

            Laya.loader.load(assets, Handler.create(this, this.onAssetLoaded), Handler.create(this, this.onLoading, null, false));

			// 侦听加载失败
			Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }

        private onJsonLoaded():void
        {
            var json:JSON = Laya.loader.getRes("res/django.json");
            console.log("json ", json);
        }

        private onAssetLoaded(texture: Laya.Texture): void {
			// 使用texture
			console.log("加载结束");
            var json:JSON = Laya.loader.getRes("res/django.json");
            console.log("json ", json);
            this.event(Laya.Event.LOADED);
		}

		// 加载进度侦听器
		private onLoading(progress: number): void {
			console.log("加载进度: " + progress);
            this.event(Laya.Event.PROGRESS, progress);

		}

		private onError(err: String): void {
			console.log("加载失败: " + err);
		}

        Path(resName=""):string{
            return this.resPath + resName;
        }
    }
}