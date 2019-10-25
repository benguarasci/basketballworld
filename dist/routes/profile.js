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
router.get('/create', function (req, res, next) {
    res.render('profile/create');
});
/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('profile/login');
});
/* POST for profile creation. */
router.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pw = req.body.pw;
    var pw2 = req.body.pw2;
    // notice how the contents of the form will be shown in the log
    insertProfile({ req: req, res: res });
    //see https://www.youtube.com/watch?v=voDummz1gO0 for help
});
function insertProfile(_a) {
    var req = _a.req, res = _a.res;
    console.log(name);
    //insert into mongodb
}
module.exports = router;
