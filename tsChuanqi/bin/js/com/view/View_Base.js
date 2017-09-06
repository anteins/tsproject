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
    var View_Base = (function (_super) {
        __extends(View_Base, _super);
        function View_Base() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "";
            _this.mEventList = {};
            return _this;
        }
        View_Base.prototype.init = function () {
            if (!this.isStarted()) {
                this.mIsStarted = true;
                this.reset();
                this.initView();
                this.initViewPos();
            }
        };
        View_Base.prototype.getView = function () {
            return this.mView;
        };
        View_Base.prototype.initView = function () {
        };
        ;
        View_Base.prototype.initViewPos = function () {
            // 计算将Button至于舞台中心的偏移量
            var xOffset = Laya.stage.width / 2 - this.mView.width / 2;
            var yOffset = Laya.stage.height / 2 - this.mView.height / 2;
            this.mView.pos(xOffset, yOffset);
        };
        ;
        View_Base.prototype.update = function () {
        };
        ;
        View_Base.prototype.reset = function () {
        };
        ;
        View_Base.prototype.release = function () {
        };
        ;
        View_Base.prototype.exit = function () {
            if (!this.mIsStarted)
                return;
            this.mIsStarted = false;
            // this.removeAllEvent();
            this.release();
        };
        ;
        View_Base.prototype.isStarted = function () {
            return this.mIsStarted;
        };
        ;
        View_Base.prototype.addActionEvent = function (widget, event, ref, cb) {
            var obj = {};
            obj["widget"] = widget;
            obj["event"] = event;
            obj["cb"] = cb;
            obj["ref"] = ref;
            if (this.mEventList[widget.name] == null) {
                this.mEventList[widget.name] = new Array();
            }
            widget.on(event, ref, cb);
            this.mEventList[widget.name].push(obj);
            console.log("add: ", widget.name, this.mEventList[widget.name]);
        };
        ;
        View_Base.prototype.removeActionEvent = function (widget, event, ref, cb) {
            if (this.mEventList[widget.name] != null) {
                for (var key in this.mEventList[widget.name]) {
                    var kv = this.mEventList[widget.name][key];
                    if (cb == kv["cb"]) {
                        console.log("remove: ", widget.name, kv);
                        widget.off(event, ref, cb);
                        break;
                    }
                }
            }
        };
        ;
        View_Base.prototype.removeAllEvent = function () {
            if (this.mEventList) {
                for (var widget in this.mEventList) {
                    var widgetList = this.mEventList[widget];
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
                this.mEventList = null;
            }
        };
        ;
        return View_Base;
    }(laya.display.Node));
    EIGame.View_Base = View_Base;
})(EIGame || (EIGame = {}));
