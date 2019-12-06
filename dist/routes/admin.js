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
var express_1 = require("express");
var activityHandling_1 = require("../managers/activityHandling");
var app_1 = require("../app");
var DbClient = require("../DbClient");
var router = express_1.Router();
var ObjectId = require("mongodb").ObjectID;
function retrieveProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_1.usersCol.find({}).toArray()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function deleteProfileByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = ObjectId(id);
                    return [4 /*yield*/, app_1.usersCol.deleteOne({ "_id": ObjectId(id) })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
router.get("/", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool)
            res.render("placeholders/admin", { 'user': req.cookies.username });
    });
});
router.get("/profiles", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool)
            retrieveProfiles()
                .then(function (profiles) {
                var ids = profiles.map(function (profile) { return profile._id.toString(); });
                res.render("placeholders/admin_list_profiles", {
                    'user': req.cookies.username,
                    "profiles": profiles,
                    "ids": ids
                });
            });
    });
});
router.get("/delete/:id", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool) {
            deleteProfileByID(req.params.id)
                .then(function (val) {
                res.redirect("/admin/profiles");
            });
        }
    });
});
function makeUserAdmin(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_1.usersCol.updateOne({ _id: ObjectId(user_id) }, { $set: { level: 2 } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function makeUserBan(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_1.usersCol.updateOne({ _id: ObjectId(user_id) }, { $set: { level: 0 } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function makeUserNormal(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_1.usersCol.updateOne({ _id: ObjectId(user_id) }, { $set: { level: 1 } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
router.get("/makeAdmin/:id", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool) {
            makeUserAdmin(req.params.id)
                .then(function () {
                res.redirect("/admin/profiles");
            });
        }
    });
});
router.get("/makeNormal/:id", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool) {
            makeUserNormal(req.params.id)
                .then(function () {
                res.redirect("/admin/profiles");
            });
        }
    });
});
router.get("/ban/:id", function (req, res) {
    activityHandling_1.isAdmin_render(req, res)
        .then(function (bool) {
        if (bool) {
            makeUserBan(req.params.id)
                .then(function () {
                res.redirect("/admin/profiles");
            });
        }
    });
});
function createRoot() {
    return __awaiter(this, void 0, void 0, function () {
        var root, accounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_1.usersCol.findOne({ name: "root" })];
                case 1:
                    root = _a.sent();
                    if (!(root == null)) return [3 /*break*/, 3];
                    //await usersCol.insertOne({name: "root", email:"notreal@uvic.ca", pw: "root", level: 3})
                    return [4 /*yield*/, app_1.usersCol.insertOne({ name: "root", email: "email@email.com", pw: "root", level: 2 })];
                case 2:
                    //await usersCol.insertOne({name: "root", email:"notreal@uvic.ca", pw: "root", level: 3})
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(root.level != 2)) return [3 /*break*/, 5];
                    return [4 /*yield*/, app_1.usersCol.updateOne({ name: "root" }, { $set: { level: 2 } })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, app_1.usersCol.find().toArray()];
                case 6:
                    accounts = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
router.get("/createRoot", function (req, res) {
    createRoot()
        .then(function () {
        res.render("index", { 'user': req.cookies.user, 'message': "root created" });
    });
});
module.exports = router;
