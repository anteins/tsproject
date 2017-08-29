
module EIGame{
    export class UIStackManager{
        private static mInstance:UIStackManager;
        private uistack:Array<any> = new Array();

        public static Instance(){
            if(this.mInstance == null){
                this.mInstance = new EIGame.UIStackManager();
            }
            return this.mInstance;
        }

        push(uiplane){
            if(this.uistack){
                this.uistack.push(uiplane);
            }
            
        }

        pop(){
            if(this.uistack && this.uistack.length>0){
                this.uistack.pop();
            }
        }

        removeAllUIPlane(){
            for(let ui of this.uistack){
                ui.exit();
            }
        }

        count(){
            return this.uistack.length;
        }
    }

}