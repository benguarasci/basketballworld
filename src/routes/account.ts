import * as express from "express";
let router = express.Router();

/* GET account page. */

router.get('/', (req, res, next) => {
    res.render('account');
});

module.exports = router;