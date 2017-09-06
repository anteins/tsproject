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
    var ViewManager = (function (_super) {
        __extends(ViewManager, _super);
        function ViewManager() {
            var _this = _super.call(this) || this;
            _this.mViewStack = null;
            _this.rootScene = null;
            _this.mCurView = null;
            _this.mViewStack = new Array();
            _this.mViewList = {};
            _this.mCurViewList = {};
            _this.rootScene = Laya.stage;
            return _this;
            // Laya.stage = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;
        }
        ViewManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ViewManager();
            }
            return this.mInstance;
        };
        ViewManager.prototype.addView = function (viewName, viewClazz) {
            if (this.mViewList[viewName] == null) {
                var view = new viewClazz();
                view.name = viewName;
                this.mViewList[viewName] = view;
            }
        };
        ViewManager.prototype.openView = function (viewName) {
            var view = this.mViewList[viewName];
            if (view != null && !view.isStarted()) {
                view.init();
                Laya.stage.addChild(view.mView);
                this.mCurView = view;
            }
        };
        ViewManager.prototype.closeView = function (viewName) {
            var view = this.mViewList[viewName];
            if (view != null && view.isStarted()) {
                Laya.stage.removeChild(view.mView);
                this.mCurView = null;
                view.exit();
            }
        };
        ViewManager.prototype.push = function (view) {
            if (this.mViewStack) {
                this.mViewStack.push(view);
            }
        };
        ViewManager.prototype.pop = function (view) {
            var ret = null;
            if (this.mViewStack && this.mViewStack.length > 0) {
                ret = this.mViewStack.pop();
            }
            return ret;
        };
        ViewManager.prototype.removeAllView = function () {
            for (var viewName in this.mViewList) {
                if (this.mViewList[viewName]) {
                    console.log("closeView ", viewName);
                    this.closeView(viewName);
                }
            }
        };
        ViewManager.prototype.count = function () {
            return this.mViewStack.length;
        };
        return ViewManager;
    }(laya.ui.View));
    EIGame.ViewManager = ViewManager;
})(EIGame || (EIGame = {}));
