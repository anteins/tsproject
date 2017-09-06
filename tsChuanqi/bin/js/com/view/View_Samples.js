var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIGame;
(function (EIGame) {
    var View_Samples = (function (_super) {
        __extends(View_Samples, _super);
        function View_Samples() {
            var _this = _super.call(this) || this;
            _this.mView = new ui.test.TestPageUI();
            return _this;
            // this._model = new Model_Login();
        }
        View_Samples.prototype.initView = function () {
            //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
            this.mView.btn.on(laya.events.Event.CLICK, this, this.onBtnClick);
            this.mView.btn2.on(laya.events.Event.CLICK, this, this.onBtn2Click);
            this.mView.close.on(laya.events.Event.CLICK, this, this.onExit);
        };
        ;
        View_Samples.prototype.onBtnClick = function () {
            //手动控制组件属性
            this.mView.radio.selectedIndex = 1;
            this.mView.clip.index = 8;
            this.mView.tab.selectedIndex = 2;
            this.mView.combobox.selectedIndex = 0;
            this.mView.check.selected = true;
        };
        View_Samples.prototype.onBtn2Click = function () {
            //通过赋值可以简单快速修改组件属性
            //赋值有两种方式：
            //简单赋值，比如：progress:0.2，就是更改progress组件的value为2
            //复杂复制，可以通知某个属性，比如：label:{color:"#ff0000",text:"Hello LayaAir"}
            this.mView.box.dataSource = { slider: 50, scroll: 80, progress: 0.2, input: "This is a input", label: { color: "#ff0000", text: "Hello LayaAir" } };
            //list赋值，先获得一个数据源数组
            var arr = [];
            for (var i = 0; i < 100; i++) {
                arr.push({ label: "item " + i, clip: i % 9 });
            }
            //给list赋值更改list的显示
            this.mView.list.array = arr;
            //还可以自定义list渲染方式，可以打开下面注释看一下效果
            //list.renderHandler = new Handler(this, onListRender);
        };
        View_Samples.prototype.onListRender = function (item, index) {
            //自定义list的渲染方式
            var label = item.getChildByName("label");
            if (index % 2) {
                label.color = "#ff0000";
            }
            else {
                label.color = "#000000";
            }
        };
        View_Samples.prototype.onExit = function () {
            EIGame.ViewManager.Instance().closeView("View_Samples");
        };
        ;
        return View_Samples;
    }(EIGame.View_Base));
    EIGame.View_Samples = View_Samples;
})(EIGame || (EIGame = {}));
