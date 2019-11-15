"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var Profile = /** @class */ (function () {
    function Profile() {
    }
    Profile.userExists = function (user, res) {
        DbClient.connect().then(function (db) {
            return db.collection("users").find({ name: user.name }).toArray();
        }).then(function (array) {
            if (array.length !== 0) {
                console.log("user exists");
                res.send("user exists");
            }
            else {
                console.log("user does not exist");
            }
        });
    };
    Profile.insert = function (user, res) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("users").insertOne(user);
        })
            .then(function (db) {
            console.log("user created");
            res.send("account creation was a success");
        })
            .catch(function (err) {
            console.log(err.message);
        });
    };
    Profile.setCookie = function (user, res) {
        res.cookie("username", user.name);
    };
    Profile.login = function (user, res) {
        var _this = this;
        DbClient.connect()
            .then(function (db) { return db.collection("users").findOne({ name: user.name }); })
            .then(function (account) {
            if (account === null)
                res.send("username or password is incorrect");
            else if (account.pw !== user.pw)
                res.send("username or password is incorrect");
            else {
                _this.setCookie(user, res);
                res.send("login successful");
            }
        }).catch(function (err) {
            console.log(err.message);
        });
    };
    return Profile;
}());
exports.Profile = Profile;
