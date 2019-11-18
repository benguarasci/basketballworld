import {Request, Response} from "express";
const DbClient = require("../DbClient");

export function isLoggedIn (req : Request, res: Response) {
    if ("username" in req.cookies) {
        res.render("placeholders/homepage", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return true;
    }
    else return false;
}
export async function isValidProfile (req: Request, res: Response) {
    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;
    let pw2 = req.body.confirmpassword;

    if (name === "" || email === "" || pw === "" || pw2 === "") {
        res.render("placeholders/create_account", {
            "message": "missing input"
        });
        return false;
    } else if (pw !== pw2) {//ensuring passwords match
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
export async function createNewProfile (username:string, email:string, password: string) {
    let db = await DbClient.connect();
    await db!.collection("users").insertOne({name: username, email: email, pw: password});
}
export async function retrieveProfile (req : Request, res: Response) {
    let db = await DbClient.connect();
    return await db!.collection("users").findOne({name: req.cookies.username});
}
export async function login (res: Response, username : string, password : string) {
    let db = await DbClient.connect();
    let account = await db!.collection("users").findOne({name: username});
    if (account === null) {
        res.render("placeholders/login", {
            "message": "can't find account, sorry"
        });
    }else if (account.pw !== password) {
        res.render("placeholders/login", {
            "message": "username or password is incorrect"
        });
    }else {
        res.cookie("username", username);
        res.render("placeholders/homepage", {
            "user": username,
            "message": "you successfully logged in"
        });
    }
}
export function isLoginFormComplete (req : Request, res: Response) {
    if (req.body.name === "" || req.body.pw === "") {
        res.render("placeholders/login", {"message" : "empty input"});
        return false;
    } else return true;
}
// https://docs.mongodb.com/manual/reference/operator/update/push/
export async function pushTag (req:Request, res:Response) {
    let db = await DbClient.connect();
    await db!.collection("users").updateOne({name: req.cookies.username}, { $push: { tags: req.body.new } });
}
// https://docs.mongodb.com/manual/reference/operator/update/pull/
export async function pullTag (req:Request, res:Response) {
    let db = await DbClient.connect();
    await db!.collection("users").updateOne({name: req.cookies.username}, { $pull: { tags: req.body.tag} });
}
// https://docs.mongodb.com/manual/reference/operator/update/positional/
export async function editEmail (req:Request, res:Response) {
    let db = await DbClient.connect();
    await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { email: req.body.email } });
}
export async function editPassword (req:Request, res:Response) {
    let db = await DbClient.connect();
    await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { pw: req.body.password } });
}