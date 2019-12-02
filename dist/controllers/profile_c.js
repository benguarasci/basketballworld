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
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var Profile = require("../models/profile_m");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    // Returns the profile as output based on input
    ProfileController.prototype.retrieve = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRequested, db, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRequested = new Profile;
                        userRequested.name = req.body.name;
                        userRequested.email = req.body.email;
                        userRequested.pw = req.body.pw;
                        return [4 /*yield*/, DbClient.connect()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection("users").findOne(userRequested)];
                    case 2:
                        foundUser = _a.sent();
                        // If the user is not found return null
                        if (foundUser === null) {
                            res.render("placeholders/login", {
                                "message": "can't find account, sorry"
                            });
                        }
                        // Otherwise return the user
                        else {
                            return [2 /*return*/, [foundUser, "user"]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, pw;
            return __generator(this, function (_a) {
                if ("username" in req.cookies) {
                    res.render("placeholders/homepage", {
                        "user": req.cookies.username,
                        "message": "you are already logged in"
                    });
                    return [2 /*return*/];
                }
                name = req.body.name;
                pw = req.body.password;
                DbClient.connect()
                    .then(function (db) {
                    return db.collection("users").findOne({ name: name });
                })
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
                })
                    .catch(function (err) {
                    console.log(err.message);
                });
                return [2 /*return*/];
            });
        });
    };
    return ProfileController;
}());
exports.ProfileController = ProfileController;
