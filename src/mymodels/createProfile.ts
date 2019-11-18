import {Request, Response} from "express";
const DbClient = require("../DbClient");
export default class createProfileForm {
    public name : string;
    public email : string;
    public pw : string;
    public pw2 : string;
    constructor (req : Request) {
        this.name = req.body.name;
        this.email = req.body.email;
        this.pw = req.body.password;
        this.pw2 = req.body.confirmpassword;
    }
    async isValidForm (res: Response) {
        if (this.name === "" || this.email === "" || this.pw === "" || this.pw2 === "") {
            res.render("placeholders/create_account", {
                "message": "missing input"
            });
            return false;
        } else if (this.pw !== this.pw2) {//ensuring passwords match
            res.render("placeholders/create_account", {
                "message": "passwords do not match"
            });
            return false;
        }
        let db = await DbClient.connect();
        let account = await db!.collection("users").findOne({name:name});
        if (account !== null) {
            res.render("placeholders/create_account", {
                "message": "username taken"
            });
            return false
        }
        return true;
    }
    isLoginFormComplete (res: Response) {
        if (this.name === "" || this.pw === "") {
            res.render("placeholders/login", {"message" : "empty input"});
            return false;
        } else return true;
    }
}