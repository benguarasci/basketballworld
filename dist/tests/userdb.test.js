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
var DbClient = require("../DbClient").DbClient;
var User = require("../models/user").User;
// A mock user created from the User model
var mockUser = new User;
mockUser.name = "John";
mockUser.email = "a@b.com";
mockUser.pw = "123";
mockUser.tags = null;
// Tests to see if the mockUser can be inserted into the 'users' collection
test("Insert User DB test", function () { return __awaiter(_this, void 0, void 0, function () {
    var insertedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DbClient.connect().then(function (db) {
                    return db.collection("users").insertOne(mockUser);
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, DbClient.connect().then(function (db) {
                        return db.collection("users").findOne(mockUser);
                    })];
            case 2:
                insertedUser = _a.sent();
                // The insertedUser should equal the mockUser added
                expect(insertedUser).toEqual(mockUser);
                return [2 /*return*/];
        }
    });
}); });
// Tests to see if the mockUser can be deleted from the 'users' collection
test("Delete User DB test", function () { return __awaiter(_this, void 0, void 0, function () {
    var deletedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DbClient.connect().then(function (db) {
                    return db.collection("users").deleteOne(mockUser);
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, DbClient.connect().then(function (db) {
                        return db.collection("users").findOne(mockUser);
                    })];
            case 2:
                deletedUser = _a.sent();
                // Since the mockUser has been deleted the deletedUser should return null
                expect(deletedUser).toEqual(null);
                return [2 /*return*/];
        }
    });
}); });
// Tests to see if the mockUser module 'isValid' validates that the fields have been filled
test("Tests that the User module 'isValid' validates properly", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mockUser.isValid();
        return [2 /*return*/];
    });
}); });
