"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
function isLoggedIn(req, res) {
    if ("username" in req.cookies) {
        res.render("index", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return true;
    }
    else
        return false;
}
exports.isLoggedIn = isLoggedIn;
function isLoggedIn_NoRender(req, res) {
    if ("username" in req.cookies) {
        return true;
    }
    else
        return false;
}
exports.isLoggedIn_NoRender = isLoggedIn_NoRender;
function createNewProfile(form) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").insertOne({ name: form.name, email: form.email, pw: form.pw })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNewProfile = createNewProfile;
function retrieveProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").findOne({ name: req.cookies.username })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.retrieveProfile = retrieveProfile;
function login(res, form) {
    return __awaiter(this, void 0, void 0, function () {
        var db, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").findOne({ name: form.name })];
                case 2:
                    account = _a.sent();
                    if (account === null) {
                        res.render("profile/login", {
                            "message": "can't find account, sorry"
                        });
                    }
                    else if (account.pw !== form.pw) {
                        console.log(account.pw);
                        console.log(form.pw);
                        res.render("profile/login", {
                            "message": "username or password is incorrect"
                        });
                    }
                    else {
                        res.cookie("username", form.name);
                        res.redirect('/profile/home');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
// https://docs.mongodb.com/manual/reference/operator/update/push/
function pushTag(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").updateOne({ name: req.cookies.username }, { $push: { tags: req.body.new } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.pushTag = pushTag;
// https://docs.mongodb.com/manual/reference/operator/update/pull/
function pullTag(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").updateOne({ name: req.cookies.username }, { $pull: { tags: req.body.tag } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.pullTag = pullTag;
// https://docs.mongodb.com/manual/reference/operator/update/positional/
function editEmail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").updateOne({ name: req.cookies.username }, { $set: { email: req.body.email } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.editEmail = editEmail;
function editPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("users").updateOne({ name: req.cookies.username }, { $set: { pw: req.body.password } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.editPassword = editPassword;
