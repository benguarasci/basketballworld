"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var shoe_1 = require("../managers/shoe");
var router = express_1.Router();
// sending create profile page to client
router.get("/browse", function (req, res, next) {
    //res.render("shoes/browse");
    DbClient.connect()
        .then(function (db) {
        db.collection('data').countDocuments()
            .then(function (i) {
            if (i === 0) {
                db.collection('data').insertMany([
                    { name: "Lebron", likes: 0, dislikes: 0 },
                    { name: "Kawhi", likes: 0, dislikes: 0 },
                    { name: "Giannis", likes: 0, dislikes: 0 },
                    { name: "KD", likes: 0, dislikes: 0 },
                ]).then(function (i) {
                    res.render('shoes/browse', { lebronlikes: 0, lebrondislikes: 0, kawhilikes: 0, kawhidislikes: 0, giannislikes: 0, giannisdislikes: 0, KDlikes: 0, KDdislikes: 0 });
                });
            }
            else {
                shoe_1.refresh(res).then(function (val) { });
            }
        });
    });
});
router.get("/lebronlike", function (req, res) {
    shoe_1.like(res, "Lebron")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/lebrondislike", function (req, res) {
    shoe_1.dislike(res, "Lebron")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/kawhilike", function (req, res) {
    shoe_1.like(res, "Kawhi")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/kawhidislike", function (req, res) {
    shoe_1.dislike(res, "Kawhi")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/giannislike", function (req, res) {
    shoe_1.like(res, "Giannis")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/giannisdislike", function (req, res) {
    shoe_1.dislike(res, "Giannis")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/kdlike", function (req, res) {
    shoe_1.like(res, "KD")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
router.get("/kddislike", function (req, res) {
    shoe_1.dislike(res, "KD")
        .then(function (confirm) { return shoe_1.refresh(res); })
        .then(function (confirm) { });
});
module.exports = router;
