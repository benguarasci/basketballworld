"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shoe_1 = require("../managers/shoe");
var profile_1 = require("../managers/profile");
var router = express_1.Router();
var ObjectId = require("mongodb").ObjectID;
// sorts and renders shoes page.
router.get("/browse", function (req, res, next) {
    shoe_1.sortShoes({ likes: -1 })
        .then(function (shoes) {
        res.render("shoes/browse", { 'user': req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
//filter href
//like button href
router.get("/likes/:id", function (req, res) {
    if (!profile_1.isLoggedIn_NoRender(req, res)) {
        res.render("profile/login");
    }
    else {
        var ID = ObjectId(req.params.id);
        shoe_1.like(ID)
            .then(function (conf) {
            res.redirect("/shoes/browse");
        });
    }
});
//dislike button href
router.get("/dislikes/:id", function (req, res) {
    if (!profile_1.isLoggedIn_NoRender(req, res)) {
        res.render("profile/login");
    }
    else {
        var ID = ObjectId(req.params.id);
        shoe_1.dislike(ID)
            .then(function (conf) {
            res.redirect("/shoes/browse");
        });
    }
});
router.get("/browse/popular", function (req, res) {
    shoe_1.sortShoes({ likes: -1 })
        .then(function (shoes) {
        res.render("shoes/browse", { 'user': req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
router.get("/browse/pricelth", function (req, res) {
    shoe_1.sortShoes({ price: 1 })
        .then(function (shoes) {
        res.render("shoes/browse", { 'user': req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
router.get("/browse/pricehtl", function (req, res) {
    shoe_1.sortShoes({ price: -1 })
        .then(function (shoes) {
        res.render("shoes/browse", { 'user': req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
//Inserts each shoe into the database.
shoe_1.insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", 170, "An amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", 140, "An amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/greek.jpg", "NIKE Zoom Freak 1", "Giannis Antetekounmpo", 120, "An amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/kd.jpg", "NIKE Zoom KD12", "Kevin Durant", 150, "An amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/jordan.jpg", "Jordan Why Not Zer0.2", "Michael Jordan", 125, "an amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/jordan2.jpg", "Air Jordan 34", "Michael Jordan", 180, "an amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/harden.jpg", "Adidas Harden Vol.4", "James Harden", 130, "an amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/kobe.jpg", "NIKE Kobe AD NXT FF", "Kobe Bryant", 200, "an amazing shoe", 0, 0)
    .then(function (confirm) { });
shoe_1.insertShoe("/img/dom.jpg", "Adidas D.O.N. Issue 1", "Donavan Mitchell", 100, "an amazing shoe", 0, 0)
    .then(function (confirm) { });
module.exports = router;
