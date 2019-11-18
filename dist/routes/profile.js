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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_1 = require("../managers/profile");
var createProfile_1 = __importDefault(require("../mymodels/createProfile"));
var router = express_1.Router();
router.get("/create", function (req, res) {
    if (!profile_1.isLoggedIn(req, res))
        res.render("placeholders/create_account");
});
router.post("/create", function (req, res) {
    if (profile_1.isLoggedIn(req, res))
        return;
    var form = new createProfile_1.default(req);
    form.isValidForm(res)
        .then(function (bool) {
        if (bool) {
            profile_1.createNewProfile(form)
                .then(function () {
                return profile_1.login(res, form);
            });
        }
    });
});
router.get("/login", function (req, res) {
    if (!profile_1.isLoggedIn(req, res))
        res.render("placeholders/login");
});
router.post("/login", function (req, res) {
    var form = new createProfile_1.default(req);
    if (!profile_1.isLoggedIn(req, res) || !form.isLoginFormComplete(res))
        profile_1.login(res, form).then();
});
router.get("/logout", function (req, res) {
    res.clearCookie("username");
    res.render("placeholders/login");
});
router.get("/home", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _b = (_a = res).render;
                _c = ["profile/home"];
                _d = {};
                _e = "user";
                return [4 /*yield*/, profile_1.retrieveProfile(req, res).catch(function (e) { return console.log(e); })];
            case 1:
                _b.apply(_a, _c.concat([(_d[_e] = _f.sent(),
                        _d)]));
                return [2 /*return*/];
        }
    });
}); });
router.post("/pushtag", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, profile_1.pushTag(req, res)];
            case 1:
                _a.sent();
                res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
router.post("/pulltag", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, profile_1.pullTag(req, res)];
            case 1:
                _a.sent();
                res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
router.post("/editemail", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, profile_1.editEmail(req, res)];
            case 1:
                _a.sent();
                res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
router.post("/editpassword", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, profile_1.editPassword(req, res)];
            case 1:
                _a.sent();
                res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
