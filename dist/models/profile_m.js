"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profileRetriever = require("../modules/profileRetriever").profileRetriever;
var Profile = /** @class */ (function () {
    function Profile(name, email, pw, tags) {
        this.name = name;
        this.email = email;
        this.pw = pw;
        this.tags = tags;
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
