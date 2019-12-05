"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shoe_1 = require("../managers/shoe");
var profile_1 = require("../managers/profile");
var router = express_1.Router();
// sending create profile page to client
router.get("/browse", function (req, res, next) {
    shoe_1.sortShoes()
        .then(function (shoes) {
        res.render("shoes/browse", { 'user': req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2] });
    });
});
router.get("/likes/:id", function (req, res) {
    if (!profile_1.isLoggedIn_NoRender(req, res)) {
        res.render("profile/login");
    }
    else {
        shoe_1.like(res, req)
            .then(function (conf) {
            res.redirect("/shoes/browse");
        });
    }
});
router.get("/dislikes/:id", function (req, res) {
    if (!profile_1.isLoggedIn_NoRender(req, res)) {
        res.render("profile/login");
    }
    else {
        shoe_1.dislike(res, req)
            .then(function (conf) {
            res.redirect("/shoes/browse");
        });
    }
});
shoe_1.insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", "$170 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { console.log("number23"); });
shoe_1.insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { console.log("number2"); });
shoe_1.insertShoe("/img/greek.jpg", "NIKE Zoom Freak 1", "Giannis Antetekounmpo", "$120 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { console.log("number34"); });
shoe_1.insertShoe("/img/kd.jpg", "NIKE Zoom KD12", "Kevin Durant", "$150 US", "An amazing shoe", 0, 0)
    .then(function (confirm) { console.log("KD"); });
shoe_1.insertShoe("/img/jordan.jpg", "Jordan Why Not Zer0.2", "Michael Jordan", "$125 US", "an amazing shoe", 0, 0)
    .then(function (confirm) { console.log("MJ"); });
shoe_1.insertShoe("/img/jordan2.jpg", "Air Jordan 34", "Michael Jordan", "$180 US", "an amazing shoe", 0, 0)
    .then(function (confirm) { console.log("MJ"); });
shoe_1.insertShoe("/img/harden.jpg", "Adidas Harden Vol.4", "James Harden", "$130 US", "an amazing shoe", 0, 0)
    .then(function (confirm) { console.log("Harden"); });
shoe_1.insertShoe("/img/kobe.jpg", "NIKE Kobe AD NXT FF", "Kobe Bryant", "$200 US", "an amazing shoe", 0, 0)
    .then(function (confirm) { console.log("KOBE!"); });
shoe_1.insertShoe("/img/dom.jpg", "Adidas D.O.N. Issue 1", "Donavan Mitchell", "$100 US", "an amazing shoe", 0, 0)
    .then(function (confirm) { console.log("DON"); });
module.exports = router;
