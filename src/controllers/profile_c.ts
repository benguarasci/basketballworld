import {Request, Response} from "express";
const DbClient = require("../DbClient");
const Profile = require("../models/profile_m");

export class ProfileController {

    // Returns the profile as output based on input
    public async retrieve(req: Request, res: Response) {

        // The user inputted
        const userRequested = new Profile;
        userRequested.name = req.body.name;
        userRequested.email = req.body.email;
        userRequested.pw = req.body.pw;

        // Search for user in the 'users' collection
        const db = await DbClient.connect();
        const foundUser = await db!.collection("users").findOne(userRequested);

        // If the user is not found return null
        if (foundUser === null ) {
            res.render("placeholders/login", {
                "message": "can't find account, sorry"
            });
        }

        // Otherwise return the user
        else {
            return [foundUser, "user"];
        }
    }

    public async login(req: Request, res: Response) {
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
            .then((db:any) =>
                db!.collection("users").findOne({name: name}))
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
                }})
            .catch ((err: any) => {
                console.log(err.message);
                })
    }


}