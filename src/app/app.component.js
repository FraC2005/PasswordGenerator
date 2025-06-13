"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AppComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            imports: [forms_1.FormsModule, common_1.CommonModule, http_1.HttpClientModule],
            templateUrl: './app.component.html',
            styleUrl: './app.component.css',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppComponent = _classThis = /** @class */ (function () {
        function AppComponent_1(http) {
            this.http = http;
            this.title = 'Generate Password';
            this.password = '';
            this.length = 0;
            this.copied = false;
            this.copyLabel = 'Copia';
            this.loading = false;
            this.includeLetters = true;
            this.includeNumbers = true;
            this.includeSymbols = true;
        }
        AppComponent_1.prototype.generatePassword = function () {
            var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var numbers = '0123456789';
            var symbols = '!@#$%^&*()_+~';
            var chars = '';
            if (this.includeNumbers) {
                chars += numbers;
            }
            if (this.includeLetters) {
                chars += letters;
            }
            if (this.includeSymbols) {
                chars += symbols;
            }
            if (!chars.length) {
                this.password = 'Scegli il tipo di simboli';
                return;
            }
            this.password = Array.from({ length: this.length }, function () { return chars[Math.floor(Math.random() * chars.length)]; }).join('');
        };
        AppComponent_1.prototype.generatePasswordAPI = function () {
            var _this = this;
            var url = "http://localhost:3000/api/password?length=".concat(this.length, "&special=").concat(this.includeSymbols ? 'on' : 'off', "&numbers=").concat(this.includeNumbers ? 'on' : 'off', "&upper=on&lower=on");
            this.loading = true;
            this.http.get(url).subscribe({
                next: function (data) {
                    var _a;
                    _this.password = ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.password) || 'xyz';
                    _this.loading = false;
                },
                error: function (err) {
                    _this.password = '';
                    _this.loading = false;
                    alert('Errore durante la creazione della password. API error: ' +
                        err.message);
                },
            });
        };
        AppComponent_1.prototype.copyToClipboard = function () {
            var _this = this;
            navigator.clipboard.writeText(this.password).then(function () {
                _this.copyLabel = 'Copiato!';
                setTimeout(function () { return (_this.copyLabel = 'Copia'); }, 2000);
            });
        };
        AppComponent_1.prototype.decreaseLenght = function () {
            if (this.length > 4) {
                this.length--;
            }
        };
        AppComponent_1.prototype.increaseLenght = function () {
            if (this.length < 50) {
                this.length++;
            }
        };
        return AppComponent_1;
    }());
    __setFunctionName(_classThis, "AppComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
}();
exports.AppComponent = AppComponent;
