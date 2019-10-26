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
router.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.confirmPassword;
    console.log(req.body);
    if (pw === pw2) {
        console.log("tree people");
        DbClient.connect()
            .then(function (db) {
            db.collection("users").insertOne({ name: name, email: email, pw: pw });
        });
        DbClient.connect()
            .then(function (db) {
            return db.collection("users").find().toArray();
        })
            .then(function (heroes) {
            console.log(heroes);
            res.send(heroes);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    }
});
// LOGIN
router.get('/login', function (req, res, next) {
    res.render('profile/login');
});
router.post('/login', function (req, res) {
    // http://mongodb.github.io/node-mongodb-native/3.2/api/Cursor.html#each
    // https://docs.mongodb.com/manual/reference/method/cursor.forEach/
    req.app.locals.db.collection("account").find({ username: req.body.username }, {}, function (err, result) {
        result.forEach(function (doc) {
            if (doc.username) {
                console.log("user exists!");
                // TO DO: redirect to profile page and pass user model
            }
        });
    });
});
module.exports = router;
