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
var DbClient = require("../DbClient");
var router = express_1.Router();
var ObjectId = require("mongodb").ObjectID;
var app_1 = require("../app");
var createPost_1 = __importDefault(require("../mymodels/createPost"));
var activityHandling_1 = require("../managers/activityHandling");
var thread_1 = require("../managers/thread");
var app_2 = require("../app");
router.get("/view", function (req, res) {
    thread_1.listThreads()
        .then(function (threads) {
        res.render("threads/view", { 'user': req.cookies.username, threads: threads[0], links: threads[1] });
    });
});
router.get("/create", function (req, res) {
    activityHandling_1.isBanned(req, res)
        .then(function (bool) {
        if (!bool)
            res.render("threads/create", { 'user': req.cookies.username });
    });
});
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, activityHandling_1.isBanned(req, res)];
            case 1:
                if (!!(_a.sent())) return [3 /*break*/, 3];
                return [4 /*yield*/, thread_1.createThread(req, res).then(function (id) { res.redirect("/threads/" + id.insertedId.toString()); })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, thread_1.deleteThread(req, res)];
            case 1:
                if (_a.sent())
                    res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
router.post("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var threadID, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                threadID = new ObjectId(req.params.id);
                return [4 /*yield*/, activityHandling_1.canModify_Thread(ObjectId(req.params.id), req, res)];
            case 1:
                if (!_e.sent()) return [3 /*break*/, 3];
                _b = (_a = res).render;
                _c = ["threads/edit"];
                _d = {
                    'user': req.cookies.username
                };
                return [4 /*yield*/, thread_1.getThread(threadID).catch(function (err) { return console.log(err); })];
            case 2:
                _b.apply(_a, _c.concat([(_d.thread = _e.sent(),
                        _d)]));
                _e.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/confirm", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, thread_1.editThread(req, res)];
            case 1:
                _a.sent();
                res.redirect('/profile/home');
                return [2 /*return*/];
        }
    });
}); });
router.get("/editPost/:id", function (req, res) {
    app_1.postsCol.findOne({ _id: ObjectId(req.params.id) })
        .then(function (post) {
        if (post === null) {
            res.render("index", {
                "message": "post does not exist",
                "user": req.cookies.username
            });
            return;
        }
        activityHandling_1.canModify(post, req, res)
            .then(function (bool) {
            if (bool) {
                res.render("threads/editPost", { "user": req.cookies.username, post: post });
            }
        });
    });
});
router.post("/editPost/:parent/:id", function (req, res) {
    activityHandling_1.canModify_Post(ObjectId(req.params.id), req, res)
        .then(function (bool) {
        if (bool)
            app_1.postsCol.updateOne({ _id: ObjectId(req.params.id) }, { $set: { content: req.body.content } })
                .then(function () { res.redirect("/threads/" + req.params.parent); });
    });
});
router.get("/editThread/:id", function (req, res) {
    console.log(req.params.id);
    console.log("lilypad");
    activityHandling_1.canModify_Thread(req.params.id, req, res)
        .then(function (bool) {
        console.log("tree people");
        if (bool) {
            console.log("johny depp");
            console.log(req.params.id);
            app_2.threadsCol.findOne({ _id: ObjectId(req.params.id) })
                .then(function (thread) {
                if (thread === null)
                    res.render("index", {
                        "message": "thread does not exist",
                        "user": req.cookies.username
                    });
                res.render("threads/edit", { "user": req.cookies.username, thread: thread });
            });
        }
        else {
            console.log("baby pie");
        }
    });
});
router.get("/:thread", function (req, res) {
    thread_1.getThread(req.params.thread)
        .then(function (thread) {
        if (thread === null)
            res.render("index", { "message": "couldn't find page, sorry" });
        else {
            activityHandling_1.isAdmin(req)
                .then(function (amAdmin) {
                var thisIsMine;
                thisIsMine = amAdmin || req.cookies.username === thread.author;
                thread_1.findAllPosts(req.params.thread)
                    .then(function (posts) {
                    var isMine;
                    if (!amAdmin)
                        isMine = posts.map(function (post) { return (post.author == req.cookies.username); });
                    else
                        isMine = posts.map(function (post) { return true; });
                    res.render("threads/thread", { user: req.cookies.username,
                        thread: thread,
                        posts: posts,
                        target: "/threads/" + req.params.thread,
                        isMine: isMine,
                        thisIsMine: thisIsMine
                    });
                });
            });
        }
    });
});
router.post("/:thread", function (req, res) {
    activityHandling_1.isBanned(req, res)
        .then(function (bool) {
        if (!bool) {
            if (!profile_1.isLoggedIn_NoRender(req, res))
                return;
            var new_post = new createPost_1.default(req);
            if (new_post.isFormComplete(res)) {
                app_1.postsCol.insertOne({ content: new_post.content, author: new_post.author, parentThread: new_post.parentThread, date: new_post.date, ms: new_post.ms })
                    .then(function () {
                    res.redirect("/threads/" + req.params.thread);
                });
            }
        }
    });
});
module.exports = router;
