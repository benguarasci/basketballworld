"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var router = express_1.Router();
router.get("/create", function (req, res) {
    //logged in clients should be unable to create accounts
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/create_account");
});
router.post("/create", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmpassword;
    //ensuring no field is empty
    if (name === "" || email === "" || pw === "" || pw2 === "") {
        res.render("placeholders/create_account", {
            "message": "missing input"
        });
    }
    else if (pw !== pw2) //ensuring passwords match
        res.render("placeholders/create_account", {
            "message": "passwords do not match"
        });
    else {
        var myDB_1;
        DbClient.connect()
            .then(function (db) {
            myDB_1 = db;
            return db.collection("users").findOne({ name: name });
        }).then(function (account) {
            if (account !== null)
                res.render("placeholders/create_account", {
                    "message": "username taken"
                });
            else {
                myDB_1.collection("users").insertOne({ name: name, email: email, pw: pw })
                    .then(function (object) {
                    if (object != null) {
                        res.cookie("username", name);
                        res.render("placeholders/homepage", {
                            "user": name,
                            "message": 'succeeded in creating new account'
                        });
                    }
                    else {
                        res.render("placeholders/homepage", {
                            "message": 'failed in creating new account'
                        });
                    }
                }).catch(function (err) {
                    console.log(err.message);
                });
            }
        }).catch(function (err) {
            console.log(err.message);
        });
    }
});
router.get("/login", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/login");
});
router.post("/login", function (req, res) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message": "you are already logged in"
        });
        return;
    }
    var name = req.body.name;
    var pw = req.body.password;
    DbClient.connect()
        .then(function (db) { return db.collection("users").findOne({ name: name }); })
        .then(function (account) {
        if (account === null) {
            res.render("placeholders/login", {
                "message": "can't find account, sorry"
            });
        }
        else if (account.pw !== pw) {
            res.render("placeholders/login", {
                "message": "username or password is incorrect"
            });
        }
        else {
            res.cookie("username", name);
            res.render("placeholders/homepage", {
                "user": name,
                "message": "you successfully logged in"
            });
        }
    }).catch(function (err) {
        console.log(err.message);
    });
});
router.get("/account", function (req, res) {
    res.send(req.cookies);
});
router.get("/logout", function (req, res) {
    res.clearCookie("username");
    res.render("placeholders/login");
});
module.exports = router;
