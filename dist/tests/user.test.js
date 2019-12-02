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
var _a = require("../managers/profile"), createNewProfile = _a.createNewProfile, retrieveProfile = _a.retrieveProfile;
var DbClient = require("../DbClient").DbClient;
var Profile = require("../models/profile_m").Profile;
// A mock user created from the User model
var mockUser = new Profile;
mockUser.name = "John";
mockUser.email = "a@b.com";
mockUser.pw = "123";
mockUser.tags = null;
//A mock user request
var mockProfileRequest = function (name, email, password, cookies) { return ({
    name: mockUser.name,
    email: mockUser.email,
    password: mockUser.pw,
    cookies: { username: mockUser.name },
}); };
// A mock user response
// const mockResponse = () => {
//     const res = {};
//     res.status = 200;
//     res.json = "";
//     return res;
// };
// Tests to see if the mockUser can be inserted into the 'users' collection
test("Insert User DB test", function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockForm, addedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mockForm = function (name, email, pw) { return ({
                    name: mockUser.name,
                    email: mockUser.email,
                    pw: mockUser.pw,
                }); };
                return [4 /*yield*/, createNewProfile(mockForm)];
            case 1:
                _a.sent();
                return [4 /*yield*/, retrieveProfile(mockProfileRequest)];
            case 2:
                addedUser = _a.sent();
                expect(mockUser).toEqual(addedUser);
                return [2 /*return*/];
        }
    });
}); });
// Tests to see if the mockUser module 'isValid' validates that the fields have been filled
// test("Tests profileRetriever function", async () => {
//     const user = await retrieveProfile(mockProfileRequest);
//     expect(user).toEqual(mockUser.name);
//
// });
// Tests to see if the mockUser can be deleted from the 'users' collection
// test("Delete User DB test", async () => {x
//
//
// });
