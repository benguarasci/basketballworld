"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Thread = /** @class */ (function () {
    function Thread(user, title, content, tags) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.tags = tags;
    }
    Thread.prototype.isValid = function () {
        return (this.title != "" && this.content != "");
    };
    return Thread;
}());
exports.Thread = Thread;
