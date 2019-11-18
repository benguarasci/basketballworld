"use strict";
var userActivityManager = /** @class */ (function () {
    function userActivityManager() {
        //nothing
    }
    userActivityManager.prototype.isLoggedIn = function (req) {
        return "username" in req.cookies;
    };
    return userActivityManager;
}());
module.exports = new userActivityManager();
