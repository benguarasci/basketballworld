import {Request, Response} from "express";
const DbClient = require("../DbClient");
const Profile = require("../models/profile_m");

// For retrieving user profiles
export class profileRetriever {

    // Returns the profile as output based on input
    static async retrieveProfile(req: Request, res: Response) {

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


}