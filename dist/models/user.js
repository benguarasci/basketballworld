"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(_id, username, permission, email) {
        this._id = _id;
        this.username = username;
        this.permission = permission;
        this.email = email;
    }
    return User;
}());
exports.User = User;
