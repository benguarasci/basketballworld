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
/* GET view page. */
router.get("/view", function (req, res, next) {
    DbClient.connect()
        .then(function (db) {
        return db.collection("threads").find().toArray();
    })
        .then(function (result) {
        console.log(result);
        var myJSON = JSON.stringify(result);
        res.render("threads/view", { title: myJSON, content: "hi" });
    })
        .catch(function (err) {
        console.log(err.message);
    });
});
router.get("/create", function (req, res, next) {
    res.render("threads/create");
});
router.post("/create", function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    DbClient.connect()
        .then(function (db) {
        return db.collection("threads").insertOne({ title: title, content: content });
    })
        .catch(function (err) {
        console.log(err.message);
    });
    DbClient.connect()
        .then(function (db) {
        return db.collection("threads").find().toArray();
    })
        .then(function (result) {
        console.log(result);
        res.send(result);
    })
        .catch(function (err) {
        console.log(err.message);
    });
    res.render("threads/create");
});
module.exports = router;
