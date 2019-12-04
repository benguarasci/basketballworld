import {Request, Response} from "express";
const DbClient = require("../DbClient");
import createProfileForm from "../mymodels/createProfile"

export async function isBanned (req : Request, res: Response) {
    let db = await DbClient.connect();
    let user = await db!.collection("users").findOne({"name":req.cookies.username});
    if (user.level == 0) {
        res.clearCookie("username");
        res.render("profile/login");
        res.render("placeholders/homepage", {message: "You are banned"});
    }
}
export async function isBannedBy_account (username:string, res: Response) {
    let db = await DbClient.connect();
    let user = await db!.collection("users").findOne({"name":username});
    if (user.level == 0) {
        res.clearCookie("username");
        res.render("profile/login");
        res.render("placeholders/homepage", {message: "You are banned"});
    }
}
export async function isAdmin (req : Request) {
    let db = await DbClient.connect();
    let user = await db!.collection("users").findOne({"name":req.cookies.username});
    return (user.level == 2);
}
export async function canModify (object: any, req : Request, res: Response) {
    let bool = object.name === req.cookies.name;
    isAdmin(req)
        .then((confirm : boolean)=> bool || confirm)
}