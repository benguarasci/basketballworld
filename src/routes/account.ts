import * as express from "express";
let router = express.Router();

/* GET account page. */

router.get('/', (req, res, next) => {
    res.render('account');
});

/* POST for account registration. */
router.post('/account', function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const pw = req.body.pw;
    const pw2 = req.body.pw2;

});

module.exports = router;