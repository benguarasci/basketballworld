"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name, email, pw) {
        this.name = name;
        this.email = email;
        this.pw = pw;
    }
    User.prototype.isValid = function () {
        return (this.name != '' && this.email != '' && this.pw != '');
    };
    User.prototype.verify = function (pw) {
        return (this.pw === pw);
    };
    return User;
}());
exports.User = User;
