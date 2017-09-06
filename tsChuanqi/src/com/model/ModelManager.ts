module EIGame{
    export class ModelManager extends laya.ui.View{
        private static mInstance:ModelManager;
        private models:Array<Model_Base> = new Array();

        static Instance(){
            if(this.mInstance == null){
                this.mInstance = new ModelManager();
            }
            return this.mInstance;
        }

        constructor(){super();}


        public addModel(modelName:string, modelClazz:any){
            console.log("addModel ", modelClazz);
            if(this.models[modelName] == null){
                this.models[modelName] = new modelClazz();
            }
        }

        public getModel(modelName:string){
             if(this.models[modelName] != null){
                return this.models[modelName];
            }
        }
    }
}