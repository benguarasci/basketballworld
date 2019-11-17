import {Request, Response} from "express";
const DbClient = require("../DbClient");
const User = require("../models/user");

// For retrieving user profiles
export class userProfileRetriever {

    // Returns the profile as output based on input
    async retrieveProfile(req: Request, res: Response) {

        // The user inputted
        const userRequested = new User;
        userRequested.name = req.body.name;
        userRequested.email = req.body.email;
        userRequested.pw = req.body.pw;

        // Search for user in the 'users' collection
        const db = await DbClient.connect();
        const foundUser = await db!.collection("users").findOne(userRequested);

        // If the user is not found return null
        if (foundUser === null ) {
            return [null, "profile not found"];
        }

        // Otherwise return the user
        else {
            return [foundUser, "user"];
        }
    }
}