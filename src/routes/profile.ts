import {Request, Response, NextFunction, Router} from "express";
const DbClient = require("../DbClient");
const router = Router();

router.get("/create", (req : Request, res: Response) => {
    //logged in clients should be unable to create accounts
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/create_account");
});

router.post("/create", (req : Request, res : Response) => {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return;
    }
    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;
    let pw2 = req.body.confirmpassword;

    //ensuring no field is empty
    if (name === "" || email === "" || pw === "" || pw2 === "") {
        res.render("placeholders/create_account", {
            "message": "missing input"
        });
    }
    else if (pw !== pw2) //ensuring passwords match
        res.render("placeholders/create_account", {
            "message": "passwords do not match"
        });
    else {
        let myDB : any;
        DbClient.connect()
            .then ((db:any) => {
                myDB = db;
                return db!.collection("users").findOne({name:name});
            }).then ((account:any) => {
                if (account !== null)
                    res.render("placeholders/create_account", {
                        "message": "username taken"
                    });
                else {
                    myDB!.collection("users").insertOne({name:name, email:email, pw:pw})
                        .then ((object:any) => {
                            if (object != null) {
                                res.cookie("username", name);
                                res.render("placeholders/homepage", {
                                    "user": name,
                                    "message" : 'succeeded in creating new account'
                                });
                            } else {
                                res.render("placeholders/homepage", {
                                    "message" : 'failed in creating new account'
                                });
                            }
                        }).catch ((err:any)=>{
                            console.log(err.message);
                        })
                }
            }).catch ((err : any) => {
                console.log(err.message);
            })
    }
});

router.get("/login", (req : Request, res : Response) => {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return;
    }
    //if client is not logged in, they can create account
    res.render("placeholders/login");
});

router.post("/login", (req : Request, res : Response) => {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return;
    }
   let name = req.body.name;
   let pw = req.body.password;
    DbClient.connect()
        .then((db:any) => db!.collection("users").findOne({name: name}))
        .then ((account:any) => {
            if (account === null) {
                res.render("placeholders/login", {
                    "message": "can't find account, sorry"
                });
            }else if (account.pw !== pw) {
                res.render("placeholders/login", {
                    "message": "username or password is incorrect"
                });
            }else {
                res.cookie("username", name);
                res.render("placeholders/homepage", {
                    "user": name,
                    "message": "you successfully logged in"
                });
            }
        }).catch ((err: any) => {
            console.log(err.message);
        })
});

router.get("/account", (req : Request, res : Response) => {
    res.send(req.cookies);
});

router.get("/logout", (req : Request, res : Response) => {
    res.clearCookie("username");
    res.render("placeholders/login");
});

module.exports = router;
