import {Request, Response, Router} from "express";

class userActivityManager {
    constructor () {
        //nothing
    }
    public isLoggedIn (req:Request) {
        return "username" in req.cookies;
    }
}
export = new userActivityManager();