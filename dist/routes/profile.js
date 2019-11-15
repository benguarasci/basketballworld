"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var profile_c_1 = require("../controllers/profile_c");
var express = require('express');
var DbClient = require("../DbClient");
var cookieParser = require('cookie-parser');
var router = express_1.Router();
router.get("/create", function (req, res, next) {
    //logged in clients should be unable to create accounts
    if ("username" in req.cookies) {
        res.send("you are already logged");
        return;
    }
    //if client is not logged in, they can create account
    res.render("profile/create");
});
router.post("/create", function (req, res) {
    // model instantiation
    var user = new user_1.User(req.body.name, req.body.email, req.body.password);
    // check for empty fields in the form
    if (!user.isValid()) {
        res.send("missing credentials");
        return;
    }
    // verify password
    if (!user.verify(req.body.confirmPassword)) {
        res.send("passwords do not match");
        return;
    }
    // check if username is already taken
    profile_c_1.Profile.userExists(user, res);
    // create new user
    profile_c_1.Profile.insert(user, res);
    // set cookie
    profile_c_1.Profile.setCookie(user, res);
});
router.get("/login", function (req, res, next) {
    if ("username" in req.cookies) {
        res.send("you are already logged");
        return;
    }
    //if client is not logged in, they can create account
    res.render("profile/login");
});
router.post("/login", function (req, res) {
    // model instantiation
    var user = new user_1.User(req.body.name, '', req.body.password);
    // login
    profile_c_1.Profile.login(user, res);
});
router.get("", function (req, res, next) {
    res.send(req.cookies);
});
router.get("/logout", function (req, res, next) {
    res.clearCookie("username");
    res.send("logout successful");
});
module.exports = router;
