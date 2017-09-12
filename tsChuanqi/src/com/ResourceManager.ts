module EIGame{

    export class ResUtils{
        public static Get(resName:string):string{
            return ResourceManager.Instance().resPath + resName;
        }
    }

    export class ResourceManager extends laya.events.EventDispatcher{
        private static mInstance:ResourceManager;
        public resPath:string = "./res/";
        private curIndex = 0;
        private maxIndex = 200;
        private progressBar: Laya.ProgressBar = null;
        private assets:any = [];
        private error:string;

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ResourceManager();
                this.mInstance.init();
            }
            return this.mInstance;
        }

        constructor(){
            super();
        };

        private init(){
            this.progressBar = null;
            this.assets = null;
            this.error = null;
            this.curIndex = 0;
            // Laya.timer.frameLoop(1, this, this.handler);
            
        }

        private handler(){
            if(this.assets){
                if(this.error){
                    alert("资源加载失败 " + this.error);
                    this.event(Laya.Event.ERROR, this.error);
                    this.assets = null;
                    this.error = null;
                    return;
                }
                if(this.curIndex >= this.assets.length){
                    this.allFinish();
                }else{
                    // console.log("do队列 ", this.curIndex, this.assets[this.curIndex], typeof this.assets[this.curIndex]);
                    if(this.assets[this.curIndex] instanceof Object){
                        Laya.loader.load([this.assets[this.curIndex]], Handler.create(this, this.onAssetLoaded));
                    }else {
                        Laya.loader.load(this.assets[this.curIndex], Handler.create(this, this.onAssetLoaded), null, null, this.curIndex, false);
                    }
                }
            }
        }

        //预加载
        preload(nextStep:any){
            let res = [
                "./res/ui/progressBar.png", 
                "./res/ui/progressBar$bar.png",
            ];
            Laya.loader.load(res, Handler.create(this, ()=>{
                nextStep();
            }));
        }
        
        loadGameRes(jsonName:string, viewer:any){
            let self = this;
            self.error = "";
            self.progressBar = viewer || null;
            Laya.stage.addChild(self.progressBar);

            Laya.loader.load([jsonName], Handler.create(self, ()=>{
                var json:JSON = Laya.loader.getRes(jsonName);
                let assets = self.findJson(json, "./res/");
                assets = assets.concat([
                    { url: "res/atlas/comp.json", type: Loader.ATLAS },
                    { url: "res/atlas/comp/cartoon2.json", type: Loader.ATLAS },
                    { url: "res/atlas/comp/cartoonCharacters.json", type: Loader.ATLAS },
                    { url: "res/atlas/comp/ui.json", type: Loader.ATLAS },
                ]);

                // 无加载失败重试
                Laya.loader.retryNum = 0;

                // 侦听加载失败
                Laya.loader.on(Laya.Event.ERROR, self, (err:string)=>{
                    console.log("资源加载失败 ", err);
                    self.error = err;
                    self.event(Laya.Event.ERROR, self.error);
                });
                self.startLoadResource(assets);
            }), Handler.create(self, ()=>{
                
            }, null, false));
        }

        private startLoadResource(assets:any){
            let self = this;
            self.pushQueue(assets);
            // Laya.loader.load(assets, Handler.create(self, self.onAssetLoadedEx), Handler.create(self, self.onLoadingEx, null, false));
        }

        private pushQueue(resList:Array<string>){
            this.assets = resList;

           this.handler();
        }

        private allFinish(){
            if(this.progressBar){
                this.progressBar.destroy();
                this.progressBar = null;
            }
            this.assets = null;
            this.curIndex = 0;
            this.event(Laya.Event.LOADED);
        }

        private onAssetLoaded(texture: Laya.Texture): void {
            this.curIndex++;
            let progress = this.curIndex / this.assets.length;
            console.log("加载完成 ");
            if(this.progressBar){
                this.progressBar.value = progress;
            }

            this.handler();
		}

		// 加载进度侦听器
		private onLoading(progress: number): void {
            if(this.progressBar && !this.error){
                let progress = this.curIndex / this.assets.length;
                console.log("加载进度: " + this.curIndex, this.assets.length);
                this.progressBar.value = progress;
            }
		}

        private onAssetLoadedEx(texture: Laya.Texture): void {
            this.allFinish();
		}

        // 加载进度侦听器
		private onLoadingEx(progress: number): void {
            if(this.progressBar && !this.error){
                // console.log("Ex加载进度: " + progress + "  " + this.error);
                this.progressBar.value = progress;
            }
		}

        private findJson(json:JSON, path:string, assets = []):any{
            let self = this
            for(let res in json){
                if(res.indexOf(".") == -1){
                    assets = self.findJson(json[res], path + res + "/", assets);
                }else{
                    let ress = path + res;
                    assets.push(ress)
                }
            }
            return assets;
        }
    }
}