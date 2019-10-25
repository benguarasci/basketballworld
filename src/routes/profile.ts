import * as express from "express";
let router = express.Router();

/* GET profile page. */
router.get('/', (req, res, next) => {
    res.render('profile/create');
});


router.post('/', (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const pw = req.body.password;
    const pw2 = req.body.confirmPassword;
    console.log(req.body);
    if (pw === pw2) {

    }
});

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