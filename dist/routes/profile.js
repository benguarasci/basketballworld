"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
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
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmPassword;
    //ensuring no field is empty
    if (name === "" || email === "" || pw === "" || pw2 === "")
        res.send("missing credentials");
    else if (pw !== pw2) //ensuring passwords match
        res.send("passwords do not match");
    else if (searchDb4User(name) === undefined) //ensuring unique username
     {
        console.log(searchDb4User(name));
        res.send("username already taken");
    }
    else
        //inserting new account into database
        DbClient.connect()
            //inserting item into database
            .then(function (db) { return db.collection("users").insertOne({ name: name, email: email, pw: pw }); })
            .then(function (bool) {
            if (bool === false)
                res.send("account creation failed");
            else { //if account creation was a success
                res.cookie("username", name);
                res.send("account creation success");
            }
        })
            .catch(function (err) { console.log(err.message); });
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
    var name = req.body.name;
    var pw = req.body.password;
    var account = searchDb4User(name);
    if (account === null)
        res.send("can't find account, sorry");
    else if (account.pw !== pw)
        res.send("password is incorrect");
    else {
        res.cookie("username", name);
        res.send("login successful");
    }
});
router.get("/account", function (req, res, next) {
    res.send(req.cookies);
});
router.get("/logout", function (req, res, next) {
    res.clearCookie("username");
    res.send("logout successful");
});
//returns a query for a specific user
var searchDb4User = function (user) {
    var ret = null;
    DbClient.connect()
        .then(function (db) {
        return db.collection("users").findOne({ name: user });
    })
        .then(function (object) {
        ret = object;
    })
        .catch(function (err) {
        console.log(err.message);
    });
    return ret;
};
module.exports = router;
