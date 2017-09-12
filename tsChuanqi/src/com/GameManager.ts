module EIGame{
    export class GameManager extends laya.events.EventDispatcher{
        private mGame:EIGame.Game;
        public static mode:String = "2d";
        private loopRate:number = 1000;
        private mIsGameReady:boolean = false;
        private resLoaded:boolean = false;
        private pbMessageLoaded:boolean = false;
        private eventList:{ [name: string]: any; };

        private static mInstance:GameManager;
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        static Instance():GameManager{
            if(this.mInstance == null){
                this.mInstance = new GameManager();
            }
            return this.mInstance;
        }

        public init(){
            let self = this;
            setInterval(function(){
                if(this.mGame != null && this.mIsGameReady == true){
                    // NetWork.Instance().say_ai();
                }
            }, this.loopRate);

            this.mGame = new EIGame.Game();
            this.mGame.init();
            this.mIsGameReady = true;
        }

        public isGamePlaying():boolean{
            return this.mIsGameReady;
        }

        public exit():void{
            console.log("游戏退出");
        }

        public initGameMainUIScene():void{
            
        }
    }
}
