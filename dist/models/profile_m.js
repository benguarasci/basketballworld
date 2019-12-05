"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Profile = /** @class */ (function () {
    function Profile(name, email, pw, tags, shoes) {
        this.name = name;
        this.email = email;
        this.pw = pw;
        this.tags = tags;
        this.shoes = shoes;
    }
    Profile.prototype.isValid = function () {
        return (this.name != "" && this.email != "" && this.pw != "");
    };
    Profile.prototype.verify = function (pw) {
        return (this.pw === pw);
    };
    return Profile;
}());
exports.Profile = Profile;
