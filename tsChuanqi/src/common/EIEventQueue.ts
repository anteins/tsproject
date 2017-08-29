module EIGame{
    export class EIEventQueue{
        private static mInstance:GameSceneUI;
        private eventList:Array<any>;

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new EIGame.GameSceneUI();
            }
            return this.mInstance;
        }

        
        AsyncExcute(func, onSucc){
            this.eventList.push({func, onSucc});
        }

        Update(){
            if(this.eventList){
                for(let event of this.eventList){
                    
                }
            }
        }
    }
}