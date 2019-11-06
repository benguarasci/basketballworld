"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var DbClient = require("../DbClient");
var router = express.Router();
// sending create profile page to client
router.get("/create", function (req, res, next) {
    res.render("profile/create");
});
// create user account request
router.post("/create", function (req, res) {
    console.log("hello popsicles");
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmPassword;
    var exit = false;
    // if there are empty fields in form
    if (name === "" || email === "" || pw === "" || pw2 === "") {
        res.send("missing credentials");
        return;
    }
    // checking to see if username already exists
    DbClient.connect()
        .then(function (db) {
        return db.collection("users").find({ name: name }).toArray();
    }).then(function (array) {
        if (array.length !== 0) {
            res.send("user name taken");
            exit = true;
            return;
        }
    });
    if (exit) {
        return;
    }
    // checking to see if passwords match
    if (pw === pw2) {
        DbClient.connect()
            .then(function (db) {
            // adding new account to database
            return db.collection("users").insertOne({ name: name, email: email, pw: pw });
        })
            .then(function (db) {
            // responding that account creation was success
            res.send("account creation success");
        })
            .catch(function (err) {
            console.log(err.message);
        });
    }
    else {
        res.send("password and password confirmation is not same");
    }
});
//sending account page to client
router.get("/account", function (req, res, next) {
    res.render("profile/account");
});
// sending login page to client
router.get("/login", function (req, res, next) {
    res.render("profile/login");
});
// handling login request from client
router.post("/login", function (req, res) {
    console.log("kill me");
    var name = req.body.name;
    var pw = req.body.password;
    DbClient.connect()
        .then(function (db) {
        // finding account in database that matches provided credentials
        return db.collection("users").findOne({ name: name, pw: pw });
    })
        .then(function (item) {
        // no account matching search was found
        if (item === undefined) {
            res.send("sorry");
        }
        else {
            // sending account information if successful
            res.send(item);
        }
    })
        .catch(function (err) {
        console.log(err.message);
    });
});
module.exports = router;
