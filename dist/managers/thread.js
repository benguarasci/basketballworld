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
var profile_1 = require("./profile");
var createThread_1 = __importDefault(require("../mymodels/createThread"));
var app_1 = require("../app");
var DbClient = require("../DbClient");
var ObjectId = require("mongodb").ObjectID;
// https://docs.mongodb.com/manual/reference/operator/query/in/
function retrieveThreads(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_1.retrieveProfile(req, res)];
                case 1:
                    profile = _a.sent();
                    return [4 /*yield*/, app_1.threadsCol.find({ tags: { $in: profile.tags } }).toArray()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.retrieveThreads = retrieveThreads;
function retrieveMyThreads(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_1.retrieveProfile(req, res)];
                case 1:
                    profile = _a.sent();
                    return [4 /*yield*/, app_1.threadsCol.find({ owner: profile.name }).toArray()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.retrieveMyThreads = retrieveMyThreads;
function createThread(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var thread;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    thread = new createThread_1.default(req);
                    if (!thread.isFormComplete(res)) return [3 /*break*/, 2];
                    return [4 /*yield*/, app_1.threadsCol.insertOne(thread)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.createThread = createThread;
// Deletes a thread based on the _id input
function deleteThread(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var threadID, Exception_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    threadID = new ObjectId(req.params.id);
                    return [4 /*yield*/, app_1.threadsCol.deleteOne({ _id: threadID })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    Exception_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteThread = deleteThread;
// Edits a thread based on the _id input
function editThread(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var threadID, thread, Exception_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    threadID = new ObjectId(req.body._id);
                    thread = new createThread_1.default(req);
                    if (!thread.isFormComplete(res)) return [3 /*break*/, 2];
                    return [4 /*yield*/, app_1.threadsCol.replaceOne({ _id: threadID }, thread)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    Exception_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.editThread = editThread;
// Gets a thread based on the _id input
function retrieveThread(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var threadID, Exception_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    threadID = new ObjectId(req.params.id);
                    return [4 /*yield*/, app_1.threadsCol.findOne({ _id: threadID })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    Exception_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.retrieveThread = retrieveThread;
