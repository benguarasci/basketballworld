import {Request, Response, NextFunction, Router} from "express";

const express = require('express');
const DbClient = require("../DbClient");
const cookieParser = require('cookie-parser');
const router = Router();

router.get("/create", (req : Request, res: Response, next: NextFunction) => {

    //logged in clients should be unable to create accounts
    if ("username" in req.cookies) {
        res.send("you are already logged");
        return;
    }
    //if client is not logged in, they can create account
    res.render("profile/create");
});

router.post("/create", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;
    let pw2 = req.body.confirmPassword;

    //ensuring no field is empty
    if (name === "" || email === "" || pw === "" || pw2 === "")
        res.send("missing credentials");
    else if (pw !== pw2) //ensuring passwords match
        res.send("passwords do not match");
    else {
        let myDB : any;
        DbClient.connect()
            .then ((db:any) => {
                myDB = db;
                return db!.collection("users").findOne({name:name});
            }).then ((account:any) => {
                if (account !== null) {
                    console.log(account);
                    res.send("username taken");
                }
                else {
                    myDB!.collection("users").insertOne({name:name, email:email, pw:pw})
                        .then ((object:any) => {
                            if (object != null) {
                                res.cookie("username", name);
                                res.send("account creation success");
                            } else {
                                res.send("account creation failed");
                            }
                        }).catch ((err:any)=>{
                            console.log(err.message);
                        })
                }
            })
    }
});

router.get("/login", (req, res, next) => {
    if ("username" in req.cookies) {
        res.send("you are already logged");
        return;
    }
    //if client is not logged in, they can create account
    res.render("profile/login");
});

router.post("/login", (req, res) => {
   let name = req.body.name;
   let pw = req.body.password;

    DbClient.connect()
        .then((db:any) => db!.collection("users").findOne({name: name}))
        .then ((account:any) => {
            if (account === null) res.send("can't find account, sorry");
            else if (account.pw !== pw) res.send("username or password is incorrect");
            else {
                res.cookie("username", name);
                res.send("login successful");
            }
        }).catch ((err: any) => {
            console.log(err.message);
        })
});

router.get("/account", (req, res, next) => {
    res.send(req.cookies);
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("username");
    res.send("logout successful");
});

module.exports = router;