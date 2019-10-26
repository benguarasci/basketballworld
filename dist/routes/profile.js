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
/* GET profile page. */
router.get('/create', function (req, res, next) {
    res.render('profile/create');
});
router.post('/create', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmPassword;
    console.log(req.body);
    if (pw === pw2) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("users").insertOne({ name: name, email: email, pw: pw });
        })
            .catch(function (err) {
            console.log("err.message");
        });
        DbClient.connect()
            .then(function (db) {
            return db.collection("users").find().toArray();
        })
            .then(function (result) {
            console.log(result);
            res.send(result);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        res.render('profile/create');
    }
});
// LOGIN
router.get('/login', function (req, res, next) {
    res.render('profile/login');
});
router.post('/login', function (req, res) {
    var name = req.body.name;
    var pw = req.body.password;
    DbClient.connect()
        .then(function (db) {
        return db.collection("users").findOne({ name: name, pw: pw });
    })
        .then(function (item) {
        if (item == undefined)
            res.send("sorry");
        else
            res.send(item);
        DbClient.connect()
            .then(function (db) {
            return db.collection("users").find().toArray();
        })
            .then(function (result) {
            console.log(result);
            return res.send(result);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    })
        .catch(function (err) {
        console.log("err.message");
        res.send("death");
    });
});
module.exports = router;
