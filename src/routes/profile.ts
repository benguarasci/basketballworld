import * as express from "express";
let router = express.Router();

/* GET profile page. */
router.get('/', (req, res, next) => {
    res.render('profile/create');
});

/* POST for profile creation. */
router.post('/', function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const pw = req.body.pw;
    const pw2 = req.body.pw2;

    // notice how the contents of the form will be shown in the log
    insertProfile({req: req, res: res});
    //see https://www.youtube.com/watch?v=voDummz1gO0 for help
});

function insertProfile({req, res}: { req: any, res: any }){
    console.log(name);
    //insert into mongodb
}

module.exports = router;