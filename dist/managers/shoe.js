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
var shoe_m_1 = require("../models/shoe_m");
var DbClient = require("../DbClient");
var ObjectId = require("mongodb").ObjectID;
function insertShoe(image, model, player, price, description, likes, dislikes) {
    return __awaiter(this, void 0, void 0, function () {
        var db, shoe, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    shoe = new shoe_m_1.Shoe(image, model, player, price, description, likes, dislikes);
                    return [4 /*yield*/, db.collection("shoes").findOne({ "model": model })];
                case 2:
                    temp = _a.sent();
                    if (!(temp === null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.collection('shoes').insertOne(shoe)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insertShoe = insertShoe;
function deleteShoe(player) {
    return __awaiter(this, void 0, void 0, function () {
        var db, shoe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("shoes").findOne({ "player": player })];
                case 2:
                    shoe = _a.sent();
                    return [4 /*yield*/, db.collection('shoes').deleteOne(shoe)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteShoe = deleteShoe;
function refresh(res, req) {
    return __awaiter(this, void 0, void 0, function () {
        var db, shoes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("shoes").find().toArray()];
                case 2:
                    shoes = _a.sent();
                    res.render('shoes/browse', { "user": req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
                    return [2 /*return*/];
            }
        });
    });
}
exports.refresh = refresh;
function like(res, req) {
    return __awaiter(this, void 0, void 0, function () {
        var db, ID, shoe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    ID = ObjectId(req.params.id);
                    return [4 /*yield*/, db.collection("shoes").findOne({ _id: ID })];
                case 2:
                    shoe = _a.sent();
                    return [4 /*yield*/, db.collection("shoes").updateOne({ _id: shoe._id }, { $inc: { likes: 1 } })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.like = like;
function dislike(res, req) {
    return __awaiter(this, void 0, void 0, function () {
        var db, ID, shoe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    ID = ObjectId(req.params.id);
                    return [4 /*yield*/, db.collection("shoes").findOne({ _id: ID })];
                case 2:
                    shoe = _a.sent();
                    return [4 /*yield*/, db.collection("shoes").updateOne({ _id: shoe._id }, { $inc: { dislikes: 1 } })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.dislike = dislike;
function sortShoes() {
    return __awaiter(this, void 0, void 0, function () {
        var db, order, shoes, likes, dislikes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    order = { likes: -1 };
                    return [4 /*yield*/, db.collection("shoes").find().sort(order).toArray()];
                case 2:
                    shoes = _a.sent();
                    likes = shoes.map(function (shoe) { return "/shoes/likes/" + shoe._id.toString(); });
                    dislikes = shoes.map(function (shoe) { return "/shoes/dislikes/" + shoe._id.toString(); });
                    return [2 /*return*/, [shoes, likes, dislikes]];
            }
        });
    });
}
exports.sortShoes = sortShoes;
