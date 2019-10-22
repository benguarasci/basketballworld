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
var router = express.Router();
/* GET profile page. */
router.get('/', function (req, res, next) {
    res.render('profile/create');
});
/* POST for profile creation. */
router.post('/', function (req, res) {
    // const name = req.body.name;
    // const email = req.body.email;
    // const pw = req.body.pw;
    // const pw2 = req.body.pw2;
    console.log(req.body);
});
module.exports = router;
