"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
/* GET home page. */
router.get("/", function (req, res) {
    res.render("placeholders/homepage", { "user": req.cookies.username });
});
module.exports = router;
