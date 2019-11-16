"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var router = express_1.Router();
router.get("/create", function (req, res) {
    //logged in clients should be unable to create accounts
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/create_account");
});
router.post("/create", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmPassword;
    //ensuring no field is empty
    if (name === "" || email === "" || pw === "" || pw2 === "") {
        res.render("placeholders/create_account", {
            "message": "missing input"
        });
    }
    else if (pw !== pw2) //ensuring passwords match
        res.render("placeholders/create_account", {
            "message": "passwords do not match"
        });
    else {
        var myDB_1;
        DbClient.connect()
            .then(function (db) {
            myDB_1 = db;
            return db.collection("users").findOne({ name: name });
        }).then(function (account) {
            if (account !== null)
                res.render("placeholders/create_account", {
                    "message": "username taken"
                });
            else {
                myDB_1.collection("users").insertOne({ name: name, email: email, pw: pw })
                    .then(function (object) {
                    if (object != null) {
                        res.cookie("username", name);
                        res.render("placeholders/homepage", {
                            "user": name,
                            "message": 'succeeded in creating new account'
                        });
                    }
                    else {
                        res.render("placeholders/homepage", {
                            "message": 'failed in creating new account'
                        });
                    }
                }).catch(function (err) {
                    console.log(err.message);
                });
            }
        }).catch(function (err) {
            console.log(err.message);
        });
    }
    // check if username is already taken
    profile_c_1.Profile.userExists(user, res);
    // create new user
    profile_c_1.Profile.insert(user, res);
    // set cookie
    profile_c_1.Profile.setCookie(user, res);
});
router.get("/login", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/login");
});
router.post("/login", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    var name = req.body.name;
    var pw = req.body.password;
    DbClient.connect()
        .then(function (db) { return db.collection("users").findOne({ name: name }); })
        .then(function (account) {
        if (account === null) {
            res.render("placeholders/login", {
                "message": "can't find account, sorry"
            });
        }
        else if (account.pw !== pw) {
            res.render("placeholders/login", {
                "message": "username or password is incorrect"
            });
        }
        else {
            res.cookie("username", name);
            res.render("placeholders/homepage", {
                "user": name,
                "message": "you successfully logged in"
            });
        }
    }).catch(function (err) {
        console.log(err.message);
    });
}); });
router.post("/deletetag", function (req, res) {
    console.log(req.body);
});
router.get("/account", function (req, res) {
    res.send(req.cookies);
});
router.get("/logout", function (req, res) {
    res.clearCookie("username");
    res.render("placeholders/login");
});
module.exports = router;
