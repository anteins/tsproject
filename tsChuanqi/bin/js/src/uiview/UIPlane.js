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
    var UIPlane = (function (_super) {
        __extends(UIPlane, _super);
        function UIPlane() {
            var _this = _super.call(this) || this;
            _this.uistack = new Array();
            _this.viewName = "";
            return _this;
        }
        UIPlane.prototype.LoadView = function (viewname, viewCb) {
            this.viewName = viewname;
            this.viewCb = viewCb;
            this.view = this.viewCb();
        };
        ;
        UIPlane.prototype.show = function () {
            if (!this.view && this.viewCb) {
                this.view = this.viewCb();
            }
            Laya.stage.addChild(this.view);
            if (!this.isStarted()) {
                this.mIsStarted = true;
                this.actionListenMap = {};
                EIGame.UIStackManager.Instance().push(this);
                this.reset();
                this.initPos();
                this.initView();
            }
        };
        ;
        UIPlane.prototype.initPos = function () {
            // 计算将Button至于舞台中心的偏移量
            var xOffset = Laya.stage.width / 2 - this.view.width / 2;
            var yOffset = Laya.stage.height / 2 - this.view.height / 2;
            this.view.pos(xOffset, yOffset);
        };
        ;
        UIPlane.prototype.initView = function () {
        };
        ;
        UIPlane.prototype.update = function () {
        };
        ;
        UIPlane.prototype.reset = function () {
        };
        ;
        UIPlane.prototype.release = function () {
        };
        ;
        UIPlane.prototype.exit = function () {
            if (!this.mIsStarted)
                return;
            this.mIsStarted = false;
            this.removeAllEvent();
            this.release();
            this.removeView();
            EIGame.UIStackManager.Instance().pop();
        };
        ;
        UIPlane.prototype.removeView = function () {
            if (this.view) {
                Laya.stage.removeChild(this.view);
                this.view.destroy();
                this.view = null;
            }
        };
        ;
        UIPlane.prototype.addActionEvent = function (widget, event, ref, cb) {
            var obj = {};
            obj["widget"] = widget;
            obj["event"] = event;
            obj["cb"] = cb;
            obj["ref"] = ref;
            if (this.actionListenMap[widget.name] == null) {
                this.actionListenMap[widget.name] = new Array();
            }
            widget.on(event, ref, cb);
            this.actionListenMap[widget.name].push(obj);
            console.log("add: ", widget.name, this.actionListenMap[widget.name]);
        };
        ;
        UIPlane.prototype.removeActionEvent = function (widget, event, ref, cb) {
            if (this.actionListenMap[widget.name] != null) {
                for (var key in this.actionListenMap[widget.name]) {
                    var kv = this.actionListenMap[widget.name][key];
                    if (cb == kv["cb"]) {
                        console.log("remove: ", widget.name, kv);
                        widget.off(event, ref, cb);
                        break;
                    }
                }
            }
        };
        ;
        UIPlane.prototype.removeAllEvent = function () {
            if (this.actionListenMap) {
                for (var widget in this.actionListenMap) {
                    var widgetList = this.actionListenMap[widget];
                    for (var key in widgetList) {
                        var obj = widgetList[key];
                        var _widget = obj["widget"];
                        var _event = obj["widget"];
                        var _cb = obj["cb"];
                        var _ref = obj["ref"];
                        _widget.off(_event, _ref, _cb);
                        console.log(">", _widget.name, obj);
                    }
                }
                this.actionListenMap = null;
            }
        };
        ;
        UIPlane.prototype.isStarted = function () {
            return this.mIsStarted;
        };
        ;
        return UIPlane;
    }(laya.ui.View));
    EIGame.UIPlane = UIPlane;
})(EIGame || (EIGame = {}));
//# sourceMappingURL=UIPlane.js.map