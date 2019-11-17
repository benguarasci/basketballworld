"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var router = express_1.Router();
var ObjectId = require("mongodb").ObjectID;
router.get("/", function (req, res) {
    DbClient.connect()
        .then(function (db) { return db.collection("threads").find().toArray(); })
        .then(function (arr) {
        var links = arr.map(function (thread) { return "/threads/" + thread._id.toString(); });
        res.render("placeholders/threads", { 'user': req.cookies.username, threads: arr, links: links });
    }).catch(function (err) {
        console.log(err.message);
    });
});
router.get("/:thread", function (req, res) {
    var threadID = new ObjectId(req.params.thread);
    var thisDB;
    DbClient.connect()
        .then(function (db) {
        thisDB = db;
        return db.collection("threads").findOne({ _id: threadID });
    }).then(function (thread) {
        if (thread === null)
            res.render("placeholders/homepage", { "message": "couldn't find page, sorry" });
        else {
            thisDB.collection("posts").find({ parentThread: threadID }).toArray()
                .then(function (arr) {
                var posts;
                if (arr.length === 0)
                    posts = [];
                else
                    posts = arr;
                console.log("/threads/" + req.params.thread);
                res.render("placeholders/thread", { user: req.cookies.username, thread: thread, posts: posts, target: "/threads/" + req.params.thread });
            }).catch(function (err) { console.log(err.message); });
        }
    }).catch(function (err) { console.log(err.message); });
});
router.post("/:thread", function (req, res) {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", { "message": "you are not logged in" });
        return;
    }
    if (req.body.content === "") {
        res.render("placeholders/threads", { "message": "you have to write something" });
        return;
    }
    var content = req.body.content;
    var threadID = new ObjectId(req.params.thread);
    var author = req.cookies.username;
    var d = new Date();
    var date = d.toString();
    var ms = d.getTime();
    console.log("kill me");
    DbClient.connect()
        .then(function (db) {
        console.log("save me");
        db.collection("posts").insertOne({ content: content, author: author, parentThread: threadID, date: date, ms: ms })
            .then(function (id) {
            console.log("help me");
            res.redirect("/threads/" + req.params.thread);
        }).catch(function (err) {
            console.log(err.message);
        });
    })
        .catch(function (err) {
        console.log(err.message);
    });
});
router.get("/create", function (req, res) {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", { "message": "you are not logged in" });
        return;
    }
    res.render("placeholders/create_threads", { 'user': req.cookies.username });
});
router.post("/create", function (req, res) {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", { "message": "you are not logged in" });
        return;
    }
    var title = req.body.title;
    var desc = req.body.description;
    if (title === "" || desc == "") {
        res.render("placeholders/create_threads", { 'user': req.cookies.username, "message": "please complete all inputs" });
        return;
    }
    var owner = req.cookies.username;
    var d = new Date();
    var date = d.toString();
    var ms = d.getTime();
    var count = 0;
    DbClient.connect()
        .then(function (db) { return db.collection("threads").insertOne({ 'user': req.cookies.username, title: title, description: desc, owner: owner, date: date, ms: ms, count: count, last: date, by: owner }); })
        .then(function (id) { console.log(id); })
        .catch(function (err) { console.log(err); });
});
module.exports = router;
