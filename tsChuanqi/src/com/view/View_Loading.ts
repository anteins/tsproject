module EIGame{
    export class View_Loading extends View_Base{
        private progressBar: Laya.ProgressBar;

        constructor(){
            super();
        };

        public initView():void {
            var self = this;
            self.progressBar = new Laya.ProgressBar(ResUtils.Get("ui/progressBar.png"));
            self.progressBar.width = 400;
            self.progressBar.x = (Laya.stage.width - self.progressBar.width) / 2;
            self.progressBar.y = Laya.stage.height / 2;
            self.progressBar.sizeGrid = "5,5,5,5";
            self.progressBar.changeHandler = new Handler(self, (value: number)=>{
                // console.log("进度：" + value + "   " + Math.floor(value * 100) + "%");
            });
            Laya.stage.addChild(self.progressBar);
        }
    }
}