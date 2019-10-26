import * as express from "express";
import DbClient = require("../DbClient");

let router = express.Router();


/* GET profile page. */
router.get('/create', (req, res, next) => {
    res.render('profile/create');
});


router.post('/create', (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;
    let pw2 = req.body.confirmPassword;
    console.log(req.body);
    if (pw === pw2) {
        DbClient.connect()
            .then((db: any) => {
                return db.collection("users").insertOne({name: name, email: email, pw: pw});
            })
            .catch((err: any) => {
                console.log("err.message");
            });

        DbClient.connect()
            .then((db: any) => {
                return db!.collection("users").find().toArray();
            })
            .then((result:any) => {
                console.log(result);
                res.send(result);
            })
            .catch((err: any) => {
                console.log("err.message");
            });
        res.render('profile/create');
    }
});

// LOGIN

router.get('/login', function (req, res, next) {
    res.render('profile/login');
});

router.post('/login', (req, res)=>{
    let name = req.body.name;
    let pw = req.body.password;
    DbClient.connect()
        .then((db: any)=>{
            return db!.collection("users").findOne({name : name, pw: pw});
        })
        .then((item: any)=>{
            if (item == undefined) res.send("sorry");
            else res.send(item);


            DbClient.connect()
                .then((db: any) => {
                    return db!.collection("users").find().toArray();
                })
                .then((result:any) => {
                    console.log(result);
                    return res.send(result);
                })
                .catch((err: any) => {
                    console.log("err.message");
                });

        })
        .catch((err: any) => {
            console.log("err.message");
            res.send("death");
        });
});

module.exports = router;