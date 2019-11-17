import {Request, Response, NextFunction, Router} from "express";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;
router.get("/", (req : Request, res : Response) => {
    DbClient.connect()
        .then((db: any) => db!.collection("threads").find().toArray())
        .then((arr:any) => {
            let links = arr.map((thread : any) => "/threads/"+thread._id.toString());
            res.render("placeholders/threads", {'user':req.cookies.username, threads : arr, links : links});
        }).catch ((err: any) => {
            console.log(err.message);
        })
});
router.get("/create", (req : Request, res : Response) => {
    console.log("hello hello");
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", {"message": "you are not logged in"});
        return;
    }
    res.render("placeholders/create_threads", {'user':req.cookies.username});
});
router.post("/create", (req: Request, res: Response) => {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", {"message": "you are not logged in"});
        return;
    }
    let title = req.body.title;
    let desc = req.body.description;
    if (title === "" || desc == "") {
        res.render("placeholders/create_threads", {'user':req.cookies.username, "message": "please complete all inputs"});
        return;
    }
    let owner = req.cookies.username;
    let d = new Date();
    let date = d.toString();
    let ms = d.getTime();
    let count = 0;
    DbClient.connect()
        .then ((db : any) => db!.collection("threads").insertOne({'user':req.cookies.username, title: title, description: desc, owner: owner, date: date, ms: ms, count: count, last: date, by:owner}))
        .then ((id : any) => {
            console.log("id is:" +id);
            res.redirect("/threads/"+id.insertedId.toString())
        })
        .catch((err: any) => {console.log(err)});
});
router.get("/:thread", (req: Request, res: Response) => {
    let threadID = new ObjectId(req.params.thread);
    let thisDB : any;
    DbClient.connect()
        .then ((db : any) => {
            thisDB = db;
            return db!.collection("threads").findOne({_id : threadID})
        }).then ((thread : any) => {
        if (thread === null) res.render("placeholders/homepage", {"message":"couldn't find page, sorry"});
        else {
            thisDB!.collection("posts").find({parentThread: threadID}).toArray()
                .then((arr:any)=>{
                    let posts;
                    if (arr.length === 0) posts = [];
                    else posts = arr;
                    res.render("placeholders/thread", {user:req.cookies.username, thread:thread, posts:posts, target:"/threads/"+req.params.thread})
                }).catch((err:any)=>{console.log(err.message)})
        }
    }).catch((err:any)=>{console.log(err.message)})
});
router.post("/:thread", (req: Request, res: Response) => {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", {"message": "you are not logged in"});
        return;
    }
    if (req.body.content === "") {
        res.render("placeholders/threads", {"message": "you have to write something"});
        return;
    }
    let content = req.body.content;
    let threadID = new ObjectId(req.params.thread);
    let author = req.cookies.username;
    let d = new Date();
    let date = d.toString();
    let ms = d.getTime();
    DbClient.connect()
        .then((db : any) => {
            db!.collection("posts").insertOne({content:content, author:author,parentThread:threadID, date:date, ms:ms})
                .then((id:any)=>{
                    res.redirect("/threads/"+req.params.thread);
                }).catch((err:any)=>{
                console.log(err.message);
            })
        })
        .catch((err:any)=>{
            console.log(err.message);
        })
});
module.exports = router;