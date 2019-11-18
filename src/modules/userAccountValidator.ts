import {Request, Response} from "express";
const DbClient = require("../DbClient");

export class validator {
    constructor () {
        //does nothing
    }
    async validateNewAccount(req: Request, res: Response) {
        let name = req.body.name;
        let email = req.body.email;
        let pw = req.body.password;
        let pw2 = req.body.confirmpassword;

        if (name === "" || email === "" || pw === "" || pw2 === "") return [false, "missing input"];
        else if (pw !== pw2) return [false, "passwords do not match"];
        else {
            let db = await DbClient.connect();
            let account = await db!.collection("users").findOne({name:name});
            if (account !== null ) return [false, "username taken"];
            else return [true, "valid input"];
        }
    }
    public validateNewPost(req: Request, res: Response) {
        if (!("username" in req.cookies)) {
            return [false, "you are not logged in"];
        } else if (req.body.content === "") {
            return [false, "you have to write something"];
        } else {
            return "valid";
        }
    }
}