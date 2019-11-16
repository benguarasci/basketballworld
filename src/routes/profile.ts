import {Request, Response, NextFunction, Router} from "express";
import {User} from "../models/user";
import {Profile} from "../controllers/profile_c";

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

    // model instantiation
    let user = new User(req.body.name, req.body.email, req.body.password, []);

    // check for empty fields in the form
    if(!user.isValid()) {
        res.send("missing credentials");
        return;
    }

    // verify password
    if(!user.verify(req.body.confirmPassword)) {
        res.send("passwords do not match");
        return;
    }

    // check if username is already taken
    Profile.userExists(user, res);

    // create new user
    Profile.insert(user, res);

    // set cookie
    Profile.setCookie(user, res);
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

    // model instantiation
    let user = new User(req.body.name, '', req.body.password, []);

    // login
    Profile.login(user, res);
});

router.get("", async (req, res, next) => {

    Profile.home(req.cookies.username, res);

});

router.post("/deletetag", (req, res) => {

   console.log(req.body)
});

router.post("/createtag", (req, res) => {

    console.log(req.body)
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("username");
    res.send("logout successful");
});

module.exports = router;