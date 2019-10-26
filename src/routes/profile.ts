import * as express from "express";
import DbClient = require("../DbClient");

let router = express.Router();

//sending create profile page to client
router.get('/create', (req, res, next) => {
    res.render('profile/create');
});

//create user account request
router.post('/create', (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;
    let pw2 = req.body.confirmPassword;
    let exit = false;

    //if there are empty fields in form
    if (name === '' || email === '' || pw === '' || pw2 === '') {
        res.send("missing credentials");
        return;
    }

    //checking to see if username already exists
    DbClient.connect()
        .then((db: any) => {
            return db!.collection("users").find({name: name}).toArray();
        }).then((array : any)=> {
            if (array.length != 0) {
                res.send("user name taken");
                exit = true;
                return;
            }
        });
    if (exit) return;

    //checking to see if passwords match
    if (pw === pw2) {
        DbClient.connect()
            .then((db: any) => {
                //adding new account to database
                return db!.collection("users").insertOne({name: name, email: email, pw: pw});
            })
            .then((db: any)=>{
                res.send("account creation success"); //responding that account creation was success
            })
            .catch((err: any) => {
                console.log(err.message);
            });
    } else {
        res.send("password and password confirmation is not same");
    }
});

//sending login page to client
router.get('/login', function (req, res, next) {
    res.render('profile/login');
});

//handling login request from client
router.post('/login', (req, res)=>{
    let name = req.body.name;
    let pw = req.body.password;
    DbClient.connect()
        .then((db: any)=>{
            //finding account in database that matches provided credentials
            return db!.collection("users").findOne({name : name, pw: pw});
        })
        .then((item: any)=>{
            //no account matching search was found
            if (item == undefined) res.send("sorry");
            //sending account information if successful
            else res.send(item);
        })
        .catch((err: any) => {
            console.log(err.message);
        });
});

module.exports = router;