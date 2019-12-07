import {Request, Response} from "express";
//import {usersCol} from "../app";
const DbClient = require("../DbClient");
export default class createProfileForm {
    public name : string;
    public email : string;
    public pw : string;
    public pw2 : string;
    public level : number;
    constructor (req : Request) {
        this.name = req.body.name;
        this.email = req.body.email;
        this.pw = req.body.password;
        this.pw2 = req.body.confirmpassword;
        this.level = 1;
    }
    async isValidForm (res: Response) {
        if (this.name === "" || this.email === "" || this.pw === "" || this.pw2 === "") {
            res.render("profile/create", {
                "message": "missing input"
            });
            return false;
        } else if (this.pw !== this.pw2) {//ensuring passwords match
            res.render("profile/create", {
                "message": "passwords do not match"
            });
            return false;
        }
        //let db = await DbClient.connect();
        let account = await DbClient.usersCol.findOne({name: this.name});
        if (account !== null) {
            res.render("profile/create", {
                "message": "username taken"
            });
            return false
        }
        return true;
    }
    isLoginFormComplete (res: Response) {
        if (this.name === "" || this.pw === "") {
            res.render("profile/login", {"message" : "empty input"});
            return false;
        } else return true;
    }
}