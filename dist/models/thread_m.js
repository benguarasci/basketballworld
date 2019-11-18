"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Threads = /** @class */ (function () {
    function Threads(title, content) {
        this.title = title;
        this.content = content;
    }
    Threads.prototype.isValid = function () {
        return (this.title != "" && this.content != "");
    };
    return Threads;
}());
exports.Threads = Threads;
