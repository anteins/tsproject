module EIGame{
    export class GameManager{
        private mGame:EIGame.Game;
        private static mInstace:EIGame.GameManager;
        private loopRate = 1000;

        public static Instance(){
            if(this.mInstace == null){
                this.mInstace = new EIGame.GameManager();
            }
            return this.mInstace;
        }

        public setup(game){
            this.mGame = game;
            this.mGame.init();
        }

        public mainSence(){
            return this.mGame.scene;
        }
    }
}
