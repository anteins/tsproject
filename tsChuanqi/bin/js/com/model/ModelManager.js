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
    var ModelManager = (function (_super) {
        __extends(ModelManager, _super);
        function ModelManager() {
            var _this = _super.call(this) || this;
            _this.models = new Array();
            return _this;
        }
        ModelManager.Instance = function () {
            if (this.mInstance == null) {
                this.mInstance = new ModelManager();
            }
            return this.mInstance;
        };
        ModelManager.prototype.addModel = function (modelName, modelClazz) {
            console.log("addModel ", modelClazz);
            if (this.models[modelName] == null) {
                this.models[modelName] = new modelClazz();
            }
        };
        ModelManager.prototype.getModel = function (modelName) {
            if (this.models[modelName] != null) {
                return this.models[modelName];
            }
        };
        return ModelManager;
    }(laya.ui.View));
    EIGame.ModelManager = ModelManager;
})(EIGame || (EIGame = {}));
