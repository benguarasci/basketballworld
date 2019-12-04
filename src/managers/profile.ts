import {Request, Response} from "express";
const DbClient = require("../DbClient");
import createProfileForm from "../mymodels/createProfile"

export function isLoggedIn (req : Request, res: Response) {
    if ("username" in req.cookies) {
        return true;
    }
    else return false;
}
export async function createNewProfile (form : any) {
    let db = await DbClient.connect();
    await db!.collection("users").insertOne({name: form.name, email: form.email, pw: form.pw});
}
export async function retrieveProfile (req : Request, res: Response) {
    let db = await DbClient.connect();
    return await db!.collection("users").findOne({name: req.cookies.username});
}
export async function login (res: Response, form : any) {
    let db = await DbClient.connect();
    let account = await db!.collection("users").findOne({name: form.name});
    if (account === null) {
        res.render("profile/login", {
            "message": "can't find account, sorry"
        });
    } else if (account.pw !== form.pw) {
        console.log(account.pw);
        console.log(form.pw);
        res.render("profile/login", {
            "message": "username or password is incorrect"
        });
    } else {
        res.cookie("username", form.name);
        res.redirect('/profile/home');
    }
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