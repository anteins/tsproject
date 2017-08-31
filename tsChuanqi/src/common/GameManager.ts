module EIGame{
    export class GameManager{
        private static mGame:EIGame.Game;
        static mode:String = "2d";
        private static loopRate:number = 1000;
        private static mIsGameReady:boolean = false;
        private static resLoaded:boolean = false;
        private static pbMessageLoaded:boolean = false;

        static init(){
            let self = this;
            this.mGame.init();
            setInterval(function(){
                if(this.mGame != null && this.mIsGameReady == true){
                    // ei_network.Instance().say_ai();
                }
            }, this.loopRate);
        }

        static setup(_game_){
            this.mGame = _game_;
            return this;
        }

        static startGame(){
            this.setup(new EIGame.Game());
            this.init();
        }

        static isStarted():boolean{
            return this.mIsGameReady;
        }

        static Scene(){
            return this.mGame.scene;
        }

         static exit(){
            console.log("游戏退出");
        }
    }
}
