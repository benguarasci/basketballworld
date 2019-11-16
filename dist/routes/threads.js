"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var router = express_1.Router();
router.get("/", function (req, res) {
    DbClient.connect()
        .then(function (db) { return db.collection("threads").find().toArray(); })
        .then(function (arr) {
        var links = arr.map(function (thread) { return "/threads/" + thread._id.toString() + ":thread"; });
        res.render("placeholders/threads", { threads: arr, links: links, });
    }).catch(function (err) {
        console.log(err.message);
    });
});
router.get("/:id", function (req, res) {
    res.send("congratulations");
});
router.get("/create", function (req, res) {
    res.render("placeholders/create_threads");
});
router.post("/create", function (req, res) {
    if (!("username" in req.cookies)) {
        res.render("placeholders/create_threads", { "message": "you are not logged in" });
        return;
    }
    var title = req.body.title;
    var desc = req.body.description;
    if (title === "" || desc == "") {
        res.render("placeholders/create_threads", { "message": "please complete all inputs" });
        return;
    }
    var owner = req.cookies.username;
    var d = new Date();
    var date = d.toString();
    var ms = d.getTime();
    var count = 0;
    DbClient.connect()
        .then(function (db) { return db.collection("threads").insertOne({ title: title, description: desc, owner: owner, date: date, ms: ms, count: count, last: date, by: owner }); })
        .then(function (id) { console.log(id); })
        .catch(function (err) { console.log(err); });
});
module.exports = router;
