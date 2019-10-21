import * as express from "express";
let router = express.Router();

/* GET threads page. */

router.get('/', (req, res, next) => {
    res.render('threads');
});

module.exports = router;