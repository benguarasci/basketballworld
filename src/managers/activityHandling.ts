import {Request, Response} from "express";
import {Db} from "mongodb";
const DbClient = require("../DbClient");

export async function isBanned (req : Request, res: Response) {
    if (!("username" in req.cookies)) return false;
    //let db = await DbClient.connect();
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    if (user.level == 0) {
        res.render("index", {message: "You are banned"});
        return true;
    }
    return false;
}
export async function isBannedBy_account (username:string, res: Response) {
    //let db = await DbClient.connect();
    let user = await DbClient.usersCol.findOne({"name":username});
    if (user.level == 0) {
        res.render("index", {message: "You are banned"});
    }
}
export async function isAdmin (req : Request) {
    if (!("username" in req.cookies)) return false;
    //let db = await DbClient.connect();
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    return (user.level >= 2);
}
export async function isAdmin_byName (name: string) {
    //let db = await DbClient.connect();
    let user = await DbClient.usersCol.findOne({"name":name});
    return (user.level >= 2);
}
export async function isAdmin_render (req : Request, res:Response) {
    //let db = await DbClient.connect();
    let user = await DbClient.usersCol.findOne({"name":req.cookies.username});
    if (user === null || user.level !== 2) {
        res.render("index", {'message':'you are not an admin', 'user':req.cookies.username,})
        return false;
    } else return true;
}
export async function canModify (object: any, req : Request, res: Response) {
    console.log("turf wars");
    if ((await isBanned(req, res))) return false;
    let imAuthor = object.author === req.cookies.name;
    let imAdmin = await isAdmin(req);
    console.log(imAuthor);
    console.log(imAdmin);
    if (imAuthor || imAdmin) return true;
    res.render("index", {user:req.cookies.username, message: "you don't have modifying rights to this object "});
    return false;
    // isAdmin(req)
    //     .then((confirm : boolean)=> {bool || confirm})
}
export async function canModify_Thread(id: any, req : Request, res: Response) {
    //console.log("waterfall");
    let thread = await DbClient.threadsCol.findOne({_id: id});
    return await canModify(thread, req, res);
}
export async function canModify_Post(id: any, req : Request, res: Response) {
    let thread = await DbClient.postsCol.findOne({_id: id});
    return await canModify(thread, req, res);
}