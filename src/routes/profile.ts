import * as express from "express";
import {User} from "../models/user";
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

// LOGIN

router.get('/login', function (req, res, next) {
    res.render('profile/login');
});

router.post('/login', function(req,res){

    // http://mongodb.github.io/node-mongodb-native/3.2/api/Cursor.html#each
    // https://docs.mongodb.com/manual/reference/method/cursor.forEach/

    req.app.locals.db.collection("account").find({username: req.body.username}, {}, (err: any, result: any) =>  {
        result.forEach( function(doc: any) {
            if(doc.username) {
                console.log("user exists!");
                // TO DO: redirect to profile page and pass user model
            }
        });
    });

});

module.exports = router;