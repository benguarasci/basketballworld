import {Request, Response} from "express";
import {Db} from "mongodb";
const DbClient = require("../DbClient");

// given a request, determines whether user is banned and allowed to perform actions
export async function isBanned (req : any, res: any) {
    if (!("username" in req.cookies)) return false;
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    if (user.level == 0) {
        res.render("index", {message: "You are banned"});
        return true;
    }
    return false;
}
// given a username string, " "
export async function isBannedBy_account (username:string, res: any) {
    let user = await DbClient.usersCol.findOne({"name":username});
    if (user.level == 0) {
        res.render("index", {message: "You are banned"});
        return true;
    }
    return false;
}
// given a request, determines whether has admin rights
export async function isAdmin (req : any) {
    if (!("username" in req.cookies)) return false;
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    return (user.level >= 2);
}
// like above, except it renders a message if user is not an admin
export async function isAdmin_render (req : any, res: any) {
    console.log(req.cookies);
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    console.log(user);
    if (user === null || user.level !== 2) {
        res.render("index", {'message':'you are not an admin', 'user':req.cookies.username,})
        return false;
    } else return true;
}
// given an object, checks to see if user has modification rights
export async function canModify (object: any, req : any, res: any) {
    if ((await isBanned(req, res))) return false;
    let imAuthor = object.author === req.cookies.name;
    let imAdmin = await isAdmin(req);
    console.log(imAuthor);
    console.log(imAdmin);
    if (imAuthor || imAdmin) return true;
    res.render("index", {user:req.cookies.username, message: "you don't have modifying rights to this object "});
    return false;
}
// given a thread id, " " "
export async function canModify_Thread(id: any, req : any, res: any) {
    let thread = await DbClient.threadsCol.findOne({_id: id});
    return await canModify(thread, req, res);
}
// given a post id, " " "
export async function canModify_Post(id: any, req : Request, res: Response) {
    let thread = await DbClient.postsCol.findOne({_id: id});
    return await canModify(thread, req, res);
}
// creates a root account with admin privileges
export async function createRoot() {
    let root = await DbClient.usersCol.findOne({name: "root"});
    if (root == null)
        await DbClient.usersCol.insertOne({name: "root", email: "email@email.com", pw: "root", level: 2});
    else if (root.level != 2)
        await DbClient.usersCol.updateOne({name: "root"}, {$set: {level : 2}})
    return;
}