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
var DbClient = require("../DbClient");
var shoe_1 = require("../managers/shoe");
var router = express_1.Router();
function listShoes() {
    return __awaiter(this, void 0, void 0, function () {
        var db, shoes, likes, dislikes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DbClient.connect()];
                case 1:
                    db = _a.sent();
                    console.log("listshoes:");
                    return [4 /*yield*/, db.collection("shoes").find().toArray()];
                case 2:
                    shoes = _a.sent();
                    console.log(shoes);
                    likes = shoes.map(function (shoe) { return "/shoes/likes/" + shoe._id.toString(); });
                    dislikes = shoes.map(function (shoe) { return "/shoes/dislikes/" + shoe._id.toString(); });
                    return [2 /*return*/, [shoes, likes, dislikes]];
            }
        });
    });
}
// sending create profile page to client
router.get("/browse", function (req, res, next) {
    console.log("hello");
    listShoes()
        .then(function (shoes) {
        res.render("shoes/browse", { shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
router.get("/likes/:id", function (req, res) {
    console.log("in route");
    console.log("cheerios");
    shoe_1.like(res, req)
        .then(function (conf) {
        console.log("put me");
        res.redirect("/shoes/browse");
    });
});
router.get("/shoes/dislikes/:id", function (req, res) {
});
/*
router.get("/lebronlike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else{
    like(res, "Lebron")
        .then((confirm: any)=>refresh(res, req))
        .then((confirm:any)=>{});
    }
*/
/*insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", "$170 US", "An amazing shoe",0, 0)
.then((confirm:any)=>{});
*/
shoe_1.insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { });
module.exports = router;
