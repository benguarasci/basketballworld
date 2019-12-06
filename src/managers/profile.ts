import {Request, Response} from "express";
const DbClient = require("../DbClient");
import createProfileForm from "../mymodels/createProfile"
import {isBanned, isBannedBy_account} from "./activityHandling"
import {usersCol} from "../app";

export function isLoggedIn (req : Request, res: Response) {
    if ("username" in req.cookies) {
       res.render("index", {
            "user": req.cookies.username,
            "message" : "you are already logged in"
        });
        return true;
    }
    else return false;
}

export function isLoggedIn_NoRender (req : Request, res: Response) {
    if (!("username" in req.cookies)) {
        res.render("index", {
            "user": req.cookies.username,
            "message" : "you are not logged in"
        });
        return false;
    }
    else return true;
}

export async function createNewProfile (form : any) {
    //let db = await DbClient.connect();
    await usersCol.insertOne({name: form.name, email: form.email, pw: form.pw, level: 1});
}
export async function retrieveProfile (req : Request, res: Response) {
    //let db = await DbClient.connect();
    return await usersCol.findOne({name: req.cookies.username});
}
export async function login (res: Response, form : any) {
    //let db = await DbClient.connect();
    let account = await usersCol.findOne({name: form.name});
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
        // isBannedBy_account(form.name, res)
        //     .then((conf : any)=>{
                res.cookie("username", form.name);
                res.redirect('/profile/home');
            // });
    }
}
// https://docs.mongodb.com/manual/reference/operator/update/push/
export async function pushTag (req:Request, res:Response) {
    //let db = await DbClient.connect();
    await usersCol.updateOne({name: req.cookies.username}, { $push: { tags: req.body.new } });
}
// https://docs.mongodb.com/manual/reference/operator/update/pull/
export async function pullTag (req:Request, res:Response) {
    //let db = await DbClient.connect();
    await usersCol.updateOne({name: req.cookies.username}, { $pull: { tags: req.body.tag} });

}
// https://docs.mongodb.com/manual/reference/operator/update/positional/
export async function editEmail (req:Request, res:Response) {
    //let db = await DbClient.connect();
    await usersCol.updateOne({name: req.cookies.username}, { $set: { email: req.body.email } });
}
export async function editPassword (req:Request, res:Response) {
    //let db = await DbClient.connect();
    await usersCol.updateOne({name: req.cookies.username}, { $set: { pw: req.body.password } });
}
export async function allTags (req:Request, res:Response) {
    let tags: string[] = [];
    let count: number[] = [];
    let aggregate: any[] = [];
    let users = await usersCol.find().toArray();
    for (let user of users) {
        if(user.tags) {
            for (let tag of user.tags ) {
                let flag = 0;
                tags.forEach((item, index) => {
                    if (item == tag) {
                        count[index] += 1;
                        flag = 1;
                    }
                });
                if(flag === 0) {
                    tags.push(tag);
                    count.push(1);
                }
            }
        }
    }
    tags.forEach((item, index) => {
        aggregate.push({count:count[index], tags:tags[index]})
    });
    return aggregate.sort((a, b) => (a.count < b.count) ? 1:-1);
}