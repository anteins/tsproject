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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var GameSceneUI = (function (_super) {
            __extends(GameSceneUI, _super);
            function GameSceneUI() {
                return _super.call(this) || this;
            }
            GameSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.GameSceneUI.uiView);
            };
            GameSceneUI.uiView = { "type": "View", "props": { "width": 1024, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 161, "x": 2, "width": 1024, "var": "GAME_IMG_BG", "skin": "comp/bg.png", "name": "GAME_IMG_BG", "height": 320 } }, { "type": "Button", "props": { "y": 204, "x": 43, "width": 217, "var": "GAME_BTN_CHANGE", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "GAME_BTN_CHANGE", "label": "切换账号", "height": 54 } }, { "type": "Button", "props": { "y": 203, "x": 378, "width": 217, "var": "GAME_BTN_BREAK", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "GAME_BTN_BREAK", "label": "掉线", "height": 54 } }, { "type": "Button", "props": { "y": 205, "x": 743, "width": 217, "var": "GAME_BTN_EXIT", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "GAME_BTN_EXIT", "label": "退出游戏", "height": 54 } }, { "type": "Button", "props": { "y": 174, "x": 979, "var": "GAME_BTN_CLOSE", "skin": "comp/btn_close.png", "name": "GAME_BTN_CLOSE" } }] };
            return GameSceneUI;
        }(View));
        test.GameSceneUI = GameSceneUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var LoginMainDlgUI = (function (_super) {
            __extends(LoginMainDlgUI, _super);
            function LoginMainDlgUI() {
                return _super.call(this) || this;
            }
            LoginMainDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.LoginMainDlgUI.uiView);
            };
            LoginMainDlgUI.uiView = { "type": "Dialog", "props": { "width": 640, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 640, "skin": "comp/bg.png", "height": 322 } }, { "type": "Button", "props": { "y": 227, "x": 71, "width": 138, "var": "btn_login", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "btn_login", "labelSize": 20, "labelAlign": "center", "label": "登录", "height": 45, "cacheAs": "bitmap" } }, { "type": "Button", "props": { "y": 228, "x": 432, "width": 138, "var": "btn_cancel", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "btn_cancel", "labelSize": 20, "labelAlign": "center", "label": "返回", "height": 45, "cacheAs": "bitmap" } }, { "type": "TextInput", "props": { "y": 29, "x": 184, "width": 385, "var": "TI_ACCOUNT", "name": "TI_ACCOUNT", "height": 22, "bgColor": "#ffffff" } }, { "type": "TextInput", "props": { "y": 67, "x": 185, "width": 385, "var": "TI_PASSWORD", "name": "TI_PASSWORD", "height": 22, "bgColor": "#ffffff" } }, { "type": "Label", "props": { "y": 29, "x": 111, "width": 62, "var": "LB_ACCOUNT", "text": "账号", "height": 19, "align": "center" } }, { "type": "Label", "props": { "y": 67, "x": 111, "width": 62, "var": "LB_PASSWORD", "text": "密码", "height": 19, "align": "center" } }, { "type": "Button", "props": { "y": 227, "x": 252, "width": 138, "var": "btn_relogin", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "name": "btn_relogin", "labelSize": 20, "labelAlign": "center", "label": "重登", "height": 45, "cacheAs": "bitmap" } }, { "type": "Button", "props": { "y": 5, "x": 604, "var": "btn_close", "skin": "comp/btn_close.png", "name": "btn_close" } }] };
            return LoginMainDlgUI;
        }(Dialog));
        test.LoginMainDlgUI = LoginMainDlgUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var MainBgUI = (function (_super) {
            __extends(MainBgUI, _super);
            function MainBgUI() {
                return _super.call(this) || this;
            }
            MainBgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.MainBgUI.uiView);
            };
            MainBgUI.uiView = { "type": "View", "props": { "width": 1024, "height": 640 } };
            return MainBgUI;
        }(View));
        test.MainBgUI = MainBgUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var TestPageUI = (function (_super) {
            __extends(TestPageUI, _super);
            function TestPageUI() {
                return _super.call(this) || this;
            }
            TestPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.TestPageUI.uiView);
            };
            TestPageUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 400 } }, { "type": "Button", "props": { "y": 56, "x": 41, "width": 150, "var": "btn", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "label": "点我赋值", "height": 37 } }, { "type": "Clip", "props": { "y": 56, "x": 401, "var": "clip", "skin": "comp/clip_num.png", "clipX": 10 } }, { "type": "ComboBox", "props": { "y": 143, "x": 220, "width": 200, "var": "combobox", "skin": "comp/combobox.png", "sizeGrid": "4,20,4,4", "selectedIndex": 1, "labels": "select1,select2,selecte3", "height": 23 } }, { "type": "Tab", "props": { "y": 96, "x": 220, "var": "tab", "skin": "comp/tab.png", "labels": "tab1,tab2,tab3" } }, { "type": "VScrollBar", "props": { "y": 223, "x": 259, "skin": "comp/vscroll.png", "height": 150 } }, { "type": "VSlider", "props": { "y": 223, "x": 224, "skin": "comp/vslider.png", "height": 150 } }, { "type": "List", "props": { "y": 68, "x": 452, "width": 128, "var": "list", "vScrollBarSkin": "comp/vscroll.png", "repeatX": 1, "height": 299 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 112, "name": "render", "height": 30 }, "child": [{ "type": "Label", "props": { "y": 5, "x": 26, "width": 78, "text": "this is a list", "skin": "comp/label.png", "name": "label", "height": 20, "fontSize": 14 } }, { "type": "Clip", "props": { "y": 2, "x": 0, "skin": "comp/clip_num.png", "name": "clip", "clipX": 10 } }] }] }, { "type": "Button", "props": { "y": 4, "x": 563, "var": "close", "skin": "comp/btn_close.png", "name": "close" } }, { "type": "Button", "props": { "y": 112, "x": 41, "width": 150, "var": "btn2", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "labelSize": 30, "labelBold": true, "label": "点我赋值", "height": 66 } }, { "type": "CheckBox", "props": { "y": 188, "x": 220, "var": "check", "skin": "comp/checkbox.png", "label": "checkBox1" } }, { "type": "RadioGroup", "props": { "y": 61, "x": 220, "var": "radio", "skin": "comp/radiogroup.png", "labels": "radio1,radio2,radio3" } }, { "type": "Panel", "props": { "y": 223, "x": 299, "width": 127, "vScrollBarSkin": "comp/vscroll.png", "height": 150 }, "child": [{ "type": "Image", "props": { "skin": "comp/image.png" } }] }, { "type": "CheckBox", "props": { "y": 188, "x": 326, "skin": "comp/checkbox.png", "labelColors": "#ff0000", "label": "checkBox2" } }, { "type": "Box", "props": { "y": 197, "x": 41, "var": "box" }, "child": [{ "type": "ProgressBar", "props": { "y": 70, "width": 150, "skin": "comp/progress.png", "sizeGrid": "4,4,4,4", "name": "progress", "height": 14 } }, { "type": "Label", "props": { "y": 103, "width": 137, "text": "This is a Label", "skin": "comp/label.png", "name": "label", "height": 26, "fontSize": 20 } }, { "type": "TextInput", "props": { "y": 148, "width": 150, "text": "textinput", "skin": "comp/textinput.png", "name": "input" } }, { "type": "HSlider", "props": { "width": 150, "skin": "comp/hslider.png", "name": "slider" } }, { "type": "HScrollBar", "props": { "y": 34, "width": 150, "skin": "comp/hscroll.png", "name": "scroll" } }] }] };
            return TestPageUI;
        }(View));
        test.TestPageUI = TestPageUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
